
const DummyCategoryCard = () => {
    const dummyCategory = {
      _id: 'dummyId',
      image: 'https://via.placeholder.com/300', 
    };
  
    return (
      <div
        key={dummyCategory._id}
        className="flex flex-col justify-start items-start gap-3 w-72 sm:w-72 h-80 sm:h-96 px-4 py-6 bg-white overflow-hidden duration-200 rounded-lg"
      >
        <div className="w-full h-3/4 bg-gray-300 rounded-lg animate-pulse"></div>
        <h1 className="text-md md:text-lg">
        <div className="h-2.5  bg-gray-300 rounded-full  w-32 mb-2"></div>
        </h1>
        <div>
        <div className="w-48 h-2 bg-gray-300 rounded-full "></div>
        </div>
      </div>
    );
  };
  
  export {DummyCategoryCard};