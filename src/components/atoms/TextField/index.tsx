import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form/dist/types";
import { useStyles } from "./style";

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    width: string;
    fontSize?: string;
    heigth?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    customErro?: boolean;
    value?: string | number;
}

const CustomInput: React.FC<InputProps> = ({ value, onChange, placeholder, type, width, fontSize, heigth, error, customErro }) => {
    const classes = useStyles()

    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classes.inputStyle}
                style={(error || customErro)
                    ?
                    { marginBottom: '0px', width: width, fontSize: fontSize, borderColor: '#F94C66', height: heigth }
                    :
                    { marginBottom: '20px', width: width, fontSize: fontSize, height: heigth }}
            />
            {error &&
                <span style={{ color: "#F94C66", display: 'inline-block', alignSelf:'flex-start' }}>*{`${error.message}`}</span>
            }
        </>
    );
}

export default CustomInput;