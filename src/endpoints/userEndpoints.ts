const userRoutes = {
  signUp: "user/signup",
  verifyOtp: "user/otp",
  resendOtp: "user/resend_otp",
  loginVerify: "user/login",
  logoutUser: "user/logout",
  getService: "user/services",
  fetchWorkers: "user/fetchWorkers",
  fetchWorkerDatabyId: (id:string) => `user/fetchWorkers/${id}`,
};

export default userRoutes;
