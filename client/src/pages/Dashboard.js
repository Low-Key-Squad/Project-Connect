import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import React from "react"

const characters = [
    {
      name: 'Richard Hendricks',
      url: '\src\images\Gg6BpGn_d.webp'
    },
    {
      name: 'Erlich Bachman',
      url: '\src\images\Gg6BpGn_d.webp' /*trzeba pododawać resztę zdjęć*/ 
    },
    {
      name: 'Monica Hall',
      url: '\src\images\Gg6BpGn_d.webp'
    },
    {
      name: 'Jared Dunn',
      url: '\src\images\Gg6BpGn_d.webp'
    },
    {
      name: 'Dinesh Chugtai',
      url: '\src\images\Gg6BpGn_d.webp'
    }
  ]
const [lastDirection, setLastDirection] = useState()

const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
}

const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
}

const Dashboarding = () => {
    return (
        <div className="dashboard">
            <ChatContainer/>
            <div className="swi-per-container">
                <div className="card-container">
                {characters.map((character) =>
                <TinderCard 
                    className='swipe' 
                    key={character.name} 
                    onSwipe={(dir) => swiped(dir, character.name)} 
                    onCardLeftScreen={() => outOfFrame(character.name)}>
                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                        className='card'>
                        <h3>{character.name}</h3>
                    </div>
                </TinderCard>
                )}
            <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
            </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboarding