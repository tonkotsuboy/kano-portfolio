import React from "react";

const ExternalLink: React.FC<{ url: string; linkText: string }> = ({
  url,
  linkText,
}) => {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {linkText}
    </a>
  );
};

export default ExternalLink;
