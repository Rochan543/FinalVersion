import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold text-white">Mr.Prefect</h3>
          <p className="mt-2 text-sm">
            Premium men's fashion store delivering quality clothing and style.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-4 mt-3">
            <a
              href="https://www.instagram.com/mr._perfect_fashion_club?igsh=MTk4OGo2N2Z4bXQ3NQ==&utm_source=ig_contact_invite"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="hover:text-white" size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="hover:text-white" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="hover:text-white" size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="hover:text-white" size={20} />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Shop</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/shop/home">Home</Link></li>
            <li><Link to="/shop/listing">Products</Link></li>
            <li><Link to="/shop/account">My Account</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
          <p className="text-sm">Email: lookmrperfect@gmail.com</p>
          <p className="text-sm mt-1">Phone: +91 9704203874</p>

          {/* STORE LOCATION */}
          <p className="text-sm mt-2 leading-snug">
            <strong>Store Location:</strong><br />
            Mr.Prefect Fashion Club<br />
            Indiranagar Colony,<br />
            Visakhapatnam Road,<br />
            Balaji Nagar,<br />
            Vizianagaram,<br />
            Andhra Pradesh – 535003
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 py-3 text-center text-sm">
        © {new Date().getFullYear()} Mr.Prefect Fashion Club. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
