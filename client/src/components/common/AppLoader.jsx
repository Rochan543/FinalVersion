import logo from "/logo.jpeg"; // or "@/assets/logo.png"

function AppLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      
      {/* LOGO */}
      <img
        src={logo}
        alt="Mr. Prefect Fashion Club"
        className="h-20 w-20 mb-6 animate-pulse"
      />

      {/* TEXT */}
      <p className="text-gray-600 text-sm tracking-wide">
        Loading, please wait...
      </p>

      {/* SPINNER */}
      <div className="mt-4 h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
}

export default AppLoader;
