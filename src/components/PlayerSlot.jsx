import { useContext, useEffect, useRef, useState } from "react"
import { CharactersContext } from "../context/CharactersContext"
import { useAudio } from "../hooks/useAudio"
import { useSingleAudio } from "../hooks/useSingleAudio"


const characters_colors = { // Color corresponds to character position in array
    0: "red",
    1: "green",
    2: "blue",
    3: "pink",
    4: "cyan"
}

export function PlayerSlot({ player_number }) {

    const { characters, selectedCharacters, setSelectedCharacters } = useContext(CharactersContext)

    const currentCharacter = characters[selectedCharacters[player_number].selected]

    const main_div = useRef(null)

    const play_audio = useAudio(50)
    const play_voice = useSingleAudio(0)



    useEffect(() => {
        if (selectedCharacters[player_number].done == null) { // if selected is null we do nothing to avoid triggering animations
            return
        }

        if (selectedCharacters[player_number].done) {
            // Set character color
            main_div.current.classList.add(characters_colors[selectedCharacters[player_number].selected])

            play_audio("audios/select.mp3")
            setTimeout(() => {
                play_voice(`${import.meta.env.VITE_ASSETS_SOURCE}voices/${currentCharacter.audio}`)
            }, 250);
        }
        else {
            main_div.current.className = "player-slot"
            play_audio(`audios/unselect.mp3`)
        }
    }, [selectedCharacters[player_number].done])

    function check_repeated() {
        if (selectedCharacters.some((item, index) => index != player_number && item.done && item.selected == selectedCharacters[player_number].selected)) {
            change_character("next")
        }
    }

    useEffect(() => {
        check_repeated()
    }, [selectedCharacters])





    function change_character(direction) { // Change character in a direction
        let current_character = selectedCharacters[player_number].selected

        let step = direction == "next" ? 1 : -1
        let number_of_characters = 5

        let new_character = (current_character + step + number_of_characters) % number_of_characters

        // we check if the character is already selected or not
        // if selected the loop will toggle between values until a character is not selected yet.

        while (selectedCharacters.some((item) => item.selected == new_character && item.done)) {
            new_character = (new_character + step + number_of_characters) % number_of_characters
        }

        setSelectedCharacters(prev => prev.map((item, index) => index == player_number ? { ...item, "selected": new_character } : item))

        play_audio(`audios/toggle.mp3`)

    }

    function toggle_select_character() { // Toggle character selection

        setSelectedCharacters(prev => prev.map((entry, index) => index == player_number ? { ...entry, done: !entry.done } : entry))
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


                <img className={`player-slot-image ${selectedCharacters[player_number].done ? "selected" : ""}`} onClick={toggle_select_character}
                    src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${!selectedCharacters[player_number].done ? currentCharacter.image_unselected : currentCharacter.image}`}></img>

                <div className="character-name-container">
                    <p className={`character-name ${characters_colors[selectedCharacters[player_number].selected]}-font`}>{currentCharacter.name}</p>

                    {!selectedCharacters[player_number].done &&
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
                    <p className="select-indicator">{!selectedCharacters[player_number].done ? "OK" : "Cancel"}</p>

                </div>


            </div>
        </div>
    )

}