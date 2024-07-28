import { motion } from 'framer-motion';

const ShippingDeliveryPolicy = () => {
  const lastUpdated = "Jun 27th 2024";

  const sections = [
    {
      title: "International Shipping",
      content: "For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only."
    },
    {
      title: "Domestic Shipping",
      content: "For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only."
    },
    {
      title: "Shipping Timeline",
      content: "Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms."
    },
    {
      title: "Delivery Disclaimer",
      content: "SKP DECOR PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation."
    },
    {
      title: "Delivery Address",
      content: "Delivery of all orders will be to the address provided by the buyer."
    },
    {
      title: "Service Delivery Confirmation",
      content: "Delivery of our services will be confirmed on your mail ID as specified during registration."
    },
    {
      title: "Customer Support",
      content: "For any issues in utilizing our services you may contact our helpdesk on 8360175563 or skpdecor3@gmail.com"
    },
    {
        title: "Refunds",
        content:"No cancellations & Refunds are entertained"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-0 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Shipping & Refund Policy</h1>
          <p className="text-white text-sm mt-1">Last updated on {lastUpdated}</p>
        </div>
        <div className="p-6">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingDeliveryPolicy;