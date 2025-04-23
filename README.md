# HealAI - AI-Powered Medical Diagnostics

HealAI is an innovative platform that provides quick and accessible AI-powered medical diagnostics for minimal health issues. The application helps users assess their symptoms and manage their health through an intuitive interface.

## Features

- **AI-Powered Diagnostics**: Get preliminary assessments of your symptoms
- **Health Monitoring**: Track your health metrics over time
- **User Profiles**: Securely manage your health information
- **Dark/Light Mode**: Choose your preferred viewing experience
- **Mobile Responsive**: Access your health information on any device

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Google account for authentication

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/healai.git
cd healai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_AISTUDIO_GOOGLE=gemini_ai_api

# Database
DATABASE_URL="file:./dev.db"
```

4. Setup the database:

```bash
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js with Google provider
- **Styling**: Tailwind CSS with dark mode support
- **Deployment**: Vercel (recommended)

## Project Structure

- `src/app` - Next.js app router pages and API routes
- `src/components` - Reusable React components
- `src/lib` - Utility functions and database configuration
- `prisma` - Database schema and migrations

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deployment

The recommended way to deploy this application is using the [Vercel Platform](https://vercel.com/new). Follow these steps:

1. Push your code to a GitHub repository
2. Import your project to Vercel
3. Configure environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
