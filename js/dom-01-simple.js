"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const inputs = [
        ...document.querySelectorAll('.cmp-inputs-container input[type="number"]'),
    ];
    inputs.forEach((elem) => {
        elem.addEventListener('change', () => {
            const total = inputs.reduce((carry, elem) => carry + elem.valueAsNumber, 0);
            const resultComponent = document.querySelector('.cmp-result');
            if (resultComponent) {
                resultComponent.value = `${total}`;
            }
        });
    });
});
