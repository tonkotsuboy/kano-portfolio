import clsx from "clsx";

import styles from "./LiquidGlassBox.module.css";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Props<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
}

/**
 * Apple風リキッドグラスの汎用ラッパー。
 * SVGフィルターで本物のガラスのような歪み・反射効果を実現
 * reference: https://codepen.io/lucasromerodb/pen/vEOWpYM
 */
export const LiquidGlassBox = <T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = as ?? "div";
  return (
    <Component className={clsx(styles.wrapper, className)} {...props}>
      <svg className={styles.filter} aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves={1}
              seed={5}
              result="turbulence"
            />

            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
              <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
              <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
            </feComponentTransfer>

            <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />

            <feSpecularLighting
              in="softMap"
              surfaceScale={5}
              specularConstant={1}
              specularExponent={100}
              lightingColor="white"
              result="specLight"
            >
              <fePointLight x={-200} y={-200} z={300} />
            </feSpecularLighting>

            <feComposite
              in="specLight"
              operator="arithmetic"
              k1={0}
              k2={1}
              k3={1}
              k4={0}
              result="litImage"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale={150}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className={styles.effect} aria-hidden />
      <div className={styles.tint} aria-hidden />
      <div className={styles.shine} aria-hidden />
      <div className={styles.content}>{children}</div>
    </Component>
  );
};
