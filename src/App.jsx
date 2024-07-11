import { BrowserRouter, Routes, Route } from "react-router-dom";
import { posts } from './data/Blog-Data';

import { ContactUs, NavBar } from "./components";

import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/Footer";
import Blog from "./pages/BlogPost";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Categories from "./pages/Categories_Component/Categories";
import CategoryProducts from "./pages/Categories_Component/Category1";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import BlogPost from "./pages/BlogPost";
import BlogRead from "./pages/BlogRead";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
            path="categories/:categoryName"
            element={<CategoryProducts />}
          />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="contact-us" element={<ContactUs />} />

          <Route path="cart" element={<Cart />} />
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

const BlogList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};