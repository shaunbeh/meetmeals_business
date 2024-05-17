import { useEffect, useRef, useState } from 'react';

export const useWs = ({ url }: { url: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [msg] = useState(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    // socket.onmessage = (event) => setMsg(event.data);

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  // bind is needed to make sure `send` references correct `this`
  return { isReady, msg, send: ws.current?.send.bind(ws.current) };
};
