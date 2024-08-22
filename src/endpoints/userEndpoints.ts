const userRoutes = {
  signUp: "user/signup",
  verifyOtp: "user/otp",
  resendOtp: "user/resend_otp",
  loginVerify: "user/login",
  GoogleLogin: "user/googleLogin",
  logoutUser: "user/logout",
  getService: "user/services",
  fetchWorkers: "user/workers",
  fetchWorkerDatabyId: (id: string) => `user/fetchWorkers/${id}`,
  fetchSlotById: (id: string) => `user/fetchSlot/${id}`,
  submitBooking: (id: string) => `user/booking/${id}`,
  fetchBookings: (id: string) => `user/booking/${id}`,
  fetchBookingsByUser: (id: string) => `booking/${id}/userId`,
  fetchBookingsByWorker: (id: string) => `booking/${id}/WorkerID`,
};

export default userRoutes;
