import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import uniforImg from '../../assets/login-background.jpg'

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
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
  align-items: center;
  justify-content: center;
  width: calc(100% - 33vw);
  height: 100%;
  position: absolute;
  right: 0;
 
  
  form {
    z-index: 1;
    margin: 80px 0;
    width: 340px;
    text-align: start;
    animation: ${appearFromRight} 1s;
    
    h1 {
      font-size: 36px;
      color: #FFF;
    }

    p {
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 22px;
      color: #FFF;
    }

    span {
      color: #FFF; 
      font-size: 22px;
      font-weight: 500;
      
    }

    a {
      color: #FFF;
      display: block;
      padding-top: 16px;
      width: fit-content;
      font-size: 20px;
      text-decoration: none;
      transition: color 0.2s;
      margin-bottom: 24px;
      &:hover {
        color: ${shade(0.2, '#FFF')}
      }
    }
  }

  @media(max-width: 700px) {
    width:100%;

    form {
      width: 300px;

      h1 {
        font-size: 32px;
      }

      p {
        font-size: 18px;
        margin: 0 0 8px 0;
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
    z-index: 1;
    white-space: nowrap;
    width: 100;
    position: absolute;
    right: 2%;
    top: 4%;
    
    span {
      color: #FFF;
      font-size: 2.5rem;
      margin-right: 4rem;
      border-bottom: 1px solid white;
    }

    a {
      color: #FFF;
      text-decoration: none;
      font-size: 2rem;
      outline: none;
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