import { ConfigInterface } from '../../config/contract';
import Switch from '../UI/Switch';

const LABEL_EASY_MODE = 'Easy Mode';

class SelectPlayMode extends Switch {
  constructor(config: ConfigInterface) {
    super({ label: LABEL_EASY_MODE });
    const { x, y } = config.selectEasyModePosition;
    this.position.set(x, y);
  }
}

export default SelectPlayMode;
