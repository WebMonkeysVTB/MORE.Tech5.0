import React, {FC, useRef, useState} from 'react';
import {Button, Checkbox, Modal} from "antd";
import {HeaderStyled, NavStyled, Title, FiltersStyled, LinkStyled} from "./Nav.styled"
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Filters from "../Filters/Filters";

const Nav = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <HeaderStyled>
            <NavStyled>

                <Title>VTB</Title>
                <Link to={'/'}><LinkStyled>Главная</LinkStyled></Link>
                <Link to={'/map'}><LinkStyled>Карта</LinkStyled></Link>

                <FiltersStyled>
                    {useLocation().pathname === '/map' &&
                        <Button type="primary" onClick={showModal}>
                            Filters
                        </Button>
                    }
                    <Link to={'/auth'}><LinkStyled>Вход</LinkStyled></Link>
                </FiltersStyled>
            </NavStyled>

            <Modal title="Filter departments" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Filters/>
            </Modal>
        </HeaderStyled>
    );
});

export default Nav;
