import React, { ReactElement } from "react";

import "../styles/reset.scss";
import "../styles/base.scss";
import { AppProps } from "next/app";

const AppComponent = ({ Component, pageProps }: AppProps): ReactElement => (
  <Component {...pageProps} />
);

export default AppComponent;
