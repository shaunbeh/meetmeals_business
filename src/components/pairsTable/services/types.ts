export type WsMsgT = {
  d: {
    id: number;
    p: number;
    p24h: number;
    p7d: number;
    p30d: number;
    p3m: number;
    p1y: number;
    pytd: number;
    pall: number;
    as: number;
    mc: number;
    fmc24hpc: number;
    v: number | undefined;
  };
  t: string;
  c: string;
};

export type TableRowT = {
  id: number;
  idx: number | undefined;
  symbol: string;
  icon: string;
  name: string;
  price: string;
  priceTmn: string;
  volume: string;
  marketCap: string;
  priceChange24h: string;
  priceChange7d: string;
};
