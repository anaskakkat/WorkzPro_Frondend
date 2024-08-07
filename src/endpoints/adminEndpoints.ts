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
  updateService: (id: string) => `admin/services/${id}/edit`,
  getWorkers: "admin/get_Workers",

  blockWorker: (id: string) => `admin/workers/${id}/block`,
  unblockWorker: (id: string) => `admin/workers/${id}/unblock`,
  worker_request: (id: string) => `admin/request/${id}/worker_request`,
};

export default adminRoutes;
