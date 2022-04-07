import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import useSound from 'use-sound'
import tickSound from '../../../assets/sounds/tick.wav'

export default function RightBox({ showArrows, isActive, moveRight }) {
  const [playSound] = useSound(tickSound, { volume: 0.6 })

  function handleClick() {
    moveRight()
    playSound()
  }

  return (
    <div
      className={isActive.right ? 'right-box active' : 'right-box'}
      onClick={isActive.right ? handleClick : null}
    >
      {
        showArrows ?
          <FontAwesomeIcon icon={faCaretRight} />
          :
          null
      }
    </div>
  )
}
