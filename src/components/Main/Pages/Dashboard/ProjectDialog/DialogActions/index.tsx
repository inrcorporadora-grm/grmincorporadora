import { Button, DialogActions as DialogActionsMUI } from '@mui/material';

interface DialogActionsProps {
  type: 'add' | 'edit';
  onClickCancel: () => void;
}

export const DialogActions = ({ type, onClickCancel }: DialogActionsProps) => {
  return (
    <DialogActionsMUI>
      <Button type="button" onClick={onClickCancel}>
        Cancelar
      </Button>
      <Button type="submit">
        {type === 'add' ? 'Adicionar' : 'Atualizar'}
      </Button>
    </DialogActionsMUI>
  );
};
