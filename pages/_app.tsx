import { VFC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { useStore } from "../store";

import "../styles/reset.scss";
import "../styles/base.scss";

const AppComponent: VFC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default AppComponent;
