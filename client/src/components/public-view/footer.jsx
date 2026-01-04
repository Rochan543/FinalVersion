import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#5a1f1b] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <div className="leading-tight">
            <h3 className="text-xl font-bold text-[#d4af37]">
              Mr. Perfect
            </h3>
            <span className="text-sm text-gray-200">
              Fashion Club
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-300">
            Premium men's fashion store delivering quality clothing and style.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/mr._perfect_fashion_club"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="hover:text-[#d4af37]" size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="hover:text-[#d4af37]" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="hover:text-[#d4af37]" size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="hover:text-[#d4af37]" size={20} />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-lg font-semibold text-[#d4af37] mb-3">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop/home">Home</Link></li>
            <li><Link to="/shop/listing">Products</Link></li>
            <li><Link to="/shop/account">My Account</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-[#d4af37] mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* CONTACT + LOCATION */}
        <div>
          <h4 className="text-lg font-semibold text-[#d4af37] mb-3">
            Contact
          </h4>
          <p className="text-sm">Email: lookmrperfect@gmail.com</p>
          <p className="text-sm mt-1">Phone: +91 9704203874</p>

          <p className="text-sm mt-4 leading-relaxed text-gray-300">
            <strong>Store Location:</strong><br />
            Indiranagar Colony,<br />
            Visakhapatnam Road,<br />
            Balaji Nagar,<br />
            Vizianagaram,<br />
            Andhra Pradesh – 535003
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 py-3 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Mr. Perfect Fashion Club. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
