import styled, { keyframes } from 'styled-components';

import uniforImg from '../../../assets/login-background.jpg'

const apperarFromTop = keyframes`
  0% {
    transform: translateY(200px);
    opacity: 0;
  }
  60% {
    transform: translateY(-3%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);

  }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${uniforImg}) no-repeat center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 

  #logov2 {
    margin-top: 2%;
    width: 80%;
    max-width: 60rem;
    z-index: 1;
  }

  .blur-background {
    z-index: 0;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background-color: rgba(52, 52, 52, 0.2);
    backdrop-filter: blur(4px) brightness(0.85);
  }

  @media(max-width: 700px) {
    display: flex;
    justify-content: flex-start; 

    #logov2 {
      margin-top: 5%;
    }

  }
`;


export const Content = styled.div`
  margin-top: 3rem;
  background-Color: #FFF;
  width: 70%;
  max-width: 800px;
  height: calc(100vh - 45%);
  padding: 3.5rem;
  border-radius: 10px;
  position: absolute;
  animation: ${apperarFromTop} 1s;
  top: 20%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-height: 720px){
  height: calc(100vh - 35%);
  }
  
  img {
    margin-bottom: 4rem;
    width: 36%;
  }

  h1 {
    font-size: 4.2rem;
    text-align: center;
  }

  p {
    font-size: 2rem;
    text-align: center;
  }


  @media(max-width: 700px) {
    padding: 2rem;
    h1 {
      font-size: 3.2rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;
