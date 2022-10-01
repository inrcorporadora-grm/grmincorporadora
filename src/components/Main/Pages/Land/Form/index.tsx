/* eslint-disable no-nonoctal-decimal-escape */

import { useRef, useState } from 'react';

import { Button } from '@components/Buttons/Button';
import { ButtonLink } from '@components/Buttons/ButtonLink';
import { Input } from '@components/Input';
import { FormBox } from '@components/FormBox';

import { MailSendIcon } from '@stylesComponents/icons/MailSend';
import { SubTitleCSS } from '@stylesComponents/Texts';

import { submit } from './utils/submit';

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cepField, setCepField] = useState(true);
  const formRefs = {
    telRef: useRef<HTMLInputElement>(null),
    cepRef: useRef<HTMLInputElement>(null),
    nameRef: useRef<HTMLInputElement>(null),
    cityRef: useRef<HTMLInputElement>(null),
    stateRef: useRef<HTMLInputElement>(null),
    phoneRef: useRef<HTMLInputElement>(null),
    emailRef: useRef<HTMLInputElement>(null),
    companyRef: useRef<HTMLInputElement>(null),
    addressRef: useRef<HTMLInputElement>(null),
    proposalRef: useRef<HTMLTextAreaElement>(null),
    districtRef: useRef<HTMLTextAreaElement>(null),
    imagesLinkRef: useRef<HTMLInputElement>(null),
  };

  return (
    <FormBox
      onSubmit={() => {
        setIsLoading(true);
        submit(formRefs).finally(() => setIsLoading(false));
      }}
      style={{
        '& > section > .MuiTextField-root': {
          margin: '0.5rem 0',
        },
      }}
    >
      <section>
        <Input label="Seu Nome" inputReference={formRefs.nameRef} />
        <Input
          label="Seu Email"
          inputReference={formRefs.emailRef}
          type="email"
        />
        <section style={{ display: 'flex' }}>
          <Input
            label="Telefone"
            inputReference={formRefs.telRef}
            type="tel"
            mask="(99) 9999-9999"
          />
          <Input
            label="Celular"
            inputReference={formRefs.phoneRef}
            type="tel"
            mask="+55 (99) \99999-9999"
          />
        </section>
        <Input
          label="Empresa"
          inputReference={formRefs.companyRef}
          type="text"
          required={false}
        />
      </section>
      <section>
        <SubTitleCSS>Informações do terreno</SubTitleCSS>
        <section className="cep" style={{ display: 'flex' }}>
          <Input
            label="Cep"
            inputReference={formRefs.cepRef}
            mask="99999-999"
            required={cepField}
            disabled={!cepField}
          />
          <ButtonLink active onClick={() => setCepField(!cepField)}>
            {cepField ? 'Não sei meu cep' : 'Eu sei meu cep'}
          </ButtonLink>
        </section>
        <Input
          label="Endereço"
          inputReference={formRefs.addressRef}
          type="text"
          placeholder="rua, número"
        />
        <Input
          label="Bairro"
          inputReference={formRefs.districtRef}
          type="text"
        />

        <section style={{ display: 'flex' }}>
          <Input label="Cidade" inputReference={formRefs.cityRef} type="text" />
          <Input
            label="Estado"
            inputReference={formRefs.stateRef}
            type="text"
          />
        </section>
        <Input
          label="Link das Imagens"
          inputReference={formRefs.imagesLinkRef}
          type="url"
          required={false}
        />
        <Input
          type="multiline"
          label="Sua proposta"
          rows={10}
          inputReference={formRefs.proposalRef}
        />
      </section>
      <Button
        type="submit"
        icon={<MailSendIcon />}
        styles={{ alignSelf: 'flex-end' }}
        loading={isLoading}
      >
        enviar
      </Button>
    </FormBox>
  );
};
