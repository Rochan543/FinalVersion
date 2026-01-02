import Header from "@/components/shopping-view/header";
import Footer from "@/components/common/Footer";

function AboutUs() {
  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="bg-gray-100 min-h-[70vh] py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            About Us
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <span className="font-semibold">Mr. Prefect Fashion Club</span> is a
            men’s fashion and lifestyle brand dedicated to delivering
            high-quality clothing and accessories at affordable prices.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We focus on modern designs, premium fabrics, and customer
            satisfaction. Our collections include casual wear, formal wear,
            ethnic styles, and accessories curated for today’s lifestyle.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Our mission is to provide a seamless online shopping experience
            backed by reliable customer support and transparent policies.
          </p>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              Thank you for choosing Mr. Prefect Fashion Club. We look forward
              to being part of your style journey.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <Footer />
    </>
  );
}

export default AboutUs;
