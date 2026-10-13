"use client";
import Link from "next/link";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FormEvent,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Eye,
  EyeOff,
  UserRound,
  Heart,
  ShoppingBag,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import {
  Profile,
  readDemoSession,
  signUpDemo,
  signInDemo,
  signOutDemo,
} from "@/lib/demo-auth";
type AuthState = {
  profile: Profile | null;
  ready: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};
const Auth = createContext<AuthState | null>(null);
export const useAuth = () => useContext(Auth)!;
export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null),
    [ready, setReady] = useState(false);
  useEffect(() => {
    setProfile(readDemoSession());
    setReady(true);
    const sync = () => setProfile(readDemoSession());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return (
    <Auth.Provider
      value={{
        profile,
        ready,
        signUp: async (name, email, password) => {
          setProfile(await signUpDemo(name, email, password));
        },
        signIn: async (email, password) => {
          setProfile(await signInDemo(email, password));
        },
        signOut: () => {
          signOutDemo();
          setProfile(null);
        },
      }}
    >
      {children}
    </Auth.Provider>
  );
}
export default function AccountPage({
  mode,
}: {
  mode: "account" | "login" | "signup";
}) {
  const { profile, ready, signUp, signIn, signOut } = useAuth();
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [visible, setVisible] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState(false);
  const signup = mode === "signup";
  useEffect(() => {
    setDone(false);
    setError("");
    setPassword("");
    setConfirm("");
  }, [mode]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (signup && password !== confirm) {
      setError("The passwords don’t match.");
      return;
    }
    setBusy(true);
    try {
      if (signup) await signUp(name, email, password);
      else await signIn(email, password);
      setPassword("");
      setConfirm("");
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Unable to continue. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (!ready)
    return (
      <div className="page-shell narrow">
        <p role="status">Opening your KIKA space…</p>
      </div>
    );
  if (mode === "account" && profile)
    return (
      <div className="page-shell">
        <div className="account-heading">
          <div>
            <span className="eyebrow">YOUR KIKA SPACE</span>
            <h1>
              Hey, {profile.name.split(" ")[0]}
              <span className="blue-dot">.</span>
            </h1>
            <p className="lead">Your style. Your saves. Your next step.</p>
          </div>
          <button className="button outline" onClick={signOut}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
        <div className="account-dashboard">
          <div className="account-card">
            <UserRound />
            <h2>Your profile</h2>
            <p>
              {profile.name}
              <br />
              {profile.email}
            </p>
            <span className="pill">Demo member</span>
          </div>
          <Link href="/wishlist" className="account-card">
            <Heart />
            <h2>Your wishlist</h2>
            <p>All the pairs you’re keeping an eye on.</p>
            <span className="text-link">
              View saved pairs <ArrowUpRight size={16} />
            </span>
          </Link>
          <Link href="/cart" className="account-card">
            <ShoppingBag />
            <h2>Your bag</h2>
            <p>A good next step starts with a great pair.</p>
            <span className="text-link">
              Open your bag <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
        <div className="notice">
          Assignment account: your profile is stored in this browser. It is not
          verified or synced across devices. Checkout remains a demo.
        </div>
      </div>
    );
  if (mode === "account")
    return (
      <div className="page-shell narrow auth">
        <span className="eyebrow">YOUR KIKA SPACE</span>
        <h1>Good to see you.</h1>
        <p className="lead">
          Sign in to your demo account, or make yourself at home.
        </p>
        <div className="auth-choices">
          <Link href="/login" className="button dark">
            Sign in <ArrowRight size={18} />
          </Link>
          <Link href="/signup" className="button outline">
            Create an account <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="notice">
          Demo accounts work in the browser where you create them. Use a sample
          email and a password you don’t use elsewhere.
        </div>
      </div>
    );
  return (
    <div className="auth-layout">
      <div className="auth-art">
        <span className="eyebrow light">KEEP IT KLASSIC ALWAYS</span>
        <h2>
          Your style.
          <br />
          Your space.
          <br />
          Your KIKA.
        </h2>
        <span className="auth-monogram" aria-hidden="true">
          K.
        </span>
        <p>Good taste looks even better on you.</p>
      </div>
      <div className="auth-form">
        <span className="eyebrow">
          {signup ? "JOIN THE ROTATION" : "WELCOME BACK"}
        </span>
        <h1>{signup ? "Make yourself at home." : "Back for more?"}</h1>
        <p className="lead">
          {signup
            ? "Create your KIKA demo account."
            : "Sign in with the account you created in this browser."}
        </p>
        {done ? (
          <div className="auth-success" role="status">
            <CheckCircle2 size={40} />
            <h2>{signup ? "You’re in." : "Welcome back."}</h2>
            <p>Your demo account is ready, {profile?.name}.</p>
            <Link className="button dark" href="/account">
              Go to your account <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            {signup && (
              <label>
                Your name
                <input
                  required
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                />
              </label>
            )}
            <label>
              Email address
              <input
                required
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <div className="password-field">
                <input
                  required
                  minLength={signup ? 8 : 1}
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={signup ? "new-password" : "current-password"}
                  placeholder={
                    signup ? "At least 8 characters" : "Your demo password"
                  }
                />
                <button
                  type="button"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            {signup && (
              <label>
                Confirm password
                <input
                  required
                  minLength={8}
                  type={visible ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  placeholder="One more time"
                />
              </label>
            )}
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button type="submit" className="button dark" disabled={busy}>
              {busy ? "One moment…" : signup ? "Create account" : "Sign in"}
              <ArrowRight size={18} />
            </button>
            <p className="auth-switch">
              {signup ? "Already part of the rotation?" : "First time here?"}{" "}
              <Link href={signup ? "/login" : "/signup"}>
                {signup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </form>
        )}
        <p className="demo-caption">
          Assignment demo · Accounts are local to this browser, not secure
          online authentication. Please use a demo password, never a real one.
        </p>
      </div>
    </div>
  );
}
