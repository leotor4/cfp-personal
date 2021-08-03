import styled, { keyframes } from 'styled-components';

const translate = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(15px);
  }
`;

const transition = keyframes`
  from {
    padding-left:1.3vh;
  }
  to {
    padding-left:25px;
  }
`;

export const Container = styled.div`
  background: var(--color-gradient);
  width: 80px;  
  height: 100vh;
  padding: 18px;
  padding-right: 20px;
  transition: 0.5s;
  z-index: 1;

  header { 
    display: flex;
    align-items: center;

    h1 {
      display: none;
    }
    
    img {
      height: 40px;
      transition: 0.8s;
      margin-bottom: 15px;
    }
    @media screen and (max-height: 450px){
      img {
      height: 20px;
      margin-left:10px;
      transition: 0.8s;
      margin-bottom: 5px;
    }
    }
  }

  .sidebar-body {
    display: flex;
    height: 100vh;
    
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
    .link-sidebar {
      &:first-child {
        margin-top: 3vh;
      }
      margin-bottom: 2vh;

      display: flex;
      align-items: center;
      display: flex;
      padding: 1.3vh;
      transition: 0.2s;

      color: #FFF;
      font-size: min(4vh, 24px);
      text-decoration: none;

     
      span {
        display: none;
      }

      img {
        max-height: min(5vh,42px);
        width: min(5.25vh, 43.75px);
        margin-left: 4px;
      }

      &:hover {
        color: var(--color-select);
        font-weight: bold;
        ${'' /* transform: translateX(15px); */}
        padding-left: 25px;
        ${'' /* animation: ${translate} 0.2s; */}
        animation: ${transition} 0.2s ease-out;

        img {
          filter: invert(29%) sepia(11%) saturate(1946%) hue-rotate(45deg) brightness(101%) contrast(88%);
        }
      }

    }

    .active {
      transition: width 0.6s;
      display: flex;
      justify-content: center;
      min-height: min(10vh,80px);
      background-color: var(--color-select);
      width: 92px;
    }

  }

  &:hover {
    width: max(300px, 20vw);
    
    
    header {
      margin-left: 10px;
      h1 {
        color: #FFF;
        margin-left: 12px;
        display: inline;
        animation-name: fade;
        animation-duration: 0.5s;
      }

      img {
        transform: rotate(360deg);
       
      }
    }

    .sidebar-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      animation-timing-function: ease-out;
      a {
        margin-left: 10px;
        
        svg, img {
          margin-right: 12px;
        }

        span {
          display: block;
          width: 180px;
          animation: fade 0.8s;
        }  
      }

      .active {
        color: #FFF;
        pointer-events: none;
        font-size: min(4.2vh, 26px);
        width: max(308px, 20.5vw);
        height: min(10vh,80px);
        display: flex;
        justify-content: flex-start;
        transition: width 0.5s;
        img {
          
          margin-left: 30px;
        }
        margin-left: -20px;

      }
    }
  }
`;