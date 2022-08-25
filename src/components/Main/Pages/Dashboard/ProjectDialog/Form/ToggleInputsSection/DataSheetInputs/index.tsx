import type { iTableProject } from 'types/iProject';
import { Input } from '@components/Input';

export const DataSheetInputs = ({
  sheet,
  data,
  i,
}: iTableProject['dataSheets'][number] & { i: number }) => {
  return (
    <>
      <Input
        id="sheet"
        label={`Nome do Campo ${i}`}
        placeholder="Dormitórios"
        defaultValue={sheet}
        style={{ width: '80%' }}
      />
      <Input label="Valor" placeholder="2" id="data" defaultValue={data} />
    </>
  );
};
