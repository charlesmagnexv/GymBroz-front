import React, { useState } from "react";
import {
    TextField,
    Box,
    Grid,
    Button,
} from '@mui/material';
import { useStyles } from './styles';
import { useUserAuth } from "../../hooks/userProvider";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import EditOffIcon from '@mui/icons-material/EditOff';

const UserPerfilForm: React.FC = () => {
    const [isShown, setIsShown] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const { user } = useUserAuth();
    const classes = useStyles();

    const handleShow = () => {
        setIsShown(true);
        setIsDisabled(true);
    }

    const closeShow = () => {
        setIsShown(false);
        setIsDisabled(false);
    }

    return (
        <>
            <Box style={{padding: 20}} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Grid container gap={5} direction={"row"}>
                    <Grid item>
                        <Box 
                        sx={{
                            width: 320,
                            maxWidth: '100%',
                            paddingBottom: 3
                        }}
                    >
                        <p className={classes.titleTextField} style={{paddingBottom: 5}}>Nome</p>
                        <TextField
                            id="standard-basic"
                            style={{
                                color: '#171717',
                                borderColor: '#171717',
                                borderWidth: 10
                            }}
                            disabled
                            fullWidth
                            defaultValue={user.firstName}
                        />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box 
                        sx={{
                            width: 320,
                            maxWidth: '100%',
                            paddingBottom: 3
                        }}
                    >
                        <p className={classes.titleTextField} style={{paddingBottom: 5}}>Sobrenome</p>
                        <TextField
                            id="standard-basic"
                            style={{
                                color: '#171717',
                                borderColor: '#171717',
                                borderWidth: 10
                            }}
                            disabled
                            fullWidth
                            defaultValue={user.lastName}
                        />
                        </Box>
                    </Grid>
                </Grid>
                
                <Box 
                    sx={{
                        width: 680,
                        maxWidth: '100%',
                        paddingBottom: 3
                    }}
                >
                    <p className={classes.titleTextField} style={{paddingBottom: 5}}>E-mail</p>
                    <TextField
                        id="standard-basic"
                        style={{
                            color: '#171717',
                            borderColor: '#171717',
                            borderWidth: 10
                        }}
                        disabled
                        fullWidth
                        defaultValue={user.email}
                    />
                </Box>

                <Box 
                    sx={{
                        width: 680,
                        maxWidth: '100%',
                        paddingBottom: 3
                    }}
                >
                    <p className={classes.titleTextField} style={{paddingBottom: 5}}>URL-Imagem Perfil</p>
                    <TextField
                        id="standard-basic"
                        style={{
                            color: '#171717',
                            borderColor: '#171717',
                            borderWidth: 10
                        }}
                        disabled
                        fullWidth
                        defaultValue={user.profilePictureUrl}
                    />
                </Box>
                
                <Box 
                    sx={{
                        width: 680,
                        maxWidth: '100%',
                        paddingBottom: 3
                    }}
                >
                    <p className={classes.titleTextField} style={{paddingBottom: 5}}>Path-Imagem Perfil</p>
                    <TextField
                        id="standard-basic"
                        style={{
                            color: '#171717',
                            borderColor: '#171717',
                            borderWidth: 10
                        }}
                        disabled
                        fullWidth
                        defaultValue={user.profilePicturePath}
                    />
                </Box>

                <Box 
                    sx={{
                        width: 680,
                        maxWidth: '100%',
                        paddingBottom: 3
                    }}
                >
                    <p className={classes.titleTextField} style={{paddingBottom: 5}}>Endereço</p>
                    <TextField
                        id="standard-basic"
                        style={{
                            color: '#171717',
                            borderColor: '#171717',
                            borderWidth: 10
                        }}
                        disabled
                        fullWidth
                        defaultValue={user.email}
                    />
                </Box>

                <Box 
                    sx={{
                        width: 680,
                        maxWidth: '100%',
                    }}
                >
                    <p className={classes.titleTextField} style={{paddingBottom: 5}}>Fale sobre você...</p>
                    <TextField
                        id="outlined-multiline-static"
                        style={{
                            color: '#171717',
                            borderColor: '#171717',
                            borderWidth: 15,
                        }}
                        multiline
                        disabled
                        fullWidth
                        rows={10}
                        defaultValue="Descrição do Usuário feita por ele mesmo, falando do que gosta, do que faz e outras curiosidades sobre ele que acredita que outros usuários gostariam de saber."
                    />
                </Box>

                <Grid container gap={5} direction={"row"} paddingTop={5} paddingLeft={3}>
                    <Grid item>
                        <Button 
                            style={{backgroundColor: '#09D17E'}} 
                            variant="contained" 
                            startIcon={<EditNoteIcon fontSize="medium" />}
                            disabled={isDisabled}
                            onClick={handleShow}
                        >
                            Editar Dados
                        </Button>
                    </Grid>
                    <Grid item md={1}></Grid>
                    {isShown && (
                        <Grid item paddingLeft={3}>
                            <Button 
                                style={{backgroundColor: '#EF233C'}} 
                                variant="contained" 
                                startIcon={<EditOffIcon fontSize="medium" />}
                                onClick={closeShow}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    )}
                    {isShown && (
                        <Grid item paddingLeft={3}>
                            <Button 
                                style={{backgroundColor: '#61D095'}} 
                                variant="contained" 
                                startIcon={<SpellcheckIcon fontSize="medium" />}
                            >
                                Concluir
                            </Button>
                        </Grid>
                    )}
                    
                </Grid>
                        
            </Box>
        </>
    )

}

export default UserPerfilForm