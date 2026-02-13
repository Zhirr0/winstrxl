import React from 'react'

const ButtonSvgPathDesktop = () => {
    const pathData = `
    M1 0
H0
C0.164179 0 0.164179 1 0 1
H1
C0.832104 1 0.832090 0 1 0
Z
`
  return (
    <svg width="0" height="0" viewBox="0 0 1 1" aria-hidden="true">
      <defs>
        <clipPath id="button-container-description" clipPathUnits="objectBoundingBox">
          <path d={pathData.trim()} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ButtonSvgPathDesktop
