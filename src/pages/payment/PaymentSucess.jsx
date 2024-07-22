import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  const Signature = searchQuery.get("signature");
  const OrderID = searchQuery.get("order_id");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl uppercase">Order Successful</h1>
        <p className="text-black">Reference No. {referenceNum}</p>
        <p className="text-black">Signature. {Signature}</p>
        <p className="text-black">ORder ID. {OrderID}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
