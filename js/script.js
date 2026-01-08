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

    const refresh = () => {
        const step = config[state.currentStep];
        const isTransition = state.currentStep !== state.lastStepRendered;
        state.lastStepRendered = state.currentStep;

        steps.innerHTML = config.map((s, idx) => `
            <div class="flex items-center gap-2 group cursor-pointer shrink-0" onclick="WizardEngine.jumpTo(${idx})">
                <div class="step-pill w-8 h-8 rounded-xl flex items-center justify-center text-xs text-white border-2 transition-all 
                    ${idx === state.currentStep ? 'active' : idx < state.currentStep ? 'border-green-500 bg-green-100 text-black' : 'border-slate-800 text-slate-600 cursor-not-allowed'}">
                    ${idx + 1}
                </div>
            </div>
        `).join('');

        let generateFormElement = '';
        step.fields.forEach(formField => {
            if (formField.dependsOn && state.data[formField.dependsOn.field] !== formField.dependsOn.value) return;
            const fieldVal = state.data[formField.id] || '';

            if (formField.type === 'custom') {
                generateFormElement += reusableUiComponents[formField.component](fieldVal, state.data);
            } else if (formField.type === 'select') {
                generateFormElement += `
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-slate-700">${formField.label}</label>
                        <select id="${formField.id}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100">
                            <option value="" disabled ${!fieldVal ? 'selected' : ''}>Select...</option>
                            ${formField.options.map(o => `<option value="${o.value}" ${fieldVal === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (formField.type === 'checkbox') {
                 generateFormElement += `
                    <label class="flex items-center space-x-3 p-5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                        <input type="checkbox" id="${formField.id}" ${state.data[formField.id] ? 'checked' : ''} class="w-6 h-6 rounded text-blue-600 border-slate-300">
                        <span class="text-sm font-bold text-slate-700">${formField.label}</span>
                    </label>
                `;
            } else {
                generateFormElement += `
                    <div class="${formField.halfWidth ? 'inline-block w-[calc(50%-12px)] mr-2' : 'block mb-4'} space-y-2">
                        <label class="text-sm font-bold text-slate-700">${formField.label || ''}</label>
                        <input type="${formField.type}" id="${formField.id}" value="${fieldVal}" placeholder="${formField.placeholder || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all">
                    </div>
                `;
            }
        });

        stepsData.innerHTML = `
            <div class="${isTransition ? 'step-entry-anim' : ''}">
                <p class="text-slate-500 mb-10 font-medium">${step.title}</p>
                <div class="space-y-6">${generateFormElement}</div>
            </div>
        `;

        backButton.disabled = state.currentStep === 0;
        nextButtonLabel.textContent = (state.currentStep === config.length - 1) ? 'Submit Application' : 'Continue';
        updateValidation();

        stepsData.querySelectorAll('input, select').forEach(el => {
            el.oninput = (e) => {
                const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                updateField(e.target.id, val);
            };
        });
    };

    const updateValidation = () => {
        const step = config[state.currentStep];
        const isValid = step.fields.every(formField => {
            if (formField.dependsOn && state.data[formField.dependsOn.field] !== formField.dependsOn.value) return true;
            if (!formField.required) return true;
            const val = state.data[formField.id] || '';
            if (formField.validate) return formField.validate(val);
            if (formField.id === 'securityBlock') return !!state.data.password && state.data.password === state.data.confirmPassword && state.data.password.length >= 8;
            return !!val;
        });
        nextButton.disabled = !isValid;
    };

    const updateField = (key, val) => {
        state.data[key] = val;
        const step = config[state.currentStep];
        const isReactive = step.fields.some(formField => formField.dependsOn?.field === key) || 
                           step.fields.some(formField => formField.id === key && formField.type === 'custom') ||
                           ['password', 'confirmPassword', 'state', 'otp'].includes(key);

        if (isReactive) refresh();
        else updateValidation();
    };

    const jumpTo = (i) => { if (i < state.currentStep) { state.currentStep = i; refresh(); } };

    return {
        start: () => {
            nextButton.onclick = () => {
                if (state.currentStep < config.length - 1) {
                    state.currentStep++;
                    refresh();
                    stepsData.scrollTop = 0;
                } else {
                    main.innerHTML = `
                        <div class="p-20 text-center flex flex-col items-center justify-center step-entry-anim bg-white">
                            <h2 class="text-6xl font-black text-slate-900 mb-4 tracking-tighter">Data Submitted Successfully!</h2>
                        </div>
                    `;
                }
            };
            backButton.onclick = () => { if (state.currentStep > 0) { state.currentStep--; refresh(); } };
            refresh();
        },
        updateField,
        jumpTo
    };
})();

window.onload = () => {
    GenerateForm.start();
};