import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  height: 3.6rem;
  border-radius: 6px;
  padding: 5px;
  width: 100%;
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
    color: #ff073a;
  `}

  ${props => props.isDisabled && css`
    cursor: not-allowed;
    background: #ccc;
  `}

  ${props => props.isFocused && css`
    color: var(--color-primary);
    border-color: var(--color-primary);

  `}
  ${props => props.isFilled && css`
    color: var(--color-primary);
  `}
  select {
    flex: 1;
    background: transparent;
    border: 0;
    width: 100px;
    color: var(--color-primary);
    font-size: 1.8rem;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    svg{
      height:18px
    }

    ${props => props.color === "secondary" && css`
      color: #333333;
    `}

    ${props => props.isDisabled && css`
      cursor: not-allowed;
      background: #ccc;
    `}

    &&::placeholder {
      color: #333333;
    }
  }
`;

export const Error = styled.div`
  position: absolute;
  top: 3rem;
  right: 0;
  width: 100%;
  
  span {
    background: transparent;
    color: #ff073a;
    font-weight: bold;
    font-size: 1.4rem;
    &::before {
      border-color: #ff073a transparent;
    }
  }
`;
