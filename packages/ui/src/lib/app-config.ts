export const appConfig = {
    production: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'http://localhost:3010',
    talent: process.env.NEXT_PUBLIC_TALENT_URL || 'http://localhost:3020',
    staffing: process.env.NEXT_PUBLIC_STAFFING_URL || 'http://localhost:3030',
    finance: process.env.NEXT_PUBLIC_FINANCE_URL || 'http://localhost:3040',
    web: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3001',
    docs: process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3000',
    api: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
};
