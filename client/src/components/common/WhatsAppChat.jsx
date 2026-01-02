import { MessageCircle } from "lucide-react";

function WhatsAppChat() {
  const phoneNumber = "+91 9704203874"; // 🔴 replace with REAL number
  const message = "Hello, I need help with my order.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}

export default WhatsAppChat;
