/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;
export const Wrapper = styled.div`
  position: relative; /* Adicione esta linha */
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  color: #333333;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Container = styled.div`
  border-width: 1px;
  border-color: #e0e0e0;
  border-style: solid;
  height: 40px;
  border-radius: 4px;
  overflow: hidden; /* Adicione esta linha */
`;

export const Input: any = styled.input`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  margin: 0; /* Remova a margem */
  border: none; /* Remova a borda */
  outline: none; /* Remova o contorno */
  box-shadow: none; /* Remova a sombra */
  background: none; /* Remova o background */
  -webkit-appearance: none; /* Remova estilos padrão no Safari e Chrome */
  -moz-appearance: none; /* Remova estilos padrão no Firefox */
  appearance: none; /* Remova estilos padrão em navegadores modernos */
  font-size: 14px;
`;

export const Dropdown: any = styled.ul`
  margin-top: 65px;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow-y: hidden; /* Remove o scroll vertical */
  overflow-x: hidden; /* Remove o scroll horizontal */
  background-color: #fff;
  z-index: 1;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  animation: ${({ isExiting }: any) => (isExiting ? slideOut : slideIn)} 0.2s
    ease-in-out;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
`;

export const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;
