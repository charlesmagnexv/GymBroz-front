import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

export const useStyles = makeStyles(() => ({
    btnLogin: {
        backgroundColor: theme.palette.success.light + " !important",
        width: '400px !important',
        heigth: '42px !important',
        borderRadius: '10px !important',
        // border: '1.8px solid #07142B !important',
        '&:hover': {
            backgroundColor: theme.palette.success.main + " !important",
        },
        fontFamily: 'Crimson Text !important',
        fontSize: '26px !important',
        // fontStyle: 'normal !important',
        // lineHeight: 'normal !important',
        padding: '3px !important',
        color: '#07142B !important'
    }
}));
