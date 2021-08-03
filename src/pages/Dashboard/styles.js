import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 80px);
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  animation: appear 0.5s;
`;

export const ButtonsBody = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  a {
    outline: none;
    text-decoration: none;
    display: flex;
    background: var(--color-primary);
    box-shadow: 0px 2px 5px var(--color-primary);
    border-radius: 10px;
    padding: 20px;
    color: white;
    height: 50px;
    white-space: nowrap;
    transition: all 0.2s linear;
    border: none;
    cursor: pointer;
    align-items: center;
    &:hover {
      background: #01a2ea;
    }
    img {
      margin-left: 20px;
      height: 30px;
    }
  }

  button {
    background: none;
    border: 0;

    img {
      margin-left: 20px;
      height: 20px;
      width: 20px;
    }
  }

  @media (max-height: 780px) {
    margin-top: 10px;
  }
`;
export const Content = styled.div`
  margin: auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 1400px;
  display: flex;
  position: relative;
  gap: 2%;
  height: 80%;

  @media (max-width: 1366px) {
    height: 90%;
  }
`;

export const LeftSide = styled.div`
  width: 70%;
  color: #fff;
  border-radius: 10px;
  display: grid;
  grid-gap: 4% 2%;
  height: 100%;
  max-height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 23% 23% 46%;
  grid-template-areas: "section section" "section section" "biggerSection biggerSection";

  .section {
    padding: 15px;
    background: var(--color-primary);
    border-radius: 10px;
    box-shadow: 0px 2px 5px var(--color-primary);
    grid-area: "section";
    position: relative;

    h2 {
      width: fit-content;
    }
    p {
      display: block;
      float: left;
      max-width: 160px;
    }

    strong {
      display: block;
      width: fit-content;
      position:absolute;
      right:10px;
      font-size: max(min(6vh, 50px), 30px);
    }
    
  }

  .biggerSection {
    padding: 15px;
    background: var(--color-primary);
    border-radius: 10px;
    box-shadow: 0px 2px 5px var(--color-primary);
    grid-area: biggerSection;
  }

  .first-line {
    padding-left: 10px;
    margin-bottom: 2px;
    margin-right: 25px;
    display: grid;
    grid-column-gap: 5%;
    grid-template-columns: 25% 40% 10% 10%;
  }

  .classes-body {
    height: calc(90% - 40px);
    overflow-y: auto;

    .no-classes{
      text-align: center;

      p{
        margin-top: 10px;
        font-weight: 700;
        font-size: 2rem;
      }
    }

    /* div {
      width:fit-content;
      margin:auto;
      margin-top: 20px;
      font-weight: bold;
    } */

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--color-secondary);
      -webkit-box-shadow: 0 0 6px transparent;
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
    ul {
      margin-right: 20px;
      list-style: none;
    }

    li {
      border: 1px solid white;
      border-radius: 10px;
      padding-left: 10px;
      display: block;
      margin-bottom: 5px;
      cursor: pointer;

      .link {
        text-decoration: none;
        white-space: nowrap;
        color: inherit;
        display: grid;
        grid-column-gap: 5%;
        grid-template-columns: 25% 40% 10% 10%;

        div {
          display: inline-block;
          font-weight: bold;
        }

        .class-attribute {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover {
          white-space: unset;
        }

        .room {
          word-break: break-all;
        }
      }
    }
  }
`;

export const RightSide = styled.div`
  border-radius: 10px;
  background: var(--color-primary);
  box-shadow: 0px 2px 5px var(--color-primary);
  width: 30%;
  padding: 2rem 2rem 0;
  height: 100%;

  h2 {
    color: #fff;
    font-size: 3.2rem;
  }

  #graphic-section {
    display: flex;
    height: calc(100% - 8rem);
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .graph-header {
    align-self: flex-start;
    color: #fff;
    padding-left: 5px;
    margin-bottom:5px;
  }
  .graph-footer {
    align-self: flex-start;
    color: #fff;
    padding-left: 5px;
    cursor: pointer;
    user-select: none;
  }

  #list-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1rem 0 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--color-secondary);
      -webkit-box-shadow: 0 0 6px transparent;
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

    .list-line {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      width: 100%;
    }

    .colorful-square {
      width: 36px;
      height: 18px;

      border-radius: 10px;
      margin-right: 2rem;
    }
    .fixed-background {
      min-height: 40px;
      margin-bottom: 10px;
      width: 100%;
      background-color: var(--color-secondary);
      border-radius: 10px;
      position: relative;
      p {
        position: relative;
        z-index: 2;
      }
    }

    .relative-background {
      position: absolute;
      top: 0;
      min-width: 9%;
      border-radius: 10px;
      min-height: 40px;
      height: 100%;
      background-color: var(--color-good-note);
      z-index: 0;
    }

    p {
      position: relative;
      color: white;
      mix-blend-mode: screen;
      width: 100%;
      padding: 2rem;
      font-size: 2.5rem;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 5px;

      /* &:hover {
        overflow: visible;
        white-space: normal;
        word-wrap:break-word
      } */
    }
  }
`;
