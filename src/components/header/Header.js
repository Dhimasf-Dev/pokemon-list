import React from 'react'
import { useHistory } from "react-router-dom";
import './Header.css'

const Header = () => {
    const history = useHistory()

    return (
        <div className="headerContainer">
            <h2 onClick={() => history.push("/")}>TokoPokemon</h2>
            {/* <button onClick={() => history.push("/myPokemon")}>My Pokemon</button> */}
        </div>
    )
}

export default Header
