import styled from 'styled-components';

export const SvgContainer = styled.svg`
  margin: 10px 30px;
  overflow: visible;
`;

export const Tooltip = styled.div`
    position: absolute;
    text-align: center;
    width: auto;
    padding: 5px;
    font: 12px sans-serif;
    background: rgba(110, 125, 152, 0.9);
    color: #fff;
    font-weight: 600;
    border: 0px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
`;
