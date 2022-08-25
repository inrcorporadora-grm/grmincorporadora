import type { iTableProject } from 'types/iProject';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { fetcher } from '@services/fetchers';
import { messages } from '@utils/messages';

import { ButtonTooltip } from '@components/Buttons/ButtonTooltip';
import { ProjectDialog } from '@components/Main/Pages/Dashboard/ProjectDialog';
import { DeleteIcon, EditIcon } from '@stylesComponents/icons/CRUD';

export interface ActionsColumnProps {
  setRows: React.Dispatch<React.SetStateAction<iTableProject[] | undefined>>;
  params: GridRenderCellParams<any, iTableProject, any>;
}

export const RowActions = ({ setRows, params }: ActionsColumnProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <ButtonTooltip
        label="Deletar Linha"
        onClick={() => {
          if (window.confirm(messages.confirm.deleteOne)) {
            setRows((rows) => rows?.filter((row) => row.id !== params.id));
            fetcher.delete(`/api/projects/${params.id}`);
          }
        }}
      >
        <DeleteIcon />
      </ButtonTooltip>
      <ButtonTooltip
        label="Editar Linhar"
        onClick={() => setIsDialogOpen(true)}
      >
        <EditIcon />
      </ButtonTooltip>
      <ProjectDialog
        tableProject={params.row}
        setProjects={setRows}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        title="Editar Projeto"
      />
    </>
  );
};
