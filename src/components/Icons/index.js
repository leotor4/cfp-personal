import React from 'react';

import { Container } from './styles';

const Icons = ({image}) => {
  return (
    <Container>
      <img src={image} alt=""/>
    </Container>
  );
}

export default Icons;