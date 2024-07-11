import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactUs, NavBar } from "./components";

import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/Footer";
import Blog from "./pages/blog";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Categories from "./pages/Categories_Component/Categories";
import CategoryProducts from "./pages/Categories_Component/Category1";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
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
          <Route path="categories" element={<Categories />} />
          <Route
            path="categories/:categoryName"
            element={<CategoryProducts />}
          />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="product/:product/payment" element={<PaymentPage />} />
          <Route path="contact-us" element={<ContactUs />} />

          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
        {/* <Outlet /> */}
      </div>
      <ToastContainer/>
    </Provider>
  );
}

export default App;
