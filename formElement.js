(function () {
    class FormElement {
        constructor() {

        }
        renderElement(element) {
            let el, l;
            el = (element.type === "select") ? document.createElement('select') : document.createElement('input');
            el.id = element.name;
            if (element.type !== "select")
                el.type = element.type;
            el.name = element.name;
            if (element.type === "submit") {
                el.value = element.value || 'Submit';
                this.form.addEventListener("submit", this.displayFormData.bind(this));
            }
            else {
                if ("placeholder" in element && element.type === "text")
                    el.placeholder = element.placeholder;
                if (("required" in element) && element.required)
                    el.required = true;
                if ("size" in element && element.type === "text")
                    el.size = element.size;
            }
            if (element.type === "select" && element.options) {
                for (let option of element.options) {
                    let op = new Option(option, option);
                    el.append(op);
                }
                if (element.selected)
                    el.value = element.selected;
            }
            if ("label" in element) {
                l = document.createElement('label');
                l.htmlFor = el.id;
                l.innerHTML = element.label;
            }
            else
                l = "";
            if (this.categorized.includes(element)) {
                let index = this.categories.indexOf(element.category);
                let par = document.getElementById(`categoryDiv_${index}`);
                if (l)
                    par.append(l);
                par.append(el);
            }
            else {
                if (l)
                    this.form.append(l);
                this.form.append(el);
            }
        }

        validateElement(element) {
            if ((element.type && element.name) &&
                (element.type === "text" || element.type === "select" || element.type === "submit" || element.type === "button" || element.type === "number")) {
                return true;
            }
            else
                return false;
        }
    }

    window.FormElement = FormElement;
})();