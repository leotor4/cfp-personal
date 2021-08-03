import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
margin:0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;


`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  z-index: 1;
  padding: 20px;
  margin-top: 10% ;
  

  animation: ${appearFromLeft} 1s;
    
  h1 {
    font-size: 42px;
    color: var(--color-secondary);
  }

  p {
    padding: 12px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    text-align: justify;
    color: var(--color-secondary);
  }

  .responsive {
    height: 60%;
    overflow-y: auto;
    

    &::-webkit-scrollbar{
      width: 7px;  
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--color-primary);
      -webkit-box-shadow:  0 0 6px  transparent; 
      border-radius: 10px;
      max-height: 100px;
      height: 100%;
      margin: 8px;
      margin-top: 30px;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px var(--color-primary);
      border-radius: 20px;
      -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
      max-height: 50px;
      height: 100%;
    }
  }

  .participants {
    display: flex;
    align-items: flex-start;
    width: 100%;
    justify-content: space-around;
    padding: 0 12px;
    margin-top: 5% ;


    .teachers, .students {
      display: flex;
      flex-direction: column;
      
      span {
        color: var(--color-primary); 
        font-size: 18px;
        font-weight: 500;
        
      }
    }

    strong {
      color: var(--color-secondary);
      font-size: 22px;
    }
  }


  @media(max-width: 700px) {
    width:100%;
    overflow-y: auto;
    margin: 0 auto;

    .responsive {
      margin-top: -100px;
    }

    .participants {
      display: flex;
      flex-direction: column;

      .students {
        margin-top: 20px;
      }
    }
  }

`;

export const RightSide = styled.div`
  margin:0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex: 1;

  .blue-background {
    z-index: 0;
    width: calc(100vw - 33vw);
    position: absolute;
    right: 0;
    height: 100%;
    background-color: var(--color-primary);
    opacity: 0.85;
  }

  .nav {
    z-index: 2;
    white-space: nowrap;
    width: 100;
    position: absolute;
    right: 2%;
    top: 4%;
    
    span {
      color: #FFF;
      font-size: 2.5rem;
      
      border-bottom: 1px solid white;
    }

    a {
      color: #FFF;
      text-decoration: none;
      margin-right: 4rem;
      font-size: 2rem;
      transition: font-size 0.5s;

      &:hover {
        font-size: 2.5rem;
        border-bottom: 1px solid white;
      }
    }
  }

  .footer {
    width: calc(100% - 33vw);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 35px;

    img {
      width: 200px;
      &:first-child {
        width: 220px;
        margin-right: 4vw;
      }
    }
  }

  @media(max-width: 700px) {
    width: 100%;
    .blue-background {
      width: 100%;
      z-index: 0;
    }
    
    
    footer {
      
      display: flex;
      width: 100%;
      justify-content: center;
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