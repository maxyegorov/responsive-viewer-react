import { store } from '../index';
import strings from '../strings';

export default function getTranslation(view, item) {
  const state = store.getState();

  return strings[state.globals.language][view][item];
}
