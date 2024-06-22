/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { DataProps, Props } from "./interface";
import Fuse from "fuse.js";

const SelectAutoComplete: React.FC<Props> = ({
  data,
  value,
  onChange,
  label = "",
  disabled = false,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<DataProps[]>(data);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setInputValue(value?.label);
    }
  }, [value]);

  const fuse = new Fuse(data, {
    keys: ["label"],
    threshold: 0.2,
    distance: 100,
    includeScore: true,
  });

  const handleInputChange = (input: string) => {
    setInputValue(input);
    if (input.trim() === "") {
      setResults(data);
    } else {
      const searchResults = fuse.search(input);
      setResults(searchResults.map((result) => result.item));
    }
  };

  const handleFocus = () => {
    setIsExiting(false);
    setIsDropdownVisible(true);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (containerRef.current?.contains(event.relatedTarget as Node)) {
      return;
    }
    const matchedItems = data.filter(
      (item) => item.label === inputValue || item.value === inputValue
    );
    if (matchedItems.length > 0) {
      setInputValue(matchedItems[0].label);
      onChange(matchedItems[0]);
    } else {
      setInputValue("");
      onChange(null);
      setTimeout(() => {
        setResults(data);
      }, 150);
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsDropdownVisible(false);
      setIsExiting(false);
    }, 150);
  };

  const handleDropdownMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevents the input from losing focus
  };

  const handleDropdownItemClick = (item: DataProps) => {
    setInputValue(item.label);
    onChange(item);

    setTimeout(() => {
      inputRef.current?.blur();
    }, 150);
  };

  return (
    <S.Wrapper ref={containerRef}>
      <S.Label>{label}</S.Label>
      <S.Container disabled={disabled}>
        <S.Input
          ref={inputRef}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </S.Container>
      {isDropdownVisible ? (
        <S.Dropdown isExiting={isExiting} onMouseDown={handleDropdownMouseDown}>
          {results.map((item, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => handleDropdownItemClick(item)}
              selected={item === value ? true : false}
            >
              {item.label}
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      ) : null}
    </S.Wrapper>
  );
};

export default SelectAutoComplete;
