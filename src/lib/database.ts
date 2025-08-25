import fs from 'fs';
import path from 'path';

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  frequency: string;
  message?: string;
  paymentId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const databasePath = path.join(process.cwd(), 'data', 'donations.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(databasePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read all donations
export function readDonations(): DonationRecord[] {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(databasePath)) {
      return [];
    }
    const data = fs.readFileSync(databasePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading donations:', error);
    return [];
  }
}

// Save a new donation
export function saveDonation(donation: Omit<DonationRecord, 'id' | 'createdAt' | 'updatedAt'>): DonationRecord {
  try {
    ensureDataDirectory();
    const donations = readDonations();
    
    const newDonation: DonationRecord = {
      ...donation,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    donations.push(newDonation);
    fs.writeFileSync(databasePath, JSON.stringify(donations, null, 2));
    
    return newDonation;
  } catch (error) {
    console.error('Error saving donation:', error);
    throw new Error('Failed to save donation');
  }
}

// Generate a unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get donation by ID
export function getDonationById(id: string): DonationRecord | null {
  const donations = readDonations();
  return donations.find(donation => donation.id === id) || null;
}

// Get all donations for a specific email
export function getDonationsByEmail(email: string): DonationRecord[] {
  const donations = readDonations();
  return donations.filter(donation => donation.donorEmail === email);
}

