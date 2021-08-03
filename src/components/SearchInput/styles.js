import styled from 'styled-components';

export const Container = styled.input`
  width: 40%;
  border-radius: 16px;
  border-color: var(--color-primary);
  padding: 0.5rem 1rem;
  outline: none;
  border: 2px solid var(--color-primary);
  transition: all 0.2s linear;
  &::placeholder {
    color: var(--color-primary);
    opacity: 1;
  }
`; 