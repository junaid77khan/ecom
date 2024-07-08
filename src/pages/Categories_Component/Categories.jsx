

import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Scented Candles",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/candle3.jpg",
    },
    {
      id: 2,
      name: "Pillar Candles",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/candle6.jpg",
    },
    {
      id: 3,
      name: "Tea light candles",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/candle8.jpg",
    },
    {
      id: 4,
      name: "Jar Candles",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/candle2.jpg",
    },
    {
      id: 5,
      name: "Aroma Diffusers",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/candle4.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-6">Our Categories</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            onClick={() => navigate(`/categories/${category.name}`)}
            key={category.id}
            className="bg-white hover:bg-gray-100 duration-200 p-4 shadow-md rounded-lg h-96 w-96 cursor-pointer"
          >
            <div className="mb-4 w-full h-56">
              <img
                src={category.image}
                alt={category.name}
                className="rounded-lg bg-cover bg-center h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
