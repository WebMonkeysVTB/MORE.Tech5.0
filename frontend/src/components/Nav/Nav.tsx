import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Modal} from "antd";
import {HeaderStyled, Container, DropDown, Title, LinkStyled} from "./Nav.styled"
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Filters from "../Filters/Filters";
import MenuIcon from '@mui/icons-material/Menu';
import gsap from "gsap";


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

    const tl = gsap.timeline()

    const [menuIsOpened, setMenuIsOpened] = useState(false)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })

    const onMenuClick = useCallback(() => {
        const isOpened = menuIsOpened
        setMenuIsOpened(!isOpened)

        if (isOpened) {
            tl.to('#dropdown', {
                ease: 'power4',
                duration: 0.1,
                display: 'none',
                opacity: 0,
                height: 0,
            })
        } else {
            tl.to('#dropdown', {
                ease: 'power2',
                duration: .4,
                display: `flex`,
                opacity: 1,
                height: `calc(100vh - 4em)`,
            })
        }

    }, [menuIsOpened])

    useEffect(() => {
        if (windowWidth >= 767) {
            if (menuIsOpened) {
                onMenuClick()
            }
        }
    }, [windowWidth])

    return (
        <HeaderStyled>
            <img src={require('../../images/logo.png')}/>
            <Container>
                <Link className={"link"} to={'/'}>Главная</Link>
                <Link className={"link"} to={'/map'}>Карта</Link>
            </Container>
            <Container
                $showFilter={useLocation().pathname === '/map'}
            >
                <Button className={"filters"} type="primary" onClick={showModal}>
                    Фильтры
                </Button>

                <MenuIcon
                    className={"menu-icon"}
                    onClick={() => {
                        onMenuClick()
                    }}
                />
            </Container>
            <DropDown
                id={'dropdown'}
                onClick={() => {
                    onMenuClick()
                }}
            >
                <Link className={"link"} to={"/"}>Главная</Link>
                <Link className={"link"} to={'/map'}>Карта</Link>
            </DropDown>
            <Modal title="Filter departments" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Filters/>
            </Modal>
        </HeaderStyled>
    );
});

export default Nav;
