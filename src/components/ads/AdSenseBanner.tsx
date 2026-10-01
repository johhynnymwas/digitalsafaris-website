import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSenseBanner: React.FC = () => {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
  const slotId = import.meta.env.VITE_ADSENSE_SLOT as string | undefined;

  useEffect(() => {
    if (!clientId || !slotId) {
      return;
    }

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
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    return null;
  }

  return (
    <aside className="mx-auto w-full max-w-3xl px-4 pb-4" aria-label="Advertisement">
      <div className="mx-auto h-[90px] max-w-[728px] overflow-hidden border border-[#e6dfd5] bg-[#f4efe8]">
        <ins
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
