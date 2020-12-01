! function t(e, n, r) {
    function i(u, a) {
        if (!n[u]) {
            if (!e[u]) {
                var s = "function" == typeof require && require;
                if (!a && s) return s(u, !0);
                if (o) return o(u, !0);
                var l = new Error("Cannot find module '" + u + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[u] = {
                exports: {}
            };
            e[u][0].call(c.exports, function(t) {
                var n = e[u][1][t];
                return i(n ? n : t)
            }, c, c.exports, t, e, n, r)
        }
        return n[u].exports
    }
    for (var o = "function" == typeof require && require, u = 0; u < r.length; u++) i(r[u]);
    return i
}({
    1: [function(t, e, n) {
        "use strict";
        var r = t("../modules/store"),
            i = t("../modules/transformApartment"),
            o = function() {
                function t(t, e) {
                    var n = this;
                    this.containerOptions = t, this.finalEstimate = e, this.optionCollectionContainer = this.containerOptions.querySelector("ul.list-options"), this.optionCollectionContainer && (this.outputAdditionalOptions = this.finalEstimate.querySelector("ul.final-price>li.additional-options>ul.total-additional-options"), this.outputTotalPrice = this.finalEstimate.querySelector("ul.final-price>li.additional-options>div.additional-options>span.total-price>span.price"), this.outputPictures = document.getElementById("transformApartment"), this.storePicturesElement = Object.create(null), this.optionCollectionContainer.addEventListener("change", function(t) {
                        n.universal(t)
                    }), this.optionCollectionContainer.addEventListener("change:input", function(t) {
                        n.universal(t)
                    }))
                }
                return t.prototype.universal = function(t) {
                    var e = this;
                    if (t.target.closest("li.controls")) {
                        var n = t.target.closest("li.controls"),
                            o = n.querySelector("input"),
                            u = o.name,
                            a = n.querySelector("div.info-size-price>ul.controls>li:nth-child(2)>span.input>input"),
                            s = n.querySelector("div.info-size-price>span.price>span.text"),
                            l = n.querySelector("div.info-size-price>span.price>span.price"),
                            c = void 0;
                        if (o.checked) {
                            var p = o.dataset.title,
                                h = o.dataset.price,
                                d = a.value,
                                f = String(o.dataset.text || "шт.").replace(/^за\s+/, "");
                            c = Number(d) * Number(h), r.storeOptions[u] = {
                                title: p,
                                value: String(c),
                                number: d,
                                unit: f
                            }, s.textContent = o.dataset.textchecked, l.textContent = String(c).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "), r.storeAdditionalOptionsElement[u] || this.outputTitle(u, r.storeOptions[u].title, o.dataset.src)
                        } else delete r.storeOptions[u], s.textContent = o.dataset.text, l.textContent = String(o.dataset.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "), this.outputAdditionalOptions.removeChild(r.storeAdditionalOptionsElement[u]), delete r.storeAdditionalOptionsElement[u], delete i.storeOptionsTransformApartment[u], i.updateTransformApartment();
                        this.outputPrice()
                    } else if (t.target.closest("li.simple")) {
                        var n = t.target.closest("li.simple"),
                            o = n.querySelector("input"),
                            m = o.name;
                        if (o.checked) {
                            var p = o.dataset.title,
                                h = o.dataset.price,
                                f = String(o.dataset.text || "шт.").replace(/^за\s+/, "");
                            r.storeOptions[m] = {
                                title: p,
                                value: String(h),
                                number: "",
                                unit: f
                            }, this.outputPrice(), this.outputTitle(m, r.storeOptions[m].title, o.dataset.src)
                        } else delete r.storeOptions[m], this.outputPrice(), this.outputAdditionalOptions.removeChild(r.storeAdditionalOptionsElement[m]), delete r.storeAdditionalOptionsElement[m], delete i.storeOptionsTransformApartment[m], i.updateTransformApartment()
                    } else if (t.target.closest("li.change-window")) {
                        var n = t.target.closest("li.change-window"),
                            o = n.querySelector("input"),
                            v = o.name,
                            y = n.querySelectorAll("ul.type-window>li"),
                            g = n.querySelector("div.info-size-price>span.price>span.price");
                        if (o.checked) Array.prototype.forEach.call(y, function(t) {
                            var n = t.querySelector("ul.controls>li:nth-child(2)>span.input>input"),
                                i = n.value,
                                o = 0;
                            Number(i) >= 1 ? r.storeOptionsWindow[n.name] = {
                                title: n.dataset.title,
                                value: String(Number(i) * Number(n.dataset.price)),
                                number: i,
                                unit: "шт."
                            } : delete r.storeOptionsWindow[n.name];
                            for (var u in r.storeOptionsWindow) o += Number(r.storeOptionsWindow[u].value);
                            e.outputPrice(), g.textContent = String(o).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")
                        }), r.storeAdditionalOptionsElement[v] || this.outputTitle(v, o.dataset.title, o.dataset.src);
                        else {
                            for (var A in r.storeOptionsWindow) delete r.storeOptionsWindow[A];
                            this.outputPrice(), this.outputAdditionalOptions.removeChild(r.storeAdditionalOptionsElement[v]), delete r.storeAdditionalOptionsElement[v], delete i.storeOptionsTransformApartment[v], i.updateTransformApartment()
                        }
                    }
                }, t.prototype.outputPrice = function() {
                    var t = 0;
                    for (var e in r.storeOptions) t += Number(r.storeOptions[e].value);
                    this.outputTotalPrice.textContent = String(t).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "), r.update()
                }, t.prototype.outputTitle = function(t, e, n) {
                    var o = document.createElement("li");
                    o.classList.add(t), o.textContent = e, r.storeAdditionalOptionsElement[t] = o, i.storeOptionsTransformApartment[t] = {
                        title: e,
                        src: n
                    }, i.updateTransformApartment(), this.outputAdditionalOptions.appendChild(o)
                }, t
            }();
        n["default"] = o
    }, {
        "../modules/store": 13,
        "../modules/transformApartment": 14
    }],
    2: [function(t, e, n) {
        "use strict";
        var r = t("../modules/parseQueryString"),
            i = t("../modules/store"),
            o = function() {
                function t(t, e) {
                    if (this.parameters = t, this.finalEstimate = e, this.containerParameters = this.parameters.querySelector("ul.list-parameters"), this.containerParameters) {
                        this.areaApartmentElement = this.containerParameters.querySelector("li.area-apartment>ul.controls>li:nth-child(2)>span.input>input"), this.roomApartmentElement = this.containerParameters.querySelector("li.number-rooms>ul.controls>li:nth-child(2)>span.input>input"), this.studioElement = document.getElementById("studio"), this.newApartment = this.containerParameters.querySelector("li.new-apartment>div.new-apartment>input"), this.outputAdditionalWorks = this.finalEstimate.querySelector("ul.final-price>li.additional-options>ul.total-additional-works"), this.outputTotalPrice = this.finalEstimate.querySelector("ul.final-price>li.additional-options>div.additional-works>span.total-price>span.price"), this.valueRoom = this.roomApartmentElement.value;
                        var n = r["default"](window.location.search.substr(1));
                        n.area && (this.areaApartmentElement.value = n.area), i.storeAreaParameters.area = this.areaApartmentElement.value, i.storeAreaParameters.room = this.roomApartmentElement.value, this.newApartment && (this.subMenu = this.containerParameters.querySelector("li.new-apartment>div.new-apartment>div.submenu"), this.subMenuCollection = this.subMenu.querySelectorAll("ul>li")), this.registerHandlers()
                    }
                }
                return t.prototype.registerHandlers = function() {
                    var t = this;
                    this.newApartment && (this.newApartment.addEventListener("change", function() {
                        return t.stateNewApartment()
                    }), this.subMenu.addEventListener("change", function(e) {
                        return t.findNameElement(e)
                    })), this.areaApartmentElement.addEventListener("change", function() {
                        i.storeAreaParameters.area = t.areaApartmentElement.value, i.update()
                    }), this.areaApartmentElement.addEventListener("change:input", function() {
                        i.storeAreaParameters.area = t.areaApartmentElement.value, Array.prototype.forEach.call(t.subMenuCollection, function(e) {
                            var n = e.querySelector("input");
                            n.checked ? (i.storeParameters[n.name] = n.dataset.price, i.priceStoreParameters[n.name] = {
                                title: n.dataset.title,
                                value: String(t.calcFinishingPrice(n.name))
                            }) : (delete i.storeParameters[n.name], delete i.priceStoreParameters[n.name])
                        }), i.update()
                    }), this.roomApartmentElement.addEventListener("change", function() {
                        t.studioElement.checked && (t.studioElement.checked = !1), i.storeAreaParameters.room = t.roomApartmentElement.value, i.update()
                    }), this.roomApartmentElement.addEventListener("change:input", function() {
                        i.storeAreaParameters.room = t.roomApartmentElement.value, t.valueRoom = t.roomApartmentElement.value, t.studioElement.checked && (t.studioElement.dispatchEvent(new CustomEvent("change-studio:input", {
                            detail: !0,
                            bubbles: !0
                        })), t.studioElement.checked = !1, i.storeAreaParameters.room = t.roomApartmentElement.value), i.update()
                    }), this.studioElement.addEventListener("change", function() {
                        t.studioElement.checked ? t.roomApartmentElement.value = "C" : t.roomApartmentElement.value = t.valueRoom, i.storeAreaParameters.room = t.roomApartmentElement.value, i.update()
                    })
                }, t.prototype.stateNewApartment = function() {
                    var t = this;
                    if (this.newApartment.checked) Array.prototype.forEach.call(this.subMenuCollection, function(e) {
                        var n = e.querySelector("input");
                        n.checked && (i.storeParameters[n.name] = n.dataset.price, i.priceStoreParameters[n.name] = {
                            title: n.dataset.title,
                            value: String(t.calcFinishingPrice(n.name))
                        })
                    });
                    else {
                        for (var e in i.storeParameters) delete i.storeParameters[e];
                        for (var n in i.priceStoreParameters) delete i.priceStoreParameters[n]
                    }
                    i.update()
                }, t.prototype.findNameElement = function(t) {
                    var e = t.target.checked,
                        n = t.target.name;
                    e ? (i.storeParameters[n] = t.target.dataset.price, i.priceStoreParameters[n] = {
                        title: t.target.dataset.title,
                        value: String(this.calcFinishingPrice(n))
                    }, i.update()) : (delete i.storeParameters[n], delete i.priceStoreParameters[n], i.update());
                    var r = 0,
                        o = "";
                    for (var u in i.priceStoreParameters) r += parseInt(i.priceStoreParameters[u].value), o += "<li>" + i.priceStoreParameters[u].title + "</li>";
                    this.outputTotalPrice.textContent = String(r).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "), this.outputAdditionalWorks.innerHTML = o
                }, t.prototype.calcFinishingPrice = function(t) {
                    var e;
                    for (var n in i.storeParameters) n == t && (e = Number(this.areaApartmentElement.value) * Number(i.storeParameters[n]));
                    return e
                }, t
            }();
        n["default"] = o
    }, {
        "../modules/parseQueryString": 12,
        "../modules/store": 13
    }],
    3: [function(t, e, n) {
        "use strict";
        var r = t("../modules/parseQueryString"),
            i = t("../modules/store"),
            o = t("../modules/transformApartment"),
            u = "current",
            a = function() {
                function t(t, e) {
                    this.style = t, this.choiceFinalEstimate = e, this.itemCollection = this.style.querySelectorAll("section.triplets>div>ul>li"), this.bool = !1, this.studioElement = document.getElementById("studio"), this.currentElement = this.style.querySelector("section.triplets>div>ul>li.current"), this.totalPrice = this.choiceFinalEstimate.querySelector("ul.final-price>li.style-price>div.style-price>span.total-price"), this.totalStyle = this.choiceFinalEstimate.querySelector("ul.final-price>li.style-price>div.style-price>span.text-title"), this.totalList = this.choiceFinalEstimate.querySelectorAll("ul.final-price>li.style-price>ul.total-material-color>li"), this.wallColor = this.choiceFinalEstimate.querySelector("ul.final-price>li.style-price>ul.total-material-color>li>span.wall-color"), this.floorColor = this.choiceFinalEstimate.querySelector("ul.final-price>li.style-price>ul.total-material-color>li>span.floor-color"), this.material = this.choiceFinalEstimate.querySelector("ul.final-price>li.style-price>ul.total-material-color>li>span.material"), this.registerHandlers()
                }
                return t.prototype.registerHandlers = function() {
                    var t = this,
                        e = r["default"](window.location.search.substr(1));
                    Array.prototype.forEach.call(this.itemCollection, function(n) {
                        n.addEventListener("click", function(e) {
                            return t.assignmentCurrentClass(e, n)
                        }), e.design === n.dataset.title && (t.currentElement.classList.remove("current"), n.classList.add("current"), t.currentElement = n)
                    }), this.assignmentCurrentClass(null, this.currentElement), this.studioElement.addEventListener("change", function() {
                        t.outputStyle()
                    }), this.studioElement.addEventListener("change-studio:input", function() {
                        t.studioElement.checked = !1, t.outputStyle()
                    })
                }, t.prototype.assignmentCurrentClass = function(t, e) {
                    null != t || this.bool ? e.contains(t.target) && this.bool && !e.classList.contains(u) && (this.currentItem.classList.remove(u), delete i.storeStylePrice[this.currentItem.dataset.title], e.classList.add(u), this.currentItem = e, this.outputStyle()) : (this.currentItem = this.currentElement, this.bool = !0, this.outputStyle())
                }, t.prototype.outputStyle = function() {
                    this.studioElement.checked ? (i.storeStylePrice[this.currentItem.dataset.title] = {
                        title: this.currentItem.dataset.transfer,
                        value: this.studioElement.dataset.price
                    }, this.outputTitle(this.totalStyle, this.currentItem.dataset.style)) : (i.storeStylePrice[this.currentItem.dataset.title] = {
                        title: this.currentItem.dataset.transfer,
                        value: this.currentItem.dataset.price
                    }, this.outputTitle(this.totalStyle, this.currentItem.dataset.style)), this.initSelect(), i.update()
                }, t.prototype.initSelect = function() {
                    var t = this,
                        e = this.currentItem.querySelectorAll("ul.choice-material-color>li");
                    this.comboSlider = this.currentItem.querySelectorAll("ul.combo-slider>li"), e && (Array.prototype.forEach.call(e, function(e) {
                        var n = e.querySelector("select"),
                            r = n.name;
                        n.addEventListener("change", function() {
                            return t.changeStore(n, r)
                        }), t.changeStore(n, r), n.addEventListener("change", function() {
                            return t.putClassComboSlider()
                        }), n.addEventListener("change", function() {
                            return t.putStoreTransferApartment()
                        })
                    }), this.putClassComboSlider(), this.putStoreTransferApartment())
                }, t.prototype.putStoreTransferApartment = function() {
                    var t = this.currentItem.querySelector("ul.combo-slider>li.current>img").src,
                        e = function(t) {
                            for (var e in t) delete t[e]
                        };
                    Object.keys(o.storeWallTransformApartment).length && e(o.storeWallTransformApartment), Object.keys(o.storeFloorTransformApartment).length && e(o.storeFloorTransformApartment), Object.keys(o.storeStyleTransformApartment).length && delete o.storeStyleTransformApartment.style, o.storeStyleTransformApartment.style = {
                        title: this.currentItem.dataset.style,
                        src: t
                    };
                    var n = JSON.parse(this.currentItem.dataset.wall),
                        r = JSON.parse(this.currentItem.dataset.floor),
                        u = function(t, e, n) {
                            Array.prototype.some.call(t, function(t) {
                                return e === t.title ? (n[t.title] = {
                                    title: t.description,
                                    src: t.src
                                }, !0) : !1
                            })
                        };
                    u(n, i.storeStyle.wall_color, o.storeWallTransformApartment), u(r, i.storeStyle.floor_color, o.storeFloorTransformApartment), o.updateTransformApartment()
                }, t.prototype.putClassComboSlider = function() {
                    var t = this;
                    Array.prototype.forEach.call(this.comboSlider, function(e) {
                        e.classList.contains(u) && (t.comboSlideElement = e), i.storeStyle.wall_color === e.dataset.wall && i.storeStyle.floor_color === e.dataset.floor && (t.comboSlideElement.classList.remove(u), t.comboSlideElement = e, t.comboSlideElement.classList.add(u))
                    })
                }, t.prototype.changeStore = function(t, e) {
                    i.storeStyle[e] = t.value, this.output(this.wallColor, i.storeStyle.wall_color), this.output(this.floorColor, i.storeStyle.floor_color), this.output(this.material, i.storeStyle.material), i.update()
                }, t.prototype.output = function(t, e) {
                    t.textContent = String(e).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")
                }, t.prototype.outputTitle = function(t, e) {
                    t.textContent = e
                }, t
            }();
        n["default"] = a
    }, {
        "../modules/parseQueryString": 12,
        "../modules/store": 13,
        "../modules/transformApartment": 14
    }],
    4: [function(t, e, n) {
        "use strict";
        var r = function() {
            function t(t) {
                this.container = t, this.container && (this.inputElement = this.container.querySelector("li:nth-child(2)>span.input>input"), this.currentValue = Number(this.inputElement.value), this.maxLimit = Number(this.inputElement.max), this.minLimit = Number(this.inputElement.min), this.buttonPrev = this.container.querySelector("li:first-child>button.decrease"), this.buttonNext = this.container.querySelector("li:last-child>button.increase"), this.registerButtonHandlers())
            }
            return t.prototype.registerButtonHandlers = function() {
                var t = this;
                this.inputElement.addEventListener("change", function() {
                    return t.valueCheck()
                }), this.buttonPrev.addEventListener("click", function() {
                    return t.countBack()
                }), this.buttonNext.addEventListener("click", function() {
                    return t.countForward()
                })
            }, t.prototype.valueCheck = function() {
                Number(this.inputElement.value) >= Number(this.inputElement.min) && Number(this.inputElement.value) <= Number(this.inputElement.max) ? this.currentValue = Number(this.inputElement.value) : Number(this.inputElement.value) <= Number(this.inputElement.min) ? (this.currentValue = Number(this.inputElement.min), this.inputElement.value = this.inputElement.min) : Number(this.inputElement.value) >= Number(this.inputElement.max) ? (this.currentValue = Number(this.inputElement.max), this.inputElement.value = this.inputElement.max) : (this.currentValue = Number(this.inputElement.dataset["default"]), this.inputElement.value = this.inputElement.dataset["default"]), this.createDispatchEvent(this.inputElement)
            }, t.prototype.countBack = function() {
                this.currentValue > this.minLimit && this.currentValue <= this.maxLimit && (this.currentValue--, this.inputElement.value = String(this.currentValue), this.createDispatchEvent(this.inputElement))
            }, t.prototype.countForward = function() {
                this.currentValue >= this.minLimit && this.currentValue < this.maxLimit && (this.currentValue++, this.inputElement.value = String(this.currentValue), this.createDispatchEvent(this.inputElement))
            }, t.prototype.createDispatchEvent = function(t) {
                t.dispatchEvent(new CustomEvent("change:input", {
                    detail: !0,
                    bubbles: !0
                }))
            }, t
        }();
        n["default"] = r
    }, {}],
    5: [function(t, e, n) {
        "use strict";
        var r = "sticky",
            i = function() {
                function t(e, n) {
                    var r = this;
                    void 0 === n && (n = 0), this.element = e, this.offsetTop = n, this.pinned = !1, this.pointPinnedElement = document.querySelector("main>h1"), this.updateElementTopOffset(), this.updatePinningState(window.pageYOffset), window.addEventListener("resize", function() {
                        return r.windowResizeHandler()
                    }), t.instances.push(this), t.initialized || (window.addEventListener("scroll", t.windowScrollHandler.bind(this), !1), t.initialized = !0)
                }
                return t.prototype.pin = function() {
                    this.pinned && (this.element.classList.add(r), this.pinned = !0)
                }, t.prototype.unPin = function() {
                    this.pinned || (this.element.classList.remove(r), this.pinned = !1)
                }, t.prototype.isPinned = function() {
                    return this.pinned
                }, t.prototype.updatePinningState = function(t) {
                    if (this.elementTopOffset < t) {
                        if (this.pinned) return;
                        this.pinned = !0, this.pin()
                    } else if (this.elementTopOffset > t) {
                        if (!this.pinned) return;
                        this.pinned = !1, this.unPin()
                    }
                }, t.prototype.updateElementTopOffset = function() {
                    this.pinned || (this.elementTopOffset = this.pointPinnedElement.getBoundingClientRect().top - this.element.offsetHeight + window.pageYOffset + this.offsetTop)
                }, t.prototype.windowResizeHandler = function() {
                    Array.prototype.forEach.call(t.instances, function(t) {
                        t.updateElementTopOffset(), t.updatePinningState(window.pageYOffset)
                    })
                }, t.windowScrollHandler = function() {
                    Array.prototype.forEach.call(t.instances, function(t) {
                        t.updatePinningState(window.pageYOffset)
                    })
                }, t.instances = [], t.initialized = !1, t
            }();
        n["default"] = i
    }, {}],
    6: [function(t, e, n) {
        "use strict";
        var r = t("./modules/calcPrice"),
            i = t("./modules/store"),
            o = t("./modules/asideApplication"),
            u = t("./modules/calculatorSubmit"),
            a = t("./modules/transformApartment"),
            s = t("./modules/movingHat");
        t("./../lib/polyfills/Element.closest"), r["default"](), i["default"](), o["default"](), u["default"](), a["default"](), s["default"]()
    }, {
        "./../lib/polyfills/Element.closest": 15,
        "./modules/asideApplication": 7,
        "./modules/calcPrice": 8,
        "./modules/calculatorSubmit": 9,
        "./modules/movingHat": 11,
        "./modules/store": 13,
        "./modules/transformApartment": 14
    }],
    7: [function(t, e, n) {
        "use strict";

        function r() {
            var t = document.querySelector("main>form.calc-price");
            if (t) {
                var e = document.querySelectorAll("main>aside.application, main>aside.send-yourself");
                Array.prototype.forEach.call(e, function(e) {
                    if (e) {
                        var n, r;
                        e.classList.contains("send-yourself") ? (n = t.querySelector("ol>li.final-estimate>div.share-final-estimate>button.mail"), r = document.getElementById("calculator-input-hidden-mail")) : e.classList.contains("application") && (n = t.querySelector("ol>li.final-estimate>ul.final-price>li.total>button.application"), r = document.getElementById("calculator-input-hidden-application"));
                        var o, u = e.querySelector("form>button.close"),
                            s = function(t) {
                                return a(t, e, o, r)
                            };
                        o = function() {
                            document.removeEventListener("keyup", s, !0)
                        }, i(n, e, s, o, u, r)
                    }
                })
            }
        }

        function i(t, e, n, r, i, a) {
            t.addEventListener("click", function(r) {
                return o(r, e, n, t.dataset.hidden, a)
            }), i.addEventListener("click", function() {
                return u(e, r, a)
            })
        }

        function o(t, e, n, r, i) {
            t.preventDefault(), e.classList.add(l), document.documentElement.classList.add("lightbox"), document.documentElement.style.overflow = "hidden", document.documentElement.style.paddingRight = p + "px", i.value = r, document.addEventListener("keyup", n, !0)
        }

        function u(t, e, n) {        	
            var r = t.querySelector("form>div.success");
            t.classList.remove(l), r && t.querySelector("form>div.success").classList.remove(l), document.documentElement.classList.remove("lightbox"), document.documentElement.style.overflow = "", document.documentElement.style.paddingRight = "", n.value = "", e()
        }

        function a(t, e, n, r) {
            t.keyCode === c && u(e, n, r)
        }
        var s = t("./findWidthScroll"),
            l = "current",
            c = 27,
            p = s["default"]();
        n["default"] = r
    }, {
        "./findWidthScroll": 10
    }],
    8: [function(t, e, n) {
        "use strict";

        function r() {
            var t = document.querySelector("body.calculator");
            if (t) {
                var e = t.querySelector("main>form.calc-price");
                if (e) {
                    var n = e.querySelector("ol>li.style"),
                        r = e.querySelector("ol>li.parameters"),
                        s = e.querySelector("ol>li.additional-options"),
                        l = e.querySelector("ol>li.final-estimate"),
                        c = e.querySelectorAll("ul.controls");
                    new o["default"](n, l), new u["default"](r, l), new a["default"](s, l), Array.prototype.forEach.call(c, function(t) {
                        new i["default"](t)
                    })
                }
            }
        }
        var i = t("../classes/Controls"),
            o = t("../classes/ChoiceStyle"),
            u = t("../classes/ChoiceParameters"),
            a = t("../classes/AdditionalOption");
        n["default"] = r
    }, {
        "../classes/AdditionalOption": 1,
        "../classes/ChoiceParameters": 2,
        "../classes/ChoiceStyle": 3,
        "../classes/Controls": 4
    }],
    9: [function(t, e, n) {
        "use strict";

        function r() {
            var t = document.querySelectorAll("html>body>main>aside.application, html>body>main>aside.send-yourself"),
                e = document.querySelector("main>form.calc-price>ol>li.final-estimate>div.share-final-estimate>button.print"),
                n = !1;
            Array.prototype.forEach.call(t, function(t) {
                function r() {
                    m.addEventListener("submit", function(t) {
                        t.preventDefault(), s(m, d, f, v)
                    }), e && !n && (e.addEventListener("click", function(t) {
                        t.preventDefault(), l()
                    }), n = !0)
                }

                function o(t) {
                    A.length = 0, Array.prototype.filter.call(t, function(t) {
                        t.classList.remove("error"), "" === t.value && (t.classList.add("error"), A.push(t))
                    }), 0 === A.length && (g = !0)
                }

                function s(t, e, n, r) {
                    y || (Array.prototype.forEach.call(r, function(t) {
                        t.addEventListener("keyup", function() {
                            return o(r)
                        }), t.addEventListener("change", function() {
                            return o(r)
                        })
                    }), y = !0), o(r), E.validate() && g && p(t, e, n)
                }

                function l() {
                    var t = document.createElement("form");
                    t.action = m.action, t.method = m.method, document.getElementsByTagName("html")[0].classList.contains("ua-opera") || (t.target = "_blank"), t.appendChild(c("style", JSON.stringify(u.storeStyle))), t.appendChild(c("styleName", JSON.stringify(u.storeStylePrice))), t.appendChild(c("parameters", JSON.stringify(u.storeAreaParameters))), t.appendChild(c("priceParameters", JSON.stringify(u.priceStoreParameters))), t.appendChild(c("options", JSON.stringify(u.storeOptions))), t.appendChild(c("optionsWindow", JSON.stringify(u.storeOptionsWindow))), t.appendChild(c("allPrice", JSON.stringify(u.storeAllPrice))), t.style.height = "0", t.style.overflow = "hidden", t.style.position = "absolute", t.style.top = "-100%", document.body.appendChild(t), t.submit(), document.body.removeChild(t)
                }

                function c(t, e) {
                    var n = document.createElement("input");
                    return n.type = "hidden", n.name = t, n.value = e, n
                }

                function p(t, e, n) {
                    function r() {
                        if (i.readyState === XMLHttpRequest.DONE && 200 === i.status) {
                            t.reset(), e.classList.add(a), n.classList.remove(a), g = !1;
                            var r = JSON.parse(i.response);
                            r = r[0], !h && roistatGoal && roistatGoal.reach({
                                name: r.name,
                                phone: r.phone,
                                email: r.email,
                                price: r.price.sumTotalPrice,
                                leadName: r.leadName,
                                text: r.text
                            })
                        } else alert("Сообщение не отправлено, попробуйте снова.")
                    }
                    var i = new XMLHttpRequest,
                        o = new FormData(t);                        
                        console.log('tager-1');  
                        console.log('tager-2');                        
                    o.append("style", JSON.stringify(u.storeStyle)), o.append("styleName", JSON.stringify(u.storeStylePrice)), o.append("parameters", JSON.stringify(u.storeAreaParameters)), o.append("priceParameters", JSON.stringify(u.priceStoreParameters)), o.append("options", JSON.stringify(u.storeOptions)), o.append("optionsWindow", JSON.stringify(u.storeOptionsWindow)), o.append("allPrice", JSON.stringify(u.storeAllPrice)), n.classList.add(a), i.open(t.method, t.action, !0), i.addEventListener("load", r), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(o)
                }
                if (t) {
                    var h = t.classList.contains("send-yourself"),
                        d = t.querySelector("div.success"),
                        f = t.querySelector("div.loader"),
                        m = t.querySelector("form"),
                        v = m.querySelectorAll('li>input[name="name"], li>input[name="email"], li>input[name="tel"]'),
                        y = !1,
                        g = !1,
                        A = [],
                        E = i(m.elements.namedItem("tel"));
                    r()
                }
            })
        }

        function i(t) {
            if (!t) return {
                validate: function() {                	
                    return !0
                },
                mask: null
            };
            var e = !1,
                n = !1,
                r = new o(t, {
                    mask: "+{7} 000 000-00-00"
                });
            return r.on("accept", function() {
                e || (e = !0, t.classList.add(l)), n && (n = !1, t.classList.remove(s))
            }).on("complete", function() {
                n = !0, t.classList.add(s)
            }), {
                validate: function() {                	
                    return n
                },
                mask: r
            }
        }
        var o = t("imask"),
            u = t("./store"),
            a = "current";
        n["default"] = r;
        var s = "complete",
            l = "changed"
    }, {
        "./store": 13,
        imask: 19
    }],
    10: [function(t, e, n) {
        "use strict";

        function r() {
            var t;
            return i ? i : (t = document.createElement("div"), t.style.overflowY = "scroll", t.style.width = "50px", t.style.height = "50px", t.style.visibility = "hidden", document.body.appendChild(t), i = t.offsetWidth - t.clientWidth, document.body.removeChild(t), i)
        }
        var i;
        n["default"] = r
    }, {}],
    11: [function(t, e, n) {
        "use strict";

        function r() {
            var t = document.querySelector("body>header.moving-hat");
            t && new i["default"](t)
        }
        var i = t("../classes/StickyHeader");
        n["default"] = r
    }, {
        "../classes/StickyHeader": 5
    }],
    12: [function(t, e, n) {
        "use strict";

        function r(t) {
            return t.split("&").map(function(t) {
                return t.split("=")
            }).reduce(function(t, e) {
                var n = e.map(function(t) {
                        return decodeURIComponent(t).trim()
                    }),
                    r = n[0],
                    i = n[1],
                    o = /^(.+)\[\d+\]$/.exec(r);
                return o ? (r = o[1], t[r] && t[r].push ? t[r].push(i) : t[r] = [i], t) : (t[r] = i, t)
            }, Object.create(null))
        }
        n["default"] = r
    }, {}],
    13: [function(t, e, n) {
        "use strict";

        function r() {
            i()
        }

        function i() {
            E = 0, o(s, D), u(l, F), u(y, F), v.basePrice = String(E), E = 0, u(d, _), u(f, _), v.additionalOptionsPrice = String(E), E = 0, u(l, C), u(h, C), u(d, C), u(f, C), u(y, C), v.sumTotalPrice = String(E), a(l, E)
        }

        function o(t, e) {
            var n = Number(e.dataset.priceoneroom),
                r = Number(e.dataset.metersover),
                i = Number(e.dataset.parket),
                o = Number(e.dataset.parketover),
                u = Number(e.dataset.laminate),
                a = Number(e.dataset.laminateover),
                s = Number(e.dataset.massiv),
                l = Number(e.dataset.massivover),
                c = t.material,
                h = Number(p.area),
                d = Number(p.room);
            "Паркетная доска" === c ? r >= h ? 1 === d ? y.calcprice = String(h * i) : 2 === d ? y.calcprice = String(h * i + n) : 3 === d ? y.calcprice = String(h * i + 2 * n) : 4 === d ? y.calcprice = String(h * i + 3 * n) : 5 === d ? y.calcprice = String(h * i + 4 * n) : "C" == p.room && (y.calcprice = String(h * i)) : 1 === d ? y.calcprice = String(h * o) : 2 === d ? y.calcprice = String(h * o + n) : 3 === d ? y.calcprice = String(h * o + 2 * n) : 4 === d ? y.calcprice = String(h * o + 3 * n) : 5 === d ? y.calcprice = String(h * o + 4 * n) : "C" == p.room && (y.calcprice = String(h * o)) : "Ламинат" === c ? r >= h ? 1 === d ? y.calcprice = String(h * u) : 2 === d ? y.calcprice = String(h * u + n) : 3 === d ? y.calcprice = String(h * u + 2 * n) : 4 === d ? y.calcprice = String(h * u + 3 * n) : 5 === d ? y.calcprice = String(h * u + 4 * n) : "C" == p.room && (y.calcprice = String(h * u)) : 1 === d ? y.calcprice = String(h * a) : 2 === d ? y.calcprice = String(h * a + n) : 3 === d ? y.calcprice = String(h * a + 2 * n) : 4 === d ? y.calcprice = String(h * a + 3 * n) : 5 === d ? y.calcprice = String(h * a + 4 * n) : "C" == p.room && (y.calcprice = String(h * a)) : "Инженерная доска" === c && (r >= h ? 1 === d ? y.calcprice = String(h * s) : 2 === d ? y.calcprice = String(h * s + n) : 3 === d ? y.calcprice = String(h * s + 2 * n) : 4 === d ? y.calcprice = String(h * s + 3 * n) : 5 === d ? y.calcprice = String(h * s + 4 * n) : "C" == p.room && (y.calcprice = String(h * s)) : 1 === d ? y.calcprice = String(h * l) : 2 === d ? y.calcprice = String(h * l + n) : 3 === d ? y.calcprice = String(h * l + 2 * n) : 4 === d ? y.calcprice = String(h * l + 3 * n) : 5 === d ? y.calcprice = String(h * l + 4 * n) : "C" == p.room && (y.calcprice = String(h * l)))
        }

        function u(t, e) {
            for (var n in t) E += "string" == typeof t[n] ? Number(t[n]) : t[n] instanceof Array ? Number(t[n]) : Number(t[n].value);
            e.textContent = String(E).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")
        }

        function a(t, e) {
            var n = t[Object.keys(t)[0]].title,
                r = n.match(/^[^\s—-]+/);
            k.textContent = r[0], b.textContent = String(e).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ")
        }
        var s = Object.create(null);
        n.storeStyle = s;
        var l = Object.create(null);
        n.storeStylePrice = l;
        var c = Object.create(null);
        n.storeParameters = c;
        var p = Object.create(null);
        n.storeAreaParameters = p;
        var h = Object.create(null);
        n.priceStoreParameters = h;
        var d = Object.create(null);
        n.storeOptions = d;
        var f = Object.create(null);
        n.storeOptionsWindow = f;
        var m = Object.create(null);
        n.storeAdditionalOptionsElement = m;
        var v = Object.create(null);
        n.storeAllPrice = v;
        var y = Object.create(null),
            g = Object.create(null);
        n.storeTransformApartment = g;
        var A = Object.create(null);
        n.storeStyleTransformApartment = A;
        var E, S = document.querySelector("main>form.calc-price>ol>li.final-estimate>ul.final-price"),
            C = S.querySelector("li.total>span.total-price>span.price"),
            F = S.querySelector("li.style-price>div.style-price>span.total-price>span.price"),
            _ = S.querySelector("li.additional-options>div.additional-options>span.total-price>span.price"),
            k = document.querySelector("header.moving-hat>ul.container>li.style>span.style"),
            b = document.querySelector("header.moving-hat>ul.container>li.total-price>span.price"),
            D = document.querySelector("main>form.calc-price>ol>li.style>section.triplets>div>ul>li");
        n["default"] = r, n.update = i
    }, {}],
    14: [function(t, e, n) {
        "use strict";

        function r() {
            var t = document.getElementById("add-options"),
                e = document.querySelector("main>form.calc-price>ol>li.additional-options");
            v && t.addEventListener("click", function(t) {
                return s(e)
            })
        }

        function i() {
            f = 0;
            var t = function(t) {
                for (var e in t) f++
            };
            t(c), t(p), t(h), t(d), 3 >= f ? v.classList.add("standard") : v.classList.remove("standard"), 6 >= f ? u() : o()
        }

        function o() {
            var t = Object.create(null),
                e = function(t, e) {
                    for (var n in e) t.querySelector("img").src = e[n].src, t.querySelector("p").textContent = e[n].title.substr(0, 1).toUpperCase() + e[n].title.substr(1)
                },
                n = function(e) {
                    for (var n in e) t[n] = {
                        title: e[n].title,
                        src: e[n].src
                    }
                },
                r = v.children,
                i = Array.prototype.slice.call(r),
                o = i.splice(0, 1);
            e(o[0], c), n(p), n(h), n(d);
            for (var u = 0, a = Object.keys(t).length, s = [], l = 0; 5 > l;) {
                var f = Math.floor(Math.random() * (a - u)) + u; - 1 === s.indexOf(f) && (s.push(f), l++)
            }
            for (var m = 0; 5 > m; m++) i[m].querySelector("img").src = t[Object.keys(t)[s[m]]].src, i[m].querySelector("p").textContent = t[Object.keys(t)[s[m]]].title
        }

        function u() {
            for (var t in m) v.removeChild(m[t]), delete m[t];
            var e = function(t) {
                for (var e in t) v.appendChild(a(e, t))
            };
            e(c), e(p), e(h), e(d)
        }

        function a(t, e) {
            var n = document.createElement("li"),
                r = document.createElement("img"),
                i = document.createElement("p");
            return r.src = e[t].src, i.textContent = e[t].title.substr(0, 1).toUpperCase() + e[t].title.substr(1), m[t] = n, n.appendChild(r), n.appendChild(i), n
        }

        function s(t) {
            var e = t.getBoundingClientRect().top + window.pageYOffset - 80;
            l["default"](window, e, 600)
        }
        var l = t("../../lib/utils/animation/scrollElementTo"),
            c = Object.create(null);
        n.storeStyleTransformApartment = c;
        var p = Object.create(null);
        n.storeWallTransformApartment = p;
        var h = Object.create(null);
        n.storeFloorTransformApartment = h;
        var d = Object.create(null);
        n.storeOptionsTransformApartment = d;
        var f, m = Object.create(null),
            v = document.getElementById("transformApartment");
        n["default"] = r, n.updateTransformApartment = i
    }, {
        "../../lib/utils/animation/scrollElementTo": 18
    }],
    15: [function(t, e, n) {
        "use strict";

        function r(t) {
            for (var e = this; e && e.nodeType === Node.ELEMENT_NODE;) {
                if (e.matches(t)) return e;
                e = e.parentElement
            }
            return null
        }
        t("./Element.matches"), Element && !Element.prototype.closest && (Element.prototype.closest = r)
    }, {
        "./Element.matches": 16
    }],
    16: [function(t, e, n) {
        function r() {
            var t = Element.prototype;
            t.matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || i
        }

        function i(t) {
            for (var e = this, n = e.ownerDocument.querySelectorAll(t), r = n.length; --r >= 0 && n.item(r) !== e;);
            return r > -1
        }
        Element && !Element.prototype.matches && r()
    }, {}],
    17: [function(t, e, n) {
        "use strict";

        function r(t) {
            return t
        }

        function i(t) {
            return t * t
        }

        function o(t) {
            return t * (2 - t)
        }

        function u(t) {
            return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t
        }

        function a(t) {
            return t * t * t
        }

        function s(t) {
            return --t * t * t + 1
        }

        function l(t) {
            return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }
        n.linear = r, n.quadIn = i, n.quadOut = o, n.quadInOut = u, n.cubicIn = a, n.cubicOut = s, n.cubicInOut = l
    }, {}],
    18: [function(t, e, n) {
        "use strict";

        function r(t, e, n, r, o) {
            if (void 0 === r && (r = !1), void 0 === o && (o = i.quadInOut), !(0 >= n) && t) {
                var u, a;
                t instanceof Window ? r ? (u = t.pageXOffset, a = function(e) {
                    return t.scrollTo(e, t.pageYOffset)
                }) : (u = t.pageYOffset, a = function(e) {
                    return t.scrollTo(t.pageXOffset, e)
                }) : t instanceof HTMLElement && (r ? (u = t.scrollLeft, a = function(e) {
                    return t.scrollLeft = e
                }) : (u = t.scrollTop, a = function(e) {
                    return t.scrollTop = e
                }));
                var s = e - u,
                    l = Date.now(),
                    c = function() {
                        var t = (Date.now() - l) / n;
                        return t >= 1 ? void a(e) : (a(u + s * o(t) | 0), void window.requestAnimationFrame(c))
                    };
                c()
            }
        }
        var i = t("./Ease");
        n["default"] = r
    }, {
        "./Ease": 17
    }],
    19: [function(t, e, n) {
        ! function(t, r) {
            "object" == typeof n && "undefined" != typeof e ? e.exports = r() : "function" == typeof define && define.amd ? define(r) : t.IMask = r()
        }(this, function() {
            "use strict";

            function t(t, e) {
                return e = {
                    exports: {}
                }, t(e, e.exports), e.exports
            }

            function e(t) {
                return "string" == typeof t || t instanceof String
            }

            function n(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                return e(t) ? t : t ? n : r;
            }

            function r(t, e) {
                return e === At.LEFT && --t, t
            }

            function i(t) {
                return t.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")
            }

            function o(t, e) {
                if (e === t) return !0;
                var n, r = Array.isArray(e),
                    i = Array.isArray(t);
                if (r && i) {
                    if (e.length != t.length) return !1;
                    for (n = 0; n < e.length; n++)
                        if (!o(e[n], t[n])) return !1;
                    return !0
                }
                if (r != i) return !1;
                if (e && t && "object" === ("undefined" == typeof e ? "undefined" : pt(e)) && "object" === ("undefined" == typeof t ? "undefined" : pt(t))) {
                    var u = Object.keys(e),
                        a = e instanceof Date,
                        s = t instanceof Date;
                    if (a && s) return e.getTime() == t.getTime();
                    if (a != s) return !1;
                    var l = e instanceof RegExp,
                        c = t instanceof RegExp;
                    if (l && c) return e.toString() == t.toString();
                    if (l != c) return !1;
                    for (n = 0; n < u.length; n++)
                        if (!Object.prototype.hasOwnProperty.call(t, u[n])) return !1;
                    for (n = 0; n < u.length; n++)
                        if (!o(e[u[n]], t[u[n]])) return !1;
                    return !0
                }
                return !1
            }

            function u(t) {
                if (null == t) throw new Error("mask property should be defined");
                return t instanceof RegExp ? Et : e(t) ? IMask.MaskedPattern : t.prototype instanceof gt ? t : Array.isArray(t) || t === Array ? IMask.MaskedDynamic : t instanceof Number || "number" == typeof t || t === Number ? Ct : t instanceof Date || t === Date ? IMask.MaskedDate : t instanceof Function ? St : (console.warn("Mask not found for mask", t), gt)
            }

            function a(t) {
                t = ft({}, t);
                var e = t.mask;
                if (e instanceof gt) return e;
                var n = u(e);
                return new n(t)
            }

            function s(t) {
                return {
                    mask: "*".repeat(t[0].length),
                    validate: function(e, n) {
                        return t.some(function(t) {
                            return t.indexOf(n.unmaskedValue) >= 0
                        })
                    }
                }
            }

            function l(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Bt(t, e)
            }
            var c = function(t) {
                    if (void 0 == t) throw TypeError("Can't call method on  " + t);
                    return t
                },
                p = function(t) {
                    return Object(c(t))
                },
                h = {}.hasOwnProperty,
                d = function(t, e) {
                    return h.call(t, e)
                },
                f = {}.toString,
                m = function(t) {
                    return f.call(t).slice(8, -1)
                },
                v = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
                    return "String" == m(t) ? t.split("") : Object(t)
                },
                y = function(t) {
                    return v(c(t))
                },
                g = Math.ceil,
                A = Math.floor,
                E = function(t) {
                    return isNaN(t = +t) ? 0 : (t > 0 ? A : g)(t)
                },
                S = Math.min,
                C = function(t) {
                    return t > 0 ? S(E(t), 9007199254740991) : 0
                },
                F = Math.max,
                _ = Math.min,
                k = function(t, e) {
                    return t = E(t), 0 > t ? F(t + e, 0) : _(t, e)
                },
                b = function(t) {
                    return function(e, n, r) {
                        var i, o = y(e),
                            u = C(o.length),
                            a = k(r, u);
                        if (t && n != n) {
                            for (; u > a;)
                                if (i = o[a++], i != i) return !0
                        } else
                            for (; u > a; a++)
                                if ((t || a in o) && o[a] === n) return t || a || 0;
                        return !t && -1
                    }
                },
                D = t(function(t) {
                    var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                    "number" == typeof __g && (__g = e)
                }),
                w = "__core-js_shared__",
                P = D[w] || (D[w] = {}),
                B = function(t) {
                    return P[t] || (P[t] = {})
                },
                T = 0,
                O = Math.random(),
                x = function(t) {
                    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++T + O).toString(36))
                },
                I = B("keys"),
                L = function(t) {
                    return I[t] || (I[t] = x(t))
                },
                N = b(!1),
                q = L("IE_PROTO"),
                M = function(t, e) {
                    var n, r = y(t),
                        i = 0,
                        o = [];
                    for (n in r) n != q && d(r, n) && o.push(n);
                    for (; e.length > i;) d(r, n = e[i++]) && (~N(o, n) || o.push(n));
                    return o
                },
                j = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
                R = Object.keys || function(t) {
                    return M(t, j)
                },
                H = t(function(t) {
                    var e = t.exports = {
                        version: "2.4.0"
                    };
                    "number" == typeof __e && (__e = e)
                }),
                V = (H.version, function(t) {
                    return "object" == typeof t ? null !== t : "function" == typeof t
                }),
                U = function(t) {
                    if (!V(t)) throw TypeError(t + " is not an object!");
                    return t
                },
                W = function(t) {
                    try {
                        return !!t()
                    } catch (e) {
                        return !0
                    }
                },
                z = !W(function() {
                    return 7 != Object.defineProperty({}, "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                }),
                Y = D.document,
                J = V(Y) && V(Y.createElement),
                $ = function(t) {
                    return J ? Y.createElement(t) : {}
                },
                G = !z && !W(function() {
                    return 7 != Object.defineProperty($("div"), "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                }),
                X = function(t, e) {
                    if (!V(t)) return t;
                    var n, r;
                    if (e && "function" == typeof(n = t.toString) && !V(r = n.call(t))) return r;
                    if ("function" == typeof(n = t.valueOf) && !V(r = n.call(t))) return r;
                    if (!e && "function" == typeof(n = t.toString) && !V(r = n.call(t))) return r;
                    throw TypeError("Can't convert object to primitive value")
                },
                Z = Object.defineProperty,
                Q = z ? Object.defineProperty : function(t, e, n) {
                    if (U(t), e = X(e, !0), U(n), G) try {
                        return Z(t, e, n)
                    } catch (r) {}
                    if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                    return "value" in n && (t[e] = n.value), t
                },
                K = {
                    f: Q
                },
                tt = function(t, e) {
                    return {
                        enumerable: !(1 & t),
                        configurable: !(2 & t),
                        writable: !(4 & t),
                        value: e
                    }
                },
                et = z ? function(t, e, n) {
                    return K.f(t, e, tt(1, n))
                } : function(t, e, n) {
                    return t[e] = n, t
                },
                nt = t(function(t) {
                    var e = x("src"),
                        n = "toString",
                        r = Function[n],
                        i = ("" + r).split(n);
                    H.inspectSource = function(t) {
                        return r.call(t)
                    }, (t.exports = function(t, n, r, o) {
                        var u = "function" == typeof r;
                        u && (d(r, "name") || et(r, "name", n)), t[n] !== r && (u && (d(r, e) || et(r, e, t[n] ? "" + t[n] : i.join(String(n)))), t === D ? t[n] = r : o ? t[n] ? t[n] = r : et(t, n, r) : (delete t[n], et(t, n, r)))
                    })(Function.prototype, n, function() {
                        return "function" == typeof this && this[e] || r.call(this)
                    })
                }),
                rt = function(t) {
                    if ("function" != typeof t) throw TypeError(t + " is not a function!");
                    return t
                },
                it = function(t, e, n) {
                    if (rt(t), void 0 === e) return t;
                    switch (n) {
                        case 1:
                            return function(n) {
                                return t.call(e, n)
                            };
                        case 2:
                            return function(n, r) {
                                return t.call(e, n, r)
                            };
                        case 3:
                            return function(n, r, i) {
                                return t.call(e, n, r, i)
                            }
                    }
                    return function() {
                        return t.apply(e, arguments)
                    }
                },
                ot = "prototype",
                ut = function(t, e, n) {
                    var r, i, o, u, a = t & ut.F,
                        s = t & ut.G,
                        l = t & ut.S,
                        c = t & ut.P,
                        p = t & ut.B,
                        h = s ? D : l ? D[e] || (D[e] = {}) : (D[e] || {})[ot],
                        d = s ? H : H[e] || (H[e] = {}),
                        f = d[ot] || (d[ot] = {});
                    s && (n = e);
                    for (r in n) i = !a && h && void 0 !== h[r], o = (i ? h : n)[r], u = p && i ? it(o, D) : c && "function" == typeof o ? it(Function.call, o) : o, h && nt(h, r, o, t & ut.U), d[r] != o && et(d, r, u), c && f[r] != o && (f[r] = o)
                };
            D.core = H, ut.F = 1, ut.G = 2, ut.S = 4, ut.P = 8, ut.B = 16, ut.W = 32, ut.U = 64, ut.R = 128;
            var at = ut,
                st = function(t, e) {
                    var n = (H.Object || {})[t] || Object[t],
                        r = {};
                    r[t] = e(n), at(at.S + at.F * W(function() {
                        n(1)
                    }), "Object", r)
                };
            st("keys", function() {
                return function(t) {
                    return R(p(t))
                }
            });
            var lt = (H.Object.keys, function(t) {
                var e = String(c(this)),
                    n = "",
                    r = E(t);
                if (0 > r || r == 1 / 0) throw RangeError("Count can't be negative");
                for (; r > 0;
                    (r >>>= 1) && (e += e)) 1 & r && (n += e);
                return n
            });
            at(at.P, "String", {
                repeat: lt
            });
            var ct = (H.String.repeat, function(t, e, n, r) {
                var i = String(c(t)),
                    o = i.length,
                    u = void 0 === n ? " " : String(n),
                    a = C(e);
                if (o >= a || "" == u) return i;
                var s = a - o,
                    l = lt.call(u, Math.ceil(s / u.length));
                return l.length > s && (l = l.slice(0, s)), r ? l + i : i + l
            });
            at(at.P, "String", {
                padStart: function(t) {
                    return ct(this, t, arguments.length > 1 ? arguments[1] : void 0, !0)
                }
            });
            H.String.padStart;
            at(at.P, "String", {
                padEnd: function(t) {
                    return ct(this, t, arguments.length > 1 ? arguments[1] : void 0, !1)
                }
            });
            var pt = (H.String.padEnd, "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }),
                ht = function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                },
                dt = function() {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                        }
                    }
                    return function(e, n, r) {
                        return n && t(e.prototype, n), r && t(e, r), e
                    }
                }(),
                ft = Object.assign || function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                    }
                    return t
                },
                mt = function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                },
                vt = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                },
                yt = function() {
                    function t(e) {
                        ht(this, t), ft(this, {
                            inserted: "",
                            overflow: !1,
                            removedCount: 0,
                            shift: 0
                        }, e)
                    }
                    return t.prototype.aggregate = function(t) {
                        return this.inserted += t.inserted, this.removedCount += t.removedCount, this.shift += t.shift, this.overflow = this.overflow || t.overflow, t.rawInserted && (this.rawInserted += t.rawInserted), this
                    }, dt(t, [{
                        key: "offset",
                        get: function() {
                            return this.shift + this.inserted.length - this.removedCount
                        }
                    }, {
                        key: "rawInserted",
                        get: function() {
                            return null != this._rawInserted ? this._rawInserted : this.inserted
                        },
                        set: function(t) {
                            this._rawInserted = t
                        }
                    }]), t
                }(),
                gt = function() {
                    function t(e) {
                        ht(this, t), this._value = "", this._update(ft({}, t.DEFAULTS, e)), this.isInitialized = !0
                    }
                    return t.prototype.updateOptions = function(t) {
                        this.withValueRefresh(this._update.bind(this, t))
                    }, t.prototype._update = function(t) {
                        ft(this, t)
                    }, t.prototype.clone = function() {
                        var e = new t(this);
                        return e._value = this.value.slice(), e
                    }, t.prototype.reset = function() {
                        this._value = ""
                    }, t.prototype.resolve = function(t) {
                        return this.reset(), this._append(t, {
                            input: !0
                        }), this._appendTail(), this.doCommit(), this.value
                    }, t.prototype.nearestInputPos = function(t) {
                        return t
                    }, t.prototype.extractInput = function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length;
                        return this.value.slice(t, e)
                    }, t.prototype._extractTail = function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length;
                        return this.extractInput(t, e)
                    }, t.prototype._appendTail = function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                        return this._append(t, {
                            tail: !0
                        })
                    }, t.prototype._append = function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            n = this.value.length,
                            r = this.clone(),
                            i = !1;
                        t = this.doPrepare(t, e);
                        for (var o = 0; o < t.length; ++o) {
                            if (this._value += t[o], this.doValidate(e) === !1 && (ft(this, r), !e.input)) {
                                i = !0;
                                break
                            }
                            r = this.clone()
                        }
                        return new yt({
                            inserted: this.value.slice(n),
                            overflow: i
                        })
                    }, t.prototype.appendWithTail = function(t, e) {
                        for (var n = new yt, r = this.clone(), i = void 0, o = 0; o < t.length; ++o) {
                            var u = t[o],
                                a = this._append(u, {
                                    input: !0
                                });
                            i = this.clone();
                            var s = !a.overflow && !this._appendTail(e).overflow;
                            if (!s || this.doValidate({
                                    tail: !0
                                }) === !1) {
                                ft(this, r);
                                break
                            }
                            ft(this, i), r = this.clone(), n.aggregate(a)
                        }
                        return n.shift += this._appendTail(e).shift, n
                    }, t.prototype._unmask = function() {
                        return this.value
                    }, t.prototype.remove = function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length - t;
                        this._value = this.value.slice(0, t) + this.value.slice(t + e)
                    }, t.prototype.withValueRefresh = function(t) {
                        if (this._refreshing || !this.isInitialized) return t();
                        this._refreshing = !0;
                        var e = this.unmaskedValue,
                            n = t();
                        return this.unmaskedValue = e, delete this._refreshing, n
                    }, t.prototype.doPrepare = function(t, e) {
                        return this.prepare(t, this, e)
                    }, t.prototype.doValidate = function(t) {
                        return this.validate(this.value, this, t)
                    }, t.prototype.doCommit = function() {
                        this.commit(this.value, this)
                    }, t.prototype.splice = function(t, e, n, r) {
                        var i = t + e,
                            o = this._extractTail(i),
                            u = this.nearestInputPos(t, r);
                        this.remove(u);
                        var a = this.appendWithTail(n, o);
                        return a.shift += u - t, a
                    }, dt(t, [{
                        key: "value",
                        get: function() {
                            return this._value
                        },
                        set: function(t) {
                            this.resolve(t)
                        }
                    }, {
                        key: "unmaskedValue",
                        get: function() {
                            return this._unmask()
                        },
                        set: function(t) {
                            this.reset(), this._append(t), this._appendTail(), this.doCommit()
                        }
                    }, {
                        key: "rawInputValue",
                        get: function() {
                            return this.extractInput(0, this.value.length, {
                                raw: !0
                            })
                        },
                        set: function(t) {
                            this.reset(), this._append(t, {
                                raw: !0
                            }), this._appendTail(), this.doCommit()
                        }
                    }, {
                        key: "isComplete",
                        get: function() {
                            return !0
                        }
                    }]), t
                }();
            gt.DEFAULTS = {
                prepare: function(t) {
                    return t
                },
                validate: function() {
                    return !0
                },
                commit: function() {}
            };
            var At = {
                    NONE: 0,
                    LEFT: -1,
                    RIGHT: 1
                },
                Et = function(t) {
                    function e() {
                        return ht(this, e), vt(this, t.apply(this, arguments))
                    }
                    return mt(e, t), e.prototype._update = function(e) {
                        e.validate = function(t) {
                            return t.search(e.mask) >= 0
                        }, t.prototype._update.call(this, e)
                    }, e
                }(gt),
                St = function(t) {
                    function e() {
                        return ht(this, e), vt(this, t.apply(this, arguments))
                    }
                    return mt(e, t), e.prototype._update = function(e) {
                        e.validate = e.mask, t.prototype._update.call(this, e)
                    }, e
                }(gt),
                Ct = function(t) {
                    function e(n) {
                        return ht(this, e), vt(this, t.call(this, ft({}, e.DEFAULTS, n)))
                    }
                    return mt(e, t), e.prototype._update = function(e) {
                        e.postFormat && (console.warn("'postFormat' option is deprecated and will be removed in next release, use plain options instead."), ft(e, e.postFormat), delete e.postFormat), t.prototype._update.call(this, e), this._updateRegExps()
                    }, e.prototype._updateRegExps = function() {
                        var t = "^",
                            e = "",
                            n = "";
                        this.allowNegative ? (e += "([+|\\-]?|([+|\\-]?(0|([1-9]+\\d*))))", n += "[+|\\-]?") : e += "(0|([1-9]+\\d*))", n += "\\d*";
                        var r = (this.scale ? "(" + this.radix + "\\d{0," + this.scale + "})?" : "") + "$";
                        this._numberRegExpInput = new RegExp(t + e + r), this._numberRegExp = new RegExp(t + n + r), this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(i).join("") + "]", "g"), this._thousandsSeparatorRegExp = new RegExp(i(this.thousandsSeparator), "g")
                    }, e.prototype._extractTail = function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length;
                        return this._removeThousandsSeparators(t.prototype._extractTail.call(this, e, n))
                    }, e.prototype._removeThousandsSeparators = function(t) {
                        return t.replace(this._thousandsSeparatorRegExp, "")
                    }, e.prototype._insertThousandsSeparators = function(t) {
                        var e = t.split(this.radix);
                        return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator), e.join(this.radix)
                    }, e.prototype.doPrepare = function(e) {
                        for (var n, r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; r > o; o++) i[o - 1] = arguments[o];
                        return (n = t.prototype.doPrepare).call.apply(n, [this, this._removeThousandsSeparators(e.replace(this._mapToRadixRegExp, this.radix))].concat(i))
                    }, e.prototype.appendWithTail = function() {
                        var e, n = this.value;
                        this._value = this._removeThousandsSeparators(this.value);
                        for (var r = this.value.length, i = arguments.length, o = Array(i), u = 0; i > u; u++) o[u] = arguments[u];
                        var a = (e = t.prototype.appendWithTail).call.apply(e, [this].concat(o));
                        this._value = this._insertThousandsSeparators(this.value);
                        for (var s = r + a.inserted.length, l = 0; s >= l; ++l) this.value[l] === this.thousandsSeparator && ((r > l || l === r && n[l] === this.thousandsSeparator) && ++r, s > l && ++s);
                        return a.rawInserted = a.inserted, a.inserted = this.value.slice(r, s), a.shift += r - n.length, a
                    }, e.prototype.nearestInputPos = function(t, e) {
                        if (!e) return t;
                        var n = r(t, e);
                        return this.value[n] === this.thousandsSeparator && (t += e), t
                    }, e.prototype.doValidate = function(e) {
                        var n = e.input ? this._numberRegExpInput : this._numberRegExp,
                            r = n.test(this._removeThousandsSeparators(this.value));
                        if (r) {
                            var i = this.number;
                            r = r && !isNaN(i) && (null == this.min || this.min >= 0 || this.min <= this.number) && (null == this.max || this.max <= 0 || this.number <= this.max)
                        }
                        return r && t.prototype.doValidate.call(this, e)
                    }, e.prototype.doCommit = function() {
                        var e = this.number,
                            n = e;
                        null != this.min && (n = Math.max(n, this.min)), null != this.max && (n = Math.min(n, this.max)), n !== e && (this.unmaskedValue = String(n));
                        var r = this.value;
                        this.normalizeZeros && (r = this._normalizeZeros(r)), this.padFractionalZeros && (r = this._padFractionalZeros(r)), this._value = r, t.prototype.doCommit.call(this)
                    }, e.prototype._normalizeZeros = function(t) {
                        var e = this._removeThousandsSeparators(t).split(this.radix);
                        return e[0] = e[0].replace(/^(\D*)(0*)(\d*)/, function(t, e, n, r) {
                            return e + r
                        }), t.length && !/\d$/.test(e[0]) && (e[0] = e[0] + "0"), e.length > 1 && (e[1] = e[1].replace(/0*$/, ""), e[1].length || (e.length = 1)), this._insertThousandsSeparators(e.join(this.radix))
                    }, e.prototype._padFractionalZeros = function(t) {
                        var e = t.split(this.radix);
                        return e.length < 2 && e.push(""), e[1] = e[1].padEnd(this.scale, "0"), e.join(this.radix)
                    }, dt(e, [{
                        key: "number",
                        get: function() {
                            var t = this._removeThousandsSeparators(this._normalizeZeros(this.unmaskedValue)).replace(this.radix, ".");
                            return Number(t)
                        },
                        set: function(t) {
                            this.unmaskedValue = String(t).replace(".", this.radix)
                        }
                    }, {
                        key: "allowNegative",
                        get: function() {
                            return this.signed || null != this.min && this.min < 0 || null != this.max && this.max < 0
                        }
                    }]), e
                }(gt);
            Ct.DEFAULTS = {
                radix: ",",
                thousandsSeparator: "",
                mapToRadix: ["."],
                scale: 2,
                signed: !1,
                normalizeZeros: !0,
                padFractionalZeros: !1
            };
            var Ft = function() {
                function t(e) {
                    ht(this, t), ft(this, e), this.mask && (this._masked = a(e))
                }
                return t.prototype.reset = function() {
                    this.isHollow = !1, this.isRawInput = !1, this._masked && this._masked.reset()
                }, t.prototype.resolve = function(t) {
                    return this._masked ? this._masked.resolve(t) : !1
                }, dt(t, [{
                    key: "isInput",
                    get: function() {
                        return this.type === t.TYPES.INPUT
                    }
                }, {
                    key: "isHiddenHollow",
                    get: function() {
                        return this.isHollow && this.optional
                    }
                }]), t
            }();
            Ft.DEFAULTS = {
                0: /\d/,
                a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
                "*": /./
            }, Ft.TYPES = {
                INPUT: "input",
                FIXED: "fixed"
            };
            var _t = function() {
                    function t(e, n) {
                        var r = n.name,
                            i = n.offset,
                            o = n.mask,
                            u = n.validate;
                        ht(this, t), this.masked = e, this.name = r, this.offset = i, this.mask = o, this.validate = u || function() {
                            return !0
                        }
                    }
                    return t.prototype.doValidate = function(t) {
                        return this.validate(this.value, this, t)
                    }, dt(t, [{
                        key: "value",
                        get: function() {
                            return this.masked.value.slice(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length))
                        }
                    }, {
                        key: "unmaskedValue",
                        get: function() {
                            return this.masked.extractInput(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length))
                        }
                    }]), t
                }(),
                kt = function() {
                    function t(e) {
                        var n = e[0],
                            r = e[1],
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : String(r).length;
                        ht(this, t), this._from = n, this._to = r, this._maxLength = i, this.validate = this.validate.bind(this), this._update()
                    }
                    return t.prototype._update = function() {
                        this._maxLength = Math.max(this._maxLength, String(this.to).length), this.mask = "0".repeat(this._maxLength)
                    }, t.prototype.validate = function(t) {
                        var e = "",
                            n = "",
                            r = t.match(/^(\D*)(\d*)(\D*)/),
                            i = r[1],
                            o = r[2];
                        o && (e = "0".repeat(i.length) + o, n = "9".repeat(i.length) + o);
                        var u = t.search(/[^0]/);
                        return -1 === u && t.length <= this._matchFrom ? !0 : (e = e.padEnd(this._maxLength, "0"), n = n.padEnd(this._maxLength, "9"), this.from <= Number(n) && Number(e) <= this.to)
                    }, dt(t, [{
                        key: "to",
                        get: function() {
                            return this._to
                        },
                        set: function(t) {
                            this._to = t, this._update()
                        }
                    }, {
                        key: "from",
                        get: function() {
                            return this._from
                        },
                        set: function(t) {
                            this._from = t, this._update()
                        }
                    }, {
                        key: "maxLength",
                        get: function() {
                            return this._maxLength
                        },
                        set: function(t) {
                            this._maxLength = t, this._update()
                        }
                    }, {
                        key: "_matchFrom",
                        get: function() {
                            return this.maxLength - String(this.from).length
                        }
                    }]), t
                }();
            _t.Range = kt, _t.Enum = s;
            var bt = function(t) {
                function e() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return ht(this, e), n.definitions = ft({}, Ft.DEFAULTS, n.definitions), vt(this, t.call(this, ft({}, e.DEFAULTS, n)))
                }
                return mt(e, t), e.prototype._update = function(e) {
                    e.definitions = ft({}, this.definitions, e.definitions), e.placeholder && (console.warn("'placeholder' option is deprecated and will be removed in next release, use 'placeholderChar' and 'placeholderLazy' instead."), "char" in e.placeholder && (e.placeholderChar = e.placeholder["char"]), "lazy" in e.placeholder && (e.placeholderLazy = e.placeholder.lazy)), t.prototype._update.call(this, e), this._updateMask()
                }, e.prototype._updateMask = function() {
                    var t = this,
                        n = this.definitions;
                    this._charDefs = [], this._groupDefs = [];
                    var r = this.mask;
                    if (r && n) {
                        var i = !1,
                            o = !1,
                            u = !1,
                            a = function(a) {
                                if (t.groups) {
                                    var l = r.slice(a),
                                        c = Object.keys(t.groups).filter(function(t) {
                                            return 0 === l.indexOf(t)
                                        });
                                    c.sort(function(t, e) {
                                        return e.length - t.length
                                    });
                                    var p = c[0];
                                    if (p) {
                                        var h = t.groups[p];
                                        t._groupDefs.push(new _t(t, {
                                            name: p,
                                            offset: t._charDefs.length,
                                            mask: h.mask,
                                            validate: h.validate
                                        })), r = r.replace(p, h.mask)
                                    }
                                }
                                var d = r[a],
                                    f = !i && d in n ? Ft.TYPES.INPUT : Ft.TYPES.FIXED,
                                    m = f === Ft.TYPES.INPUT || i,
                                    v = f === Ft.TYPES.INPUT && o;
                                if (d === e.STOP_CHAR) return u = !0, "continue";
                                if ("{" === d || "}" === d) return i = !i, "continue";
                                if ("[" === d || "]" === d) return o = !o, "continue";
                                if (d === e.ESCAPE_CHAR) {
                                    if (++a, d = r[a], !d) return "break";
                                    f = Ft.TYPES.FIXED
                                }
                                t._charDefs.push(new Ft({
                                    "char": d,
                                    type: f,
                                    optional: v,
                                    stopAlign: u,
                                    unmasking: m,
                                    mask: f === Ft.TYPES.INPUT ? n[d] : function(t) {
                                        return t === d
                                    }
                                })), u = !1, s = a
                            };
                        t: for (var s = 0; s < r.length; ++s) {
                            var l = a(s);
                            switch (l) {
                                case "continue":
                                    continue;
                                case "break":
                                    break t
                            }
                        }
                    }
                }, e.prototype.doValidate = function() {
                    for (var e, n = arguments.length, r = Array(n), i = 0; n > i; i++) r[i] = arguments[i];
                    return this._groupDefs.every(function(t) {
                        return t.doValidate.apply(t, r)
                    }) && (e = t.prototype.doValidate).call.apply(e, [this].concat(r))
                }, e.prototype.clone = function() {
                    var t = this,
                        n = new e(this);
                    return n._value = this.value, n._charDefs.forEach(function(e, n) {
                        return ft(e, t._charDefs[n])
                    }), n._groupDefs.forEach(function(e, n) {
                        return ft(e, t._groupDefs[n])
                    }), n
                }, e.prototype.reset = function() {
                    t.prototype.reset.call(this), this._charDefs.forEach(function(t) {
                        delete t.isHollow
                    })
                }, e.prototype.hiddenHollowsBefore = function(t) {
                    return this._charDefs.slice(0, t).filter(function(t) {
                        return t.isHiddenHollow
                    }).length
                }, e.prototype.mapDefIndexToPos = function(t) {
                    return null != t ? t - this.hiddenHollowsBefore(t) : void 0
                }, e.prototype.mapPosToDefIndex = function(t) {
                    if (null != t) {
                        for (var e = t, n = 0; n < this._charDefs.length; ++n) {
                            var r = this._charDefs[n];
                            if (n >= e) break;
                            r.isHiddenHollow && ++e
                        }
                        return e
                    }
                }, e.prototype._unmask = function() {
                    for (var t = this.value, e = "", n = 0, r = 0; n < t.length && r < this._charDefs.length; ++r) {
                        var i = t[n],
                            o = this._charDefs[r];
                        o.isHiddenHollow || (o.unmasking && !o.isHollow && (e += i), ++n)
                    }
                    return e
                }, e.prototype._appendTail = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return this._appendChunks(t, {
                        tail: !0
                    }).aggregate(this._appendPlaceholder())
                }, e.prototype._append = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = this.value.length,
                        i = "",
                        o = !1;
                    t = this.doPrepare(t, e);
                    for (var u = 0, a = this.mapPosToDefIndex(this.value.length); u < t.length;) {
                        var s = t[u],
                            l = this._charDefs[a];
                        if (!l) {
                            o = !0;
                            break
                        }
                        l.isHollow = !1;
                        var c = void 0,
                            p = void 0,
                            h = n(l.resolve(s), s);
                        l.type === Ft.TYPES.INPUT ? (h && (this._value += h, this.doValidate() || (h = "", this._value = this.value.slice(0, -1))), c = !!h, p = !h && !l.optional, h ? i += h : (l.optional || e.input || (this._value += this.placeholderChar, p = !1), p || (l.isHollow = !0))) : (this._value += l["char"], c = h && (l.unmasking || e.input || e.raw) && !e.tail, l.isRawInput = c && (e.raw || e.input), l.isRawInput && (i += l["char"])), p || ++a, (c || p) && ++u
                    }
                    return new yt({
                        inserted: this.value.slice(r),
                        rawInserted: i,
                        overflow: o
                    })
                }, e.prototype._appendChunks = function(t) {
                    for (var e = new yt, n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; n > i; i++) r[i - 1] = arguments[i];
                    for (var o = 0; o < t.length; ++o) {
                        var u = t[o],
                            a = u[0],
                            s = u[1];
                        if (null != a && e.aggregate(this._appendPlaceholder(a)), e.aggregate(this._append.apply(this, [s].concat(r))).overflow) break
                    }
                    return e
                }, e.prototype._extractTail = function(t, e) {
                    return this._extractInputChunks(t, e)
                }, e.prototype.extractInput = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length,
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (t === e) return "";
                    for (var r = this.value, i = "", o = this.mapPosToDefIndex(e), u = t, a = this.mapPosToDefIndex(t); e > u && u < r.length && o > a; ++a) {
                        var s = r[u],
                            l = this._charDefs[a];
                        if (!l) break;
                        l.isHiddenHollow || ((l.isInput && !l.isHollow || n.raw && !l.isInput && l.isRawInput) && (i += s), ++u)
                    }
                    return i
                }, e.prototype._extractInputChunks = function() {
                    var t = this,
                        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length;
                    if (e === n) return [];
                    var r = this.mapPosToDefIndex(e),
                        i = this.mapPosToDefIndex(n),
                        o = this._charDefs.map(function(t, e) {
                            return [t, e]
                        }).slice(r, i).filter(function(t) {
                            var e = t[0];
                            return e.stopAlign
                        }).map(function(t) {
                            var e = t[1];
                            return e
                        }),
                        u = [r].concat(o, [i]);
                    return u.map(function(e, n) {
                        return [o.indexOf(e) >= 0 ? e : null, t.extractInput(t.mapDefIndexToPos(e), t.mapDefIndexToPos(u[++n]))]
                    }).filter(function(t) {
                        var e = t[0],
                            n = t[1];
                        return null != e || n
                    })
                }, e.prototype._appendPlaceholder = function(t) {
                    for (var e = this.value.length, n = t || this._charDefs.length, r = this.mapPosToDefIndex(this.value.length); n > r; ++r) {
                        var i = this._charDefs[r];
                        i.isInput && (i.isHollow = !0), this.placeholderLazy && !t || (this._value += i.isInput ? i.optional ? "" : this.placeholderChar : i["char"])
                    }
                    return new yt({
                        inserted: this.value.slice(e)
                    })
                }, e.prototype.remove = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.value.length - t,
                        n = t + e;
                    this._value = this.value.slice(0, t) + this.value.slice(n);
                    var r = this.mapPosToDefIndex(t),
                        i = this.mapPosToDefIndex(n);
                    this._charDefs.slice(r, i).forEach(function(t) {
                        return t.reset()
                    })
                }, e.prototype.nearestInputPos = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : At.NONE,
                        n = e || At.LEFT,
                        i = this.mapPosToDefIndex(t),
                        o = this._charDefs[i],
                        u = i,
                        a = void 0,
                        s = void 0,
                        l = void 0,
                        c = void 0;
                    if (e !== At.RIGHT && (o && o.isInput || e === At.NONE && t === this.value.length) && (a = i, o && !o.isHollow && (s = i)), null == s && e == At.LEFT || null == a)
                        for (c = r(u, n); c >= 0 && c < this._charDefs.length; u += n, c += n) {
                            var p = this._charDefs[c];
                            if (null == a && p.isInput && (a = u), null == l && p.isHollow && !p.isHiddenHollow && (l = u), p.isInput && !p.isHollow) {
                                s = u;
                                break
                            }
                        }
                    if (e !== At.LEFT || 0 !== u || o && o.isInput || (a = 0), e !== At.RIGHT || null == a) {
                        n = -n;
                        var h = !1;
                        for (c = r(u, n); c >= 0 && c < this._charDefs.length; u += n, c += n) {
                            var d = this._charDefs[c];
                            if (d.isInput && (a = u, d.isHollow && !d.isHiddenHollow)) break;
                            if (u === i && (h = !0), h && null != a) break
                        }
                        h = h || c >= this._charDefs.length, h && null != a && (u = a)
                    } else null == s && (u = null != l ? l : a);
                    return this.mapDefIndexToPos(u)
                }, e.prototype.group = function(t) {
                    return this.groupsByName(t)[0]
                }, e.prototype.groupsByName = function(t) {
                    return this._groupDefs.filter(function(e) {
                        return e.name === t
                    })
                }, dt(e, [{
                    key: "isComplete",
                    get: function() {
                        var t = this;
                        return !this._charDefs.some(function(e, n) {
                            return e.isInput && !e.optional && (e.isHollow || !t.extractInput(n, n + 1))
                        })
                    }
                }]), e
            }(gt);
            bt.DEFAULTS = {
                placeholderLazy: !0,
                placeholderChar: "_"
            }, bt.STOP_CHAR = "`", bt.ESCAPE_CHAR = "\\", bt.Definition = Ft, bt.Group = _t;
            var Dt = function(t) {
                function e(n) {
                    return ht(this, e), vt(this, t.call(this, ft({}, e.DEFAULTS, n)))
                }
                return mt(e, t), e.prototype._update = function(n) {
                    n.mask === Date && delete n.mask, n.pattern && (n.mask = n.pattern, delete n.pattern);
                    var r = n.groups;
                    n.groups = ft({}, e.GET_DEFAULT_GROUPS()), n.min && (n.groups.Y.from = n.min.getFullYear()), n.max && (n.groups.Y.to = n.max.getFullYear()), ft(n.groups, r), t.prototype._update.call(this, n)
                }, e.prototype.doValidate = function() {
                    for (var e, n = arguments.length, r = Array(n), i = 0; n > i; i++) r[i] = arguments[i];
                    var o = (e = t.prototype.doValidate).call.apply(e, [this].concat(r)),
                        u = this.date;
                    return o && (!this.isComplete || this.isDateExist(this.value) && u && (null == this.min || this.min <= u) && (null == this.max || u <= this.max))
                }, e.prototype.isDateExist = function(t) {
                    return this.format(this.parse(t)) === t
                }, dt(e, [{
                    key: "date",
                    get: function() {
                        return this.isComplete ? this.parse(this.value) : null
                    },
                    set: function(t) {
                        this.value = this.format(t)
                    }
                }]), e
            }(bt);
            Dt.DEFAULTS = {
                pattern: "d{.}`m{.}`Y",
                format: function(t) {
                    var e = String(t.getDate()).padStart(2, "0"),
                        n = String(t.getMonth() + 1).padStart(2, "0"),
                        r = t.getFullYear();
                    return [e, n, r].join(".")
                },
                parse: function(t) {
                    var e = t.split("."),
                        n = e[0],
                        r = e[1],
                        i = e[2];
                    return new Date(i, r - 1, n)
                }
            }, Dt.GET_DEFAULT_GROUPS = function() {
                return {
                    d: new _t.Range([1, 31]),
                    m: new _t.Range([1, 12]),
                    Y: new _t.Range([1900, 9999])
                }
            };
            var wt = function(t) {
                function e(n) {
                    ht(this, e);
                    var r = vt(this, t.call(this, ft({}, e.DEFAULTS, n)));
                    return r.currentMask = null, r
                }
                return mt(e, t), e.prototype._update = function(e) {
                    t.prototype._update.call(this, e), this.compiledMasks = Array.isArray(e.mask) ? e.mask.map(function(t) {
                        return a(t)
                    }) : []
                }, e.prototype._append = function(t) {
                    for (var e = this.value.length, n = new yt, r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; r > o; o++) i[o - 1] = arguments[o];
                    t = this.doPrepare.apply(this, [t].concat(i));
                    var u = this.rawInputValue;
                    if (this.currentMask = this.doDispatch.apply(this, [t].concat(i)), this.currentMask) {
                        var a;
                        this.currentMask.rawInputValue = u, n.shift = this.value.length - e, n.aggregate((a = this.currentMask)._append.apply(a, [t].concat(i)))
                    }
                    return n
                }, e.prototype.doDispatch = function(t, e) {
                    return this.dispatch(t, this, e)
                }, e.prototype.clone = function() {
                    var t = new e(this);
                    return t._value = this.value, this.currentMask && (t.currentMask = this.currentMask.clone()), t
                }, e.prototype.reset = function() {
                    this.currentMask && this.currentMask.reset(), this.compiledMasks.forEach(function(t) {
                        return t.reset()
                    })
                }, e.prototype._unmask = function() {
                    return this.currentMask ? this.currentMask._unmask() : ""
                }, e.prototype.remove = function() {
                    var t;
                    this.currentMask && (t = this.currentMask).remove.apply(t, arguments)
                }, e.prototype.extractInput = function() {
                    var t;
                    return this.currentMask ? (t = this.currentMask).extractInput.apply(t, arguments) : ""
                }, e.prototype.doCommit = function() {
                    this.currentMask && this.currentMask.doCommit(), t.prototype.doCommit.call(this)
                }, e.prototype.nearestInputPos = function() {
                    for (var e, n, r = arguments.length, i = Array(r), o = 0; r > o; o++) i[o] = arguments[o];
                    return this.currentMask ? (e = this.currentMask).nearestInputPos.apply(e, i) : (n = t.prototype.nearestInputPos).call.apply(n, [this].concat(i))
                }, dt(e, [{
                    key: "value",
                    get: function() {
                        return this.currentMask ? this.currentMask.value : ""
                    },
                    set: function(t) {
                        this.resolve(t)
                    }
                }, {
                    key: "isComplete",
                    get: function() {
                        return !!this.currentMask && this.currentMask.isComplete
                    }
                }]), e
            }(gt);
            wt.DEFAULTS = {
                dispatch: function(t, e, n) {
                    if (e.compiledMasks.length) {
                        var r = e.rawInputValue;
                        e.compiledMasks.forEach(function(e) {
                            e.rawInputValue = r, e._append(t, n)
                        });
                        var i = e.compiledMasks.map(function(t, e) {
                            return {
                                value: t.rawInputValue.length,
                                index: e
                            }
                        });
                        return i.sort(function(t, e) {
                            return e.value - t.value
                        }), e.compiledMasks[i[0].index]
                    }
                }
            };
            var Pt = function() {
                    function t(e, n, r, i) {
                        for (ht(this, t), this.value = e, this.cursorPos = n, this.oldValue = r, this.oldSelection = i; this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos);) --this.oldSelection.start
                    }
                    return dt(t, [{
                        key: "startChangePos",
                        get: function() {
                            return Math.min(this.cursorPos, this.oldSelection.start)
                        }
                    }, {
                        key: "insertedCount",
                        get: function() {
                            return this.cursorPos - this.startChangePos
                        }
                    }, {
                        key: "inserted",
                        get: function() {
                            return this.value.substr(this.startChangePos, this.insertedCount)
                        }
                    }, {
                        key: "removedCount",
                        get: function() {
                            return Math.max(this.oldSelection.end - this.startChangePos || this.oldValue.length - this.value.length, 0)
                        }
                    }, {
                        key: "removed",
                        get: function() {
                            return this.oldValue.substr(this.startChangePos, this.removedCount)
                        }
                    }, {
                        key: "head",
                        get: function() {
                            return this.value.substring(0, this.startChangePos)
                        }
                    }, {
                        key: "tail",
                        get: function() {
                            this.value.substring(this.startChangePos + this.insertedCount)
                        }
                    }, {
                        key: "removeDirection",
                        get: function() {
                            return this.removedCount && !this.insertedCount && (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? At.RIGHT : At.LEFT)
                        }
                    }]), t
                }(),
                Bt = function() {
                    function t(e, n) {
                        ht(this, t), this.el = e, this.masked = a(n), this._listeners = {}, this._value = "", this._unmaskedValue = "", this._saveSelection = this._saveSelection.bind(this), this._onInput = this._onInput.bind(this), this._onChange = this._onChange.bind(this), this._onDrop = this._onDrop.bind(this), this.alignCursor = this.alignCursor.bind(this), this.alignCursorFriendly = this.alignCursorFriendly.bind(this), this.bindEvents(), this.updateValue(), this._onChange()
                    }
                    return t.prototype.bindEvents = function() {
                        this.el.addEventListener("keydown", this._saveSelection), this.el.addEventListener("input", this._onInput), this.el.addEventListener("drop", this._onDrop), this.el.addEventListener("click", this.alignCursorFriendly), this.el.addEventListener("change", this._onChange)
                    }, t.prototype.unbindEvents = function() {
                        this.el.removeEventListener("keydown", this._saveSelection), this.el.removeEventListener("input", this._onInput), this.el.removeEventListener("drop", this._onDrop), this.el.removeEventListener("click", this.alignCursorFriendly), this.el.removeEventListener("change", this._onChange)
                    }, t.prototype.fireEvent = function(t) {
                        var e = this._listeners[t] || [];
                        e.forEach(function(t) {
                            return t()
                        })
                    }, t.prototype._saveSelection = function() {
                        this.value !== this.el.value && console.warn("Uncontrolled input change, refresh mask manually!"), this._selection = {
                            start: this.selectionStart,
                            end: this.cursorPos
                        }
                    }, t.prototype.updateValue = function() {
                        this.masked.value = this.el.value
                    }, t.prototype.updateControl = function() {
                        var t = this.masked.unmaskedValue,
                            e = this.masked.value,
                            n = this.unmaskedValue !== t || this.value !== e;
                        this._unmaskedValue = t, this._value = e, this.el.value !== e && (this.el.value = e), n && this._fireChangeEvents()
                    }, t.prototype.updateOptions = function(t) {
                        t = ft({}, t), t.mask === Date && this.masked instanceof Dt && delete t.mask, o(this.masked, t) || (this.masked.updateOptions(t), this.updateControl())
                    }, t.prototype.updateCursor = function(t) {
                        null != t && (this.cursorPos = t, this._delayUpdateCursor(t))
                    }, t.prototype._delayUpdateCursor = function(t) {
                        var e = this;
                        this._abortUpdateCursor(), this._changingCursorPos = t, this._cursorChanging = setTimeout(function() {
                            e.el && (e.cursorPos = e._changingCursorPos, e._abortUpdateCursor())
                        }, 10)
                    }, t.prototype._fireChangeEvents = function() {
                        this.fireEvent("accept"), this.masked.isComplete && this.fireEvent("complete")
                    }, t.prototype._abortUpdateCursor = function() {
                        this._cursorChanging && (clearTimeout(this._cursorChanging), delete this._cursorChanging)
                    }, t.prototype.alignCursor = function() {
                        this.cursorPos = this.masked.nearestInputPos(this.cursorPos, At.LEFT)
                    }, t.prototype.alignCursorFriendly = function() {
                        this.selectionStart === this.cursorPos && this.alignCursor()
                    }, t.prototype.on = function(t, e) {
                        return this._listeners[t] || (this._listeners[t] = []), this._listeners[t].push(e), this
                    }, t.prototype.off = function(t, e) {
                        if (this._listeners[t]) {
                            if (!e) return void delete this._listeners[t];
                            var n = this._listeners[t].indexOf(e);
                            return n >= 0 && this._listeners.splice(n, 1), this
                        }
                    }, t.prototype._onInput = function() {
                        this._abortUpdateCursor();
                        var t = new Pt(this.el.value, this.cursorPos, this.value, this._selection),
                            e = this.masked.splice(t.startChangePos, t.removed.length, t.inserted, t.removeDirection).offset,
                            n = this.masked.nearestInputPos(t.startChangePos + e);
                        this.updateControl(), this.updateCursor(n)
                    }, t.prototype._onChange = function() {
                        this.value !== this.el.value && this.updateValue(), this.masked.doCommit(), this.updateControl()
                    }, t.prototype._onDrop = function(t) {
                        t.preventDefault(), t.stopPropagation()
                    }, t.prototype.destroy = function() {
                        this.unbindEvents(), this._listeners.length = 0, delete this.el
                    }, dt(t, [{
                        key: "mask",
                        get: function() {
                            return this.masked.mask
                        },
                        set: function(t) {
                            if (null != t && t !== this.masked.mask) {
                                if (this.masked.constructor === u(t)) return void(this.masked.mask = t);
                                var e = a({
                                    mask: t
                                });
                                e.unmaskedValue = this.masked.unmaskedValue, this.masked = e
                            }
                        }
                    }, {
                        key: "value",
                        get: function() {
                            return this._value
                        },
                        set: function(t) {
                            this.masked.value = t, this.updateControl(), this.alignCursor()
                        }
                    }, {
                        key: "unmaskedValue",
                        get: function() {
                            return this._unmaskedValue
                        },
                        set: function(t) {
                            this.masked.unmaskedValue = t, this.updateControl(), this.alignCursor()
                        }
                    }, {
                        key: "selectionStart",
                        get: function() {
                            return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart
                        }
                    }, {
                        key: "cursorPos",
                        get: function() {
                            return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd
                        },
                        set: function(t) {
                            this.el === document.activeElement && (this.el.setSelectionRange(t, t), this._saveSelection())
                        }
                    }]), t
                }();
            return l.InputMask = Bt, l.Masked = gt, l.MaskedPattern = bt, l.MaskedNumber = Ct, l.MaskedDate = Dt, l.MaskedRegExp = Et, l.MaskedFunction = St, l.MaskedDynamic = wt, window.IMask = l, l
        })
    }, {}]
}, {}, [6]);
//# sourceMappingURL=common.js.map