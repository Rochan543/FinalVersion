import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import Footer from "@/components/common/Footer";
import { fetchFavorites } from "@/store/shop/favorites-slice";

function Favorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.list);

  // ✅ FIX: FETCH FAVORITES AFTER REFRESH
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* PAGE CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">My Favorites ❤️</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite products yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={() => {}}
                handleAddtoCart={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Favorites;
