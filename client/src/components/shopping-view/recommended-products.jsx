import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";

function RecommendedProducts({ category, currentProductId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (category) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: { category: [category] },
          sortParams: "price-lowtohigh",
        })
      );
    }
  }, [category, dispatch]);

  function handleAddToCart(productId, totalStock) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  }

  if (!category) return null;

  const recommendedProducts =
    productList?.filter(
      (product) => product._id !== currentProductId
    ) || [];

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-extrabold mb-6">
        Recommended Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/shop/product/${product._id}`)}
            className="cursor-pointer"
          >
            <ShoppingProductTile
              product={product}
              handleGetProductDetails={() => {}}
              handleAddtoCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;
