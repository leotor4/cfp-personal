import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: contain;
  padding: 20px 20px;
  margin: 0 2%;
  overflow-y: auto;
  overflow-x: hidden;
  
  
`;

export const Content = styled.div`
  height: calc(100% - 105px);
  padding: 20px 20px;
  margin: 0 2%;
  
  overflow-y: scroll;
  overflow-x: hidden;

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

  form {
    width: 100%;
    display: flex;

    .buttons-form {
      position: absolute;
      bottom: 40px;
      width: 75%;
      padding: 0 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      margin-left: -25px;
      
      button {
        width: 200px;
        font-size: 20px;
        background: var(--color-primary);
        box-shadow: 0px 4px 8px var(--color-primary);
        border: 0;
        padding: 8px;
        border-radius: 10px;
        color: #FFF;
        font-weight: bold;
        transition: background 0.5s;
        height: 40px;
        position: relative;
        &:hover {
          background: ${shade(0.2, '#03a9f4')}
        }
        
        
        > div {
          /* background-color: red; */
          height: 40px;
          position: absolute;
          top: 1px;
          left: 1px;
        }
      }
    }
  }
`;

export const LeftSide = styled.div`
  border-right: 1px solid var(--color-primary);
  width: 50%;

  span {
    font-weight: bold;
  }
  .first-line-form {
    width: 100%;

    p {
      color: #666;
      font-weight:bold;
      font-size: 18px;
      width: 90%;
    }



    label {
      color: #666;
      font-weight:bold;
      font-size: 24px;
    }

    .button-plus-input {
      display: flex;
      align-items: center;
      width: 30vw;
      /* margin-top: 10px; */
      margin-bottom:30px;
      
      button {
        background: var(--color-primary);
        height: 40px;
        margin-left: 10px;
        border: 0;
        padding: 0 10px;
        border-radius: 10px;

        &:hover {
          background: var(--color-secondary);
        }
        &:active {
          background: var(--color-primary-l93);

          svg {
            filter: invert(100%);
          }
        }
      }
    }
  }
  

  .line-form {
    display: grid;
    width: 95%;
    grid-gap: 20px;
    grid-template-columns: 35% 35% 15%;
    margin-bottom: 20px;
    align-items: flex-end;
    
  }

  #Email-line-form {
    display: grid;
    width: 95%;
    grid-gap: 20px;
    grid-template-columns: 35% 60%;
    margin-bottom: 20px;
    align-items: flex-end;
  }

  .form-input {
    display: flex;
    flex-direction: column;

    label {
      color: #666;
      font-weight:bold;
      font-size: 20px;
    }
    
  }  

  .period-div {
    display: flex;
  }
    
  hr {
    border: 1px solid var(--color-dividers);
    width: 50%;
  }

  .small {
    width: 120px !important;
  }
`;

export const RightSide = styled.div`
  padding-left: 20px;
  width: 45%;

  span {
    font-weight: bold;
  }
  .line-form {
    width: fit-content;
    margin-bottom: 20px;
  }

  .line-class-form {
    display: grid;
    width: 95%;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }

  .form-input {
    display: flex;
    flex-direction: column;

    label {
      color: #666;
      font-weight:bold;
      font-size: 24px;
    }
  }  
  
  p {
    color: #666;
      font-weight:bold;
      font-size: 24px;
  }

  .anwser  {
    margin-left: 20px;
    width: 100%;
    max-width: 400px;
    display: flex;
    color: var(--color-primary);
    align-items: center;
    justify-content: space-between;

    label {
      font-size: 20px;
    }

    input {
      outline: 0;
      margin-right: 10px;
      width: 18px;
      height: 18px;
    }
  }
  .react-select__single-value{
    color : var(--color-primary);
    font: 16px 'Raleway',sans-serif;
  }
  .react-select__placeholder{
    font: 16px 'Raleway',sans-serif;
    color : var(--color-primary);
  }
  .react-select__menu{
    color : var(--color-primary);
    font: 16px 'Raleway',sans-serif;
  }
`;