import * as PIXI from 'pixi.js';
import Button from '../Button';
import { State, SwitchConstructorParams } from './contract';

import UISwitchActive from './assets/active.png';
import UISwitchInactive from './assets/inactive.png';
import UISwitchDisabled from './assets/disabled.png';

class Switch extends Button {
  private state: State = State.OFF;

  protected label: PIXI.Text;

  /**
   * A parent class constructor does not access/see child class properties
   * See https://github.com/microsoft/TypeScript/issues/1617
   *
   * Workaround: In your child constructor, after calling super() access the label property and update it
   * (this.label.style = ...)
   */
  protected labelStyle: Partial<PIXI.TextStyle> = {
    fontSize: 16,
    fill: '#248FEA'
  };

  constructor(params: SwitchConstructorParams) {
    super({
      activeTexture: PIXI.Texture.from('UISwitchActive'),
      inactiveTexture: PIXI.Texture.from('UISwitchInactive'),
      disabledTexture: PIXI.Texture.from('UISwitchDisabled'),
      ...params
    });

    const { state = State.OFF, label = '' } = params;
    this.setState(state);

    this.label = new PIXI.Text(label, this.labelStyle);
    this.label.position.set(-100, 4);
    this.addChild(this.label);

    this.on('click', () => this.switchState());
  }

  setState(state: State) {
    this.state = state;
    if (this.state === State.ON) this.setActive();
    else this.setInactive();
  }

  switchState() {
    const newState = this.isOn() ? State.OFF : State.ON;
    this.setState(newState);
    return newState;
  }

  isOn() {
    return this.state === State.ON;
  }

  isOFF() {
    return this.state === State.OFF;
  }

  setLabel(label: string) {
    this.label.text = label;
  }
}

PIXI.Loader.shared.add('UISwitchActive', UISwitchActive);
PIXI.Loader.shared.add('UISwitchInactive', UISwitchInactive);
PIXI.Loader.shared.add('UISwitchDisabled', UISwitchDisabled);

export default Switch;
