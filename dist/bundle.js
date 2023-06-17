(() => {
    var t = { 455: () => {} },
        e = {};
    function n(i) {
        var a = e[i];
        if (void 0 !== a) return a.exports;
        var s = (e[i] = { exports: {} });
        return t[i](s, s.exports, n), s.exports;
    }
    (() => {
        const t = n(455);
        console.log(t),
            (window.onload = () => {
                ({
                    init: function () {
                        this.todoList();
                    },
                    todoList: function () {
                        r();
                        const t = {
                                mail: "#mail",
                                des: "#des",
                                author: "#author",
                            },
                            e = (t) =>
                                "#" === t.charAt(0)
                                    ? document.querySelector(t)
                                    : document.querySelectorAll("." + t),
                            n = e("#btnAdd"),
                            i = e("#cancel"),
                            a = e("#complete"),
                            s = e("#no"),
                            o = e("#yes"),
                            l = e("#form-delete"),
                            d = e("#form-add-edit");
                        function c(t, e, n, i) {
                            (this.id = t),
                                (this.mail = e),
                                (this.des = n),
                                (this.author = i);
                        }
                        function r() {
                            const t = JSON.parse(localStorage.getItem("data"));
                            null !== t &&
                                ((document.querySelector("tbody").innerHTML =
                                    ""),
                                t.forEach((t, e) => {
                                    let n = document.createElement("tr");
                                    n.setAttribute("id", t.id);
                                    let i = `\n                    <td class="id">${
                                        e + 1
                                    }</td>\n                    <td class="title">${
                                        t.mail
                                    }</td>\n                    <td class="des">${
                                        t.des
                                    }</td>\n                    <td class="author">${
                                        t.author
                                    }</td>\n                    <td class="edit">\n                    <i class="fas fa-edit" aria-hidden="true"></i>\n                    </td>\n                    <td class="trash">\n                    <i class="fas fa-trash-alt" aria-hidden="true"></i>\n                    </td>\n                    `;
                                    (n.innerHTML = i),
                                        document
                                            .querySelector("tbody")
                                            .append(n);
                                }));
                        }
                        s.addEventListener("click", () => {
                            l.classList.remove("active");
                        }),
                            n.addEventListener("click", () => {
                                (currentForm = "add"),
                                    (function (t) {
                                        const n = e("#form-add-edit");
                                        "array" == typeof n
                                            ? n.forEach((t) => {
                                                  t.classList.toggle("active");
                                              })
                                            : n.classList.toggle("active");
                                    })(),
                                    a.addEventListener("click", () => {
                                        (currentForm = "add") &&
                                            (function (t) {
                                                const e = {
                                                        mail: ["required"],
                                                        des: ["required"],
                                                        author: ["required"],
                                                    },
                                                    n = {};
                                                let i = null;
                                                function s(t, e) {
                                                    n[t] ||
                                                        (n[t] = {
                                                            isTrue: null,
                                                        }),
                                                        (n[t].isTrue = e);
                                                }
                                                const o = {
                                                    required: (t) =>
                                                        document.querySelector(
                                                            "#" + t
                                                        ).value
                                                            ? (s(t, !0), null)
                                                            : (s(t, !1),
                                                              (i = [1]),
                                                              t +
                                                                  " is required"),
                                                };
                                                a.addEventListener(
                                                    "click",
                                                    (function () {
                                                        for (let t in e) {
                                                            const i = e[t];
                                                            for (let e of i) {
                                                                const i =
                                                                    o[e](t);
                                                                n[
                                                                    t
                                                                ].errMessages =
                                                                    [i];
                                                            }
                                                        }
                                                        !(function (t) {
                                                            for (const e in t) {
                                                                const n =
                                                                    document.querySelector(
                                                                        "#" + e
                                                                    );
                                                                !1 ===
                                                                t[e].isTrue
                                                                    ? ((n.nextElementSibling.textContent =
                                                                          t[
                                                                              e
                                                                          ].errMessages[0]),
                                                                      n.nextElementSibling.classList.add(
                                                                          "is-invalid"
                                                                      ),
                                                                      n.classList.add(
                                                                          "is-invalid"
                                                                      ))
                                                                    : ((n.nextElementSibling.textContent =
                                                                          ""),
                                                                      n.nextElementSibling.classList.add(
                                                                          "is-valid"
                                                                      ),
                                                                      n.nextElementSibling.classList.remove(
                                                                          "is-invalid"
                                                                      ),
                                                                      n.classList.add(
                                                                          "is-valid"
                                                                      ),
                                                                      n.classList.remove(
                                                                          "is-invalid"
                                                                      ));
                                                            }
                                                        })(n),
                                                            t(!i),
                                                            console.log(n);
                                                    })()
                                                );
                                            })(function (n) {
                                                !0 === n
                                                    ? ((function () {
                                                          const n = (function (
                                                                  t
                                                              ) {
                                                                  const n =
                                                                      new c();
                                                                  n.id =
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              Date.now()
                                                                      );
                                                                  for (const i in t)
                                                                      n[i] = e(
                                                                          t[i]
                                                                      ).value;
                                                                  return n;
                                                              })(t),
                                                              i = JSON.parse(
                                                                  localStorage.getItem(
                                                                      "data"
                                                                  )
                                                              );
                                                          null === i &&
                                                              (i = []),
                                                              (newData = [
                                                                  ...i,
                                                              ]),
                                                              newData.push(n),
                                                              localStorage.setItem(
                                                                  "data",
                                                                  JSON.stringify(
                                                                      newData
                                                                  )
                                                              );
                                                      })(),
                                                      r())
                                                    : (console.log(1),
                                                      e(
                                                          "#form-add-edit"
                                                      ).classList.add(
                                                          "invalid-animation"
                                                      ),
                                                      setTimeout(() => {
                                                          e(
                                                              "#form-add-edit"
                                                          ).classList.remove(
                                                              "invalid-animation"
                                                          );
                                                      }, 500));
                                            });
                                    });
                            }),
                            document
                                .querySelector("table")
                                .addEventListener("click", function (t) {
                                    const n = t.target.closest("tr").id;
                                    t.target.closest(".edit") &&
                                        (d.classList.add("active"),
                                        e("#complete").addEventListener(
                                            "click",
                                            () =>
                                                (function (t) {
                                                    d.classList.remove(
                                                        "active"
                                                    ),
                                                        (function (t) {
                                                            let n = [
                                                                ...JSON.parse(
                                                                    localStorage.getItem(
                                                                        "data"
                                                                    )
                                                                ),
                                                            ];
                                                            const i = n.find(
                                                                (e) =>
                                                                    parseInt(
                                                                        e.id
                                                                    ) ===
                                                                    parseInt(t)
                                                            );
                                                            console.log(n),
                                                                console.log(i),
                                                                (i.mail =
                                                                    e(
                                                                        "#mail"
                                                                    ).value),
                                                                (i.des =
                                                                    e(
                                                                        "#des"
                                                                    ).value),
                                                                (i.author =
                                                                    e(
                                                                        "#author"
                                                                    ).value),
                                                                console.log(i),
                                                                localStorage.setItem(
                                                                    "data",
                                                                    JSON.stringify(
                                                                        n
                                                                    )
                                                                );
                                                        })(t),
                                                        r();
                                                })(n)
                                        )),
                                        t.target.closest(".trash") &&
                                            (l.classList.add("active"),
                                            o.addEventListener("click", () =>
                                                (function (t) {
                                                    l.classList.remove(
                                                        "active"
                                                    ),
                                                        (function (t) {
                                                            const e = [
                                                                ...JSON.parse(
                                                                    localStorage.getItem(
                                                                        "data"
                                                                    )
                                                                ),
                                                            ].filter(
                                                                (e) =>
                                                                    e.id !==
                                                                    parseInt(t)
                                                            );
                                                            console.log(e),
                                                                localStorage.setItem(
                                                                    "data",
                                                                    JSON.stringify(
                                                                        e
                                                                    )
                                                                );
                                                        })(t),
                                                        r();
                                                })(n)
                                            ));
                                }),
                            i.addEventListener("click", () =>
                                e("#form-add-edit").classList.remove("active")
                            );
                    },
                }).init();
            });
    })();
})();
