import styled from 'styled-components';

interface ContainerCSSProps {
  showHiddenSlides?: boolean;
}

export const ContainerCSS = styled.div<ContainerCSSProps>`
  overflow: hidden;
  position: relative;
  width: ${({ showHiddenSlides }) =>
    !showHiddenSlides ? 'var(--max-width)' : '100%'};

  > .embla__viewport {
    overflow: hidden;
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

        &.slide-selected {
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
