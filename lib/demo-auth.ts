/** Assignment-only local accounts. This is not a server authentication boundary. */
export type Profile = { name: string; email: string };
type DemoAccount = Profile & { salt: string; passwordHash: string };
const ACCOUNTS_KEY = "kika-demo-accounts-v1";
const SESSION_KEY = "kika-demo-session-v1";
const normalizeEmail = (email: string) => email.trim().toLowerCase();
function readAccounts(): DemoAccount[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(ACCOUNTS_KEY) || "[]",
    );
    if (!Array.isArray(value)) return [];
    return value.filter(
      (a): a is DemoAccount =>
        a &&
        typeof a.name === "string" &&
        typeof a.email === "string" &&
        typeof a.salt === "string" &&
        typeof a.passwordHash === "string",
    );
  } catch {
    return [];
  }
}
const hex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
async function hashPassword(password: string, salt: string): Promise<string> {
  if (!crypto.subtle)
    throw new Error("Use an HTTPS address or localhost for demo accounts.");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new TextEncoder().encode(salt),
      iterations: 210000,
    },
    key,
    256,
  );
  return hex(new Uint8Array(hash));
}
function startSession(account: Profile) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: account.email }));
  return { name: account.name, email: account.email };
}
export async function signUpDemo(
  name: string,
  email: string,
  password: string,
): Promise<Profile> {
  const normalized = normalizeEmail(email);
  if (!name.trim()) throw new Error("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized))
    throw new Error("Please enter a valid email address.");
  if (password.length < 8)
    throw new Error("Choose a demo password with at least 8 characters.");
  if (readAccounts().some((a) => a.email === normalized))
    throw new Error(
      "A demo account already exists with this email. Please log in.",
    );
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  const passwordHash = await hashPassword(password, salt);
  const accounts = readAccounts();
  if (accounts.some((a) => a.email === normalized))
    throw new Error(
      "A demo account already exists with this email. Please log in.",
    );
  const account = { name: name.trim(), email: normalized, salt, passwordHash };
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    return startSession(account);
  } catch {
    throw new Error(
      "Browser storage is unavailable. Allow local storage to use demo accounts.",
    );
  }
}
export async function signInDemo(
  email: string,
  password: string,
): Promise<Profile> {
  const account = readAccounts().find((a) => a.email === normalizeEmail(email));
  if (
    !account ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  )
    throw new Error(
      "Email or password is incorrect. Accounts are available only in the browser where they were created.",
    );
  return startSession(account);
}
export function readDemoSession(): Profile | null {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    const account = readAccounts().find((a) => a.email === session?.email);
    return account ? { name: account.name, email: account.email } : null;
  } catch {
    return null;
  }
}
export function signOutDemo() {
  localStorage.removeItem(SESSION_KEY);
}
