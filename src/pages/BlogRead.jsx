// /* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { posts } from "../data/Blog-Data";

const BlogRead = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  console.log(post);

  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-16 bg-orange-50">
      
      <div className="w-full max-w-4xl">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full lg:w-1/2 mx-auto h-96 object-cover rounded-lg"
        />

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-8 mb-4">
          {post.title}
        </h1>

        <div className="text-sm md:text-base lg:text-lg text-gray-600 text-center mb-4">
          {post.date}
        </div>

        <div className="text-base md:text-lg lg:text-xl text-gray-800 mb-8">
          <p>{post.introduction}</p>
        </div>

        <div className="text-base md:text-lg lg:text-xl text-gray-800">
          {post?.content?.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {section.title && section?.title}
              </h2>
              {section?.paragraphs &&
                section?.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              {section.image && (
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="w-full lg:w-1/2 h-96 object-cover rounded-lg mb-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogRead;

BlogRead.jsx;
