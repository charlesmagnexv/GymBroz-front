import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    circleStyle: {
        '& .css-rp97s8-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
            color: '#53BF9D'
        },
        '& .css-1hv8oq8-MuiStepLabel-label.Mui-active': {
            color: '#07142B',
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
    }
}));