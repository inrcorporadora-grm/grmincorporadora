import type { iTableProject } from 'types/iProject';
import type { GridRowId } from '@mui/x-data-grid';
import { fetcher } from '@services/fetchers';
import { messages } from '@utils/messages';

import { ButtonTooltip } from '@components/Buttons/ButtonTooltip';
import { DeleteIcon } from '@stylesComponents/icons/CRUD';

export interface HeaderActionProps {
  selectedIds: GridRowId[];
  setRows: React.Dispatch<React.SetStateAction<iTableProject[] | undefined>>;
}

export const HeaderAction = ({ selectedIds, setRows }: HeaderActionProps) => {
  return (
    <ButtonTooltip
      label="Deletar Selecionados"
      onClick={() => {
        const rowsIds = new Set(selectedIds);
        if (rowsIds.size > 0) {
          if (window.confirm(messages.confirm.deleteAll)) {
            setRows((rows) => rows?.filter((row) => !rowsIds.has(row.id)));
            rowsIds.forEach((id) => fetcher.delete(`/api/projects/${id}`));
          }
        } else {
          alert(messages.error.noneItem);
        }
      }}
    >
      <DeleteIcon />
    </ButtonTooltip>
  );
};
