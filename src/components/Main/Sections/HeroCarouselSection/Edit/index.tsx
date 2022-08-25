import type { iImage } from 'types/iImage';
import type { iProject } from 'types/iProject';
import { useState } from 'react';

import { ButtonTooltip } from '@components/Buttons/ButtonTooltip';
import { EditIcon } from '@stylesComponents/icons/CRUD';
import { EditDialog } from './EditDialog';
import { EditCSS } from './styles';

interface EditProps {
  slides: iProject[] | iImage[];
  setSlides: React.Dispatch<
    React.SetStateAction<iProject[] | iImage[] | undefined>
  >;
  projects?: iProject[];
}

export const Edit = ({ setSlides, slides, projects }: EditProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <EditCSS>
      <EditDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        setSlides={setSlides}
        slides={slides}
        projects={projects}
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
