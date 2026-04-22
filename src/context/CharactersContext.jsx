import { createContext, useEffect, useState } from "react";

export const CharactersContext = createContext(null)

export function CharactersContextProvider({children}){

    const [characters, setCharacters] = useState(null)
    const [selectedCharacters, setSelectedCharacters] = useState( // Slot characters status, 4 slots, selected character number and "done" if selected.
        [{"selected": 0, "done": null},
        {"selected": 1, "done": null},
        {"selected": 2, "done": null},
        {"selected": 3, "done": null}] ) 
    //first done value is null, so it doesn't trigger the selected animation on start


    useEffect(() => { // Fetch data first
        const fetchData = async () => {
            const file = await fetch(`character_list.json`)
            const data = await file.json();
            setCharacters(data)

        };

        fetchData();

    }, [])

    return(
        <CharactersContext.Provider value={{characters, setCharacters, selectedCharacters, setSelectedCharacters}}>
            {children}
        </CharactersContext.Provider>
    )
} 