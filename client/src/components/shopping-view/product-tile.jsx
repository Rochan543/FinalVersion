import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/shop/favorites-slice";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  /* ✅ SAFE ACCESS */
  const favorites = useSelector((state) => state.favorites.list || []);

  const isFavorite = favorites.some(
    (fav) => fav._id === product?._id
  );

  return (
    <Card className="w-full max-w-sm mx-auto relative">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">

          {/* ❤️ FAVORITE ICON */}
          <div className="absolute top-2 right-2 z-10">
            <Heart
              size={22}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  toggleFavorite({
                    userId: user?.id,
                    productId: product?._id,
                  })
                );
              }}
              className={`cursor-pointer transition ${
                isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-300 hover:text-red-400"
              }`}
            />
          </div>

          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Only {product?.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {product?.title}
          </h2>

          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className={`text-lg font-semibold ${
                product?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{product?.price}
            </span>

            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold">
                ₹{product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={() => handleGetProductDetails(product?._id)}
          className="w-full"
          variant="outline"
        >
          Book Now
        </Button>

        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleAddtoCart(product?._id, product?.totalStock)
            }
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>

    </Card>
  );
}

export default ShoppingProductTile;
