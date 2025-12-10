
import AdvertisementTickets from "./Advertisement";
import HeroBanner from "./HeroBanner";
import LatestTickets from "./Latesttickets";


import PopularRoute from "./PopularRoute";
import WhyChooseUs from "./WhyChooseUs";


const Home = () => {
  return (
    <div className="space-y-16">

      {/* Hero Slider */}
      <HeroBanner />
     
      <AdvertisementTickets></AdvertisementTickets>
     <LatestTickets></LatestTickets>
     <PopularRoute></PopularRoute>
    <WhyChooseUs></WhyChooseUs> 

    </div>
  );
};

export default Home;