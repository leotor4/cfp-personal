import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  animation: appear 0.5s;
  position: relative;
`;

export const RightSide = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .nav {
    white-space: nowrap;
    width: 100;
    position: absolute;
    right: 5%;
    top: 5%;
    a {
      color: white;
      text-decoration: none;
      font-size: 2rem;
      outline: none;
      transition: font-size 0.5s 0.5s;
      &:first-child {
        font-size: 2.2rem;
        margin-right: 4rem;
        border-bottom: 1px solid white;
      }
      &:hover {
        font-size: 2.5rem;
        border-bottom: 1px solid white;
      }
    }
  }
  .login {
    max-width: 370px;
    form {
      margin-top: 2.4rem;
      .input-block {
        margin-bottom: 5%;
        label {
          font-size: 2rem;
          color: var(--color-primary);
        }
        input {
          width: 100%;
          display: block;
          margin-top: 8px;
          font-size: 1.6rem;
          padding: 7px 2%;
          color: var(--color-secondary);
          border-radius: 10px;
          border-width: 3px;
          border-color: var(--color-primary);
        border-style: solid;
          outline: none;
        }
        &:nth-child(2) {
          margin-top: 16px;
        }
      }
      a {
        color: white;
        font-size: 1.6rem;
        outline: none;
        transition: color 0.4s;
        &:focus,
        &:hover {
          color: var(--color-secondary);
        }
      }
      .btn-login {
        width: 120px;
        width: 100%;
        border: none;
        outline: none;
        font-weight: 700;
        font-size: 2.4rem;
        background-color: var(--color-secondary);
        color: white;
        border-radius: 10px;
        margin: 7% 0;
        padding: 14px;
        transition: color, background-color 0.4s;
        display: block;
        cursor: pointer;
        &:hover,
        &:focus {
          color: var(--color-secondary);
          background-color: white;
        }
      }
    }
    #changePass {
      display: flex;
      justify-content: space-between;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 170px;
        height: 40px;
        background: var(--color-primary);
        color: #fff;
        &:hover,
        &:focus {
          color: white;
          background-color: var(--color-secondary);
        }
      }
    }
  }
  h1,
  h2 {
    color: var(--color-secondary);
  }
  h1 {
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  h2 {
    font-size: 14pt;
    font-weight: 400;
  }
  #toast {
  }

  @media (max-width: 700px) {
    width: 100%;
    padding: 16px;
    .footer {
      img {
        width: 28%;
        &:first-child {
          width: 32%;
          margin-right: 4vw;
        }
      }
    }
  }
`;

export const Toast = styled.div`
  animation: fade 0.3s;
  margin-top: 8px;
  padding: 5px;
  border-radius: 30px;
  text-align: center;
  color: white;
  background: var(--color-good-note);
`;

export const ToastWrong = styled.div`
  animation: fade 0.3s;
  margin-top: 8px;
  padding: 5px;
  border-radius: 30px;
  text-align: center;
  color: white;
  background: var(--color-bad-note);
`;

export const ToastRight = styled.div`
  animation: fade 0.3s;
  margin-top: 8px;
  padding: 5px;
  border-radius: 30px;
  text-align: center;
  color: white;
  background: var(--color-good-note);
`;
