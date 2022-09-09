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
  const [separatesProjectsIds, setSeparatesProjectsIds] = useState<string[]>(
    [],
  );

  useEffect(() => {
    setSeparatesProjects(
      projects
        .filter((_, i) => i <= 13)
        .reduce((accumulator: iProject[][], item, i) => {
          const group = Math.floor(i / 7);
          accumulator[group] = [...(accumulator[group] || []), item];
          setSeparatesProjectsIds((prev) => {
            if (prev[group]) prev.push(generateId());
            return prev;
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
          <div key={separatesProjectsIds[i]}>
            {i !== 0 && <HrCSS direction="vertical" size="100%" stroke="2px" />}
            <nav>
              {separateProjects.map((project) => (
                <Link key={project.id} href={`/enterprises/${project.id}`}>
                  {project.name.name}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </ContainerCSS>
  );
};
