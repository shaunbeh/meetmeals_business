const endpoints = {
  exchanges: {
    getExchangesWithSymbols: { url: '/v1/exchanges-symbols/', method: 'POST' },
  },
  symbols: {
    getTags: { url: '/v1/tags/', method: 'GET' },
    getSymbols: { url: '/v1/get-symbols/', method: 'POST' },
    getSymbolsWithExchanges: { url: '/v1/symbols-exchanges/', method: 'POST' },
  },
  calculator: { url: '/v1/calculator', method: 'POST' },
  content: {
    calculator: { url: '/calculator-content', method: 'GET' },
  },
};

export default endpoints;
