import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon} from '@heroicons/react/solid'
// import { RecaptchaVerifier, signInWithPhoneNumber,getAuth } from "firebase/auth";

export default function Checkouts() {


    /* const products = [
        {
            id: 1,
            title: 'Basic Tee',
            href: '#',
            price: '$32.00',
            color: 'Black',
            size: 'Large',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
        },
        // More products...
    ] */
    const deliveryMethods = [
        { id: 1, title: 'Cash On Delivery', turnaround: 'At delivery', price: 'Free' },
        { id: 2, title: 'Online Banking', turnaround: 'Instant', price: 'Free' },
    ]


    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false);

    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");    
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    
    
      const onSignup=async()=> {
        try {
            // const recaptcha=new RecaptchaVerifier(auth, 'recaptcha', {});
            // // const confirmation = await signInWithPhoneNumber(auth, "+91"+ph, recaptcha);
            // console.log(confirmation);
            // setUser(confirmation);

        } catch (error) {
            console.log(error);
        }
      }
    
      const otpVerify=async()=> {
        try {
            const data = await user.confirm(otp);
            console.log(data);
            if(data?.user?.phoneNumber==="+91"+ph){
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
            alert("fail");
        }
      }

    const fetchProducts = () => {
        const data = JSON.parse(localStorage.getItem('cart'));
        setProduct(data);

    }

    const fetchProductPrice = async () => {
        const priceArray = [];
        let totalPrice = 0;
        console.log(product);
        for (let index = 0; index < product.length; index++) {
            const element = product[index];
            const res = await fetch();
            const data = await res.json();
            priceArray.push(data.data.discountedPrice);

            totalPrice += data.data.discountedPrice;
            console.log(totalPrice);

        }

        setPrice(priceArray);
        setSubtotal(totalPrice);

    }


    const handleOpenRazorpay = (data) => {
        const options = {            
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: "Ratna Ayurveda",
            description: "A one and only platform to get 100% ayurvedic products",
            handler: async function (response) {
                try {
                    console.log("verifying");
                    const data = await fetch(
                        `http://localhost:8000/api/v1/payment/verify`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ response }),
                        }
                    );
                    const json = await data.json();

                    if (json.success) {
                        alert("payment success");
                    } else {
                        alert("fail");
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handlePayment = async (amount) => {
        
        console.log(amount);
        try {
            const response = await fetch(
                'http://localhost:8000/api/v1/payment/orders',

                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount }),
                }
            );            
            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("redirecting to payment page");

                handleOpenRazorpay(json.data);
            } else {
                alert("fail 79");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      
        fetchProducts();
        fetchProductPrice();
    }, [])


    useEffect(() => {
        fetchProductPrice();
    }, [product])


    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                       {!success && <div>
                            <h2 className="text-lg font-medium text-[#006400]">Contact information</h2>

                            <div className="mt-4">
                                <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700">
                                    Mobile
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="mobile-number"
                                        name="mobile-number"
                                        maxLength={10}
                                        value={ph}
                                        onChange={(e) => setPh(e.target.value)}
                                        
                                        className="border block w-full p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <button type='button' onClick={onSignup} className='text-sm underline'>Send OTP</button>
                                </div>
                                <div id="recaptcha"></div>
                                {user && <>
                                <label htmlFor="mobile-number" className="mt-2 block text-sm font-medium text-gray-700">
                                    OTP
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        
                                        className="border block w-full p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <button type='button' onClick={otpVerify} className='text-sm underline'>Verify OTP</button>
                                </div>
                                </>}
                            </div>
                        </div>}

                        <div className="mt-10 border-t-2 border-[#006400] pt-10">
                            <h2 className="text-xl font-medium text-[#006400] ">Shipping information</h2>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            className="block w-full border p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            autoComplete="family-name"
                                            className="block w-full border p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>



                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            className="block w-full border p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                                        Apartment, suite, etc.
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="apartment"
                                            id="apartment"
                                            className="block w-full border p-1 border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full p-1 border border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>



                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        State / Province
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full p-1 border border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Postal code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full p-1 border border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            autoComplete="tel"
                                            className="block w-full p-1 border border-[#006400] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t-2  border-[#006400] pt-10">
                            <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                <RadioGroup.Label className="text-xl font-medium text-[#006400]">Delivery Mode</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {deliveryMethods.map((deliveryMethod) => (
                                        <RadioGroup.Option
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            className={({ checked, active }) =>
                                                classNames(
                                                    checked ? 'border-transparent' : 'border-[#006400]',
                                                    active ? 'ring-2 ring-[#006400]' : '',
                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (
                                                <>
                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-col">
                                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                                {deliveryMethod.title}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className="mt-1 flex items-center text-sm text-gray-500"
                                                            >
                                                                {deliveryMethod.turnaround}
                                                            </RadioGroup.Description>
                                                            <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                                {deliveryMethod.price}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked ? <CheckCircleIcon className="h-5 w-5 text-[#006400]" aria-hidden="true" /> : null}
                                                    <div
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-[#006400]' : 'border-transparent',
                                                            'absolute -inset-px rounded-lg pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>


                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-xl font-bold text-[#006400]">Order summary</h2>

                        <div className="mt-4 bg-white border-2 border-[#006400] rounded-lg shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul role="list" className="divide-y divide-[#006400]">
                                {product.map((product) => (
                                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                                        <div className="flex-shrink-0">
                                            <img src={product.image} alt={product.imageAlt} className="w-20 rounded-md" />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-md">
                                                        <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </a>
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">{product.discountedPrice}</p>
                                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                                </div>

                                                
                                            </div>

                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-[#006400] py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">Rs {subtotal}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Shipping</dt>
                                    <dd className="text-sm font-medium text-gray-900">Rs 60</dd>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Total</dt>
                                    <dd className="text-base font-medium text-gray-900">Rs {subtotal + 60}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <button
                                 onClick={() => {
                                    handlePayment(35);
                                  }}
                                    type="button"
                                    className="w-full bg-[#006400] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-[#225622] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    Confirm order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}