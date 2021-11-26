import { useState } from 'preact/hooks';

export function useDropdownState() {
  const [isOpened, setOpened] = useState(false);
  const toggleDropdown = () => setOpened((prev) => !prev);

  return { isOpened, setOpened, toggleDropdown };
}
