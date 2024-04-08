import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLoadScripts = () => {
  const router = useRouter();

  useEffect(() => {
    let loadedScripts = [];

    const loadScript = (src: string) => {
      // Check if the script is already loaded
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        return script;
      }
    };

    // Load scripts only if they are not already in the body
    const scripts = ['/assets/js/misc.js', '/assets/js/custom.js'];
    loadedScripts = scripts.map(loadScript).filter(Boolean);

    return () => {
      // Remove the scripts that were added by this hook
      loadedScripts.forEach((script) => {
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, [router.asPath]); // Re-run the effect only when the route changes
};

export default useLoadScripts;
