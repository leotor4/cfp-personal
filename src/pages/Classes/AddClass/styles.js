import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;


  label {
    color: #666;
    font-weight:bold;
    font-size: 24px;
  }

  form {
    width: fit-content;
    min-width: 100%;
    z-index: 0;
    
  }

  .buttons-form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    max-width: 1150px;
    margin: 0 auto;
    
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

  .line-form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    >.bigger-select-form {
      padding-left: 0 !important;
    }
    
    .bigger-select-form {
      display: flex;
      flex-direction: column;
      width: 400px;
      padding: 0 20px;
    }
    .smaller-select-form {
      width: 100px;
    }
    .smaller-input-form {
      /* padding: 0 20px; */
      width: 160px;
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }

    }
    .room-input-form {
      padding: 0 20px;
      width: 470px;

    }
    .mid-sized-input-form{
      padding: 0 0 0 20px;
      width: 220px;
    }

    .period-form {
      >div{
        display: flex;
        align-items: center;
        label {
          padding: 0 8px;
        }
      }
    }

    .last-one {

      padding-left: 0;

      .check-room{
        position: absolute;
        margin-top:-5px;
        margin-left: 8px;
        color:var(--color-primary);

        .check-room-checkbox{
          color: var(--color-primary);
        }
      }
    }
  }
  .react-select__placeholder{
    color: var(--color-primary);
  }
`;

