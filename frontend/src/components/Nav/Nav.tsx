import React, {FC, useRef, useState} from 'react';
import {Button, Checkbox, Modal} from "antd";
import {HeaderStyled, NavStyled, Title, Filters, LinkStyled} from "./Nav.styled"
import filtersStore from '../../store/FiltersStore'
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";

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

                <Filters>
                    {useLocation().pathname === '/map' &&
                        <Button type="primary" onClick={showModal}>
                            Filters
                        </Button>
                    }
                    <Link to={'/auth'}><LinkStyled>Вход</LinkStyled></Link>
                </Filters>
            </NavStyled>

            <Modal title="Filter departments" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Checkbox onChange={() => filtersStore.vipOffice = !filtersStore.vipOffice}>VIP office</Checkbox>
                <Checkbox onChange={() => filtersStore.vipZone = !filtersStore.vipZone}>VIP zone</Checkbox>
                <Checkbox onChange={() => filtersStore.ramp = !filtersStore.ramp}>Persons with
                    disabilities</Checkbox>
                <Checkbox onChange={() => filtersStore.Prime = !filtersStore.Prime}>Prime</Checkbox>
                <Checkbox onChange={() => filtersStore.juridical = !filtersStore.juridical}>Juridical
                    person</Checkbox>
                <Checkbox onChange={() => filtersStore.person = !filtersStore.person}>Natural person</Checkbox>
            </Modal>
        </HeaderStyled>
    );
});

export default Nav;
