import {
    Controller,
    useFormContext,
} from "react-hook-form";
import CustomInput from "../../../atoms/TextField";

const FirstStep: React.FC = () => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <>
            <Controller
                control={control}
                name="name"
                rules={{
                    required: 'Campo obrigatório',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="Nome"
                        type="text"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        onChange={onChange}
                        value={value}
                        error={errors.name} />
                )}
            />

            <Controller
                control={control}
                name="lastName"
                rules={{
                    required: 'Campo obrigatório',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="Sobrenome"
                        type="text"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        value={value}
                        error={errors.lastName}
                        onChange={onChange} />
                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'Campo obrigatório',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="E-mail"
                        type="email"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        value={value}
                        error={errors.email}
                        onChange={onChange} />
                )}
            />
        </>
    );
};

export default FirstStep;