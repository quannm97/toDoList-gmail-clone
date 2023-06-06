window.onload = () => {
    const table = {
        init: function () {
            this.todoList();
        },
        todoList: function () {
            pullData();
            const fields = {
                mail: "#mail",
                des: "#des",
                author: "#author",
            };
            const getElement = (el) => {
                if (el.charAt(0) === "#") {
                    return document.querySelector(el);
                } else {
                    return document.querySelectorAll("." + el);
                }
            };
            const btnAdd = getElement("#btnAdd");
            const btnCancel = getElement("#cancel");
            const btnComplete = getElement("#complete");
            const btnNo = getElement("#no");
            const btnYes = getElement("#yes");

            function toggleActive(element) {
                const crr = getElement(element);
                if (typeof crr === "array") {
                    crr.forEach((element) => {
                        element.classList.toggle("active");
                    });
                } else {
                    crr.classList.toggle("active");
                }
            }
            // mail factory
            function objectMail(id, mail, des, author) {
                this.id = id;
                this.mail = mail;
                this.des = des;
                this.author = author;
            }
            // id reducer
            function uniqueId() {
                return Math.floor(Math.random() * Date.now());
            }

            // get data from input form
            function getInputData(fields) {
                const data = new objectMail();
                data.id = uniqueId();
                for (const field in fields) {
                    data[field] = getElement(fields[field]).value;
                }
                return data;
            }
            /**
             * Add user to localStorage
             */
            function pushData() {
                const data = getInputData(fields);
                const mailData = JSON.parse(localStorage.getItem("data"));
                if (mailData === null) {
                    mailData = [];
                }
                newData = [...mailData];
                newData.push(data);

                localStorage.setItem("data", JSON.stringify(newData));
            }

            function deleteUser(e) {
                console.log(e.target);
                const mailData = JSON.parse(localStorage.getItem("data"));
                let _newData = [...mailData];

                const newData = _newData.filter((user) => {
                    return (
                        user.id !==
                        parseInt(e.target.closest("tr").getAttribute("id"))
                    );
                });
                console.log(newData);
                localStorage.setItem("data", JSON.stringify(newData));
            }

            /**
             * render userList
             * @returns action
             */
            function pullData() {
                const mailData = JSON.parse(localStorage.getItem("data"));
                if (mailData === null) {
                    return;
                }
                document.querySelector("tbody").innerHTML = "";
                mailData.forEach((user, index) => {
                    let eleMail = document.createElement("tr");
                    eleMail.setAttribute("id", user.id);
                    let eleContent = `
                    <td class="id">${index + 1}</td>
                    <td class="title">${user.mail}</td>
                    <td class="des">${user.des}</td>
                    <td class="author">${user.author}</td>
                    <td class="edit">
                    <i class="fas fa-edit" aria-hidden="true"></i>
                    </td>
                    <td class="trash">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                    </td>
                    `;
                    eleMail.innerHTML = eleContent;
                    document.querySelector("tbody").append(eleMail);
                });
            }

            const trashContainer = getElement("trash");

            // delete User
            trashContainer.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    toggleActive("#form-delete");
                    let confirmDel = false;
                    const handleDeletion = function () {
                        if (confirmDel) {
                            deleteUser(e);
                            confirmDel = false;
                            toggleActive("#form-delete");
                            location.reload();
                        }
                    };
                    trashBtn = getElement("trash");
                    btnYes.addEventListener("click", function () {
                        trashBtn = getElement("trash");
                        confirmDel = true;
                        handleDeletion();
                    });
                });
                btnNo.addEventListener("click", () =>
                    getElement("#form-delete").classList.remove("active")
                );
            });
            // edit user
            const editContainer = getElement("edit");

            editContainer.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    console.log(index);
                    currentForm = "edit";
                    toggleActive("#form-add-edit");

                    btnComplete.addEventListener("click", () => {
                        if ((currentForm = "edit")) {
                            edit(index);
                            location.reload();
                        }
                    });
                });
            });

            function edit(index) {
                const dataList = JSON.parse(localStorage.getItem("data"));

                let newList = [...dataList];

                newList[index].mail = getElement("#mail").value;
                newList[index].des = getElement("#des").value;
                newList[index].author = getElement("#author").value;

                localStorage.setItem("data", JSON.stringify(newList));
            }
            // add user
            btnAdd.addEventListener("click", () => {
                currentForm = "add";
                toggleActive("#form-add-edit");
                btnComplete.addEventListener("click", () => {
                    if ((currentForm = "add")) {
                        validation(function (results) {
                            if (results === true) {
                                pushData();
                                location.reload();
                            } else {
                                console.log(1);
                                getElement("#form-add-edit").classList.add(
                                    "invalid-animation"
                                );

                                setTimeout(() => {
                                    getElement(
                                        "#form-add-edit"
                                    ).classList.remove("invalid-animation");
                                }, 500);
                            }
                        });
                    }
                });
            });
            btnCancel.addEventListener("click", () =>
                getElement("#form-add-edit").classList.remove("active")
            );
            // give feedback for input
            function provideFeedback(results) {
                for (const sourceInput in results) {
                    const element = document.querySelector("#" + sourceInput);
                    if (results[sourceInput].isTrue === false) {
                        element.nextElementSibling.textContent =
                            results[sourceInput].errMessages[0];
                        element.nextElementSibling.classList.add("is-invalid");
                        element.classList.add("is-invalid");
                    } else {
                        element.nextElementSibling.textContent = "";
                        element.nextElementSibling.classList.add("is-valid");
                        element.nextElementSibling.classList.remove(
                            "is-invalid"
                        );
                        element.classList.add("is-valid");
                        element.classList.remove("is-invalid");
                    }
                }
            }

            // validation
            function validation(passData) {
                const data = {
                    rules: {
                        mail: ["required"],
                        des: ["required"],
                        author: ["required"],
                    },
                };
                const rules = data.rules;

                const results = {};
                let isBlock = null;

                function setTrue(sourceInput, isChecked) {
                    if (!results[sourceInput]) {
                        results[sourceInput] = { isTrue: null };
                    }

                    results[sourceInput].isTrue = isChecked;
                }

                const methods = {
                    /**
                     *
                     * @param {string} sourceInput
                     * @returns {message,isTrue}
                     * @type {message} = string
                     * @type {isTrue} = boolean
                     * @description 3. Create 'results' object to save value.
                     */
                    required: (sourceInput) => {
                        const inputBar = document.querySelector(
                            "#" + sourceInput
                        );
                        if (!inputBar.value) {
                            setTrue(sourceInput, false);
                            isBlock = [1];
                            return sourceInput + " is required";
                        } else {
                            setTrue(sourceInput, true);
                            return null;
                        }
                    },
                };
                function handleSubmit() {
                    for (let sourceInput in rules) {
                        const methodsArr = rules[sourceInput];

                        for (let validateMethod of methodsArr) {
                            const result = methods[validateMethod](sourceInput);
                            results[sourceInput].errMessages = [result];
                        }
                    }
                    provideFeedback(results);
                    if (isBlock) {
                        passData(false);
                    } else {
                        passData(true);
                    }
                    console.log(results);
                }
                function init() {
                    btnComplete.addEventListener("click", handleSubmit());
                }
                init();
            }
        },
    };
    table.init();
};
