import { ComponentType } from 'preact';
import { Option } from '@src/model';

type Options = Option; // @TODO: Option 정의 필요

interface ViewInfoUserInput {
  component: ComponentType;
  router?: {
    linkTitle: string;
  };
}

type ViewListMap = {
  [key: string]: ViewInfoUserInput;
};
