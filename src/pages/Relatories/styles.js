import styled from "styled-components";
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
`;

export const Content = styled.div`
  width: 100%;
  padding: 30px 20px;
  display: flex;
`;

export const LeftSide = styled.div`
  width: 100%;

  p {
    color: #777;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .options {
    display: grid;
    width: 100%;
    max-width: 400px;
    grid-template-columns: repeat(2, 1fr);

    div {
      padding-bottom: 20px;

      display: flex;
      align-items: center;

      label {
        margin-left: 28px;
        font-size: 20px;
        color: var(--color-primary);
      }
    } 
  }

  select {
    margin-top: 20px;
    outline: 0;
    padding: 5px;
    width: 350px;
    height: 40px;
    color: var(--color-primary);
    border-radius: 6px;
    background: #FFF;
    font-size: 18px;
    outline: none;
    border: 2px solid var(--color-primary);
  }

  button {
    width: 180px;
    font-size: 18px;
    background: var(--color-primary);
    box-shadow: 0px 4px 8px var(--color-primary);
    border: 0;
    padding: 6px;
    border-radius: 10px;
    color: #FFF;
    font-weight: bold;
    transition: background 0.5s;
    &:hover {
      background: ${shade(0.2, '#03a9f4')}
    }
  }

  .pdf-field {
    padding: 50px 0;
    width: 100%;
    max-width: 500px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
  
    .temporary-pdf {
      border-radius: 5px;
      background: #999;
      width: 200px;
      height: 300px;
    }

    button {
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

`;

export const RightSide = styled.div`
  width: 100%;
  margin-left: 160px;

  p {
    color: #777;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .options {
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
`;