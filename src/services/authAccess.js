const parseCsv = (value) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const fallbackAllowedEmails = [
  "biancasabka@gmail.com",
  "pedroantoniofalves@gmail.com",
  "miguelmcmatos@gmail.com",
  "sweam_miranda@hotmail.com",
  "otofcs@gmail.com",
];

const configuredEmails = parseCsv(import.meta.env.VITE_ALLOWED_GOOGLE_EMAILS);
const allowedEmails = new Set(
  configuredEmails.length > 0 ? configuredEmails : fallbackAllowedEmails
);
const allowedDomains = new Set(parseCsv(import.meta.env.VITE_ALLOWED_GOOGLE_DOMAINS));

export const hasConfiguredGoogleAccessRules =
  allowedEmails.size > 0 || allowedDomains.size > 0;

const getEmailDomain = (email) => {
  const normalized = String(email ?? "").trim().toLowerCase();
  const atIndex = normalized.lastIndexOf("@");
  return atIndex >= 0 ? normalized.slice(atIndex + 1) : "";
};

export function isAuthorizedGoogleProfile(profile) {
  const email = String(profile?.email ?? "").trim().toLowerCase();
  if (!email) return false;

  if (!hasConfiguredGoogleAccessRules) {
    return false;
  }

  if (allowedEmails.has(email)) {
    return true;
  }

  const domain = getEmailDomain(email);
  return Boolean(domain && allowedDomains.has(domain));
}

export function getGoogleAccessMessage() {
  if (!hasConfiguredGoogleAccessRules) {
    return "Acesso externo temporariamente desabilitado. Configure os e-mails ou domínios autorizados para liberar o login.";
  }

  return "Acesso restrito a contas Google autorizadas pela SEMADES.";
}
