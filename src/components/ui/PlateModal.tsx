export function PlateModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
            Quick Add
          </p>
          <button
            onClick={onClose}
            className="text-sm font-medium text-[rgb(var(--text-muted))] transition hover:text-[rgb(var(--accent))]"
            type="button"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
