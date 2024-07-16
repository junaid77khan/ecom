import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function LoaderPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <TailSpin color="#3B82F6" height={40} width={40} />
            <p>Loading...</p>
        </div>
    );
}

export default LoaderPage;
