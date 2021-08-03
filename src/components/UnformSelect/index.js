import React, { useRef, useEffect } from "react";
import ReactSelect from "react-select";
import { useField } from "@unform/core";
import { Container, Content, Error } from "./styles";

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Container 
    isErroded={!!error} >
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        className="react-select"
        classNamePrefix="react-select"
        {...rest}
        components={{
          IndicatorSeparator: () => null
        }}
      />
      {error && (
        <Error title={error} className="Erro">
          {<span>*Campo obrigatório.</span>}
          
        </Error>
      )}
    </Container>
  );
}
