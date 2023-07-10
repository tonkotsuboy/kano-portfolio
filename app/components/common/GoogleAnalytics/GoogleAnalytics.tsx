"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect } from "react";

const GA_TRACKING_ID = process.env["NEXT_PUBLIC_GA_TRACKING_ID"] ?? "";

export const pageView = (path: string): void => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: path,
  });
};

export const GoogleAnalytics = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = `${pathname}${searchParams.toString()}`;
    pageView(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
    </>
  );
};

export default function Analytics(): JSX.Element {
  return (
    <>
      {GA_TRACKING_ID && (
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      )}
    </>
  );
}
