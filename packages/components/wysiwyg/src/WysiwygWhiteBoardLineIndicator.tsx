import React from 'react'

export interface WysiwygWhiteBoardLineIndicatorProps {
  lineNumber: number
}

const WysiwygWhiteBoardLineIndicator = ({
  lineNumber,
}: WysiwygWhiteBoardLineIndicatorProps) => {
  return <span className="line-indicator">{lineNumber}</span>
}

export default WysiwygWhiteBoardLineIndicator
