import { Button, DialogActions as DialogActionsMUI } from '@mui/material';

interface DialogActionsProps {
  type: 'add' | 'edit';
  onClickCancel: () => void;
  disabled: boolean;
}

export const DialogActions = ({
  type,
  onClickCancel,
  disabled,
}: DialogActionsProps) => {
  return (
    <DialogActionsMUI>
      <Button type="button" onClick={onClickCancel} disabled={disabled}>
        Cancelar
      </Button>
      <Button type="submit" disabled={disabled}>
        {type === 'add' ? 'Adicionar' : 'Atualizar'}
      </Button>
    </DialogActionsMUI>
  );
};
