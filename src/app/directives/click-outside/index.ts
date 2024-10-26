import type { DirectiveBinding } from 'vue';

interface ClickOutsideHTMLElement extends HTMLElement {
  clickOutside: (event: Event) => void;
}

export const clickOutside = {
  mounted(el: HTMLElement, { value }: DirectiveBinding) {
    const element = el as ClickOutsideHTMLElement;

    element.clickOutside = (event: Event) => {
      if (!(element === event.target || element.contains(event.target as Node))) {
        value(event);
      }
    }

    document.body.addEventListener('click', element.clickOutside, true);
  },
  unmounted(element: ClickOutsideHTMLElement) {
    document.body.removeEventListener('click', element.clickOutside, true);
  }
}
