const GenerateForm = (() => {
    const state = {
        currentStep: 0,
        lastStepRendered: -1,
        data: {}
    };

    const stepsData = document.getElementById('viewStepsData')
    const steps = document.getElementById('stepsCounter')
    const backButton = document.getElementById('backButton')
    const nextButton = document.getElementById('nextButton')
    const nextButtonLabel = document.getElementById('nextButtonLabel')
    const main = document.getElementById('main')

    const createFormElement = () => {
        const activeId = document.activeElement ? document.activeElement.id : null;
        const step = config[state.currentStep];
        const isTransition = state.currentStep !== state.lastStepRendered;
        state.lastStepRendered = state.currentStep;

        const {fields, title} = step;

        steps.innerHTML = config.map((_, idx) => `
            <div class="flex items-center gap-2 group cursor-pointer shrink-0">
                <div class="step-pill w-8 h-8 rounded-xl flex items-center justify-center text-xs text-white border-2 transition-all 
                    ${idx === state.currentStep ? 'border-black text-black bg-yellow-100' : idx < state.currentStep ? 'border-green-500 bg-green-100 text-black' : 'border-black text-black cursor-not-allowed'}">
                    ${idx + 1}
                </div>
            </div>
        `).join('');

        let generateFormElement = '';
        fields.forEach(formField => {
            if (formField.dependsOn && state.data[formField.dependsOn.field] !== formField.dependsOn.value) return;
            const fieldVal = state.data[formField.id] || '';

            if (formField.type === 'custom') {
                generateFormElement += reusableUiComponents[formField.component](fieldVal, state.data);
            } else if (formField.type === 'select') {
                generateFormElement += `
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-black">${formField.label}</label>
                        <select id="${formField.id}" class="w-full p-4 border-lightgray border-2 rounded-2xl">
                            <option value="" disabled ${!fieldVal ? 'selected' : ''}>Select...</option>
                            ${formField.options.map(option => `<option value="${option.value}" ${fieldVal === option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (formField.type === 'checkbox') {
                 generateFormElement += `
                    <label class="flex items-center space-x-3 p-5 border-lightgray border-2 rounded-2xl cursor-pointer">
                        <input type="checkbox" id="${formField.id}" ${state.data[formField.id] ? 'checked' : ''} class="w-6 h-6 rounded border-black">
                        <span class="text-sm font-bold text-black">${formField.label}</span>
                    </label>
                `;
            } else {
                generateFormElement += `
                    <div class="block mb-4 space-y-2">
                        <label class="text-sm font-bold text-black">${formField.label || ''}</label>
                        <input type="${formField.type}" id="${formField.id}" value="${fieldVal}" placeholder="${formField.placeholder || ''}" class="w-full p-4 border-2 border-lightgray rounded-2xl">
                    </div>
                `;
            }
        });

        stepsData.innerHTML = `
            <div class="${isTransition ? 'step-entry-anim' : ''}">
                <p class="text-black mb-10 font-medium">${title}</p>
                <div class="space-y-6">${generateFormElement}</div>
            </div>
        `;

        backButton.disabled = state.currentStep === 0;
        nextButtonLabel.textContent = (state.currentStep === config.length - 1) ? 'Submit Application' : 'Continue';
        updateValidation();

        stepsData.querySelectorAll('input, select').forEach(element => {
            element.oninput = (e) => {
                const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                updateField(e.target.id, val);
            };
        });

        if (activeId) {
            const activeElement = document.getElementById(activeId);
            if (activeElement) {
                activeElement.focus();
            }
        }
    };

    const updateValidation = () => {
        const { fields } = config[state.currentStep];
    
        const isStepValid = fields.every(field => {
            const value = state.data[field.id] || '';
            if (field.dependsOn && state.data[field.dependsOn.field] !== field.dependsOn.value) {
                return true;
            }
            if (!field.required && !value) return true;
            if (field.id === 'passwordComp') {
                const { password, confirmPassword } = state.data;
                return password && password === confirmPassword && password.length >= 8;
            }
            return field.validate ? field.validate(value) : !!value;
        });
    
        nextButton.disabled = !isStepValid;
    };

    const updateField = (key, val) => {
        state.data[key] = val;
        const { fields } = config[state.currentStep];
    
        const keysForRerender = ['password', 'confirmPassword'];
    
        const needsRebuild = 
            keysForRerender.includes(key) || 
            fields.some(f => f.dependsOn?.field === key || (f.id === key && f.type === 'custom'));
    
        if (needsRebuild) {
            createFormElement();
        } else {
            updateValidation();
        }
    };

    return {
        start: () => {
            nextButton.onclick = () => {
                if (state.currentStep < config.length - 1) {
                    state.currentStep++;
                    createFormElement();
                    stepsData.scrollTop = 0;
                } else {
                    main.innerHTML = `
                        <div class="p-20 text-center flex flex-col items-center justify-center step-entry-anim bg-white">
                            <h2 class="text-6xl font-black text-black mb-4 tracking-tighter">Data Submitted Successfully!</h2>
                        </div>
                    `;
                }
            };
            backButton.onclick = () => { if (state.currentStep > 0) { state.currentStep--; createFormElement(); } };
            createFormElement();
        },
        updateField,
    };
})();

window.onload = () => {
    GenerateForm.start();
};