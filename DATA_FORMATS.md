# Data Formats Documentation

This document describes the data structures and formats used throughout the Social Good Donations Microsite.

## 📊 Database Formats

### Donation Record Schema

**File Location**: `data/donations.json`
**Format**: JSON Array of Donation Objects

```typescript
interface DonationRecord {
  id: string;              // Unique identifier (auto-generated)
  donorName: string;       // Donor's full name
  donorEmail: string;      // Donor's email address
  amount: number;          // Donation amount (numeric)
  currency: string;        // Currency code (e.g., "USD")
  frequency: string;       // "One-time" | "Monthly"
  message?: string;        // Optional donor message
  paymentId: string;       // Payment processor ID
  status: string;          // Payment status
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
}
```

#### Example Donation Record:
```json
{
  "donorName": "John Doe",
  "donorEmail": "john.doe@example.com",
  "amount": 50,
  "currency": "USD",
  "frequency": "One-time",
  "message": "Happy to support the cause!",
  "paymentId": "8BW75636ES067612X",
  "status": "COMPLETED",
  "id": "mev12npm2icm62m1d7e",
  "createdAt": "2025-08-28T06:33:37.930Z",
  "updatedAt": "2025-08-28T06:33:37.931Z"
}
```

#### Field Specifications:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `id` | string | Yes | Auto-generated | Unique record identifier |
| `donorName` | string | Yes | 1-100 chars | Donor's display name |
| `donorEmail` | string | Yes | Valid email | Contact email |
| `amount` | number | Yes | > 0 | Donation amount |
| `currency` | string | Yes | ISO 4217 | Currency code (default: USD) |
| `frequency` | string | Yes | Enum | "One-time" or "Monthly" |
| `message` | string | No | 0-500 chars | Optional donor message |
| `paymentId` | string | Yes | Varies | Payment processor transaction ID |
| `status` | string | Yes | Varies | Payment status from processor |
| `createdAt` | string | Yes | ISO 8601 | Record creation timestamp |
| `updatedAt` | string | Yes | ISO 8601 | Last update timestamp |

#### Payment Status Values:
- `"completed"` - Direct/demo payments
- `"COMPLETED"` - PayPal payments
- `"pending"` - Processing payments
- `"failed"` - Failed payments

#### Payment ID Formats:
- **Demo payments**: `demo-{timestamp}` (e.g., `demo-1756138213851`)
- **PayPal payments**: PayPal transaction ID (e.g., `8BW75636ES067612X`)
- **Test payments**: `capture_{timestamp}_{random}` (e.g., `capture_1756211651004_rghkoi97s`)

## 📝 Content Management Formats

### Markdown File Structure

**File Location**: `content/*.md`
**Format**: Markdown with YAML frontmatter

#### Hero Content (`content/hero.md`)
```markdown
---
title: "Page title text"
subtitle: "Subtitle description"
cta_label: "Button text"
cta_link: "#anchor"
---

Optional markdown content body
```

#### About Content (`content/about.md`)
```markdown
---
heading: "Section heading"
highlights:
  - "Highlight point 1"
  - "Highlight point 2"
  - "Highlight point 3"
  - "Highlight point 4"
---

Main content body in markdown format.
Supports **bold**, *italic*, and other markdown features.
```

#### Impact Content (`content/impact.md`)
```markdown
---
heading: "Impact section title"
stats:
  - label: "Category name"
    value: "Percentage or number"
    description: "Brief description"
  - label: "Education"
    value: "40%"
    description: "Scholarships and supplies"
---

Optional additional content
```

### Content API Response Format

**Endpoint**: `GET /api/admin/content`
**Response Format**: JSON Object

```typescript
interface ContentResponse {
  [filename: string]: {
    content: string;        // Raw markdown with frontmatter
    lastModified: string;   // ISO 8601 timestamp
  }
}
```

#### Example API Response:
```json
{
  "hero.md": {
    "content": "---\ntitle: \"Together, we turn kindness into impacts\"\n---\n\nContent body",
    "lastModified": "2025-08-28T10:30:00.000Z"
  },
  "about.md": {
    "content": "---\nheading: \"About the Cause\"\n---\n\nAbout content",
    "lastModified": "2025-08-28T10:25:00.000Z"
  }
}
```

## 🔧 API Request/Response Formats

### Donation Submission

**Endpoint**: `POST /api/donations/submit`
**Request Format**:
```typescript
interface DonationRequest {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency?: string;      // Optional, defaults to "USD"
  frequency?: string;     // Optional, defaults to "One-time"
  message?: string;       // Optional
}
```

**Response Format**:
```typescript
interface DonationResponse {
  success: boolean;
  donationId: string;
  amount: number;
  currency: string;
  donorEmail: string;
  emailSent: boolean;
  message: string;
}
```

### PayPal Order Creation

**Endpoint**: `POST /api/paypal/create-order`
**Request Format**:
```typescript
interface PayPalOrderRequest {
  amount: number;
  currency?: string;      // Optional, defaults to "USD"
  donorName?: string;     // Optional
  donorEmail?: string;    // Optional
}
```

**Response Format**:
```typescript
interface PayPalOrderResponse {
  orderID: string;        // PayPal order ID
  status: string;         // Order status
}
```

## 🔍 Validation Rules

### Email Validation
- Must match regex: `/\S+@\S+\.\S+/`
- Maximum length: 254 characters

### Amount Validation
- Must be numeric
- Minimum value: 1 (USD or equivalent)
- Maximum precision: 2 decimal places

### Name Validation
- Minimum length: 1 character
- Maximum length: 100 characters
- Cannot be empty or only whitespace

### Message Validation
- Maximum length: 500 characters
- Optional field
- HTML tags are stripped for security

## 🔒 Security Considerations

### Data Sanitization
- All user inputs are validated and sanitized
- HTML content is escaped to prevent XSS
- Email addresses are validated before processing

### Sensitive Data Handling
- Payment IDs are stored but never displayed to users
- Email addresses are used only for sending confirmations
- No credit card data is stored locally

### Error Handling
- Validation errors return HTTP 400 with specific error messages
- Server errors return HTTP 500 with generic error messages
- All errors are logged for debugging

## 📋 Usage Examples

### Creating a Test Donation
```bash
curl -X POST http://localhost:3000/api/donations/submit \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Test User",
    "donorEmail": "test@example.com",
    "amount": 25,
    "frequency": "One-time",
    "message": "Test donation"
  }'
```

### Updating Content
```bash
curl -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "hero.md",
    "content": "---\ntitle: \"New Title\"\n---\n\nNew content"
  }'
```

## 🔄 Data Migration Notes

### Database Evolution
- The database format has remained stable since project inception
- All timestamps are stored in UTC ISO 8601 format
- Currency amounts are stored as numbers (not strings)

### Backward Compatibility
- Old payment ID formats are preserved
- Status field values may vary based on payment processor
- All existing records remain valid with current schema
