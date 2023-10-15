import {styled} from "styled-components";

const MapPageStyled = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  
  .refresh {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    color: rgb(0,40,130);
    
    @media(hover: hover) {
      &:hover {
        cursor: pointer;
        color: rgb(0, 170, 255)
      }
    }
    
    &:active {
      color: white;
    }
  }
`

export {MapPageStyled}