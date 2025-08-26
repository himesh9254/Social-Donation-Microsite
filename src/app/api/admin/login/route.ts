import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session';

export async function POST(request: NextRequest) {
	try {
		const { password } = await request.json();
		const expected = process.env.ADMIN_PASSWORD;
		if (!expected) {
			return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 });
		}
		if (!password || password !== expected) {
			return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
		}
		const res = NextResponse.json({ success: true });
		res.cookies.set(ADMIN_SESSION_COOKIE, 'ok', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			sameSite: 'lax',
			maxAge: 60 * 60 * 8, // 8 hours
		});
		return res;
	} catch (e) {
		return NextResponse.json({ error: 'Bad request' }, { status: 400 });
	}
}
