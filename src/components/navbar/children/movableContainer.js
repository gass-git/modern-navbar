import React from 'react'

export default function MovableContainer({ links, translatedX, selected, setSelected }) {
  return (
    <div className='movable-container' style={{ transform: `translateX(-${translatedX}px)` }}>
      {
        links.map((link) => {
          return (
            selected === link ?
              <div
                className='selected'
                onClick={() => setSelected(link)}
              >
                {link}
              </div>
              :
              <div onClick={() => setSelected(link)}>{link}</div>
          )
        })
      }
    </div>
  )
}
