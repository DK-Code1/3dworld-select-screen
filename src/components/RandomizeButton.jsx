import { useContext } from "react";
import { CharactersContext } from "../context/CharactersContext";
import { useAudio } from "../hooks/useAudio";


export function RandomizeButton() {

    const { selectedCharacters, setSelectedCharacters } = useContext(CharactersContext)

    const play_audio = useAudio(50)

    function sleep(ms) { // timer
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function shuffle(array) { // universal array shuffle
        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function randomize_slot(slot_number, new_character) { // Assign a character to a slot

        setSelectedCharacters(prev => prev.map((entry, index) => index == slot_number ? { ...entry, selected: new_character } : entry))
    }

    async function randomize_characters() {

        // if(selectedCharacters.every(entry=> entry.done)){ // Skip if all characters are already selected
        //     return
        // }

        for (var i = 0; i < 10; i++) {

            const numbers = shuffle([0, 1, 2, 3, 4]) // non duplicate characters

            for (var x = 0; x < 4; x++) {
                randomize_slot(x, numbers[x])

                play_audio("audios/toggle.mp3") // play toggle audio for a better effect
            }
            await sleep(100) // must wait so react doesn't stack renders

        }
    }

    return (
        <div className="randomize-container">
            <button onClick={randomize_characters} className="randomize-button">
                <img src="random.png">
                </img>
            </button>
        </div>
    )
}