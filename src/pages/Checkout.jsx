// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";
// import { State, City } from "country-state-city";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Sample product details
//   const product = {
//     id: 1,
//     name: "Sample Product",
//     description: "A great product",
//     salePrice: 50000, // price in paise (50000 paise = 500 INR)
//   };

//   const [productQuantity, setProductQuantity] = useState(1);
//   const [discount, setDiscount] = useState("");
//   const [shippingCost] = useState(0); // Shipping is free
//   const [totalPrice, setTotalPrice] = useState(product.salePrice);
//   const [paymentMethod, setPaymentMethod] = useState("online");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     address: "",
//     country: "IN",
//     state: "",
//     city: "",
//     pinCode: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);

//   const states = State.getStatesOfCountry(formData.country);
//   const cities = formData.state
//     ? City.getCitiesOfState(formData.country, formData.state)
//     : [];

//   useEffect(() => {
//     calculateTotal();
//     validateForm();
//   }, [productQuantity, discount, shippingCost, formData]);

//   const calculateTotal = () => {
//     let price = product.salePrice * productQuantity;
//     if (discount === "DISCOUNT10") {
//       price *= 0.9; // Apply 10% discount
//     } else if (discount === "DISCOUNT20") {
//       price *= 0.8; // Apply 20% discount
//     }
//     price += shippingCost;
//     setTotalPrice(price); // Set the total price in paise
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const applyDiscount = () => {
//     if (discount !== "DISCOUNT10" && discount !== "DISCOUNT20") {
//       alert("Invalid discount code");
//     } else {
//       calculateTotal();
//     }
//   };

//   const increaseQuantity = () => {
//     setProductQuantity(productQuantity + 1);
//   };

//   const decreaseQuantity = () => {
//     if (productQuantity > 1) setProductQuantity(productQuantity - 1);
//   };

//   const handleAddToCart = () => {
//     const obj = { ...product, quantity: productQuantity };
//     dispatch(addToCart({ product: obj }));
//   };

//   const handleOrderPlacement = () => {
//     validateForm();
//     if (isFormValid) {
//       alert("Order placed successfully!");
//       navigate("/order-success");
//     } else {
//       alert("Please fill all the required fields correctly.");
//     }
//   };

//   const checkoutHandler = async () => {
//     validateForm();
//     if (isFormValid) {
//       try {
//         const {
//           data: { key },
//         } = await axios.get("http://localhost:8000/api/getkey");
//         const {
//           data: { order },
//         } = await axios.post("http://localhost:8000/api/checkout", {
//           amount: totalPrice, // Amount in paise
//         });

//         const options = {
//           key,
//           amount: order.amount, // This should be in paise
//           currency: "INR",
//           name: formData.name,
//           description: product.description,
//           image: "https://example.com/your_logo",
//           order_id: order.id,
//           callback_url: "http://localhost:8000/api/paymentverification",
//           prefill: {
//             name: formData.name,
//             email: formData.email,
//             contact: formData.contact,
//           },
//           notes: {
//             address: formData.address,
//           },
//           theme: {
//             color: "#121212",
//           },
//           handler: function (response) {
//             alert("Payment Successful!");
//             navigate("/order-success");
//           },
//           modal: {
//             ondismiss: function () {
//               alert("Payment Failed. Please try again.");
//             },
//           },
//         };

//         const razor = new window.Razorpay(options);
//         razor.open();
//       } catch (error) {
//         console.error("Error during checkout:", error);
//         alert("An error occurred during checkout. Please try again.");
//       }
//     } else {
//       alert("Please fill all the required fields.");
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = "Name is required";
//     if (!formData.email) errors.email = "Email is required";
//     if (!formData.contact) errors.contact = "Contact is required";
//     if (!formData.address) errors.address = "Address is required";
//     if (!formData.city) errors.city = "City is required";
//     if (!formData.state) errors.state = "State is required";
//     if (!formData.pinCode) errors.pinCode = "PIN Code is required";

//     setFormErrors(errors);
//     setIsFormValid(Object.keys(errors).length === 0);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row justify-between p-4">
//       <div className="container mx-auto p-4 lg:w-1/2">
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
//                 <label className="block mb-1">Phone</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   placeholder="Phone"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                   required
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
//       </div>

//       <div className="container mx-auto p-4 lg:w-1/2">
//         <div className="shadow-xl rounded-lg p-6">
//           <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
//           <section className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Discount Code</h2>
//             <input
//               type="text"
//               name="discount"
//               placeholder="Enter discount code"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             />
//             <button
//               className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
//               onClick={applyDiscount}
//             >
//               Apply
//             </button>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Order Details</h2>
//             <div className="flex justify-between mt-4">
//               <span>Price:</span>
//               <span>
//                 ₹{((product.salePrice * productQuantity) / 100).toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <span>Quantity:</span>
//               <div className="flex border border-gray-300 rounded">
//                 <button
//                   onClick={decreaseQuantity}
//                   className="px-3 py-1 bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <div className="px-3 py-1">{productQuantity}</div>
//                 <button
//                   onClick={increaseQuantity}
//                   className="px-3 py-1 bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-between mt-2">
//               <span>Shipping:</span>
//               <span>Free</span>
//             </div>
//             <div className="flex justify-between mt-2">
//               <span>Discount:</span>
//               <span>
//                 - ₹
//                 {discount === "DISCOUNT10"
//                   ? ((product.salePrice * productQuantity * 0.1) / 100).toFixed(
//                       2
//                     )
//                   : discount === "DISCOUNT20"
//                   ? ((product.salePrice * productQuantity * 0.2) / 100).toFixed(
//                       2
//                     )
//                   : "0.00"}
//               </span>
//             </div>

//             <div className="flex justify-between mt-4 font-bold">
//               <span>Total:</span>
//               <span>₹{(totalPrice / 100).toFixed(2)}</span>
//             </div>
//           </section>

//           <section className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
//             <div className="border rounded-md p-4">
//               <div className="mb-4">
//                 <label className="inline-flex px-4 items-center">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="online"
//                     checked={paymentMethod === "online"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     required
//                     className="form-radio "
//                   />
//                   <span className="ml-2">Online Payment </span>
//                 </label>
//                 <label className="inline-flex items-center mt-2">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     required
//                     className="form-radio"
//                   />
//                   <span className="ml-2">Cash on Delivery (COD)</span>
//                 </label>
//               </div>
//             </div>
//           </section>

//           {paymentMethod === "online" ? (
//             <button
//               className="bg-orange-500 text-white w-full py-2 rounded-md font-bold"
//               onClick={checkoutHandler}
//             >
//               Pay Now
//             </button>
//           ) : (
//             <button
//               className="bg-orange-500 text-white w-full py-2 rounded-md font-bold"
//               onClick={handleOrderPlacement}
//             >
//               Place Order
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";
import { State, City } from "country-state-city";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();
  const { cartProducts } = location.state || [];

  const [discount, setDiscount] = useState("");
  const [shippingCost] = useState(0); // Shipping is free
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    country: "IN",
    state: "",
    city: "",
    pinCode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const states = State.getStatesOfCountry(formData.country);
  const cities = formData.state
    ? City.getCitiesOfState(formData.country, formData.state)
    : [];

  useEffect(() => {
    calculateTotal();
    validateForm();
  }, [discount, shippingCost, formData, cartProducts]);

  const calculateTotal = () => {
    let price = cartProducts.reduce(
      (acc, product) => acc + product.salePrice * product.quantity,
      0
    );

    if (discount === "DISCOUNT10") {
      price *= 0.9; // Apply 10% discount
    } else if (discount === "DISCOUNT20") {
      price *= 0.8; // Apply 20% discount
    }
    price += shippingCost;
    setTotalPrice(price); // Set the total price in INR
    console.log(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contact') {
      // Allow only numeric input
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // setFormData({ ...formData, [name]: value });
  };

  const applyDiscount = () => {
    if (discount !== "DISCOUNT10" && discount !== "DISCOUNT20") {
      alert("Invalid discount code");
    } else {
      calculateTotal();
    }
  };

  const handleOrderPlacement = () => {
    validateForm();
    if (isFormValid) {
      alert("Order placed successfully!");
      navigate("/paymentsuccess");
    } else {
      alert("Please fill all the required fields correctly.");
    }
  };

  const checkoutHandler = async () => {
    validateForm();
    if (isFormValid) {
      try {
        const {
          data: { key },
        } = await axios.get("http://localhost:8000/api/getkey");
        const {
          data: { order },
        } = await axios.post("http://localhost:8000/api/checkout", {
          amount: totalPrice, // Amount in paise
        });

        const options = {
          key,
          amount: order.amount, // This should be in paise
          currency: "INR",
          name: formData.name,
          description: "Your Order",
          image: "https://example.com/your_logo",
          order_id: order.id,
          callback_url: "http://localhost:8000/api/paymentverification",
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: "#121212",
          },
          handler: function (response) {
            alert("Payment Successful!");
            navigate("/paymentsuccess");
          },
          modal: {
            ondismiss: function () {
              alert("Payment Failed. Please try again.");
            },
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred during checkout. Please try again.");
      }
    } else {
      alert("Please fill all the required fields.");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contact) errors.contact = "Contact is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.pinCode) errors.pinCode = "PIN Code is required";
    if (formData.contact.length !== 10) {
      errors.contact = "Phone number must be exactly 10 digits";
    }
  
    // setFormErrors(errors);
    // return Object.keys(errors).length === 0;

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-4">
      <div className="container mx-auto p-4 lg:w-1/2">
        <div className="shadow-2xl  rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">User Details</h1>
          <form>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
              {formErrors.email && (
                <span className="text-red-500">{formErrors.email}</span>
              )}

              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1"></label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Phone(10 digits only)"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="w-full p-2 border rounded-md"
                />
                {formErrors.contact && (
                  <span className="text-red-500">{formErrors.contact}</span>
                )}
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                  {formErrors.name && (
                    <span className="text-red-500">{formErrors.name}</span>
                  )}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                  {formErrors.address && (
                    <span className="text-red-500">{formErrors.address}</span>
                  )}
                </div>
                <div>
                  <label className="block mb-1">City</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.city && (
                    <span className="text-red-500">{formErrors.city}</span>
                  )}
                </div>
                <div>
                  <label className="block mb-1">State</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && (
                    <span className="text-red-500">{formErrors.state}</span>
                  )}
                </div>
                <div>
                  <label className="block mb-1">PIN Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="PIN Code"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                  {formErrors.pinCode && (
                    <span className="text-red-500">{formErrors.pinCode}</span>
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>

      <div className="container mx-auto p-4 lg:w-1/2">
        <div className="shadow-xl rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Discount Code</h2>
            <input
              type="text"
              name="discount"
              placeholder="Enter discount code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
              onClick={applyDiscount}
            >
              Apply
            </button>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            {cartProducts.map((product) => (
              <div key={product._id} className="mb-4">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>₹{product.salePrice}</span>
                  console.log(salePrice)
                </div>
                <div className="flex justify-between">
                  <span>Quantity: {product.quantity}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Discount:</span>
              <span>
                - ₹
                {discount === "DISCOUNT10"
                  ? (totalPrice * 0.1).toFixed(2)
                  : discount === "DISCOUNT20"
                  ? (totalPrice * 0.2).toFixed(2)
                  : "0.00"}
              </span>
            </div>

            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="border rounded-md p-4">
              <div className="mb-4">
                <label className="inline-flex px-4 items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    className="form-radio "
                  />
                  <span className="ml-2">Online Payment </span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    className="form-radio"
                  />
                  <span className="ml-2">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>
          </section>

          {paymentMethod === "online" ? (
            <button
              className="bg-orange-500 text-white w-full py-2 rounded-md font-bold"
              onClick={checkoutHandler}
            >
              Pay Now
            </button>
          ) : (
            <button
              className="bg-orange-500 text-white w-full py-2 rounded-md font-bold"
              onClick={handleOrderPlacement}
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
