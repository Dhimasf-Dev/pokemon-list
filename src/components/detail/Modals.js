import React, {useRef, useContext} from 'react'
import { Contexts } from '../Contex'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,

    '& > :not(style)': { m: 1, width: '50vw' },
};

const styleBtn = {
    //textAlign: 'center',
    left: '30%',
    width: '10vw',
}

function Modals({open, setOpen, status, id, name, image, types, moves}) {
    const {myPokemons} = useContext(Contexts)
    const [myPokemon,setMypokemon] = myPokemons
    const nickRef = useRef()

    const handleClose = () => {
        setOpen(false);
    };

    const onSave = () => {
        let nickname = nickRef.current.value
        let newPokemon = {id, name, nickname, image, types, moves}
        setMypokemon(currentList => [...currentList, newPokemon])
        localStorage.setItem("key", JSON.stringify(newPokemon))
        setOpen(false)
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            {
                status ? 
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h7" component="h4">
                        Selamat anda mendapatkan pokemon
                    </Typography>
                    <TextField id="standard-basic" label="Nickname" variant="standard" inputRef={nickRef} />
                    <Stack  spacing={2} direction="row">
                        <Button sx={styleBtn} variant="outlined" onClick={() => setOpen(false)}>Cancle</Button>
                        <Button sx={styleBtn} variant="contained" onClick={onSave} >Save</Button>
                    </Stack>
                </Box> : 
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h7" component="h4">
                        Anda belum beruntung, Silahkan coba lagi
                    </Typography>
                    <Stack >
                        <Button sx={styleBtn} variant="outlined" onClick={() => setOpen(false)}>Cancle</Button>
                    </Stack>
                </Box>
            }
            </Modal>
        </>
    )
}

export default Modals
