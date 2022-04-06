import React, { useEffect } from 'react'
import { useState } from 'react'
import './styles.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import LeftBox from './children/leftBox'
import RightBox from './children/rightBox'
import MovableContainer from './children/movableContainer'

export default function Navbar() {
  const [selected, setSelected] = useState('home')
  const [showArrows, setShowArrows] = useState(false)
  const [translatedX, setTranslatedX] = useState(0)
  const [translationAvailableX, setTranslationAvailableX] = useState(0)
  const { windowWidth } = useWindowDimensions()
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']
  const [isActive, setIsActive] = useState({ left: false, right: false })

  const width = {
    btn: 110,
    btnsContainer: links.length * 110,
    arrowBoxes: 60,
    navMargin: 20
  }

  // left and right BOXES WIDTHS plus NAV MARGINS
  const delta = 2 * width.arrowBoxes + 2 * width.navMargin

  useEffect(() => {
    setTranslatedX(0)

    // translatation available to the right
    if (windowWidth < 822) {
      let visibleWidth = windowWidth - delta // visible btns container width
      setTranslationAvailableX(width.btnsContainer - visibleWidth)
    }

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
      <LeftBox
        showArrows={showArrows}
        moveLeft={moveLeft}
        isActive={isActive}
      />
      <div className='items-container'>
        <MovableContainer
          links={links}
          translatedX={translatedX}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <RightBox
        showArrows={showArrows}
        moveRight={moveRight}
        isActive={isActive}
      />
    </div>
  )
}
