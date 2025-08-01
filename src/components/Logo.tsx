export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 40" {...props}>
      {/* Símbolo del medidor de agua */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 20a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-10 8a8 8 0 0 1-7.456-5.04A1 1 0 0 1 13.6 22h12.8a1 1 0 0 1 .944.96A8 8 0 0 1 20 28Z"
        fill="#3B82F6"
      />

      {/* Onda de agua */}
      <path
        d="M20 22c2 0 4-1 6-1s4 1 6 1 4-1 6-1 4 1 6 1"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />

      {/* Texto "WATER METER" - Versión ajustada */}
      <text
        x="60"
        y="26"
        fontFamily="'Arial', sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#1F2937"
        letterSpacing="0.5"
      >
        WATER METER
      </text>
    </svg>
  )
}