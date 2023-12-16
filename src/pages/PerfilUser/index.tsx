import { Avatar, Box, Button, Grid } from "@mui/material";
import { useUserAuth } from "../../hooks/userProvider";
import  useStyles from "./style";
import ImageListUser from "../../components/ImageListUser";
import UserPerfilForm from "../../components/UserPerfilForm";
import UserFriendList from "../../components/UserFriendList";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const PerfilUser: React.FC = () => {
    
    const { user } = useUserAuth();
    const classes = useStyles();
    let perfilImage = "";

    if (user.profilePictureUrl == undefined) {
        perfilImage = "https://s.glbimg.com/po/tt/f/original/2013/09/18/facebookperfil.jpg";
    } else {
        perfilImage = user.profilePictureUrl;
    }
    
    
    return (
        <div className='div-main-perfil' style={{padding: 20, backgroundColor: '#d4d4d4'}}>
            <div style={{padding: 8, backgroundColor: '#ffff', borderRadius: 15}}>
                <Box style={{padding: 5}}>
                    <p className={classes.pageTitle}>Perfil</p>
                    <Grid container gap={3}>
                        <Grid item sx={{border:'1px solid black', borderRadius: 8, borderWidth: 5}}>
                            <Avatar
                                alt="Imagem de Perfil"
                                src={perfilImage}
                                sx={{ 
                                    width: 300, 
                                    height: 300,
                                    borderRadius: 6,
                                }}
                            />
                        </Grid>
                        <Grid item sx={{border:'1px solid black', borderWidth: 5}}>
                            <ImageListUser />
                        </Grid>
                    </Grid>
                    <Grid container style={{paddingTop: 10}}>
                        <Grid item md={3} style={{paddingLeft: 30}}>
                            <Button style={{backgroundColor: '#09D17E'}} variant="contained" 
                                startIcon={<EditIcon fontSize="medium" />}
                            >
                                Editar Imagem de Perfil
                            </Button>
                        </Grid>
                        <Grid item md={6}>                         
                        </Grid>
                        <Grid item md={3} style={{paddingLeft: 85}}>
                            <Button style={{backgroundColor: '#09D17E'}} variant="contained" startIcon={<AddPhotoAlternateIcon fontSize="medium" />}>
                                Adicionar Imagem à Lista
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{paddingTop: 40, paddingLeft: 20}}>
                        <Grid item md={6}>
                            <UserPerfilForm />
                        </Grid>
                        <Grid item md={0.8}>

                        </Grid>
                        <Grid item md={5}>
                            <UserFriendList />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
export default PerfilUser;