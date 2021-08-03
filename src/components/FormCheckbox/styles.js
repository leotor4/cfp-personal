import styled, {css} from 'styled-components';

export const Container = styled.button`
  background: none;
  outline: 0;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;

  div {
    border: 2px solid var(--color-primary);
    border-radius: 4px;
    height: 20px;
    width: 20px;
  }

  span {
    margin-left: 10px;
    color: #444;
    font-weight: normal;
    font-size: 2rem;

    &:hover {
      font-weight: bold;
      font-size: 1.88rem;
    }
  }

  ${props => props.isActive && css`
    div {
      display: flex;
      align-items: center;
      background: var(--color-primary);
    }
  `}
`;