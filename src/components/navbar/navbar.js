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
  const btnWidth = 105
  const btnsContainerWidth = links.length * btnWidth

  // (left/right boxes widths) * 2 + (navbar wrapper padding + margin) * 2 + (border width) * 2
  const delta = 2 * 60 + 2 * 10

  // max-width of wrapper
  const [maxWidth, setMaxWidth] = useState(780)

  const [hiddenRight, setHiddenRigth] = useState(0)
  const [hiddenLeft, setHiddenLeft] = useState(0)

  useEffect(() => {
    setTranslatedX(0)
    setHiddenLeft(0)

    if (isActive.left) setIsActive({ ...isActive, left: false })

    if (windowWidth >= 660 && windowWidth < 690) {
      setShowArrows(true)
      setMaxWidth(680)
      setHiddenRigth(1)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth >= 555 && windowWidth < 660) {
      setShowArrows(true)
      setMaxWidth(540)
      setHiddenRigth(2)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth > 445 && windowWidth < 555) {
      setShowArrows(true)
      setMaxWidth(435)
      setHiddenRigth(3)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth > 335 && windowWidth < 445) {
      setShowArrows(true)
      setMaxWidth(315)
      setHiddenRigth(4)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth > 0 && windowWidth < 335) {
      setShowArrows(true)
      setMaxWidth(205)
      setHiddenRigth(5)
      setIsActive({ left: false, right: true })
    }
    else if (windowWidth > 689) {
      setMaxWidth(780)
      setShowArrows(false)
      setIsActive({ left: false, right: true })
    }
  }, [windowWidth])

  function moveRight() {
    if (!isActive.left) setIsActive({ ...isActive, left: true })

    if (hiddenRight > 1) {
      setHiddenRigth(hiddenRight - 1)
      setHiddenLeft(hiddenLeft + 1)
      setTranslatedX(translatedX + btnWidth)
    }
    else if (hiddenRight === 1) {
      setHiddenRigth(0)
      setHiddenLeft(hiddenLeft + 1)
      setTranslatedX(translatedX + btnWidth)
      setIsActive({ right: false, left: true })
    }
  }

  function moveLeft() {
    if (!isActive.right) setIsActive({ ...isActive, right: true })

    if (hiddenLeft > 1) {
      setHiddenLeft(hiddenLeft - 1)
      setHiddenRigth(hiddenRight + 1)
      setTranslatedX(translatedX - btnWidth)
    }
    else if (hiddenLeft === 1) {
      setHiddenLeft(0)
      setHiddenRigth(hiddenRight + 1)
      setTranslatedX(translatedX - btnWidth)
      setIsActive({ right: true, left: false })
    }
  }

  return (
    <div className='wrapper' style={{ maxWidth: maxWidth }}>
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
