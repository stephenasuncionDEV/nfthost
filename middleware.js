import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/_sites/:path'],
}

export default async function middleware(req) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host');

    const subpath = process.env.NODE_ENV === 'production' ? hostname.slice(0, hostname.indexOf('.')) : 'www';

    // if (url.pathname.startsWith(`/mints`)) {
    //     url.pathname = `/404`
    // } else {
        if (subpath !== 'www') {   
            url.pathname = `/_sites/${subpath}${url.pathname}`;
        }
    //}

    return NextResponse.rewrite(url);
}