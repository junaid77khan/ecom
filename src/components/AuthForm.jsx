import { Link } from 'react-router-dom';
import { useState } from 'react'; 

const Spinner = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
  </div>
);

const AuthForm = ({ isLogin, handleSubmit, email, setEmail, password, setPassword, username, setUsername, error, loading, usernameErrMessage, emailErrMessage, passwordErrMessage }) => {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">{isLogin ? 'Login' : 'Sign up'}</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                {!isLogin && (
                  <>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <p className={`text-xs md:text-sm text-red-500 ${usernameErrMessage !== 'Empty' ? 'visible' : 'invisible'}`}>{usernameErrMessage}</p>
                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className={`text-xs md:text-sm text-red-500 ${emailErrMessage !== 'Empty' ? 'visible' : 'invisible'}`}>{emailErrMessage}</p>
                  </>
                )}
                {isLogin && (<>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className={`text-xs md:text-sm text-red-500 ${emailErrMessage !== 'Empty' ? 'visible' : 'invisible'}`}>{emailErrMessage}</p>
                </>)}
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className={`text-xs md:text-sm text-red-500 ${passwordErrMessage !== 'Empty' ? 'visible' : 'invisible'}`}>{passwordErrMessage}</p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                  type="submit"
                  className="mt-5  font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none relative"
                  disabled={loading} 
                >
                  {loading && <Spinner />}
                  <svg className={`w-6 h-6 ml-2 ${loading ? 'opacity-0' : 'opacity-100'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className={` ml-3 ${loading ? 'invisible' : 'visible'}`}>{isLogin ? 'Login' : 'Sign Up'}</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  {isLogin ? (
                    <span>
                      Don&apos;t have an account? <Link to="/signup" className="border-b border-gray-500 border-dotted">Sign up</Link>
                    </span>
                  ) : (
                    <span>
                      Already have an account? <Link to="/signin" className="border-b border-gray-500 border-dotted">Login</Link>
                    </span>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-orange-100 text-center hidden lg:flex items-center justify-center">
          <div
            className=" w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${import.meta.env.VITE_API_LOG_SIGN_IMAGE})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
