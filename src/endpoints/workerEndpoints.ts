const workerRoutes = {
  signUp: "worker/signup",
  verifyOtp: "worker/otp",
  // resendOtp: "user/resend_otp",
  loginVerify: "worker/login",
  logoutUser: "worker/logout",

  getServicesData: "worker/allServices",

  setProfile: "worker/setProfile",

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
  addLeaves: (workerId: string) => `worker/leave/${workerId}`,
  getLeaves: (workerId: string) => `worker/leave/${workerId}`,
  deleteLeves: (workerId: string) => `worker/deleteLeave/${workerId}`,
  fetchBookingsWorkerId: (workerId: string) => `worker/bookings/${workerId}`,
  bookingConfirmation: (bookingId: string) => `worker/bookings/${bookingId}`,
};

export default workerRoutes;
