import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">About Us</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6 text-gray-700"
          >
            <p className="text-lg leading-relaxed">
              Welcome to the world of SKP Decor Pvt. Ltd. – a place where premium quality and great value go hand in hand. At SKP Decor, we believe in creating more than just products; we craft experiences that enhance your home and lifestyle. Our passion for excellence is reflected in every item we offer, from the finest materials used to the meticulous quality checks we perform.
            </p>
            <p className="text-lg leading-relaxed">
              Every product is carefully built to deliver exceptional quality. Right from the materials used, to detailed quality checks, to thoughtful improvements, quality is at the core of everything we do. We invest our resources only on what is important to you, ensuring that each piece you bring into your home is designed to impress and built to last.
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1512717503929-fa4a86bb205c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="SKP Decor Craftsmanship" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-orange-800 opacity-20"></div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 space-y-6 text-gray-700"
        >
          <p className="text-lg leading-relaxed">
            Expect a little more every time you buy our product. Our commitment to excellence means that with each purchase, you're getting a piece of art that adds warmth, beauty, and a touch of luxury to your space. Fall in love with our finely crafted candle and home decor products, designed to elevate your living spaces and create a serene, inviting atmosphere.
          </p>
          <p className="text-lg leading-relaxed">
            At SKP Decor, we are more than just a brand – we are a community of decor enthusiasts who appreciate the finer things in life. Join us on this journey and discover the joy of beautifully crafted products that are made with love, care, and an unwavering dedication to quality.
          </p>
          <p className="text-lg font-semibold text-orange-800">
            Thank you for choosing SKP Decor Pvt. Ltd. – where your satisfaction and delight are our top priorities.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;