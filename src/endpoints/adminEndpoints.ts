const adminRoutes = {
  login: "admin/login",
  logoutAdmin: "admin/logout",
  getUser: "admin/users",
  blockUser: (id: number) => `admin/users/${id}/block`,
  unblockUser: (id: number) => `admin/users/${id}/unblock`,
  createServices: "admin/services",
};

export default adminRoutes;
