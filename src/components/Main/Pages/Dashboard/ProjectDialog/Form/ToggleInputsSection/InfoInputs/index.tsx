import type { iTableProject } from 'types/iProject';
import { Input } from '@components/Input';

export const InfoInputs = ({
  text,
  abbr,
  i,
}: iTableProject['infos'][number] & { i: number }) => {
  return (
    <>
      <Input
        label={`Informação ${i}`}
        id="text"
        placeholder="2 Dormitórios"
        defaultValue={text}
      />
      <Input
        label="Abreviação"
        placeholder="2 Dorms."
        id="abbr"
        defaultValue={abbr || ''}
        required={false}
        style={{ width: '60%' }}
      />
    </>
  );
};
