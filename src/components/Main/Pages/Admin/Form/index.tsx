import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useAuthContext } from '@contexts/Auth/useAuthContext';
import { messages } from '@utils/messages';

import { Input } from '@components/Input';
import { Button } from '@components/Buttons/Button';
import { FormBox } from '@components/FormBox';

export const Form = () => {
  const { authenticateUser } = useAuthContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  function callbackError() {
    setHasError(true);
    setIsLoading(false);
    alert(messages.error.userCredentials);
  }
  async function submit() {
    setIsLoading(true);

    const credentials = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    await authenticateUser(credentials)
      .then(() => {
        router.push('/admin/dashboard');
      })
      .catch(callbackError);
  }

  return (
    <FormBox autoComplete onSubmit={() => submit()}>
      <Input
        error={hasError}
        label="Email"
        inputReference={emailRef}
        type="email"
      />
      <Input
        error={hasError}
        label="Senha"
        inputReference={passwordRef}
        type="password"
      />
      <Button
        loading={isLoading}
        type="submit"
        styles={{ alignSelf: 'center', marginTop: '2rem' }}
      >
        Entrar
      </Button>
    </FormBox>
  );
};
