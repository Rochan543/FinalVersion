import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ SIZE STATE (ADDED – SAFE)
  const [selectedSize, setSelectedSize] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(value) {
    setRating(value);
  }

  function handleAddToCart(productId, totalStock) {
    // ✅ SIZE VALIDATION (SAFE ADD)
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    const items = cartItems.items || [];

    const existingItem = items.find(
      (item) =>
        item.productId === productId &&
        item.size === selectedSize
    );

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
        size: selectedSize,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedSize(null);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review added successfully!" });
      }
    });
  }

  useEffect(() => {
    if (productDetails) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="
          grid grid-cols-1 lg:grid-cols-2
          gap-6 p-4 sm:p-6 lg:p-12
          max-w-[95vw] sm:max-w-[85vw] lg:max-w-[70vw]
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* IMAGE WITH ZOOM */}
        <div className="relative overflow-hidden rounded-lg group">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="
              aspect-square w-full
              max-h-[300px] sm:max-h-[400px] lg:max-h-[600px]
              object-cover transition-transform duration-300
              group-hover:scale-110
            "
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-extrabold">
            {productDetails?.title}
          </h1>

          <p className="text-muted-foreground text-lg mt-3 mb-5">
            {productDetails?.description}
          </p>

          {/* PRICE */}
          <div className="flex justify-between items-center">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* SIZE SELECTION */}
          <div className="mt-6">
            <Label className="mb-2 block">Select Size</Label>
            <div className="flex gap-2 flex-wrap">
              {(productDetails?.sizes || [
                "S",
                "M",
                "L",
                "XL",
                "XXL",
                "XXXL",
              ]).map((size) => (
                <Button
                  key={size}
                  variant={
                    selectedSize === size ? "default" : "outline"
                  }
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <div className="mt-6">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails._id,
                    productDetails.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          {/* REVIEWS */}
          <div className="max-h-[250px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            {reviews?.length ? (
              reviews.map((r) => (
                <div className="flex gap-4 mb-4" key={r._id}>
                  <Avatar>
                    <AvatarFallback>
                      {r.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{r.userName}</h3>
                    <StarRatingComponent rating={r.reviewValue} />
                    <p className="text-muted-foreground">
                      {r.reviewMessage}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}

            {/* ADD REVIEW */}
            <div className="mt-6">
              <Label>Write a review</Label>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <Input
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
              />
              <Button
                className="mt-2"
                onClick={handleAddReview}
                disabled={!reviewMsg.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
