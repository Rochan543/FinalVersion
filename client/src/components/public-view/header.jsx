import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function PublicHeader() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Mr.Prefect Logo"
            className="h-8"
          />
          <span className="font-bold text-xl">Mr.Prefect</span>
        </div>

        {/* CENTER – DESKTOP ONLY (UNCHANGED) */}
        <nav className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/auth/login">Products</Link>
          <Link to="/auth/login">Men</Link>
          <Link to="/auth/login">Kids</Link>
          <Link to="/auth/login">Search</Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* DESKTOP BUTTONS (UNCHANGED) */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/auth/login"
              className="border border-black px-4 py-2 rounded font-medium hover:bg-black hover:text-white transition"
            >
              Sign In
            </Link>

            <Link
              to="/auth/register"
              className="border border-black px-4 py-2 rounded font-medium hover:bg-black hover:text-white transition"
            >
              Sign Up
            </Link>
          </div>

          {/* MOBILE TOGGLE (NEW – NO LOGIC CHANGE) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-4 mt-6">
                  <Link to="/">Home</Link>
                  <Link to="/auth/login">Products</Link>
                  <Link to="/auth/login">Men</Link>
                  <Link to="/auth/login">Kids</Link>
                  <Link to="/auth/login">Search</Link>

                  <hr />

                  <Link
                    to="/auth/login"
                    className="border border-black px-4 py-2 rounded font-medium text-center"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/auth/register"
                    className="border border-black px-4 py-2 rounded font-medium text-center"
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
