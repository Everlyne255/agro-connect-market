export const SITE_URL = "https://agro-connect-market.lovable.app";
export const SITE_NAME = "AgroFresh Market";
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3820c9f-c386-4668-ba8a-d9104ab26d74/id-preview-c18dbdf6--a2d1d1b9-4687-4a6f-9c3e-c2eb399ed0a9.lovable.app-1778913297434.png";

interface SeoArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

export function seoHead({ title, description, path, image, type = "website", noindex }: SeoArgs) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: img },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
