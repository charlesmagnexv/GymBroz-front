import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

export const useStyles = makeStyles(() => ({
    btnLogin: {
        backgroundColor: theme.palette.success.light + " !important",
        width: '400px !important',
        heigth: '42px !important',
        borderRadius: '10px !important',
        '&:hover': {
            backgroundColor: theme.palette.success.main + " !important",
        },
        fontFamily: 'Montserrat',
        fontSize: '26px !important',
        textTransform: 'none',
        padding: '3px !important',
        color: '#07142B !important'
    }
}));
