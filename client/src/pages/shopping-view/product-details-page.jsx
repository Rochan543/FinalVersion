import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/products-slice";

import { getReviews } from "@/store/shop/review-slice";

import ProductDetailsView from "@/components/shopping-view/product-details-view";
import CustomerReviews from "@/components/shopping-view/customer-reviews";
import RecommendedProducts from "@/components/shopping-view/recommended-products";
import Footer from "@/components/common/Footer";


function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails } = useSelector((state) => state.shopProducts);
  const { reviews } = useSelector((state) => state.shopReview);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getReviews(id));

    return () => {
      dispatch(setProductDetails(null));
    };
  }, [id, dispatch]);

  if (!productDetails) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        Loading product details...
      </div>
    );
  }

  return (
        <>
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">

      {/* PRODUCT INFO */}
      <ProductDetailsView productDetails={productDetails} />

      {/* REVIEWS + WRITE REVIEW */}
      <CustomerReviews productId={productDetails._id} reviews={reviews} />

      {/* RECOMMENDED PRODUCTS */}
      <RecommendedProducts
        category={productDetails.category}
        currentProductId={productDetails._id}
      />
      
    </div>
    {/* FOOTER */}
      <Footer />
  </>
  );
}

export default ProductDetailsPage;
