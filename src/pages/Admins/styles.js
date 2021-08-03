import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: appear 0.5s;

  
`;

export const Content = styled.div`
  margin-top: 2%;
  width: 100%;
  height:100%;
  max-width: 1200px;

  .loading-more-admins {
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

  

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .add-admin-link {
      text-decoration: none;
      display: flex;
      background: var(--color-primary);
      box-shadow: 0px 2px 5px var(--color-primary);
      border-radius: 10px;
      padding: 1.5rem 5rem;
      color: white;
      height: 50px;
      white-space: nowrap;
      transition: all 0.2s linear;
      border: none;
      align-items: center;
      &:hover {
        background: #01a2ea;
      }
      img {
        margin-left: 10%;
        width: 40px;
      }
    }
  }

  .admins-list {
    height: calc(100% - 20vh);
    margin-top: 40px;
    border-top: 4px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);

    @media(max-height: 820px) {
      margin-top: 40px;
    }

    @media(max-height: 780px) {
      margin-top: 20px;
    }

    .no-admins {
      width: 100%;
      height: 95%;
      display: flex;
      align-items: center;
      justify-content: center;

      
      p {
        font-size: 32px;
      }
    }

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
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px var(--color-primary);
      border-radius: 20px;
      -webkit-box-shadow: inset 40px 0 6px var(--color-primary); 
      max-height: 50px;
      height: 100%;
    }
  }

  .admin {
    width: 99%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 0.1rem solid var(--color-dividers);

    p {
      font-size: 3rem;
      font-weight: bold;
    }
  }

  .admin:nth-child(even){
    background-color: var(--color-primary-l93);
  }

  .no-border {
      border-bottom: none !important;
  }

  #options {
    display: flex;
    align-items: center;

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
`;