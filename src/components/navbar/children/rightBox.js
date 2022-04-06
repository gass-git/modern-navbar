import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function RightBox({ showArrows, isActive, moveRight }) {
  return (
    <div className={isActive.right ? 'right-box active' : 'right-box'}>
      {
        showArrows ?
          <FontAwesomeIcon icon={faCaretRight} onClick={() => moveRight()} />
          :
          null
      }
    </div>
  )
}
