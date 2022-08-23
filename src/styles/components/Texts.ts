import styled, { css } from 'styled-components';

interface TitleCSSProps {
  weight?: string;
  uppercase?: boolean;
  line?: boolean;
  size?: string;
}

interface ParagraphCSSProps {
  size?: string;
  bold?: boolean;
  uppercase?: boolean;
}

export const TitleCSS = styled.h1<TitleCSSProps>`
  --font-size: ${({ size }) => size || '3rem'};

  font-size: var(--font-size);
  line-height: calc(var(--font-size) - 0.5rem);

  margin-top: 1rem;
  font-weight: 300;

  ${({ weight }) =>
    weight &&
    css`
      stroke: 0;
      font-weight: ${weight};
    `}
  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}
  ${({ line }) =>
    line &&
    css`
      --line-width: 3px;

      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;

      padding: 1rem 0;
      padding-left: calc(var(--line-width) + 1rem);

      &::before {
        content: '';
        position: absolute;
        background-color: rgb(var(--color-text600));

        top: 0;
        left: 0;
        width: var(--line-width);
        height: 100%;
      }
    `}

  @media (max-width: ${({ theme }) => theme.mediaQueries.maxMobile}) {
    --font-size: 2rem;
    line-height: var(--font-size);
  }
  @media (max-width: 320px) {
    word-break: break-all;
  }
`;

export const SubTitleCSS = styled.h2`
  text-transform: uppercase;
  margin: 3rem 0;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const ParagraphCSS = styled.p<ParagraphCSSProps>`
  font-weight: 300;
  margin-bottom: 1rem;

  ${({ size }) =>
    size &&
    css`
      font-size: ${size};
      line-height: ${size};
    `}
  ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}
  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  > .bold {
    font-weight: 700;
  }
  > .uppercase {
    text-transform: uppercase;
  }
`;
