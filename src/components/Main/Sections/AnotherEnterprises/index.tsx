import type { iProject } from 'types/iProject';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { generateId } from '@utils/generateId';

import { HrCSS } from '@stylesComponents/Hr';
import { SubTitleCSS } from '@stylesComponents/Texts';
import { ContainerCSS } from './styles';

interface AnotherEnterprisesProps {
  projects: iProject[];
}

export const AnotherEnterprises = ({ projects }: AnotherEnterprisesProps) => {
  const [separatesProjects, setSeparatesProjects] = useState<iProject[][]>([]);
  const [separatesProjectsIds, setSeparatesProjectsIds] = useState<
    { id: string; group: number }[]
  >([{ id: generateId(), group: 0 }]);

  useEffect(() => {
    setSeparatesProjects(
      projects.reduce((accumulator: iProject[][], item, i) => {
        const group = Math.floor(i / 6);
        accumulator[group] = [...(accumulator[group] || []), item];

        // generate ids for separates projects list
        setSeparatesProjectsIds((prevIds) => {
          const newIds = prevIds;
          if (newIds[group].group !== group) {
            newIds[group].id = generateId();
          }
          return newIds;
        });

        return accumulator;
      }, []),
    );
  }, [projects]);

  return (
    <ContainerCSS>
      <SubTitleCSS>OUTROS EMPREENDIMENTOS</SubTitleCSS>
      <div className="mx-w">
        {separatesProjects.map((separateProjects, i) => (
          <div key={separatesProjectsIds[i].id}>
            <nav>
              {separateProjects.map((project) => (
                <Link key={project.id} href={`/enterprises/${project.id}`}>
                  {project.name.name}
                </Link>
              ))}
            </nav>
            {i + 1 < separatesProjects.length && (
              <HrCSS direction="vertical" size="100%" stroke="2px" />
            )}
          </div>
        ))}
      </div>
    </ContainerCSS>
  );
};
