import { useState } from "react";
import ModalGeneric from "../../atoms/ModalGeneric";
import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import CustomInput from "../../atoms/TextField";
import { useBackdrop } from "../../../hooks/backdrop";
import { forgotPassword, resetPassword } from "../../../services/auth.service";
import { useStyles } from "./styles";
import TextError from "../../atoms/TextError";

interface ForgetPassProps {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
}

const steps = ['Digite seu e-mail', 'Cole o Token enviado no seu e-mail', 'Redefina sua senha',];
const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_\-])[a-zA-Z\d@#$%^&!*_\-]{8,}$/

const ModalForgetPassword: React.FC<ForgetPassProps> = ({ open, handleClose, handleOpen }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [email, setEmail] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [repeatPass, setRepeatPass] = useState<string>('')
    const [erro, setErro] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [actionError, setActionError] = useState<boolean>(false)

    const classes = useStyles()
    const { handleBackdrop } = useBackdrop()

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value)
    }

    const handleChangeRepeatPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(e.target.value)
    }

    const handleErroTrue = () => {
        setErro(true)
    }

    const handleErroFalse = () => {
        setErro(false)
    }

    const handleActionErrorTrue = () => {
        setActionError(true)
    }

    const handleActionErrorFalse = () => {
        setActionError(false)
    }

    const handleSubmitEmail = () => {
        if (email) {
            handleBackdrop(true)
            handleErroFalse()
            forgotPassword(email)
                .then(res => {
                    handleBackdrop(false)
                    handleNext()
                })
                .catch(err => {
                    handleBackdrop(false)
                    handleActionErrorTrue()
                    setMessageError(err.message)
                })
        } else {
            handleErroTrue()
        }
    }


    const handleSetToekn = () => {
        if (token) {
            handleErroFalse()
            handleNext()
        } else {
            handleErroTrue()
        }
    }

    const handleSubmitPass = () => {
        if (pass) {
            if (pass === repeatPass) {
                if (passRegex.test(pass)) {
                    handleBackdrop(true)
                    handleErroFalse()
                    resetPassword(token, pass)
                        .then(res => {
                            handleBackdrop(false)
                            handleNext()
                        })
                        .catch(err => {
                            handleBackdrop(false)
                            handleActionErrorTrue()
                            setMessageError(err.message)
                        })
                } else {
                    handleErroTrue()
                    setMessageError("*A senha deve conter no mínimo oito caracteres, um caractere especial, uma letra e um número")
                }
            } else {
                handleErroTrue()
                setMessageError("*As senhas são diferentes")
            }
        } else {
            handleErroTrue()
            setMessageError("*Campo obrigatório")
        }
    }

    // const validationPass = () => {
    //     if (pass === repeatPass) {
    //         if (passRegex.test(pass)) {

    //         } else {
    //             handleErroTrue()
    //             setMessageError("*A senha deve conter no mínimo oito caracteres, um caractere especial, uma letra e um número")
    //         }
    //     } else {
    //         handleErroTrue()
    //         setMessageError("*As senhas são diferentes")
    //     }
    // }

    return (
        <>
            <ModalGeneric open={open} handleClose={handleClose} handleOpen={handleOpen} title="Recuperar Senha">
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel className={classes.circleStyle}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
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
                            <Grid container justifyContent='center' sx={{ paddingTop: '36px' }}>
                                {
                                    activeStep === 0 ? (
                                        <>
                                            <CustomInput
                                                placeholder="E-mail"
                                                type="email"
                                                width="400px"
                                                heigth="25px"
                                                fontSize='18px'
                                                value={email}
                                                onChange={handleChangeEmail}
                                                customErro={erro} />
                                            <Grid container justifyContent='flex-start' sx={{ width: '400px' }}>
                                                {erro && <span style={{ color: "#F94C66", display: 'inline-block', }}>*Campo obrigatório</span>}
                                                {actionError && <TextError message={messageError} />}
                                            </Grid>
                                        </>
                                    )
                                        : (activeStep === 1 ? (
                                            <>
                                                <CustomInput
                                                    placeholder="Token"
                                                    type="text"
                                                    width="400px"
                                                    heigth="25px"
                                                    fontSize='18px'
                                                    value={token}
                                                    onChange={handleChangeToken}
                                                    customErro={erro}
                                                />
                                                <Grid container justifyContent='flex-start' sx={{ width: '400px' }}>
                                                    {erro && <span style={{ color: "#F94C66", display: 'inline-block', }}>*Campo obrigatório</span>}
                                                </Grid>
                                            </>

                                        ) : (
                                            <>
                                                <CustomInput
                                                    placeholder="Senha"
                                                    type="password"
                                                    width="400px"
                                                    heigth="25px"
                                                    fontSize='18px'
                                                    value={pass}
                                                    onChange={handleChangePass}
                                                    customErro={erro}
                                                />
                                                <Grid container justifyContent='flex-start' sx={{ width: '400px' }}>
                                                    {erro && <span style={{ color: "#F94C66", display: 'inline-block', }}>{messageError}</span>}
                                                </Grid>
                                                <CustomInput
                                                    placeholder="Repetir senha"
                                                    type="password"
                                                    width="400px"
                                                    heigth="25px"
                                                    fontSize='18px'
                                                    value={repeatPass}
                                                    onChange={handleChangeRepeatPass}
                                                    customErro={erro}
                                                />
                                                <Grid container justifyContent='flex-start' sx={{ width: '400px' }}>
                                                    {erro && <span style={{ color: "#F94C66", display: 'inline-block', }}>{messageError}</span>}
                                                    {actionError && <TextError message={messageError} />}
                                                </Grid>
                                            </>
                                        ))
                                }
                            </Grid>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button
                                    onClick={() => {
                                        if (activeStep === 0) {
                                            handleSubmitEmail()
                                        } else if (activeStep === 1) {
                                            handleSetToekn()
                                        } else {
                                            handleSubmitPass()
                                        }
                                    }}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </ModalGeneric>
        </>
    );
}

export default ModalForgetPassword;