import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const lastUpdated = "Jun 27th 2024";

  const sections = [
    {
      title: "Definitions",
      content: "For the purpose of these Terms and Conditions, The term \"we\", \"us\", \"our\" used anywhere on this page shall mean SKP DECOR PRIVATE LIMITED, whose registered/operational office is SECOND FLOOR, 29, POCKET 13, ROHINI SECTOR 20, Begumpur, New Delhi North West Delhi DELHI 110086. \"you\", \"your\", \"user\", \"visitor\" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us."
    },
    {
      title: "Use of Website",
      content: [
        "The content of the pages of this website is subject to change without notice.",
        "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
        "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
        "All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
        "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense."
      ]
    },
    {
      title: "External Links",
      content: [
        "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.",
        "You may not create a link to our website from another website or document without SKP DECOR PRIVATE LIMITED's prior written consent."
      ]
    },
    {
      title: "Governing Law",
      content: "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India."
    },
    {
      title: "Liability",
      content: "We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time"
    },
    {
      title: "Disclaimer",
      content: "The above content is created at SKP DECOR PRIVATE LIMITED's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it."
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
        <div className="bg-orange-500 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
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
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">{section.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;