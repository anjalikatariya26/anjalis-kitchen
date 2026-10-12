/**
 * JainSymbol — Official Jain Food Certification Symbol.
 * As prescribed by Indian Food Standards & provided by user (reference: yellow square with yellow circle on dark):
 * A square container with a bright yellow square outline and a solid yellow circle inside (#F5B800 / #EAB308).
 */

export function JainSymbol({
  size = 18,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle ${className}`}
      aria-label="Jain Food Symbol (No Onion, No Garlic)"
      role="img"
    >
      {/* Dark background backing for crisp contrast */}
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="2"
        fill="#111827"
      />
      {/* Bright Yellow Square Border */}
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="1"
        fill="none"
        stroke="#F5B800"
        strokeWidth="2.2"
      />
      {/* Central Solid Yellow Dot */}
      <circle cx="12" cy="12" r="5.2" fill="#F5B800" />
    </svg>
  );
}

/**
 * JainBadge — Standardized pill badge with the official Jain symbol and label.
 */
export function JainBadge({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300 shadow-xs ${className}`}
      title="Jain Option Available (Strictly No Onion, No Garlic, No Root Vegetables)"
    >
      <JainSymbol size={compact ? 12 : 14} />
      <span>{compact ? 'Jain' : 'Jain Available'}</span>
    </span>
  );
}
