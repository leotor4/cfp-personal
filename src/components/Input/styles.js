import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #FFF;
  height: 40px;
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  border: 2px solid #FFF;
  color: #333333;
  margin: 12px 0 15px 0;
  transition: border 0.5s ;

  display: flex;
  align-items: center;

  ${props => props.isErroded && css`
    border-color: #ff073a;
  `}
  ${props => props.isFocused && css`
    color: var(--color-primary);
    border-color: var(--color-primary);

  `}
  ${props => props.isFilled && css`
    color: var(--color-primary);
  `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;
    font-size: 18px;
    &&::placeholder {
      color: #333333;
    }
  }
  svg {
    margin-right: 16px;
    color: #333333;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #ff073a;
    color: #FFF;
    &::before {
      border-color: #ff073a transparent;
    }
  }
`;