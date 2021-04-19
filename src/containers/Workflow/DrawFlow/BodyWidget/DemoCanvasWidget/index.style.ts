import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Container = styled.div<{ color: string; background: string }>`
    height: 1000px;
    background-color: ${(p) => p.background};
    background-size: 50px 50px;
    display: flex;
    > * {
      height: 100%;
      min-height: 100%;
      width: 100%;
    }
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        ${(p) => p.color} 25%,
        ${(p) => p.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(p) => p.color} 75%,
        ${(p) => p.color} 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        ${(p) => p.color} 25%,
        ${(p) => p.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(p) => p.color} 75%,
        ${(p) => p.color} 76%,
        transparent 77%,
        transparent
      );
  `;

const Expand = css`
    html,
    body,
    #root {
      height: 100%;
    }
  `;

export {
  Container,
  Expand
}