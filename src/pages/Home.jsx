import "@fortawesome/fontawesome-svg-core/styles.css";
import {} from "react-icons/fa";
import BestSeller from "../components/Home/BestSeller";
import FeaturedCandles from "../components/Home/FeaturesCandles";
import HomeCategories from "../components/Home/HomeCategories";
import Testimonials from "../components/Home/Testimonials";
import Banner from "../components/Home/Banner";
import { RiWhatsappFill } from "react-icons/ri";

function Home() {
  const whatsappGroupLink = "https://api.whatsapp.com/send?phone=918360175563&text=Hey%20there";

  return (
    <div className="w-full h-full text-black ">
      <Banner />
      <HomeCategories />

      <FeaturedCandles />

      <BestSeller />

      <Testimonials />

      <div
        className="fixed bottom-4 left-6 z-50 cursor-pointer"
        onClick={() => window.open(whatsappGroupLink, "_blank")}
      >
        <RiWhatsappFill className="w-12 h-12 text-green-500  " />
      </div>
    </div>
  );
}

export default Home;
