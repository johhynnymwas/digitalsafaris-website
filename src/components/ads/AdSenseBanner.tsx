import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSenseBanner: React.FC = () => {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
  const slotId = import.meta.env.VITE_ADSENSE_SLOT as string | undefined;
  const adRef = useRef<HTMLModElement>(null);
  const [isFilled, setIsFilled] = useState<boolean | null>(null);

  useEffect(() => {
    if (!clientId || !slotId) {
      return;
    }

    const adElement = adRef.current;
    if (!adElement) {
      return;
    }

    const updateAdVisibility = () => {
      setIsFilled(adElement.dataset.adStatus === "filled");
    };
    const observer = new MutationObserver(updateAdVisibility);
    observer.observe(adElement, { attributes: true, childList: true, subtree: true });

    const scriptId = "adsense-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may not be ready while the script is loading.
    }

    return () => observer.disconnect();
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    return null;
  }

  return (
    <aside className={`mx-auto w-full max-w-3xl px-4 ${isFilled === false ? "hidden" : "pb-4"}`} aria-label="Advertisement">
      <div className="mx-auto h-[90px] max-w-[728px] overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle block h-[90px] w-full"
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      </div>
    </aside>
  );
};
