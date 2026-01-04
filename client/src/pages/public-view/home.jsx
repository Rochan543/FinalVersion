import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { getFeatureImages } from "@/store/common-slice";
import { useNavigate } from "react-router-dom";
import SubscribeSection from "@/components/common/SubscribeSection";
import AnnouncementPopup from "@/components/common/AnnouncementPopup";
import { Plane, MessageCircle, Heart, ShieldCheck } from "lucide-react";

/* ------------------ DUMMY REVIEWS ------------------ */
const reviews = [
  { name: "Atimer K.", text: "Bought for my son. Loved it. Met my expectations." },
  { name: "Begbilgeçkşin A.", text: "Super recommended!" },
  { name: "Atikutlu B.", text: "Bonito buen material lo recomiendo" },
  { name: "Eyiz K.", text: "Good for the price" },
  { name: "Buyandemir A.", text: "Ottima qualità" },
  { name: "Ruth B.", text: "Very comfortable and stylish" },
  { name: "Ken W.", text: "Worth every rupee" },
];

function PublicHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList = [] } = useSelector(
    (state) => state.shopProducts || {}
  );

  const { featureImageList = [] } = useSelector(
    (state) => state.commonFeature || {}
  );

  const [currentBanner, setCurrentBanner] = useState(0);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  /* ---------------- FETCH BANNERS ---------------- */
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  /* ---------------- AUTO BANNER SLIDE ---------------- */
  useEffect(() => {
    if (!featureImageList.length) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        prev === featureImageList.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [featureImageList]);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ================= BANNER ================= */}
        {featureImageList.length > 0 && (
          <div className="mb-10 sm:mb-12 rounded-xl overflow-hidden">
            <img
              src={featureImageList[currentBanner].image}
              alt="Banner"
              className="w-full h-[200px] sm:h-[300px] md:h-[420px] object-cover"
            />
          </div>
        )}

        {/* ================= TITLE ================= */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
          Welcome to Mr.Prefect Fashion Club
        </h1>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {productList.map((product) => (
            <div
              key={product._id}
              className="border p-3 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate("/auth/login")}
            >
              <img
                src={product.image}
                className="h-40 sm:h-48 w-full object-cover"
                alt={product.title}
              />
              <h3 className="mt-2 font-semibold text-sm sm:text-base">
                {product.title}
              </h3>
              <p className="text-sm">₹{product.price}</p>
              <p className="text-xs sm:text-sm text-blue-600 mt-2">
                Login to Buy →
              </p>
            </div>
          ))}
        </div>

        {/* ================= REVIEWS ================= */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          What Our Customers Say
        </h2>

        <div className="overflow-hidden mb-20">
          <div className="flex gap-6 animate-scroll">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[260px] sm:min-w-[300px] bg-white border rounded-xl p-5 shadow-sm"
              >
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <p className="text-sm mb-3">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
                <p className="text-xs text-green-600">✔ Verified purchase</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SUBSCRIBE ================= */}
        <SubscribeSection />

        {/* ================= WHY SHOP WITH US ================= */}
        <section className="bg-white py-16 sm:py-20 overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-12 sm:mb-16 tracking-wide">
            WHY SHOP WITH US
          </h2>

          <div
            className="
              why-scroll
              flex md:grid
              md:grid-cols-4
              gap-8 sm:gap-10
              px-4 md:px-0
            "
          >
            <div className="min-w-[240px] md:min-w-0 text-center">
              <Plane className="mx-auto mb-4 h-8 w-8" />
              <h3 className="font-semibold mb-2 tracking-wide">
                WORLDWIDE-SHIPPING
              </h3>
              <p className="text-sm text-gray-600">
                Fast, reliable worldwide delivery
              </p>
            </div>

            <div className="min-w-[240px] md:min-w-0 text-center md:border-l">
              <MessageCircle className="mx-auto mb-4 h-8 w-8" />
              <h3 className="font-semibold mb-2 tracking-wide">
                CUSTOMER SUPPORT
              </h3>
              <p className="text-sm text-gray-600">
                Expert support available 24/7
              </p>
            </div>

            <div className="min-w-[240px] md:min-w-0 text-center md:border-l">
              <Heart className="mx-auto mb-4 h-8 w-8" />
              <h3 className="font-semibold mb-2 tracking-wide">
                SATISFIED OR REFUNDED
              </h3>
              <p className="text-sm text-gray-600">
                30-day money-back guarantee
              </p>
            </div>

            <div className="min-w-[240px] md:min-w-0 text-center md:border-l">
              <ShieldCheck className="mx-auto mb-4 h-8 w-8" />
              <h3 className="font-semibold mb-2 tracking-wide">
                SECURE PAYMENT
              </h3>
              <p className="text-sm text-gray-600">
                SSL encrypted checkout
              </p>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .why-scroll {
                animation: whyAutoScroll 20s linear infinite;
              }
            }
            @keyframes whyAutoScroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* ================= ANNOUNCEMENT ================= */}
        <AnnouncementPopup />

        {/* ================= REVIEWS AUTO SCROLL ================= */}
        <style>{`
          .animate-scroll {
            animation: scroll 35s linear infinite;
          }
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

      </div>
    </div>
  );
}

export default PublicHome;
