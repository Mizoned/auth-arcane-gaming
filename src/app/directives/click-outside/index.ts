import type { DirectiveBinding } from 'vue';

interface ClickOutsideElement extends HTMLElement {
  clickOutside: (event: Event) => void;
}

export default {
  name: 'click-outside',
  mounted(el: HTMLElement, { value }: DirectiveBinding) {
    const element = el as ClickOutsideElement;

    element.clickOutside = (event: Event) => {
      if (!(element === event.target || element.contains(event.target as Node))) {
        value(event);
      }
    }

    document.body.addEventListener('click', element.clickOutside, true);
  },
  unmounted(element: ClickOutsideElement) {
    document.body.removeEventListener('click', element.clickOutside, true);
  }
};
