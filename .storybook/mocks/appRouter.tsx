import React from "react";

// A minimal mock of Next.js app router context used by next/navigation.
const AppRouterContext = React.createContext<{ navigate: (_href: string) => void } | null>(null);

export const AppRouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = (href: string) => {
    if (typeof window === "undefined") {return;}
    window.history.pushState(null, "", href);
  };

  return <AppRouterContext.Provider value={{ navigate }}>{children}</AppRouterContext.Provider>;
};

export { AppRouterContext };
