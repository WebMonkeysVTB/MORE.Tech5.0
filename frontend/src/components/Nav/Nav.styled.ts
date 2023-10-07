import {styled} from "styled-components";

const HeaderStyled = styled.header`
  font-size: 1.5em;
  text-align: center;
  color: #fff;
  height: 64px;
  line-height: 64px;
  background-color: #7dbcea;
  position: relative;

  @media (max-width: 767px) {
    font-size: 1em;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`

const NavStyled = styled.nav`
  display: flex;
  flex-direction: row;
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

const Filters = styled.div`
  flex-grow: 5;
  display: flex;
  justify-content: end;
  align-items: center;
  
  button {
    margin-right: .5em;
  }
`

export {HeaderStyled, NavStyled, Title, Filters, LinkStyled}