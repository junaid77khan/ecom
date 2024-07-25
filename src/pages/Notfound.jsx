import { setTitle } from "../utils/setTitle";

export const NotFound = () => {
  setTitle("404 Not Found");

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-orange-50">
      <h1 className="text-[15rem] font-extrabold text-orange-500 tracking-widest">
        404
      </h1>
      <div className="bg-orange-950 opacity-90 text-white px-20 py-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <button className="relative rounded-2xl border-2 inline-flex items-center justify-start px-8  py-4 overflow-hidden font-medium transition-all bg-orange-500 hover:bg-orange-500 hover:border-orange-500 group">
        <a href="/">
          <span className="w-40 h-40 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
          <span className="relative w-full text-center text-md text-white transition-colors duration-300 ease-in-out group-hover:text-orange-500">
            Go Home
          </span>
        </a>
      </button>
    </main>
  );
};
