import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;
  position: relative;
`;

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;

  form {
    width: 100%;
    display: flex;

    .buttons-form {
      position: absolute;
      bottom: 40px;
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      
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
        &:hover {
          background: ${shade(0.2, '#03a9f4')}
        }
      }
    }
  } 
`;

export const LeftSide = styled.div`
  border-right: 1px solid var(--color-primary);
  width: 55%;

  .line-form {
    display: grid;
    width: 95%;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;

    .inactive {
      cursor: not-allowed;
      background: #ccc;
    }
  }
  
  hr {
    margin-top: -10px;
    border: 1px solid var(--color-dividers);
    width: 50%;
  }

  .form-input {
    display: flex;
    flex-direction: column;




    label {
      color: #666;
      font-weight:bold;
      font-size: 24px;
    }

    input {
      outline: 0;
      padding: 5px;
      width: 100%;
      height: 40px;
      color: var(--color-primary);
      border-radius: 6px;
      background: #FFF;
      font-size: 20px;
      outline: none;
      border: 2px solid var(--color-primary);
    }

    .small {
      width: 120px !important;
    } 
  }
`;

export const RightSide = styled.div`
 padding-left: 20px;
  width: 45%;
  .line-form {
    width: 54%;
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

    select {
      outline: 0;
      padding: 5px;
      width: 100%;
      height: 40px;
      color: var(--color-primary);
      border-radius: 6px;
      background: #FFF;
      font-size: 20px;
      outline: none;
      border: 2px solid var(--color-primary);
    }

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
    width: 400px;
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
`;