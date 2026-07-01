declare module "next" {
  export type Metadata = Record<string, unknown>;
  export namespace MetadataRoute {
    type Sitemap = Array<Record<string, unknown>>;
    type Robots = Record<string, unknown>;
  }
}
