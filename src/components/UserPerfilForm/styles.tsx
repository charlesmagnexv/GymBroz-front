import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    titleTextField: {
        color: '#07142B',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal !important',
        fontSize: '20px',
        "&:hover": {
            cursor: 'pointer'
        }
    }
}));