import styled, { css, keyframes } from 'styled-components';


export const Container = styled.div`
  position:relative;


  ${props => props.isErroded && css`
  .react-select__control{
    border-color: #ff073a !important;
    color: #ff073a !important;
  }
  `}

  .react-select__control{
    border-color : var(--color-primary);
    border-radius: 6px;
    border-width: 2px;
  }
  
  .react-select__control:hover{
    border-color : var(--color-secondary);
    border-radius: 6px;
    border-width: 2px;
  }
  .react-select__indicator{
    color : var(--color-primary);
  }
  .react-select__indicator:hover{
    color : var(--color-secondary);
  }
  .react-select__single-value{
    color : var(--color-primary);
    font: 18px 'Arial';
  }
  .react-select__placeholder{
    font: 18px 'Arial';
  }
  .react-select__menu{
    color : var(--color-primary);
    font: 18px 'Raleway',sans-serif;
  }
  `;

export const Error = styled.div`
position: absolute;
top: 4rem;
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