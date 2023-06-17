window.onload = () => {
    const table = {
        init: function () {
            this.todoList();
            this.Pagination();
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
            const deleteForm = getElement("#form-delete");
            const editForm = getElement("#form-add-edit");

            btnNo.addEventListener("click", () => {
                deleteForm.classList.remove("active");
            });

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
            // function pushData() {
            //     const data = getInputData(fields);
            //     const mailData = JSON.parse(localStorage.getItem("data"));
            //     if (mailData === null) {
            //         mailData = [];
            //     }
            //     newData = [...mailData];
            //     newData.push(data);

            //     localStorage.setItem("data", JSON.stringify(newData));
            // }

            async function pushData() {
                const data = getInputData(fields);
                const fetchedData = await axios.get(
                    "http://localhost:3000/users"
                );
                const mailData = fetchedData.data;
                console.log(mailData);

                if (mailData === null) {
                    mailData = [];
                }
                // newData = [...mailData];
                // newData.push(data);

                // console.log(newData);
                axios.post("http://localhost:3000/users", data);
            }

            /**
             * render userList
             * @returns action
             */
            // function pullData() {
            //     const mailData = JSON.parse(localStorage.getItem("data"));
            //     if (mailData === null) {
            //         return;
            //     }
            //     document.querySelector("tbody").innerHTML = "";
            //     mailData.forEach((user, index) => {
            //         let eleMail = document.createElement("tr");
            //         eleMail.setAttribute("id", user.id);
            //         let eleContent = `
            //         <td class="id">${index + 1}</td>
            //         <td class="title">${user.mail}</td>
            //         <td class="des">${user.des}</td>
            //         <td class="author">${user.author}</td>
            //         <td class="edit">
            //         <i class="fas fa-edit" aria-hidden="true"></i>
            //         </td>
            //         <td class="trash">
            //         <i class="fas fa-trash-alt" aria-hidden="true"></i>
            //         </td>
            //         `;
            //         eleMail.innerHTML = eleContent;
            //         document.querySelector("tbody").append(eleMail);
            //     });
            // }

            async function pullData() {
                const fetchedData = await axios.get(
                    "http://localhost:3000/users"
                );
                const mailData = fetchedData.data;
                console.log(mailData);
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

            // delete User
            function deleteHandler(id) {
                deleteForm.classList.remove("active");
                deleteUser(id);
                pullData();
            }
            // function deleteUser(id) {
            //     const mailData = JSON.parse(localStorage.getItem("data"));
            //     let _newData = [...mailData];

            //     const newData = _newData.filter((user) => {
            //         return user.id !== parseInt(id);
            //     });
            //     console.log(newData);
            //     localStorage.setItem("data", JSON.stringify(newData));
            // }

            async function deleteUser(id) {
                try {
                    const fetchedData = await axios.get(
                        "http://localhost:3000/users"
                    );
                    const mailData = fetchedData.data;
                    let _newData = [...mailData];

                    const newData = _newData.filter((user) => {
                        return user.id !== parseInt(id);
                    });
                    console.log(newData);
                    axios.put("http://localhost:3000/users", newData);
                } catch {
                    console.error("An error occurred:", error);
                }
            }

            // edit user

            function editHandler(id) {
                editForm.classList.remove("active");
                edit(id);
                pullData();
            }

            function edit(id) {
                const dataList = JSON.parse(localStorage.getItem("data"));

                let newList = [...dataList];
                const foundUser = newList.find(
                    (user) => parseInt(user.id) === parseInt(id)
                );
                console.log(newList);
                console.log(foundUser);

                foundUser.mail = getElement("#mail").value;
                foundUser.des = getElement("#des").value;
                foundUser.author = getElement("#author").value;
                console.log(foundUser);

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
                                pullData();
                                getElement("#form-add-edit").classList.remove(
                                    "active"
                                );
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

            function ElemDetermine(e) {
                const user = e.target.closest("tr");
                const id = user.id;
                // console.log(id);
                if (e.target.closest(".edit")) {
                    editForm.classList.add("active");
                    const btnComplete = getElement("#complete");
                    btnComplete.addEventListener("click", () =>
                        editHandler(id)
                    );
                }
                if (e.target.closest(".trash")) {
                    deleteForm.classList.add("active");
                    btnYes.addEventListener("click", () => deleteHandler(id));
                }
            }
            const table = document.querySelector("table");
            table.addEventListener("click", ElemDetermine);

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
        Pagination: function () {
            const _mailData = JSON.parse(localStorage.getItem("data"));
            if (_mailData === null) {
                return;
            }
            const dataArray = [..._mailData];
            const rowsPerPage = 3;
            let currentPage = 1;
            const renderTableData = () => {
                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const pageData = dataArray.slice(startIndex, endIndex);

                // Render table rows for the current page data
                const tableBody = document.querySelector("tbody");
                tableBody.innerHTML = "";

                pageData.forEach((user, index) => {
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

                // Update pagination information
                const currentPageElement =
                    document.getElementById("currentPage");
                const totalPagesElement = document.getElementById("totalPages");
                const totalPages = Math.ceil(dataArray.length / rowsPerPage);

                currentPageElement.textContent = currentPage;
                totalPagesElement.textContent = totalPages;

                const prevBtn = document.getElementById("prevBtn");
                const nextBtn = document.getElementById("nextBtn");

                prevBtn.disabled = currentPage === 1;
                nextBtn.disabled = currentPage === totalPages;
            };

            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");

            prevBtn.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderTableData();
                }
            });

            nextBtn.addEventListener("click", () => {
                const totalPages = Math.ceil(dataArray.length / rowsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderTableData();
                }
            });
            renderTableData();
        },
    };
    table.init();
};
