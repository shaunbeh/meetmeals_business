import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLoadScripts = () => {
  const router = useRouter();

  useEffect(() => {
    const scripts = ['/assets/js/misc.js', '/assets/js/custom.js'];

    const loadScript = (src: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    const loadedScripts = scripts.map(loadScript);

    return () => {
      loadedScripts.forEach((script) => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, [router.asPath]);
};

export default useLoadScripts;
