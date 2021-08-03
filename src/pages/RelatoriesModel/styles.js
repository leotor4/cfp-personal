import styled, { keyframes, css } from "styled-components";
import { shade } from 'polished';

const appearFromRight = keyframes`
  from {
    opacity: 0.5;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0.5;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
`;

export const LeftSide = styled.div`
  width: 50%;
  border-right: 1px solid var(--color-primary);
  animation: ${appearFromLeft} 0.5s;
  z-index: 0;

  p {
    color: #777;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .options {
    padding: 2rem 4rem 0 0;
    margin-top: 5%;
    animation: ${appearFromBottom} 0.5s;
    div {
      width: 100%;
      max-width: 600px;
      margin-bottom: 16px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        color: var(--color-primary);
        font-size: 20px;
      }

      button {
        width: 150px;
        font-size: 16px;
        background: var(--color-primary);
        box-shadow: 0px 4px 4px var(--color-primary);
        border: 0;
        padding: 3px;
        border-radius: 10px;
        color: #FFF;
        font-weight: bold;
        transition: background 0.5s;
        &:hover {
          background: ${shade(0.2, '#03a9f4')}
        }
      }
    }
  }

  .relatories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 0 2rem 0 0;
  }

`;

export const RightSide = styled.div`
  width: 480px;
  margin-left: 5%;

  p {
    color: #777;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .pdf-preview {
    animation: ${appearFromRight} 0.5s;
    
    .pdf-field {
      padding: 2rem 0;
      width: 100%;
      max-width: 500px;
      display: flex;


      .temporary-pdf {
        border-radius: 5px;
        background: #FFF;
        border: 1px solid var(--color-primary);
        border-radius: 10px;
        width: 40%;
        height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;

        p {
          text-align: center;
          color: #444;
          font-size: 1.5rem;
        }
        
      }

      button {
        margin-left: 4.0rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 200px;
        height: 50px;
        font-size: 18px;
        background: var(--color-primary);
        box-shadow: 0px 4px 8px var(--color-primary);
        border: 0;
        padding: 8px 15px;
        border-radius: 10px;
        color: #FFF;
        font-weight: bold;
        transition: background 0.5s;

        img {

          height: 29px;
        }
        &:hover {
          background: ${shade(0.2, '#03a9f4')}
        }
      }
    }
  }
`;

export const ReportButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  border-radius: 10px;
  background: none;

  span {
    margin-top: 1rem;
    font-size: 2rem;
    max-width: 90%;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .report {
    border-radius: 5px;
    background: #FFF;
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    width: 80%;
    height: 24vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  &:hover {
    transform: translateY(-5px);

    .report {
      box-shadow: 0 4px 8px rgba(0,0,0,.6);
    }

    span {
      color: var(--color-secondary);
      font-weight: bold;
    }
  }

  ${props => props.selected && css`
    transform: translateY(-5px);
    cursor: context-menu;
    .report {
      box-shadow: 0 4px 8px rgba(0,0,0,.6);
    }
    span {
      color: var(--color-secondary);
      font-weight: bold;
    }
  `}
`
