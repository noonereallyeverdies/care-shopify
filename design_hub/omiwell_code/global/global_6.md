
                    "function" == typeof e)
                        this.callback = e;
                    else if ("object" == typeof e && null !== e) {
                        ["cookieKey", "minimumDuration", "maximumDisplayCount", "showOncePerPageLoad", "callback"].forEach((t => {
                            void 0 !== e[t] && (this[t] = e[t])
                        }
                        ))
                    }
                    this.bindEvent()
                }
                isTouchDevice() {
                    return "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
                }
                shouldShow(e) {
                    const t = Date.now()
                      , n = this.startDuration + this.minimumDuration
                      , r = this.getDisplayCount()
                      , i = !e.toElement && !e.relatedTarget && e.clientY < 10
                      , a = t > n
                      , o = r < this.maximumDisplayCount || null === this.maximumDisplayCount
                      , s = this.hasScrollDownCriteria && this.hasScrollUpCriteria && this.isTouchDevice();
                    return (i || s) && a && o
                }
                show() {
                    this.incrementDisplayCount(),
                    this.callback()
                }
                getDisplayCount() {
                    return Number(f.H.get(this.cookieKey))
                }
                incrementDisplayCount() {
                    if (null !== this.maximumDisplayCount) {
                        const e = this.getDisplayCount();
                        f.H.set(this.cookieKey, e + 1)
                    }
                }
                recordScrollEvent() {
                    const e = (window.pageYOffset || document.documentElement.scrollTop) / (document.body.scrollHeight - window.innerHeight || 0);
                    this.lastScrollDirection = e > this.lastScroll ? "down" : "up",
                    this.maximumScrollDistance = Math.max(this.lastScroll, e),
                    this.lastScroll = e || 0,
                    this.lastScroll >= this.minimumScrollDistance && (this.hasScrollDownCriteria = !0),
                    this.hasScrollDownCriteria && this.lastScroll <= this.maximumScrollDistance - this.minimumScrollDistanceUp && "up" === this.lastScrollDirection && (this.hasScrollUpCriteria = !0)
                }
                display() {
                    this.show(),
                    this.unbindOnDisplay && this.unbindEvent()
                }
                bindEvent() {
                    document.addEventListener("mouseout", this.exitIntent),
                    this.isTouchDevice() && document.addEventListener("scroll", this.scrollWatch),
                    document.addEventListener("visibilitychange", this.blurWatch)
                }
                unbindEvent() {
                    document.removeEventListener("mouseout", this.exitIntent),
                    document.removeEventListener("scroll", this.scrollWatch),
                    document.removeEventListener("visibilitychange", this.blurWatch)
                }
            }
            var _;
            n(9028);
            !function(e) {
                e.WIDGET = "Widget",
                e.GENERIC = "Generic",
                e.CHECKOUT = "CheckoutOffer",
                e.SMART_CART = "SmartCart"
            }(_ || (_ = {}));
            n(3406);
            const embedCSSText = e => {
                const t = document.createElement("style");
                t.type = "text/css",
                t.styleSheet ? t.styleSheet.cssText = e.trim() : t.appendChild(document.createTextNode(e.trim())),
                m.log("Embedded custom style type text/css from merchant", t),
                document.head.appendChild(t)
            }
              , embedRawJS = e => {
                const t = document.createElement("div");
                t.innerHTML = e;
                t.querySelectorAll("script").forEach((e => {
                    const t = document.createElement("script");
                    e.src ? t.src = e.src : t.text = e.textContent,
                    document.body.appendChild(t),
                    m.log("Embedded custom script with script tag from merchant", t),
                    e.remove()
                }
                )),
                (e => {
                    const t = document.createElement("script");
                    t.type = "text/javascript",
                    t.text = e,
                    m.log("Embedded custom script type text/javascript from merchant", t),
                    document.body.appendChild(t)
                }
                )(t.textContent)
            }
            ;
            var y;
            function Experiment_defineProperty(e, t, n) {
                return (t = function Experiment_toPropertyKey(e) {
                    var t = function Experiment_toPrimitive(e, t) {
                        if ("object" != typeof e || !e)
                            return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, t || "default");
                            if ("object" != typeof r)
                                return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof t ? t : t + ""
                }(t))in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                e
            }
            class Experiment {
                constructor() {
                    Experiment_defineProperty(this, "randomSelectExperimentContestant", ( (e, t) => {
                        const n = (0,
                        i.deepCopy)(e)
                          , r = {
                            experimentId: t || 0
                        }
                          , a = [];
                        for (let e = 0; e < n.length; e++) {
                            const t = Array(100 * parseInt(n[e].traffic)).fill(n[e].id);
                            a.push(...t)
                        }
                        for (let e = a.length - 1; e > 0; e--) {
                            const t = Math.floor(Math.random() * (e + 1));
                            [a[e],a[t]] = [a[t], a[e]]
                        }
                        const o = Math.floor(9999 * Math.random())
                          , s = n.findIndex((e => e.id === a[o]));
                        return -1 !== s ? (r.selectedInstance = {
                            ...n[s]
                        },
                        n.splice(s, 1),
                        r.unselectedInstances = n) : (r.selectedInstance = {
                            ...n[0]
                        },
                        n.splice(0, 1),
                        r.unselectedInstances = n),
                        r
                    }
                    )),
                    Experiment_defineProperty(this, "getElementIdsFromExperiment", (e => {
                        const t = e.data
                          , n = [];
                        for (let e = 0; e < t.length; e++)
                            n.push(t[e].element_id.toString());
                        return n
                    }
                    )),
                    this.activeExperiments = [],
                    this.foundActiveExperiments = []
                }
                init() {
                    m.heading("RebuyExperiment.init()"),
                    this.activeExperiments = window.Rebuy.shop.active_experiments || [],
                    this.foundActiveExperiments = this.initializeActiveExperiments(),
                    m.log("✅ RebuyExperiment instance initialized")
                }
                initializeActiveExperiments() {
                    const e = [...this.initializeWidgetExperiments(), ...this.initializeGenericExperiments(), ...this.initializeSmartCartExperiments()];
                    return this.initializeWatchAddedWidgetElement(),
                    m.log("✅ initializeActiveExperiments"),
                    e
                }
                initializeWidgetExperiments() {
                    const e = []
                      , t = document.querySelectorAll("div[data-rebuy-id]");
                    for (const n of t) {
                        const t = n.getAttribute("data-rebuy-id");
                        e.push(t)
                    }
                    const n = this.findActiveWidgetExperiments(e);
                    if ((null == n ? void 0 : n.length) > 0)
                        for (const e of n) {
                            const n = this.getExperimentContestant(e, e.data);
                            if (e.evaluatedExperimentDataset = n,
                            Object.keys(n).length > 0)
                                for (const r of t)
                                    if (e.placeholder_id === r.getAttribute("data-rebuy-id")) {
                                        if (e.placeholder_id !== n.selectedInstance.element_id) {
                                            const t = document.createElement("div");
                                            t.setAttribute("data-rebuy-id", n.selectedInstance.element_id),
                                            t.setAttribute("data-rebuy-experiment-id", e.id);
                                            for (let e = 0; e < r.attributes.length; e++) {
                                                const n = r.attributes[e];
                                                "data-rebuy-id" !== n.name && "data-rebuy-experiment-id" !== n.name && "data-initialized" !== n.name && t.setAttribute(n.name, n.value)
                                            }
                                            r.innerHTML = "",
                                            r.appendChild(t)
                                        } else
                                            r.setAttribute("data-rebuy-experiment-id", e.id);
                                        m.log(`🆎 Finished embedding HTML to widget element for experiment ${e.id}`)
                                    }
                        }
                    return n
                }
                initializeGenericExperiments() {
                    const e = this.findActiveGenericExperiments();
                    if ((null == e ? void 0 : e.length) > 0)
                        for (const t of e) {
                            const e = this.getExperimentContestant(t, t.data);
                            t.evaluatedExperimentDataset = e,
                            Object.keys(e).length > 0 && (e.selectedInstance.javascript_input && embedRawJS(e.selectedInstance.javascript_input),
                            e.selectedInstance.css_input && embedCSSText(e.selectedInstance.css_input))
                        }
                    return e
                }
                initializeSmartCartExperiments() {
                    if (Rebuy.smart_cart.preview)
                        return [];
                    const e = this.findActiveSmartCartExperiment();
                    return null === e ? [] : (e.evaluatedExperimentDataset = this.getExperimentContestant(e, e.data),
                    window.Rebuy.smartCartExperimentCandidateId = parseInt(e.evaluatedExperimentDataset.selectedInstance.element_id, 10),
                    [e])
                }
                getExperimentContestant(e, t) {
                    if (!e)
                        return void m.log("🆎 No experiment found in getExperimentContestant function");
                    const {id: n} = e
                      , r = Experiment.isValidExperimentSession(n)
                      , i = e.type;
                    let a;
                    if (r) {
                        if (a = Experiment.getExperimentSession(n).experiment,
                        i === _.WIDGET) {
                            this.getElementIdsFromExperiment(e).includes(a.selectedInstance.element_id) || (a = this.randomSelectExperimentContestant(t, n),
                            Experiment.setExperimentSession(n, a))
                        }
                        m.groupCollapsed(`🆎 Found testing experiment type ${i} with the ID: ${n} in cookie`),
                        m.log(a),
                        m.groupEnd()
                    } else
                        a = this.randomSelectExperimentContestant(t, n),
                        m.groupColor(`🆎 Found testing experiment type ${i} with the ID: ${n} in cookie`),
                        m.log(a),
                        m.groupEnd(),
                        Experiment.setExperimentSession(n, a);
                    return a
                }
                findActiveWidgetExperiments(e) {
                    const t = this.activeExperiments.filter((t => t.type === _.WIDGET && e.includes(t.placeholder_id.toString())));
                    return t.length > 0 && (m.groupCollapsed("🆎 Found active Widget experiments"),
                    m.log(t),
                    m.groupEnd()),
                    t
                }
                findActiveGenericExperiments() {
                    const e = this.activeExperiments
                      , t = C.Y.getCurrentShopifyPageKey()
                      , n = (0,
                    i.urlGetLocation)()
                      , r = e.filter((e => e.type === _.GENERIC && ("all_pages" === e.page_target || e.page_target === t || e.page_target_url === n.pathname)));
                    return r.length > 0 && (m.groupCollapsed("🆎 Found active Generic experiments"),
                    m.log(r),
                    m.groupEnd()),
                    r
                }
                findActiveWidgetExperiment(e) {
                    const t = this.activeExperiments.find((t => {
                        var n;
                        return t.type === _.WIDGET && (null == t || null == (n = t.placeholder_id) ? void 0 : n.toString()) === e.toString()
                    }
                    ));
                    return t && (m.groupCollapsed("🆎 Found active Widget experiment"),
                    m.log(t),
                    m.groupEnd()),
                    t
                }
                findActiveSmartCartExperiment() {
                    var e;
                    return null != (e = this.activeExperiments.find((e => e.type === _.SMART_CART))) ? e : null
                }
                initializeWatchAddedWidgetElement() {
                    document.addEventListener("rebuy:experiment.watchAddedElement", (e => {
                        var t, n;
                        const {detail: r} = e
                          , i = (null == (t = window) || null == (n = t.Rebuy) ? void 0 : n.Cart) || {};
                        if (r.elementId) {
                            const e = this.findActiveWidgetExperiment(r.elementId);
                            if (e) {
                                const t = this.getExperimentContestant(e, e.data);
                                if (e.evaluatedExperimentDataset = t,
                                Object.keys(t).length > 0) {
                                    const n = document.querySelector(`div[data-rebuy-id="${r.elementId}"]`);
                                    if (n) {
                                        if (e.placeholder_id !== t.selectedInstance.element_id) {
                                            const r = document.createElement("div");
                                            r.setAttribute("data-rebuy-id", t.selectedInstance.element_id),
                                            r.setAttribute("data-rebuy-experiment-id", e.id);
                                            for (let e = 0; e < n.attributes.length; e++) {
                                                const t = n.attributes[e];
                                                "data-rebuy-id" !== t.name && "data-rebuy-experiment-id" !== t.name && "data-initialized" !== t.name && r.setAttribute(t.name, t.value)
                                            }
                                            n.innerHTML = "",
                                            n.appendChild(r)
                                        } else
                                            n.setAttribute("data-rebuy-experiment-id", e.id);
                                        P.J.trackABTesting(e)
                                    }
                                    m.log("🆎 Finished embedding HTML")
                                }
                                if (-1 === (null == this ? void 0 : this.foundActiveExperiments.findIndex((t => t.id === e.id)))) {
                                    var a;
                                    this.foundActiveExperiments.push(e);
                                    const experimentCallback = () => {
                                        Experiment.revisitExperimentsForNull()
                                    }
                                    ;
                                    null != i && null != (a = i.cart) && a.attributes && !Object.prototype.hasOwnProperty.call(i.cart.attributes, l.$x.AB_CART_TOKEN) ? i.updateItem({
                                        attributes: {
                                            [l.$x.AB_CART_TOKEN]: i.cart.token
                                        }
                                    }, experimentCallback) : experimentCallback()
                                }
                            }
                        }
                    }
                    ))
                }
            }
            y = Experiment,
            Experiment_defineProperty(Experiment, "isValidExperimentSession", (e => {
                const t = f.H.get(l.Wc.EXPERIMENT_ID.replace(":experimentId", e))
                  , n = f.H.get("cart");
                return t && t.cartToken === n
            }
            )),
            Experiment_defineProperty(Experiment, "deleteExperimentSession", (e => {
                f.H.remove(l.Wc.EXPERIMENT_ID.replace(":experimentId", e))
            }
            )),
            Experiment_defineProperty(Experiment, "setExperimentSession", ( (e, t) => {
                const n = f.H.get("cart")
                  , r = (0,
                i.urlGetParameter)("cart_token");
                f.H.set(l.Wc.EXPERIMENT_ID.replace(":experimentId", e), {
                    cartToken: n || r,
                    experiment: t
                }, {
                    days: 14
                })
            }
            )),
            Experiment_defineProperty(Experiment, "getExperimentSession", (e => f.H.get(l.Wc.EXPERIMENT_ID.replace(":experimentId", e)))),
            Experiment_defineProperty(Experiment, "hasExperimentSession", (e => !!f.H.get(l.Wc.EXPERIMENT_ID.replace(":experimentId", e)))),
            Experiment_defineProperty(Experiment, "revisitExperimentsForNull", ( () => {
                const e = window.Rebuy.Experiment.foundActiveExperiments
                  , t = f.H.get("cart");
                if (e)
                    for (const n of e) {
                        const e = y.getExperimentSession(n.id);
                        e && (e.cartToken ? t && t !== e.cartToken && y.setExperimentSession(n.id, e.experiment) : y.setExperimentSession(n.id, e.experiment))
                    }
            }
            ));
            let b = !1;
            !function checkEnabled() {
                try {
                    window.localStorage.setItem("test", "true"),
                    window.localStorage.removeItem("test"),
                    b = !0
                } catch (e) {
                    console.log("cannot set localStorage: ", e),
                    b = !1
                }
            }();
            const w = {
                enabled: b,
                get: (e, t) => {
                    if (!w.enabled)
                        return;
                    let n = window.localStorage.getItem(e);
                    return (null == t ? void 0 : t.encrypt) && (n = (0,
                    i.decrypt)(n)),
                    n && (0,
                    i.isJSONString)(n) && (n = JSON.parse(n)),
                    n
                }
                ,
                set: (e, t, n) => {
                    if (!w.enabled)
                        return;
                    let r = (0,
                    i.isString)(t) ? t : JSON.stringify(t);
                    (null == n ? void 0 : n.encrypt) && (r = (0,
                    i.encrypt)(r)),
                    r && window.localStorage.setItem(e, r)
                }
                ,
                remove: e => {
                    window.localStorage.removeItem(e)
                }
            };
            class Modal {
                constructor() {
                    this.displayed = null,
                    this.queue = [],
                    this.root_id = "rebuy-modal",
                    this.templates = {
                        dialog: "rebuy-modal-notification-template",
                        variant: "rebuy-modal-variant-template"
                    },
                    this.init()
                }
                init() {
                    const e = window.Rebuy;
                    m.heading("Modal.init()"),
                    e.Modal = this,
                    e.modules.Modal = !0,
                    m.log("✅ Modal initialized")
                }
                async dialog(e, t) {
                    const n = await (0,
                    i.getDynamicTemplate)(this.constructor.name, this.templates[e], e)
                      , r = {
                        title: "Modal Title!",
                        style: "dialog",
                        buttons: [{
                            type: "primary",
                            label: "Okay",
                            action: "dismiss"
                        }]
                    };
                    n && ((0,
                    i.extend)(r, t),
                    r.type = e,
                    r.template = n,
                    this.queue.push(r),
                    this.show())
                }
                config(e) {
                    const t = {
                        el: "#" + this.root_id,
                        data: e.data,
                        methods: {
                            click: (0,
                            i.fnWrap)(this.click, this),
                            stopPropagation: i.stopPropagation
                        },
                        mounted: function() {
                            this.$nextTick(( () => {
                                setTimeout(( () => {
                                    e.data.visible = !0
                                }
                                ), 10)
                            }
                            ))
                        }
                    };
                    return "variant" === e.data.type && (t.methods.formatMoney = i.Money.format,
                    t.methods.variantOnSale = i.variantOnSale,
                    t.methods.variantPrice = i.variantPrice,
                    t.methods.variantCompareAtPrice = i.variantCompareAtPrice,
                    t.methods.selectVariant = i.selectVariant,
                    t.methods.selectVariantOption = i.selectVariantOption,
                    t.methods.selectVariantForOptions = i.selectVariantForOptions,
                    t.methods.variantOptionAvailable = i.variantOptionAvailable,
                    t.methods.itemImage = i.itemImage),
                    t
                }
                show() {
                    if (null !== this.displayed)
                        return !1;
                    if (0 === this.queue.length)
                        return !1;
                    const e = {
                        element: i.DOM.createElement("div", {
                            id: this.root_id
                        }),
                        data: this.queue.shift(),
                        view: null
                    };
                    e.data.visible = !1;
                    const t = this.config(e);
                    i.DOM.addClass("body", "rebuy-modal-visible"),
                    i.DOM.on("keydown", eventListenerModal, !0),
                    i.DOM.html(e.element, e.data.template),
                    i.DOM.append(e.element, "body"),
                    e.view = new d.default(t),
                    this.displayed = e
                }
                hide() {
                    if (null == this.displayed)
                        return !1;
                    this.displayed.data.visible = !1,
                    i.DOM.removeClass("body", "rebuy-modal-visible"),
                    i.DOM.off("keydown", eventListenerModal, !0),
                    setTimeout((0,
                    i.fnWrap)(( () => {
                        i.DOM.remove(`#${this.root_id}`),
                        this.displayed = null,
                        this.show()
                    }
                    ), this), 500)
                }
                click(e) {
                    if (null == this.displayed)
                        return !1;
                    let t = !0;
                    e.action,
                    "cart" === e.action && p.Z.goToCartPage(),
                    "checkout" === e.action && p.Z.checkout(),
                    "link" === e.action && (window.location = e.link),
                    "callback" === e.action && (t = e.callback(this)),
                    !1 !== t && this.hide()
                }
                confirmCallback() {
                    if (null == this.displayed)
                        return !1;
                    const e = this.displayed;
                    let t = null;
                    for (const n of e.data.buttons)
                        if ("primary" === n.type) {
                            t = n;
                            break
                        }
                    t && this.click(t)
                }
                cancelCallback() {
                    if (null == this.displayed)
                        return !1;
                    const e = this.displayed;
                    let t = null;
                    for (const n of e.data.buttons)
                        if (["secondary", "cancel"].includes(n.type)) {
                            t = n;
                            break
                        }
                    t ? this.click(t) : this.hide()
                }
            }
            const eventListenerModal = e => {
                const {Rebuy: {Modal: t}} = window
                  , n = 27 === e.keyCode
                  , r = 13 === e.keyCode;
                n && t.cancelCallback(),
                r && t.confirmCallback()
            }
            ;
            var S = n(9277);
            class Money {
                constructor(e, t) {
                    var n, r, i, a, o;
                    t = t || (null == (n = window) || null == (r = n.Shopify) || null == (i = r.currency) ? void 0 : i.active) || window.Rebuy.shop.currency;
                    const s = this.initAmount(e);
                    this.amount = s.amount,
                    this.dollars = s.dollars,
                    this.cents = s.cents,
                    this.decimals = s.decimals,
                    this.units = s.units,
                    this.currency_code = t,
                    this.currency = (0,
                    S.getCurrencyByCode)(t),
                    this.decimalMultiplier = Math.pow(10, null != (a = null == (o = this.currency) ? void 0 : o.decimal_digits) ? a : 2)
                }
                initAmount(e) {
                    void 0 === e && (e = 0);
                    const t = (e + "").split(".")
                      , n = {
                        amount: 0,
                        dollars: 0,
                        cents: 0,
                        decimals: 0,
                        units: 0
                    };
                    return "" !== t[0] && (1 === t.length ? n.cents = parseInt(t[0]) : 2 === t.length && (n.dollars = parseInt(t[0]),
                    n.cents = parseInt(t[1]),
                    n.decimals = t[1].length)),
                    n.amount = e,
                    n.units = parseInt("string" == typeof n.amount ? n.amount.replace(".", "") : n.amount),
                    n
                }
                toCents() {
                    return this.units
                }
                toAmount(e) {
                    void 0 === e && (e = this.units);
                    return e / Math.pow(10, this.decimals)
                }
                toNumber(e) {
                    return Number(e)
                }
                format(e) {
                    return this.toNumber(e).toFixed(this.decimals)
                }
                add(e) {
                    const t = parseInt("string" == typeof e ? e.replace(".", "") : e)
                      , n = this.toCents()
                      , r = this.toAmount(n + t);
                    return this.format(r)
                }
                subtract(e, t, n=!0) {
                    const r = parseInt("string" == typeof e ? e.replace(".", "") : e)
                      , i = this.toCents();
                    let a = this.toAmount(i - r);
                    return t || (a = Math.max(0, a)),
                    n ? this.format(a) : a
                }
                multiplyBy(e) {
                    const t = parseFloat(e)
                      , n = this.toCents()
                      , r = this.toAmount(n * t);
                    return this.format(r)
                }
                divideBy(e) {
                    const t = parseFloat(e)
                      , n = this.toCents()
                      , r = this.toAmount(n / t);
                    return this.format(r)
                }
            }
            var C = n(5275);
            let k = !1;
            !function checkEnabled() {
                try {
                    window.sessionStorage.setItem("test", !0),
                    window.sessionStorage.removeItem("test"),
                    k = !0
                } catch (e) {
                    console.log("cannot set sessionStorage: ", e),
                    k = !1
                }
            }();
            const T = {
                enabled: k,
                get: function(e) {
                    if (!T.enabled)
                        return;
                    let t = window.sessionStorage.getItem(e);
                    return t && "undefined" !== t && (t = JSON.parse(t)),
                    t
                },
                set: function(e, t) {
                    T.enabled && window.sessionStorage.setItem(e, JSON.stringify(t))
                },
                delete: function(e) {
                    T.enabled && window.sessionStorage.removeItem(e)
                }
            }
              , E = {
                getCurrentDomain: () => {
                    let e = null;
                    return window.location && window.location.hostname && (e = window.location.hostname),
                    e
                }
                ,
                getDefaultDomain: () => {
                    const e = window.Rebuy;
                    let t = null;
                    return e.shop.domain && (t = e.shop.domain),
                    t
                }
                ,
                getPrimaryLocale: () => {
                    const e = window.Rebuy;
                    let t = null;
                    e.shop.primary_locale && (t = e.shop.primary_locale);
                    const n = E.getCurrentDomain();
                    return e.shop.domains && e.shop.domains[n] && (t = e.shop.domains[n].primary_locale),
                    t
                }
                ,
                getCurrentLocale: () => {
                    const e = window.Shopify;
                    let t = null;
                    return e && e.locale && (t = e.locale),
                    t
                }
                ,
                getCurrentCountry: () => {
                    var e;
                    return (null == (e = window.Shopify) ? void 0 : e.country) || null
                }
                ,
                isPrimaryLocale: () => {
                    let e = !0;
                    const t = E.getPrimaryLocale()
                      , n = E.getCurrentLocale();
                    return t && n && t !== n && (e = !1),
                    e
                }
                ,
                useAbsoluteURLs: () => {
                    let e = !1;
                    return "shopify" !== C.Y.context() && (e = !0),
                    e
                }
                ,
                rootURL: () => {
                    let e = "";
                    return E.useAbsoluteURLs() && (e += "https://" + E.getDefaultDomain()),
                    e
                }
                ,
                baseURL: () => {
                    let e = E.rootURL();
                    if (E.routeRoot().length > 1)
                        e += E.routeRoot().slice(0, -1);
                    else if (!E.isPrimaryLocale()) {
                        const t = `/${E.getCurrentLocale()}`
                          , n = t + "/"
                          , r = window.location.pathname;
                        (r.endsWith(t) || r.includes(n)) && (e += t)
                    }
                    return e
                }
                ,
                routeRoot: () => {
                    var e;
                    const t = window.Shopify
                      , n = null == t || null == (e = t.routes) ? void 0 : e.root;
                    return n || "/"
                }
                ,
                cartURL: () => `${E.routeRoot()}cart`,
                sellingPlanEnabled: () => {
                    const e = window.Rebuy;
                    return !!(e.shop.integrations.recharge && e.shop.selling_plans_enabled || E.shopifySellingPlansEnabled())
                }
                ,
                shopifySellingPlansEnabled: () => {
                    var e;
                    return null == (e = window.Rebuy.shop) ? void 0 : e.shopify_selling_plans_enabled
                }
                ,
                productGroupsEnabled: () => {
                    var e;
                    return null == (e = window.Rebuy.shop) ? void 0 : e.product_groups_enabled
                }
            };
            class SmartLink {
                constructor() {
                    this.status = "ready",
                    this.id = null,
                    this.key = null,
                    this.settings = null,
                    this.states = {
                        redeemed: !1,
                        items: {},
                        landing_behavior: {
                            displayed: !1
                        },
                        success_behavior: {
                            displayed: !1
                        },
                        discount: {
                            applied: !1
                        }
                    };
                    const e = this.getKey();
                    null != e ? this.init(e) : this.destroy(),
                    Rebuy.modules.SmartLink = !0
                }
                getKey() {
                    let e = null;
                    const t = (0,
                    i.urlGetParameter)("promo_clear")
                      , n = {
                        parameter: (0,
                        i.urlGetParameter)("promo"),
                        cookie: f.H.get(l.Wc.PROMOTION)
                    };
                    return t && this.destroy(),
                    n.parameter ? e = n.parameter : n.cookie && (e = n.cookie),
                    e
                }
                setKey(e) {
                    if (null != e) {
                        const t = f.H.get(l.Wc.PROMOTION);
                        this.key = e,
                        t || f.H.set(l.Wc.PROMOTION, e, {
                            days: 1
                        })
                    }
                }
                init(e) {
                    m.heading("SmartLink.init()"),
                    this.status = "initializing",
                    C.Y.isShopifyThankYou() || C.Y.isShopifyOrderConfirmation() || C.Y.isReChargeThankYou() ? this.destroy() : (this.setKey(e),
                    m.log("SmartLink is now alive! Key:", this.key),
                    this.getSettings((e => {
                        m.log("SmartLink.getSettings:"),
                        m.log(e),
                        this.setSettings(e),
                        this.status = "ready",
                        setTimeout(( () => {
                            this.run()
                        }
                        ), 0),
                        m.log("✅ SmartLink initialized")
                    }
                    )))
                }
                getSettings(e) {
                    const {Rebuy: t} = window;
                    if (m.log("Getting settings for key:", this.key),
                    null === this.key)
                        return;
                    e = e || ( () => {}
                    );
                    const n = w.get(l.Hh.PROMOTION);
                    a.callAPI("GET", "/promo/settings", {
                        key: this.key,
                        owner: t.shop.id
                    }).then((t => {
                        var r;
                        let a = t.data;
                        if (a.states = this.states,
                        a.items)
                            for (const e of a.items)
                                (0,
                                i.initializeProduct)(e),
                                a.states.items[e.id] = {
                                    variant_id: e.selected_variant.id,
                                    confirmed: !1
                                };
                        if (m.log("=== NETWORK SETTINGS ===", a),
                        null != n && null != (r = n[this.key]) && r.states) {
                            m.log("=== STORED SETTINGS ===", n[this.key]);
                            const e = n[this.key].states;
                            a = (0,
                            i.extend)(!0, a, {
                                states: e
                            }),
                            m.log("=== COMPOSITE SETTINGS ===", a)
                        }
                        e(a)
                    }
                    ), a.callError)
                }
                setSettings(e) {
                    if (e) {
                        this.id = e.id,
                        this.settings = e;
                        const t = {};
                        t[this.key] = this.settings,
                        w.set(l.Hh.PROMOTION, t)
                    }
                }
                saveSettings() {
                    if (this.settings) {
                        const e = {};
                        e[this.key] = this.settings,
                        w.set(l.Hh.PROMOTION, e),
                        m.log("saved data", e)
                    }
                }
                isEnabled() {
                    var e;
                    let t = !1;
                    return "active" === (null == (e = this.settings) ? void 0 : e.status) && (t = !0),
                    t
                }
                isAfterStartTime() {
                    var e;
                    let t = !1;
                    const n = (0,
                    i.unixTimestamp)();
                    return null != (e = this.settings) && e.start_timestamp && n >= this.settings.start_timestamp && (t = !0),
                    m.log("now", n),
                    m.log("SmartLink.settings.start_timestamp", this.settings.start_timestamp),
                    m.log("SmartLink.isAfterStartTime", t),
                    t
                }
                isBeforeEndTime() {
                    var e;
                    let t = !0;
                    const n = (0,
                    i.unixTimestamp)();
                    return null != (e = this.settings) && e.end_timestamp && n > this.settings.end_timestamp && (t = !1),
                    m.log("now", n),
                    m.log("SmartLink.settings.end_timestamp", this.settings.end_timestamp),
                    m.log("SmartLink.isBeforeEndTime", t),
                    t
                }
                shouldRun() {
                    const {Rebuy: {Modal: e}} = window;
                    let t = !0;
                    if (null === this.settings && (m.log("SmartLink has no settings"),
                    t = !1),
                    this.isEnabled() || (t = !1,
                    e.dialog("dialog", {
                        title: "Promotion Expired",
                        message: "SmartLink promotion is no longer active.",
                        buttons: [{
                            type: "primary",
                            label: "Okay",
                            action: "dismiss"
                        }]
                    })),
                    !this.isAfterStartTime()) {
                        t = !1;
                        const n = new Date(1e3 * this.settings.start_timestamp)
                          , r = {
                            date: n.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }),
                            time: n.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        };
                        e.dialog("dialog", {
                            title: "Promotion Scheduled",
                            message: `SmartLink promotion is not yet active. Please check back after ${r.date} at ${r.time}.`,
                            buttons: [{
                                type: "primary",
                                label: "Okay",
                                action: "dismiss"
                            }]
                        })
                    }
                    if (!this.isBeforeEndTime()) {
                        t = !1;
                        const n = new Date(1e3 * this.settings.end_timestamp)
                          , r = {
                            date: n.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }),
                            time: n.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        };
                        e.dialog("dialog", {
                            title: "Promotion Expired",
                            message: `SmartLink promotion is no longer active. It ended on ${r.date} at ${r.time}.`,
                            buttons: [{
                                type: "primary",
                                label: "Okay",
                                action: "dismiss"
                            }]
                        })
                    }
                    return t
                }
                run() {
                    this.shouldRun() && (this.landingBehavior(),
                    p.Z.call.push(( () => {
                        if ("automatic" === this.settings.type)
                            m.log("Automatically add those items"),
                            this.addItems();
                        else if ("condition" === this.settings.type) {
                            m.log("Set up conditional watcher!"),
                            m.log(this.settings.condition);
                            let conditional_test = () => {}
                            ;
                            "cart_subtotal_greater_than" === this.settings.condition.type ? conditional_test = () => p.Z.subtotal() >= this.settings.condition.value : "cart_subtotal_less_than" === this.settings.condition.type && (conditional_test = () => p.Z.subtotal() < this.settings.condition.value),
                            conditional_test() ? (m.log("CONDITIONAL - Cart.call.push", !0),
                            this.addItems()) : m.log("CONDITIONAL - Cart.call.push", !1),
                            i.DOM.on("rebuy:cart.change", ( () => {
                                conditional_test() ? (m.log("CONDITIONAL - rebuy:cart.change", !0),
                                this.addItems()) : m.log("CONDITIONAL - rebuy:cart.change", !1)
                            }
                            ))
                        }
                    }
                    )))
                }
                addItems() {
                    const {Rebuy: {Modal: e, SmartCart: t}} = window;
                    if (this.hasRedeemed())
                        return void m.log("SmartLink promotion has been redeemed and will not fire anymore");
                    if (m.log("= = = = = = this.addItems called = = = = ="),
                    "ready" !== this.status)
                        return void m.log("SmartLink promo is currently working...", this.status);
                    this.status = "adding";
                    const n = [];
                    let r = 0;
                    const i = p.Z.getItems({
                        "properties._promo_id": this.id
                    });
                    for (const t of this.settings.items) {
                        let a = !1;
                        const o = this.settings.states.items[t.id];
                        for (const e of i)
                            e.product_id === t.id && (a = !0);
                        if (m.log("product", t),
                        m.log("product_state", o),
                        !a) {
                            if (m.log("Not redeemed yet..."),
                            r += 1,
                            1 !== t.variants.length && !0 !== o.confirmed) {
                                m.log("Product has NOT been confirmed, prompting for input..."),
                                e.dialog("variant", {
                                    title: "Choose Your Options",
                                    product: t,
                                    buttons: [{
                                        type: "primary block",
                                        label: "Add to Cart",
                                        action: "callback",
                                        callback: e => {
                                            e.displayed.data.buttons[0].label = "Adding...",
                                            o.variant_id = t.selected_variant.id,
                                            o.confirmed = !0,
                                            m.log("= = = Choose your options = = = :", t.title),
                                            m.log("Current selected variant", t.selected_variant.title),
                                            m.log("product ID", t.id),
                                            m.log("variant ID", t.selected_variant.id),
                                            m.log("product_state", o),
                                            this.saveSettings(),
                                            this.addItems()
                                        }
                                    }]
                                });
                                break
                            }