function Validate(options) {
    const submitFormSelector = document.querySelector(".submit_form");
    const inputList = document.querySelectorAll(".form-control");
    console.log(inputList);
    let messages = {};
    const rules = options.rules;
    const messageAll = options.message;

    const validateRule = {
        required: function (fieldName, options, elementValidate) {
            /**
             * @description lay value input
             * @param {string} fieldName
             */
            const messageKey = fieldName + "_" + elementValidate;
            const inputSelector = document.querySelector("#" + fieldName);
            const valueInput = inputSelector.value;
            let message;
            /**
             * @description check input chua nhap
             */

            if (!valueInput) {
                return { isValid: false, message: message };
            } else {
                return { isValid: true, message: '' };
            }
        },
        email: function (fieldName) {
            const inputSelector = document.querySelector("#" + fieldName);
            const valueInput = inputSelector.value;

            let regxEmail = /([A-Z])\w+/;
            if (!regxEmail.test(valueInput)) {
                return fieldName + " is not correct";
            } else {
                return "";
            }
        },
        max: function (fieldName, numbLength) {
            const inputSelector = document.querySelector("#" + fieldName);
            const valueInput = inputSelector.value.length;
            minLength = parseInt(numbLength);
            if (valueInput > numbLength) {
                console.log(typeof minLength);

                return fieldName + " is too long";
            }
            return "";
        },
        min: function (fieldName, numbLength) {
            const inputSelector = document.querySelector("#" + fieldName);
            const valueInput = inputSelector.value.length;
            numbLength = parseInt(numbLength);
            if (valueInput < numbLength) {
                console.log(typeof numbLength);

                return fieldName + " is too short";
            }
            return "";
        },
        between: function (fieldName, numbLength) {
            const [min, max] = numbLength.split(",");
            const inputSelector = document.querySelector("#" + fieldName);
            const valueInput = inputSelector.value.length;
            numbLength = parseInt(numbLength);
            if (valueInput < min || valueInput > max) {
                return fieldName + " length is invalid";
            }
            return "";
        },
    };

    function addMessageToInputElement() {
        // input invalid
        for (const fieldName in messages) {
            const element = document.querySelector("#" + fieldName);
            // console.log(messages[fieldName]);
            const errors = messages[fieldName];
            let message;

            for (let i = 0; i < errors.length; i++) {
                if (!errors[i].is_valid) {
                    message = errors[i].message;
                    break;
                }
            }

            if (!message) {
                element.classList.add("is-valid");
                element.classList.remove("is-invalid");
                element.nextElementSibling.textContent = "";
            } else {
                element.classList.add("is-invalid");
                element.classList.remove("is-valid");
                element.nextElementSibling.classList.add("invalid-feedback");
                element.nextElementSibling.textContent = message;
            }
        }

        messages = {};
    }

    function handleSubmitForm(e) {
        /**
         * @description loop qua cac phan tu
         */
        for (const fieldName in rules) {
            let validateHandleArray = rules[fieldName];

            validateHandleArray.forEach(function (elementValidate) {
                const handleElemValidate = elementValidate.split(":");
                elementValidate = handleElemValidate[0];
                let numbLength = handleElemValidate[1];
                /**
                 * @description this is a design pattern
                 * chay ham validate
                 */
                const validatedMessage = validateRule[elementValidate](
                    fieldName,
                    numbLength,
                    elementValidate
                );
                if (validatedMessage) {
                    if (messages[fieldName]) {
                        messages[fieldName].push(validatedMessage);
                    } else {
                        // messages[fieldName] = [validatedMessage];
                        messages[fieldName] = [validatedMessage];
                    }
                }
            });
        }
        console.log(messages);
        addMessageToInputElement();
    }
    /**
     * @description init su kien
     */
    function initEvent() {
        submitFormSelector.addEventListener("click", handleSubmitForm);
    }

    initEvent();
}
/**
 * @description input
 */
let ruleValidateInput = {
    rules: {
        name: ["required", "min:3", "max:8"],
        email: ["required", "email", "between: 5, 9"],
        password: ["required"],
    },
    message: {
        name_required: 'Ten khong duoc de trong'
    }
};

// const validateInstance = new Validate(ruleValidateInput);
