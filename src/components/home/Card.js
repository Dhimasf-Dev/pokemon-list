/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { gql, useQuery } from '@apollo/client'
import { Contexts } from '../Contex'

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

const GET_POKEMON_TYPE = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
        id
        name
        moves {
            move {
                name
            }
        }
        types {
            type {
                name
            }
        }
    }
  }
`;

const Card = ({number, image, name}) => {
    const history = useHistory()
    const {myPokemons} = useContext(Contexts)
    const [myPokemon] = myPokemons

    const { loading, error, data } = useQuery(GET_POKEMON_TYPE, {
        variables: {name: name}
    });

    if (loading) return '';
    if (error) return `Error! ${error.message}`;
    return (
        <div css={cardContainer(data.pokemon.types[0].type.name)} onClick={() => history.push({
                pathname: "/detail",
                state: {
                    id: data.pokemon.id,
                    name: name,
                    image: image,
                    types:data.pokemon.types[0].type.name,
                    moves: data.pokemon.moves
                }
            })}>
            <div className="cardNumber">
                <small>#{number}</small>
            </div>
            <img src={image} alt={name} />
            <div className="detailWarper">
                <h3>{name}</h3>
                <small>Type: {data.pokemon.types[0].type.name}</small>
            </div>
            <div className="cardNumber">
                <small>Owned : 
                    {
                        myPokemon.filter(own => own.id === data.pokemon.id).length
                    }
                </small>
            </div>
        </div>
    )
}

export default Card
