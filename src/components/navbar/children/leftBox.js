import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

export default function LeftBox({ showArrows, isActive, moveLeft }) {
  return (
    <div className={isActive.left ? 'left-box active' : 'left-box'}>
      {
        showArrows ?
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => moveLeft()} />
          :
          null
      }

    </div>
  )
}
