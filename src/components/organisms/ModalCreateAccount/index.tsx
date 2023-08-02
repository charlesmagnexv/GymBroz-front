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
import FirstStep from "../../molecules/CreateAccount/FirstStep";
import SecondStep from "../../molecules/CreateAccount/SecondStep";
import ThirdStep from "../../molecules/CreateAccount/ThirdStep";
import { postRegister } from "../../../services/register.service";
import TextError from "../../atoms/TextError";

interface CreateAccountProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
}

interface FormCreateAccountDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    // token: string;
}


function getSteps() {
    return [
        'Nome, sobrenome e e-mail',
        'Escolha sua senha',
        'Confirme sua conta',
    ];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep />;
        case 2:
            return <ThirdStep />;
        default:
            return "unknown step";
    }
}

const ModalCreateAccount: React.FC<CreateAccountProps> = ({ open, handleClose, handleOpen }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [err, setErr] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState<string>('')

    const classes = useStyles()
    const { handleBackdrop } = useBackdrop()

    const methods = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
            token: "",
        },
    });

    const steps = getSteps();

    const handleNext = (data: FormCreateAccountDTO) => {
        if (activeStep == steps.length - 2) {
            handleBackdrop(true)
            postRegister({
                email: data.email,
                password: data.password,
                firstName: data.name,
                lastName: data.lastName
            })
                .then(res => {
                    handleBackdrop(false)
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setErr(false)
                })
                .catch(error => {
                    handleBackdrop(false)
                    setErrMessage(error.message)
                    setErr(prevState => !prevState)
                })
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <ModalGeneric open={open} handleClose={handleClose} handleOpen={handleOpen} title="Cadastro">
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
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)} className={classes.formStyle}>
                                    <Grid item sx={{ width: '400px' }}>
                                        {getStepContent(activeStep)}
                                    </Grid>
                                    {err ? <TextError message={errMessage} /> : null}
                                    <Grid className={classes.btnGroupStyle}>
                                        <Button
                                            disabled={activeStep === 0}
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

export default ModalCreateAccount;