const defaultSiteUrl = "https://alexchenic.github.io/cva6-roadmap-dev";

function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl);

export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAssetPath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
