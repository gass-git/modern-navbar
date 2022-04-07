import React from 'react'
import useSound from 'use-sound'
import selectionSound from '../../../assets/sounds/selection.wav'

export default function MovableContainer({ links, translatedX, selected, setSelected }) {
  const [playSound] = useSound(selectionSound, { volume: 0.9 })

  function handleClick(link) {
    setSelected(link)
    playSound()
  }

  return (
    <div className='movable-container' style={{ transform: `translateX(-${translatedX}px)` }}>
      {
        links.map((link) => {
          return (
            selected === link ?
              <div
                key={link}
                className='selected'
                onClick={() => handleClick(link)}
              >
                {link}
              </div>
              :
              <div
                key={link}
                className='ripple'
                onClick={() => handleClick(link)}
              >
                {link}
              </div>
          )
        })
      }
    </div>
  )
}
