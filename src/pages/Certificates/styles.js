import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: appear 0.5s;

  #header2 {
    margin-top: 20px;
    display: flex;
    width: 100%;
    max-width: 1200px;
    align-items: center;
    justify-content: flex-end;

    .loading-button {
      cursor: not-allowed;
      border: #999 !important;
      background: #01a2ea !important;
      box-shadow: 0px 2px 5px #01a2ea !important;
    }

    button {
      text-decoration: none;
      display: flex;
      background: var(--color-primary);
      box-shadow: 0px 2px 5px var(--color-primary);
      border-radius: 10px;
      padding: 1.5rem 5rem;
      color: white;
      height: 50px;
      white-space: nowrap;
      transition: all 0.2s linear;
      border: none;
      align-items: center;

      &:hover {
        background: #01a2ea;
      }
      img {
        margin-left: 10%;
        height: 44px;
      }
      &:last-child {
        margin-left: 20px;
      }
    }
  }

  #model {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    max-width: 1000px;
  }
`;

