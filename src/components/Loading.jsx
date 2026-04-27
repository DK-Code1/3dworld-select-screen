import { useEffect } from "react"
import { preload } from "react-dom"

export function Loading() {

    function PreloadAssets() {
        preload('audios/done.mp3', { as: 'fetch', fetchPriority: 'high' })
        preload('audios/select.mp3', { as: 'fetch', fetchPriority: 'high' })
        preload('audios/toggle.mp3', { as: 'fetch', fetchPriority: 'high' })
        preload('audios/unselect.mp3', { as: 'fetch', fetchPriority: 'high' })


        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Mario.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Mario-unselected.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Luigi.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Luigi-unselected.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Toad.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Toad-unselected.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Peach.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Peach-unselected.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Rosalina.png`, { as: 'image', fetchPriority: 'high' })
        preload(`${import.meta.env.VITE_ASSETS_SOURCE}icons/Rosalina-unselected.png`, { as: 'image', fetchPriority: 'high' })
    }

    useEffect(() => {
        PreloadAssets()

    }, [])

    return (
        <div className="loading">
            <h1>Loading...</h1>
        </div>
    )
}