/**
 * Custom Heritage Festival Icons for Anjali's Kitchen.
 * Replaces basic text emojis with handcrafted, culturally authentic,
 * scalable vector icons with golden festive gradients.
 */

interface IconProps {
  className?: string;
  size?: number;
}

/** Ganesh Chaturthi — Modak & Auspicious Golden Aura */
export function ModakIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ganesh Chaturthi Modak"
      role="img"
    >
      <defs>
        <linearGradient id="modakGrad" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8DC" />
          <stop offset="0.4" stopColor="#F5D061" />
          <stop offset="1" stopColor="#E6A117" />
        </linearGradient>
        <radialGradient id="modakGlow" cx="16" cy="18" r="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8C00" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FF8C00" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Golden halo glow */}
      <circle cx="16" cy="18" r="12" fill="url(#modakGlow)" />
      {/* Saffron peak tip */}
      <path d="M16 4C15.5 5 14.8 6.5 14.5 8C14.2 9.5 14.5 10.5 16 11C17.5 10.5 17.8 9.5 17.5 8C17.2 6.5 16.5 5 16 4Z" fill="#E65100" />
      {/* Modak Body */}
      <path
        d="M16 6C13.5 10 7 17.5 8 23.5C8.8 28 23.2 28 24 23.5C25 17.5 18.5 10 16 6Z"
        fill="url(#modakGrad)"
        stroke="#C77700"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Modak Pleats (Flutes) */}
      <path d="M16 8V27M12 11C10.5 15.5 10.5 21 11.5 26M20 11C21.5 15.5 21.5 21 20.5 26" stroke="#B25900" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      {/* Kesar (Saffron) strands on top */}
      <circle cx="16" cy="13" r="1" fill="#C62828" />
      <circle cx="14" cy="17" r="0.8" fill="#E65100" />
      <circle cx="17.5" cy="18" r="0.8" fill="#E65100" />
    </svg>
  );
}

/** Diwali Faral — Heritage Clay Diya with Radiant Flame */
export function DiyaIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Diwali Diya"
      role="img"
    >
      <defs>
        <linearGradient id="flameGrad" x1="16" y1="2" x2="16" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF176" />
          <stop offset="0.45" stopColor="#FF9800" />
          <stop offset="1" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="diyaGrad" x1="6" y1="16" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E65100" />
          <stop offset="0.5" stopColor="#BF360C" />
          <stop offset="1" stopColor="#870000" />
        </linearGradient>
      </defs>
      {/* Flame radiant rays */}
      <circle cx="16" cy="9" r="7" fill="#FFC107" fillOpacity="0.25" />
      {/* Flickering flame */}
      <path
        d="M16 3C15 6 12.5 8.5 13 12C13.5 14.5 15 16 16 16C17 16 18.5 14.5 19 12C19.5 8.5 17 6 16 3Z"
        fill="url(#flameGrad)"
      />
      <path d="M16 7C15.5 9 14.5 10.5 15 12.5C15.3 13.8 16 14.5 16 14.5C16 14.5 16.7 13.8 17 12.5C17.5 10.5 16.5 9 16 7Z" fill="#FFFDE7" />
      {/* Diya clay lamp bowl */}
      <path
        d="M5 17C5 24 10 27 16 27C22 27 27 24 27 17C23 19 9 19 5 17Z"
        fill="url(#diyaGrad)"
        stroke="#FFB300"
        strokeWidth="1.2"
      />
      {/* Brass rim ornaments */}
      <path d="M7 18.5C10 20.5 22 20.5 25 18.5" stroke="#FFE082" strokeWidth="1" strokeLinecap="round" />
      {/* Base */}
      <ellipse cx="16" cy="27" rx="5" ry="1.5" fill="#5D101D" />
    </svg>
  );
}

