import CardProfile from "../components/Cards/CardProfile";
import CardSettings from "../components/Cards/CardSettings";



export default function Add() {
  const productData = {
    name: "",
    description: "",
    features: [],
    specifications: [],
    actualPrice: 0,
    salePrice: 0,
    stock: 0,
    category: null,
}
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings productData={productData} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile productData={productData} />
        </div>
      </div>
    </>
  );
}

