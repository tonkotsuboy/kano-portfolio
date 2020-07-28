import React, { ReactElement } from "react";

import "../styles/reset.scss";
import "../styles/base.scss";
import { AppProps } from "next/app";

export default ({ Component, pageProps }: AppProps): ReactElement => (
  <Component {...pageProps} />
);
