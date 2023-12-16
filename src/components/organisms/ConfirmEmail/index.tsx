import { useState } from "react";
import ModalGeneric from "../../atoms/ModalGeneric";
import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { useBackdrop } from "../../../hooks/backdrop";
import { useStyles } from "./styles";
import {
    useForm,
    FormProvider,
} from "react-hook-form";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FirstStep from "../../molecules/ConfirmEmail/FirstStep";
import { confirmEmail } from "../../../services/register.service";

interface ConfirmEmailProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
}

interface FormConfirmEmailDTO {
    token: string;
}

function getSteps() {
    return [
        'Confirme sua conta',
    ];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <FirstStep />;
        default:
            return "unknown step";
    }
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ open, handleClose, handleOpen }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [err, setErr] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState<string>('')

    const classes = useStyles()
    const { handleBackdrop } = useBackdrop()

    const methods = useForm({
        defaultValues: {
            token: "",
        },
    });

    const steps = getSteps();

    const handleNext = (data: FormConfirmEmailDTO) => {
        if (activeStep === steps.length - 1) {
            handleBackdrop(true)
            confirmEmail(data.token)
                .then(res => {
                    handleBackdrop(false)
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setErr(false)
                })
                .catch(err => {
                    handleBackdrop(false)
                    setErrMessage(err.response.data.message)
                    setErr(true)
                })
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        methods.setValue('token', '')
        setActiveStep(0);
    };

    return (
        <>
            <ModalGeneric open={open} handleClose={() => { handleReset(); handleClose() }} handleOpen={handleOpen} title="Confirmar e-mail">
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel className={classes.circleStyle}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                E-mail confirmado com sucesso!
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reiniciar</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)} className={classes.formStyle}>
                                    <Grid item sx={{ width: '400px' }}>
                                        {getStepContent(activeStep)}
                                    </Grid>
                                    {err ? (
                                        <Box className={classes.container}>
                                            <WarningAmberIcon sx={{ fontSize: '20px', color: '#F94C66' }} />
                                            <p className={classes.textError}>{errMessage ? errMessage : 'Erro ao realizar ação'}</p>
                                        </Box>
                                    ) : null}
                                    <Grid className={classes.btnGroupStyle}>
                                        <Button
                                            disabled={activeStep === 0 || activeStep === steps.length - 1}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Voltar
                                        </Button>
                                        <Button
                                            type="submit"
                                        >
                                            {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                                        </Button>
                                    </Grid>
                                </form>
                            </FormProvider>
                        </React.Fragment>
                    )}
                </Box>
            </ModalGeneric>
        </>
    );
}

export default ConfirmEmail;