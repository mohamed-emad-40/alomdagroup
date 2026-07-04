// Professional SVG icons for heavy equipment categories
// Each returns a styled SVG component

export function ExcavatorIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="4" y="32" width="28" height="8" rx="4" fill="#D0D5DD"/>
      <rect x="6" y="34" width="24" height="4" rx="2" fill="#98A2B3"/>
      {[9,14,19,24].map(x => <circle key={x} cx={x} cy="36" r="3" fill="#667085"/>)}
      <rect x="10" y="22" width="18" height="12" rx="3" fill="#E8971A"/>
      <rect x="12" y="24" width="7" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="13" y="25" width="5" height="6" rx="1" fill="#B8D8F0"/>
      <line x1="26" y1="26" x2="38" y2="16" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
      <line x1="38" y1="16" x2="43" y2="26" stroke="#444" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M41 24 L46 27 L44 34 L39 31 Z" fill="#333"/>
    </svg>
  )
}

export function CraneIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="20" y="8" width="6" height="34" rx="2" fill="#D0D5DD"/>
      <rect x="18" y="6" width="10" height="4" rx="1" fill="#98A2B3"/>
      <line x1="23" y1="8" x2="44" y2="2" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="2" x2="44" y2="42" stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="3 2"/>
      <rect x="40" y="36" width="8" height="6" rx="1" fill="#E8971A"/>
      <line x1="44" y1="42" x2="44" y2="46" stroke="#667085" strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="14" x2="38" y2="10" stroke="#B0B8C4" strokeWidth="1.5"/>
      <rect x="4" y="38" width="40" height="4" rx="2" fill="#E8971A" opacity="0.3"/>
    </svg>
  )
}

export function BulldozerIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="30" width="36" height="8" rx="4" fill="#D0D5DD"/>
      {[6,12,18,24,30].map(x => <circle key={x} cx={x} cy="34" r="3.5" fill="#667085"/>)}
      <rect x="6" y="20" width="26" height="12" rx="3" fill="#E8971A"/>
      <rect x="8" y="22" width="9" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="9" y="23" width="7" height="6" rx="1" fill="#B8D8F0"/>
      <rect x="2" y="24" width="6" height="10" rx="2" fill="#D0D5DD"/>
      <rect x="2" y="26" width="5" height="6" rx="1" fill="#98A2B3"/>
    </svg>
  )
}

export function LoaderIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="8" y="24" width="28" height="12" rx="3" fill="#E8971A"/>
      <rect x="10" y="26" width="8" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="11" y="27" width="6" height="6" rx="1" fill="#B8D8F0"/>
      <circle cx="14" cy="38" r="4" fill="#667085"/>
      <circle cx="14" cy="38" r="2" fill="#98A2B3"/>
      <circle cx="34" cy="38" r="4" fill="#667085"/>
      <circle cx="34" cy="38" r="2" fill="#98A2B3"/>
      <line x1="36" y1="26" x2="44" y2="20" stroke="#667085" strokeWidth="3" strokeLinecap="round"/>
      <path d="M42 18 L48 20 L46 28 L40 26 Z" fill="#D0D5DD"/>
    </svg>
  )
}

export function TruckIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="18" width="30" height="16" rx="3" fill="#D0D5DD"/>
      <path d="M32 22 L44 22 L46 34 L32 34 Z" fill="#98A2B3"/>
      <rect x="34" y="24" width="8" height="6" rx="1" fill="#B8D8F0"/>
      <circle cx="10" cy="36" r="5" fill="#555"/>
      <circle cx="10" cy="36" r="2.5" fill="#888"/>
      <circle cx="36" cy="36" r="5" fill="#555"/>
      <circle cx="36" cy="36" r="2.5" fill="#888"/>
      <rect x="2" y="18" width="30" height="8" rx="2" fill="#E8971A" opacity="0.4"/>
    </svg>
  )
}

export function ConcreteIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="6" y="20" width="24" height="18" rx="3" fill="#D0D5DD"/>
      <ellipse cx="18" cy="20" rx="10" ry="6" fill="#98A2B3"/>
      <ellipse cx="18" cy="20" rx="7" ry="4" fill="#B0B8C4"/>
      <line x1="28" y1="24" x2="44" y2="14" stroke="#667085" strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="14" x2="44" y2="38" stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="44" cy="38" r="3" fill="#E8971A"/>
      <circle cx="10" cy="40" r="4" fill="#555"/>
      <circle cx="24" cy="40" r="4" fill="#555"/>
    </svg>
  )
}

export function CompactorIcon({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="8" y="22" width="32" height="12" rx="3" fill="#E8971A"/>
      <rect x="10" y="24" width="10" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="11" y="25" width="8" height="6" rx="1" fill="#B8D8F0"/>
      <rect x="2" y="34" width="44" height="8" rx="3" fill="#667085"/>
      <rect x="4" y="36" width="40" height="4" rx="2" fill="#98A2B3"/>
      {[8,16,24,32,40].map(x => <rect key={x} x={x} y="35" width="4" height="6" rx="1" fill="#555"/>)}
    </svg>
  )
}

// Map category → icon component
export const FLEET_ICONS = {
  'حفارات':  ExcavatorIcon,
  'رافعات':  CraneIcon,
  'تسوية':   BulldozerIcon,
  'لودر':    LoaderIcon,
  'شاحنات':  TruckIcon,
  'خرسانة':  ConcreteIcon,
}

export function getFleetIcon(category) {
  return FLEET_ICONS[category] || ExcavatorIcon
}
