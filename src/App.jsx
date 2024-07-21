import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { posts } from "./data/Blog-Data";

import { ContactUs, NavBar } from "./components";

import Footer from "./components/Footer";
import Blog from "./pages/BlogPost";
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
import OTPPage from "./pages/OTPPage";
import PaymentSuccess from "./pages/payment/PaymentSucess";
import SendOtp from "./pages/Sendotp";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/signin" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Register />} /> */}
          {/* <Route path="/otp-verification/:username" element={<OTPPage />} /> */}
          <Route path="/otp-verification" element={<OTPPage />} />

          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/blogs" element={<BlogPost post={posts[0]} />} />
          <Route path="/blogs/:id" element={<BlogRead posts={posts} />} />
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

          <Route path="/send-otp" element={<SendOtp />} />
        </Routes>
      </BrowserRouter>
      <div>
        <Footer />
        {/* <Outlet /> */}
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default App;

// const BlogList = ({ posts }) => {
//   return (
//     <div>
//       {posts.map(post => (
//         <BlogPost key={post.id} post={post} />
//       ))}
//     </div>
//   );
// };
