import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type NextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
};

export default React.forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, children, prefetch: _prefetch, replace: _replace, ...props },
  ref
) {
  const isInternal = href.startsWith("/");

  if (!isInternal) {
    return (
      <a ref={ref} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink ref={ref} to={href} {...props}>
      {children}
    </RouterLink>
  );
});
