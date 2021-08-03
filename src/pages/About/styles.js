import styled, { keyframes } from 'styled-components';

import uniforImg from '../../assets/login-background.jpg'

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: stretch;
  @media(max-width: 700px) {
    overflow-y: hidden;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  z-index: 1;
  margin-left: 35vw;
  padding: 20px;

  animation: ${appearFromLeft} 1s;
    
  h1 {
    font-size: 36px;
    color: #FFF;
  }

  p {
    padding: 0 12px;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    text-align: justify;
    color: #FFF;
    
  }

  .responsive {
    height: 60%;
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
      margin: 8px;
      margin-top: 30px;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px var(--color-primary);
      border-radius: 20px;
      -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
      max-height: 50px;
      height: 100%;
    }
  }

  .participants {
    display: flex;
    align-items: flex-start;
    width: 100%;
    justify-content: space-around;
    padding: 15px 12px 0;

    .teachers, .students {
      display: flex;
      flex-direction: column;
      
      span {
        color: #FFF; 
        font-size: 18px;
        font-weight: 500;
        
      }
      
    }
    

    strong {
      color: #FFF;
      font-size: 22px;
    }
  }


  @media(max-width: 700px) {
    width:100%;
    overflow-y: auto;
    margin: 0 auto;

    .responsive {
      margin-top: -100px;
    }

    .participants {
      display: flex;
      flex-direction: column;

      .students {
        margin-top: 20px;
      }
    }
  }

`;

export const RightSide = styled.div`
  background: url(${uniforImg}) no-repeat center;
  background-size: cover;
  display: flex;
  flex: 1;

  .blue-background {
    z-index: 0;
    width: calc(100vw - 33vw);
    position: absolute;
    right: 0;
    height: 100%;
    background-color: var(--color-primary);
    opacity: 0.85;
  }

  .nav {
    z-index: 2;
    white-space: nowrap;
    width: 100;
    position: absolute;
    right: 2%;
    top: 4%;
    
    span {
      color: #FFF;
      font-size: 2.5rem;
      
      border-bottom: 1px solid white;
    }

    a {
      color: #FFF;
      text-decoration: none;
      margin-right: 4rem;
      font-size: 2rem;
      transition: font-size 0.5s;

      &:hover {
        font-size: 2.5rem;
        border-bottom: 1px solid white;
      }
    }
  }

  footer {
    position: absolute;
    right: 0;
    bottom: 3.5%;
    width: calc(100% - 33vw);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 12vw;
      &:first-child {
        width: 15vw;
        margin-right: 4vw;
      }
    }
  }

  @media(max-width: 700px) {
    width: 100%;
    .blue-background {
      width: 100%;
      z-index: 0;
    }
    
    
    footer {
      display: flex;
      width: 100%;
      justify-content: center;
      img {
        width: 28%;
        &:first-child {
          width: 32%;
          margin-right: 4vw;
        }
      }
    }
  }
`;