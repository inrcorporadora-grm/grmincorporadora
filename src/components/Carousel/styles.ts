import styled, { css } from 'styled-components';

export const altImageCSS = css`
  .alt-image {
    z-index: 999;
    position: absolute;
    text-align: center;

    color: rgb(var(--color-text100));
    background-color: rgba(var(--color-background900), 0.7);

    width: 100%;
    bottom: 0;
    padding: 0.2rem 0;
  }
`;

interface ContainerCSSProps {
  showHiddenSlides?: boolean;
}

export const ContainerCSS = styled.div<ContainerCSSProps>`
  --overflow-slide: ${({ showHiddenSlides }) =>
    showHiddenSlides ? 'unset' : 'hidden'};

  overflow-x: var(--overflow-slide);
  position: relative;
  width: var(--max-width);

  > .embla__viewport {
    overflow-x: var(--overflow-slide);
    width: 100%;

    &.is-draggable {
      cursor: move;
      cursor: grab;
    }
    &.is-dragging {
      cursor: grabbing;
    }

    > .embla__container {
      display: flex;
      position: relative;

      > .embla__slide {
        filter: grayscale(1);
        opacity: 0.5;
        min-width: var(--max-width);
        transition: filter, opacity 0.5s ease-in-out;

        &.is-selected {
          opacity: 1;
          filter: unset;
        }
      }
    }
  }
  > .embla__arrows {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2rem;
    margin: 1rem;

    > hr {
      opacity: 0.7;
    }
  }
  @media (max-width: 1000px) {
    --overflow-slide: hidden;
  }
  @media (max-width: ${({ theme }) => theme.mediaQueries.maxTablet}) {
    width: 100%;
    > .embla__viewport {
      > .embla__container {
        > .embla__slide {
          min-width: 100%;
        }
      }
    }
  }
`;
