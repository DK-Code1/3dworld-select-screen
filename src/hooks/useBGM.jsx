import { useCallback, useEffect, useRef, useState } from "react"

export function useBGM() {

    const [isPlaying, setIsPlaying] = useState(false)

    const audio = useRef(new Audio())

    function loop_song() {
        audio.current.currentTime = 21.8
        audio.current.play()
    }

    function handle_tab_change() {
        if (document.hidden) {
            audio.current.pause()
        }
        else {
            audio.current.play()
        }

    }

    const start_playback = useCallback(() => {

        audio.current.src = `${import.meta.env.VITE_ASSETS_SOURCE}bgm/maintitle.opus`
        audio.current.autoplay = false
        audio.current.volume = 0.25

        audio.current.play().then(() => {
            setIsPlaying(true)
        }).catch(() => {
            console.log("Cannot play audio yet.")
        })

        audio.current.addEventListener("ended", loop_song)
        document.addEventListener("visibilitychange", handle_tab_change)

    }, [])

    function try_play() {
        if (!isPlaying) {
            start_playback()
        }
    }

    try_play()

    useEffect(() => {
        document.addEventListener("pointerdown", try_play, { once: true })
    }, [])
}