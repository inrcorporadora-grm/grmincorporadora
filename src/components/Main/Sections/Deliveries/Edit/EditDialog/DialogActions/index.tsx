import { Button, DialogActions as DialogActionsMUI } from '@mui/material';

interface DialogActionsProps {
  onClickCancel: () => void;
  disabled: boolean;
}

export const DialogActions = ({
  onClickCancel,
  disabled,
}: DialogActionsProps) => {
  return (
    <DialogActionsMUI>
      <Button type="button" onClick={onClickCancel} disabled={disabled}>
        Cancelar
      </Button>
      <Button type="submit" disabled={disabled}>
        Atualizar
      </Button>
    </DialogActionsMUI>
  );
};
