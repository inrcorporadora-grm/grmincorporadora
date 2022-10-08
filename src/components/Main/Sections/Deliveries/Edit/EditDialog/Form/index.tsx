import type { iProject } from 'types/iProject';

import { useState } from 'react';
import { messages } from '@utils/messages';

import { FormBox } from '@components/FormBox';
import { SubTitleCSS } from '@stylesComponents/Texts';

import { submit } from './utils/submit';
import { ProjectTable } from './ProjectsTable';
import { DialogActions } from '../DialogActions';

interface EditDialogProps {
  setOpen: (open: boolean) => void;
  projects: iProject[];
  projectsIds: string[];
  setProjectsIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Form = ({
  setOpen,
  projectsIds,
  setProjectsIds,
  projects,
}: EditDialogProps) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  return (
    <FormBox
      onSubmit={() => {
        setButtonsDisabled(true);

        submit(projectsIds)
          .then(async (res) => {
            alert(`Ordem dos Cards atualizados com sucesso.`);
            setOpen(false);
            return res;
          })
          .catch(() => alert(messages.error.err))
          .finally(() => setButtonsDisabled(false));
      }}
    >
      <section>
        <SubTitleCSS>Selecione os projetos:</SubTitleCSS>
        <ProjectTable
          projectsIds={projectsIds}
          setProjectsIds={setProjectsIds}
          projects={projects}
        />
      </section>

      <DialogActions
        disabled={buttonsDisabled}
        onClickCancel={() => {
          if (window.confirm(messages.confirm.cancel)) {
            setOpen(false);
          }
        }}
      />
    </FormBox>
  );
};
