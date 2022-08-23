import styled from 'styled-components';

export const ContainerCSS = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;

  &.is-draggable {
    cursor: move;
    cursor: grab;
  }
  &.is-dragging {
    cursor: grabbing;
  }

  > .embla__container {
    display: flex;
    width: 102%;

    > .embla__slide {
      display: flex;
      position: relative;
      align-items: center;

      flex: 0 0 100%;
      width: 100%;
      height: calc(100vh - 3rem);

      .slide__content {
        left: 50%;
        width: 100%;
        transform: translate(-50%);
      }
    }
  }
  > .embla__dots {
    display: flex;
    justify-content: center;
  }
`;
