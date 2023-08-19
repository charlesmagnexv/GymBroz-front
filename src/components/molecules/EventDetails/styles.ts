import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    titleEvent: {
        fontFamily: 'Crimson Text !important',
        fontSize: '42px !important',
        fontWeight: '700 !important',
        lineHeight: 'normal',
        textAlign: 'center',
        color: "primary.main"
    },
    textAddress: {
        textAlign: 'center',
        fontFamily: 'Crimson Text',
        fontSize: '22px !important',
        fontWeight: '400 !important',
        lineHeight: 'normal',
        color: "secondary.main"
    },
    textDate: {
        color: 'primary.main',
        textAlign: 'center',
        fontFamily: 'Crimson Text',
        fontSize: '18px !important',
        fontWeight: '500 !important',
        lineHeight: 'normal',
    },
    textDescription: {
        textAlign: 'center',
        fontFamily: 'Crimson Text',
        fontSize: '20px !important',
        fontWeight: '400 !important',
        lineHeight: 'normal',
        color: "secondary.main"
    },

    btnDelete: {
        color: '#F00E3D !important'
    },
    btnEdit: {
        color: '#67AAF9 !important'
    },
    btnEnter: {
        color: '#53BF9D !important'
    },
    btnDialogDelete: {
        width: '130px !important',
        padding: '5px 15px !important',
        fontSize: '12px !important',
        backgroundColor: '#F00E3D !important',
        color: 'white !important',
        marginLeft: '1.0rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            backgroundColor: '#F00E3D !important'
        }
    },
    btnDialogCancel: {
        width: '130px !important',
        padding: '5px 15px !important',
        fontSize: '12px !important',
        // backgroundColor: '#6A19E3 !important',
        borderColor: '#F00E3D !important',
        color: '#F00E3D !important',
        // marginLeft: '1.5rem !important',
        marginTop: '1.1rem !important',
        '&:hover': {
            // backgroundColor: '#6A19E3 !important'
        }
    },
}));