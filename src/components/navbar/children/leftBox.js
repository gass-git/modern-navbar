import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import useSound from 'use-sound'
import tickSound from '../../../assets/sounds/tick.wav'

export default function LeftBox({ showArrows, isActive, moveLeft }) {
  const [playSound] = useSound(tickSound, { volume: 0.6 })

  function handleClick() {
    moveLeft()
    playSound()
  }

  return (
    <div
      className={isActive.left ? 'left-box active' : 'left-box'}
      onClick={isActive.left ? handleClick : null}
    >
      {
        showArrows ?
          <FontAwesomeIcon icon={faCaretLeft} />
          :
          null
      }
    </div>
  )
}
