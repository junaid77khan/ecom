// import { Outlet } from "react-router-dom";
import {
  Categories,
  Category1,
  CategoryLayout,
  ContactUs,
  NavBar,
} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/Footer";
import Blog from "./pages/blog";
import ProductDetails from "./pages/ProductDetails";
import Home from "./components/Home";
import CategoryProducts from "./components/Categories_Component/Category1";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/productDetails" element={<ProductDetails />} /> */}
          {/* <Route path='/' element={<App />}> */}
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="contact-us" element={<ContactUs />} />
          {/* <Route path="categories" element={<CategoryLayout />}> */}
          {/* <Route index element={<Categories />} /> */}
          {/* <Route path="category1" element={<Category1 />} /> */}
          <Route  path="/categories" element={<Categories />} />
          <Route
            path="/categories/:categoryName"
            element={<CategoryProducts />}
          />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
        {/* <Outlet /> */}
      </div>
    </>
  );
}

export default App;
