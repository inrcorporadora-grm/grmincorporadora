/* eslint-disable no-restricted-syntax */
import type { iTableProject } from 'types/iProject';
import { useEffect, useState } from 'react';
import { generateId } from '@utils/generateId';

import { SubTitleCSS } from '@stylesComponents/Texts';
import { ButtonTooltip } from '@components/Buttons/ButtonTooltip';
import { AddIcon, DeleteIcon } from '@stylesComponents/icons/CRUD';

type TableProjectArrayProps =
  | iTableProject['gallery']
  | iTableProject['plans']
  | iTableProject['dataSheets']
  | iTableProject['illustrative']
  | iTableProject['infos'];

type ListItem = { [key: string]: string; id: string };
type getTypeT<T> = T extends any[] ? T[number] : T;

interface ToggleInputsSectionProps<T extends TableProjectArrayProps> {
  tableListItem: T | undefined;
  onItemDelete?: (id: string) => void;
  inputsShowed: (
    props: {
      i: number;
      listItem: ListItem;
    } & getTypeT<T>,
  ) => React.ReactNode;
  setListProp: React.Dispatch<React.SetStateAction<any>>;
  title: string;
  max?: number;
  min?: number;
}

export const ToggleInputsSection = <T extends TableProjectArrayProps>({
  tableListItem,
  inputsShowed,
  setListProp,
  onItemDelete,
  title,
  max,
  min,
}: ToggleInputsSectionProps<T>) => {
  const [list, setList] = useState<ListItem[]>(
    (tableListItem as ListItem[]) || [{ id: generateId() }],
  );

  function addListItem() {
    setList((prev) => [...prev, { id: generateId() }] as ListItem[]);
  }
  function delListItem(i: number) {
    setList((prev) => {
      const newLinks = [...prev];
      if (onItemDelete) onItemDelete(newLinks[i].id);
      newLinks.splice(i, 1);
      return newLinks;
    });
  }

  useEffect(() => {
    setListProp(list as T);
  }, [setListProp, list]);

  return (
    <section>
      <SubTitleCSS>{title}</SubTitleCSS>
      <ul>
        {list.map((listItem, i) => {
          return (
            <li
              key={listItem.id}
              style={{ display: 'flex' }}
              onChange={(ev) => {
                const target = ev.target as unknown as HTMLInputElement;
                const newListItem = listItem;
                newListItem[target.id] = target.value;
              }}
            >
              {inputsShowed({
                ...(listItem as getTypeT<T>),
                i: i + 1,
                listItem,
              })}
              <span>
                <ButtonTooltip
                  label={`Deletar item da(s) ${title}`}
                  onClick={() => delListItem(i)}
                  disabled={min ? list.length <= min : undefined}
                  style={{
                    width: '3rem',
                    height: '3rem',
                    alignSelf: 'center',
                    marginLeft: '2rem',
                  }}
                >
                  <DeleteIcon />
                </ButtonTooltip>
              </span>
            </li>
          );
        })}
      </ul>
      <span>
        <ButtonTooltip
          label={`Adicionar item a ${title}`}
          onClick={() => addListItem()}
          disabled={max ? list.length >= max : list.length >= 30}
        >
          <AddIcon />
        </ButtonTooltip>
      </span>
    </section>
  );
};
