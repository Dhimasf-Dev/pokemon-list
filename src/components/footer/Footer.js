import React, { useContext } from 'react'
import { Contexts } from '../Contex'
import Badge from '@mui/material/Badge';
import { useHistory } from "react-router-dom";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import './Footer.css'

function Footer() {
    const history = useHistory()
    const {myPokemons} = useContext(Contexts)
    const [myPokemon] = myPokemons

    return (
        <div className="footerContainer" onClick={() => history.push("/myPokemon")}>
            <div className="buttonMyPokemon">
                <Badge badgeContent={myPokemon.length} color="primary">
                    <CatchingPokemonIcon />
                </Badge>
                &nbsp; My Pokemon 
            </div>
        </div>
    )
}

export default Footer
