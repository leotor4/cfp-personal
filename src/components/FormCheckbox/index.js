import React, { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useField } from '@unform/core';

import { Container } from './styles';

const FormCheckbox = ({name = 'name', description, id, ...rest}) => {
  const buttonRefs = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const {fieldName, defaultValue = "", registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: buttonRefs.current,
      path: 'value', 
    })
  },[fieldName, registerField]);

  return (
    <Container 
      isActive={isActive} 
      onClick={() => setIsActive(!isActive)}
      ref={buttonRefs} 
      defaultValue={defaultValue}
      type="button"
      value={isActive ? true : false}
      {...rest} 
    >

        <div>
          {isActive &&
            <FaCheck color="#fff" size={18} />
          }
        </div>
        <span>{description}</span>

    </Container>
  );
}

export default FormCheckbox;