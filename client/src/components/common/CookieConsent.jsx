import { useState } from "react";

function CookieConsent() {
  const [visible, setVisible] = useState(
    !localStorage.getItem("cookieAccepted")
  );

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm">
        We use cookies to improve your experience and analyze site traffic.
      </p>
      <button
        onClick={() => {
          localStorage.setItem("cookieAccepted", "true");
          setVisible(false);
        }}
        className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold"
      >
        Accept
      </button>
    </div>
  );
}

export default CookieConsent;
