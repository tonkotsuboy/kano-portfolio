import type { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  path: string;
  title?: string;
}

export const SimpleIcon: FC<Props> = ({ path, title, ...props }) => (
  <svg
    role={title ? "img" : "presentation"}
    aria-hidden={title ? undefined : true}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d={path} />
  </svg>
);
