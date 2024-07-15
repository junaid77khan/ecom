

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Categories() {
  const navigate = useNavigate();
  let productCategories = [
    {
        id: 1,
        categoryName: "Pillar Candles",
        image: "/Pillar Candles.jpeg",
        description: "Explore a wide range of elegant home decor items to beautify your living spaces."
    },
    {
        id: 2,
        categoryName: "Scented Candles",
        image: "/Scented.jpeg",
        description: "Discover cutting-edge electronics that enhance your lifestyle, from smartphones to smart home devices."
    },
    {
        id: 3,
        categoryName: "Tea light candles",
        image: "/tea.jpeg",
        description: "Stay in style with the latest trends in fashion, including clothing, accessories, and footwear."
    },
    {
        id: 4,
        categoryName: "Jar Candles",
        image: "/jar.jpeg",
        description: "Immerse yourself in the world of literature with our curated collection of books across genres."
    },
    {
        id: 5,
        categoryName: "Tea light holders",
        image: "/holders.jpeg",
        description: "Equip yourself for adventure with high-quality sports gear and outdoor essentials."
    },
    {
        id: 6,
        categoryName: "Aroma Diffusers",
        image: "/Aroma.jpeg",
        description: "Enhance your beauty routine with skincare, makeup, and personal care products."
    },
    {
        id: 7,
        categoryName: "Gift Hampers",
        image: "/gift.jpeg",
        description: "Entertain and inspire with a diverse selection of toys and games for all ages."
    },
    {
        id: 8,
        categoryName: "Wax sachet",
        image: "/wax.jpeg",
        description: "Transform your kitchen into a culinary haven with top-quality cookware and dining essentials."
    }
  ];

  return (
    <div className="container py-12 flex flex-col justify-center items-center bg-orange-50">
      <h2 className="lg:text-3xl text-2xl font-bold mb-6 text-start">Categories</h2>
      <div className="flex flex-wrap justify-center items-center lg:gap-8 gap-4">
        {productCategories.map((category) => (
      <a
        key={category.id}
        href={`/categories/${encodeURIComponent(category.categoryName)}`}
        className="flex flex-col justify-center items-start gap-3 lg:w-80 lg:h-96 w-72 h-80 lg:px-6 px-4 py-6 bg-white overflow-hidden hover:bg-gray-200 duration-200 rounded-lg"
      >
        <div className="w-full h-3/4 overflow-hidden">
          <img
            className="bg-cover h-full w-full bg-center rounded-lg hover:scale-105 transition-transform duration-300 transform-gpu"
            src={category.image}
            alt={category.categoryName}
          />
        </div>
        <h1 className="text-lg lg:text-xl">
          {category.categoryName}{" "}
          <FontAwesomeIcon
            onClick={() => navigate("/collections")}
            className="cursor-pointer"
            icon={faArrowRight}
          />{" "}
        </h1>
        <div>
          <p className="text-gray-500 text-sm lg:text-md hover:text-black">{category.description.substring(0,80)}... 
          </p>
        </div>
      </a>
    ))}
      </div>
    </div>
  );
}

export default Categories;
