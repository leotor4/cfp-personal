import styled from 'styled-components';

export const FooterComponent = styled.footer`
display: flex;
/* height: 10vh; */
justify-content: center;
align-items: center;
position: fixed;
user-select: none;
bottom: 2px;
right:0;
left:0;
z-index: -1;
span {
    color: grey;
    text-align: center;
    font-size: 1.1vmin;
    font-size: 0.9vmax;
}
`