
// const UserDetails = () => {
//   return (
// <div className="container mx-auto p-4 lg:w-1/2">
//         <div className="shadow-2xl  rounded-lg p-6">
//           <h1 className="text-2xl font-bold mb-6">User Details</h1>
//           <form>
//             <section className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Contact</h2>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded-md"
//               />
//               {formErrors.email && (
//                 <span className="text-red-500">{formErrors.email}</span>
//               )}

//               <div className="col-span-1 md:col-span-2">
//                 <label className="block mb-1"></label>
//                 <input
//                   type="text"
//                   name="contact"
//                   placeholder="Phone(10 digits only)"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                   required
//                   maxLength="10"
//                   pattern="[0-9]{10}"
//                   className="w-full p-2 border rounded-md"
//                 />
//                 {formErrors.contact && (
//                   <span className="text-red-500">{formErrors.contact}</span>
//                 )}
//               </div>
//             </section>

//             <section className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Delivery</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="col-span-1 md:col-span-2">
//                   <label className="block mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 border rounded-md"
//                   />
//                   {formErrors.name && (
//                     <span className="text-red-500">{formErrors.name}</span>
//                   )}
//                 </div>
//                 <div className="col-span-1 md:col-span-2">
//                   <label className="block mb-1">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 border rounded-md"
//                   />
//                   {formErrors.address && (
//                     <span className="text-red-500">{formErrors.address}</span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-1">City</label>
//                   <select
//                     className="w-full p-2 border rounded-md"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     disabled={!formData.state}
//                     required
//                   >
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                       <option key={city.name} value={city.name}>
//                         {city.name}
//                       </option>
//                     ))}
//                   </select>
//                   {formErrors.city && (
//                     <span className="text-red-500">{formErrors.city}</span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-1">State</label>
//                   <select
//                     className="w-full p-2 border rounded-md"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select State</option>
//                     {states.map((state) => (
//                       <option key={state.isoCode} value={state.isoCode}>
//                         {state.name}
//                       </option>
//                     ))}
//                   </select>
//                   {formErrors.state && (
//                     <span className="text-red-500">{formErrors.state}</span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-1">PIN Code</label>
//                   <input
//                     type="text"
//                     name="pinCode"
//                     placeholder="PIN Code"
//                     value={formData.pinCode}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 border rounded-md"
//                   />
//                   {formErrors.pinCode && (
//                     <span className="text-red-500">{formErrors.pinCode}</span>
//                   )}
//                 </div>
//               </div>
//             </section>
//           </form>
//         </div>
//       </div>  )
// }

// export default UserDetails