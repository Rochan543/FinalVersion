import Header from "@/components/shopping-view/header";
import Footer from "@/components/common/Footer";

function ContactUs() {
  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="legal-page-with-layout">
        <div className="legal-card">
          <h1 className="legal-title">Contact Us</h1>

          <p className="legal-text">
            We value our customers and are always happy to hear from you.
            If you have any questions or business inquiries, please reach out.
          </p>

          <div className="legal-box">
            <p>
              <strong>Email:</strong> contact@mrprefectfashion.com
            </p>
            <p>
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </p>
            <p>
              <strong>Business Hours:</strong> Mon–Sat, 10 AM – 7 PM
            </p>
          </div>

          <p className="legal-note">
            Please include your order ID for faster assistance.
          </p>
        </div>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <Footer />
    </>
  );
}

export default ContactUs;
