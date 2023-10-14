import {styled} from "styled-components";

const ButtonStyled = styled.button`
  color: white;
  background-color: rgb(0, 40, 130);
  border: none;
  border-radius: .5em;
  padding: .5em;

  @media (hover: hover) {
    &:hover {
      background-color: rgb(0, 170, 255);
      cursor: pointer;
    }
  }
`

export {ButtonStyled}