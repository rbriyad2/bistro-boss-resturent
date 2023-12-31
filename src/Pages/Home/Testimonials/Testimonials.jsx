import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";


const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <section className="my-20">
      <SectionTitle
        subheading={"What our client say"}
        heading={"Testimonials"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="mx-24 my-16 flex flex-col items-center">
              <Rating
                style={{ maxWidth: 180}}
                value={review.rating}
                readOnly
              />
<FaQuoteLeft className="text-5xl my-2" />

              <p className="py-2 text-center w-10/12">{review.details}</p>
              <h3 className="text-2xl text-yellow-700">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
