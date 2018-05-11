(function () {
    class FormBuilder {
        constructor(formContainer, formArguments) {
            this._formContainer = formContainer;
            this._formArguments = JSON.parse(JSON.stringify(formArguments));
            this._formElement = new FormElement(); this.renderForm();
        }
        validateArguments() {
            let submitPresent = false;
            let invalidArgs = [];
            for (let element of this._formArguments) {
                if (element.type === "submit") {
                    submitPresent = true;
                }
                if (!this._formElement.validateElement(element)) {
                    invalidArgs.push(`Invalid input type for ${element.name}`);
                }
            }
            if (submitPresent === false) {
                invalidArgs.unshift(`No Submit Button Present`);
            }
            return invalidArgs;
        }
        renderForm() {
            let invalidArgs = this.validateArguments();
            if (invalidArgs.length === 0) {
                let children = [];
                this.findCategories();
                for (let i = 0; i < this.categories.length; i++) {
                    children[i] = this.categorized.filter(item => item.category === this.categories[i]);
                    //console.log(children[i]); 
                }
                let form = document.createElement('form');
                form.id = "form";
                let idMark = 0;
                formContainer.append(form);
                for (let category of this.categories) {
                    let categoryDiv = document.createElement('div');
                    categoryDiv.id = `categoryDiv_${idMark}`
                    categoryDiv.class = "categoryDiv";
                    let categoryHeader = document.createElement('h3');
                    categoryHeader.class = "categoryHeader";
                    categoryHeader.innerHTML = category;
                    categoryDiv.append(categoryHeader);
                    form.append(categoryDiv);
                    idMark++;
                }
                for (let element of this._formArguments) {
                    let el = document.createElement('input');
                    el.id = el.name;
                    el.type = element.type;
                    el.name = element.name;
                    if (element.type === "submit") {
                        el.value = element.value || 'Submit';
                        let action = element.action || this.displayFormData;
                        form.addEventListener("submit", action);
                    }
                    else {
                        if ("label" in element) {
                            el.label = element.label;
                        }
                        if ("placeholder" in element && element.type === "text") {
                            el.placeholder = element.placeholder;
                        }
                        if (("required" in element) && element.required) {
                            el.required = true;
                        }
                        if ("size" in element && element.type === "text") {
                            el.size = element.size;
                        }
                    }
                    if (element.type === "select") {
                        for (let option in element.options) {
                            let op = new Option(option, option);
                            el.append(op);
                        }
                        if (element.selected) {
                            el.value = element.selected;
                        }
                    }
                    if (this.categorized.includes(element)) {
                        let index = this.categories.indexOf(element.category);
                        document.getElementById(`categoryDiv_${index}`).append(el);
                    }
                    else {
                        form.append(element);
                    }
                    //add el to DOM
                    if ("validation" in element) {
                        el.addEventListener("change", element.validation);
                    }
                }
            }
            else {
                alert(`Invalid arguments: ${invalidArgs} `)
            }
        }
        findCategories() {
            this.categorized = this._formArguments.filter((item) => ("category" in item));
            this.uncategorized = this._formArguments.filter((item) => !("category" in item));
            let flags = [];
            this.categories = [];
            let l = this.categorized.length, i;
            for (i = 0; i < l; i++) {
                if (flags[this.categorized[i].category])
                    continue;
                flags[this.categorized[i].category] = true;
                this.categories.push(this.categorized[i].category);
            }
            console.log(this.categorized);
            console.log(this.uncategorized);
            console.log(this.categories);
        }
        actOnFormSubmit() {
            //if server validation present,do that 
            //else this.displayFormData(); 
        }
        validateformInput() {
            //for each argument in array 
            this._formElement.validatefieldInput();
        }
        displayFormData() {

        }
    }

    window.FormBuilder = FormBuilder;
})(); 