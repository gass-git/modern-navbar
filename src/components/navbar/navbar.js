import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'
import './styles.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { useEffect } from 'react'
import { isEditable } from '@testing-library/user-event/dist/utils'

export default function Navbar() {
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']
  const [selected, setSelected] = useState('home')
  const [showArrows, setShowArrows] = useState(false)
  const [isActive, setIsActive] = useState({ left: false, right: false })
  const [translatedX, setTranslatedX] = useState(0)
  const [translationAvailableX, setTranslationAvailableX] = useState(0)
  const { windowWidth } = useWindowDimensions()

  // WIDTHS of elements
  const width = {
    btn: 110,
    btnsContainer: links.length * 110,
    arrowBoxes: 60,
    navMargin: 20
  }

  // left and right BOXES WIDTHS plus NAV MARGINS
  const delta = 2 * width.arrowBoxes + 2 * width.navMargin

  useEffect(() => {
    setTranslatedX(0)  // when width changes set distanceX to default

    // translatation available to the right
    if (windowWidth < 822) {
      let visibleWidth = windowWidth - delta // visible btns container width
      setTranslationAvailableX(width.btnsContainer - visibleWidth)
    }

    // show/hide/activate arrows
    if (windowWidth < 770) {
      setShowArrows(true)
      setIsActive({ ...isActive, right: true })
    }
    else {
      setShowArrows(false)
    }

  }, [windowWidth])

  function moveRight() {
    if (translationAvailableX >= translatedX + width.btn) {
      setTranslatedX(translatedX + width.btn)
      setIsActive({ ...isActive, left: true })
    }
    else if (translationAvailableX - translatedX < width.btn) {
      setTranslatedX(translationAvailableX)
      setIsActive({ ...isActive, right: false })
    }
  }

  function moveLeft() {
    if (translatedX >= width.btn) {
      setTranslatedX(translatedX - width.btn)
    }
    else if (translatedX < width.btn && translatedX > 0) {
      setTranslatedX(0)
    }

    // arrow activation and deactivation conditions
    if (isActive.right === false) {
      setIsActive({ ...isActive, right: true })
    }
    else if (translatedX < width.btn || translatedX === width.btn) {
      setIsActive({ ...isActive, left: false })
    }
  }

  return (
    <div className='main-container'>
      <div className={isActive.left ? 'left-box active' : 'left-box'}>
        {
          showArrows ?
            <FontAwesomeIcon icon={faCaretLeft} onClick={() => moveLeft()} />
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
      <div className={isActive.right ? 'right-box active' : 'right-box'}>
        {
          showArrows ?
            <FontAwesomeIcon icon={faCaretRight} onClick={() => moveRight()} />
            :
            null
        }
      </div>
    </div>
  )
}
