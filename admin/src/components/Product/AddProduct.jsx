import ProductForm from "./Product_Form";

const AddProduct = () => {
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
        <div>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <ProductForm productData={productData} />
        </div>
    )
}

export default AddProduct