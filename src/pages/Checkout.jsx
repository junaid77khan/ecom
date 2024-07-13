const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className=" shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Aura Decor Checkout</h1>

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
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <select className="w-full p-2 border rounded-md">
                <option>Gujarat</option>
                {/* Add more options as needed */}
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
          <p>Enter your shipping address to view available shipping methods.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <span>
                AuraDecor Blue Premium Reed Diffuser Gift Set |Aroma Diffuser ||
              </span>
              <span>₹699.00</span>
            </div>
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="w-full p-2 border rounded-md mb-2"
            />
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹699.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Enter shipping address</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹699.00</span>
            </div>
          </div>
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
  );
};

export default CheckoutPage;
