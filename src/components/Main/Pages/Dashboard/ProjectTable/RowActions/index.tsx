import type { iTableProject } from 'types/iProject';
import type { GridColDef, GridRowId } from '@mui/x-data-grid';

import { HeaderAction } from './HeaderAction';
import { RowActions } from './RowActions';

export interface ActionsColumnProps {
  selectedIds: GridRowId[];
  setRows: React.Dispatch<React.SetStateAction<iTableProject[] | undefined>>;
}

export const actionsColumn: ({
  selectedIds,
}: ActionsColumnProps) => GridColDef = ({ selectedIds, setRows }) => ({
  field: 'delete/edit',
  width: 100,

  renderHeader: () => (
    <HeaderAction selectedIds={selectedIds} setRows={setRows} />
  ),
  renderCell: (params) => <RowActions params={params} setRows={setRows} />,
});
