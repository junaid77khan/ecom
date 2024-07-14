
const Form = () => {
  return (
    <div className="h-full flex items-center justify-center pt-4 bg-orange-50">
    <div className="w-full lg:w-full px-4 md:px-10 lg:px-20 xl:px-40 py-8 bg-white text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Let&apos;s Stay In Touch
      </h1>
      <p className="text-gray-600 mb-8">
        Enjoy 10% off on your first purchase and be the first to know about
        offers, new releases, and latest stories.
      </p>
      <form className="pb-16">
        <input
          type="email"
          className="w-full px-4 py-3 text-center rounded-md bg-gray-200 focus:outline-none focus:bg-white focus:border-gray-300 mb-2"
          placeholder="Enter your email address"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>  )
}

export default Form