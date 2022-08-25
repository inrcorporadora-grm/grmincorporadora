import styled from 'styled-components';
import { AdminCSS } from './Pages/Admin/styles';
import { LandCSS } from './Pages/Land/styles';
import { ProjectCSS } from './Pages/Project/styles';
import { ContactCSS } from './Pages/Contact/styles';
import { AboutCSS } from './Pages/About/styles';
import { DashboardCSS } from './Pages/Dashboard/styles';

export const ContainerCSS = styled.main`
  --section-margin: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  > section {
    padding-top: var(--section-margin);
  }

  ${LandCSS}
  ${AboutCSS}
  ${AdminCSS}
  ${ContactCSS}
  ${ProjectCSS}
  ${DashboardCSS}
`;
