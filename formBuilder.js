(function () {
    class FormBuilder {
        constructor(formContainer, formResults, formArguments) {
            this._formContainer = formContainer;
            this._formResults = formResults;
            this._formArguments = JSON.parse(JSON.stringify(formArguments));
            this._formElement = new FormElement();
            this.renderForm();
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
                }
                this.form = document.createElement('form');
                this.form.id = "form";
                this.form.method = "post";
                this._formContainer.append(this.form);
                this.renderCategories();
                for (let element of this._formArguments) {
                    this._formElement.renderElement.call(this, element);
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
        }

        renderCategories() {
            let idMark = 0;
            for (let category of this.categories) {
                let categoryDiv = document.createElement('div');
                categoryDiv.id = `categoryDiv_${idMark}`
                categoryDiv.class = "categoryDiv";
                let categoryHeader = document.createElement('h3');
                categoryHeader.class = "categoryHeader";
                categoryHeader.innerHTML = category;
                categoryDiv.append(categoryHeader);
                this.form.append(categoryDiv);
                idMark++;
            }
        }
        displayFormData(event) {
            event.preventDefault();
            validateData();
            let submitteddata = document.createElement('div');
            submitteddata.id = "submitteddata";
            this._formResults.append(submitteddata);
            let inputElements = document.getElementsByTagName('input');
            let selectElements = document.getElementsByTagName('select');
            let buttonElements = document.getElementsByTagName('button');
            let labels = document.getElementsByTagName('label');
            inputElements = [...inputElements, ...selectElements, ...buttonElements];
            let inputArray = Array.from(inputElements);
            let labelArray = Array.from(labels);

            for (let element of this._formArguments) {
                if (element.type !== "submit") {
                    let label, input;
                    label = labelArray.find(item => item.htmlFor === element.name);
                    if (label) {
                        submitteddata.insertAdjacentHTML("beforeend", `<text>${label.textContent} : </text>`);
                    }
                    input = inputArray.find(item => item.name === element.name);
                    submitteddata.insertAdjacentHTML("beforeend", `<text>${input.value}</text> </br>`);
                }
            }
            this.form.reset();
        }
    }

    window.FormBuilder = FormBuilder;
})(); 