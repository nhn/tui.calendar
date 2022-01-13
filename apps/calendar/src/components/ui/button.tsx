import { h } from 'preact';

import { PropsWithChildren } from '@t/components/common';

type Props = h.JSX.HTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <button {...rest} type="button">
      {children}
    </button>
  );
}
