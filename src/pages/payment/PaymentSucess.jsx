import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get('reference');

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl uppercase">Order Successful</h1>
                <p>Reference No. {referenceNum}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
