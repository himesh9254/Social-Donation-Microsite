import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: 'ok',
      message: 'POST request received successfully',
      receivedData: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Test POST API error:', error);
    return NextResponse.json(
      { error: 'Test POST API failed' },
      { status: 500 }
    );
  }
}





