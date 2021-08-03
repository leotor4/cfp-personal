import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Body = styled.div`
  zoom: 0.9;
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: auto;
  margin-top: 10px;

  @media screen and (max-width: 1366px) {
      font-size: 93.75%;
      zoom:0.8;
  }
@media screen and (max-width: 900px) {
      font-size: 93.75%;
      zoom:0.75;
  }

  @media screen and (max-width: 720px) {
      font-size: 87.5%;
      zoom:0.7;
    
  }
`