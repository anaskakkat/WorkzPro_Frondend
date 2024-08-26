const workerRoutes = {
  signUp: "worker/signup",
  verifyOtp: "worker/otp",
  // resendOtp: "user/resend_otp",
  loginVerify: "worker/login",
  logoutUser: "worker/logout",

  getServicesData: "worker/allServices",

  setProfile: "worker/setProfile",
  setSlots: (id: string) => `worker/slots/${id}`,
  fetchSlots: (id: string) => `worker/slots/${id}`,
  fetchCommonProblams: (id: string) => `worker/commonProblams/${id}`,
  deleteSlot: (id: string) => `worker/slots/${id}`,
  bookingAccept: (bookingId: string) => `worker/booking/${bookingId}`,
  editConfigration: (workerId: string) => `worker/workingdays/${workerId}`,
  googleLogin: `worker/googleAuth`,
  addProblem: "worker/addProblam",
  fetchWorkerById: (workerId: string) => `worker/${workerId}`,
  createServices: (workerId: string) => `worker/addService/${workerId}`,
  fecthServices: (workerId: string) => `worker/service/${workerId}`,
  deleteService: (workerId: string) => `worker/deleteService/${workerId}`,
  editService: (workerId: string) => `worker/services/${workerId}`,
};

export default workerRoutes;
