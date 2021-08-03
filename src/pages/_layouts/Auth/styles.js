import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const LeftSide = styled.div`
  background: var(--color-gradient);
  position: absolute;
  left: 0;
  top: 0;
  width: 33vw;
  height: 100%;
  text-align: center;

  #logov2 {
    margin-top: 5%;
    width: 75%;
  }
  #ilusLogin {
    width: 75%;
    max-width: 420px;
    margin-top: 8%;
    animation: updown 2s infinite 1s ease-in-out;

  }

  h1 {
    font-size: 3.4vh;
    color: white;
    font-weight: 400;
    margin: 2% 5%;
  }

  p {
    font-size: 2.5vh;
    font-weight: 300;
    color: white;
    margin: 5% 20% 0 20%;
  }

  @media(max-width: 700px) {
    display: none;
    width: 0;
  }

`;