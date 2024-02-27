// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

type PropsT = {
  symbol?: string;
};
function TradingViewWidget({ symbol }: PropsT) {
  const container = useRef<HTMLDivElement>(null);
  console.log(symbol);

  useEffect(() => {
    const current = container.current;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    const sym = (symbol == 'USDT' ? 'USDTUSD' : symbol) ?? 'BTCUSDT';

    script.innerHTML = `{
      "symbols": [
        [
          "${sym}|1M"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": true,
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": true,
      "hideSymbolLogo": true,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "Arial, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "2",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    }`;
    current?.appendChild(script);

    return () => {
      if (current) {
        current.replaceChildren('');
      }
    };
  }, [symbol]);

  return (
    <div
      className='tradingview-widget-container [&>iframe]:border-none'
      ref={container}
      style={{ height: '90%', width: '100%' }}
    >
      <div className='tradingview-widget-container__widget'></div>
    </div>
  );
}

export default memo(TradingViewWidget);
