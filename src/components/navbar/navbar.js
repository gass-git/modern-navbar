import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'
import './styles.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useEffect } from 'react'

export default function Navbar() {
  const [selected, setSelected] = useState('home')
  const [showArrows, setShowArrows] = useState(false)
  const [isActive, setActive] = useState({ left: false, right: false })
  const [translatedX, setTranslatedX] = useState(0)
  const [translationAvailableX, setTranslationAvailableX] = useState(0)
  const { width } = useWindowDimensions()
  const links = [
    'home',
    'skills',
    'projects',
    'activity',
    'about',
    'blog'
  ]
  const btnWidth = 110

  // width of the btns container
  const btnsContainerWidth = links.length * btnWidth

  const arrowBoxesWidth = 60
  const navMargin = 20

  // left and right boxes widths + nav margins
  let delta = 2 * arrowBoxesWidth + 2 * navMargin

  useEffect(() => {
    // when width changes set distanceX to default
    setTranslatedX(0)

    // translatation left available
    if (width < 822) {
      // visible btns container width
      let visibleWidth = width - delta

      setTranslationAvailableX(btnsContainerWidth - visibleWidth)
    }

    if (width < 770) {
      setShowArrows(true)
    }
    else {
      setShowArrows(false)
    }
  }, [width])

  function moveRight() {
    if (translationAvailableX >= translatedX + btnWidth) {
      setTranslatedX(translatedX + btnWidth)
    }
    else if (translationAvailableX - translatedX < btnWidth) {
      setTranslatedX(translationAvailableX)
    }
  }

  function moveLeft() {
    if (translatedX >= btnWidth) {
      setTranslatedX(translatedX - btnWidth)
    }
    else if (translatedX < btnWidth && translatedX > 0) {
      setTranslatedX(0)
    }
  }

  return (
    <div className='main-container'>
      <div className='left-box'>
        {
          showArrows ?
            <FontAwesomeIcon
              icon={faCaretLeft}
              onClick={() => moveLeft()}
            />
            :
            null
        }

      </div>
      <div className='items-container'>
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
      </div>
      <div className='right-box'>
        {
          showArrows ?
            <FontAwesomeIcon
              icon={faCaretRight}
              onClick={() => moveRight()}
            />
            :
            null
        }
      </div>
    </div>
  )
}
