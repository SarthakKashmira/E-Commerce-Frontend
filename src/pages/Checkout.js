
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, Navigate } from 'react-router-dom';
import { deleteItemAsync, selectItems, updateQuantityAsync } from '../features/cart/cartSlice';
import { addOrderAsync, selectCurrentOrderPlaced } from '../features/order/orderSlice';
import { selectUserInfo,updateUserAsync } from '../features/user/userSlice';

function Checkout() {
    const [open, setOpen] = useState(true);
    const [selectedAddress,setSelectedAddress]=useState(null);
    const [paymentMethod,setPaymentMethod]=useState('cash');

    const dispatch=useDispatch();
    const products=useSelector(selectItems);
    const orderPlaced=useSelector(selectCurrentOrderPlaced);
    const { register, handleSubmit,reset, formState: { errors },} = useForm();
    const totalAmount=products.reduce((amount,item)=>item.product.price*item.quantity +amount,0);
    const totalItems=products.reduce((total,item)=>item.quantity +total,0);

    // useEffect(()=>{console.log(orderPlaced)},[orderPlaced])  //testing purposes

    const user=useSelector(selectUserInfo);

    const handleReset=()=>{
      reset();
    }

    const handleAddressChange=(e)=>{
      // console.log(user.addresses[e.target.value]);
      setSelectedAddress(user.addresses[e.target.value]);
    }

    const handlePayment=(e)=>{
       setPaymentMethod(e.target.value);
    }

    const handleOrder=()=>{
      const order={products,totalAmount,totalItems,paymentMethod,user:user.id,selectedAddress,status:'pending'};
      dispatch(addOrderAsync(order));
    }

    return ( 
    <>
       {!products.length && <Navigate to='/' replace={true}></Navigate>}
       {orderPlaced && orderPlaced.paymentMethod==='cash' && <Navigate to={`/orderSuccess/${orderPlaced.id}`} replace={true}></Navigate>}
       {orderPlaced && orderPlaced.paymentMethod==='card' && <Navigate to={`/stripeCheckout`} replace={true}></Navigate>}
       <div className="mx-auto mt-20 py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
       <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">CHECKOUT</h1>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
        <form className="bg-white px-3 mt-12" noValidate  onSubmit={handleSubmit((data) => {
              dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
              reset();
            })}>
        <div className="space-y-12" >
        <div className="border-b border-gray-900/10 pb-12 text-2xl py-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('firstName',{required:'first-name is required'})}
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('lastName',{required:'last-name is required'})}
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  {...register('phoneNumber',{required:'phone number is required'})}
                  id="phoneNumber"
                  autoComplete="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register('country',{required:'country-name is required'})}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Saudi Arabia</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('streetAddress',{required:'street Address is required'})}
                  id="streetAddress"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:'city Address is required'})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'state Address is required'})}
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('postalCode',{required:'postal code is required'})}
                  id="postalCode"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleReset}>
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
           Choose from existing address
          </p>

          <ul role="list" >
          {user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 px-2 border-solid border-2 border-gray-400">
          <div className="flex min-w-0 gap-x-4">
                   <input
                    onChange={handleAddressChange}
                    name="payments"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName} {address.lastName}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.streetAddress},{address.city},{address.state}</p>
              <p className="text-sm font-semibold leading-5 text-gray-500">Pin-Code:{address.postalCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 text-xs leading-5 text-gray-800">Phone: {address.phoneNumber}  </p>
          </div>
        </li>
      ))}
    </ul>

          <div className="mt-10 space-y-10">
        
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose Any One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    onChange={handlePayment}
                    id="cash"
                    name="payments"
                    value="cash"
                    type="radio"
                    checked={paymentMethod==="cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    onChange={handlePayment}
                    id="card"
                    name="payments"
                    value="card"
                    type="radio"
                    checked={paymentMethod==="card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment 
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

      </div>
   
      </form>
       </div>

       <div className="lg:col-span-2">
         {/* Cart summary */}
         <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                         <h2 className="text-4xl font-bold tracking-tight text-gray-900 my-5">ORDER SUMMARY</h2>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.thumbnail}
                                    alt={product.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.product.href}>{product.product.title}</a>
                                      </h3>
                                      <p className="ml-4">{product.product.price}/-</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                        {product.quantity}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                    </div>
                   
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalAmount} /-</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items In Cart</p>
                        <p>{totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Want to change Order?</p>
                        <Link to='/cart'>
                        <button
                          className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                         > Go to Cart
                         </button>
                        </Link>
                      </div>
                      <div className="mt-6" onClick={handleOrder}>
                        <div className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Order Now
                        </div>
                      </div>
                    </div>
         </div>
       </div>
     </div>
   </div>
        </>
    );
}

export default Checkout;