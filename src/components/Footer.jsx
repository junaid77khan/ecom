// import { AiOutlineFacebook } from "react-icons/ai";
// import { FaInstagram } from "react-icons/fa";
// import { AiOutlineLinkedin } from "react-icons/ai";
// import { AiOutlineYoutube } from "react-icons/ai";

// const Footer = () => {
//   return (
//     <footer className="bg-orange-800 text-white py-8">
//       <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Company</h3>
//           <ul>
//             <li>
//               <a href="/about" className="hover:underline">
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="/about" className="hover:underline">
//                 Privacy policy
//               </a>
//             </li>

//             <li>
//               <a href="/blog" className="hover:underline">
//                 Blog
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
//           <ul>
//             <li>
//               <a href="/contact-us" className="hover:underline">
//                 contact
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Useful links</h3>
//           <ul>
//             <li>
//               <a href="/" className="hover:underline">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/categories" className="hover:underline">
//                 categories
//               </a>
//             </li>

//             <li>
//               <a href="/cart" className="hover:underline">
//                 cart
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
//           <form>
//             <div className="flex mb-4">
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 rounded-l-md focus:outline-none"
//                 placeholder="Your email"
//               />
//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-2 rounded-r-md"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </form>
//           <div className="flex space-x-4">
//             <a href="https://facebook.com" className="hover:underline">
//               <AiOutlineFacebook className="h-6 w-6" />
//             </a>
//             <a
//               href="https://youtube.com/@skpdecor?si=2_I5vAIZYm67GraM"
//               className="hover:underline"
//             >
//               <AiOutlineYoutube className="h-6 w-6" />
//             </a>
//             <a
//               href="https://www.instagram.com/skpdecor?igsh=c2tmamtjemFkMXhp"
//               className="hover:underline"
//             >
//               <FaInstagram className="h-6 w-6" />
//             </a>
//             <a href="https://linkedin.com" className="hover:underline">
//               <AiOutlineLinkedin className="h-6 w-6" />
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto px-6 lg:px-8 mt-8 border-t border-gray-200 pt-6 text-center">
//         <p>
//           &copy; {new Date().getFullYear()} Copyright © 2023 SKP Decor Pvt. Ltd.
//           All Rights Reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// const Footer = () => {
//   return (
//     <footer className="relative bg-blueGray-200 pt-8 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap text-left lg:text-left">
//           <div className="w-full lg:w-6/12 px-4">
//             <h4 className="text-3xl fonat-semibold text-blueGray-700">
//               Let's keep in touch!
//             </h4>
//             <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
//               Find us on any of these platforms, we respond 1-2 business days.
//             </h5>
//             <div className="mt-6 lg:mb-0 mb-6">
//               <button
//                 className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
//                 type="button"
//               >
//                 <i className="fab fa-twitter"></i>
//               </button>
//               <button
//                 className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
//                 type="button"
//               >
//                 <i className="fab fa-facebook-square"></i>
//               </button>
//               <button
//                 className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
//                 type="button"
//               >
//                 <i className="fab fa-dribbble"></i>
//               </button>
//               <button
//                 className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
//                 type="button"
//               >
//                 <i className="fab fa-github"></i>
//               </button>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="flex flex-wrap items-top mb-6">
//               <div className="w-full lg:w-4/12 px-4 ml-auto">
//                 <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
//                   Useful Links
//                 </span>
//                 <ul className="list-unstyled">
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://www.creative-tim.com/presentation?ref=njs-profile"
//                     >
//                       About Us
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://blog.creative-tim.com?ref=njs-profile"
//                     >
//                       Blog
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://www.github.com/creativetimofficial?ref=njs-profile"
//                     >
//                       Github
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
//                     >
//                       Free Products
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="w-full lg:w-4/12 px-4">
//                 <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
//                   Other Resources
//                 </span>
//                 <ul className="list-unstyled">
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
//                     >
//                       MIT License
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://creative-tim.com/terms?ref=njs-profile"
//                     >
//                       Terms &amp; Conditions
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://creative-tim.com/privacy?ref=njs-profile"
//                     >
//                       Privacy Policy
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
//                       href="https://creative-tim.com/contact-us?ref=njs-profile"
//                     >
//                       Contact Us
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-6 border-blueGray-300" />
//         <div className="flex flex-wrap items-center md:justify-between justify-center">
//           <div className="w-full md:w-4/12 px-4 mx-auto text-center">
//             <div className="text-sm text-blueGray-500 font-semibold py-1">
//               Copyright © <span id="get-current-year">2021</span>
//               <a
//                 href="https://www.creative-tim.com/product/notus-js"
//                 className="text-blueGray-500 hover:text-gray-800"
//                 target="_blank"
//               >
//                 {" "}
//                 Notus JS
//               </a>{" "}
//               by
//               <a
//                 href="https://www.creative-tim.com?ref=njs-profile"
//                 className="text-blueGray-500 hover:text-blueGray-800"
//               >
//                 Creative Tim
//               </a>
//               .
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;