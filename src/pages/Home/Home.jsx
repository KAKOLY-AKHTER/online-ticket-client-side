
import Advertisement from "./Advertisement";
import HeroBanner from "./HeroBanner";
import LatestTickets from "./Latesttickets";


import PopularRoute from "./PopularRoute";
import WhyChooseUs from "./WhyChooseUs";


const Home = () => {
  return (
    <div className="space-y-16">

      {/* Hero Slider */}
      <HeroBanner />
     
      <Advertisement></Advertisement>
     <LatestTickets></LatestTickets>
     <PopularRoute></PopularRoute>
    <WhyChooseUs></WhyChooseUs> 

    </div>
  );
};

export default Home;