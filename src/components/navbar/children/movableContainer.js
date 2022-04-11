import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'
import selectionSound from '../../../assets/sounds/selection.wav'

export default function MovableContainer({ links, translatedX, selected, setSelected }) {
  const [playSound] = useSound(selectionSound, { volume: 0.9 })
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function handleClick(link, event) {
    setSelected(link)
    playSound()
    setX(event.nativeEvent.offsetX)
    setY(event.nativeEvent.offsetY)
  }

  useEffect(() => {
    if (x !== 0 || y !== 0) {
      setTimeout(() => {
        setX(0)
        setY(0)
      }, 400)
    }
  }, [x, y])

  return (
    <div className='movable-container' style={{ transform: `translateX(-${translatedX}px)` }}>
      {
        links.map((link) => {
          return (
            selected === link ?
              <div
                key={link}
                className='selected'
                onClick={(event) => handleClick(link, event)}
              >
                {
                  (x !== 0 && y !== 0) ?
                    <div
                      className='ripple'
                      style={{ left: `${x}px`, top: `${y}px` }}
                    >
                    </div>
                    :
                    null
                }
                {link}
              </div>
              :
              <div
                key={link}
                onClick={(event) => handleClick(link, event)}
              >
                {link}
              </div>
          )
        })
      }
    </div>
  )
}
