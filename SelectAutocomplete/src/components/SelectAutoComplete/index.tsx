/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { DataProps, Props } from "./interface";
import Fuse from "fuse.js";

const SelectAutoComplete: React.FC<Props> = ({ data, value, onChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<DataProps[]>(data);

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
  // const handleBlur = () => {
  //   const isInputValueIncluded = data.some(
  //     (item) => item.label === inputValue || item.value === inputValue
  //   );
  //   if (!isInputValueIncluded) {
  //     setInputValue("");
  //     onChange(null);
  //   }
  //   setIsExiting(true);
  //   setTimeout(() => {
  //     setIsDropdownVisible(false);
  //     setIsExiting(false);
  //   }, 150); // Tempo da animação de saída
  // };

  const handleBlur = () => {
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
      }, 150); // Tempo da animação de saída
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsDropdownVisible(false);
      setIsExiting(false);
    }, 150); // Tempo da animação de saída
  };
  return (
    <S.Wrapper>
      <S.Label>Parcelas</S.Label>
      <S.Container>
        <S.Input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </S.Container>
      {isDropdownVisible ? (
        <S.Dropdown isExiting={isExiting}>
          {results.map((item, index) => (
            <S.DropdownItem key={index} onClick={() => onChange(item)}>
              {item.label}
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      ) : null}
    </S.Wrapper>
  );
};

export default SelectAutoComplete;
