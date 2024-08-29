// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store/store";
// import { Booking } from "../../../types/Booking";
// import Loader from "../../loader/Loader";
// import { bookingAccept } from "../../../api/worker";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// const BookingsWorker: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const workerId = useSelector(
//     (state: RootState) => state.workerInfo.workerInfo._id
//   );

//   const handleAccept = async (bookingId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to accept this booking?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, accept it!",
//       cancelButtonText: "No, cancel!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await bookingAccept(bookingId);
//         // console.log("Response:", response?.data.message);
//         toast.success(response?.data.message);
//       } catch (error) {
//         console.error("Error accepting booking:", error);
//       }
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }
//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//       <div className="py-8">
//         <div className="flex flex-col">
//           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//               <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-blue-50">
//                     <tr className="">
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Booking ID
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Customer
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Booked Date
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Service
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider"
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {bookings.map((booking) => (
//                       <tr key={booking._id} className="hover:bg-blue-100">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
//                           1{" "}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded-full" alt="" />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {booking.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {booking.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {new Date(booking.date).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {booking.selectedSlot.time}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {booking.status}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out">
//                             Details
//                           </button>
//                           {booking.status === "pending" ? (
//                             <button
//                               className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out"
//                               onClick={() => handleAccept(booking._id)}
//                             >
//                               Accept
//                             </button>
//                           ) : (
//                             ""
//                           )}

//                           <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
//                             Cancel
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingsWorker;


import React from 'react'

const BookingsWorker = () => {
  return (
    <div>
      
    </div>
  )
}

export default BookingsWorker
