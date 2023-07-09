import { useEffect, FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";

import Script from "next/script";
import { useRouter } from "next/router";
import { useStore } from "../store";

const AppComponent: FC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const store = useStore(pageProps.initialReduxState);

  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID as string;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!window) return;
      window.gtag("config", GA_TRACKING_ID, {
        page_location: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [GA_TRACKING_ID, router.events]);

  return (
    <Provider store={store}>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
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
      <Component {...pageProps} />
    </Provider>
  );
};

export default AppComponent;
