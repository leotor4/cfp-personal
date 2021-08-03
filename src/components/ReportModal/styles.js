import styled, { css, keyframes } from 'styled-components';

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
    backdrop-filter: blur(2px) brightness(0.85);
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
  width: 800px;
  height: 500px;
  border-radius: 10px;
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

  form {
    display: flex;
    align-items: center;
    justify-content: center;

    .course-line {
      width: 300px;
      margin: 1rem 0;
    }
  }

  .body {
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .checkboxes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .disabled {
      background: #999;
    }

    p {
      text-align: center;
      color: #444;
      font-size: 2.2rem;
      font-weight: bold;
    }

  }


  .footer-buttons {
    margin: 40px auto;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    left: 5%;

    button {
      padding: 6px;
      width: 150px;
      background: #FFF;
      border-radius: 8px;
      border: 2px solid var(--color-primary);
      /* box-shadow: 0px 4px 8px #999; */
      color: var(--color-primary);
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
      }
    }
  } 
`;