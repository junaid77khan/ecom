/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { posts } from "../data/Blog-Data";

const BlogPost = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-16 bg-orange-50 gap-5">
      {posts.map((post) => (
        <div key={post.title} className="">
          <div className="w-full max-w-4xl flex flex-col cursor-pointer justify-center items-center overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className=" w-full lg:w-1/2 h-96 object-cover rounded-lg transform transition-transform duration-300 bg-cover"
            />
          </div>

          <div className="w-full max-w-4xl mt-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
              {post.title}
            </h1>
            <div className="text-sm md:text-base lg:text-lg text-gray-600 text-center mb-4">
              {post.date}
            </div>
            <div className="text-base md:text-lg lg:text-xl text-gray-800">
              <p>{post.introduction}</p>
            </div>
          </div>
          <button
            className="bg-orange-500 mt-2 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
            onClick={() => navigate(`/blogs/${post.id}`)}
          >
            Read...
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogPost;
