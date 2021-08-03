import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 2vw auto 0 auto;
  padding-left: 40px;
  padding-right: 40px;

  span {
    color: #666;
    font-weight:bold;
    font-size: 24px;
  }

  form {
    max-width: 1150px;
    width: 100%;
    z-index: 0;
  }

  .buttons-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    
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
    .mid-sized-input-form {
      padding: 0 0 0 20px;
      width: 220px;
    }


    .period-form {
      >div{
        display: flex;
        align-items: center;
        span {
          padding: 0 8px;
        }
      }
    }

    .last-one {
      padding-left: 0;
      width: 120px;
    }
  }
`;

export const ManageBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 103%;
  height: 50vh;
  border-top: 4px solid var(--color-primary);
  border-bottom: 4px solid var(--color-primary);
  padding: 12px 0;
  background: rgba(0,0,0,.3);

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

  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--color-primary);
    border-radius: 20px;
    -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
    max-height: 50px;
    height: 100%;
  }
  
  .manage-body {
    padding: 5px;
    padding-right: 25px;

    hr {
      width: 102%;
    }

    .instructor-body {
      padding: 12px;
      padding-top: 8px;
      border-bottom: 1px solid var(--color-primary);
      .instructor-first-line {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-weight: bold;
          font-size: 22px;
        }

        button {
          background: none;
          pointer-events: none;
          border: 0;
          margin-left: 24px;
          img {
            height: 24px;
          }
        }
      }

      span {
        margin-left: 15px;
      }
    }

    .students-body {
      padding: 12px;
      border-bottom: 1px solid var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: bold;
        font-size: 22px;
      }

      div {
        display: flex;

        .students-status {
          display: grid;
          grid-template-columns: 1fr 80px;
          grid-gap: 5px;

          span {
            font-size: 16px;
            padding: 2px 8px;
            border-radius: 6px;
            text-align: center;
            background: var(--color-good-note);
          }
        }

        p {
          font-weight: normal;
          font-size: 18px;
          margin-right: 15px;
        }

        button {
          background: none;
          border: 0;
          margin-left: 24px;
          img {
            height: 24px;
          }
        }
      }
    }
  }
`;