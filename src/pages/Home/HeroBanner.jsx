import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import train from '../../assets/images/train.jpeg'
import plan from '../../assets/images/plan.jpg'
import bus from '/bus.jpeg'
import Container from "../../components/Shared/Container";



const HeroBanner = () => {
  return (
    <Container>
    <div className="w-full h-[70vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-full"
      >
        {/* Slide 1: Bus */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={bus}
              alt="Bus Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Easy Bus Ticket Booking</h1>
              <p className="mt-4 text-lg md:text-xl">Fast, Secure & Affordable Journeys</p>
              <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition">
                Browse Tickets
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Train */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={train}
              alt="Train Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 min-h-screen bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Comfortable Train Journeys</h1>
              <p className="mt-4 text-lg md:text-xl">Experience smooth travel with TicketBari</p>
              <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition">
                See Tickets
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Adventure */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={plan}
              alt="Adventure Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 min-h-screen bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Plan Your Next Adventure</h1>
              <p className="mt-4 text-lg md:text-xl">Discover routes & perks easily</p>
              <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition">
                Get Started
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    </Container>
  );
};

export default HeroBanner;
