import Header from "@/components/shopping-view/header";
import Footer from "@/components/common/Footer";

function PrivacyPolicy() {
  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="bg-gray-100 min-h-[70vh] py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <span className="font-semibold">Mr. Prefect Fashion Club</span>{" "}
            respects your privacy and is committed to protecting your personal
            information.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We collect information such as your name, email address, shipping
            address, and payment details strictly for order processing,
            customer support, and service improvement.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We do not sell, rent, or share your personal data with third parties,
            except when required for secure payment processing, order
            fulfillment, or legal compliance.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            By accessing or using our website, you consent to the terms outlined
            in this privacy policy.
          </p>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              We continuously review our privacy practices to ensure your data
              remains protected.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
