import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectLoggedUserDetails, selectLoggedUserOrders, selectUserInfo } from '../userSlice'
import { Link } from 'react-router-dom'

 const UserOrder = () => {
    const [open, setOpen] = useState(true)
    const dispatch=useDispatch();
    const user=useSelector(selectUserInfo)
    const orders=useSelector(selectLoggedUserOrders)

    useEffect(()=>{ 
        // orders.map((order)=>console.log(order.selectedAddress))
        dispatch(fetchLoggedInUserOrdersAsync())
    },[dispatch,user])

  return (<>
    <div>
        {orders?.length  
                 &&
            orders?.map((order,index)=>(
            <div>
                <div className="mx-auto bg-white mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                         <h2 className="text-4xl font-bold tracking-tight text-gray-900 my-5">Order Number:#{index+1}</h2>
                         <div className="text-2xl font-bold tracking-tight text-red-900 my-5">Order Status:{order.status}</div>

                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {order.products.map((item) => (
                               
                              <li className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.product.href}>{item.product.title}</a>
                                      </h3>
                                      <p className="ml-4">{item.product.price}/-</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                        {item.quantity}
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
                        <p>{order.totalAmount} /-</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items In Cart</p>
                        <p>{order.totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>       
                    </div>
                    
                    <p className="mt-0.5 text-1xl text-gray-900 px-6 font-bold">User details:-</p>
          <div className="flex min-w-0 gap-x-5 px-6">     
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-5 text-gray-500">Name:{order.selectedAddress.firstName} {order.selectedAddress.lastName}</p>
              <p className=" truncate text-xs leading-5 text-gray-500">Address:{order.selectedAddress.streetorder},{order.selectedAddress.city},{order.selectedAddress.state}</p>
              <p className="text-sm font-semibold leading-5 text-gray-500">Pin-Code:{order.selectedAddress.postalCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start px-6">
          <p className=" text-xs leading-5 text-gray-800">Phone: {order.selectedAddress.phoneNumber}  </p>
          </div>
        
    </div>
            </div>
        ))}
    </div>
    </>
  )
}
export default UserOrder
