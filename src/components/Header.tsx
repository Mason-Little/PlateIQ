import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export function Header() {
  return (
    <header className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--text-muted))]">
          Plate IQ
        </p>
        <p className="mt-1 text-lg font-semibold text-[rgb(var(--text))]">
          Lift smarter, track faster
        </p>
      </div>
      <SignedOut>
        <SignInButton>
          <button
            className="inline-flex items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2 text-sm font-semibold text-[rgb(var(--text))] shadow-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            type="button"
          >
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
            Account
          </span>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
