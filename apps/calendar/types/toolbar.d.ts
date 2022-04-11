import type { ViewListMap } from '@t/options';

interface ToolbarProps {
  viewName: string;
  components: ViewListMap;
  go: (viewName: string) => void;
}
