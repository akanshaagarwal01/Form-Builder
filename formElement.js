(function () {
    class FormElement {
        constructor() {

        }
        validateElement(element) {
            if ((element.type && element.name) &&
                (element.type === "text" || element.type === "select" || element.type === "submit" || element.type === "button")) {
                return true;
            }
            else {
                return false;
            }
        }
        validatefieldInput() {
            //check for user-specified validations on input data 
            //show error 
        }
    }

    window.FormElement = FormElement;
})();