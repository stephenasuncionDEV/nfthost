import { NextResponse } from "next/server";
import { default as appConfig } from "@/config/index";

export const config = {
  matcher: ["/", "/_sites/:path"],
};

export default async function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  console.log("[nfthost] uri: ", appConfig.frontendUrl);

  const isDomain = hostname.indexOf(appConfig.frontendUrl) === -1;
  if (isDomain) {
    console.log("[nfthost]", "Using custom domain");

    const host =
      hostname.indexOf("www.") !== -1
        ? hostname.slice(hostname.indexOf("www.") + 4)
        : hostname;

    console.log("[nfthost]", "host:", host);

    const site = await fetch(
      `${appConfig.serverUrl}/api/website/getWebsiteByDomain?domain=${host}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${process.env.CREATE_WEBSITE_TOKEN}`,
        },
      },
    );

    const siteRes = await site.json();
    if (!siteRes) return NextResponse.redirect("/404");

    url.pathname = `/_sites/${siteRes.route}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // For subdomains
  const subpath = hostname.slice(0, hostname.indexOf("."));

  if (subpath !== "www") {
    url.pathname = `/_sites/${subpath}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
