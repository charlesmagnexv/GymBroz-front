import {
    Controller,
    useFormContext,
} from "react-hook-form";
import CustomInput from "../../../atoms/TextField";

const SecondStep = () => {
    const { watch, control, formState: { errors } } = useFormContext();

    const confirmPassword = (value: string) => {
        if (value !== watch('password')) {
            return 'As senhas não são iguais'
        }
        return true
    }
    return (
        <>
            <Controller
                control={control}
                name="password"
                rules={{
                    required: 'Campo obrigatório',
                    minLength: {
                        value: 8,
                        message: "Senha deve ter no mínimo 8 caracteres"
                    },
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_\-])[a-zA-Z\d@#$%^&!*_\-]{8,}$/,
                        message: "Senha deve conter pelo menos uma letra, um número e um caractere especial"
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="Senha"
                        type="password"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        onChange={onChange}
                        value={value}
                        error={errors.password} />
                )}
            />

            <Controller
                control={control}
                name="repeatPassword"
                rules={{
                    required: 'Campo obrigatório',
                    minLength: {
                        value: 8,
                        message: "Senha deve ter no mínimo 8 caracteres"
                    },
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_\-])[a-zA-Z\d@#$%^&!*_\-]{8,}$/,
                        message: "Senha deve conter pelo menos uma letra, um número e um caractere especial"
                    },
                    validate: confirmPassword
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="Repita sua senha"
                        type="password"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        onChange={onChange}
                        value={value}
                        error={errors.repeatPassword} />
                )}
            />
        </>
    );
};

export default SecondStep;