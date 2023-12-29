import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkoutfrom from './Checkoutfrom';
import useCart from '../../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
console.log(stripePromise);

const Payment = () => {
    const [cart]= useCart()
    const totalprice = parseFloat(cart.reduce((sum, item) => item.price + sum, 0).toFixed(2));


    return (
        <div className='px-5 w-full'>
        <SectionTitle heading='Payment Procesing'></SectionTitle>
            <h2 className='text-2xl font bold my-5'>Payment Now = ${totalprice}</h2>
            <Elements stripe={stripePromise}>
                <Checkoutfrom cart={cart} totalprice={totalprice}></Checkoutfrom>
            </Elements>
        </div>
    );
};

export default Payment;