import type { GridColDef } from '@mui/x-data-grid';

const sharedColumnsProps: GridColDef = {
  field: '',
  width: 200,
  align: 'center',
  editable: false,
  sortable: false,
  hideable: false,
  headerName: '',
  filterable: false,
  headerAlign: 'center',
  disableColumnMenu: true,
};

export const columns: GridColDef[] = [
  {
    ...sharedColumnsProps,
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    ...sharedColumnsProps,
    field: 'tableName',
    headerName: 'Nome do Projeto',
  },
  {
    ...sharedColumnsProps,
    field: 'status',
    headerName: 'Status do Projeto',
  },
];
