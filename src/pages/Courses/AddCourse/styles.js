import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  overflow: hidden;

  .first-line {
    font-size: 24px;
    font-weight: bold;
    color: #666;
  }

  .line-form {
    display: flex;
    gap: 20px;

    .form-input {
      display: flex;
      flex-direction: column;
      label {
        color: #666;
        font-weight: bold;
        font-size: 24px;
      }
      .small {
        width: 120px !important;
      }
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }
    }
  }

  .buttons-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;

    button {
      width: 200px;
      font-size: 20px;
      background: var(--color-primary);
      box-shadow: 0px 4px 8px var(--color-primary);
      border: 0;
      padding: 8px;
      border-radius: 10px;
      color: #fff;
      font-weight: bold;
      transition: background 0.5s;
      &:hover {
        background: ${shade(0.2, "#03a9f4")};
      }
    }
  }
  /* .dashboard-fragment {

  width: 30%;
  border-radius: 10px;
  background: var(--color-primary);
  box-shadow: 0px 2px 5px var(--color-primary);
  padding: 2rem;

  h2 {
    color: #FFF;
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

    align-self:flex-start;
    color: #FFF;
    font-size: 0.7em;
    font-weight:normal;
  }

  #list-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem 0 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar{
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--color-secondary);
      -webkit-box-shadow:  0 0 6px  transparent; 
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
      margin-bottom:10px;
      width: 100%;
      background-color: var(--color-secondary);
      border-radius: 10px;
    }

    .relative-background {
      min-width: 9%;
      border-radius: 10px;
      min-height: 40px;
    }

    p {
      /* color: var(--color-primary-l93);
      color: white;
      mix-blend-mode: difference;
      width: 20vw;
      font-size: 2.5rem;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 5px ;
      padding-top: 5px ;
      padding-bottom: 5px ;
      padding-left: 5px;
      /* text-shadow: 1px 0 #FFF, 0 1px #FFF, -1px 0 #FFF, 0 -1px #FFF;
    }
    p:hover {
      overflow: visible;
      white-space: normal;
    }
  }
  .randomize{
    cursor: pointer;
    color: white;
  }
  } -- Dashboard fragment desabilitado. Ver ./AddCourse/index.js para mais detalhes*/
`;

export const CourseList = styled.div`
  margin-top: 20px;
  background: #99999999;
  pointer-events: none;
  #div-line {
    display: flex;
    background: var(--color-primary);
    border-radius: 10px;
    padding: 0.2rem;
    margin-top: 16px;
    color: white;
    border: none;
    justify-content: space-between;
  }

  #options {
    display: flex;
    img {
      cursor: pointer;
      width: 20px;
      &:last-child {
        margin-right: 30px;
      }
    }
    #edit {
      width: 22px;
    }
  }

  #course {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    h3 {
      margin-left: 15px;
      font-size: 26px;
    }
  }

  .admin {
    display: flex;
    font-weight: bold;
    color: var(--color-p);
    font-size: 2.5rem;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 16px;
    padding-bottom: 16px;
    border-bottom: 0.1rem solid var(--color-dividers);
    .icons-format {
      display: flex;
      align-items: top;
      display: flex;
      a {
        margin-top: 8px;
        .icons {
          width: 2.2rem;
          height: 2.2rem;
          margin-right: 4rem;
        }
      }
    }
  }
`;
