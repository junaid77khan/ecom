import { motion } from "framer-motion";

import { ImagesSlider } from "../../components/ui/images-slider";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  const images = [`${import.meta.env.VITE_API_BANNER1}`, `${import.meta.env.VITE_API_BANNER2}`, `${import.meta.env.VITE_API_BANNER3}`];

  return (
    <div className=" relative">
      <ImagesSlider className="h-[40rem] brightness-90" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-4xl sm:text-3xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            The art of home fragrance <br />{" "}
            <span className="px-3 md:px-0 text-lg m-0 tracking-tight md:text-3xl lg:text-4xl text-orange-500">
              Discover a sensory experience with our unique decors
            </span>
          </motion.p>

          <button
            onClick={() => navigate("/categories")}
            className="relative rounded-full border-2 border-orange-500 inline-flex items-center justify-start lg:px-12 px-8 lg:py-4 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white group"
          >
            <span className="w-36 h-36 border-6 border-orange-700 rounded rotate-[-40deg] bg-orange-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center md:text-xl text-lg text-orange-500 transition-colors duration-300 ease-in-out group-hover:text-white">
              Shop
            </span>
          </button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default Banner;
