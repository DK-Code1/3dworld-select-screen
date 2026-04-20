import { createContext, useEffect, useState } from "react";

export const CharactersContext = createContext(null)

export function CharactersContextProvider({children}){

    const [characters, setCharacters] = useState(null)
    const [selectedCharacters, setSelectedCharacters] = useState([0,1,2,3]) // Character on slot
    const [isSelected, setIsSelected] = useState([null,null,null,null]) // Slot selected a character, 0 false, 1 true
    //first value is null, so it doesn't trigger the selected animation on start


    useEffect(() => { // Fetch data first
        const fetchData = async () => {
            const file = await fetch(`character_list.json`)
            const data = await file.json();
            setCharacters(data)

        };

        fetchData();

    }, [])

    return(
        <CharactersContext.Provider value={{characters, setCharacters, selectedCharacters, setSelectedCharacters, isSelected, setIsSelected}}>
            {children}
        </CharactersContext.Provider>
    )
} 