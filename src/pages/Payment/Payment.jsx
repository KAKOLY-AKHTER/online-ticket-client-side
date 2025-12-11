

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
    const { bookingId } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
const navigate = useNavigate();


    // Load Booking Data
    const { data: booking } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    if (!booking) return <p>Loading...</p>;

    const price = booking.price;
    const quantity = booking.quantity;
    const ticketId = booking.ticketId;
    const title = booking.title;

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data } = await axiosSecure.post("/create-payment-intent", {
            price,
            quantity,
            ticketId,
            bookingId,
            title
        });

        const clientSecret = data.clientSecret;

        const card = elements.getElement(CardElement);

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card }
        });

        if (paymentResult.error) {
            alert(paymentResult.error.message);
            setLoading(false);
            return;
        }

        if (paymentResult.paymentIntent.status === "succeeded") {
            await axiosSecure.post("/save-transaction", {
                transactionId: paymentResult.paymentIntent.id,
                amount: price * quantity,
                ticketId,
                bookingId,
                title,
                quantity
            });

            alert("Payment Success!");
          navigate("/dashboard/user/transactions");

        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-5 shadow rounded">
            <h2 className="text-xl font-bold mb-4">
                Pay ${price * quantity} for {title}
            </h2>

         <form onSubmit={handlePayment}>
        {/* Stripe Card Input */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
          className="border p-3 rounded"
        />

        {/* Pay Button */}
        <button
          disabled={!stripe || loading}
          className="btn btn-primary mt-5 w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

        </div>
    );
};

export default Payment;