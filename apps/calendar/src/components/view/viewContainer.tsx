import { FunctionComponent, h } from 'preact';

import { useRouter } from '@src/components/hooks/router';

export const ViewContainer: FunctionComponent = () => {
  const { getCurrentComponent } = useRouter();
  const ViewComponent = getCurrentComponent();

  if (!ViewComponent) {
    return null;
  }

  return <ViewComponent />;
};

export default ViewContainer;
