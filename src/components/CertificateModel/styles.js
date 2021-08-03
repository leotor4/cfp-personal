import styled from 'styled-components';

export const Container = styled.div`
  zoom: 120%;
    border: 15px #03a9f4 solid;
    height: 100%;
    display: flex;
    align-items: center;
`;

export const Content = styled.div`
    text-align: center;
    padding: 0 10%;

    h1 {
      margin-bottom: 2rem;
      font-size: 3.2rem;
    }

    #text {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    .signatures {
      display: flex;
      width: 100%;
      align-items: flex-end;
      justify-content: space-between;

      img {
        width: 200px;
      }

      #signature2 {
        img {
          width: 150px;
        }
      }
      p {
        font-size: 1rem;
      }
    }
`;