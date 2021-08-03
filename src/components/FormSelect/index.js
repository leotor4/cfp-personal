import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

const FormSelect = ({name = 'name', isDisabled = false, color = "primary", ...rest}) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {fieldName, error, defaultValue,  registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    })
  },[fieldName, registerField])

  return (
    <Container 
      color={color}
      isErroded={!!error} 
      isFilled={isFilled} 
      isDisabled={!!isDisabled} 
      isFocused={isFocused}
      title={isDisabled ? "Primeiro selecione um curso" : ""}
    >
      
      <select
        disabled={!!isDisabled}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur} 
        defaultValue={defaultValue}
        title={isDisabled ? "Primeiro selecione um curso" : ""}
        ref={selectRef} 
        {...rest} 
      />
      
      {error && (
        <Error title={error} className="Erro">
          {!isFocused && <span>*Campo obrigatório.</span>}
          
        </Error>
      )}
    </Container>
  );
}

export default FormSelect;