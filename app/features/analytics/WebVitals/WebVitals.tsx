"use client";

import { useReportWebVitals } from "next/web-vitals";

import type { NextWebVitalsMetric } from "next/app";
import type { FC } from "react";

// Core Web Vitals（LCP / INP / CLS など）を計測し、gtag があれば GA イベントとして送信する。
// gtag 未ロード環境では何も送らない（クラッシュしない）。
export const WebVitals: FC = () => {
  useReportWebVitals((metric: NextWebVitalsMetric) => {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
      // CLS は小数なので 1000 倍して整数化（GA の value は整数前提）。
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    });
  });

  return null;
};
