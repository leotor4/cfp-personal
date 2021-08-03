import styled, { css } from 'styled-components';
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
  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 50px;
    align-items: center;
    width: 270px;
    background: var(--color-primary);
    box-shadow: 0px 4px 8px var(--color-primary);
    border-radius: 14px;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
    transition: opacity 0.4s;
    border: none;
    cursor: pointer;
    transition: background 0.5s;

    &:nth-child(2) {
      margin-left: 0;
    }
    &:hover {
      background: ${shade(0.2, '#03a9f4')}
    }

    img {
      height: 32px;
      margin-left: 10px;
    }
  }
  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .sub-header-left {
      .title-left {
        color: #333;
        display: flex;
        align-items: baseline;
        strong {
          font-size: 2.8rem;
          margin-right: 14px;
        }

        span {
          /* white-space: nowrap;  */
          text-transform: capitalize;
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
        }

        button {  
          margin-left: 14px;
          border: 0;
          background: none;

          img {
            height: 24px;
          }
        }
      }

      .info {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 40% 30% 30%;
        grid-gap: 4px;
        font-size: 100%;
        color: #444;
      }
    }
  }

  hr {
    margin-top: 14px;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    margin-right: 20px;
    margin-bottom: 10px;
    width: 103%;

  }
`;

export const ManageBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 103%;
  height: 56vh;

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
  
  .manage-body {
    padding: 5px;
    padding-right: 25px;

    hr {
      width: 101%;
    }
    
    .students-body {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: bold;
        font-size: 22px;
      }

      div {
        display: flex;
        align-items: center;


        span {
          font-size: 20px;
          margin-right: 10px;
          text-align: left;

        span {
          color: #6F6F6F;
        }
        }

        input {
          padding: 8px;
          margin-right: 20px;
          border-radius: 10px;
          outline: 0;
          width: 60px;
          color: var(--color-primary);
          font-size: 20px;
          font-weight: bold;
          border: 1px solid var(--color-primary);
        }
      }
    }
  }
  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`;
