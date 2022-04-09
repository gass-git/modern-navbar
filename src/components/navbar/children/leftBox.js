import React from 'react'
import useSound from 'use-sound'
import tickSound from '../../../assets/sounds/tick.wav'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
          <ArrowBackIosIcon />
          :
          null
      }
    </div>
  )
}
