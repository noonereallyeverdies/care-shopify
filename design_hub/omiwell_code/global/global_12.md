
                replaceItemWithBundle(e, t) {
                    const n = this
                      , r = {};
                    r.params = {
                        method: "POST",
                        url: E.routeRoot() + "cart/change.js",
                        body: JSON.stringify({
                            id: `${e.key}`,
                            quantity: 0
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        success: function() {
                            m.log("Parent item removed"),
                            v.Widget.callbacks.remove(e, n)
                        },
                        error: function() {
                            m.log("Error removing parent item")
                        }
                    };
                    let i = !1;
                    e.properties && e.properties.shipping_interval_unit_type && (i = !0),
                    e.properties && e.properties.shipping_interval_frequency && (i = !0),
                    e.properties && e.properties.subscription_id && (i = !0),
                    n.addToRequestQueue(r),
                    n.addBundleToCart(e, (function() {}
                    ), i)
                }
                aggregateProductReviews() {
                    const e = this
                      , t = []
                      , n = [];
                    for (let r, i = 0; i < e.data.products.length; i++)
                        r = e.data.products[i],
                        r.reviews && r.reviews.star_rating && r.reviews.review_count && (t.push(r.reviews.review_count),
                        n.push(r.reviews.star_rating));
                    const r = {
                        count: 0,
                        average: 0,
                        target_product_ids: []
                    };
                    if (t.length > 0)
                        for (let e = 0; e < t.length; e++)
                            r.count += t[e];
                    if (n.length > 0) {
                        let e = 0;
                        for (let t = 0; t < n.length; t++)
                            e += n[t];
                        r.average = e / n.length
                    }
                    r.target_product_ids = e.data.config.shopify_product_ids,
                    e.data.aggregate_reviews = r
                }
                attachBundleProductReviews() {
                    const e = this
                      , t = window.Rebuy;
                    for (let n, r = 0; r < t.widgets.length; r++)
                        if (n = t.widgets[r].data.products,
                        n && n.length)
                            for (let t, r = 0; r < n.length; r++)
                                t = n[r],
                                e.data.aggregate_reviews && e.data.aggregate_reviews.target_product_ids && -1 !== e.data.aggregate_reviews.target_product_ids.indexOf(t.id) && (t.reviews.star_rating || (t.reviews.star_rating = e.data.aggregate_reviews.average),
                                t.reviews.review_count || (t.reviews.review_count = e.data.aggregate_reviews.count))
                }
                handleSelectSubscriptionVariant(e) {
                    const t = this;
                    for (let n, r = 0; r < t.data.products.length; r++) {
                        n = t.data.products[r];
                        for (let t, r = 0; r < n.variants.length; r++)
                            if (t = n.variants[r],
                            -1 !== e.indexOf(t.id)) {
                                n.selected_variant = t,
                                n.selected_variant_id = t.id;
                                break
                            }
                    }
                }
                bindEvents() {
                    const e = this;
                    if (e.shouldDisplay()) {
                        if (e.data.cart && (e.watchCart(),
                        e.watchElement()),
                        "bundle" === e.data.config.type && (e.aggregateProductReviews(),
                        e.attachBundleProductReviews(),
                        e.registerEventListener("rebuy.productsChange", (function(t) {
                            e.attachBundleProductReviews()
                        }
                        )),
                        "add_to_cart" === e.data.config.popup_trigger && e.watchAddToCart((function(t) {
                            const n = t;
                            e.data.shopify_product_ids.indexOf(n.product_id) >= 0 && (0 === e.data.shopify_variant_ids.length || e.data.shopify_variant_ids.indexOf(n.variant_id) >= 0) && e.replaceItemWithBundle(n)
                        }
                        )),
                        "submit" === e.data.config.popup_trigger && e.watchFormSubmit(e.data.config.popup_trigger_selector, (function(t) {
                            e.data.products.length > 0 && (e.addBundleToCart(),
                            t.preventDefault(),
                            t.stopPropagation())
                        }
                        ))),
                        "dynamic_bundle" === e.data.config.type && e.watchFormInputChanges('form[action="/cart/add"]', (function() {
                            setTimeout((function() {
                                const t = O()('[name="id"]', 'form[action="/cart/add"]').val();
                                for (let n = 0; n < e.data.products.length; n++)
                                    (0,
                                    i.selectVariantByID)(e.data.products[n], t)
                            }
                            ), 0)
                        }
                        )),
                        "product_addon" === e.data.config.type) {
                            e.watchAddToCart();
                            const t = E.routeRoot();
                            e.watchFormSubmit(`form[action="${t}cart/add"]`, (function(n) {
                                if (e.selectedProductCount() > 0) {
                                    e.disableSmartCartHandling(`form[action="${t}cart/add"]`);
                                    const r = new FormData(n.currentTarget)
                                      , i = Object.fromEntries(r);
                                    e.addSelectedProductsToCart(i),
                                    n.preventDefault(),
                                    n.stopPropagation()
                                } else
                                    e.removeDisableSmartCartHandling(`form[action="${t}cart/add"]`)
                            }
                            ))
                        }
                        "popup" === e.data.config.display_type && ("add_to_cart" === e.data.config.popup_trigger && e.watchAddToCart((function(t) {
                            const n = t.items ? t.items : [t]
                              , r = n.map((e => e.product_id))
                              , a = n.map((e => e.variant_id))
                              , o = e.data.shopify_product_ids.filter((e => r.includes(e)))
                              , s = n.filter((e => o.includes(e.product_id)));
                            let c = !1;
                            const u = n.filter((e => o.includes(e.product_id)));
                            if ((0,
                            i.isArray)(u)) {
                                let e = !1;
                                if (u.forEach((t => {
                                    var n;
                                    (null == t || null == (n = t.properties) ? void 0 : n._attribution) === l.s9.SWITCH_TO_ONE_TIME && (e = !0)
                                }
                                )),
                                e)
                                    return
                            } else if ((0,
                            i.isObject)(u)) {
                                var d;
                                if ((null == u || null == (d = u.properties) ? void 0 : d._attribution) === l.s9.SWITCH_TO_ONE_TIME)
                                    return
                            }
                            if (0 === e.data.shopify_product_ids.length && (c = !0,
                            e.data.dynamic_shopify_product_ids = r),
                            o.length > 0 && 0 === e.data.shopify_variant_ids.length && (c = !0,
                            e.data.dynamic_shopify_variant_ids = a),
                            "switch_to_subscription" === e.data.config.type && s.length > 0) {
                                for (let e = 0; e < s.length; e++)
                                    if (p.Z.isSubscription(s[e]))
                                        return;
                                if (a && E.sellingPlanEnabled() && e.data.products.forEach((e => {
                                    for (const t of e.variants)
                                        if (t.id === a[0]) {
                                            e.selected_variant = t,
                                            e.selected_variant_id = t.id,
                                            (0,
                                            i.updateSelectedVariantSellingPlanInfo)(e);
                                            break
                                        }
                                }
                                )),
                                e.handleSelectSubscriptionVariant(a),
                                !e.data.products[0].has_subscription)
                                    return
                            }
                            c ? e.getWidgetProducts((function(t) {
                                ("switch_to_subscription" !== e.data.config.type || (e.handleSelectSubscriptionVariant(a),
                                e.data.products[0].has_subscription)) && (0,
                                i.wait)((function() {
                                    e.show()
                                }
                                ), 1e3 * e.data.config.popup_delay)
                            }
                            )) : o.length > 0 && (0,
                            i.wait)((function() {
                                e.show()
                            }
                            ), 1e3 * e.data.config.popup_delay)
                        }
                        )),
                        "checkout" === e.data.config.popup_trigger && e.data.products.length > 0 && e.watchCheckoutClick((function() {
                            e.show()
                        }
                        )),
                        "submit" === e.data.config.popup_trigger && (e.watchFormInputChanges(e.data.config.popup_trigger_selector, (function() {
                            setTimeout((function() {
                                e.updateFormVariantID()
                            }
                            ), 0)
                        }
                        )),
                        e.watchFormSubmit(e.data.config.popup_trigger_selector, (function(t) {
                            const n = O()(t.currentTarget).serialize();
                            let r = !1;
                            if (e.data.products.length > 0 && (r = !0),
                            "switch_to_subscription" === e.data.config.type && E.sellingPlanEnabled() && -1 !== n.indexOf("selling_plan=") && (r = !1),
                            r) {
                                if ((0,
                                i.wait)((function() {
                                    e.show()
                                }
                                ), 1e3 * e.data.config.popup_delay),
                                "product" === e.data.config.type) {
                                    const t = {};
                                    t.params = {
                                        method: "POST",
                                        url: E.routeRoot() + "cart/add.js",
                                        body: (0,
                                        i.isObject)(n) ? JSON.stringify(n) : n,
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    },
                                    e.addToRequestQueue(t)
                                }
                                t.preventDefault(),
                                t.stopPropagation()
                            }
                        }
                        )),
                        e.updateFormVariantID()),
                        "exit" === e.data.config.popup_trigger && new ExitIntent({
                            cookieKey: l.Wc.EXIT_INTENT_WIDGET_ID.replace(":widgetId", e.id),
                            callback: () => {
                                this.show()
                            }
                        }))
                    }
                }
                unbindEvents() {
                    const e = this;
                    e.unregisterEventListener("rebuy:cart.change"),
                    e.unregisterEventListener("rebuy.productsChange"),
                    e.unwatchFormInputChanges(),
                    e.unwatchFormSubmit(),
                    e.unwatchAddToCart()
                }
                async render() {
                    var e, t, n, r;
                    const a = this;
                    if (v.Widget.callbacks.beforeReady(a),
                    a.shouldDisplay()) {
                        switch (await a.getWidgetTemplate(),
                        !0) {
                        case "bundle" === a.data.config.type:
                            a.data.visible = !1;
                            break;
                        case "popup" === a.data.config.display_type:
                            a.data.visible = !1,
                            "load" === a.data.config.popup_trigger && (0,
                            i.wait)((function() {
                                a.show()
                            }
                            ), 1e3 * a.data.config.popup_delay);
                            break;
                        case "recharge_customer_portal" === a.data.config.type && "affinity" === (null == (e = a.data.recharge) ? void 0 : e.themeName) && !a.data.recharge.step:
                            a.data.visible = !1;
                            break;
                        case "bundle_builder" === a.data.config.type:
                            Array.isArray(null == a || null == (t = a.data) || null == (n = t.config) || null == (r = n.discount) ? void 0 : r.tiers) && a.data.config.discount.tiers.sort(( (e, t) => ((null == e ? void 0 : e.required_quantity) || 0) - ((null == t ? void 0 : t.required_quantity) || 0))),
                            a.data.has_container_expanded = !1;
                            break;
                        default:
                            a.data.visible = !0,
                            !C.Y.isAdminPreview() && a.hasTimer() && a.timer()
                        }
                        C.Y.isAdminPreview() && !C.Y.isSmartCartPreview() && (a.data.visible = !0,
                        a.hasTimer() && a.timer()),
                        a.View = new View(a)
                    } else
                        a.status = "hidden"
                }
                getOrInitBundleBuilderATCStorage() {
                    const e = l.Hh.BUNDLE_BUILDER_SESSION_ID.replace(":widgetId", this.id)
                      , t = w.get(e);
                    let n = (0,
                    i.UUID)()
                      , r = [];
                    if (t) {
                        const t = w.get(e);
                        n = t.UUID,
                        r = t.products
                    } else
                        w.remove(e),
                        w.set(e, {
                            uuid: n,
                            products: r
                        });
                    return {
                        uuid: n,
                        products: r
                    }
                }
                setBundleBuilderATCStorage(e, t=!1) {
                    const n = this
                      , r = l.Hh.BUNDLE_BUILDER_SESSION_ID.replace(":widgetId", n.id)
                      , a = (0,
                    i.UUID)();
                    w.set(r, {
                        uuid: t ? a : n.data.add_bundle_to_cart_session,
                        products: e
                    }),
                    t && (n.data.add_bundle_to_cart_session = a)
                }
                addProductToBundle(e, t, n) {
                    var r;
                    const a = this;
                    if (!(0,
                    i.isBundleBuilderWidget)(a))
                        return;
                    const {products: o} = a.data
                      , s = a.data.config.container_holder.max_value
                      , c = (null == a || null == (r = a.data) ? void 0 : r.steps_products_bundle_map) || {};
                    if (o.length < s) {
                        var u, d;
                        if (null != t && null != (u = t.quantity_inputs) && u.enabled && ((null == (d = c[n]) ? void 0 : d.length) || 0) >= t.quantity_inputs.max_quantity_per_step)
                            return;
                        const r = {
                            ...(0,
                            i.deepCopy)(e),
                            properties: {
                                ...e.properties,
                                [l.LX.BUNDLE_BUILDER_STEP_INDEX]: n || 0
                            }
                        };
                        a.data.products.push((0,
                        i.deepCopy)(r)),
                        a.setBundleBuilderATCStorage(a.data.products),
                        v.Widget.callbacks.addProductToBundle(e, a)
                    }
                }
                addProductsToBundle(e, t) {
                    const n = this;
                    if (!(0,
                    i.isBundleBuilderWidget)(n))
                        throw new Error("Widget is not a bundle builder");
                    const r = e.map((e => ({
                        ...(0,
                        i.deepCopy)(e),
                        properties: {
                            ...e.properties,
                            [l.LX.BUNDLE_BUILDER_STEP_INDEX]: t || 0
                        }
                    })))
                      , {products: a, config: {container_holder: {max_value: o}}} = n.data;
                    if (a.length + r.length > o)
                        throw new Error("About to Add Products exceeds the maximum Bundle value");
                    return a.push(...r),
                    n.setBundleBuilderATCStorage(a),
                    a
                }
                handleRemovingProductFromBundle(e) {
                    var t;
                    const n = this;
                    if ((0,
                    i.isBundleBuilderWidget)(n) && null != n && null != (t = n.data) && t.products) {
                        var r, a;
                        n.data.products.splice(e, 1);
                        const t = 0 === (null == n || null == (r = n.data) || null == (a = r.products) ? void 0 : a.length);
                        n.setBundleBuilderATCStorage(n.data.products, t)
                    }
                }
                getRemainingBundleSlots() {
                    const e = this;
                    if ((0,
                    i.isBundleBuilderWidget)(e)) {
                        const {products: t, config: n} = e.data;
                        return n.container_holder.max_value - t.length
                    }
                    return 0
                }
                getBundleBuilderDiscountedPriceProduct(e, t, n=!1) {
                    var r, a, o;
                    const s = this
                      , l = s.data.products;
                    if (l.length < 1)
                        return t;
                    const c = (0,
                    i.getEligibleBasedOnQuantity)(l, (null == s || null == (r = s.data) || null == (a = r.config) || null == (o = a.discount) ? void 0 : o.tiers) || [], "required_quantity");
                    if (s.hasSelectedEnabledBundleSubscription() && "subscription" === s.data.selected_purchase_type || n) {
                        const n = (0,
                        i.findMatchingSellingPlanBasedOnInterval)(e, s.data.selected_interval);
                        if (n && n.price_adjustments[0]) {
                            const e = n.price_adjustments[0];
                            t = "price" === e.value_type ? e.value : (0,
                            i.discountedPriceCalculation)(e, t, !1)
                        }
                    }
                    return Object.keys(c).length && "fixed" !== c.discount_type ? (0,
                    i.discountedPriceCalculation)(c, t, !1) : t
                }
                getBundleDiscountedSubtotal(e, t=!1) {
                    var n, r, a;
                    const o = this;
                    if (0 === (e || o.data.products || []).length || !(0,
                    i.isBundleBuilderWidget)(o))
                        return 0;
                    const s = (null == o || null == (n = o.data) || null == (r = n.config) || null == (a = r.discount) ? void 0 : a.tiers) || []
                      , l = (0,
                    i.getEligibleBasedOnQuantity)(e, s, "required_quantity")
                      , c = o.getBundleBuilderSubtotalBasedOnCurrency(e, t);
                    return "percentage" === (null == l ? void 0 : l.type) || "percentage" === (null == l ? void 0 : l.discount_type) ? c : Number((0,
                    i.discountedPriceCalculation)(l, c, !1))
                }
                getBundleBuilderSubtotalBasedOnCurrency(e, t=!1) {
                    const n = this
                      , r = e || n.data.products || [];
                    return 0 === r.length ? 0 : r.reduce(( (e, r) => {
                        const i = n.bundleVariantPrice(r, r.selected_variant, t)
                          , a = new Money(i).toCents();
                        return e + (isNaN(a) ? 0 : a)
                    }
                    ), 0)
                }
                getProductsSubtotalBasedOnCurrency(e) {
                    const t = this;
                    return e && 0 !== e.length ? e.reduce(( (e, n) => {
                        var r;
                        const i = new Money(t.localizedCurrency(n.selected_variant.price, null != (r = null == n ? void 0 : n.handle) ? r : "", n.selected_variant));
                        return e + (isNaN(i.toCents()) ? 0 : i.toCents())
                    }
                    ), 0) : 0
                }
                hasSelectedEnabledBundleSubscription() {
                    const e = this;
                    if ((0,
                    i.isBundleBuilderWidget)(e)) {
                        var t, n;
                        const {container_holder: r, discount: i} = (null == e || null == (t = e.data) ? void 0 : t.config) || {};
                        if (null != r && null != (n = r.switch_to_subscription) && n.enabled && i.type === l.U5.SHOPIFY_FUNCTIONS)
                            return !0
                    }
                    return !1
                }
                manageStepsMinimumQuantityRequirements() {
                    var e, t, n;
                    const r = this
                      , i = (null == r || null == (e = r.data) || null == (t = e.config) ? void 0 : t.steps) || []
                      , a = (null == r || null == (n = r.data) ? void 0 : n.steps_products_bundle_map) || {};
                    i.map(( (e, t) => {
                        var n;
                        e.has_met_minimum_quantity = !1;
                        const r = a[t] || [];
                        let o = !0;
                        for (let e = 0; e < t; e++) {
                            const t = i[e];
                            if (t.quantity_inputs.enabled && !t.has_met_minimum_quantity) {
                                o = !1;
                                break
                            }
                        }
                        return null != (n = e.quantity_inputs) && n.enabled && e.quantity_inputs.min_quantity_per_step <= (null == r ? void 0 : r.length) && (e.has_met_minimum_quantity = !0),
                        e.unlocked = o,
                        e
                    }
                    ))
                }
                async initializeBundleStepCarousel(e, t) {
                    var n, r, a, o, s;
                    const l = this
                      , c = l.shouldEnableBundleStepCarousel(e);
                    let u = null == l || null == (n = l.data) || null == (r = n.config) ? void 0 : r.breakpoints;
                    var d;
                    null != e && null != (a = e.overrides) && a.product_display && null != e && null != (o = e.product_display) && null != (s = o.carousel) && s.enabled && (u = (null == e || null == (d = e.product_display) ? void 0 : d.breakpoints) || u);
                    if (!c)
                        return;
                    const p = (0,
                    i.createSplideSelectors)(l.id, `.rebuy-product-grid__step-${t}`);
                    e.carousel_selectors = {
                        ...p
                    };
                    const {container: f} = p;
                    if (document.querySelector(f)) {
                        var g;
                        if ((0,
                        i.carouselSplideAddTrack)(p))
                            null == (g = e.carousel) || g.destroy();
                        const n = document.querySelectorAll(p.items).length;
                        m.log(`Initalizing step carousel for index ${t}, Widget Id ${l.id}`, {
                            target: p.target,
                            totalSlides: n
                        });
                        const r = (0,
                        i.createSplideBreakpoints)(u, n);
                        e.carousel = await (0,
                        i.initializeSplide)(f, r),
                        e.carousel.on("mounted", ( () => (0,
                        i.handleSplideMounted)(p, e.carousel, l))).mount(),
                        m.log(`Initialized step carousel for index ${t}, Widget Id ${l.id}`, {
                            target: p.target
                        })
                    }
                }
                shouldEnableBundleStepCarousel(e) {
                    var t, n, r, i, a, o;
                    let s = !1;
                    return null != this && null != (t = this.data) && null != (n = t.config) && null != (r = n.carousel) && r.enabled && (s = !0),
                    null != e && null != (i = e.overrides) && i.product_display && null != e && null != (a = e.product_display) && null != (o = a.carousel) && o.enabled && (s = !0),
                    s
                }
                isBundleBuilderTabLayout() {
                    return !!(0,
                    i.isBundleBuilderWidget)(this) && "side_by_side_tabs" === this.data.config.layout.type
                }
            }
            function _handleStaleKey(e="", t={}, n={}) {
                if (e.includes("cart/change") && null != n && n.item && t.body) {
                    const e = p.Z.getItems()
                      , {item: r} = n;
                    for (const n of e) {
                        const e = detailed(r, n).updated;
                        if (null != e && e.key && !(e.id || e.sku || e.variant_id)) {
                            const e = (0,
                            i.isJSONString)(t.body)
                              , a = e ? JSON.parse(t.body) : t.body;
                            if (!(0,
                            i.isObject)(a) && a.includes(`id=${encodeURIComponent(r.key)}`)) {
                                t.body = t.body.replace(`id=${encodeURIComponent(r.key)}`, `id=${encodeURIComponent(n.key)}`);
                                break
                            }
                            if (a.id === r.key) {
                                a.id = n.key,
                                t.body = e ? JSON.stringify(a) : a;
                                break
                            }
                        }
                    }
                }
                return t
            }
            async function _addToSmartCartPreview(e, t) {
                const n = this;
                if (t = t || function() {}
                ,
                "adding" === e.status)
                    return;
                e.status = "adding";
                const r = await function(e, t) {
                    return new Promise(( (r, i) => {
                        window.parent.postMessage({
                            action: "iframe:add-product-from-widget",
                            payload: JSON.stringify({
                                product: e,
                                widgetId: n.id,
                                callback: t
                            })
                        }),
                        setTimeout(( () => {
                            i("Parent window did not respond")
                        }
                        ), 5e3),
                        window.addEventListener("message", (function messageListener(e) {
                            if (e.origin !== window.location.origin)
                                return;
                            const {data: t} = e;
                            "iframe:add-product-from-widget:response" === t.action && (r(t),
                            window.removeEventListener("message", messageListener))
                        }
                        ))
                    }
                    ))
                }(e, t);
                null != r && r.success ? (e.status = "added",
                t(e),
                v.Widget.callbacks.add(e, n),
                "pre_purchase" !== n.data.config.type && setTimeout((function() {
                    e.status = "ready"
                }
                ), 1500)) : e.status = "ready"
            }
            function _initializeBundleBuilderDefaults() {
                var e, t, n, r;
                const a = this
                  , {uuid: o, products: s} = a.getOrInitBundleBuilderATCStorage();
                a.data.add_bundle_to_cart_session = o,
                a.data.products = [...s],
                a.data.steps_products_bundle_map = (0,
                i.mapStepsProductsBundle)(s),
                a.data.selling_plan_interval_list = (0,
                i.aggregateSellingPlansInterval)(s),
                a.data.selected_interval = (null == (e = a.data.selling_plan_interval_list[0]) ? void 0 : e.interval) || "",
                a.data.selected_purchase_type = "one-time",
                a.data.active_step_index = 0,
                (null == a || null == (t = a.data) || null == (n = t.config) || null == (r = n.steps) ? void 0 : r.length) > 0 && a.data.config.steps.forEach(( (e, t) => (a.getWidgetBundleProducts(e, t),
                e.unlocked = !0,
                e.has_met_minimum_quantity = !1,
                e))),
                a.manageStepsMinimumQuantityRequirements()
            }
            const B = {
                widgets: [],
                attr: [],
                eventListeners: {},
                initializedCount: 0,
                registeredScrollListener: !1,
                init: function() {
                    const e = window.Rebuy;
                    m.heading("Widgets.init()"),
                    v.Widget.addDefaultCallbacks(),
                    B.initializeElements(),
                    B.removeDuplicateWidgets(),
                    e.init = () => {
                        B.injectWidgetPreview(),
                        B.shiftCustomTemplates(),
                        B.initializeElements(),
                        B.removeDuplicateWidgets(),
                        B.registerScrollListener(),
                        m.log("✅ Widgets initialized")
                    }
                    ,
                    e.reinit = () => {
                        B.initializeElements(null, {
                            forceRefresh: !0
                        }),
                        B.removeDuplicateWidgets(),
                        m.log("✅ Widgets reinitialized")
                    }
                    ,
                    e.modules.Widgets = !0
                },
                shiftCustomTemplates: () => {
                    for (const e of document.querySelectorAll('script[id^="rebuy-widget-"]'))
                        document.body.appendChild(e),
                        m.log("Shifted custom template", e)
                }
                ,
                injectWidgetPreview: () => {
                    var e, t;
                    if (null == (e = window) || null == (t = e.rebuyAdminPreview) || !t.widget)
                        return;
                    const n = window.rebuyAdminPreview.widget;
                    i.DOM.append(i.DOM.createElement("div", {
                        "data-rebuy-id": n.id
                    }), "body"),
                    m.log("Injected div for previewing widget: ", n.id)
                }
                ,
                registerScrollListener: () => {
                    B.registeredScrollListener || (window.addEventListener("scroll", B.handleManagingWidgetsFocus),
                    B.registeredScrollListener = !0,
                    m.log("Registered window scroll event for Widgets"))
                }
                ,
                handleManagingWidgetsFocus: (0,
                n(835).A)(( () => {
                    document.querySelectorAll(".rebuy-widget").forEach((e => {
                        (0,
                        i.isPartiallyInViewport)(e) ? (0,
                        i.setFocusableTabIndex)(e) : (e.setAttribute("tabindex", "-1"),
                        (0,
                        i.setFocusableTabIndex)(e, "-1"))
                    }
                    ))
                }
                ), 300),
                removeDuplicateWidgets: () => {
                    const e = window.Rebuy;
                    e.widgets = (0,
                    i.getUniquesByProperty)(e.widgets, "id"),
                    e.widgets.forEach((e => {
                        const t = document.querySelectorAll(`div[data-rebuy-id="${e.id}"]`);
                        t.length > 1 && t.forEach(( (e, t) => {
                            0 !== t && (m.log("Removing duplicate Rebuy widget: ", e),
                            e.remove())
                        }
                        ))
                    }
                    ))
                }
                ,
                initializeElements: (e, t={}) => {
                    const n = window.Rebuy;
                    let r = -1
                      , i = document.querySelectorAll("div[data-rebuy-id]");
                    if (e) {
                        if (r = n.widgets.indexOf(e),
                        i = document.querySelectorAll('div[data-rebuy-id="' + e.id + '"]'),
                        "reinitializing" === e.status)
                            return !1;
                        e.status = "reinitializing"
                    }
                    t.forceRefresh && (i.forEach((e => {
                        e.innerHTML = "",
                        e.removeAttribute("data-initialized")
                    }
                    )),
                    n.widgets = []);
                    for (let e = 0; e < i.length; e++) {
                        const t = new Widget(i[e]);
                        t.id && (t && r >= 0 ? n.widgets[r] = t : n.widgets.push(t))
                    }
                    B.initializedCount++
                }
            }
        }
        ,
        5329: (e, t, n) => {
            "use strict";
            n.d(t, {
                E: () => convertDelimitersStringPriceToNumber
            });
            n(9028);
            const convertDelimitersStringPriceToNumber = e => parseFloat(e.replace(/[,]+/g, ""))
        }
        ,
        7157: (e, t, n) => {
            "use strict";
            n.d(t, {
                q: () => formatWithDelimiters
            });
            n(9028);
            function defaultOption(e, t) {
                return void 0 === e ? t : e
            }
            const formatWithDelimiters = (e, t, n, r) => {
                if (t = defaultOption(t, 2),
                n = defaultOption(n, ","),
                r = defaultOption(r, "."),
                isNaN(e) || null == e)
                    return 0;
                const i = (e = (e / 100).toFixed(t)).split(".");
                return i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (i[1] ? r + i[1] : "")
            }
        }
        ,
        9277: (e, t, n) => {
            "use strict";
            n.r(t),
            n.d(t, {
                cents: () => cents,
                checkIfThreeDigitCurrency: () => checkIfThreeDigitCurrency,
                convertDelimitersStringPriceToNumber: () => i.E,
                convertToCurrency: () => convertToCurrency,
                convertToShopCurrency: () => convertToShopCurrency,
                defaultFormatMoney: () => defaultFormatMoney,
                format: () => s,
                formatWithDelimiters: () => l.q,
                getActiveCurrencyCode: () => getActiveCurrencyCode,
                getCurrencyByCode: () => getCurrencyByCode,
                getPresentmentCurrency: () => getPresentmentCurrency,
                getPresentmentCurrencyCode: () => getPresentmentCurrencyCode,
                getShopCurrencyCode: () => getShopCurrencyCode,
                round: () => round,
                shopifyDiscountRound: () => shopifyDiscountRound,
                threeDigitCurrenciesArr: () => r,
                threeDigitCurrencyPatch: () => threeDigitCurrencyPatch,
                usePresentmentCurrency: () => usePresentmentCurrency
            });
            n(9028);
            const cents = e => {
                let t = "";
                return "string" == typeof e ? t = e.replace(".", "") : "number" == typeof e && (t = e.toString()),
                parseInt(t)
            }
              , r = ["VND", "JPY", "CLP"]
              , checkIfThreeDigitCurrency = (e, t) => (r.includes(t) && (e.price = e.price / 100,
            e.compare_at_price = e.compare_at_price / 100),
            e);
            var i = n(5329)
              , a = n(9228);
            const convertToCurrency = (e, t, n) => {
                const r = e * parseFloat(t);
                let i;
                if (0 === n.rounding)
                    i = Math.ceil(r);
                else if (n.rounding < 1) {
                    const e = 1 - n.rounding;
                    i = Math.ceil(r) - e
                } else
                    i = Math.ceil(r / n.rounding) * n.rounding;
                return a.Money.cents(i.toFixed(n.decimal_digits))
            }
              , convertToShopCurrency = (e, t) => {
                const n = window.Shopify;
                let r = cents(e);
                const i = getShopCurrencyCode();
                if (i && t && i !== t) {
                    let e = 1;
                    n && n.currency && n.currency.rate && (e = parseFloat(n.currency.rate)),
                    r = round(r / e)
                }
                return r
            }
            ;
            var o = n(9812);
            const defaultFormatMoney = (e, t, n) => {
                var r, i, s, l, c, u;
                const d = window.Rebuy
                  , p = window.Shopify
                  , f = /\{\{\s*(\w+)\s*\}\}/
                  , m = {
                    default: a.Money.getCurrencyByCode("USD"),
                    shop: a.Money.getCurrencyByCode((null == p || null == (r = p.currency) ? void 0 : r.active) || d.shop.currency),
                    presentment: a.Money.getPresentmentCurrency(),
                    input_currency: a.Money.getCurrencyByCode(n)
                };
                let g, v = "", _ = (0,
                a.amountToCents)(e), y = t || (null == (i = m.shop) ? void 0 : i.money_format) || d.shop.money_format || "${{amount}}";
                "undefined" === o.y.hasLoggedCurrency && (o.y.log("Currencies:\n"),
                o.y.table(m),
                o.y.hasLoggedCurrency = !0),
                m.input_currency && !t ? (g = m.input_currency,
                y = m.input_currency.money_format) : m.input_currency ? g = m.input_currency : m.presentment ? (g = m.presentment,
                y = m.presentment.money_format) : g = m.shop ? m.shop : m.default;
                const b = null == p ? void 0 : p.currency;
                function formatNumber(e, t, n, r) {
                    if (isNaN(e) || null == e)
                        return 0;
                    t = void 0 === t ? g.decimal_digits : t,
                    n = void 0 === n ? g.thousands_separator : n,
                    r = void 0 === r ? g.decimal_separator : r,
                    g.decimal_digits > 0 && (e /= Math.pow(10, g.decimal_digits));
                    const i = (e = e.toFixed(t)).split(".");
                    return i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (i[1] ? r + i[1] : "")
                }
                switch (!m.input_currency && null != m && null != (s = m.presentment) && s.code && (null == b ? void 0 : b.active) !== (null == m || null == (l = m.presentment) ? void 0 : l.code) && null != m && null != (c = m.input_currency) && c.code && (null == b ? void 0 : b.active) !== (null == m || null == (u = m.input_currency) ? void 0 : u.code) && (g = a.Money.getCurrencyByCode(p.currency.active),
                y = g.money_format,
                _ = a.Money.convertToCurrency(e, b.rate, g)),
                y.match(f)[1]) {
                default:
                    break;
                case "amount":
                    v = formatNumber(_, g.decimal_digits);
                    break;
                case "amount_no_decimals":
                    v = formatNumber(_, 0);
                    break;
                case "amount_with_comma_separator":
                    v = formatNumber(_, g.decimal_digits, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    v = formatNumber(_, 0, ".", ",");
                    break;
                case "amount_with_apostrophe_separator":
                    v = formatNumber(_, g.decimal_digits, "'", ".")
                }
                return y.replace(f, v)
            }
              , s = defaultFormatMoney;
            var l = n(7157);
            const getActiveCurrencyCode = () => {
                const e = window.Shopify;
                let t = null;
                return e && e.Checkout && e.Checkout.currency ? t = e.Checkout.currency : e && e.currency && e.currency.active && (t = e.currency.active),
                t
            }
              , getCurrencyByCode = e => {
                let t = null;
                const n = o.D9.getCurrentCountry()
                  , r = {
                    ALL: {
                        symbol: "L",
                        name: "lek",
                        symbol_native: "L",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "ALL",
                        name_plural: "lekët",
                        money_format: "Lek {{amount}} ALL"
                    },
                    ARS: {
                        symbol: "AR$",
                        name: "Argentine Peso",
                        symbol_native: "$",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "ARS",
                        name_plural: "Argentine pesos",
                        money_format: "$ {{amount}}"
                    },
                    AUD: {
                        symbol: "AU$",
                        name: "Australian Dollar",
                        symbol_native: "$",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "AUD",
                        name_plural: "Australian dollars",
                        money_format: "${{amount}}"
                    },
                    AWG: {
                        symbol: "ƒ",
                        name: "Florin",
                        symbol_native: "ƒ",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "AWG",
                        name_plural: "Florins",
                        money_format: "Afl{{amount}} AWG"
                    },
                    BRL: {
                        symbol: "R$",
                        name: "Brazilian Real",
                        symbol_native: "R$",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "BRL",
                        name_plural: "Brazilian reals",
                        money_format: "R$ {{amount}}"
                    },
                    CAD: {
                        symbol: "CA$",
                        name: "Canadian Dollar",
                        symbol_native: "$",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "CAD",
                        name_plural: "Canadian dollars",
                        money_format: "${{amount}}"
                    },
                    CHF: {
                        symbol: "CHF",
                        name: "Swiss Franc",
                        symbol_native: "CHF",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: .05,
                        code: "CHF",
                        name_plural: "Swiss francs",
                        money_format: "CHF {{amount}}"
                    },
                    CLP: {
                        symbol: "CL$",
                        name: "Chilean Peso",
                        symbol_native: "$",
                        decimal_digits: 0,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "CLP",
                        name_plural: "Chilean pesos",
                        money_format: "${{amount}}"
                    },
                    CNY: {
                        symbol: "CN¥",
                        name: "Chinese Yuan",
                        symbol_native: "CN¥",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "CNY",
                        name_plural: "Chinese yuan",
                        money_format: "CN¥ {{amount}}"
                    },
                    COP: {
                        symbol: "CO$",
                        name: "Colombian Peso",
                        symbol_native: "$",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "COP",
                        name_plural: "Colombian pesos",
                        money_format: "$ {{amount_no_decimals}}"
                    },
                    CZK: {
                        symbol: "Kč",
                        name: "Czech Republic Koruna",
                        symbol_native: "Kč",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "CZK",
                        name_plural: "Czech Republic korunas",
                        money_format: "{{amount}} Kč"
                    },
                    DKK: {
                        symbol: "Dkr",
                        name: "Danish Krone",
                        symbol_native: "kr",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "DKK",
                        name_plural: "Danish kroner",
                        money_format: "kr {{amount}}"
                    },
                    EUR: {
                        symbol: "€",
                        name: "Euro",
                        symbol_native: "€",
                        decimal_digits: 2,
                        decimal_separator: "IE" === n ? "." : ",",
                        thousands_separator: ".",
                        rounding: .95,
                        code: "EUR",
                        name_plural: "euros",
                        money_format: ["DE", "FR"].includes(n) ? "{{amount}}€" : "€{{amount}}"
                    },
                    GBP: {
                        symbol: "£",
                        name: "British Pound Sterling",
                        symbol_native: "£",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "GBP",
                        name_plural: "British pounds sterling",
                        money_format: "£{{amount}}"
                    },
                    HKD: {
                        symbol: "HK$",
                        name: "Hong Kong Dollar",
                        symbol_native: "$",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "HKD",
                        name_plural: "Hong Kong dollars",
                        money_format: "HK$ {{amount}}"
                    },
                    HUF: {
                        symbol: "Ft",
                        name: "Hungarian Forint",
                        symbol_native: "Ft",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "HUF",
                        name_plural: "Hungarian forints",
                        money_format: "{{amount}} Ft"
                    },
                    ILS: {
                        symbol: "₪",
                        name: "Israeli New Sheqel",
                        symbol_native: "₪",
                        decimal_digits: 2,
                        decimal_separator: ",",
                        thousands_separator: ".",
                        rounding: 0,
                        code: "ILS",
                        name_plural: "Israeli new sheqels",
                        money_format: "₪ {{amount}}"
                    },
                    INR: {
                        symbol: "Rs",
                        name: "Indian Rupee",
                        symbol_native: "₹",
                        decimal_digits: 2,
                        decimal_separator: ".",
                        thousands_separator: ",",
                        rounding: 0,
                        code: "INR",
                        name_plural: "Indian rupees",
                        money_format: "₹ {{amount}}"
                    },