import React, { useEffect, useRef, useState, useCallback } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

const FormInput = ({name = 'name', title, color = "primary", mask, placeholder,...rest}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {fieldName, defaultValue, error,  registerField } = useField(name);

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
    <Container 
      color={color}
      isErroded={!!error} 
      isFilled={isFilled} 
      isFocused={isFocused}
    >
      
      {(name === "birthdate" || name === "cpf" || name === "phone" || name === "address.zipcode"|| name === "timetable") ? (
      <InputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur} 
        defaultValue={defaultValue}
        type="tel"
        maskChar=""
        mask={mask}
        placeholder={placeholder}
        alwaysShowMask= {true}
        ref={inputRef} 
        {...rest} 
      />
      ) : (
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur} 
          defaultValue={defaultValue}
          ref={inputRef}
          placeholder={placeholder} 
          {...rest} 
      />
      )}
    
      {(error && !isFilled) && (
        <Error title={error} className="Error">
          {!isFocused && (
            title ? <span>{title}</span> : <span>*Campo Obrigatório</span>
          )}
          
        </Error>
      )}
    </Container>
  );
}

export default FormInput;