/** Navratri Upvas — Sacred Kalash with Mango Leaves & Coconut */
export function KalashIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Navratri Kalash"
      role="img"
    >
      <defs>
        <linearGradient id="potGrad" x1="8" y1="14" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD54F" />
          <stop offset="0.6" stopColor="#FF8F00" />
          <stop offset="1" stopColor="#C43E00" />
        </linearGradient>
      </defs>
      {/* Coconut on top */}
      <path d="M16 3C13.5 6 13 8.5 13 10C14.5 10 17.5 10 19 10C19 8.5 18.5 6 16 3Z" fill="#6D4C41" stroke="#4E342E" strokeWidth="0.8" />
      {/* Mango leaves */}
      <path d="M10 10C12 7 14 8 14 10" fill="#2E7D32" />
      <path d="M22 10C20 7 18 8 18 10" fill="#2E7D32" />
      <path d="M7 11C9 8 12 10 12 11" fill="#388E3C" />
      <path d="M25 11C23 8 20 10 20 11" fill="#388E3C" />
      {/* Brass Kalash pot body */}
      <path
        d="M11 11H21C22 12.5 24 15 24 19C24 24.5 20 27 16 27C12 27 8 24.5 8 19C8 15 10 12.5 11 11Z"
        fill="url(#potGrad)"
        stroke="#FFE082"
        strokeWidth="1.2"
      />
      {/* Red Swastik / Tilak on pot */}
      <circle cx="16" cy="19" r="2" fill="#D32F2F" />
      {/* Sacred thread (Mauli) neck wrap */}
      <line x1="11" y1="13" x2="21" y2="13" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Raksha Bandhan — Sacred Artisanal Rakhi with Gold Embellishments */
export function RakhiIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Raksha Bandhan Rakhi"
      role="img"
    >
      <defs>
        <linearGradient id="rakhiCenter" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF176" />
          <stop offset="0.5" stopColor="#FFB300" />
          <stop offset="1" stopColor="#E65100" />
        </linearGradient>
      </defs>
      {/* Red silk threads extending left and right */}
      <path d="M2 16H9M23 16H30" stroke="#C2185B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 16H8M24 16H28" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" />
      {/* Thread beads */}
      <circle cx="7" cy="16" r="1.5" fill="#FFC107" />
      <circle cx="25" cy="16" r="1.5" fill="#FFC107" />
      {/* Floral petals ring */}
      <circle cx="16" cy="16" r="8.5" fill="#E91E63" stroke="#C2185B" strokeWidth="1" />
      {/* Golden beaded circle */}
      <circle cx="16" cy="16" r="6" fill="url(#rakhiCenter)" stroke="#FFD54F" strokeWidth="1.2" />
      {/* Center jewel */}
      <circle cx="16" cy="16" r="2.5" fill="#880E4F" />
      <circle cx="15.2" cy="15.2" r="0.8" fill="#FFFFFF" />
    </svg>
  );
}

/** Makar Sankranti — Flying Festive Kite with Sun Radiance */
export function SankrantiIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Makar Sankranti Kite"
      role="img"
    >
      <defs>
        <linearGradient id="kiteGrad" x1="16" y1="3" x2="16" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF" />
          <stop offset="0.5" stopColor="#FFEA00" />
          <stop offset="1" stopColor="#FF3D00" />
        </linearGradient>
      </defs>
      {/* Golden Uttarayan Sun in backdrop */}
      <circle cx="24" cy="7" r="5" fill="#FFD54F" fillOpacity="0.4" />
      {/* Kite Diamond Body */}
      <path
        d="M16 3L26 13L16 23L6 13L16 3Z"
        fill="url(#kiteGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />
      {/* Kite cross spars (spines) */}
      <line x1="16" y1="3" x2="16" y2="23" stroke="#FFFFFF" strokeWidth="1" opacity="0.85" />
      <path d="M6 13C12 17 20 17 26 13" stroke="#FFFFFF" strokeWidth="1" opacity="0.85" />
      {/* Kite tail tassel */}
      <path d="M16 23L12 28L20 28L16 23Z" fill="#E040FB" stroke="#FFFFFF" strokeWidth="0.8" />
      {/* Festive string line */}
      <path d="M16 28C14 30 18 31 16 32" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
