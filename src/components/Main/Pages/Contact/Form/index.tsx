import { createRef, useState } from 'react';
import { fetcher } from '@services/fetchers';
import { messages } from '@utils/messages';

import { Input } from '@components/Input';
import { FormBox } from '@components/FormBox';
import { Button } from '@components/Buttons/Button';
import { MailSendIcon } from '@stylesComponents/icons/MailSend';

export const Form = () => {
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const messageRef = createRef<HTMLTextAreaElement>();
  const [isLoading, setIsLoading] = useState(false);

  function submit() {
    setIsLoading(true);

    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const text = messageRef.current!.value;

    const message = {
      name,
      email,
      message: [
        `<h1><b>CONTATO por ${name} (${email})</b></h1> <br/><br/>`,
        `<h2>Mensagem:</h2><br/>${text}`,
      ].toString(),
    };

    fetcher
      .post('/api/email', message)
      .then(() => alert(messages.submit.contact))
      .catch(() => alert(messages.error.err))
      .finally(() => setIsLoading(false));
  }

  return (
    <FormBox onSubmit={() => submit()}>
      <Input label="Nome" inputReference={nameRef} />
      <Input label="Email" inputReference={emailRef} type="email" />
      <Input
        type="multiline"
        label="Mensagem"
        rows={10}
        inputReference={messageRef}
      />
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
