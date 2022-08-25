import type { iProject, iTableProject } from 'types/iProject';
import { DataGrid, type GridRowId } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import { fetcher } from '@services/fetchers';
import { columns } from './utils/columns';
import { makeRows } from './utils/makeRows';

import { ContainerCSS } from './styles';

interface ProjectTableProps {
  projects: iProject[] | undefined;
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
  const [rows, setRows] = useState<iTableProject[] | undefined>(
    projects && makeRows(projects),
  );

  useEffect(() => {
    setRows(projects && makeRows(projects));
  }, [projects]);

  return (
    <ContainerCSS>
      <DataGrid
        rows={rows || []}
        columns={columns({ selectedIds, setRows })}
        pageSize={9}
        checkboxSelection
        rowsPerPageOptions={[9]}
        onSelectionModelChange={(id) => setSelectedIds(id)}
        disableSelectionOnClick
        onCellEditCommit={(e) =>
          fetcher.put(`/api/documents/${e.id}`, {
            [e.field]: e.value,
          })
        }
      />
    </ContainerCSS>
  );
};
