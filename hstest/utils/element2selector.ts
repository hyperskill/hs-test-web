import type { ElementHandle } from 'puppeteer';

/**
 * Generate a CSS selector for the given element.
 * Logic is based on acot-a11y/puppeteer-element2selector.
 */
export const element2selector = async (element: ElementHandle): Promise<string> => {
  if (!element) throw new Error('Invalid element');

  return await element.evaluate((el: Element) => {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) {
      throw new Error('Invalid element');
    }

    function escapeClass(cls: string) {
      return cls.replace(/([.!#$%&'*+\-/:;<=>?@[\]^`{|}~])/g, '$1');
    }

    function getSelector(element: Element): string {
      // id (if unique)
      if (element.id) {
        const elementsWithId = document.querySelectorAll('#' + CSS.escape(element.id));
        if (elementsWithId.length === 1) {
          return `#${CSS.escape(element.id)}`;
        } else if (elementsWithId.length > 1) {
          throw new Error('Make sure your elements don\'t have duplicated id attribute');
        }
      }
      let selector = element.tagName.toLowerCase();
      // classes
      if (element.classList.length > 0) {
        selector += Array.from(element.classList)
          .map(cls => '.' + escapeClass(cls))
          .join('');
      }
      // nth-of-type (only if there are siblings with the same tag and classes/id)
      if (
        element.parentElement &&
        element.tagName.toLowerCase() !== 'html' &&
        element.tagName.toLowerCase() !== 'body'
      ) {
        const parent = element.parentElement;
        // Collect selector for comparison
        let baseSelector = element.tagName.toLowerCase();
        if (element.classList.length > 0) {
          baseSelector += Array.from(element.classList)
            .map(cls => '.' + escapeClass(cls))
            .join('');
        }
        if (element.id) {
          baseSelector += `#${CSS.escape(element.id)}`;
        }
        const siblings = Array.from(parent.children).filter((el) => {
          const sib = el as Element;
          let sibSelector = sib.tagName.toLowerCase();  
          if (sib.classList.length > 0) {
            sibSelector += Array.from(sib.classList)
              .map(cls => '.' + escapeClass(cls))
              .join('');
          }
          if (sib.id) {
            sibSelector += `#${CSS.escape(sib.id)}`;
          }
          return sibSelector === baseSelector;
        });
        if (siblings.length > 1) {
          const index = siblings.indexOf(element);
          if (index > 0) {
            selector += `:nth-of-type(${index + 1})`;
          }
        }
      }
      return selector;
    }

    const path: string[] = [];
    let current: Element | null = el;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      const selector = getSelector(current);
      path.unshift(selector);
      // If unique id is found, path is built, and we can finish
      if (selector.startsWith('#')) break;
      current = current.parentElement;
    }
    return path.join(' > ');

  });
};
