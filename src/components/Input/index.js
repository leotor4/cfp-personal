import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

const Input = ({name = 'name', icon: Icon,...rest}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {fieldName, error,  registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  },[fieldName, registerField])

  return (
    <Container isErroded={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur} 
        ref={inputRef} 
        
        {...rest} 
      />
      
      {error && (
        <Error title={error} className="Erro">
          <FiAlertCircle color="#ff073a" size={20} />
        </Error>
      )}
    </Container>
  );
}

export default Input;