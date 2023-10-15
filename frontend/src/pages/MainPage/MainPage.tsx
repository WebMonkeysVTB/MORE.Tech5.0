import React from 'react';
import {MainPageStyled, IntroStyled, ServiceStyled, TeamStyled, WindowStyled} from "./MainPage.styled";
import Button from "../../ui/Button/Button";
import {useNavigate} from "react-router-dom";

const Intro = () => {
    return (
        <IntroStyled>
            <h1 className={'monkeys'}>Web Monkeys</h1>
            <img className={'tree'} src={require('../../images/tree.png')}/>
            <img className={'puzzle'} src={require('../../images/puzzle1.png')}/>
            <h1 className={'hack'}>On VTB More.Tech 5.0</h1>
        </IntroStyled>
    )
}

const Service = () => {
    const navigate = useNavigate()

    return (
        <ServiceStyled>
            <img src={require('../../images/puzzle2.png')}/>
            <h1>
                Сервис для подбора отделения
            </h1>
            <Button onClick={() => {navigate('/map')}}>К картам!</Button>
        </ServiceStyled>
    )
}

const Team = () => {

    return (
        <TeamStyled>
            <img src={require('../../images/vladimir.jpg')}/>
            <img src={require('../../images/gosha.png')}/>
            <img src={require('../../images/gregory.jpg')}/>
            <img src={require('../../images/anton.jpg')}/>
            <img src={require('../../images/deni.jpeg')}/>
        </TeamStyled>
    )
}

const Window = () => {
    return (
        <WindowStyled/>
    )
}

const MainPage = () => {
    return (
        <MainPageStyled>
            <Team/>
            <Intro/>
            <Window/>
            <Service/>
        </MainPageStyled>
    );
};

export default MainPage;