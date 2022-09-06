import type { iProject, iTableProject } from 'types/iProject';
import type { iImage } from 'types/iImage';

import { DataGrid, type GridRowId } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import { imageMock } from '@utils/imageMock';
import { columns } from './utils/columns';
import { makeRows } from './utils/makeRows';

import { ContainerCSS } from './styles';

interface ProjectTableProps {
  slides: (iProject | iImage)[];
  setSlides: React.Dispatch<React.SetStateAction<iProject[] | iImage[]>>;
  projects: iProject[];
}

export const ProjectTable = ({
  projects,
  slides,
  setSlides,
}: ProjectTableProps) => {
  const [rows, setRows] = useState<iTableProject[]>(makeRows(projects));
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>(
    slides[0]?.is === 'project' ? slides?.map((slide) => slide.id) : [],
  );

  useEffect(() => {
    setRows(makeRows(projects));
  }, [projects]);
  useEffect(() => {
    const projectsSlide = projects.filter((project) =>
      selectedIds?.includes(project.id),
    );

    setSlides(projectsSlide.length ? projectsSlide : [imageMock]);
  }, [setSlides, projects, selectedIds]);

  return (
    <ContainerCSS>
      <DataGrid
        rows={rows}
        pageSize={9}
        checkboxSelection
        columns={columns}
        rowsPerPageOptions={[9]}
        selectionModel={selectedIds}
        isRowSelectable={() => selectedIds.length <= 5}
        onSelectionModelChange={(ids) =>
          setSelectedIds(ids.filter((_, i) => i < 5))
        }
        disableSelectionOnClick
      />
    </ContainerCSS>
  );
};
