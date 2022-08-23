import styled, { css } from 'styled-components';
import { LinkedinSquare } from '@styled-icons/boxicons-logos/LinkedinSquare';
import { FacebookSquare } from '@styled-icons/boxicons-logos/FacebookSquare';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';

const sharedCSS = css`
  width: 1.2rem;
  height: 1.2rem;
`;

export const LinkedInIcon = styled(LinkedinSquare)`
  ${sharedCSS}
`;
export const FacebookIcon = styled(FacebookSquare)`
  ${sharedCSS}
`;
export const InstagramIcon = styled(Instagram)`
  ${sharedCSS}
`;
