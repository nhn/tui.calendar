import { Component } from 'preact';
import { InstanceContext } from '@src/model/context';
import { AppContext } from '@src/model';

export default abstract class ContextComponent<P = {}, S = {}> extends Component<P, S> {
  static contextType = InstanceContext;

  context!: AppContext;
}
