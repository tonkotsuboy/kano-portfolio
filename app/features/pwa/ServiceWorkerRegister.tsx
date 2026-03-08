"use client";

import { useEffect } from "react";

/** Registers the custom service worker once on the client. */
export function ServiceWorkerRegister(): null {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }, []);

  return null;
}
