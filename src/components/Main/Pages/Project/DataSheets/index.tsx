import type { iProject } from 'types/iProject';
import { ParagraphCSS, SubTitleCSS } from '@stylesComponents/Texts';

interface DataSheetsProps {
  name: string;
  locale: string;
  dimensions: string;
  dataSheets: iProject['dataSheets'];
}

export const DataSheets = ({
  dataSheets,
  name,
  locale,
  dimensions,
}: DataSheetsProps) => {
  return (
    <section>
      <SubTitleCSS style={{ marginBottom: 0 }}>Ficha técnica</SubTitleCSS>

      <ul>
        <li>
          <ParagraphCSS>
            <span className="bold uppercase">Nome:</span> {name}
          </ParagraphCSS>
        </li>
        <li>
          <ParagraphCSS>
            <span className="bold uppercase">Dimensões:</span> {dimensions}
          </ParagraphCSS>
        </li>
        {dataSheets.map(({ data, sheet, id }) => {
          return (
            <li key={id}>
              <ParagraphCSS>
                <span className="bold uppercase">{sheet}:</span>{' '}
                <span>{data}</span>
              </ParagraphCSS>
            </li>
          );
        })}
        <li>
          <ParagraphCSS>
            <span className="bold uppercase">Local:</span> {locale}
          </ParagraphCSS>
        </li>
      </ul>
    </section>
  );
};
