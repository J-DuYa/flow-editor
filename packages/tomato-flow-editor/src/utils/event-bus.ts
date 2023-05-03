export default class EventBus {
  events: {
    [name: string]: Function;
  } = {}

  subscribe (type: string, event: Function = () => { console.log('监听') }) {
    this.events[type] = event
  }

  // 通知
  notify(type: any, values: any = {}) {
    this.events[type](values)
  }

  unSubscribe(type: any) {
    delete this.events[type]
  }

  getEvent() {
    return this.events
  }
}