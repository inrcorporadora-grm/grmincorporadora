import { Button, DialogActions as DialogActionsMUI } from '@mui/material';

interface DialogActionsProps {
  onClickCancel: () => void;
}

export const DialogActions = ({ onClickCancel }: DialogActionsProps) => {
  return (
    <DialogActionsMUI>
      <Button type="button" onClick={onClickCancel}>
        Cancelar
      </Button>
      <Button type="submit">Atualizar</Button>
    </DialogActionsMUI>
  );
};
