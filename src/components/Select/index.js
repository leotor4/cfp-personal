import React, { useEffect, useRef, useState, useCallback } from "react";
import { useField } from "@unform/core";

import { FiChevronDown } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

import { daysArray } from "../../utils/DaysArray";

import { Container, Checkbox, Error } from "./styles";

function Select({ name = "name", initialValue, ...rest }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [listDays, setListdays] = useState(daysArray);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, error, registerField } = useField(name);

  const inputRef = useRef(null);

  const handleSelect = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleWitchIsChecked = (self) => {
    setListdays((list) =>
      list.map((day) => {
        return {
          ...day,
          selected: day.id === self.id ? !self.selected : day.selected,
        };
      })
    );
  };

  const handleChange = () => {
    let tmp = "";
    let filteredList = listDays.filter((days) => {
      return days.selected;
    });

    filteredList.map((item) => {
      if (tmp === "") return (tmp = `${item.day}`);
      else return (tmp += `, ${item.day}`);
    });

    setValue(tmp);
  };

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    const handle = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        isDropdownOpen
      )
        setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handle);

    return () => document.removeEventListener("mousedown", handle);
  }, [inputRef, isDropdownOpen]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  useEffect(() => {
    if (initialValue && (value === initialValue || value === "")) {
      setValue(initialValue);
    }
  }, []);

  return (
    <Container
      ref={inputRef}
      isErroded={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <button
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        type="button"
        onClick={handleSelect}
        // onLoad={console.log("val : '", value, "', init : '", initialValue, "'")}
        {...rest}
      >
        {value ? <span>{value}</span> : <span>Selecionar dia(s)</span>}
        <FiChevronDown color="#03a9f4" />
      </button>

      {error && (
        <Error title={error} className="Erro">
          {!isFocused && <span>*Campo obrigatório.</span>}
        </Error>
      )}

      {isDropdownOpen && (
        <div className="dropdown-select">
          {listDays.map((item) => (
            <Checkbox isActive={item.selected} key={item.id}>
              <button type="button" onClick={() => handleWitchIsChecked(item)}>
                <div>{item.selected && <FaCheck color="#fff" size={18} />}</div>
                <span>{item.day}</span>
              </button>
            </Checkbox>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Select;
