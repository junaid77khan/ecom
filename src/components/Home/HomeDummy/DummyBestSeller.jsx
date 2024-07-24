export const DummyBestSeller = () => {
    return (
        <div className="lg:flex shadow-xl py-4">
          <div className="lg:w-1/2 lg:p-4 p-2">
            <div className="relative px-6 lg:px-2">
              <div className="animate-pulse bg-gray-300 rounded-xl w-full lg:h-96 h-80"></div>
            </div>
            <div className="flex mt-4 overflow-x-auto">
              <div className="animate-pulse bg-gray-300 rounded-xl w-40 h-40 mx-2"></div>
              <div className="animate-pulse bg-gray-300 rounded-xl w-40 h-40 mx-2"></div>
              <div className="animate-pulse bg-gray-300 rounded-xl w-40 h-40 mx-2"></div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="animate-pulse lg:text-3xl text-2xl font-semibold lg:mb-2 bg-gray-300 h-8 w-3/4"></h2>
            <div className="animate-pulse bg-gray-300 h-6 w-1/2 my-2"></div>
            <div className="mb-4">
              <span className="animate-pulse bg-gray-300 h-8 w-1/2 inline-block"></span>
              <span className="animate-pulse bg-gray-300 h-6 w-1/3 inline-block ml-2"></span>
            </div>
            <p className="animate-pulse bg-gray-300 h-20 w-full"></p>
            <div className="mb-4">
              <h3 className="animate-pulse bg-gray-300 h-6 w-1/4 mb-2"></h3>
              <ul className="animate-pulse bg-gray-300 h-20 w-full"></ul>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4 font-bold animate-pulse bg-gray-300 h-6 w-1/5"></div>
              <div className="flex border border-gray-300 rounded text-md">
                <div className="px-3 py-1 animate-pulse bg-gray-300 h-6 w-1/12"></div>
              </div>
            </div>
            <div className="flex mb-4 gap-2">
              <div className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-gray-300 hover:bg-gray-300 hover:border-gray-300 group">
                <span className="animate-pulse bg-gray-300 h-8 w-1/3 inline-block"></span>
              </div>
              <div className="relative rounded-lg border-2 inline-flex items-center justify-start md:px-6 lg:px-5 px-4 py-2 overflow-hidden font-medium transition-all bg-gray-300 hover:bg-gray-300 hover:border-gray-300 group">
                <span className="animate-pulse bg-gray-300 h-8 w-1/3 inline-block"></span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="animate-pulse bg-gray-300 h-6 w-1/4 mb-2"></h3>
              <table className="animate-pulse bg-gray-300 h-20 w-full"></table>
            </div>
          </div>
        </div>
    )
}