import { ViewListMap } from './option';

interface ToolbarProps {
  viewName: string;
  components: ViewListMap;
  go: (viewName: string) => void;
}
