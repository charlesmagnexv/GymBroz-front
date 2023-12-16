import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    titleHeader: {
        color: 'rgba(255, 255, 255, 0.90)',
        fontFamily: 'Montserrat !important',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal !important',
        fontSize: '30px',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    headerWelcomeMessage: {
        color: 'rgba(255, 255, 255, 0.90)',
        fontFamily: 'Montserrat !important',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal !important',
        fontSize: '19px',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    headerWelcome: {
        color: 'rgba(255, 255, 255, 0.90)',
        fontFamily: 'Montserrat !important',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal !important',
        fontSize: '28px',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    headerUserName: {
        color: '#10b981',
        fontFamily: 'Montserrat !important',
        fontStyle: 'italic',
        fontWeight: 700,
        lineHeight: 'normal !important',
        fontSize: '22px',
        "&:hover": {
            cursor: 'pointer'
        }
    }
}));