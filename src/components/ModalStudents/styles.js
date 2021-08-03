import styled, { css, keyframes } from 'styled-components';
import { shade } from "polished";

const translate = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  60% {
    transform: translateY(-5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);

  }
`;

const translateReverse = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  40% {
    transform: translateY(-5%);
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const backgroundAnimation = keyframes`
  0% {
  }
  100% {
    backdrop-filter: blur(4px) brightness(0.85);
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left:0;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  z-index: 2;
  background-Color: rgba(52, 52, 52, 0.2);
  animation: ${backgroundAnimation} 0.2s linear forwards;

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  background: #FFF; 
  width: 600px;
  height: 380px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  
  ${state => state.closed === true ? css`
    animation: ${translateReverse} 0.4s ease-in forwards;
  `: css`
    animation: ${translate} 0.4s ease-out forwards;
  `};
  

  h1 {
    color: var(--color-primary);
    font-size: 36px;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  hr {
    border: 1px solid var(--color-primary);
  }

  p {
    font-size: 22px;
    font-weight: bold;
    margin: 20px auto;
    text-align: center;
    width: 420px;
    color: var(--color-primary);
  }

  .add-student{
      margin-top: 10px;
      display:flex;
      justify-content:center;
      align-items: center;
    }

  .footer-buttons {
    margin: 40px auto;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 6px;
      width: 150px;
      background: #FFF;
      border-radius: 8px;
      border: 2px solid var(--color-cancel);
      /* box-shadow: 0px 4px 8px #999; */
      color: var(--color-cancel);
      font-weight: bold;
      font-size: 20px;
      transition: 0.2s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,.6);
      }

      &:last-child {
        color: #FFF;
        background: var(--color-primary);
        border: var(--color-primary);
      }

    }

  }

  a {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: min(250px, 22vw);
      border-radius: 14px;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      color: var(--color-primary);
      transition: opacity 0.4s;
      border: none;
      transition: background 0.5s;

      
      @media screen and (max-width: 900px) {
        width: 198px;
      }

      &:nth-child(2) {
        margin-left: 0;
      }

      &:hover {
        color: ${shade(0.2, "#01579b")};
      }

      svg {
        margin-left: 5px;
      }
    }


  .react-select__control{
    border-color : var(--color-primary);
    max-height: 55px;
  }
  .react-select__control:hover{
    border-color : var(--color-secondary);
  }
  .react-select__indicator{
    color : var(--color-primary);
  }
  .react-select__indicator:hover{
    color : var(--color-secondary);
  }
  .react-select__single-value{
    color : var(--color-secondary);
  }
  .react-select__value-container{
    max-height: 52px;
    overflow-y: auto;

    &::-webkit-scrollbar{
            width: 7px;
          }

          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px var(--color-primary);
            -webkit-box-shadow:  0 0 6px  transparent; 
            border-radius: 10px;
            max-height: 100px;
            height: 100%;

          }

          &::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 6px var(--color-primary);
            border-radius: 20px;
            -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
            max-height: 10px;
            height: 100%;
          }
  }
  
  
`;