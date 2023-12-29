import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import './Chekoutfrom.css';

const Checkoutfrom = ({cart, totalprice }) => {
  const stripe = useStripe()
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [procesing, setProcesing] = useState(false)
  const [transationId, setTransationId] = useState('')
  const [cardSuccess, setCardSuccess] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
console.log(cart);
  useEffect(() => {
    axiosSecure.post('/create-payment-intent', {totalprice}).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [totalprice, axiosSecure]);

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    console.log(card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      // console.log("PaymentMethod", paymentMethod);
      setCardError("");
      setCardSuccess();
    }
    setProcesing(true)
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName || "anonymus",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("pay", paymentIntent);
    setProcesing(false)
    if(paymentIntent.status === 'succeeded'){
      setTransationId(paymentIntent.id)     
      const transation = paymentIntent.id;
      //todo next
      const payment={
        transationid: paymentIntent.id,
        email: user?.email,
        totalprice,
        date: new Date(),
        quantity: cart.length,
        status: 'service Pending',
        cartitems: cart.map(item => item._id),
        menuitems: cart.map(item => item.menuItemId),
        itemNames: cart.map(item => item.name)
      }
      axiosSecure.post('/payments', payment)
      .then(res=>{
        console.log(res);
        if(res.data.insertedId){
          //display confirm
        }
      })
    }

  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                padding: "10px",
                border: "1px solid #000",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn mr-16 btn-warning bt-sm mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || procesing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-xl my-4 text-red-700 font-bold">{cardError}</p>}
      {transationId && <p className="text-xl my-4 text-green-700 font-bold">Transation complete with {transationId}</p>}
     
    </>
  );
};

export default Checkoutfrom;
