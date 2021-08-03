import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  height: 3.6rem;
  width: 100%;
  border-radius: 6px;
  padding: 12px;
  border: 2px solid var(--color-primary);
  color: #333333;
  margin: 0px;
  transition: border 0.5s ;
  position: relative;
  display: flex;
  align-items: center;

  ${props => props.color === "secondary" && css`
    border: 2px solid var(--color-secondary);
  `}

  ${props => props.isErroded && css`
    border-color: #ff073a;
  `}
  ${props => props.isFocused && css`
    color: var(--color-primary);
    border-color: var(--color-primary);

  `}
  ${props => props.isFilled && css`
    color: var(--color-primary);
    border-color: var(--color-primary);
  `}
  input {
    flex: 1;
    background: transparent;
    padding: 0 5px;
    width: 100%;
    border: 0;
    color: var(--color-primary);
    font-size: 1.8rem;

    ${props => props.color === "secondary" && css`
      color: #333333;
    `}

    &&::placeholder {
      color: #333333;
    }
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      z-index: 0;
      filter: invert(69%) sepia(50%) saturate(6740%) hue-rotate(166deg) brightness(98%) contrast(98%);
    }
  }
`;

export const Error = styled.div`
  position: absolute;
  top: 3rem;
  left: 0;
  width: 110%;
  
  span {
    background: transparent;
    color: #ff073a;
    font-weight: bold;
    font-size: 1.4rem;
  }
`;