/* eslint-disable react/prop-types */

const PaymentCard = ({ amount, img, checkoutHandler }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={img} className="w-64 h-64 object-cover" alt="Product" />
      <p>₹{amount}</p>
      <button
        onClick={() => checkoutHandler(amount)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Buy Now
      </button>
    </div>
  );
};

export default PaymentCard;
