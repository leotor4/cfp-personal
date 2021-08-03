import styled from 'styled-components';
import { shade } from 'polished';

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

  span {
    color: #666;
    font-weight:bold;
    font-size: 24px;
  }

  select, input {
    padding: 5px;
    width: 400px;
    height: 40px;
    border-radius: 6px;
    color: var(--color-primary);
    background: #FFF;
    font-size: 20px;
    outline: none;
    border: 2px solid var(--color-primary);

    &:last-child {
      width: 120px;
    }
  }

  form {
    max-width: 1150px;
    width: 100%;
  }

  .buttons-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    
    button {
      width: 200px;
      font-size: 20px;
      background: var(--color-primary);
      box-shadow: 0px 4px 8px var(--color-primary);
      border: 0;
      padding: 8px;
      border-radius: 10px;
      color: #FFF;
      font-weight: bold;
      transition: background 0.5s;
      &:hover {
        background: ${shade(0.2, '#03a9f4')}
      }
    }
  }

  .first-line-form {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }

    input{
      margin-right: 10px;

      &:last-child {
        width: 80px;
      }
    }
  }
`;

export const CourseList = styled.div`
  max-height: 60vh;
  margin-top: 40px;
  border-top: 4px solid var(--color-primary);
  border-bottom: 4px solid var(--color-primary);
  background: #99999999;
  

  overflow-y: auto;

  &::-webkit-scrollbar{
    width: 6px;  
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px var(--color-primary);
    -webkit-box-shadow:  0 0 6px  transparent; 
    border-radius: 10px;
    max-height: 100px;
    height: 100%;
    margin: 8px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--color-primary);
    border-radius: 20px;
    -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
    max-height: 50px;
    height: 100%;
  }


  #options {
    display: flex;
    pointer-events: none;
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

  .course {
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
