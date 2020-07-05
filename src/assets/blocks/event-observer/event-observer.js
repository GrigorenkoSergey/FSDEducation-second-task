export default class EventObserver {
  // every subscriber should have method "update(eventType, data)"
  constructor() {
    this.observers = {};
  }

  addSubscriber(eventType, obj) {
    this.observers[eventType] = this.observers[eventType] || [];
    this.observers[eventType].push(obj);
  }

  removeSubscriber(eventType, obj) {
    if (!this.observers[eventType]) return;
    this.observers[eventType] = this.observers[eventType]
      .filter((subscriber) => subscriber !== obj);
  }

  broadcast(eventType, data) {
    if (!this.observers[eventType]) return;
    this.observers[eventType]
      .forEach((subscriber) => {
        if (subscriber) {
          subscriber.update(eventType, data);
        }
      });
  }
}
