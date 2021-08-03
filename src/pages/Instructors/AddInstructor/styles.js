import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px 20px;
  margin: 0 2%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;
  overflow-y: visible;

    

    form {
    width: 100%;
    height: 80vh;
    overflow-x: hidden;
    overflow-y: hidden;

    .form-body{
    width: 100%;
    height: 80%;
    overflow-x: hidden;
    overflow-y: visible;

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
      max-height: 50px;
      height: 100%;
    }
    }


      .buttons-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
      

      button {
        width: 200px;
        font-size: 20px;
        background: var(--color-primary);
        box-shadow: 0px 4px 8px var(--color-primary);
        border: 0;
        padding: 8px;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        transition: background 0.5s;
        &:hover {
          background: ${shade(0.2, "#03a9f4")};
        }
      }
    }


    .line-form {
      display: grid;
      grid-column-gap: 3vw;
      grid-template-columns: 25vw 25vw 25vw;
      margin-bottom: 20px;
    }
    label {
      font-size: 24px;
    }
    input {
      width: 25vw;
      height: 40px;
    }

    ${"" /*width between 781px and 1070px */}
    @media screen and (max-width: 1070px) and (min-width: 781px) {      
      .line-form {
        margin-bottom: 15px;
      }
      label {
        font-size: 20px;
      }
      input {
        width: 25vw;
        height: 30px;
      }
    }

    ${"" /* width lesser than 780px */}
    @media screen and (max-width: 780px) {
      .line-form {
        display: grid;
        grid-column-gap: 40px;
        grid-template-columns: 250px;
        margin-bottom: 20px;
      }
      label {
        font-size: 20px;
      }
      input {
        width: 250px;
        height: 30px;
      }
    }

    .form-input {
      display: flex;
      flex-direction: column;

      label {
        color: #666;
        font-weight: bold;
      }

      input {
        outline: 0;
        padding: 5px;
        color: var(--color-primary);
        border-radius: 6px;
        background: #fff;
        font-size: 20px;
        outline: none;
        border: 2px solid var(--color-primary);
        
        &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      z-index: 0;
      filter: invert(69%) sepia(50%) saturate(6740%) hue-rotate(166deg) brightness(98%) contrast(98%);
    }
      }
    }

    .period-div {
      display: flex;
    }

    hr {
      margin-top: -10px;
      border: 1px solid var(--color-dividers);
      width: 50%;
    }

    .small {
      width: 120px !important;
    }

    
  }
`;