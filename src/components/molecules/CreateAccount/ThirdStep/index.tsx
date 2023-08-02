import {
    Controller,
    useFormContext,
} from "react-hook-form";
import CustomInput from "../../../atoms/TextField";

const ThirdStep = () => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <>
            <Controller
                control={control}
                name="token"
                rules={{
                    required: 'Campo obrigatório',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                        placeholder="Token"
                        type="text"
                        width="400px"
                        heigth="25px"
                        fontSize='18px'
                        onChange={onChange}
                        value={value}
                        error={errors.token} />
                )}
            />
        </>
    );
};

export default ThirdStep;