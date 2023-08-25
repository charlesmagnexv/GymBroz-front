import React, { useEffect, useState } from "react"
import { DialogContentFeed } from "../../hooks/addFeedback"
import { Button, Dialog, DialogContent, Typography } from "@mui/material"
import useStyles from "./styles"
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

interface DialogFeedback {
    message: DialogContentFeed
}

interface FeedbackTypeContent {
    backgroudColor: string;
    icon: any;
}

export type FeedbackType = 'success' | 'error'

const FeedbackDialog: React.FC<DialogFeedback> = (props: DialogFeedback) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const { message } = props

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        if (message.description) {
            handleOpen()
        }
    }, [message])

    const FEEDBACK_BY_TYPE: { [key: string]: FeedbackTypeContent } = {
        error: {
            backgroudColor: '#EF233C',
            icon: <ErrorIcon />
        },
        success: {
            backgroudColor: '#09D17E',
            icon: <DoneIcon />
        }
    }

    const getFeedbackStyle = (type: string): FeedbackTypeContent => {
        return FEEDBACK_BY_TYPE[type]
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            maxWidth="sm"
            classes={{ paper: classes.paperRoot }}
        >
            <DialogContent
                style={{
                    backgroundColor: `${getFeedbackStyle(message?.typeMessage!)?.backgroudColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="subtitle1" color='#F4F2EE' fontSize={20} textAlign={'center'}>
                    {message.description}
                </Typography>
                <Button onClick={handleClose}
                    startIcon={getFeedbackStyle(message?.typeMessage!)?.icon}
                    sx={{
                        fontSize: '15px',
                        padding: '10px 30px',
                        backgroundColor: '#F4F2EE',
                        "&:hover": {
                            backgroundColor: '#F4F2EE',
                        }
                    }}>
                    Ok
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default FeedbackDialog