import React, {useEffect} from 'react';
import {QrPageStyled} from "./QrPage.styled";

const QRCode = require('qrcode')


const QrPage = () => {

    useEffect(() => {
        const canvas = document.getElementById('canvas')
        const host = 'http://localhost:1234'

        QRCode.toCanvas(canvas, `/qr/delete/` + localStorage.getItem('ticket'), function (error: string) {
            if (error) console.error(error)
            console.log('success!');
        })
    }, [])

    return (
        <QrPageStyled>
            <canvas id="canvas"></canvas>
        </QrPageStyled>
    );
};

export default QrPage;