const workerRoutes = {
  signUp: "worker/signup",
  verifyOtp: "worker/otp",
  // resendOtp: "user/resend_otp",
  loginVerify: "worker/login",
  logoutUser: "worker/logout",
  getService: "worker/services",
  setProfile: "worker/setProfile",
  setSlots: "worker/slots/setSlots",
  fetchSlots: (id: string) => `worker/slots/${id}/fetchSlots`,

};

export default workerRoutes;
