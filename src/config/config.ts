const { API_URL, PROD, DEV, MODE } = import.meta.env;

export const config = {
  apiUrl: API_URL,
  isProd: PROD,
  isDev: DEV,
  mode: MODE,
};
