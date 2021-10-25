/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react'
import Modals from './Modals';
import './Detail.css'
import Button from '@mui/material/Button';
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded';

const typeDetail = (type) => css({
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
    padding: '0.3rem 0',
    margin: '0.5rem 43% 0 43%',
    border: '1px solid #efefef',
    borderRadius: '0.5rem'
})

function Detail(props) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false)


    const handleCatch = () => {
        if (Math.random() < 0.5){
            setOpen(true);
            setStatus(true)

        } else {
            setOpen(true);
            setStatus(false)
        }
    }
    
    return (
        <>
            <div className="detail-container">
                <div className="header-detail">
                    <img src={props.location.state.image} alt={props.location.state.name}/>
                    <div className="nickname-font">{props.location.state.nickname}</div>
                    <div>{props.location.state.name}</div>
                    <div css={typeDetail(props.location.state.types)}>{props.location.state.types}</div>
                    <Button onClick={handleCatch}>
                        <CatchingPokemonRoundedIcon />&nbsp;
                        CATCH EM !
                    </Button>  
                </div>
                <div className="border">MOVES : </div>
                <div className="moves-detail">
                    {
                        props.location.state.moves.map((move, index) => {
                            return (
                                <div className="submove-detail" key={index}>{move.move.name}</div>
                            )
                        })
                    }      
                </div>
            </div>       
            <Modals 
                open={open}
                setOpen={setOpen}
                status={status}
                id={props.location.state.id}
                name={props.location.state.name}
                image={props.location.state.image}
                types={props.location.state.types}
                moves={props.location.state.moves}
            />
        </>
    )
}

export default Detail
