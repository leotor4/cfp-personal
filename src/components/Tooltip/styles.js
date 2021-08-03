import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    width: 12rem;
    background: #ff073a;
    padding: 8px;
    border-radius: 4px;
    font-weight: 500;
    opacity: 0;
    text-align: center;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff073a transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
    font-size: 1.8rem;
  }
`;