import styled from 'styled-components';

export const ContentCSS = styled.div`
  --card-hidden-height: 50%;

  overflow: hidden;
  visibility: hidden;

  height: 0;
  opacity: 0;
  transition: 0.2s ease-in-out 0.3s;

  > div {
    display: flex;
  }
`;
