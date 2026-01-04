import React from "react";
import { AppRouterContext } from "./appRouter";

const toSearchParams = () =>
  new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

export const useSearchParams = () => {
  const params = toSearchParams();
  return params;
};

export const useRouter = () => {
  const ctx = React.useContext(AppRouterContext);

  const navigate = (url: string, method: "push" | "replace") => {
    if (typeof window === "undefined") {return;}
    if (ctx?.navigate) {
      ctx.navigate(url);
      return;
    }
    const fn = method === "replace" ? window.history.replaceState : window.history.pushState;
    fn.call(window.history, null, "", url);
  };

  return {
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    prefetch: async () => {},
    push: (url: string) => navigate(url, "push"),
    refresh: () => window.location.reload(),
    replace: (url: string) => navigate(url, "replace"),
  };
};

export const usePathname = () => {
  if (typeof window === "undefined") {return "/";}
  return window.location.pathname;
};

export const useSearchParamsMock = useSearchParams;
