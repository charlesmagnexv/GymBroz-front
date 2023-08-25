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
import { confirmEmail, postRegister } from "../../../services/register.service";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
    token: string;
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

const CreateAccount: React.FC<CreateAccountProps> = ({ open, handleClose, handleOpen }) => {
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
        if (activeStep === steps.length - 2) {
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
                    setErrMessage(error.response.data.message)
                    setErr(true)
                })
        } else if (activeStep === steps.length - 1) {
            handleBackdrop(true)
            confirmEmail(data.token)
                .then(res => {
                    handleBackdrop(false)
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setErr(false)
                })
                .catch(err => {
                    handleBackdrop(false)
                    setErrMessage(err.message)
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
                                Conta cadastrada com sucesso, faça login agora mesmo!
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
                                            <WarningAmberIcon sx={{ fontSize: '20px', color: '#EF233C' }} />
                                            <p className={classes.textError}>{errMessage ? errMessage : 'Erro ao realizar ação'}</p>
                                        </Box>
                                    ) : null}
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

export default CreateAccount;