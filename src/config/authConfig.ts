export const authConfig = {
  development: {
    siteUrl: 'http://localhost:8080',
    redirectUrl: 'http://localhost:8080/**',
  },
  production: {
    siteUrl: process.env.SITE_URL || '',
    redirectUrl: `${process.env.SITE_URL}/**` || '',
  },
};

export const getAuthConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? authConfig.development : authConfig.production;
};