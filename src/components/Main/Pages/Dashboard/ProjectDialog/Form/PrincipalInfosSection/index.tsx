import type { iImage } from 'types/iImage';

import { ImageInputs } from '@components/ImageInputs';
import { Select } from '@components/Input/Select';
import { Input } from '@components/Input';
import { SubTitleCSS } from '@stylesComponents/Texts';

type References =
  | 'projectStatus'
  | 'localeType'
  | 'dimensions'
  | 'address'
  | 'state'
  | 'name'
  | 'city'
  | 'description';

interface PrincipalInfosSectionProps {
  inputsReference: {
    [key in References]: {
      value: string;
      set: (value: string) => void;
    };
  } & {
    image: {
      value: iImage;
      set: React.Dispatch<React.SetStateAction<iImage>>;
    };
  };
}

export const PrincipalInfosSection = ({
  inputsReference,
}: PrincipalInfosSectionProps) => {
  return (
    <section>
      <SubTitleCSS style={{ margin: '1rem 0' }}>
        Informações Principais
      </SubTitleCSS>

      <div style={{ display: 'flex' }}>
        <Select
          defaultValue={inputsReference.projectStatus.value ?? 'new'}
          inputLabel="Status do Projeto"
          onChange={(ev) => inputsReference.projectStatus.set(ev.target.value)}
          menuItems={[
            {
              key: 'new',
              label: 'Em Andamento',
            },
            {
              key: 'delivered',
              label: 'Entregue',
            },
          ]}
        />
        <Input
          label="Nome do Projeto"
          onInput={(ev) =>
            inputsReference.name.set((ev.target as HTMLInputElement).value)
          }
          defaultValue={inputsReference.name.value || ''}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Input
          label="Tipo do Local"
          defaultValue={inputsReference.localeType.value || ''}
          onInput={(ev) =>
            inputsReference.localeType.set(
              (ev.target as HTMLInputElement).value,
            )
          }
          placeholder="Condomínio, Office, Reserva..."
          required={false}
        />
        <Input
          label="Dimensões"
          defaultValue={inputsReference.dimensions.value || ''}
          onInput={(ev) =>
            inputsReference.dimensions.set(
              (ev.target as HTMLInputElement).value,
            )
          }
          placeholder="50m por 50m ou 50m²"
        />
      </div>

      <div style={{ display: 'flex' }}>
        <Input
          label="Cidade"
          defaultValue={inputsReference.city.value || ''}
          onInput={(ev) =>
            inputsReference.city.set((ev.target as HTMLInputElement).value)
          }
          placeholder="Sorocaba"
        />
        <Input
          label="Estado (sigla)"
          defaultValue={inputsReference.state.value || ''}
          onInput={(ev) =>
            inputsReference.state.set((ev.target as HTMLInputElement).value)
          }
          mask="aa"
          placeholder="SP"
          style={{ width: '40%' }}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Input
          label="Endereço"
          defaultValue={inputsReference.address.value || ''}
          onInput={(ev) =>
            inputsReference.address.set((ev.target as HTMLInputElement).value)
          }
          placeholder="bairro, rua, número"
        />
      </div>

      <Input
        type="multiline"
        label="Descrição do projeto"
        defaultValue={inputsReference.description.value || ''}
        onInput={(ev) => {
          inputsReference.description.set(
            (ev.target as HTMLTextAreaElement).value,
          );
        }}
        rows={10}
      />

      <div
        style={{ display: 'flex' }}
        onChange={(ev) => {
          const target = ev.target as unknown as HTMLInputElement;
          inputsReference.image.set((prev) => {
            const newImage = prev;
            newImage[target.id as 'alt'] = target.value;
            return newImage;
          });
        }}
      >
        <ImageInputs
          {...inputsReference.image}
          onPrepareFile={undefined}
          label="Descrição da Imagem Destaque"
        />
      </div>
    </section>
  );
};
