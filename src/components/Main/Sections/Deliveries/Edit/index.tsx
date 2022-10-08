import type { iProject } from 'types/iProject';
import { useState } from 'react';

import { ButtonTooltip } from '@components/Buttons/ButtonTooltip';
import { EditIcon } from '@stylesComponents/icons/CRUD';
import { EditDialog } from './EditDialog';
import { EditCSS } from './styles';

interface EditProps {
  projects: iProject[];
  projectsIds: string[];
  setProjectsIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Edit = ({ projects, projectsIds, setProjectsIds }: EditProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <EditCSS>
      <EditDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        projects={projects}
        projectsIds={projectsIds}
        setProjectsIds={setProjectsIds}
      />

      <ButtonTooltip
        onClick={() => setIsDialogOpen(true)}
        label="Editar Imagem do(s) slide(s)"
      >
        <EditIcon />
      </ButtonTooltip>
    </EditCSS>
  );
};
