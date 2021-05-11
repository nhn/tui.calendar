import { h, FunctionComponent } from 'preact';

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

  // @TODO: 템플릿 적용 필요
  return (
    <button type="button" onClick={clickHandler} className={className}>
      {number} More
    </button>
  );
};

export default ExceedCountButton;
