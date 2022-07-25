import { h } from 'preact';

import { useClickPrevention } from '@src/hooks/common/useClickPrevention';
import { fireEvent, render, screen } from '@src/test/utils';

describe('useClickPrevention', () => {
  const onClick = jest.fn();
  const onDblClick = jest.fn();
  const delay = 300;

  const Button = () => {
    const [handleClick, handleDoubleClick] = useClickPrevention({ onClick, onDblClick, delay });

    return <button onClick={handleClick} onDblClick={handleDoubleClick} />;
  };

  beforeEach(() => {
    render(<Button />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should prevent the click event on double click.', () => {
    // Given
    const button = screen.getByRole('button');

    // When
    fireEvent.dblClick(button);

    // Then
    expect(onClick).not.toHaveBeenCalled();
    expect(onDblClick).toHaveBeenCalled();
  });

  it('should fire the click event when the second click fires later than delay.', () => {
    // Given
    jest.useFakeTimers();
    const button = screen.getByRole('button');

    // When
    fireEvent.click(button);
    jest.advanceTimersByTime(delay + 30);
    fireEvent.click(button);
    jest.advanceTimersByTime(delay + 50);

    // Then
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onDblClick).not.toHaveBeenCalled();
  });
});
