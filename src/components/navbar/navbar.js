import React, { useEffect } from 'react'
import { useState } from 'react'
import './styles.css'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import LeftBox from './children/leftBox'
import RightBox from './children/rightBox'
import MovableContainer from './children/movableContainer'

export default function Navbar() {
  const { windowWidth } = useWindowDimensions()
  const [selected, setSelected] = useState('home')
  const [showArrows, setShowArrows] = useState(false)
  const [translatedX, setTranslatedX] = useState(0)
  const [translationWidth, setTranslationWidth] = useState(0)
  const [isActive, setIsActive] = useState({ left: false, right: false })
  const [hiddenItems, setHiddenItems] = useState({ left: 0, right: 0 })
  const links = ['home', 'skills', 'projects', 'activity', 'about', 'blog']

  useEffect(() => {
    // reset the translation on the X axis
    setTranslatedX(0)

    // handle active/show arrow conditions
    if (windowWidth >= 690) {
      setShowArrows(false)
    }
    else {
      setShowArrows(true)
      setIsActive({ left: false, right: true })
    }

    /**
     * Different states depending on the width of the navbar
     * */
    if (windowWidth >= 665 && windowWidth < 690) {
      setHiddenItems({ left: 0, right: 2 })
      setTranslationWidth(129)
    }
    else if (windowWidth >= 590 && windowWidth < 665) {
      setHiddenItems({ left: 0, right: 2 })
      setTranslationWidth(107)
    }
    else if (windowWidth >= 500 && windowWidth < 590) {
      setHiddenItems({ left: 0, right: 3 })
      setTranslationWidth(121)
    }
    else if (windowWidth >= 432 && windowWidth < 500) {
      setHiddenItems({ left: 0, right: 3 })
      setTranslationWidth(94)
    }
    else if (windowWidth >= 410 && windowWidth < 430) {
      setTranslationWidth(130)
      setHiddenItems({ left: 0, right: 4 })
    }
    else if (windowWidth >= 370 && windowWidth < 410) {
      setTranslationWidth(125)
      setHiddenItems({ left: 0, right: 3 })
    }
    else if (windowWidth >= 350 && windowWidth < 370) {
      setHiddenItems({ left: 0, right: 4 })
      setTranslationWidth(118)
    }
    else if (windowWidth >= 320 && windowWidth < 350) {
      setHiddenItems({ left: 0, right: 4 })
      setTranslationWidth(105)
    }
    else if (windowWidth >= 300 && windowWidth < 320) {
      setHiddenItems({ left: 0, right: 5 })
      setTranslationWidth(190)
    }
    else if (windowWidth >= 275 && windowWidth < 300) {
      setHiddenItems({ left: 0, right: 5 })
      setTranslationWidth(159)
    }
    else if (windowWidth >= 260 && windowWidth < 275) {
      setHiddenItems({ left: 0, right: 5 })
      setTranslationWidth(145)
    }
    else if (windowWidth >= 249 && windowWidth < 260) {
      setHiddenItems({ left: 0, right: 5 })
      setTranslationWidth(130)
    }
    else if (windowWidth < 249) {
      setHiddenItems({ left: 0, right: 5 })
      setTranslationWidth(95)
    }
  }, [windowWidth])

  function moveRight() {
    if (!isActive.left) setIsActive({ ...isActive, left: true })

    if (hiddenItems.right > 1) {
      setHiddenItems({ left: hiddenItems.left + 1, right: hiddenItems.right - 1 })
      setTranslatedX(translatedX + translationWidth)
    }
    else if (hiddenItems.right === 1) {
      setHiddenItems({ left: hiddenItems.left + 1, right: 0 })
      setTranslatedX(translatedX + translationWidth)
      setIsActive({ right: false, left: true })
    }
  }

  function moveLeft() {
    if (!isActive.right) setIsActive({ ...isActive, right: true })

    if (hiddenItems.left > 1) {
      setHiddenItems({ left: hiddenItems.left - 1, right: hiddenItems.right + 1 })
      setTranslatedX(translatedX - translationWidth)
    }
    else if (hiddenItems.left === 1) {
      setHiddenItems({ left: 0, right: hiddenItems.right + 1 })
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
