/**
 *
 * @param element is the element to find the children to toggle className
 * @param type is the current status of toggle, or add disabled class or remove disabled class
 * @param disabledClasses is an optional param to inspect the function ho is the element and your disable class like (`'element(disable-class)'`)
 */

export function toggleClassNameFocusableItems(
  element: HTMLElement,
  type: 'hidden' | 'visible',
  disabledClasses?: string,
) {
  const items = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]',
  );
  const disabledElements: {
    element: string;
    className: string;
  }[] = [];

  if (disabledClasses) {
    const disabledClassesSplit = disabledClasses.split('(');
    disabledClassesSplit.forEach((text, i, arr) => {
      if (i % 2 !== 0) {
        disabledElements.push({
          element: text.replace(')', ''),
          className: arr[i - 1],
        });
      }
    });

    disabledElements.forEach((disabledElement) => {
      const elements = element.querySelectorAll(disabledElement.element);

      elements.forEach((item) => {
        if (type === 'hidden') item.classList.add(disabledElement.className);
        else item.classList.remove(disabledElement.className);
      });
    });
  }
  if (type === 'hidden') {
    items.forEach((item) => {
      item.classList.add('item-disabled');
    });
  } else {
    items.forEach((item) => {
      item.classList.remove('item-disabled');
    });
  }
}
