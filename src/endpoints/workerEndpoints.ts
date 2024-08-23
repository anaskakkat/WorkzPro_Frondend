const workerRoutes = {
  signUp: "worker/signup",
  verifyOtp: "worker/otp",
  // resendOtp: "user/resend_otp",
  loginVerify: "worker/login",
  logoutUser: "worker/logout",
  getService: "worker/services",
  setProfile: "worker/setProfile",
  setSlots: (id: string) => `worker/slots/${id}`,
  fetchSlots: (id: string) => `worker/slots/${id}`,
  fetchCommonProblams: (id: string) => `worker/commonProblams/${id}`,
  deleteSlot: (id: string) => `worker/slots/${id}`,
  bookingAccept: (bookingId: string) => `worker/booking/${bookingId}`,
  googleLogin: `worker/googleAuth`,
  addProblem: "worker/addProblam",
};

export default workerRoutes;
