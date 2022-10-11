import { useEffect } from 'react';
import { iProject } from 'types/iProject';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Form } from './Form';

interface EditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projects: iProject[];
  projectsIds: string[];
  setProjectsIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const EditDialog = ({
  open,
  setOpen,
  projects,
  projectsIds,
  setProjectsIds,
}: EditDialogProps) => {
  useEffect(() => {
    if (open) document.querySelector('html')!.style.overflowY = 'hidden';
    else document.querySelector('html')!.style.overflow = 'auto';
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <div className="mx-w" style={{ width: '100%', marginTop: '3rem' }}>
        <DialogTitle>Editar Ordem dos Cards</DialogTitle>
        <DialogContent>
          <Form
            setOpen={setOpen}
            projects={projects}
            projectsIds={projectsIds}
            setProjectsIds={setProjectsIds}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
