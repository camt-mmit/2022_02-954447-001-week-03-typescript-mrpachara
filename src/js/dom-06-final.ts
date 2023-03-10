import { assign as assignInput } from './input.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputTemplate =
    document.querySelector<HTMLTemplateElement>('template#tmp-input');

  if (!inputTemplate) {
    throw new Error('HTMLTemplate#tmp-input is not found in document.');
  }

  const inputSection =
    document.querySelector<HTMLElement>('.cmp-input-section');

  if (!inputSection) {
    throw new Error('Element.cmp-input-section not found in document tree.');
  }

  assignInput(inputSection, inputTemplate);
});
