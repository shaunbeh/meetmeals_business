const endpoints = {
  getOTP: { url: '/api/v2/organization/login/code/get', method: 'POST' },
  verifyOTP: {
    url: '/api/v2/organization/login/code/verify',
    method: 'POST',
  },
  submitOrder: { url: '/v2/organization/order/submit', method: 'POST' },
  getPlans: { url: '/v2/organization/plan', method: 'GET' },
  getUserInfo: { url: '/v2/organization/profile', method: 'GET' },
  getOrders: { url: '/v2/organization/order/submit', method: 'POST' },
};

export default endpoints;
