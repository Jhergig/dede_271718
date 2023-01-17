import { useEffect, useState } from 'react';
import { Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

function Login(props: any): JSX.Element {

    const [proveedor, setProveedor] = useState("");

    useEffect(() => {
        loginAndFetch()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const seleccionarProveedor = (e: SelectChangeEvent) => {
        setProveedor(e.target.value as string);
    };

    const loginAndFetch = async () => {
        await handleIncomingRedirect();

        if (!getDefaultSession().info.isLoggedIn) {
            await login({
                oidcIssuer: proveedor,
                redirectUrl: window.location.href,
                clientName: "DeDe"
            });
        }
        props.setWebId(getDefaultSession().info.webId)
    }

    return (
        <main>
            <Box
                component="form"
                onSubmit={loginAndFetch}
                noValidate
                sx={{
                    margin: '2em',
                    width: 'min-content'
                }}
            >
                <InputLabel>
                    Selecciona un proveedor
                </InputLabel>
                <Select
                    value={proveedor}
                    onChange={seleccionarProveedor}
                    sx={{ width: '15em' }}
                >
                    <MenuItem value={"https://solidcommunity.net/"}>
                        SOLID community
                    </MenuItem>
                    <MenuItem value={"https://inrupt.net/"}>Inrupt</MenuItem>
                </Select>

                <Button
                    disabled={proveedor === "" || getDefaultSession().info.isLoggedIn}
                    onClick={loginAndFetch}
                    variant="contained"
                >
                    Log in
                </Button>
            </Box>
        </main>
    );
}

export default Login;