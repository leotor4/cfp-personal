import styled, { css } from 'styled-components';

export const Container = styled.div`
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  ${props => props.isErroded && css`
    border-color: #ff073a;
    color: #ff073a;
  `}
  ${props => props.isFocused && css`
    color: var(--color-primary);
    border-color: var(--color-primary);

  `}
  ${props => props.isFilled && css`
    color: var(--color-primary);
  `}

  button {
    border: 0;
    background: 0;
    z-index: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-weight: normal;
      font-size: 18.5px;
      color: var(--color-primary);
    }
  }

  .dropdown-select {
    position: absolute;
    background: #FFF;
    top: 38px;
    left: 0;

    border: 1px solid var(--color-primary);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px;
    border-color: #888;
    width: 100%;
    z-index: 1;
    

  }

`;

export const Checkbox = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
 
  button {
    background: none;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 4px 8px;
    div {
      border: 2px solid var(--color-primary);
      border-radius: 4px;
      height: 20px;
      width: 20px;
    }

    span {
      margin-left: 10px;
      color: var(--color-primary);
      font-weight: normal;
      font-size: 18px;
    }

    &:hover {
      background: #1E90FF;
      span {
        color: #fff;
      }

      div {
        border-color: #fff;
      }
      
    }

  }

  ${props => props.isActive && css`
    button {
      div {
        display: flex;
        align-items: center;
        background: var(--color-primary);
      }
    }
  `}

`;

export const Error = styled.div`
  position: absolute;
  top: 42px;
  left: 0px;
  width: 100%;
  span {
    background: transparent;
    color: #ff073a;
    font-size: 16px;
    &::before {
      border-color: #ff073a transparent;
    }
  }
`;