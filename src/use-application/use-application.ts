import { Controller } from 'stimulus'

export const useApplication = (controller: Controller) => {
  Object.assign(controller, {
    dispatch(
      eventName: String,
      { target = controller.element, detail = {}, bubbles = true, cancelable = true } = {},
    ): CustomEvent {
      // include the emitting controller in the event detail
      Object.assign(detail, { controller })

      const type = `${controller.identifier}:${eventName}`
      const event = new CustomEvent(type, { detail, bubbles, cancelable })
      target.dispatchEvent(event)
      return event
    },
    metaValue(name: string) {
      const element = document.head.querySelector(`meta[name="${name}"]`)
      return element && element.getAttribute('content')
    },
    get isPreview(): boolean {
      return document.documentElement.hasAttribute('data-turbolinks-preview')
    },
    get csrfToken() {
      return this.metaValue('csrf-token')
    },
  })
}
