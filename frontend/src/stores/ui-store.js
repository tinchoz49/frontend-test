import { extendObservable } from 'mobx';

let singleton;

export default function UiStore(initialState = {
  title: 'Events'
}) {
  if (singleton) {
    return singleton;
  }

  singleton = extendObservable({}, initialState);

  return singleton;
}
