import { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "./components/PlayerSlot";
import { CharactersContext } from "./context/CharactersContext";
import { useAudio } from "./hooks/useAudio";
import { IrisEffect } from "./components/IrisEffect";
import { Loading } from "./components/Loading";

export function Home(){


    const {characters, selectedCharacters} = useContext(CharactersContext)
    const [isFinished, setIsFinished] = useState(false)

    const play_audio = useAudio(100)

    useEffect(()=>{ // If all slots stay selected it will play an audio
        if (!selectedCharacters.every((entry) => entry.done)){
            return
        }
            
        var timer = setTimeout(() => {
                play_audio(`audios/done.mp3`)
                setIsFinished(true)
            }, 3000);
        

        return ()=>{ //cancel the timer
            clearTimeout(timer)
        }
    },[selectedCharacters])


    if(!characters){
        return(

            <Loading>
                
            </Loading>
        )
    }

    return(
        <div className="screen">

            {isFinished && 
                <IrisEffect setVisibility={setIsFinished} ></IrisEffect>
            }

            <div className="title">
                <h1>Select a character.</h1>

            </div>

            <div className="player-slots-grid">

                {[...Array(4).fill()].map((item, index)=>(

                    <PlayerSlot key={index} player_number={index} ></PlayerSlot>
                ))}

            </div>

            <div className="navigation-bar">
                <p>B</p>
                <p>Back</p>
            </div>
        </div>
    )
}