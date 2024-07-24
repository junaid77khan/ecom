import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const {paymentId} = location.state;
  const{orderId} = location.state;
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-orange-50 to-orange-0">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl uppercase font-bold">Order Successful</h1>
        {paymentId && <p className="text-gray-500 text-sm text-center">Payment Id : {paymentId}</p>}
        {orderId && <p className="text-gray-500 text-sm text-center">order Id : {orderId}</p>}
        <p className="text-center text-lg">Thank you for your order! Your order are on their way.</p>
        <button className="text-orange-500 text-lg hover:text-ornage-900 cursor-pointer" onClick={() => navigate("/categories")}>Continue shoping...</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
