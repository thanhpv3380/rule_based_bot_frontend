import * as React from 'react';
import {
  CanvasWidget,
  Action,
  ActionEvent,
  InputType,
} from '@projectstorm/react-canvas-core';

interface CustomDeleteItemsActionOptions {
  keyCodes?: number[];
}
export class CustomDeleteItemsAction extends Action {
  constructor(options: CustomDeleteItemsActionOptions = {}) {
    options = {
      keyCodes: [46, 8],
      ...options,
    };
    super({
      type: InputType.KEY_DOWN,
      fire: (event: ActionEvent<any>) => {
        // console.log(event.event.keyCode);
        // console.log(
        //   options.keyCodes.indexOf(event.event.keyCode),
        //   options.keyCodes,
        // );

        if (options.keyCodes.indexOf(event.event.keyCode) >= 0) {
          console.log('disable');
          // this.engine.repaintCanvas();
        }
      },
    });
  }
}
