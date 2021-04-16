import { FunctionComponent } from 'preact';
import { Option } from '@src/model';
import { Modules } from '@src/prototyping/modules';

type ValueOf<T> = T[keyof T];

type GetStateType<T> = T extends (...args: any) => infer R ? R : T;

type InitStoreData = {
  options: Option;
};

type TodoItem = {
  id: string;
  text: string;
  done: boolean;
};

type TodoState = {
  input: string;
  todos: TodoItem[];
};

type CounterState = { number: number };

interface ViewInfoUserInput {
  component: FunctionComponent;
  router?: {
    linkTitle: string;
  };
}

type ViewListMap = {
  [key: string]: ViewInfoUserInput;
};

export type CalendarState = {
  [key in keyof Modules]: GetStateType<Modules[key]['state']>;
};

export type CalendarAction = {
  [key in keyof Modules]: Modules[key]['actions'];
};

interface ViewButton {
  name: string;
  value: string;
}
