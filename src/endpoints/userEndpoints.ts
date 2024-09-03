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
  bookingData: (userId: string) => `user/booking/${userId}`,
  fetchBookings: (id: string) => `user/booking/${id}`,
  fetchBookingsByUser: (id: string) => `user/booking/user/${id}`,
  fetchBookingsByDate: (workerId: string, date: Date) =>
    `user/booking/${workerId}/date/${date.toISOString()}`,
};

export default userRoutes;
