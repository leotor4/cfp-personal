import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  height: calc(90% - 80px);

  &::-webkit-scrollbar{
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px var(--color-primary);
    -webkit-box-shadow:  0 0 6px  transparent; 
    border-radius: 10px;
    max-height: 100px;
    height: 100%;

  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--color-primary);
    border-radius: 20px;
    -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
    max-height: 50px;
    height: 100%;
  }

  strong {
    color: #FFF;
    font-size: 23px;
  }
  p, span {
    color: #FFF;
    font-size: 22px;
    margin-left: 12px;
  }

  button {
    border: 0;
    background: none;
    margin-right: 30px;
    img {
      height: 45px;
    }    
  } 

  .instructor {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;


  }

  .no-students {
      width: 90%;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-size: 24px;
        font-weight: bold;
      }
    }

  .students {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #FFF;

    .students-right {
      display: flex;
      align-items: flex-end;

      .students-status {
        display: grid;
        grid-template-columns: 1fr 80px;
        grid-gap: 4px;

        span {
          font-size: 16px;
          padding: 2px 8px;
          border-radius: 6px;
          text-align: center;
          background: var(--color-good-note);
        }
      }

      button {
        margin-left: 30px;
      }
    }
  }
`