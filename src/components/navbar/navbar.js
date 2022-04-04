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
  const [isRightActive, setRightActive] = useState(false)
  const [isLeftActive, setLeftActive] = useState(false)
  const [distanceX, setDistanceX] = useState(0)
  const { width } = useWindowDimensions()
  const links = [
    'home',
    'skills',
    'projects',
    'activity',
    'about',
    'blog'
  ]

  useEffect(() => {
    if (width < 770) {
      setShowArrows(true)
    }
    else {
      setShowArrows(false)
    }
  }, [width])

  function translateX(pixels) {
    setDistanceX(distanceX + pixels)
  }

  return (
    <div className='main-container'>
      <div className='left-box'>
        {
          showArrows ?
            <FontAwesomeIcon icon={faCaretLeft} onClick={() => translateX(-110)} />
            :
            null
        }

      </div>
      <div className='items-container'>
        <div className='movable-container' style={{ transform: `translateX(-${distanceX}px)` }}>
          {
            links.map((link) => {
              return (
                selected === link ?
                  <div className='selected' onClick={() => setSelected(link)}>{link}</div>
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
            <FontAwesomeIcon icon={faCaretRight} onClick={() => translateX(110)} />
            :
            null
        }
      </div>
    </div>
  )
}
