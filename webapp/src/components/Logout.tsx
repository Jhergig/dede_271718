import { useEffect } from 'react';

function Logout(props: any): JSX.Element {

    const cerrarSesion = () => {
        props.nombre('');
        document.location.href = "/";
    };

    useEffect(() => {
        cerrarSesion();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <></>
    )
}

export default Logout;