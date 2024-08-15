const userRoutes = {
  signUp: "user/signup",
  verifyOtp: "user/otp",
  resendOtp: "user/resend_otp",
  loginVerify: "user/login",
  logoutUser: "user/logout",
  getService: "user/services",
  fetchWorkers: "user/fetchWorkers",
  fetchWorkerDatabyId: (id: string) => `user/fetchWorkers/${id}`,
  fetchSlotById: (id: string) => `user/fetchSlot/${id}`,
  submitBooking: (id: string) => `user/booking/${id}`,
};

export default userRoutes;
