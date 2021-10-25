import { createContext, useState } from 'react';
export const Contexts = createContext();

const ContexProvider = (props) => {
    const [myPokemon, setMypokemon] = useState([])
    const [allPokemon, setAllPokemon] = useState([])
    const [filterPokemon, setFilterPokemon] = useState([])
     //const [loadMore, setLoadMore] = useState("")
    //const [isLoading, setIsLoading] = use

    return (
        <Contexts.Provider value={{
            myPokemons: [myPokemon, setMypokemon], 
            allPokemons: [allPokemon, setAllPokemon], 
            filterPokemons: [filterPokemon, setFilterPokemon]
        }}>
            {props.children}  
        </Contexts.Provider>
    )
}



export default ContexProvider