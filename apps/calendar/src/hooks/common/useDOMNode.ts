import type { RefCallback } from 'preact';
import { useCallback, useState } from 'preact/hooks';

export function useDOMNode<Node extends HTMLElement>(): [Node | null, RefCallback<Node>] {
  const [node, setNode] = useState<Node | null>(null);
  const setNodeRef: RefCallback<Node> = useCallback((ref) => {
    if (ref) {
      setNode(ref);
    }
  }, []);

  return [node, setNodeRef];
}
