
const blogPosts = [
  {
    id: 1,
    title: 'The magic of Sand Wax - Aura Decor',
    date: 'May 16, 2024',
    image: '/Designer.jpeg',
    content: `
      <p>Sand wax candles create a unique visual effect that enhances any room's ambiance. Aura Decor brings you these stunning candles that burn with a soft, mesmerizing glow.</p>
      <p>Our sand wax candles are designed with intricate patterns and are available in various scents to elevate your senses.</p>
      <p>Experience the magic of sand wax and transform your space into a serene retreat.</p>
    `,
  },
  {
    id: 2,
    title: 'Enchanting Lavender Aroma',
    date: 'June 10, 2024',
    image: '/lavender.webp',
    content: `
      <p>Lavender candles are perfect for relaxation and stress relief. Aura Decor's lavender candles are crafted with the finest ingredients to provide a calming aroma that soothes your mind and body.</p>
      <p>Light one of our lavender candles after a long day and let the gentle fragrance envelop you in tranquility.</p>
    `,
  },
  {
    id: 3,
    title: 'Citrus Burst for a Fresh Start',
    date: 'July 1, 2024',
    image: '/citrus.webp',
    content: `
      <p>Start your day with the invigorating scent of citrus. Our citrus burst candles are infused with natural essential oils that awaken your senses and energize your spirit.</p>
      <p>Perfect for morning routines or to freshen up any room, these candles are a must-have for citrus lovers.</p>
    `,
  },
  {
    id: 4,
    title: 'Vanilla Dreams for Cozy Evenings',
    date: 'August 5, 2024',
    image: '/vanila.webp',
    content: `
      <p>Vanilla candles bring a warm and cozy feeling to your home. Aura Decor's vanilla dreams candles are ideal for creating a comforting and inviting atmosphere.</p>
      <p>Light a vanilla candle during your evening relaxation time and enjoy the sweet, soothing aroma that fills the air.</p>
    `,
  },
];

const Blog = () => {
  return (
    <div className="container flex justify-center items-center w-full px-6 lg:px-8 py-8 bg-orange-50">
      <div className="w-2/3">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white py-10 px-32 shadow-md rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full mb-3 max-h-10px rounded-xl  object-cover"
              />
              <div className="">
                <h2 className="text-2xl font-semibold mb-4 text-orange-600">{post.title}</h2>
                <div className="text-gray-500 text-sm mb-6">{post.date}</div>
                <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Blog />
    </div>
  );
};

export default App;
