import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        width: '400px',
    },
    titleLogin: {
        color: '#07142B',
        fontFamily: 'Montserrat',
        fontSize: '42px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        marginBottom: '45px'
    }
}));