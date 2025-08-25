# Social Good Donations Microsite

A modern, responsive donation microsite built with Next.js, Tailwind CSS, and integrated with PayPal, Gmail, and Google Gemini AI.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📝 Content management via Netlify CMS
- 💳 PayPal payment integration (ready for setup)
- 📧 Automated thank you emails via Gmail
- 🤖 AI-powered personalized email content via Google Gemini
- 📊 Admin dashboard to view donations
- 🗄️ JSON-based database for donation records

## Tech Stack

- **Framework**: Next.js 15.5.0 (App Router)
- **Styling**: Tailwind CSS 4
- **CMS**: Netlify CMS (Decap CMS)
- **Payment**: PayPal REST API
- **Email**: Nodemailer with Gmail
- **AI**: Google Gemini API
- **Database**: JSON file storage
- **Deployment**: Vercel

## Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```env
   # PayPal Configuration
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret

   # Gmail Configuration
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password

   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Main site: http://localhost:3000
   - Admin CMS: http://localhost:3000/admin
   - Admin Dashboard: http://localhost:3000/admin/donations

## Deployment to Vercel

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub account (to connect your repository)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env.local` file

### Step 3: Environment Variables in Vercel
Add these environment variables in your Vercel project settings:

```env
# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Gmail Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### Step 4: Deploy
1. Click "Deploy" in Vercel
2. Your site will be live at: `https://your-project-name.vercel.app`

## API Endpoints

- `POST /api/donations/submit` - Submit a donation
- `GET /api/donations/list` - Get all donations (admin)
- `POST /api/paypal/create-order` - Create PayPal order
- `POST /api/paypal/capture-order` - Capture PayPal payment

## File Structure

```
donations-microsite/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── admin/         # Admin pages
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   └── lib/              # Utility functions
├── public/
│   └── admin/            # Netlify CMS files
├── content/              # CMS content files
├── data/                 # Database files
└── vercel.json          # Vercel configuration
```

## Customization

### Content Management
- Edit content via Netlify CMS at `/admin`
- Content is stored in `content/` directory as markdown files

### Styling
- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.ts`

### Email Templates
- Customize email templates in `src/lib/gmail.ts`
- Modify AI prompts in `src/lib/gemini.ts`

## Troubleshooting

### Common Issues
1. **Email not sending**: Check Gmail app password and 2FA settings
2. **Gemini API errors**: Verify API key and model name
3. **PayPal integration**: Ensure sandbox credentials are correct
4. **Build errors**: Check Node.js version (18.x recommended)

### Support
For issues with:
- **Vercel deployment**: Check Vercel logs and environment variables
- **Local development**: Ensure all dependencies are installed
- **API endpoints**: Verify environment variables are set correctly

## License

MIT License - feel free to use this project for your own donation sites!
