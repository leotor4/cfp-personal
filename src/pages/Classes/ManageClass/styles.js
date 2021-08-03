import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 20px auto 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  height: calc(100%);

  button {
    border: none;
    border-radius: 14px;
  }
  .arrow {
    display: inline-flex;
    color: var(--color-primary);
    height: 2.5rem;
    background: none;
    border: none;
    img {
      transform: rotate(-180deg);
    }
  }
  .title-pressed {
    max-width: calc(80vw - 26px);
    min-width: 0;
    font-size: 4rem;
    color: #333333;
    font-weight: bold;
  }
  .sub-sub-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .pressed {
    img {
      transform: rotate(0deg);
    }
    justify-content: space-between;
  }

  /* .notas-left{
        display: inline-flex;
          text-align: center;
      }
  @media screen and (max-width: 900px){
      .notas-left{
        display: none;
      }
  }

  .notas2-left{
        display: none;
      }
  @media screen and (max-width: 900px){
      .notas2-left{
        display: inline-flex;
        text-align: center;
      }
  } */

  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;

    a {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: min(250px, 22vw);
      background: var(--color-primary);
      box-shadow: 0px 4px 8px var(--color-primary);
      border-radius: 14px;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      transition: opacity 0.4s;
      border: none;
      transition: background 0.5s;

      @media screen and (max-width: 900px) {
        width: 198px;
      }

      &:nth-child(2) {
        margin-left: 0;
      }

      &:hover {
        background: ${shade(0.2, "#03a9f4")};
      }

      img {
        height: 28px;
        margin-left: 10px;
      }
    }
    .disabled {
      cursor: not-allowed;
      border: #999 !important;
      background: #999 !important;
      box-shadow: 0px 2px 5px #999999 !important;
    }
    .sub-header-left {
      width: 50%;

      .title-left {
        color: #333;
        display: flex;
        align-items: center;
        width: 100%;

        strong {
          cursor: pointer;
          font-size: 3.6rem;
          height: 100%;
          margin: 0 14px;
          width: 100%;
          line-height: 30px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: underline 1px;
        }
        .expanded-title {
          /* background-color: red; */
          overflow: visible;
          white-space: normal;
          -webkit-line-clamp: unset;
        }

        span {
          text-transform: capitalize;
          font-size: 2.4rem;
          font-weight: bold;
          color: #333;
        }

        button {
          margin-left: 14px;
          border: 0;
          background: none;

          img {
            height: 24px;
            margin-top: 8px;
          }
        }
      }

      .info-body {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          strong {
            font-size: 2rem;
            margin-right: 14px;
          }

          p {
            font-size: 1.8rem;
            color: #333;
          }
        }
      }
    }

    .sub-header-right {
      max-width: 540px;
      width: 50%;
      padding: 10px;
      .buttons-right {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
      }

      .vacancies {
        margin-left: 64px;
        display: flex;
        align-items: flex-start;
        font-size: 18px;

        strong {
          margin-left: 8px;
          margin-top: -2px;
        }
      }
      /* .notas-right{
        display: block;
      } */

      @media screen and (max-width: 900px) {
        .buttons-right {
          display: block;
        }

        a {
          margin: auto;
          margin-bottom: 20px;
        }
        .vacancies {
          width: fit-content;
          margin: auto;
        }
        .notas-right {
          display: block;
        }
      }
    }
  }
  .header-pressed {
    display: none;
  }
`;

export const ManageBody = styled.div`
  overflow-y: auto;
  margin-top: 10px;
  border-top: 4px solid var(--color-primary);
  border-bottom: 4px solid var(--color-primary);

  .body-pressed {
    height: calc(95vh - 55px);
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

  .manage-body {
    padding: 5px;
    padding-right: 25px;

    hr {
      width: 101%;
    }
    .no-instructor {
      button {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: min(250px, 22vw);
        background: var(--color-primary);
        box-shadow: 0px 4px 8px var(--color-primary);
        border-radius: 14px;
        padding: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        transition: opacity 0.4s;
        border: none;
        transition: background 0.5s;
        margin: 0px auto 25px;

        @media screen and (max-width: 900px) {
          width: 198px;
        }

        &:nth-child(2) {
          margin-left: 0;
        }

        &:hover {
          background: ${shade(0.2, "#03a9f4")};
        }

        img {
          height: 28px;
          margin-left: 10px;
        }
      }
      margin-top: 15px;

      border-bottom: 1px solid var(--color-primary);
    }

    .instructor-body {
      padding: 12px 8px;
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

    .no-students {
      text-align: center;
      margin-top: 20px;
      font-size: 2rem;
    }

    .students-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 8px;
      border-bottom: 1px solid var(--color-primary);

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
          padding-right: 30px;
          border-right: 1px solid var(--color-primary);

          span {
            font-size: 16px;
            padding: 2px 8px;
            border-radius: 6px;
            text-align: center;
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

      &:nth-child(even) {
        background-color: var(--color-primary-l93);
      }
    }
  }
`;
