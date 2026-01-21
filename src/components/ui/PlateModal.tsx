export function PlateModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
}