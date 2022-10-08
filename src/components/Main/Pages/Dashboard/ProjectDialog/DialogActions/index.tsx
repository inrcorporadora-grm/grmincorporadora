import { Button } from '@components/Buttons/Button';
import { DialogActions as DialogActionsMUI } from '@mui/material';

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
      <Button
        type="button"
        onClick={onClickCancel}
        loading={false}
        disabled={disabled}
        variant="text"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={disabled}
        loading={disabled}
        variant="text"
      >
        {type === 'add' ? 'Adicionar' : 'Atualizar'}
      </Button>
    </DialogActionsMUI>
  );
};
