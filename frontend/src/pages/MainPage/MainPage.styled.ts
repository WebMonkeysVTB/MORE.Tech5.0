import {styled} from "styled-components";

const MainPageStyled = styled.div`
  min-height: calc(100vh - 64px);
  background-color: black;
  color: white;
  width: 100%;
  position: relative;

`

const IntroStyled = styled.div`
  font-size: 2vw;
  height: 150vh;
  position: relative;
  overflow: hidden;
  background-color: black;
  width: 100%;


  img.puzzle {
    position: absolute;
    width: 100%;
  }

  img.tree {
    color: white;
    width: 30vw;
    position: absolute;
    left: 55vw;
    top: 45vw;
    z-index: 2;
  }

  h1 {
    text-shadow: .4vw -.4vw .5vw lightskyblue;
  }

  .monkeys {
    position: absolute;
    top: 15vw;
    left: 10vw;
  }

  .hack {
    position: absolute;
    top: 21vw;
    left: 25vw;
  }

  @media (max-width: 767px) {
    font-size: 16px;

    img.puzzle {
      width: 767px;
      left: -100px;
    }

    img.tree {
      width: 250px;
      left: 0;
      top: 330px;
    }

    .monkeys {
      left: 0;
      top: 110px;
    }

    .hack {
      top: 160px;
      left: 70px;
      width: 280px;
      text-align: right;
    }
  }
`
const ServiceStyled = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  background-color: black;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  gap: 2em;
  overflow: hidden;
  
  button {
    font-size: 1.5em;
    z-index: 2;
  }
  
  h1 {
    text-align: center;
    text-shadow: 3px -3px 5px blueviolet;
    z-index: 2;
  }
  
  div {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }
  
  img {
    position: absolute;
    width: 100%;
    height: auto;
    min-width: 767px;
  }
`

const TeamStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  z-index: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  
  img {
    max-width: 30vw;
    height: auto;
    max-height: 50vh;
  }
  
`

const WindowStyled = styled.div`
  position: relative;
  height: 0;
  width: 0;
  opacity: 0;
  margin-top: 50vw;
`

export {MainPageStyled, IntroStyled, ServiceStyled, TeamStyled, WindowStyled}