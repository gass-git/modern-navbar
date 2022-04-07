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

  // widths
  const btnWidth = 110
  const btnsContainerWidth = links.length * btnWidth

  // (left/right boxes widths) * 2 + (navbar wrapper padding + margin) * 2 + (border width) * 2
  const delta = 2 * 60 + 2 * 15 + 2 * 2

  useEffect(() => {
    setTranslatedX(0)

    // translatation available to the right
    if (windowWidth < 840) {
      let visibleWidth = windowWidth - delta // visible btns container width
      setTranslationAvailableX(btnsContainerWidth - visibleWidth)
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
    if (translationAvailableX - translatedX >= btnWidth) {
      setTranslatedX(translatedX + btnWidth)
      setIsActive({ ...isActive, left: true })
    }
    else if (translationAvailableX - translatedX < btnWidth) {
      setTranslatedX(translationAvailableX)
      setIsActive({ ...isActive, right: false })
    }
  }

  function moveLeft() {
    if (translatedX >= btnWidth) {
      setTranslatedX(translatedX - btnWidth)
    }
    else if (translatedX < btnWidth && translatedX > 0) {
      setTranslatedX(0)
    }

    // arrow activation and deactivation conditions
    if (isActive.right === false) {
      setIsActive({ ...isActive, right: true })
    }
    else if (translatedX < btnWidth || translatedX === btnWidth) {
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
