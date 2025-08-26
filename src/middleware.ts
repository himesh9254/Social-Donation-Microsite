import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	// Only protect /admin routes, not /admin/login
	if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && pathname !== '/admin') {
		const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
		if (!session) {
			const url = request.nextUrl.clone();
			url.pathname = '/admin/login';
			url.searchParams.set('redirect', pathname);
			return NextResponse.redirect(url);
		}
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
