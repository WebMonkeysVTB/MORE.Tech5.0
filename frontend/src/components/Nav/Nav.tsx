import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Modal} from "antd";
import {HeaderStyled, Container, DropDown, Title, LinkStyled} from "./Nav.styled"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Filters from "../Filters/Filters";
import MenuIcon from '@mui/icons-material/Menu';
import gsap from "gsap";
import AtmsFilters from "../Filters/AtmsFilters";
import DepartmentsFilters from "../Filters/DepartmentsFilters";
import {getPathTime} from "../Map/utils";
import departmentsStore from "../../store/DepartmentsStore";
import atmsStore from "../../store/AtmsStore";
import {fetchAtms, fetchDepartments, getClosetAtms, getClosetDepartments} from "../../api";
import {IAtm, IDepartment} from "../../types";
import QrCodeIcon from '@mui/icons-material/QrCode';
import coordsStore from "../../store/CoordsStore";

declare let ymaps: any;

const Nav = observer(() => {
    const [isDepartmentsModalOpen, setIsDepartmentsModalOpen] = useState(false);
    const [isAtmsModalOpen, setIsAtmsModalOpen] = useState(false);

    const showDepartmentsModal = () => {
        setIsDepartmentsModalOpen(true);
    };

    const handleDepartmentsOk = () => {
        setIsDepartmentsModalOpen(false);
    };

    const handleDepartmentsCancel = () => {
        setIsDepartmentsModalOpen(false);
    };

    const showAtmsModal = () => {
        setIsAtmsModalOpen(true);
    };

    const handleAtmsOk = () => {
        setIsAtmsModalOpen(false);
    };

    const handleAtmsCancel = () => {
        setIsAtmsModalOpen(false);
    };

    const navigate = useNavigate()

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
                <QrCodeIcon className={'qr link'} onClick={() => {navigate('/qr')}}/>
            </Container>
            <Container
                $showFilter={useLocation().pathname === '/map'}
            >
                <Button className={"filters"} type="primary" onClick={showDepartmentsModal}>
                    отделения
                </Button>
                <Button className={"filters"} type="primary" onClick={showAtmsModal}>
                    банкоматы
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
                <QrCodeIcon onClick={() => {navigate('/qr')}} className={'qr link'}/>
            </DropDown>

            <Modal title="Filter departments" centered open={isDepartmentsModalOpen} onOk={handleDepartmentsOk}
                   onCancel={handleDepartmentsCancel}>

                <Button onClick={async () => {
                    await fetchDepartments();
                    let location = await ymaps.geolocation.get();
                    location = location.geoObjects.position
                    let deps: (IDepartment & {timeInPath?: number})[] = departmentsStore.data.sort((a,b) => {
                        const dist1 = (location[0] - a.latitude) ** 2 + (location[1] - a.longitude) ** 2;
                        const dist2 = (location[0] - b.latitude) ** 2 + (location[1] - b.longitude) ** 2;
                        if (dist1 > dist2) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                    deps = deps.slice(-10)
                    console.log(deps)
                    for (let i = 0; i < deps.length; i++) {
                        deps[i] = {...deps[i], timeInPath: Math.floor(await getPathTime(location, [deps[i].latitude, deps[i].longitude]) / 60)}
                    }
                    await getClosetDepartments(deps.map(dep => {return {id: dep.id as number, timeInPath: dep.timeInPath as number}})).then(
                        deps => {
                            console.log(deps)
                            departmentsStore.data = deps
                            atmsStore.data = []
                            coordsStore.coords = location
                            handleDepartmentsOk()
                        }
                    )
                }}>Подобрать оптимальные</Button>

                <DepartmentsFilters/>
            </Modal>

            <Modal title="Filter ATMs" centered open={isAtmsModalOpen} onOk={handleAtmsOk} onCancel={handleAtmsCancel}>
                <Button onClick={async () => {
                    await fetchAtms();
                    let location = await ymaps.geolocation.get();
                    location = location.geoObjects.position
                    let atms: (IAtm & {timeInPath?: number})[] = atmsStore.data.sort((a,b) => {
                        const dist1 = (location[0] - a.latitude) ** 2 + (location[1] - a.longitude) ** 2;
                        const dist2 = (location[0] - b.latitude) ** 2 + (location[1] - b.longitude) ** 2;
                        if (dist1 > dist2) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                    atms = atms.slice(-10)
                    console.log(atms)
                    for (let i = 0; i < atms.length; i++) {
                        atms[i] = {...atms[i], timeInPath: Math.floor(await getPathTime(location, [atms[i].latitude, atms[i].longitude]) / 60)}
                    }
                    await getClosetAtms(atms.map(atm => {return {id: atm.id as number, timeInPath: atm.timeInPath as number}})).then(
                        atms => {
                            console.log(atms)
                            atmsStore.data = atms
                            departmentsStore.data = []
                            coordsStore.coords = location
                            handleAtmsOk()
                        }
                    )
                }}>Подобрать оптимальные</Button>
                <AtmsFilters/>
            </Modal>
        </HeaderStyled>
    );
});

export default Nav;
