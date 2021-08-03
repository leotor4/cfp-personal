import React from 'react';

import { Container } from './styles';

function Loader({loading, children, color, ...rest}) {
  const colorClass = "lds-ellipsis " + color
  return (
    <Container>
      <div className={`${colorClass}`}><div></div><div></div><div></div><div></div></div>
    </Container>

  );
}

export default Loader; 