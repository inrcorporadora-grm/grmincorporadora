import styled, { css } from 'styled-components';

interface HrCSSProps {
  direction: 'vertical' | 'horizontal';
  stroke: string;
  size: string;
}

export const HrCSS = styled.hr<HrCSSProps>`
  background-color: rgb(var(--color-text600));
  border: none;

  ${({ direction, stroke, size }) =>
    direction === 'horizontal'
      ? css`
          width: ${size};
          height: ${stroke};
        `
      : css`
          width: ${stroke};
          height: ${size};
        `};
`;
