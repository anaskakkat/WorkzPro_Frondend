const adminRoutes = {
  login: "admin/login",
  logoutAdmin: "admin/logout",
  getUser: "admin/users",
  blockUser: (id: number) => `admin/users/${id}/block`,
  unblockUser: (id: number) => `admin/users/${id}/unblock`,
  createServices: "admin/services",
  getServices: "admin/get_services",
  blockService: (id: string) => `admin/services/${id}/block`,
  unblockService: (id: string) => `admin/services/${id}/unblock`,
  updateService: (id: string) => `admin/services/${id}`,
  getWorkers: "admin/getWorkers",

  blockWorker: (id: string) => `admin/workers/${id}/block`,
  unblockWorker: (id: string) => `admin/workers/${id}/unblock`,
  worker_request: (id: string) => `admin/request/${id}`,
  requestReject: (id: string) => `admin/requestReject/${id}`,
  // dashbord------------------------
  fetchDashboard: `admin/dashbord`,
};

export default adminRoutes;
