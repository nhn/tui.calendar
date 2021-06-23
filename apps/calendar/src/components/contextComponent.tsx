import { Component } from 'preact';

import { AppContext } from '@src/model';
import { InstanceContext } from '@src/model/context';

export default abstract class ContextComponent<P = {}, S = {}> extends Component<P, S> {
  static contextType = InstanceContext;

  context!: AppContext;
}
