import styled from 'styled-components';

export const Container = styled.button`

    background: var(--color-secondary);
    color: #FFF;
    font-size: 24px;
    
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    width: 100%;
    font-weight: bold;
    transition: color, background-color 0.4s;
    &:hover {
      background: #FFF;
      color: var(--color-secondary);
    }
  
`; 