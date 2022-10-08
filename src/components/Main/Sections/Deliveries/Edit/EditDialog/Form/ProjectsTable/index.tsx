import type { iProject, iTableProject } from 'types/iProject';

import { DataGrid, type GridRowId } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import { columns } from './utils/columns';
import { makeRows } from './utils/makeRows';

import { ContainerCSS } from './styles';

interface ProjectTableProps {
  projectsIds: string[];
  setProjectsIds: React.Dispatch<React.SetStateAction<string[]>>;
  projects: iProject[];
}

export const ProjectTable = ({
  projects,
  projectsIds,
  setProjectsIds,
}: ProjectTableProps) => {
  const [rows, setRows] = useState<iTableProject[]>(makeRows(projects));
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>(projectsIds);

  useEffect(() => {
    setRows(makeRows(projects));
  }, [projects]);
  useEffect(() => {
    setProjectsIds(selectedIds as string[]);
  }, [setProjectsIds, selectedIds]);

  return (
    <ContainerCSS>
      <DataGrid
        rows={rows}
        pageSize={9}
        checkboxSelection
        columns={columns}
        rowsPerPageOptions={[9]}
        selectionModel={selectedIds}
        isRowSelectable={(params) =>
          selectedIds.length < 6 || selectedIds.includes(params.id)
        }
        onSelectionModelChange={(ids) => {
          if (ids.length <= 6) {
            setSelectedIds(ids);
          }
        }}
        disableSelectionOnClick
      />
    </ContainerCSS>
  );
};
