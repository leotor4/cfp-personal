import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
`;

export const SearchInput = styled.input`
  margin-top: 20px;
  margin-left: 10px;
  width: min(300px, 30vw);
  border-radius: 16px;
  border-color: var(--color-primary);
  padding: 0.5rem 1rem;
  outline: none;
  border: 2px solid var(--color-primary);
  transition: all 0.2s linear;
  &::placeholder {
    color: var(--color-primary);
    opacity: 1;
  }
`;

export const Checkbox = styled.div`
  button {
    background: none;
    outline: 0;
    border: 2px solid var(--color-primary);
    border-radius: 4px;
    height: 20px;
    width: 20px;
  }

  ${(props) =>
    props.isActive &&
    css`
      button {
        display: flex;
        align-items: center;
        background: var(--color-primary);
      }
    `}
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  height: 94%;
`;

export const LeftSide = styled.div`
  width: 44%;
  h1 {
    font-size: 40px;
  }

  .certificate-body {
    margin-top: 40px;
    p strong {
      font-size: 20px;
      color: #444;
    }

    .options {
      margin-top: 20px;
      border-top: 4px solid var(--color-primary);
      border-bottom: 4px solid var(--color-primary);
      min-height: 80px;

      width: min(35vw, 500px);
      height: 40%;
      max-height: 400px;
      overflow-y: auto;
      padding: 10px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .border-bottom-custumize {
        height: 4px;
        width: 100%;
        position: relative;
        background: var(--color-primary);
      }

      .row-course {
        width: 96%;
        margin-left: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
          color: var(--color-primary);
          font-size: 24px;
          font-weight: bold;
        }

        input,
        button {
          margin-right: 30px;
        }
      }

      &::-webkit-scrollbar {
        width: 7px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px var(--color-primary);
        -webkit-box-shadow: 0 0 6px transparent;
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
    }
  }

  footer {
    margin-top: 20px;
    button {
      font-weight: bold;
      background: var(--color-primary);
      color: #fff;
      border: 0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      outline: none;
      width: 220px;
      display: flex;
      justify-content: center;
      height: 50px;
      font-size: 2.5rem;
    }
  }
`;

export const RightSide = styled.div`
  display: flex;
  padding-top: min(84px, 8vh);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  .certificates-body {
    margin-top: min(20px, 2vh);
    margin-left: 40px;
    width: 80%;
    height: 90%;
    border: 1px solid var(--color-primary);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 20px;
      color: #444;
    }
  }
  .div-align {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .certificates-pages {
    margin-top: 20px;
    margin-left: 40px;
    width: 80%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    .next-prev-button {
      background: none;
    }

    strong {
      font-size: 20px;
      color: #444;
    }
  }

  .temporary-certificate {
    height: 100%;
  }

  .line-down-certificates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    margin-top: 20px;
    margin-left: 40px;
    background: none !important;
    border: none !important;
    box-shadow: none !important;

    strong {
      font-size: 22px;
    }
  }

  .disable {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: fade 0.5s;

    button {
      width: 220px;
      cursor: not-allowed;
      border: #999 !important;
      background: #999 !important;
      box-shadow: 0px 2px 5px #999999 !important;
    }
  }

  .loading-button {
    cursor: not-allowed;
    border: #999 !important;
    background: #01a2ea !important;
    box-shadow: 0px 2px 5px #01a2ea !important;
    display: flex;
    align-items: center;
  }

  button {
    width: 220px;
    outline: none;
    text-decoration: none;
    display: flex;
    align-items: center;
    background: var(--color-primary);
    box-shadow: 0px 4px 8px var(--color-primary);
    border-radius: 10px;
    padding: 1.5rem 2rem;
    color: white;
    height: 50px;
    white-space: nowrap;
    transition: all 0.2s linear;
    border: none;
    cursor: pointer;
    &:hover {
      background: #01a2ea;
    }

    img {
      margin-left: 10px;
      height: 40px;
    }
  }
`;
