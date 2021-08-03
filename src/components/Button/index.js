import React from 'react';
import Loader from '../../components/Loader';

import { Container } from './styles';

function Button({loading, children, ...rest}) {
  return (
    <Container type="button" {...rest}>
      {loading ? <Loader color = 'black'/> : children}
    </Container>

  );
}

export default Button; 