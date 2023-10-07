import React from 'react';
import {MainPageStyled, IntroStyled, ServiceStyled, TeamStyled, WindowStyled} from "./MainPage.styled";

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

    return (
        <ServiceStyled>
            <h1>
                Сервис для подбора отделения
            </h1>
            <div>
                <h3>zxzxc</h3>
                <h3>zxzxc</h3>
                <h3>zxzxc</h3>
                <h3>zxzxc</h3>
            </div>
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