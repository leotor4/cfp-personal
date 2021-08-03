import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 20px;
  

  .list {
    height: ${props => props.isFocused ? '400px' : '70px'};
    transition: height 0.5s;
    background: var(--color-dividers);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 3px 5px var(--color-primary);

    .body-menu-courses {
      margin-top: 20px;
      height: calc(100% - 100px);
      padding: 10px;
      transition: opacity ${props =>  props.isFocused ? '1s' : '0.2s'};
      opacity: 0;
    }

    .header-li {
      padding: 10px;
      height:75px;
      text-transform: capitalize;
      border-radius: 10px;
      background: var(--color-primary);
      box-shadow: 0px 4px 8px var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      p {
        color: #FFF;
        font-size: 24px;
        font-weight: bold;
      }

      .header-buttons {
        display: flex;
        flex-direction: row;
        margin-right: 8px;
        button, a {
          border: 0;
          background: none;
          outline: none;
          align-items: center;
          
          svg {
            transition: 0.5s;
            color: #FFF;
            margin-left: 20px;
          }
        }
      }
    }
  }

  
  .active {
    box-shadow: 0px 3px 5px var(--color-dividers);
    .header-buttons {
      button {
        svg {
          transform: rotate(180deg);
        } 
      } 
    } 

    .body-menu-courses {
      opacity: 1;
    }
  }
  .desactive {
  
    height:80px;
    }
`;