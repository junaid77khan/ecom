const PrivacyPolicy = () => {
  const policies = [
    {
      title: "Order Cancellation",
      description:
        "For any request of cancellation of order(s), please contact us within 6 hours of placing the order(s). Any request for cancellation shall not be entertained after the dispatch of the goods have been made.",
    },
    {
      title: "Returns",
      description: "No returns are allowed on purchased items.",
    },
    {
      title: "Exchanges",
      description:
        "Exchanges are allowed within 2 days after delivery if the wrong product was delivered.",
    },
    {
      title: "Incomplete Orders",
      description:
        "If your package does not contain some or all of the items ordered, please contact our customer support immediately.",
    },
    {
      title: "Replacements",
      description:
        "We only replace items if they contain any manufacturing defect(s) or are damaged.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-0 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-500 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">
            Privacy Policy & Terms
          </h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Welcome to our e-commerce platform. Please read our policies
            carefully to understand our practices regarding your orders and
            purchases.
          </p>
          {policies.map((policy, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {policy.title}
              </h2>
              <p className="text-gray-600">{policy.description}</p>
            </div>
          ))}
          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-gray-500">
              These policies are subject to change. We recommend checking this
              page periodically for any updates. If you have any questions about
              our policies, please contact our customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
