import { useContext, useEffect, useRef } from 'react'
import Card from './Card'
import { gql, useQuery } from '@apollo/client';
import { Contexts } from '../Contex'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import '../myPokemon/MyPokemon.css'

const inputBtn = {
    marginRight: '1rem',
    width: '100%'
}

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 100,
  offset: 1,
};

const Home = () => {
    const refSearch = useRef(null)
    const {allPokemons, filterPokemons} = useContext(Contexts)
    const [allPokemon, setAllPokemon] = allPokemons
    const [filterPokemon, setFilterPokemon] = filterPokemons

    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
    });

    const getAllPokemons = () => {
          if (allPokemon.length === 0){
            if (loading) return '';
            if (error) return `Error! ${error.message}`;
            if (!error){
                setAllPokemon(data.pokemons.results) 
                setFilterPokemon(data.pokemons.results)
            }
          } else {
              setAllPokemon(filterPokemon)
          }
    };

    const onSearch = () => {
        let dataInput = refSearch.current.value.toLowerCase()

        console.log(dataInput)
        
        if (dataInput){
            let data = filterPokemon.filter(poke => {
                return (
                    poke.name.includes(dataInput) 
                )
            })
            setAllPokemon(data)
        } else {
            console.log("masuk")
            getAllPokemons()
        }
    }

    useEffect(() => {
        getAllPokemons()
    }, [data])

    return (
        <div className="homeContainer">  
            <div className="searchContainer">
                <TextField size="small" sx={inputBtn} id="outlined-search" label="Pokemon Search..." type="search" inputRef={refSearch}/>
                <button className="searchBtn" onClick={onSearch}>
                    <SearchIcon  />
                </button>
            </div>                 
            <div className="allContainer">
                {
                    allPokemon.map((pokemonStats, index) => 
                        <Card 
                            key={index}
                            number={index + 1}
                            image={pokemonStats.image}
                            name={pokemonStats.name}
                        />
                    )
                }     
            </div>           
        </div>
    )
}

export default Home
