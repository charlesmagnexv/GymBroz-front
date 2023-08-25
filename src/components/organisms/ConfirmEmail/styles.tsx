import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    circleStyle: {
        '& .css-clc2gn-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
            color: '#61D095'
        },
        '& .css-clc2gn-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
            color: '#61D095'
        }
    },
    formStyle:{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        paddingTop:'36px'
    },
    btnGroupStyle:{
        display: 'flex', 
        flexDirection: 'row', 
        pt: 2, 
        justifyContent: 'space-between', 
        width: '100%',
        marginTop:'36px'
    },
    container: {
        display:'flex',
        width:'400px'
    },
    textError:{
        fontSize:'20px',
        color:'#F94C66',
        marginLeft:'11px'
    },
}));