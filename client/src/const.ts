export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

/**
 * Project information
 */
export const PROJECT_INFO = {
  title: "Heliobiology: Solar-Avian Flu Correlation Platform",
  subtitle: "En honor a Alexander Leonidovich Chizhevsky (1897-1964)",
  description: "Plataforma interactiva que explora la correlación entre actividad solar y brotes de gripe aviar H5N1, validando el legado científico de Alexander Chizhevsky.",
  chizhevsky: {
    name: "Alexander Leonidovich Chizhevsky",
    years: "1897-1964",
    title: "Fundador de la Heliobiología",
    quote: "El pulso de la vida en la Tierra late al ritmo del Sol",
    quoteYear: 1922
  },
  dataSources: [
    "SILSO (Sunspot Index and Long-term Solar Observations)",
    "World Health Organization (WHO)",
    "World Organisation for Animal Health (WOAH/OIE)",
    "US Department of Agriculture (USDA)",
    "NASA Solar Dynamics Observatory",
    "NOAA Space Weather Prediction Center"
  ],
  dataRange: {
    solarCycles: "1755-2024 (270 años)",
    h5n1Outbreaks: "2008-2024 (16 años)",
    historicalPandemics: "1889-2024 (135 años)"
  }
};
