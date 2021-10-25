/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Contexts } from '../Contex';
import './MyPokemon.css'
import CatchingPokemonSharpIcon from '@mui/icons-material/CatchingPokemonSharp';

const cardContainer = (type) => css({

    background : type === "rock" ? 'rgb(148, 81, 81)' 
               : type === "ghost" ? 'rgb(247, 247, 247)'
               : type === "electric" ? 'rgb(255, 255, 161)'
               : type === "bug" ? '#F6D6A7'
               : type === "poison" ? '#e0a7f6'
               : type === "normal" ? '#F4F4F4'
               : type === "fairy" ? 'rgba(255, 192, 203, 0.863)'
               : type === "fire" ? '#FBE3DF'
               : type === "grass" ? '#E2F9E1'
               : type === "water" ? '#E0F1FD'
               : '',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifContent: 'center',
    padding: '1.5rem 0',
    margin: '0.5rem',
    border: '1px solid #efefef',
    borderRadius: '0.2rem',
    minWidth: '160px',
    textAlign: 'center',
    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',

    img : {
            width: '120px',
            height: '120px'
    },

    h3 : {
        marginbottom: '0.2rem'
    },

    small : {
        textTransform: 'capitalize'
    }
})


function MyPokemon() {
    const {myPokemons} = useContext(Contexts)
    const [myPokemon, setMyPokemon] = myPokemons
    const history = useHistory();



    const onRelease = (nickname) => {
        let data = myPokemon.filter(del => del.nickname !== nickname)
        setMyPokemon(data)
        localStorage.clear()
    }

    useEffect(() => {
        if (myPokemon.length === 0 && localStorage.getItem("key") !== null){
            let datum = JSON.parse(localStorage.getItem("key"))
            setMyPokemon(current => [...current, datum])
        }
    }, [])

    return (
        <div className="homeContainer" >
            {
                myPokemon.length !== 0 ? 
                <>
                    <div className="allContainer">
                        {
                            myPokemon.map((myPoke, index) => {
                                return (
                                    <div key={index}>
                                        <div css={cardContainer(myPoke.types)} onClick={() => history.push({pathname: "/detail" , state: myPoke})}>
                                            <div className="cardNumber">
                                                <small>#{index+1}</small>
                                            </div>
                                            <div>{myPoke.nickname}</div>
                                            <img src={myPoke.image} alt={myPoke.name} />
                                            <div className="detailWarper">
                                                <h3>{myPoke.name}</h3>
                                                <small>Type: {myPoke.name}</small>
                                            </div>
                                        </div>
                                        <button onClick={() => onRelease(myPoke.nickname)}>Release</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>:
                <div className="blankPage">
                    <CatchingPokemonSharpIcon fontSize="large"/>
                    <div>NO POKEMON</div>
                </div>
            }
        </div>
    )
}

export default MyPokemon
