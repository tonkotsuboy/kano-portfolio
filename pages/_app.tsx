import { useEffect, VFC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import TagManager from "react-gtm-module";
import { useStore } from "../store";

import "../styles/reset.scss";
import "../styles/base.scss";

const AppComponent: VFC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (gtmId == null) {
      throw new Error("no gtm");
    }
    TagManager.initialize({ gtmId });
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default AppComponent;
