/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';

const BlogRead = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(post => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-16">
      {/* Blog Content Section */}
      <div className="w-full max-w-4xl">
        {/* Header Image */}
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full object-cover rounded-lg"
        />

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-8 mb-4">
          {post.title}
        </h1>

        {/* Date */}
        <div className="text-sm md:text-base lg:text-lg text-gray-600 text-center mb-4">
          {post.date}
        </div>

        {/* Introduction */}
        <div className="text-base md:text-lg lg:text-xl text-gray-800 mb-8">
          <p>{post.introduction}</p>
        </div>

        {/* Blog Content */}
        <div className="text-base md:text-lg lg:text-xl text-gray-800">
          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4">{paragraph}</p>
              ))}
              {section.image && (
                <img src={section.image} alt={section.imageAlt} className="w-full object-cover rounded-lg mb-4" />
              )}
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div className="w-full max-w-4xl mt-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Leave a comment</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded mt-1" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded mt-1" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comment</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded mt-1" 
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Post comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
