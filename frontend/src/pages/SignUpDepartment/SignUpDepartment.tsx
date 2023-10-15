import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {signUpQueue} from "../../api";

const SignUpDepartment = () => {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const id = params.id

        signUpQueue("department", parseInt(id || "")).then(ticket => {
            localStorage.setItem('ticket', JSON.stringify(ticket))
            navigate('/qr')
        })
    }, [])

    return (
        <div>
            <h1>Записываем в очередь...</h1>
        </div>
    );
};

export default SignUpDepartment;