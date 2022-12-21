function computeTotal(inputsContainer, resultComponent) {
    const total = [...inputsContainer.querySelectorAll('.cmp-input-container')]
        .map((elem) => elem.querySelector('.cmp-input'))
        .reduce((carry, elem) => carry + (elem?.valueAsNumber ?? 0), 0);
    resultComponent.value = `${total}`;
}
function rebuildIndex(inputsContainer) {
    const inputContainers = [
        ...inputsContainer.querySelectorAll('.cmp-input-container'),
    ];
    inputContainers.forEach((elem, i) => {
        [...elem.querySelectorAll('.cmp-input-no')].forEach((elem) => {
            elem.innerText = `${i + 1}`;
        });
    });
    [
        ...inputsContainer.querySelectorAll('.cmd-remove-input'),
    ].forEach((elem) => {
        elem.disabled = !(inputContainers.length > 1);
    });
}
function add(inputsContainer, resultComponent, template) {
    const fragment = template.content.cloneNode(true);
    inputsContainer.append(fragment);
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
function remove(inputsContainer, resultComponent, inputContainer) {
    inputContainer.remove();
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
export function assign(inputSection, inputTemplate) {
    const inputsContainer = inputSection.querySelector('.cmp-inputs-container');
    if (!inputsContainer) {
        throw new Error('Element.cmp-inputs-container is not found in input section tree.');
    }
    const resultComponent = inputSection.querySelector('.cmp-result');
    if (!resultComponent) {
        throw new Error('Element.cmp-result is not found in input section tree.');
    }
    inputSection.addEventListener('click', (ev) => {
        if (ev.target &&
            ev.target instanceof HTMLElement &&
            ev.target.matches('.cmd-add-input')) {
            add(inputsContainer, resultComponent, inputTemplate);
        }
    });
    inputsContainer.addEventListener('change', (ev) => {
        if (ev.target &&
            ev.target instanceof HTMLElement &&
            ev.target.matches('input[type="number"]')) {
            computeTotal(inputsContainer, resultComponent);
        }
    });
    inputsContainer.addEventListener('click', (ev) => {
        if (ev.target &&
            ev.target instanceof HTMLElement &&
            ev.target.matches('.cmd-remove-input')) {
            const inputContainer = ev.target.closest('.cmp-input-container');
            if (!inputContainer) {
                throw new Error('Element.cmp-inputs-container is not found in parents tree of Element.cmd-remove-input.');
            }
            remove(inputsContainer, resultComponent, inputContainer);
        }
    });
    add(inputsContainer, resultComponent, inputTemplate);
}
