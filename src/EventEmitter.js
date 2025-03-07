export class EventEmitter {
  #listeners = new Map();

  addEventListener(type, listener) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }
    const listenerSet = this.#listeners.get(type);
    listenerSet.add(listener);
  }

  emit(type) {
    const listenerSet = this.#listeners.get(type);
    if (listenerSet) {
      listenerSet.forEach(listener => {
        listener.call(this);
      });
    }
  }

  removeEventListener(type, listener) {
    this.#listeners.get(type)?.delete(listener);
  }
}
