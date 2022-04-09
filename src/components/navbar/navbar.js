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
  const { windowWidth } = useWindowDimensions()
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']
  const [isActive, setIsActive] = useState({ left: false, right: false })
  const [translationWidth, setTranslationWidth] = useState(105)
  const [hiddenRight, setHiddenRigth] = useState(0)
  const [hiddenLeft, setHiddenLeft] = useState(0)

  useEffect(() => {
    setTranslatedX(0)
    setHiddenLeft(0)

    if (isActive.left) setIsActive({ ...isActive, left: false })

    if (windowWidth >= 590 && windowWidth < 690) {
      setShowArrows(true)
      setHiddenRigth(1)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 500 && windowWidth < 590) {
      setShowArrows(true)
      setHiddenRigth(2)
      setTranslationWidth(95)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 430 && windowWidth < 500) {
      setShowArrows(true)
      setHiddenRigth(3)
      setTranslationWidth(105)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 410 && windowWidth < 430) {
      setShowArrows(true)
      setTranslationWidth(92)
      setHiddenRigth(3)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 370 && windowWidth < 410) {
      setShowArrows(true)
      setTranslationWidth(85)
      setHiddenRigth(3)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 350 && windowWidth < 370) {
      setShowArrows(true)
      setHiddenRigth(4)
      setTranslationWidth(117)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 320 && windowWidth < 350) {
      setShowArrows(true)
      setHiddenRigth(4)
      setTranslationWidth(108)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 290 && windowWidth < 320) {
      setShowArrows(true)
      setHiddenRigth(4)
      setTranslationWidth(95)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 275 && windowWidth < 290) {
      setShowArrows(true)
      setHiddenRigth(4)
      setTranslationWidth(85)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 260 && windowWidth < 275) {
      setShowArrows(true)
      setHiddenRigth(5)
      setTranslationWidth(155)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 240 && windowWidth < 260) {
      setShowArrows(true)
      setHiddenRigth(5)
      setTranslationWidth(145)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth < 240) {
      setShowArrows(true)
      setHiddenRigth(5)
      setTranslationWidth(125)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth > 689) {
      setShowArrows(false)
      setIsActive({ left: false, right: true })
    }
  }, [windowWidth])

  function moveRight() {
    if (!isActive.left) setIsActive({ ...isActive, left: true })

    if (hiddenRight > 1) {
      setHiddenRigth(hiddenRight - 1)
      setHiddenLeft(hiddenLeft + 1)
      setTranslatedX(translatedX + translationWidth)
    }
    else if (hiddenRight === 1) {
      setHiddenRigth(0)
      setHiddenLeft(hiddenLeft + 1)
      setTranslatedX(translatedX + translationWidth)
      setIsActive({ right: false, left: true })
    }
  }

  function moveLeft() {
    if (!isActive.right) setIsActive({ ...isActive, right: true })

    if (hiddenLeft > 1) {
      setHiddenLeft(hiddenLeft - 1)
      setHiddenRigth(hiddenRight + 1)
      setTranslatedX(translatedX - translationWidth)
    }
    else if (hiddenLeft === 1) {
      setHiddenLeft(0)
      setHiddenRigth(hiddenRight + 1)
      setTranslatedX(translatedX - translationWidth)
      setIsActive({ right: true, left: false })
    }
  }

  return (
    <div className='wrapper'>
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
    </div>
  )
}
