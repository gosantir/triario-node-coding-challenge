process.loadEnvFile()

const config = {
  baseUrl: 'https://api.hubapi.com',
  hubspotAccessToken: process.env.HUBSPOT_ACCESS_TOKEN || '',
  maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
  retryDelayMs: parseInt(process.env.RETRY_DELAY_MS) || 1000,
  pageSize: parseInt(process.env.PAGE_SIZE) || 10
}

if (!config.hubspotAccessToken) {
  console.error('Error: HUBSPOT_ACCESS_TOKEN is not set in the environment variables.');
  process.exit(1);
}

export default config