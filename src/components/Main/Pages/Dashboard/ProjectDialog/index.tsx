import type { iProject, iTableProject } from 'types/iProject';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Form } from './Form';

interface ProjectDialogProps<T> {
  open: boolean;
  title: string;
  tableProject?: T;
  setOpen: (open: boolean) => void;
  setProjects: React.Dispatch<
    React.SetStateAction<
      (T extends iTableProject ? T[] : iProject[]) | undefined
    >
  >;
}

export const ProjectDialog = <T extends iTableProject | undefined>({
  open,
  title,
  tableProject,
  setProjects,
  setOpen,
}: ProjectDialogProps<T>) => {
  const [type] = useState<'edit' | 'add'>(tableProject ? 'edit' : 'add');

  useEffect(() => {
    if (open) document.querySelector('html')!.style.overflowY = 'hidden';
    else document.querySelector('html')!.style.overflow = 'auto';
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <div className="mx-w" style={{ width: '100%', marginTop: '3rem' }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Form
            type={type}
            title={title}
            setOpen={setOpen}
            setProjects={setProjects}
            project={tableProject}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
