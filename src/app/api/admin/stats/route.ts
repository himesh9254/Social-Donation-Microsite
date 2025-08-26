import { NextResponse } from 'next/server';
import { readDonations } from '@/lib/database';

export async function GET() {
  try {
    const donations = await readDonations();
    
    // Calculate statistics
    const totalDonations = donations.length;
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    
    // Calculate monthly growth (mock data for now)
    const monthlyGrowth = 12; // Mock percentage
    
    // Calculate unique donors
    const uniqueEmails = new Set(donations.map(d => d.donorEmail));
    const activeDonors = uniqueEmails.size;
    
    // Calculate recent trends
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthDonations = donations.filter(d => {
      const donationDate = new Date(d.date);
      return donationDate.getMonth() === thisMonth && donationDate.getFullYear() === thisYear;
    });
    
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
    const lastMonthDonations = donations.filter(d => {
      const donationDate = new Date(d.date);
      return donationDate.getMonth() === lastMonth && donationDate.getFullYear() === lastYear;
    });
    
    const thisMonthAmount = thisMonthDonations.reduce((sum, d) => sum + d.amount, 0);
    const lastMonthAmount = lastMonthDonations.reduce((sum, d) => sum + d.amount, 0);
    
    const monthlyGrowthActual = lastMonthAmount > 0 
      ? Math.round(((thisMonthAmount - lastMonthAmount) / lastMonthAmount) * 100)
      : 0;
    
    return NextResponse.json({
      totalDonations,
      totalAmount,
      monthlyGrowth: monthlyGrowthActual,
      activeDonors,
      thisMonthAmount,
      lastMonthAmount,
      thisMonthDonations: thisMonthDonations.length,
      lastMonthDonations: lastMonthDonations.length
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}

