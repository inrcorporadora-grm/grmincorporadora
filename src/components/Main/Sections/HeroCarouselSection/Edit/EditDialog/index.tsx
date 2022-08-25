import { useEffect } from 'react';
import { iProject } from 'types/iProject';
import { iImage } from 'types/iImage';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Form } from './Form';

interface EditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSlides: React.Dispatch<
    React.SetStateAction<iProject[] | iImage[] | undefined>
  >;
  slides: iProject[] | iImage[];
  projects?: iProject[];
}

export const EditDialog = ({
  open,
  setOpen,
  setSlides,
  slides,
  projects,
}: EditDialogProps) => {
  useEffect(() => {
    if (open) document.querySelector('html')!.style.overflowY = 'hidden';
    else document.querySelector('html')!.style.overflow = 'auto';
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <div className="mx-w" style={{ width: '100%', marginTop: '3rem' }}>
        <DialogTitle>Editar Slide(s) Principal(is)</DialogTitle>
        <DialogContent>
          <Form
            setOpen={setOpen}
            setSlides={setSlides}
            slides={slides}
            projects={projects}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
