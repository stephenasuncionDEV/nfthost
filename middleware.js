import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/about', '/_sites/:path'],
}

export default async function middleware(req) {
    const url = req.nextUrl;

    // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
    const hostname = req.headers.get('host');

    // If localhost, assign the host value manually
    // If prod, get the custom domain/subdomain value by removing the root URL
    // (in the case of "test.vercel.app", "vercel.app" is the root URL)
    // const currentHost =
    //     process.env.NODE_ENV === 'production' &&
    //     hostname.replace(`.${process.env.ROOT_DOMAIN}`, '')

    // console.log(currentHost)

    const subpath = process.env.NODE_ENV === 'production' ? hostname.slice(0, hostname.indexOf('.')) : url;

    // Prevent security issues – users should not be able to canonically access
    // the pages/sites folder and its respective contents.
    console.log('hostname', hostname)
    console.log('pathname', url.pathname)
    console.log('subpath', subpath)

    // rewrite to the current subdomain under the pages/sites folder
    url.pathname = `/mints/${subpath}${url.pathname}`
    

    return NextResponse.rewrite(url)
}