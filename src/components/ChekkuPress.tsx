// Stylised wooden chekku (oil press) with oil dripping into a brass bowl.
export function ChekkuPress({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 420" className={className} role="img" aria-label="Oil dripping from a wooden chekku press into a brass bowl">
      <defs>
        <linearGradient id="wood" x1="0" x2="1">
          <stop offset="0" stopColor="#5A3B20" />
          <stop offset="0.5" stopColor="#8A5E36" />
          <stop offset="1" stopColor="#5A3B20" />
        </linearGradient>
        <linearGradient id="brass" x1="0" x2="1">
          <stop offset="0" stopColor="#B8862B" />
          <stop offset="0.45" stopColor="#F2CF73" />
          <stop offset="1" stopColor="#A9761F" />
        </linearGradient>
        <linearGradient id="oilg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4C452" />
          <stop offset="1" stopColor="#D98E1C" />
        </linearGradient>
        <clipPath id="bowl">
          <path d="M92 318h176c0 44-40 70-88 70s-88-26-88-70z" />
        </clipPath>
      </defs>

      {/* pestle (the rotating log) */}
      <rect x="166" y="0" width="28" height="120" rx="6" fill="url(#wood)" />
      <path d="M140 18h80" stroke="#3E2814" strokeWidth="10" strokeLinecap="round" />

      {/* mortar body */}
      <path d="M96 96h168l-20 150H116z" fill="url(#wood)" />
      <path d="M96 96h168" stroke="#3E2814" strokeWidth="8" strokeLinecap="round" />
      <g stroke="#3E2814" strokeOpacity="0.35" strokeWidth="2" fill="none">
        <path d="M120 120c10 40 6 80 14 116" />
        <path d="M160 112c4 44 0 90 6 128" />
        <path d="M206 112c-2 40 4 88 0 128" />
        <path d="M240 120c-8 40-6 82-12 116" />
      </g>
      {/* seeds peeking over the rim */}
      <g fill="#E8C98A">
        <ellipse cx="128" cy="90" rx="7" ry="5" />
        <ellipse cx="146" cy="86" rx="6" ry="4.5" />
        <ellipse cx="214" cy="86" rx="7" ry="5" />
        <ellipse cx="232" cy="90" rx="6" ry="4.5" />
      </g>

      {/* spout */}
      <path d="M170 246h20l-4 22h-12z" fill="#3E2814" />

      {/* drips */}
      <ellipse className="drip" cx="180" cy="276" rx="5" ry="7" fill="url(#oilg)" />
      <ellipse className="drip drip-2" cx="180" cy="276" rx="5" ry="7" fill="url(#oilg)" />

      {/* brass bowl with oil */}
      <path d="M92 318h176c0 44-40 70-88 70s-88-26-88-70z" fill="url(#brass)" />
      <g clipPath="url(#bowl)">
        <rect className="oil-fill" x="92" y="320" width="176" height="80" fill="url(#oilg)" opacity="0.95" />
      </g>
      <ellipse cx="180" cy="318" rx="88" ry="10" fill="#C99A3A" />
      <ellipse cx="180" cy="320" rx="78" ry="6" fill="#F4C452" />
      <path d="M118 340c10 22 30 32 50 36" stroke="#fff" strokeOpacity="0.45" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="180" cy="404" rx="70" ry="8" fill="#000" opacity="0.18" />
    </svg>
  );
}
