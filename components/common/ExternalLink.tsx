import type { FC } from "react";

const ExternalLink: FC<{ url: string; linkText: string }> = ({
  url,
  linkText,
}) => (
  <a href={url} rel="noopener noreferrer" target="_blank">
    {linkText}
  </a>
);

export default ExternalLink;
