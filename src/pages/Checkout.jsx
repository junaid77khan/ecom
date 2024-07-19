import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Country, State, City } from "country-state-city";

const CheckoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const product = location.state;
  const [productQuantity, setProductQuantity] = useState(1);
  const [discount, setDiscount] = useState("");
  const [shippingCost, setShippingCost] = useState(50); // Example shipping cost
  const [totalPrice, setTotalPrice] = useState(product.salePrice);

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const states = State.getStatesOfCountry(selectedCountry);
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];



  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);


  useEffect(() => {
    const calculateTotal = () => {
      let price = product.salePrice * productQuantity;
      if (discount === "DISCOUNT10") {
        price *= 0.9; // Apply 10% discount
      }
      price += shippingCost;
      setTotalPrice(price);
    };
    calculateTotal();
  }, [productQuantity, discount, shippingCost, product.salePrice]);

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };

  const handleAddToCart = () => {
    const obj = { ...product, quantity: productQuantity };
    dispatch(addToCart({ product: obj }));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-4">
      <div className="container mx-auto p-4">
        <div className=" shadow-xl rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <input
              type="text"
              placeholder="Email or mobile phone number"
              className="w-full p-2 border rounded-md"
            />
            <label className="inline-flex items-center mt-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Email me with news and offers</span>
            </label>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Delivery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Country/Region</label>
                <select className="w-full p-2 border rounded-md">
                  <option>India</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border rounded-md mt-2"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1">Company & GSTIN (optional)</label>
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="GSTIN"
                  className="w-full p-2 border rounded-md mt-2"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full p-2 border rounded-md mt-2"
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <select
            className="w-full p-2 border rounded-md"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">State</label>
              
                  <select
            className="w-full p-2 border rounded-md"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
              </div>
              <div>
                <label className="block mb-1">PIN Code</label>
                <input
                  type="text"
                  placeholder="PIN Code"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <label className="inline-flex items-center mt-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Save this information for next time</span>
            </label>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Method</h2>
            <p>
              Enter your shipping address to view available shipping methods.
            </p>
          </section>

        

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment</h2>
            <div className="border rounded-md p-4">
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">
                    Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                  </span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">
                    Cashfree Payment (UPI, Cards, Wallets, NetBanking)
                  </span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">Paytm Payment Gateway</span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">PhonePe Payment Gateway</span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">Cash on Delivery (COD)</span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input type="radio" name="payment" className="form-radio" />
                  <span className="ml-2">Bank Deposit</span>
                </label>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Billing Address</h2>
            <label className="inline-flex items-center">
              <input type="radio" name="billing" className="form-radio" />
              <span className="ml-2">Same as shipping address</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" name="billing" className="form-radio" />
              <span className="ml-2">Use a different billing address</span>
            </label>
          </section>
          <button className="bg-orange-500 text-white w-full py-2 rounded-md font-bold">
            Pay now
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 bg-white p-4 rounded-lg shadow-xl mt-4 lg:mt-0 lg:ml-4">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="flex items-center mb-4">
          <div className="mr-4">Quantity:</div>
          <div className="flex border border-gray-300 rounded">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-gray-100"
            >
              -
            </button>
            <div className="px-3 py-1">{productQuantity}</div>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Product Details:</h3>
          <p>{product.description}</p>
          <div>
            <label className="block mb-2 text-xl font-bold py-4 ">
              Discount Code
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter discount code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (discount !== "DISCOUNT10") {
                  alert("Invalid discount code");
                }
              }}
            >
              Apply
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <span>Price:</span>
            <span>₹{product.salePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Quantity:</span>
            <span>{productQuantity}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping:</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Discount:</span>
            <span>
              - ₹
              {discount === "DISCOUNT10"
                ? (product.salePrice * productQuantity * 0.1).toFixed(2)
                : "0.00"}
            </span>
          </div>

          <div className="flex justify-between mt-4 font-bold">
            <span>Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
