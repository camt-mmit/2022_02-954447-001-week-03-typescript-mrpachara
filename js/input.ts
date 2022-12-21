import { CommandComponent, ResultComponent } from './types';

function computeTotal(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
) {
  const total = [...inputsContainer.querySelectorAll('.cmp-input-container')]
    .map((elem) => elem.querySelector<HTMLInputElement>('.cmp-input'))
    .reduce((carry, elem) => carry + (elem?.valueAsNumber ?? 0), 0);

  resultComponent.value = `${total}`;
}

function rebuildIndex(inputsContainer: HTMLElement) {
  const inputContainers = [
    ...inputsContainer.querySelectorAll<HTMLElement>('.cmp-input-container'),
  ];

  inputContainers.forEach((elem, i) => {
    [...elem.querySelectorAll<HTMLElement>('.cmp-input-no')].forEach((elem) => {
      elem.innerText = `${i + 1}`;
    });
  });

  [
    ...inputsContainer.querySelectorAll<CommandComponent>('.cmd-remove-input'),
  ].forEach((elem) => {
    elem.disabled = !(inputContainers.length > 1);
  });
}

function add(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  template: HTMLTemplateElement,
) {
  const fragment = template.content.cloneNode(true);

  inputsContainer.append(fragment);

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

function remove(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  inputContainer: HTMLElement,
) {
  inputContainer.remove();

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

export function assign(
  inputSection: HTMLElement,
  inputTemplate: HTMLTemplateElement,
) {
  const inputsContainer = inputSection.querySelector<HTMLElement>(
    '.cmp-inputs-container',
  );

  if (!inputsContainer) {
    throw new Error(
      'Element.cmp-inputs-container is not found in input section tree.',
    );
  }

  const resultComponent =
    inputSection.querySelector<ResultComponent>('.cmp-result');

  if (!resultComponent) {
    throw new Error('Element.cmp-result is not found in input section tree.');
  }

  inputSection.addEventListener('click', (ev) => {
    if (
      ev.target &&
      ev.target instanceof HTMLElement &&
      ev.target.matches('.cmd-add-input')
    ) {
      add(inputsContainer, resultComponent, inputTemplate);
    }
  });

  inputsContainer.addEventListener('change', (ev) => {
    if (
      ev.target &&
      ev.target instanceof HTMLElement &&
      ev.target.matches('input[type="number"]')
    ) {
      computeTotal(inputsContainer, resultComponent);
    }
  });

  inputsContainer.addEventListener('click', (ev) => {
    if (
      ev.target &&
      ev.target instanceof HTMLElement &&
      ev.target.matches('.cmd-remove-input')
    ) {
      const inputContainer = ev.target.closest<HTMLElement>(
        '.cmp-input-container',
      );

      if (!inputContainer) {
        throw new Error(
          'Element.cmp-inputs-container is not found in parents tree of Element.cmd-remove-input.',
        );
      }
      remove(inputsContainer, resultComponent, inputContainer);
    }
  });

  add(inputsContainer, resultComponent, inputTemplate);
}
