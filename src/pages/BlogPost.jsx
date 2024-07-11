/* eslint-disable react/prop-types */
// const blogPosts = [
//   {
//     id: 1,
//     title: 'The magic of Sand Wax - Aura Decor',
//     date: 'May 16, 2024',
//     image: '../public/Designer.jpeg',
//     content: `
//       <p>Sand wax candles create a unique visual effect that enhances any room's ambiance. Aura Decor brings you these stunning candles that burn with a soft, mesmerizing glow.</p>
//       <p>Our sand wax candles are designed with intricate patterns and are available in various scents to elevate your senses.</p>
//       <p>Experience the magic of sand wax and transform your space into a serene retreat.</p>
//     `,
//   },
//   {
//     id: 2,
//     title: 'Enchanting Lavender Aroma',
//     date: 'June 10, 2024',
//     image: '../public/lavender.webp',
//     content: `
//       <p>Lavender candles are perfect for relaxation and stress relief. Aura Decor's lavender candles are crafted with the finest ingredients to provide a calming aroma that soothes your mind and body.</p>
//       <p>Light one of our lavender candles after a long day and let the gentle fragrance envelop you in tranquility.</p>
//     `,
//   },
//   {
//     id: 3,
//     title: 'Citrus Burst for a Fresh Start',
//     date: 'July 1, 2024',
//     image: '../public/citrus.webp',
//     content: `
//       <p>Start your day with the invigorating scent of citrus. Our citrus burst candles are infused with natural essential oils that awaken your senses and energize your spirit.</p>
//       <p>Perfect for morning routines or to freshen up any room, these candles are a must-have for citrus lovers.</p>
//     `,
//   },
//   {
//     id: 4,
//     title: 'Vanilla Dreams for Cozy Evenings',
//     date: 'August 5, 2024',
//     image: '../public/vanila.webp',
//     content: `
//       <p>Vanilla candles bring a warm and cozy feeling to your home. Aura Decor's vanilla dreams candles are ideal for creating a comforting and inviting atmosphere.</p>
//       <p>Light a vanilla candle during your evening relaxation time and enjoy the sweet, soothing aroma that fills the air.</p>
//     `,
//   },
// ];

// const Blog = () => {
//   return (
//     <a href="">
//       {" "}
//       <div className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-16">
//         {/* Image Section */}
//         <div className="w-full max-w-4xl h-full ">
//           <img
//             src="../../public/blog.jpg"
//             alt="Sand Wax Aura Decor"
//             className="w-full h-[25rem] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
//           />
//         </div>

//         {/* Blog Content Section */}
//         <div className="w-full max-w-4xl mt-8">
//           {/* Title */}
//           <h1 className="text-2xl md:text-3xl  hover:underline underline-offset-4 lg:text-4xl font-bold text-center mb-4">
//             The magic of Sand Wax - Aura Decor
//           </h1>

//           {/* Date */}
//           <div className="text-sm md:text-base lg:text-lg text-gray-600 text-center mb-4">
//             MAY 16, 2024
//           </div>

//           {/* Introduction */}
//           <div className="text-base md:text-lg lg:text-xl text-gray-800">
//             <p>
//               Welcome to our comprehensive guide on Sand wax – a practical
//               solution for creative candle making. In this guide, we'll delve
//               into the essentials of Sand wax, from its...
//             </p>
//           </div>
//         </div>
//       </div>
//     </a>
//   );
// };

// export default Blog;


import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  if (!post) {
    return <div>No post found.</div>;
  }
  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-16">
      
      <Link to={`/blog/${post.id}`} className="w-full max-w-4xl overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
        />
      </Link>

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
    </div>
  );
};

export default BlogPost;


//blog as prop
// const BlogPost = ({ title, date, introduction, imageUrl }) => {
//   return (
//     // Use the same structure as above
//     // Replace static content with the props like {title}, {date}, {introduction}, and {imageUrl}
//   );
// };

// // Usage Example
// <BlogPost
//   title="The magic of Sand Wax - Aura Decor"
//   date="MAY 16, 2024"
//   introduction="Welcome to our comprehensive guide on Sand wax – a practical solution for creative candle making. In this guide, we'll delve into the essentials of Sand wax, from its..."
//   imageUrl="path-to-your-image.png"
// />
