import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function PublicHeader() {
  return (
    <header className="border-b border-white/10 bg-[#5a1f1b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Mr Perfect Logo"
            className="h-10 w-10 rounded-full object-cover bg-transparent"
          />
          <div className="leading-tight">
            <span className="block font-bold text-lg text-[#d4af37]">
              Mr. Perfect
            </span>
            <span className="block text-xs text-[#f5e6b3]">
              Fashion Club
            </span>
          </div>
        </div>

        {/* CENTER – DESKTOP ONLY */}
        <nav className="hidden md:flex gap-6 text-[#f5e6b3] font-medium">
          <Link to="/" className="hover:text-[#d4af37]">Home</Link>
          <Link to="/auth/login" className="hover:text-[#d4af37]">Products</Link>
          <Link to="/auth/login" className="hover:text-[#d4af37]">Men</Link>
          <Link to="/auth/login" className="hover:text-[#d4af37]">Kids</Link>
          <Link to="/auth/login" className="hover:text-[#d4af37]">Search</Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/auth/login"
              className="border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-[#d4af37] hover:text-[#5a1f1b] transition"
            >
              Sign In
            </Link>

            <Link
              to="/auth/register"
              className="border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-[#d4af37] hover:text-[#5a1f1b] transition"
            >
              Sign Up
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-[#d4af37]">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 bg-[#5a1f1b] text-[#f5e6b3]">
                <nav className="flex flex-col gap-4 mt-6">
                  <Link to="/">Home</Link>
                  <Link to="/auth/login">Products</Link>
                  <Link to="/auth/login">Men</Link>
                  <Link to="/auth/login">Kids</Link>
                  <Link to="/auth/login">Search</Link>

                  <hr className="border-white/20" />

                  <Link
                    to="/auth/login"
                    className="border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded font-medium text-center"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/auth/register"
                    className="border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
