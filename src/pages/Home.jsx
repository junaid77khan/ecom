import "@fortawesome/fontawesome-svg-core/styles.css";
import {} from "react-icons/fa";
import BestSeller from "../components/Home/BestSeller";
import FeaturedCandles from "../components/Home/FeaturesCandles";
import HomeCategories from "../components/Home/HomeCategories";
import Form from "../components/Home/Form";
import Testimonials from "../components/Home/Testimonials";
import Banner from "../components/Home/Banner";

function Home() {
  return (
    <div className="w-full h-full text-black ">
      <Banner />
      <HomeCategories />

      <FeaturedCandles />

      <BestSeller />

      <Testimonials />

      {/* <Form /> */}
    </div>
  );
}

export default Home;
