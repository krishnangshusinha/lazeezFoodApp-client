import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const [cart] = useCart();

  //   calculate final price
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  // console.log(totalPrice);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;