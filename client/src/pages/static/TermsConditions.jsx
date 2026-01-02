import Header from "@/components/shopping-view/header";
import Footer from "@/components/common/Footer";

function TermsConditions() {
  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="bg-gray-100 min-h-[70vh] py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Terms & Conditions
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            By accessing and using{" "}
            <span className="font-semibold">Mr. Prefect Fashion Club</span>,
            you agree to comply with and be bound by the following terms and
            conditions.
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>
              All prices and product availability are subject to change without
              prior notice.
            </li>
            <li>
              Orders once shipped cannot be cancelled under any circumstances.
            </li>
            <li>
              Product images are for representation purposes only; actual
              products may vary slightly.
            </li>
            <li>
              Unauthorized use, reproduction, or distribution of website
              content is strictly prohibited.
            </li>
          </ul>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              If you do not agree with any part of these terms, please discontinue
              use of the website immediately.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <Footer />
    </>
  );
}

export default TermsConditions;
