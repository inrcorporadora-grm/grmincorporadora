import styled, { css } from 'styled-components';
import { Pencil } from '@styled-icons/remix-fill/Pencil';
import { DeleteBin } from '@styled-icons/remix-fill/DeleteBin';
import { Add } from '@styled-icons/remix-fill/Add';

const sharedCSS = css`
  width: 1.2rem;
  height: 1.2rem;
`;

export const DeleteIcon = styled(DeleteBin)`
  ${sharedCSS}
`;

export const EditIcon = styled(Pencil)`
  ${sharedCSS}
`;

export const AddIcon = styled(Add)`
  ${sharedCSS}
`;
