import { Link } from "@mui/material";
import { useState } from "react";
import ForgetPassword from "../../organisms/ForgetPassword";
import CreateAccount from "../../organisms/CreateAccount";
import ConfirmEmail from "../../organisms/ConfirmEmail";

const LinksFormLogin: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [openCreateAccount, setOpenCreateAccount] = useState(false);
    const [openConfirmEmail, setOpenConfirmEmail] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenCreateAccount = () => setOpenCreateAccount(true);
    const handleCloseCreateAccount = () => setOpenCreateAccount(false);

    const handleOpenConfirmEmail = () => setOpenConfirmEmail(true);
    const handleCloseConfirmEmail = () => setOpenConfirmEmail(false);

    return (
        <>
            <Link
                sx={{
                    fontSize: '18px',
                    color: '#07142B',
                    marginBottom: '18px',
                    cursor: 'pointer'
                }}
                onClick={handleOpen}
            >
                Esqueceu sua Senha?
            </Link>

            <p
                style={{
                    color: 'rgba(7, 20, 43,0.75)',
                    fontSize: '18px',
                    marginBottom: '18px',
                }}
            >
                Não tem uma conta?{' '}
                <Link
                    sx={{
                        color: '#07142B',
                        cursor: 'pointer'
                    }}
                    onClick={handleOpenCreateAccount}
                >
                    Cadastre-se
                </Link>
            </p>

            <Link
                sx={{
                    fontSize: '18px',
                    color: '#07142B',
                    cursor: 'pointer'
                }}
                onClick={handleOpenConfirmEmail}
            >
                Confirme seu e-mail aqui!
            </Link>
            <ForgetPassword open={open} handleClose={handleClose} handleOpen={handleOpen} />
            <CreateAccount open={openCreateAccount} handleClose={handleCloseCreateAccount} handleOpen={handleOpenCreateAccount} />
            <ConfirmEmail open={openConfirmEmail} handleClose={handleCloseConfirmEmail} handleOpen={handleOpenConfirmEmail} />
        </>
    );
}

export default LinksFormLogin;