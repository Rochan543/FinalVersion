import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">

      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-[#4b1e1b] text-center px-10">

        {/* Welcome Text */}
        <p className="text-lg tracking-wide text-[#d8c3a0]">
          Welcome to
        </p>

        {/* Brand Title */}
        <h1 className="mt-1 text-3xl font-semibold tracking-widest text-[#e6c98f]">
          MR PERFECT
        </h1>
        <p className="mt-2 text-xl text-[#d8c3a0]">
          Men’s Fashion Club
        </p>

        {/* LOGO – PERFECT CIRCLE, NO BORDER */}
        <div className="mt-10 w-72 h-72 rounded-full overflow-hidden bg-[#4b1e1b]">
          <img
            src="/logo.jpeg"
            alt="Mr Perfect Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Signature Text
        <p className="mt-6 text-[#e6c98f] text-2xl italic">
          Mr… Perfect
        </p> */}
      </div>

      {/* RIGHT AUTH SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#f7f7f7]">
        <div className="w-full max-w-sm px-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;
