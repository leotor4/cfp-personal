import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  animation: appear 0.5s;
`;

export const Content = styled.div`
  width: 100%;
  height:100%;
  max-width: 1200px;
  margin: 40px auto 0 auto;

  @media(max-height: 780px) {
    margin-top: 10px;

  }

  .sub-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
        
    a {   
      text-decoration: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      padding: 0.8rem 4.4rem;
      white-space: nowrap;
      background: var(--color-primary);
      box-shadow: 0px 2px 5px var(--color-primary);
      border-radius: 10px;
      display: flex;
      align-items: center;
      color: #FFF;
      transition: opacity 0.4s;
      border: none;
      transition: background 0.5s;
      &:hover {
        background: ${shade(0.2, '#03a9f4')}
      }

      img {
        margin-left: 10%;
        width: 40px;
      }
    }
  }

  .no-classes {
    width: 100%;
    height: 66vh;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 28px;
    }
  }

  .classes-body {
    height: calc(100% - 20vh);
    overflow-y: auto;
    margin-top: 40px;
    border-top: 4px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);

    @media(max-height: 820px) {
      margin-top: 40px;
    }

    @media(max-height: 780px) {
      margin-top: 20px;
    }

    

    .loading-more-classes {
      margin-top: 10px;
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

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

  }
  
  ul {
    margin-right: 20px;
    /* margin-top: 40px; */
    list-style: none;

    li {
      .first-line-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        .first-line-left {
          width: 100%;
          height: 80px;
          display: grid;
          grid-template-columns: 3fr 2fr 1fr 1fr 3fr;
          grid-gap: 4px;

          p {
            color: #FFF;
            font-size: 22px;
          }

          strong {
            color: #FFF;
            font-size: 22px;

          }
        }
      }

      hr {
        color: #FFF;
        border: 1px solid #FFF;
        margin-right: 20px;
        margin-bottom: 10px;
      }

      /* .first-line-right {
        button, a {
          text-decoration: none;
          background: #FFF;
          padding: 8px;
          border-radius: 10px;
          border: 0;
          margin-right: 20px;
          color: var(--color-primary);
          box-shadow: 0px 2px 5px var(--color-primary);
          font-size: 20px;
          font-weight: bold
        }
      } */

      .participants-scroll {
          margin-top: 10px;
          overflow-y: auto;
          height: 210px;

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
        .participants {
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

          .students {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

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
        }
      }

    }
  }
`;

