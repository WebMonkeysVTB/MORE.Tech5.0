import styled, {css} from "styled-components";

interface IContainer {
    $showFilter?: boolean
}


const HeaderStyled = styled.div`
  top: 0;
  left: 0;
  z-index: 50;
  height: 64px;
  position: fixed;
  width: 100vw;
  background-color: white;
  border-bottom: 1px solid #01001e;
  color: #01001e;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 767px) {
    justify-content: end;
    padding-right: 1em;
  }

  img {
    height: 100%;
    width: auto;
    position: absolute;
    left: 0;
  }
`

const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  position: relative;
  height: 100%;
  
  .filters {
    visibility: hidden;
    font-size: .9em;
    padding: 2px;
  }

  ${props => props.$showFilter && css`
      .filters {
        visibility: visible;
      }
  `}
  
  .link {
    padding: 1em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(0, 40, 130);
    font-size: 1.5em;
    user-select: none;
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        color: rgb(0, 170, 255);
        cursor: pointer;
      }
    }

    &:active {
      color: white;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  svg.menu-icon {
    color: #01001e;
    height: 100%;
    width: auto;
    z-index: 15;
    border-radius: 1em;

    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        color: rgb(0, 170, 255);
      }
    }

    &:active {
      box-shadow: white 0 0 50px;
    }

    display: none;

    @media (max-width: 767px) {
      display: initial;
    }
  }
`

const DropDown = styled.div`
  position: absolute;
  //height: calc(100vh - 4em);
  top: 4em;
  left: 0;
  height: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: none;
  background-color: rgb(0, 40, 130);

  .link {
    padding: 1em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 1.5em;

    &:active {
      color: white;
    }

    &:focus {
      color: white;
    }

    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        color: rgb(0, 170, 255);
      }
    }
  }
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
`

const LinkStyled = styled.div`
  height: 100%;
  padding: 0 .5em;
  border-radius: .5em;
  @media (hover: hover) {
    &:hover {
      background-color: blue;
      cursor: pointer;
      outline: .1em solid white;
    }
  }
`

export {HeaderStyled, Container, DropDown, Title, LinkStyled}