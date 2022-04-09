import React from 'react'
import useSound from 'use-sound'
import tickSound from '../../../assets/sounds/tick.wav'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
          <ArrowForwardIosIcon fontSize='medium' />
          :
          null
      }
    </div>
  )
}
