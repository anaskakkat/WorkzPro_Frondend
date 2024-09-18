const userRoutes = {
  signUp: "user/signup",
  verifyOtp: "user/otp",
  resendOtp: "user/resend_otp",
  loginVerify: "user/login",
  GoogleLogin: "user/googleLogin",
  logoutUser: "user/logout",
  getService: "user/services",
  fetchWorkers: "user/workers",
  fetchWorkerDatabyId: (id: string) => `user/workers/${id}`,

  // bookings--------------------------------------------------------------------------------------------
  bookingData: (userId: string) => `user/booking/add/${userId}`,
  fetchBookings: (id: string) => `user/booking/${id}`,
  fetchBookingsByUser: (id: string) => `user/booking/user/${id}`,
  fetchBookingsByDate: (workerId: string, date: Date) =>
    `user/booking/${workerId}/date/${date.toISOString()}`,
  makePayment: (id: string) => `user/booking/payment/${id}`,

  //reviewss---------------------------------------------------------------
  addReview: "user/booking/review",
  updateReview: "user/booking/review",
  fetchReviews: (workerId: string) => `user/booking/review/${workerId}`,

  // chats---------------------------------------------------------------------------------------
  fetchChats: (userId: string) => `user/chat/${userId}`,
  createChat: `user/chat`,
  fetchMessages: (chatId: string) => `user/chat/messages/${chatId}`,
  sendMessage: `user/chat/addMessage`,
};

export default userRoutes;
