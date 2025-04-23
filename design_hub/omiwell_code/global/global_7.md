
                            m.log("SmartLink product HAS been confirmed..."),
                            o.variant_id = t.selected_variant.id,
                            o.confirmed = !0,
                            n.push({
                                id: t.selected_variant.id,
                                quantity: t.quantity,
                                properties: {
                                    _source: "Rebuy",
                                    _promo_id: this.id,
                                    _attribution: "Marketing Link"
                                }
                            }),
                            this.saveSettings()
                        }
                    }
                    m.log("SmartLink.addItems - count", "items: ", n.length, "unredeemed: ", r),
                    n.length && n.length === r ? (m.log("We have a count match!"),
                    "redirect" === this.settings.success_behavior.type && (this.appendLoadingIcon(),
                    t && (t.skip_open = !0)),
                    this.settings.clear_cart && "automatic" === this.settings.type && (m.log("= = = = = CLEARING CART!"),
                    p.Z.clearCart()),
                    m.log("= = = = = ADDING ITEMS TO CART!"),
                    m.log(n),
                    p.Z.addItem({
                        items: n
                    }, ( () => {
                        "redirect" === this.settings.success_behavior.type && t && setTimeout(( () => {
                            delete t.skip_open
                        }
                        ), 500),
                        this.successBehavior(),
                        this.status = "ready"
                    }
                    ))) : (this.status = "ready",
                    m.log("SmartLink.addItems complete - Status reset!"))
                }
                hasTriggeredLandingBehavior() {
                    let e = !1;
                    return this.settings.states.landing_behavior.displayed && (e = !0),
                    m.log("= = = = => this.hasTriggeredLandingBehavior", e),
                    m.log(this.settings.states),
                    e
                }
                recordTriggeredLandingBehavior() {
                    this.settings.states.landing_behavior.displayed = !0,
                    this.saveSettings()
                }
                landingBehavior() {
                    const {Rebuy: {Modal: e}} = window;
                    if (this.hasTriggeredLandingBehavior())
                        m.log("we already displayed this landing behavior!");
                    else if ("message" === this.settings.type || "dialog" === this.settings.landing_behavior.type) {
                        const t = this.settings.landing_behavior.dialog;
                        e.dialog("dialog", t),
                        this.recordTriggeredLandingBehavior()
                    }
                }
                hasTriggeredSuccessBehavior() {
                    let e = !1;
                    return this.settings.states.success_behavior.displayed && (e = !0),
                    e
                }
                recordTriggeredSuccessBehavior() {
                    this.settings.states.success_behavior.displayed = !0,
                    this.saveSettings()
                }
                successBehavior() {
                    const {Rebuy: {Modal: e}} = window;
                    this.applyDiscountCode(( () => {
                        if ("dialog" === this.settings.success_behavior.type)
                            this.hasTriggeredSuccessBehavior() ? m.log("We already displayed this success behavior!") : (e.dialog("dialog", this.settings.success_behavior.dialog),
                            this.recordTriggeredSuccessBehavior());
                        else if ("redirect" === this.settings.success_behavior.type) {
                            if ("cart" === this.settings.success_behavior.redirect.type)
                                p.Z.goToCartPage();
                            else if ("checkout" === this.settings.success_behavior.redirect.type)
                                p.Z.checkout();
                            else if ("link" === this.settings.success_behavior.redirect.type)
                                window.location = this.settings.success_behavior.redirect.link;
                            else if ("callback" === this.settings.success_behavior.redirect.type)
                                window.location = this.settings.success_behavior.redirect.callback();
                            else if ("function" === this.settings.success_behavior.redirect.type) {
                                let e = [];
                                (0,
                                i.isArray)(this.settings.success_behavior.redirect.function.arguments) ? e = this.settings.success_behavior.redirect.function.arguments : (0,
                                i.isString)(this.settings.success_behavior.redirect.function.arguments) && (e = this.settings.success_behavior.redirect.function.arguments.split(","));
                                const t = this.settings.success_behavior.redirect.function.body ? this.settings.success_behavior.redirect.function.body : "";
                                new Function(e,t)()
                            }
                        } else
                            m.log("No success behavior matches: ", this.settings.success_behavior.type)
                    }
                    )),
                    this.recordRedeemed()
                }
                applyDiscountCode(e) {
                    var t;
                    const {Rebuy: {SmartCart: n}} = window;
                    e = e || ( () => {}
                    ),
                    null != (t = this.settings.discount) && t.enabled && "code" === this.settings.discount.method ? (m.log("HAS a discount, applying discount now..."),
                    p.Z.applyShopifyDiscount(this.settings.discount.code, ( () => {
                        var t, r;
                        m.log("SmartLink.applyDiscountCode callback is triggered"),
                        (null != n && null != (t = n.discountEnabled) && t.call(n) || null != n && null != (r = n.isDiscountInputEnabled) && r.call(n)) && n.discount.fetchDiscount(this.settings.discount.code),
                        this.states.discount.applied = !0,
                        e()
                    }
                    ))) : (m.log("No discount, fire callback immediately."),
                    this.states.discount.applied = !0,
                    e()),
                    this.saveSettings()
                }
                hasRedeemed() {
                    let e = !1;
                    return this.settings.states.redeemed && (e = !0),
                    e
                }
                recordRedeemed() {
                    this.settings.states.redeemed = !0,
                    this.saveSettings()
                }
                appendLoadingIcon() {
                    const e = i.DOM.create('\n            <div id="rebuy-promo-loading" class="rebuy-modal is-visible">\n                <div class="rebuy-modal__spinner"></div>\n            </div>\n        ');
                    i.DOM.append(e, "body")
                }
                removeLoadingIcon() {
                    i.DOM.remove("#rebuy-promo-loading")
                }
                destroy(e) {
                    e = e || ( () => {}
                    ),
                    f.H.remove(l.Wc.PROMOTION),
                    w.remove(l.Hh.PROMOTION),
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
                    },
                    e()
                }
            }
            var P = n(5803);
            n(6983);
            function View_defineProperty(e, t, n) {
                return (t = function View_toPropertyKey(e) {
                    var t = function View_toPrimitive(e, t) {
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
            class View {
                constructor(e) {
                    View_defineProperty(this, "variantImage", ( (e, t, n) => (0,
                    i.variantImage)(e, t, n))),
                    View_defineProperty(this, "hasProductReviews", (e => {
                        var t, n;
                        let r = !1;
                        return null != (t = e.reviews) && t.star_rating && null != (n = e.reviews) && n.review_count && (r = !0),
                        r
                    }
                    )),
                    View_defineProperty(this, "productReviewCount", (e => {
                        let t = "";
                        return e.reviews && e.reviews.review_count && (t = `\n                <span class="rebuy-review-count-parenthesis">(</span>\n                <span class="rebuy-review-count-number">${(0,
                        i.numberWithCommas)(e.reviews.review_count)}</span>\n                <span class="rebuy-review-count-label">Reviews</span>\n                <span class="rebuy-review-count-parenthesis">)</span>`),
                        t
                    }
                    )),
                    View_defineProperty(this, "productReviewRatingPercentage", (e => {
                        var t;
                        let n = "0%";
                        return null != (t = e.reviews) && t.star_rating && (n = e.reviews.star_rating / 5 * 100 + "%"),
                        n
                    }
                    )),
                    View_defineProperty(this, "hasProductReviewsSnippet", (e => {
                        var t;
                        let n = !1;
                        return null != e && null != (t = e.reviews) && t.snippet && (n = !0),
                        n
                    }
                    )),
                    View_defineProperty(this, "progressTierReached", ( (e, t) => t.reduce(( (e, t) => e + t.quantity), 0) >= parseInt(e.required_quantity))),
                    View_defineProperty(this, "progressStepPosition", ( (e, t) => {
                        if (!t || 0 === t.length || !e)
                            return "0%";
                        const n = Math.max(...t.map((e => e.required_quantity)) || 1);
                        return `${Math.floor(e.required_quantity / n * 100 - 4)}%`
                    }
                    )),
                    View_defineProperty(this, "hasTierProgress", (e => e.length > 0)),
                    View_defineProperty(this, "tiersPercentageComplete", ( (e, t) => {
                        if (0 === e.length)
                            return "0%";
                        const n = t.reduce(( (e, t) => e + t.quantity), 0)
                          , r = e[e.length - 1].required_quantity;
                        return `${Math.min(n / r * 100, 100)}%`
                    }
                    )),
                    View_defineProperty(this, "hasProductGroup", (e => "product_group_variants"in e && "selected_product_group_id"in e)),
                    View_defineProperty(this, "shouldHideDefaultVariantTitle", (e => !!(0,
                    i.productHasDefaultVariantTitle)(e))),
                    View_defineProperty(this, "hasSelectedEnabledBundleSubscription", ( () => this.Widget.hasSelectedEnabledBundleSubscription())),
                    View_defineProperty(this, "hasSellingPlansIntervalList", ( () => {
                        const e = this.Widget;
                        var t, n;
                        if ((0,
                        i.isBundleBuilderWidget)(e) && (null == e || null == (t = e.data) || null == (n = t.selling_plan_interval_list) ? void 0 : n.length) > 0)
                            return !0;
                        return !1
                    }
                    )),
                    View_defineProperty(this, "formatBundleTierValue", ( (e, t) => (0,
                    i.handleFormattingDiscountValue)(e, t))),
                    View_defineProperty(this, "formatBundleTierLabel", (e => null != e && e.required_quantity && null != e && e.progress_bar_label ? e.progress_bar_label.replace("{{required_quantity}}", e.required_quantity) : "")),
                    View_defineProperty(this, "foundStepProductInBundleHolder", ( (e, t) => {
                        const n = this.Widget;
                        if ((0,
                        i.isBundleBuilderWidget)(this.Widget)) {
                            var r;
                            const i = (null == n || null == (r = n.data) ? void 0 : r.steps_products_bundle_map) || {};
                            if (i[t]) {
                                return i[t].find((t => parseInt(e) === parseInt(t.selected_variant_id))) || !1
                            }
                        }
                        return !1
                    }
                    )),
                    View_defineProperty(this, "getBundleVariantQuantity", ( (e, t) => {
                        let n = 0;
                        const r = this;
                        if ((0,
                        i.isBundleBuilderWidget)(r.Widget)) {
                            var a, o;
                            const i = (null == r || null == (a = r.Widget) || null == (o = a.data) ? void 0 : o.products) || [];
                            for (const r of i)
                                e === r.selected_variant_id && t === r.properties[l.LX.BUNDLE_BUILDER_STEP_INDEX] && (n += 1)
                        }
                        return n
                    }
                    )),
                    View_defineProperty(this, "removeLastAddedProductStep", ( (e, t) => {
                        var n;
                        const {Widget: r} = this;
                        if ((0,
                        i.isBundleBuilderWidget)(r) && null != r && null != (n = r.data) && n.products) {
                            var a, o;
                            const n = r.data.products.findLastIndex((n => n.selected_variant_id === e && n.properties[l.LX.BUNDLE_BUILDER_STEP_INDEX] === t));
                            r.data.products.splice(n, 1);
                            const i = 0 === (null == r || null == (a = r.data) || null == (o = a.products) ? void 0 : o.length);
                            r.setBundleBuilderATCStorage(r.data.products, i)
                        }
                    }
                    )),
                    View_defineProperty(this, "getBundleSubtotal", (e => {
                        const {Widget: t} = this;
                        return (0,
                        i.isBundleBuilderWidget)(t) ? t.getProductsSubtotalBasedOnCurrency(e) : 0
                    }
                    )),
                    View_defineProperty(this, "getBundleDiscountedSubtotal", (e => {
                        const {Widget: t} = this;
                        return (0,
                        i.isBundleBuilderWidget)(t) ? t.getBundleDiscountedSubtotal(e, !1) : 0
                    }
                    )),
                    View_defineProperty(this, "getSubBundleDiscountedSubtotal", (e => {
                        const {Widget: t} = this;
                        return (0,
                        i.isBundleBuilderWidget)(t) ? t.getBundleDiscountedSubtotal(e, !0) : 0
                    }
                    )),
                    View_defineProperty(this, "getSubBundleSubtotalSavingPercent", (e => {
                        const {Widget: t} = this;
                        if ((0,
                        i.isBundleBuilderWidget)(t)) {
                            const n = t.getProductsSubtotalBasedOnCurrency(e)
                              , r = t.getBundleDiscountedSubtotal(e, !0);
                            if (n > r)
                                return Number((n - r) / n * 100).toFixed(2) + "%"
                        }
                        return null
                    }
                    )),
                    View_defineProperty(this, "bundleHasEligibleDiscount", (e => {
                        const t = this;
                        if ((0,
                        i.isBundleBuilderWidget)(t.Widget)) {
                            var n, r, a, o;
                            const s = (null == (n = t.Widget) || null == (r = n.data) || null == (a = r.config) || null == (o = a.discount) ? void 0 : o.tiers) || []
                              , l = (0,
                            i.getEligibleBasedOnQuantity)(e, s, "required_quantity");
                            return Object.keys(l).length > 0
                        }
                        return !1
                    }
                    )),
                    View_defineProperty(this, "getBundleConfigLabel", ( (e, t={}) => {
                        var n, r, a, o;
                        if (!(0,
                        i.isBundleBuilderWidget)(this.Widget))
                            return "";
                        const s = (null == (n = this.Widget) || null == (r = n.data) || null == (a = r.config) ? void 0 : a.language) || {}
                          , l = {
                            add_to_bundle: "Add To Bundle",
                            select_product: "Select a Product"
                        };
                        var c;
                        return null != t && null != (o = t.overrides) && o.language ? (null == t || null == (c = t.language) ? void 0 : c[e]) || s[e] || l[e] || "" : s[e] || l[e] || s.title || ""
                    }
                    )),
                    View_defineProperty(this, "hasBundleHeaderSection", ( () => {
                        const e = this;
                        return (0,
                        i.isBundleBuilderWidget)(e.Widget) && (e.getBundleConfigLabel("super_title") || e.getBundleConfigLabel("title") || e.getBundleConfigLabel("description"))
                    }
                    )),
                    View_defineProperty(this, "shouldDisableAddBundleToCart", (e => {
                        var t, n, r, a, o, s, l, c, u, d, p, f, m, g;
                        const {Widget: v} = this;
                        if (!(0,
                        i.isBundleBuilderWidget)(v))
                            return !1;
                        if ("working" === v.requestQueueStatus || null != v && null != (t = v.data) && null != (n = t.config) && null != (r = n.container_holder) && r.enabled_force_to_max && e.length < (null == v || null == (a = v.data) || null == (o = a.config) || null == (s = o.container_holder) ? void 0 : s.max_value) || e.length < (null == v || null == (l = v.data) || null == (c = l.config) || null == (u = c.container_holder) ? void 0 : u.min_value))
                            return !0;
                        const _ = null == v || null == (d = v.data) || null == (p = d.config) ? void 0 : p.steps[(null == v || null == (f = v.data) || null == (m = f.config) ? void 0 : m.steps.length) - 1];
                        return !(null == _ || null == (g = _.quantity_inputs) || !g.enabled || null != _ && _.has_met_minimum_quantity)
                    }
                    )),
                    View_defineProperty(this, "shouldDisableProductAddToBundle", ( (e, t, n) => {
                        var r;
                        const i = this.Widget;
                        if (!this.variantAvailable(e.selected_variant))
                            return !0;
                        if (null != t && null != (r = t.quantity_inputs) && r.enabled) {
                            var a, o, s;
                            const r = (null == i || null == (a = i.data) ? void 0 : a.steps_products_bundle_map) || {};
                            let l = 0;
                            null == r || null == (o = r[n]) || o.forEach((t => {
                                t.product_id === e.id && l++
                            }
                            ));
                            const c = l >= t.quantity_inputs.max_quantity_per_product;
                            if ((null == r || null == (s = r[n]) ? void 0 : s.length) >= t.quantity_inputs.max_quantity_per_step || c)
                                return !0
                        }
                        return !1
                    }
                    )),
                    View_defineProperty(this, "shouldDisplayBundleTierProgressBar", ( () => {
                        const {Widget: e} = this;
                        if ((0,
                        i.isBundleBuilderWidget)(e)) {
                            const {discount: t} = e.data.config;
                            return t.enabled_progress_bar && t.tiers.length > 0
                        }
                        return !1
                    }
                    )),
                    View_defineProperty(this, "hasBundleContainerExpanded", ( () => {
                        const {Widget: e} = this;
                        return (0,
                        i.isBundleBuilderWidget)(e) && e.data.has_container_expanded
                    }
                    )),
                    View_defineProperty(this, "getRemainingBundleSlots", ( () => {
                        const {Widget: e} = this;
                        return (0,
                        i.isBundleBuilderWidget)(e) ? e.getRemainingBundleSlots() : 0
                    }
                    )),
                    View_defineProperty(this, "isBundleBuilderTabLayout", ( () => {
                        const {Widget: e} = this;
                        return e.isBundleBuilderTabLayout()
                    }
                    )),
                    View_defineProperty(this, "getBundleContainerHeaderValue", (e => {
                        const {Widget: t} = this;
                        if ((0,
                        i.isBundleBuilderWidget)(t)) {
                            const {container_holder: {max_value: n}} = t.data.config;
                            if ("container_length" === e)
                                return n;
                            if ("products_count" === e)
                                return t.data.products.length
                        }
                        return 0
                    }
                    )),
                    View_defineProperty(this, "handleSelectingBundleStep", (e => {
                        const {Widget: t} = this;
                        if ((0,
                        i.isBundleBuilderWidget)(t)) {
                            if (e < 0 || !t.data.config.steps[e])
                                return;
                            t.data.active_step_index = e,
                            t.data.active_step = t.data.config.steps[e]
                        }
                    }
                    )),
                    e && (this.Widget = e,
                    this.vue = null,
                    this.layout = null,
                    this.carousel = null,
                    this.init())
                }
                init() {
                    var e, t, n;
                    m.heading("View.init()"),
                    this.Widget.element.innerHTML = this.Widget.template,
                    this.vue = new d.default(this.getVueConfig()),
                    m.log("✅ View initialized");
                    const r = {
                        subject: "user",
                        verb: "viewed",
                        noun: "widget",
                        widget_id: this.Widget.id
                    };
                    null != this && null != (e = this.Widget) && null != (t = e.element) && null != (n = t.dataset) && n.rebuyExperimentId || P.J.trackEvent(r),
                    setTimeout(( () => o.end("Widget ID:" + this.Widget.id)), 0)
                }
                getVueConfig() {
                    const e = this;
                    return {
                        el: e.Widget.element,
                        data: e.Widget.data,
                        methods: {
                            View: function() {
                                return e
                            },
                            Widget: function() {
                                return e.Widget
                            },
                            show: (0,
                            i.fnWrap)(e.show, e),
                            hide: (0,
                            i.fnWrap)(e.hide, e),
                            text: (0,
                            i.fnWrap)(e.text, e),
                            stopPropagation: (0,
                            i.fnWrap)(e.stopPropagation, e),
                            formatMoney: (0,
                            i.fnWrap)(e.formatMoney, e),
                            sizeImage: (0,
                            i.fnWrap)(e.sizeImage, e),
                            itemImage: (0,
                            i.fnWrap)(e.itemImage, e),
                            productImage: (0,
                            i.fnWrap)(e.productImage, e),
                            variantImage: (0,
                            i.fnWrap)(e.variantImage, e),
                            itemImageAlt: (0,
                            i.fnWrap)(e.itemImageAlt, e),
                            productImageAlt: (0,
                            i.fnWrap)(e.productImageAlt, e),
                            variantImageAlt: (0,
                            i.fnWrap)(e.variantImageAlt, e),
                            isInputProduct: (0,
                            i.fnWrap)(e.isInputProduct, e),
                            variantPrice: (0,
                            i.fnWrap)(e.variantPrice, e),
                            variantCompareAtPrice: (0,
                            i.fnWrap)(e.variantCompareAtPrice, e),
                            variantOnSale: (0,
                            i.fnWrap)(e.variantOnSale, e),
                            variantAvailable: (0,
                            i.fnWrap)(e.variantAvailable, e),
                            showVariantSelect: (0,
                            i.fnWrap)(e.showVariantSelect, e),
                            showVariantTitle: (0,
                            i.fnWrap)(e.showVariantTitle, e),
                            showProductDescription: (0,
                            i.fnWrap)(e.showProductDescription, e),
                            showSubscriptionSelect: (0,
                            i.fnWrap)(e.showSubscriptionSelect, e),
                            showSubscriptionOptions: (0,
                            i.fnWrap)(e.showSubscriptionOptions, e),
                            showSubscriptionFrequency: (0,
                            i.fnWrap)(e.showSubscriptionFrequency, e),
                            updateSubscriptionFrequency: (0,
                            i.fnWrap)(e.updateSubscriptionFrequency, e),
                            showContinueButton: (0,
                            i.fnWrap)(e.showContinueButton, e),
                            productTagClasses: (0,
                            i.fnWrap)(e.productTagClasses, e),
                            hasProductReviews: (0,
                            i.fnWrap)(e.hasProductReviews, e),
                            productReviewCount: (0,
                            i.fnWrap)(e.productReviewCount, e),
                            productReviewRatingPercentage: (0,
                            i.fnWrap)(e.productReviewRatingPercentage, e),
                            hasProductReviewsSnippet: (0,
                            i.fnWrap)(e.hasProductReviewsSnippet, e),
                            displayColorSwatches: (0,
                            i.fnWrap)(e.displayColorSwatches, e),
                            displaySizeSwatches: (0,
                            i.fnWrap)(e.displaySizeSwatches, e),
                            filterOOSOptions: (0,
                            i.fnWrap)(e.filterOOSOptions, e),
                            selectVariant: (0,
                            i.fnWrap)(e.selectVariant, e),
                            selectVariantByColor: (0,
                            i.fnWrap)(e.selectVariantByColor, e),
                            selectVariantBySize: (0,
                            i.fnWrap)(e.selectVariantBySize, e),
                            selectOptionsForVariant: (0,
                            i.fnWrap)(e.selectOptionsForVariant, e),
                            selectVariantOption: (0,
                            i.fnWrap)(e.selectVariantOption, e),
                            selectVariantForOptions: (0,
                            i.fnWrap)(e.selectVariantForOptions, e),
                            variantOptionAvailable: (0,
                            i.fnWrap)(e.variantOptionAvailable, e),
                            hasSubscription: (0,
                            i.fnWrap)(e.hasSubscription, e),
                            toggleSubscription: (0,
                            i.fnWrap)(e.toggleSubscription, e),
                            selectSubscription: (0,
                            i.fnWrap)(e.selectSubscription, e),
                            selectOnetime: (0,
                            i.fnWrap)(e.selectOnetime, e),
                            productIsSelected: (0,
                            i.fnWrap)(e.productIsSelected, e),
                            toggleProductSelect: (0,
                            i.fnWrap)(e.toggleProductSelect, e),
                            hasLearnMore: (0,
                            i.fnWrap)(e.hasLearnMore, e),
                            learnMoreURL: (0,
                            i.fnWrap)(e.learnMoreURL, e),
                            learnMore: (0,
                            i.fnWrap)(e.learnMore, e),
                            hasQuantityInputEnabled: (0,
                            i.fnWrap)(e.hasQuantityInputEnabled, e),
                            maxQuantityInputValue: (0,
                            i.fnWrap)(e.maxQuantityInputValue, e),
                            subtotal: (0,
                            i.fnWrap)(e.subtotal, e),
                            compareAtSubtotal: (0,
                            i.fnWrap)(e.compareAtSubtotal, e),
                            bundleOnSale: (0,
                            i.fnWrap)(e.bundleOnSale, e),
                            bundleSavings: (0,
                            i.fnWrap)(e.bundleSavings, e),
                            addToCart: (0,
                            i.fnWrap)(e.addToCart, e),
                            addUpsellToCart: (0,
                            i.fnWrap)(e.addUpsellToCart, e),
                            addSelectedProductsToCart: (0,
                            i.fnWrap)(e.addSelectedProductsToCart, e),
                            bundleRequiresAllItems: (0,
                            i.fnWrap)(e.bundleRequiresAllItems, e),
                            isBundleIncomplete: (0,
                            i.fnWrap)(e.isBundleIncomplete, e),
                            toggleCartSubscription: (0,
                            i.fnWrap)(e.toggleCartSubscription, e),
                            updateCartSubscriptionFrequency: (0,
                            i.fnWrap)(e.updateCartSubscriptionFrequency, e),
                            frequencyLabel: (0,
                            i.fnWrap)(e.frequencyLabel, e),
                            buttonAriaLabel: (0,
                            i.fnWrap)(e.buttonAriaLabel, e),
                            buttonLabel: (0,
                            i.fnWrap)(e.buttonLabel, e),
                            declineLabel: (0,
                            i.fnWrap)(e.declineLabel, e),
                            continueLabel: (0,
                            i.fnWrap)(e.continueLabel, e),
                            upgradeToSubscriptionLabel: (0,
                            i.fnWrap)(e.upgradeToSubscriptionLabel, e),
                            upgradeToSubscriptionAriaLabel: (0,
                            i.fnWrap)(e.upgradeToSubscriptionAriaLabel, e),
                            switchCartToOnetimeLabel: (0,
                            i.fnWrap)(e.switchCartToOnetimeLabel, e),
                            switchCartToSubscriptionLabel: (0,
                            i.fnWrap)(e.switchCartToSubscriptionLabel, e),
                            cartHasProduct: (0,
                            i.fnWrap)(e.cartHasProduct, e),
                            shopifyCheckoutHasProduct: () => {}
                            ,
                            rechargeCheckoutHasProduct: (0,
                            i.fnWrap)(e.rechargeCheckoutHasProduct, e),
                            availableAddOnCount: (0,
                            i.fnWrap)(e.availableAddOnCount, e),
                            purchaseOffer: (0,
                            i.fnWrap)(e.purchaseOffer, e),
                            declineOffer: (0,
                            i.fnWrap)(e.declineOffer, e),
                            purchaseProductNow: (0,
                            i.fnWrap)(e.purchaseProductNow, e),
                            thankYouTitle: (0,
                            i.fnWrap)(e.thankYouTitle, e),
                            thankYouDescription: (0,
                            i.fnWrap)(e.thankYouDescription, e),
                            dismissThankYou: (0,
                            i.fnWrap)(e.dismissThankYou, e),
                            checkout: (0,
                            i.fnWrap)(e.checkout, e),
                            hasTimer: (0,
                            i.fnWrap)(e.hasTimer, e),
                            declinePrepurchaseOffer: (0,
                            i.fnWrap)(e.declinePrepurchaseOffer, e),
                            hasAddedPrepurchase: (0,
                            i.fnWrap)(e.hasAddedPrepurchase, e),
                            removeFromCart: (0,
                            i.fnWrap)(e.removeFromCart, e),
                            buttonWidgetLabel: (0,
                            i.fnWrap)(e.buttonWidgetLabel, e),
                            currentLayout: (0,
                            i.fnWrap)(e.currentLayout, e),
                            shouldShowSavingAmount: (0,
                            i.fnWrap)(e.shouldShowSavingAmount, e),
                            shouldRenderSavingAmount: (0,
                            i.fnWrap)(e.shouldRenderSavingAmount, e),
                            savingAmountLabel: (0,
                            i.fnWrap)(e.savingAmountLabel, e),
                            hasProductGroup: (0,
                            i.fnWrap)(e.hasProductGroup, e),
                            progressTierReached: (0,
                            i.fnWrap)(e.progressTierReached, e),
                            progressStepPosition: (0,
                            i.fnWrap)(e.progressStepPosition, e),
                            hasTierProgress: (0,
                            i.fnWrap)(e.hasTierProgress, e),
                            tiersPercentageComplete: (0,
                            i.fnWrap)(e.tiersPercentageComplete, e),
                            addProductToBundle: (0,
                            i.fnWrap)(e.addProductToBundle, e),
                            addProductsToBundle: (0,
                            i.fnWrap)(e.addProductsToBundle, e),
                            handleExpandingBundleContainer: (0,
                            i.fnWrap)(e.handleExpandingBundleContainer, e),
                            handleRemovingProductFromBundle: (0,
                            i.fnWrap)(e.handleRemovingProductFromBundle, e),
                            handleSelectingBundleStep: (0,
                            i.fnWrap)(e.handleSelectingBundleStep, e),
                            formatBundleTierValue: (0,
                            i.fnWrap)(e.formatBundleTierValue, e),
                            formatBundleTierLabel: (0,
                            i.fnWrap)(e.formatBundleTierLabel, e),
                            foundStepProductInBundleHolder: (0,
                            i.fnWrap)(e.foundStepProductInBundleHolder, e),
                            getBundleVariantQuantity: (0,
                            i.fnWrap)(e.getBundleVariantQuantity, e),
                            removeLastAddedProductStep: (0,
                            i.fnWrap)(e.removeLastAddedProductStep, e),
                            shouldHideDefaultVariantTitle: (0,
                            i.fnWrap)(e.shouldHideDefaultVariantTitle, e),
                            getBundleSubtotal: (0,
                            i.fnWrap)(e.getBundleSubtotal, e),
                            getBundleDiscountedSubtotal: (0,
                            i.fnWrap)(e.getBundleDiscountedSubtotal, e),
                            getSubBundleDiscountedSubtotal: (0,
                            i.fnWrap)(e.getSubBundleDiscountedSubtotal, e),
                            getBundleConfigLabel: (0,
                            i.fnWrap)(e.getBundleConfigLabel, e),
                            getBundleContainerHeaderValue: (0,
                            i.fnWrap)(e.getBundleContainerHeaderValue, e),
                            bundleHasEligibleDiscount: (0,
                            i.fnWrap)(e.bundleHasEligibleDiscount, e),
                            hasBundleHeaderSection: (0,
                            i.fnWrap)(e.hasBundleHeaderSection, e),
                            isBundleBuilderTabLayout: (0,
                            i.fnWrap)(e.isBundleBuilderTabLayout, e),
                            shouldRenderBundleStep: (0,
                            i.fnWrap)(e.shouldRenderBundleStep, e),
                            shouldDisableAddBundleToCart: (0,
                            i.fnWrap)(e.shouldDisableAddBundleToCart, e),
                            shouldDisplayBundleTierProgressBar: (0,
                            i.fnWrap)(e.shouldDisplayBundleTierProgressBar, e),
                            shouldDisableProductAddToBundle: (0,
                            i.fnWrap)(e.shouldDisableProductAddToBundle, e),
                            hasBundleContainerExpanded: (0,
                            i.fnWrap)(e.hasBundleContainerExpanded, e),
                            hasSelectedEnabledBundleSubscription: (0,
                            i.fnWrap)(e.hasSelectedEnabledBundleSubscription, e),
                            hasSellingPlansIntervalList: (0,
                            i.fnWrap)(e.hasSellingPlansIntervalList, e),
                            bundleVariantPrice: (0,
                            i.fnWrap)(e.bundleVariantPrice, e),
                            bundleVariantCompareAtPrice: (0,
                            i.fnWrap)(e.bundleVariantCompareAtPrice, e),
                            bundleVariantOnSale: (0,
                            i.fnWrap)(e.bundleVariantOnSale, e),
                            getSubBundleSubtotalSavingPercent: (0,
                            i.fnWrap)(e.getSubBundleSubtotalSavingPercent, e),
                            getBundleBuilderLayoutClasses: (0,
                            i.fnWrap)(e.getBundleBuilderLayoutClasses, e),
                            getRemainingBundleSlots: (0,
                            i.fnWrap)(e.getRemainingBundleSlots, e)
                        },
                        computed: {
                            layoutClasses() {
                                const e = ["large", "medium", "small"];
                                return (0,
                                i.isBundleBuilderWidget)(this) ? e.reduce(( (e, t) => {
                                    const n = this.config.breakpoints[t];
                                    if (n) {
                                        const r = `${t}-columns`;
                                        e.push("boolean" == typeof n ? r : `${r}-${n}`)
                                    }
                                    return e
                                }
                                ), []) : e.reduce(( (e, t) => (["style", "columns", "carousel"].forEach((n => {
                                    const r = this.config.layout[t][n];
                                    if (r) {
                                        const i = `${t}-${n}`;
                                        e.push("boolean" == typeof r ? i : `${i}-${r}`)
                                    }
                                }
                                )),
                                e)), [])
                            },
                            imageStyles: function() {
                                const e = {};
                                return this.config.images.border_radius && (e.borderRadius = this.config.images.border_radius + this.config.images.border_radius_unit,
                                e.overflow = "hidden"),
                                this.config.images.fixed_height && (e.height = this.config.images.height + "px"),
                                this.config.images.fixed_width && (e.width = this.config.images.width + "px"),
                                e
                            },
                            bundleProducts: function() {
                                if (!(0,
                                i.isBundleBuilderWidget)(this))
                                    return [];
                                const {container_holder: {max_value: e}, discount: {tiers: t}} = this.config
                                  , n = Number(null != e ? e : 1)
                                  , r = [...this.products];
                                for (; r.length < n; ) {
                                    const e = r.length
                                      , n = {
                                        classification: "placeholder"
                                    };
                                    if ((null == t ? void 0 : t.length) > 0) {
                                        const r = t.find((t => parseInt(t.required_quantity) === e + 1));
                                        r && (n.label = r.product_holder_label.replace("{{discount_value}}", (0,
                                        i.handleFormattingDiscountValue)(r.discount_value, r.discount_type)).replace("{{required_quantity}}", r.required_quantity))
                                    }
                                    r.push(n)
                                }
                                return r
                            }
                        },
                        watch: {
                            products: {
                                deep: !0,
                                handler: () => {
                                    const t = e.Widget;
                                    (0,
                                    i.isBundleBuilderWidget)(t) && (t.data.selling_plan_interval_list = (0,
                                    i.aggregateSellingPlansInterval)(t.data.products),
                                    t.data.steps_products_bundle_map = (0,
                                    i.mapStepsProductsBundle)(t.data.products),
                                    t.data.selling_plan_interval_list.length <= 0 && (t.data.selected_purchase_type = "one-time"),
                                    t.manageStepsMinimumQuantityRequirements())
                                }
                            }
                        },
                        created: function() {
                            window.addEventListener("resize", (0,
                            i.debounce)((0,
                            i.fnWrap)(( () => e.resizeViewEventHander()), e), 10))
                        },
                        destroyed: function() {
                            window.removeEventListener("resize", e.resizeViewEventHander)
                        },
                        mounted: function() {
                            var t, n, r, i, a;
                            (e.Widget.template = this.$el,
                            e.Widget.bindEvents(),
                            !0 === (null == (t = e.Widget.data) || null == (n = t.config) || null == (r = n.view_options) ? void 0 : r.limit_views)) && ("popup" !== (null == (i = e.Widget.data) || null == (a = i.config) ? void 0 : a.display_type) && e.Widget.increaseWidgetViewCount());
                            this.$nextTick((function() {
                                e.Widget.status = "ready",
                                e.initCarousel(),
                                e.Widget.repositionTemplate(),
                                e.resizeView(),
                                setTimeout(( () => {
                                    e.resizeView(!0)
                                }
                                ), 1e3),
                                v.Widget.callbacks.ready(e.Widget)
                            }
                            ))
                        }
                    }
                }
                show() {
                    this.Widget.show()
                }
                hasTimer() {
                    return this.Widget.hasTimer()
                }
                shouldShowSavingAmount() {
                    var e, t, n, r;
                    return null == this || null == (e = this.Widget) || null == (t = e.data) || null == (n = t.config) || null == (r = n.discount) ? void 0 : r.show_saving_amount
                }
                shouldRenderSavingAmount(e) {
                    var t, n;
                    return !(null == e || null == (t = e.selected_variant) || null == (n = t.rebuy_calculated_discount) || !n.shouldShowDiscountedPrice)
                }
                savingAmountLabel(e) {
                    var t, n;
                    const r = this.Widget
                      , i = this;
                    let a = "";
                    if (null != e && null != (t = e.selected_variant) && null != (n = t.rebuy_calculated_discount) && n.shouldShowDiscountedPrice) {
                        const t = "fixed_amount" === e.selected_variant.rebuy_calculated_discount.type || "fixed" === e.selected_variant.rebuy_calculated_discount.type ? i.formatMoney(e.selected_variant.rebuy_calculated_discount.savingAmount) : e.selected_variant.rebuy_calculated_discount.savingAmount + "%";
                        a = r.data.config.language.saving_amount_text.replace("{{saving_amount}}", t)
                    }
                    return a
                }
                hide() {
                    this.Widget.hide()
                }
                stopPropagation(e) {
                    var t, n;
                    "popup" === (null == (t = this.Widget.data) || null == (n = t.config) ? void 0 : n.display_type) && e && e.stopPropagation()
                }
                removeFromCart(e) {
                    e && this.Widget.removeFromCart(e)
                }
                text(e) {
                    return (0,
                    i.stripHTML)(e)
                }
                resizeViewEventHander() {
                    this.resizeView()
                }
                resizeView(e) {
                    const t = this
                      , n = t.currentLayout();
                    t.layout !== n && (t.shouldWidgetBeVisible(n),
                    t.layout = n,
                    t.vue.$forceUpdate());
                    const r = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    (t.width !== r || e) && (t.width = r,
                    setTimeout(( () => {
                        this.resizeCarousel(),
                        this.manageCarouselSlides()
                    }
                    ), 0))
                }
                currentLayout() {
                    var e;
                    const t = this.Widget
                      , {small: n, medium: r, large: i} = t.data.settings.layout;
                    let a = null;
                    return a = this.width <= l.LM.SMALL ? n : this.width <= l.LM.MEDIUM ? r : i,
                    (null == (e = a) ? void 0 : e.style) || ""
                }
                shouldWidgetBeVisible(e) {
                    var t, n, r;
                    if ("none" === e && "cart_subscription" !== this.Widget.data.settings.type && this.Widget.data.products.length <= 0)
                        this.Widget.data.visible = !1;
                    else if (this.Widget.shouldDisplay() && (null == (t = this.Widget) || null == (n = t.data) || null == (r = n.products) ? void 0 : r.length) > 0 && "none" !== e) {
                        var i, a, o, s, l;
                        if ("popup" !== (null == (i = this.Widget.data) || null == (a = i.config) ? void 0 : a.display_type))
                            return void ("affinity" === (null == (l = this.Widget.data.recharge) ? void 0 : l.themeName) ? this.Widget.data.visible = !1 : this.Widget.data.visible = !0);
                        null != (o = this.Widget.data) && o.popup_has_triggered && !0 !== (null == (s = this.Widget.data) ? void 0 : s.popup_has_been_dismissed) && this.Widget.show()
                    }
                }
                formatMoney(e, t) {
                    return i.Money.format(e, t)
                }
                sizeImage(e, t) {
                    const n = e.split(".").pop();
                    return t = void 0 === t ? "" : "_" + t,
                    e.replace("." + n, t + "." + n)
                }
                itemImage(e, t, n) {
                    var r, i, a, o;
                    let s = "";
                    return s = "product" === (null == this || null == (r = this.Widget) || null == (i = r.data) || null == (a = i.config) || null == (o = a.images) ? void 0 : o.source) ? this.productImage(e, n) : this.variantImage(e, t, n),
                    s
                }
                itemImageAlt(e, t) {
                    var n, r, i, a;
                    let o = "";
                    return o = "product" === (null == this || null == (n = this.Widget) || null == (r = n.data) || null == (i = r.config) || null == (a = i.images) ? void 0 : a.source) ? this.productImageAlt(e) : this.variantImageAlt(e, t),
                    o
                }
                productImageAlt(e) {
                    var t, n;
                    return null != (t = null == e || null == (n = e.image) ? void 0 : n.alt) ? t : `View ${null == e ? void 0 : e.title}`
                }
                variantImageAlt(e, t) {
                    var n, r;
                    let i = "";
                    if (i = null != (n = null == e || null == (r = e.image) ? void 0 : r.alt) ? n : `View ${null == e ? void 0 : e.title}`,
                    e && null != t && t.image_id)
                        for (let n = 0; n < (null == (a = e.images) ? void 0 : a.length); n++) {
                            var a;
                            if (e.images[n].id === t.image_id) {
                                var o, s;
                                i = null != (o = null == e || null == (s = e.images[n]) ? void 0 : s.alt) ? o : `View ${null == e ? void 0 : e.title}`;
                                break
                            }
                        }
                    return i
                }
                isInputProduct(e) {
                    return this.Widget.isInputProduct(e)
                }
                productImage(e, t) {
                    const n = null != e && e.image ? e.image.src : "";
                    return this.sizeImage(n, t)
                }
                variantPrice(e, t) {
                    return this.Widget.variantPrice(e, t)
                }
                variantCompareAtPrice(e, t) {
                    return this.Widget.variantCompareAtPrice(e, t)
                }
                variantOnSale(e, t) {
                    return this.Widget.variantOnSale(e, t)
                }
                bundleVariantPrice(e, t) {
                    return this.Widget.bundleVariantPrice(e, t)
                }
                bundleVariantCompareAtPrice(e, t) {
                    return this.Widget.bundleVariantCompareAtPrice(e, t)
                }
                bundleVariantOnSale(e, t) {
                    return this.Widget.bundleVariantOnSale(e, t)
                }
                variantAvailable(e) {
                    return !!e && !(null != e && e.inventory_management && "deny" === (null == e ? void 0 : e.inventory_policy.toLowerCase()) && (null == e ? void 0 : e.inventory_quantity) <= 0)
                }
                showVariantSelect(e) {
                    var t, n, r, a, o, s, l;
                    const c = null == (t = this.Widget.data) || null == (n = t.config) || null == (r = n.product_options) ? void 0 : r.show_variant_options;
                    let u = !0;
                    if ("default" === c ? "line" === this.layout && "selecting" !== e.status && u && (u = !1) : "never" === c ? u = !1 : "always" === c ? u = !0 : "dynamic" === c && "selecting" !== e.status && u && (u = !1),
                    "dynamic_bundle" !== (null == (a = this.Widget.data) || null == (o = a.config) ? void 0 : o.type) && "product_addon" !== (null == (s = this.Widget.data) || null == (l = s.config) ? void 0 : l.type) || "default" !== c && "dynamic" !== c || (u = !0),
                    1 === e.variants.length) {
                        -1 !== ["default title", "default"].indexOf(e.variants[0].title.toLowerCase()) && (u = !1)
                    }
                    var d, p, f;
                    (0,
                    i.isBundleBuilderWidget)(this.Widget) || (null != (d = this.Widget.data) && null != (p = d.settings) && null != (f = p.view_options) && f.display_actions || (u = !1));
                    return u
                }
                showSubscriptionSelect(e) {
                    return this.showSubscriptionOptions(e)
                }
                showSubscriptionOptions(e) {
                    var t, n, r, i;
                    let a = !1;
                    return e.has_subscription && "both" === (null == (t = this.Widget.data) || null == (n = t.config) ? void 0 : n.product_type) && (a = !0),
                    e.is_subscription_only && (a = !1),
                    (null == (r = e.selected_variant) || null == (i = r.selling_plan_allocations) ? void 0 : i.length) <= 0 && (a = !1),
                    a
                }
                showSubscriptionFrequency(e) {
                    let t = !1;
                    var n, r, i, a, o, s, l, c, u, d, p;
                    (this.showSubscriptionOptions(e) && e.subscription || "subscription" === this.Widget.data.config.product_type) && ("always" === (null == (n = this.Widget.data) || null == (r = n.config) || null == (i = r.product_options) ? void 0 : i.show_subscription_options) ? t = !0 : "never" === (null == (a = this.Widget.data) || null == (o = a.config) || null == (s = o.product_options) ? void 0 : s.show_subscription_options) && (t = !1),
                    ((null == (l = e.selected_variant) || null == (c = l.selling_plan_allocations) ? void 0 : c.length) <= 0 || "never" === (null == (u = this.Widget.data) || null == (d = u.config) || null == (p = d.product_options) ? void 0 : p.show_subscription_options)) && (t = !1));
                    return t
                }
                updateSubscriptionFrequency(e) {
                    if ((0,
                    i.isDefined)(e.selected_variant.selling_plans) && e.subscription) {
                        const t = e.selected_variant.selling_plans.find((t => t.name === e.subscription_frequency));
                        e.subscription_id = t.id,
                        e.selected_selling_plan = t,
                        e.subscription_discount_amount = t.price_adjustments[0].value,
                        this.vue.$forceUpdate()
                    } else
                        E.sellingPlanEnabled() && e.subscription && (e.subscription_id = (0,
                        i.getSellingPlanAttribute)(e, "id", e.subscription_frequency, "order_interval_frequency"))
                }
                showProductDescription(e) {
                    var t, n, r;
                    return "show" === (null == (t = this.Widget.data) || null == (n = t.config) || null == (r = n.product_options) ? void 0 : r.show_product_description) && null != e.body_html
                }
                showVariantTitle(e) {
                    var t, n, r;
                    let i = "";
                    const a = null == (t = this.Widget.data) || null == (n = t.config) || null == (r = n.product_options) ? void 0 : r.show_variant_title;
                    return e.selected_variant && e.selected_variant.title && (i = e.selected_variant.title.toLowerCase()),
                    "show" === a && "default title" !== i
                }
                showContinueButton() {
                    var e, t, n, r;
                    let i = !1;
                    return "popup" === (null == (e = this.Widget.data) || null == (t = e.config) ? void 0 : t.display_type) && null != (n = this.Widget.data) && null != (r = n.config) && r.show_continue_button && (i = !0),
                    i
                }
                productTagClasses(e) {
                    const t = [];
                    if (e.tags) {
                        const n = e.tags.split(",").map((e => e.trim()));
                        for (let e = 0; e < n.length; e++)
                            t.push("tag-" + (0,
                            i.handlize)(n[e]))
                    }
                    return t.join(" ")
                }
                hasAddedPrepurchase() {
                    let e = !1;
                    for (const t of this.Widget.data.products)
                        if ("added" === t.status) {
                            e = !0;
                            break
                        }
                    return e
                }
                frequencyLabel(e, t) {
                    var n, r, a;
                    if (!(0,
                    i.isDefined)(t))
                        return e;
                    const o = t.slice(-1)
                      , s = "s" === o ? t.substring(0, t.length - 1) : t
                      , l = "s" !== o ? t + "s" : t;
                    let c = null == (n = this.Widget.data) || null == (r = n.config) || null == (a = r.language) ? void 0 : a.delivery_frequency_label;
                    return 1 === parseInt(e) ? (c = c.replace("{{frequency}}", e),
                    c = c.replace("{{interval}}", s)) : (c = c.replace("{{frequency}}", e),
                    c = c.replace("{{interval}}", l)),
                    c
                }
                buttonWidgetLabel() {
                    let e = this.Widget.data.config.language.add_to_cart;
                    return "working" === this.Widget.requestQueueStatus && (e = this.Widget.data.config.language.adding_to_cart),
                    e
                }
                buttonAriaLabel(e) {
                    var t, n, r;
                    if (!e || "ready" !== e.status)
                        return;
                    const i = this.Widget
                      , a = null == (t = i.data) || null == (n = t.config) || null == (r = n.product_options) ? void 0 : r.show_variant_options;
                    let o = `Add the product, ${e.title} to Cart`;
                    if ("dynamic" === a && "selecting" !== e.status || "default" === a && "line" === this.layout && "selecting" !== e.status)
                        if (e.variants.length > 1 && 1 === e.options.length)
                            o = `Select ${e.title} ${e.options[0].name.toLowerCase()}`;
                        else if (e.variants.length > 1 && e.options.length > 1) {
                            var s, l, c;
                            o = `Select ${e.title} ${null == (s = i.data) || null == (l = s.config) || null == (c = l.language) ? void 0 : c.variant_options}`
                        }
                    return o
                }
                buttonLabel(e) {
                    var t, n, r, i, a, o, s, l, c;
                    if (!e)
                        return;
                    const u = this.Widget
                      , d = null == (t = u.data) || null == (n = t.config) || null == (r = n.product_options) ? void 0 : r.show_variant_options;
                    let p = null == (i = u.data) || null == (a = i.config) || null == (o = a.language) ? void 0 : o.add_to_cart;
                    if (null != (s = u.data) && null != (l = s.config) && null != (c = l.language) && c.discount_language && (u.data.config.language.discount_language = u.data.config.language.discount_language.replace("{{discount_percent}}", e.subscription_discount.toString())),
                    !this.variantAvailable(e.selected_variant))
                        return u.data.config.language.sold_out_label;
                    var f, m, g;
                    if ("removing" === e.status)
                        p = null == (f = u.data) || null == (m = f.config) || null == (g = m.language) ? void 0 : g.removing_from_cart;
                    else if ("removed" === e.status) {
                        var v, _, y;
                        p = null == (v = u.data) || null == (_ = v.config) || null == (y = _.language) ? void 0 : y.removed_from_cart
                    } else if ("adding" === e.status) {
                        var b, w, S;
                        p = null == (b = u.data) || null == (w = b.config) || null == (S = w.language) ? void 0 : S.adding_to_cart
                    } else if ("added" === e.status) {
                        var C, k, T;
                        p = null == (C = u.data) || null == (k = C.config) || null == (T = k.language) ? void 0 : T.added_to_cart
                    } else if ("ready" === e.status)
                        if ("never" === d)
                            ;
                        else if ("always" === d)
                            ;
                        else if ("dynamic" === d && "selecting" !== e.status || "default" === d && "line" === this.layout && "selecting" !== e.status) {
                            var E, P, x, R;
                            if (e.variants.length > 1 && 1 === e.options.length)
                                p = null == (E = u.data) || null == (P = E.config) || null == (x = P.language) || null == (R = x.variant_option) ? void 0 : R.replace("{{option_name}}", e.options[0].name);
                            else if (e.variants.length > 1 && e.options.length > 1) {
                                var D, A, I;
                                p = null == (D = u.data) || null == (A = D.config) || null == (I = A.language) ? void 0 : I.variant_options
                            }
                        }
                    return p
                }