# Project Dependencies

## Node.js Version Requirements
- **Node.js**: >= 18.x (recommended: 20.x)
- **npm**: >= 9.x (or yarn >= 3.x)

## Core Runtime Dependencies

### Framework & Core
```json
"next": "15.5.0"                    // Next.js React framework
"react": "19.1.0"                   // React library  
"react-dom": "19.1.0"               // React DOM bindings
```

### Payment Processing
```json
"@paypal/checkout-server-sdk": "^1.0.3"    // PayPal server-side SDK
"@paypal/paypal-server-sdk": "^1.1.0"      // Enhanced PayPal server SDK
"@paypal/react-paypal-js": "^8.8.3"        // PayPal React components
```

### Email & AI Services
```json
"nodemailer": "^7.0.5"                     // Email sending (Gmail integration)
"@types/nodemailer": "^7.0.1"              // TypeScript types for nodemailer
"@google/generative-ai": "^0.24.1"         // Google Gemini AI integration
"resend": "^6.0.1"                         // Alternative email service (backup)
```

### Content Management
```json
"gray-matter": "^4.0.3"                    // Frontmatter parsing for Markdown
"remark": "^15.0.1"                        // Markdown processing
"remark-parse": "^11.0.0"                  // Markdown parser
"unified": "^11.0.5"                       // Unified text processing
```

### UI Components
```json
"lucide-react": "^0.541.0"                 // Icon library
```

## Development Dependencies

### TypeScript & Types
```json
"typescript": "^5"                         // TypeScript compiler
"@types/node": "^20"                       // Node.js types
"@types/react": "^19"                      // React types
"@types/react-dom": "^19"                  // React DOM types
```

### Styling & CSS
```json
"tailwindcss": "^4"                        // Utility-first CSS framework
"@tailwindcss/postcss": "^4"               // Tailwind PostCSS integration
```

### Code Quality & Linting
```json
"eslint": "^9"                             // JavaScript/TypeScript linter
"eslint-config-next": "15.5.0"             // Next.js ESLint configuration
"@eslint/eslintrc": "^3"                   // ESLint configuration utilities
```

## Environment Setup

### Required Environment Variables
```bash
# PayPal Configuration (Required for payment processing)
PAYPAL_MODE=sandbox                         # or 'live' for production
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# Gmail Configuration (Required for email notifications)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Google Gemini AI (Optional - for personalized emails)
GEMINI_API_KEY=your_gemini_api_key

# Admin Configuration (Required for CMS access)
ADMIN_PASSWORD=your_secure_admin_password
```

### Installation Commands
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## Dependency Usage Analysis

### Actually Used Packages (Verified):
✅ All listed dependencies are actively imported and used in the codebase
✅ No unused dependencies found during analysis
✅ Version constraints are appropriate for stability

### Package Purposes:
- **Payment Processing**: Full PayPal integration stack for donations
- **Email System**: Automated thank-you emails with AI personalization
- **Content Management**: Markdown-based CMS for website content
- **UI/UX**: Modern responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support across the project

## Security Considerations
- All API keys should be stored in environment variables
- PayPal sandbox mode recommended for development
- Gmail app passwords required (not regular passwords)
- Admin password should be strong and unique

## Compatibility Notes
- Tested with Node.js 18.x and 20.x
- Compatible with npm and yarn package managers
- Works on Windows, macOS, and Linux
- Requires internet connection for external API integrations
