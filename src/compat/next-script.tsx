import * as React from "react";

type ScriptProps = React.ScriptHTMLAttributes<HTMLScriptElement> & {
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload" | "worker";
};

export default function Script({ strategy: _strategy, ...props }: ScriptProps) {
  return <script {...props} />;
}
