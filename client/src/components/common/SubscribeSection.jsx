import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { addSubscriber } from "@/store/subscriber-slice";
import { useState } from "react";

function SubscribeSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();

    try {
      await dispatch(addSubscriber(email)).unwrap();

      toast({
        title: "Thanks for subscribing 🎉",
        description: "You’ll receive updates on new arrivals and offers.",
      });

      setTimeout(() => {
        navigate("/auth/register");
      }, 1200);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="bg-gray-100 py-16 mt-16">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Subscribe to Mr.Prefect Fashion Club
        </h2>

        <p className="mt-4 text-gray-600">
          Get updates on new arrivals, exclusive offers, and fashion tips.
        </p>

        <form
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <Button type="submit" className="px-8 py-3">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SubscribeSection;
