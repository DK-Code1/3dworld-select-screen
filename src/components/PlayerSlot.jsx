import { useContext, useEffect, useRef, useState } from "react"
import { CharactersContext } from "../context/CharactersContext"
import { useAudio } from "../hooks/useAudio"
import { useSingleAudio } from "../hooks/useSingleAudio"

export function PlayerSlot({ player_number }) {

    const { characters, selectedCharacters, setSelectedCharacters, isSelected, setIsSelected } = useContext(CharactersContext)

    const [currentCharacter, setCurrentCharacter] = useState(characters[selectedCharacters[player_number]])

    const main_div = useRef(null)

    const play_audio = useAudio(50)
    const play_voice = useSingleAudio(0)

    useEffect(() => {
        if (!characters) {
            return
        }

        setCurrentCharacter(characters[selectedCharacters[player_number]])


    }, [selectedCharacters])

    useEffect(() => {
        if (isSelected[player_number] == null) {
            return
        }

        if (isSelected[player_number]) {
            // Set character color
            main_div.current.classList.add(characters_colors[selectedCharacters[player_number]])

            play_audio("audios/select.mp3")
            setTimeout(() => {
                play_voice(`${import.meta.env.VITE_ASSETS_SOURCE}voices/${currentCharacter.audio}`)
            }, 250);
        }
        else {
            main_div.current.className = "player-slot"
            play_audio(`audios/unselect.mp3`)
        }
    }, [isSelected[player_number]])

    const characters_colors = { // Color corresponds to character position in array
        0: "red",
        1: "green",
        2: "blue",
        3: "pink",
        4: "cyan"
    }

    function change_character(direction) {
        let current_character = selectedCharacters[player_number]

        if (direction == "next") {
            let next_character = (current_character + 1) <= 4 ? (current_character + 1) : 0

            setSelectedCharacters(selectedCharacters.map((entry, index) => index == player_number ? next_character : entry))
        }
        else {
            let previous_character = (current_character - 1) >= 0 ? (current_character - 1) : 4
            setSelectedCharacters(selectedCharacters.map((entry, index) => index == player_number ? previous_character : entry))
        }

        play_audio(`audios/toggle.mp3`)

    }

    function toggle_select_character() { // Toggle character selection
        setIsSelected(isSelected.map((item, index) => index == player_number ? !isSelected[player_number] : item))
    }



    return (

        <div ref={main_div} className="player-slot" >
            <div style={{ animation: `slide-up ${0.3 + player_number * 0.075}s ease` }} >

                <div className="player-slot-controller">

                    {[...Array(4).fill()].map((item, index) => (
                        <div className="controller-dot">
                            {index <= player_number &&
                                <div className="controller-dot-number">
                                </div>
                            }
                        </div>
                    ))}
                </div>


                <img className={`player-slot-image ${isSelected[player_number] ? "selected" : ""}`} onClick={toggle_select_character} 
                src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${!isSelected[player_number] ? currentCharacter.image_unselected : currentCharacter.image}`}></img>

                <div className="character-name-container">
                    <p className={`character-name ${characters_colors[selectedCharacters[[player_number]]]}-font`}>{currentCharacter.name}</p>

                    {!isSelected[player_number] &&
                        <>
                            <button onClick={() => change_character("prev")} >
                                <img src="arrow.png"></img>
                            </button>

                            <button onClick={() => change_character("next")} >
                                <img src="arrow.png"></img>
                            </button>
                        </>
                    }


                </div>

                <div onClick={toggle_select_character} className="select-indicator-container">

                    <p className="select-indicator-button">A</p>
                    <p className="select-indicator">{!isSelected[player_number] ? "OK" : "Cancel"}</p>

                </div>


            </div>
        </div>
    )

}