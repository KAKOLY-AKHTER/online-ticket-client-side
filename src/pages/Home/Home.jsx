import HeroBanner from "./HeroBanner";
import PopularRoute from "./PopularRoute";
import WhyChooseUs from "./WhyChooseUs";


const Home = () => {
  return (
    <div className="space-y-16">

      {/* Hero Slider */}
      <HeroBanner />

     <PopularRoute></PopularRoute>
    <WhyChooseUs></WhyChooseUs> 

    </div>
  );
};

export default Home;