import { useRef } from "react"

export function useSingleAudio(max_intervale=100) {


    const last_play = useRef(Date.now()) // Timer for audio
    const audio = useRef(new Audio())
    audio.current.autoplay = false
    audio.current.volume = 0.25

    async function play_audio(audio_path) {
        // let audio = new Audio(audio_path)

        audio.current.src = audio_path
        audio.current.play()

    }

    function play_audio_timer(audio_path) {

        if (!audio_path){
            return
        }

        let last_timer = last_play.current

        let current_time = Date.now()

        if (current_time - last_timer > max_intervale) {
            last_play.current = current_time
            play_audio(audio_path)
        }

    }

    return play_audio_timer
}