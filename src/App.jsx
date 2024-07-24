import { BrowserRouter, Routes, Route } from "react-router-dom";
import { posts } from "./data/Blog-Data";

import { ContactUs, NavBar } from "./components";
import { Toaster } from "sonner";

import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Categories from "./pages/Categories_Component/Categories";
import CategoryProducts from "./pages/Categories_Component/Category1";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { store } from "./store/store";
import BlogPost from "./pages/BlogPost";
import BlogRead from "./pages/BlogRead";
import CheckoutPage from "./pages/Checkout";
import { NotFound } from "./pages/Notfound";
import PaymentSuccess from "./pages/payment/PaymentSucess";
import OtpForm from "./pages/OtpForm";
// import { PrivacyPolicy } from "./pages/PrivacyPolicy";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/otp" element={<OtpForm />} />
          {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}

          <Route path="/blogs" element={<BlogPost post={posts[0]} />} />
          <Route path="/blogs/:id" element={<BlogRead posts={posts} />} />
          <Route path="/" element={<Home />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="categories" element={<Categories />} />
          <Route
            path="categories/:categoryId/:categoryName"
            element={<CategoryProducts />}
          />
          <Route
            path="product/:productId"
            element={<ProductDetails key={location.pathname} />}
          />
          <Route path="product/:product/checkout" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="contact-us" element={<ContactUs />} />

          <Route path="cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />

          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </Provider>
  );
}

export default App;
