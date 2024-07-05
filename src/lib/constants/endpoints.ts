const endpoints = {
  getOTP: { url: '/api/v2/organization/login/code/get', method: 'POST' },
  verifyOTP: {
    url: '/api/v2/organization/login/code/verify',
    method: 'POST',
  },
  getUserProfile: { url: '/v2/organization/profile', method: 'GET' },
  getPlans: { url: '/v2/organization/plan', method: 'GET' },
};

export default endpoints;
