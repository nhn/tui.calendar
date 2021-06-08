import { h, FunctionComponent } from 'preact';
import Template from '@src/components/template';

interface ExceedCountButtonProps {
  number: number;
  clickHandler: () => void;
  className: string;
}

const ExceedCountButton: FunctionComponent<ExceedCountButtonProps> = ({
  number,
  clickHandler,
  className,
}) => {
  if (!number) {
    return null;
  }

  return (
    <button type="button" onClick={clickHandler} className={className}>
      <Template template="monthGridHeaderExceed" model={number} />
    </button>
  );
};

export default ExceedCountButton;
