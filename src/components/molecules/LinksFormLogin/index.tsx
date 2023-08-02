import { Link } from "@mui/material";
import { useState } from "react";
import ModalForgetPassword from "../../organisms/ModalForgetPassword";
import ModalCreateAccount from "../../organisms/ModalCreateAccount";

const LinksFormLogin: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [openCreateAccount, setOpenCreateAccount] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenCreateAccount = () => setOpenCreateAccount(true);
    const handleCloseCreateAccount = () => setOpenCreateAccount(false);

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
            >
                Confirme seu e-mail aqui!
            </Link>
            <ModalForgetPassword open={open} handleClose={handleClose} handleOpen={handleOpen} />
            <ModalCreateAccount open={openCreateAccount} handleClose={handleCloseCreateAccount} handleOpen={handleOpenCreateAccount} />
        </>
    );
}

export default LinksFormLogin;