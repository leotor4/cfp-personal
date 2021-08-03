import styled,{css} from 'styled-components';
import { Form } from '@unform/web';

import uniforImg from '../../assets/login-background.jpg'

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
    overflow: hidden;
  
    #logov2 {
      margin-top: 5%;
    }

  }
`;


export const Content = styled.div`
  margin-top: 3rem;
  background-Color: #FFF;
  width: 80%;
  max-width: 1000px;
  height: calc(100vh - 25%);
  padding: 3.5rem;
  border-radius: 10px;
  position: relative;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-top: 2%;
      margin-bottom: 2rem;
      font-size: 2rem;
      text-align: center;
    }
  }

  @media(max-width: 700px) {
    padding: 2rem;
    header p {
      font-size: 1.5rem;
    }
  }
`;

export const FormContainer = styled(Form)`
  padding: 0 2rem 2rem;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar{
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px var(--color-secondary);
    -webkit-box-shadow:  0 0 6px  transparent; 
    border-radius: 10px;
    max-height: 100px;
    height: 100%;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--color-secondary);
    border-radius: 20px;
    -webkit-box-shadow: inset 40px 0 6px var(--color-secondary); 
    max-height: 50px;
    height: 100%;
  }

  p {
    color: #666;
    font-weight:bold;
    font-size: 1.8rem; 
    
  }


  .form-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;

    .disable {
      cursor: not-allowed;
    }

    label {
      color: #666;
      font-weight:bold;
      font-size: 1.8rem;
    }
  }

  .anwser  {
    margin-top: 0.8rem;
    margin-left: 20px;
    width: 70%;
    display: flex;
    color: var(--color-secondary);
    align-items: center;
    justify-content: space-between;

    label {
      font-size: 2rem;
    }

    input {
      outline: 0;
      margin-right: 10px;
    }
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10rem;

    button {
      background: var(--color-secondary);
      color: #FFF;
      font-weight: bold;
      border-radius: 10px;
      border: 0;
      padding: 1rem 5rem;
      height: 40px;
      width: 145px;
      position: relative;
      > div {
          /* background-color: red; */
          height: 40px;
          position: absolute;
          top: 1px;
          left: 1px;
        }

    }
  }

  @media(min-width: 720px) {
    padding: 2rem 4rem;
    position: relative;
    width: 100%;
    height: 90%;
    max-height: 600px;
    display: flex;
    justify-content: center;
    .left-side {
      flex: 1;
      padding-right: 8%;
      border-right: 2px solid var(--color-secondary);
    }

    .right-side {
      flex: 1;
      padding-left: 8%;

      .anwser  {
        width: 60%;
      }
    }

    .line-form {
      display: flex;
      gap: 2rem;

      .small {
        width: 100px !important;
      }
    }

    .medium {
      width: 70%;
    }
  }

  @media(max-height: 900px) {
    height: 80%;
  }

    .react-select__control{
    border-color : var(--color-secondary);
    border-radius: 6px;
    border-width: 2px;
    min-height:0;
    height:3.6rem;
  }
  .react-select__value-container{
    padding: 0 8px;
    margin-bottom:3px;

    
  }
  
  .react-select__control:hover{
    border-color : var(--color-primary);
    border-radius: 6px;
    border-width: 2px;
  }
  .react-select__indicator{
    color : var(--color-secondary);
    padding-top:5px;
    svg{
      height:18px;
    }
  }
  .react-select__indicator:hover{
    color : var(--color-primary);
  }
  .react-select__single-value{
    color: #333333;
    font: 1.8rem Arial;
  }
  .react-select__placeholder{
    color: #333333;
    font: 1.8rem Arial;
    font-weight: 400;
    top: calc(50% - 1px);
  }
  .react-select__menu{
    color : var(--color-secondary);
    font: 1.8rem Arial;
  }

  ${props => props.isDisabled && css`
    cursor: not-allowed;
    background: #ccc;
  `}
`;