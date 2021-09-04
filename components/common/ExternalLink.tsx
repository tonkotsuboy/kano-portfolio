import { VFC } from "react";

const ExternalLink: VFC<{ url: string; linkText: string }> = ({
  url,
  linkText,
}) => (
  <a href={url} rel="noopener noreferrer" target="_blank">
    {linkText}
  </a>
);

export default ExternalLink;
