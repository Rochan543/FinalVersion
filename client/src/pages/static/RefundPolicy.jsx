import Header from "@/components/shopping-view/header";
import Footer from "@/components/common/Footer";

function RefundPolicy() {
  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="bg-gray-100 min-h-[70vh] py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Refund & Return Policy
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We accept returns only for <span className="font-semibold">damaged</span> or{" "}
            <span className="font-semibold">incorrect products</span>.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Requests must be raised within{" "}
            <span className="font-semibold">48 hours</span> of delivery along
            with proper proof such as images or videos.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Once approved, refunds will be processed within{" "}
            <span className="font-semibold">7–10 business days</span> through
            the original mode of payment.
          </p>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              For any refund-related questions, please contact our support team
              with your order ID.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <Footer />
    </>
  );
}

export default RefundPolicy;
