const endpoints = {
  exchanges: {
    getExchangesWithSymbols: { url: '/v1/exchanges-symbols/', method: 'POST' },
  },
  symbols: {
    getSymbols: { url: '/v1/get-symbols/', method: 'POST' },
    getSymbolsWithExchanges: { url: '/v1/symbols-exchanges/', method: 'POST' },
  },
};

export default endpoints;
