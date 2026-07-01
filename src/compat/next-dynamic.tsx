import * as React from "react";

type DynamicOptions = {
  loading?: () => React.ReactNode;
  ssr?: boolean;
};

export default function dynamic<P extends object>(
  loader: () => Promise<{ default: React.ComponentType<P> }>,
  options: DynamicOptions = {}
) {
  const LazyComponent = React.lazy(loader);

  return function DynamicComponent(props: P) {
    return (
      <React.Suspense fallback={options.loading?.() ?? null}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}
