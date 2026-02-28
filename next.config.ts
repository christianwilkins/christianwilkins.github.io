import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/legacy/2023", destination: "/legacy/2023/index.html" },
      { source: "/legacy/2023/articles", destination: "/legacy/2023/articles/index.html" },
      { source: "/legacy/2023/case-studies", destination: "/legacy/2023/case-studies/index.html" },
      { source: "/legacy/2024", destination: "/legacy/2024/index.html" },
      { source: "/legacy/2024/about", destination: "/legacy/2024/about/index.html" },
      { source: "/legacy/2025", destination: "/legacy/2025/index.html" },
    ];
  },
};

export default nextConfig;
