import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderComponent = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  .trail-container {
    display: flex;
    align-items: flex-end;
    
    svg {
      color: var(--color-primary);
      margin-left: 5px;
      height: 2.5rem;
      margin-bottom: 3px;

      &:last-of-type {
        display: none;
      }
    }
  }

  .name {
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    

    strong {
      color: var(--color-primary);
      font-size: 22px;
      padding-right: 8px;
    }
    img {
      cursor: pointer;
      transition: 0.5s;
      max-width: 20px;
    }
  }

  .active {
    img {
      transform: rotate(-180deg);
    }
  }
`;

export const Popover = styled.div`
  display: flex;
  z-index: 1;
  ${(props) =>
    props.isFocused
      ? css`
          height: 120px;
          box-shadow: 0px 2px 5px #0000008c;
          background: #fff;
        `
      : css`
          height: 0;
        `};

  transition: 0.5s;
  position: absolute;
  margin: 10px 0 0 0px;
  width: 160px;
  padding: 10px;
  border-radius: 10px;
  flex-direction: column;

  a {
    animation: fade 0.8s;
    white-space: nowrap;
    color: var(--color-primary);
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      font-weight: bold;
    }
  }
`;

export const TrailLink = styled(Link)`
  text-decoration: none;
  ${'' /* text-decoration-thickness: 0.05em; */}
  font-size: 3rem;
  /* border-bottom-width: 1px;
  border-bottom-style: solid; */

  color: var(--color-primary);
  font-weight: bold;
  display: flex;
  align-items: flex-end;

  &:not(:first-child) {
    margin-left: 4px;
    font-weight: 700;
    
  }

  &:not(:last-child) {
    font-size: 2.5rem;
    transition: color 0.5s;

    &:hover {
      color: var(--color-secondary);
    }
  }

  &:last-of-type {
    font-size: 4rem;
    pointer-events: none;
    border-bottom-width: 0;
    /* margin-bottom: 0.3rem; */

  }
`;
