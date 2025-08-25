import { NextRequest, NextResponse } from 'next/server';
import { readDonations } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const donations = readDonations();
    
    return NextResponse.json({
      success: true,
      donations,
      count: donations.length,
    });
  } catch (error) {
    console.error('Error reading donations:', error);
    return NextResponse.json(
      { error: 'Failed to read donations' },
      { status: 500 }
    );
  }
}

