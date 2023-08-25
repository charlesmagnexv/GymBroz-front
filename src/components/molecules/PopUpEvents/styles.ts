import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    popup: {
        // minWidth: "140px",
        // borderRadius: '5px',
        // border: '2.5px solid #000',
        // background: '#F9EAE1',
    },
    titlePopup: {
        fontFamily: 'Crimson Text',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        textAlign: "left", 
        color: "primary.main"
    },
    textPopup:{
        fontFamily: 'Crimson Text',
        fontSize: '13px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        textAlign: "left", 
        color: "secondary.main"
    },
    btnDelete: {
        color: '#F00E3D !important'
    },
    btnEdit: {
        color: '#6092FF !important'
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
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '5px',
        boxShadow: '24',
        padding: '80px 20px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
}));