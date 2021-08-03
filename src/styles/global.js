import styled,{ keyframes, css, createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-variant-numeric: lining-nums;
  }
  body{
    
  }
  .Toastify__toast-body {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  
  :root {
    font-size: 60%;
    --color-primary: #03a9f4;
    --color-secondary: #01579b;
    --color-tertiary: #FFFF;
    --color-primary-l93: #dbf4ff;
    --color-cancel: #6F6F6F;
    --color-select: #8BC34A;
    --color-good-note: #4CAF50;
    --color-middle-note: #FF9800;
    --color-bad-note: #f44336;
    --color-p: #333333;
    --color-dividers: #58c7f7dc;
    --color-gradient: linear-gradient(25deg, rgba(3, 169, 244, 1) 0%, rgba(1, 87, 155, 1) 60%);
    -webkit-font-smoothing: antialiased;
  }

  

  .disable {
    cursor: not-allowed;
    border: #999;
    background: #999 !important;
    box-shadow: 0px 2px 5px #999999 !important;
  }


  body, input, button {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes updown {
    0% {
      transform: translateY(0%)
    }
    50% {
      transform: translateY(-2%)
    }
    100% {
      transform: translateY(0%)
    }
  }

  
  @keyframes appear{
  from {
    opacity: 0.5;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
  }

`;

