import styled, { css } from 'styled-components';

export const Container = styled.div`
    border: 15px #03a9f4 solid;
    height: min(400px,45vh);
    width: 36vw;
    display: flex;
    align-items: center;
`;

export const Content = styled.div`
    text-align: center;
    padding: 0 10%;

    h1 {
      margin-bottom: min(30px,3vh);
      font-size: min(30px,3.5vh);
    }

    #text {
      font-size: min(16px,2.4vh);
      margin-bottom: min(30px,3vh);
    }

    .signatures {
      display: flex;
      width: 100%;
      align-items: flex-end;
      justify-content: space-between;

      img {
        height: min(60px,7vh);
      }

      #signature1, #signature2 {
        p {
          font-size: min(12px,1.4vh);
        }
      }

    }
`;