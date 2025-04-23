
                    E.shopifySellingPlansEnabled() ? r.shopify_selling_plans = "yes" : E.sellingPlanEnabled() ? r.selling_plans = "yes" : "both" !== t.data.config.product_type && "subscription" !== t.data.config.product_type || (r.metafields = "yes"),
                    t.data.config.metafields && (r.metafields = "yes"),
                    t.data.config.variant_metafields && (r.variant_metafields = "yes"),
                    "gift_with_purchase" === t.data.config.type && (r.filter_inputs = "no"),
                    t.data.config.query && (r.query = t.data.config.query);
                    const s = P.J.getIdentity();
                    s && s.cid && (r.shopify_customer_id = s.cid),
                    s && s.uuid && (r.uuid = s.uuid);
                    const l = P.J.getUTMObject();
                    if (l)
                        for (const e in l)
                            r.url = (0,
                            i.urlAddParameter)(r.url, e, l[e]);
                    if (t.data.cart && (0,
                    i.formatCartConfig)(t, r),
                    t.data.order) {
                        const e = t.data.order.items ? t.data.order.items : t.data.order.line_items
                          , n = (0,
                        S.cents)(t.data.order.total_price);
                        let i = 0;
                        for (let t = 0; t < e.length; t++)
                            i += e[t].quantity;
                        r.cart_token = t.data.order.token,
                        r.cart_subtotal = n,
                        r.cart_count = e.length,
                        r.cart_line_count = e.length,
                        r.cart_item_count = i
                    }
                    const c = (0,
                    i.urlGetParameter)("time");
                    if (c && (r.time = c),
                    t.data.config.endpoint)
                        a.callAPI("GET", t.data.config.endpoint, r).then((async function(n) {
                            var r, a;
                            if (v.Widget.callbacks.beforeProductsChange(n.data, t),
                            "gift_with_purchase" === t.data.config.type && (t.data.config.product_options.show_variants_as_products = !0),
                            t.data.products = t.initProducts(n.data),
                            "dynamic_bundle" === t.data.config.type && t.data.products.length && n.metadata.input_products) {
                                const e = t.initProducts(n.metadata.input_products);
                                t.data.products.unshift(...e),
                                t.data.products.forEach((e => {
                                    e.selected = !0
                                }
                                ))
                            }
                            if ("product_addon" === t.data.config.type && t.data.products.forEach((e => {
                                e.selected = !1
                            }
                            )),
                            n.metadata ? t.data.metadata = n.metadata : delete t.data.metadata,
                            !C.Y.isAdminPreview()) {
                                const e = (0,
                                S.getShopCurrencyCode)()
                                  , n = (0,
                                S.getActiveCurrencyCode)();
                                if (e && n && e !== n) {
                                    m.log(`[Widget ${t.id}] Starting currency-based pricing updates for products...`);
                                    try {
                                        await Promise.allSettled(t.data.products.map((async e => {
                                            try {
                                                await t.getProductPricingForCurrency(e)
                                            } catch (n) {
                                                m.warn(`[Widget ${t.id}] Queueing ${e.id} for additional pricing lookup`, n),
                                                _classPrivateFieldGet(N, t)[e.id] = e
                                            }
                                        }
                                        ))),
                                        await t.processContextualPricingQueue()
                                    } catch (e) {
                                        m.error(`[Widget ${t.id}] Failed to process currency-based pricing updates:`, e)
                                    }
                                }
                            }
                            if (t.compileConfig(),
                            t.addWindowEventsToDOM(),
                            ("shopify_checkout" === t.data.config.type || "recharge_checkout" === t.data.config.type) && (t.decoratePromotionalProducts(),
                            t.decorateOrderSummary(),
                            "shopify_checkout" === t.data.settings.type && C.Y.isShopifyCheckout())) {
                                const e = "button#checkout_submit"
                                  , n = 'form input[name="checkout[clear_discount]"] + button[type="submit"]';
                                O()("body").off("click", e).off("click", n).on("click", e, ( () => {
                                    (0,
                                    i.wait)(( () => t.getWidgetProducts()), 2e3)
                                }
                                )).on("click", n, ( () => {
                                    (0,
                                    i.wait)(( () => t.getWidgetProducts()), 5e3)
                                }
                                ))
                            }
                            "gift_with_purchase" === t.data.config.type && t.manageGiftWithPurchase(),
                            null == (r = t.View) || null == (a = r.vue) || a.$nextTick(( () => {
                                t.restoreCarouselProducts()
                            }
                            )),
                            v.Widget.callbacks.productsChange(t.data.products, t),
                            t.data.settings.product_options.match_variant && p.Z.call.push((function() {
                                t.data.cart = p.Z.cart,
                                (0,
                                i.autoSelectVariantsByAttributeMap)(t.data.products, p.Z.itemAttributeMap, t)
                            }
                            )),
                            e(t.data.products),
                            o.end("Widget ID:" + t.id, "Widget.getWidgetProducts")
                        }
                        ), a.callError);
                    else {
                        e([])
                    }
                }
                updateWidgetSettings(e={}, t= () => {}
                ) {
                    const n = this;
                    (0,
                    i.isBundleBuilderWidget)(n) && n.data.config.steps.forEach((e => {
                        if (null != e && e.carousel) {
                            var t, n;
                            const r = document.querySelector(null == e || null == (t = e.carousel_selectors) ? void 0 : t.container);
                            e.carousel.destroy(!0),
                            null == r || null == (n = r.classList) || n.remove("splide")
                        }
                    }
                    )),
                    setTimeout(( () => {
                        n.data.settings = e || {},
                        n.compileConfig(),
                        n.initLivePreview(),
                        "placeholder" !== n.data.config.type ? (n.getWidgetStyles((function() {
                            var e;
                            null != (e = n.data.recharge) && e.portal && "recharge_customer_portal" === n.data.config.type && "affinity" === n.data.recharge.themeName && n.watchRechargeAffinity(!0),
                            (0,
                            i.isBundleBuilderWidget)(n) ? (_assertClassBrand(L, n, _initializeBundleBuilderDefaults).call(n),
                            v.Widget.callbacks.init(n),
                            n.render()) : n.getWidgetProducts((function(e) {
                                m.log("products", e),
                                v.Widget.callbacks.init(n),
                                n.render()
                            }
                            ))
                        }
                        )),
                        m.log("New widget settings updated via updateWidgetSettings: ", n.data.settings),
                        t(n.data.settings)) : m.log("updateWidgetSettings:: placeholder - skipping")
                    }
                    ), 0)
                }
                softUpdateBundleBuilderWidgetSettings(e={}, t= () => {}
                ) {
                    const n = this;
                    (0,
                    i.isBundleBuilderWidget)(n) ? (null != e && e.steps && e.steps.map(( (e, t) => {
                        const r = n.data.config.steps[t];
                        return e.unlocked = null == r ? void 0 : r.unlocked,
                        e.has_met_minimum_quantity = null == r ? void 0 : r.has_met_minimum_quantity,
                        null != r && r.carousel && (e.carousel = null == r ? void 0 : r.carousel,
                        e.carousel_selectors = null == r ? void 0 : r.carousel_selectors),
                        null != r && r.products && (e.products = r.products,
                        e.metadata = r.metadata),
                        e
                    }
                    )),
                    n.data.settings = e,
                    n.compileConfig(),
                    m.log("Soft update for bundle builder settings updated via softUpdateBundleBuilderWidgetSettings: ", n.data.settings),
                    t(n.data.settings)) : m.log("Aborted softUpdateBundleBuilderWidgetSettings: ", n.data.settings)
                }
                getWidgetBundleProducts(e, t, n= () => {}
                ) {
                    var r;
                    const s = this
                      , c = window.Rebuy
                      , u = P.J.getIdentity()
                      , d = P.J.getUTMObject()
                      , f = [];
                    if (e.products = Array(l.uk).fill({
                        type: "placeholder"
                    }),
                    !s.data.cart)
                        return void p.Z.call.push((function() {
                            s.data.cart = p.Z.cart,
                            s.data.shopify_product_ids = p.Z.getCartProductIDs(),
                            s.data.shopify_variant_ids = p.Z.getCartVariantIDs(),
                            s.getWidgetBundleProducts(e, t, n)
                        }
                        ));
                    s.data.shopify_product_ids = p.Z.getCartProductIDs(),
                    s.data.shopify_variant_ids = p.Z.getCartVariantIDs(),
                    o.start("Widget Bundle ID:" + s.id, "Widget.getWidgetBundleProducts");
                    const g = {
                        key: c.shop.api_key,
                        limit: (null == e ? void 0 : e.product_limit) || l.QZ,
                        url: window.location.href,
                        shopify_product_ids: s.getProductIDs(!0),
                        shopify_variant_ids: s.getVariantIDs(!0),
                        shopify_collection_ids: s.getCollectionIDs(!0),
                        shopify_order_ids: s.getOrderIDs(!0)
                    };
                    if (d)
                        for (const e in d)
                            g.url = (0,
                            i.urlAddParameter)(g.url, e, d[e]);
                    s.data.cart && (0,
                    i.formatCartConfig)(s, g),
                    u && u.cid && (g.shopify_customer_id = u.cid),
                    u && u.uuid && (g.uuid = u.uuid),
                    E.shopifySellingPlansEnabled() ? g.shopify_selling_plans = "yes" : E.sellingPlanEnabled() && (g.selling_plans = "yes");
                    for (const e in c.shop.integrations)
                        if (s.data.config.integrations && s.data.config.integrations[e]) {
                            g.metafields = "yes";
                            break
                        }
                    null != e && null != (r = e.product_options) && r.enabled_product_metafields && (g.metafields = "yes"),
                    e && e.endpoint ? a.callAPI("GET", e.endpoint, g).then((function(r) {
                        if (v.Widget.callbacks.beforeProductsChange(r.data, s),
                        e.products = s.initProducts(r.data),
                        !C.Y.isAdminPreview()) {
                            const t = (0,
                            S.getShopCurrencyCode)()
                              , n = (0,
                            S.getActiveCurrencyCode)();
                            t && n && t !== n && (m.log("Starting currency updates for products..."),
                            Promise.allSettled(e.products.map((async e => {
                                try {
                                    await s.getProductPricingForCurrency(e)
                                } catch (t) {
                                    m.warn(`Queueing ${e.id} for additional pricing lookup`, t),
                                    _classPrivateFieldGet(N, s)[e.id] = e
                                }
                            }
                            ))).then(( () => {
                                s.processContextualPricingQueue()
                            }
                            )).catch((e => {
                                m.error("Failed to process currency updates:", e)
                            }
                            )))
                        }
                        r.metadata ? e.metadata = r.metadata : delete e.metadata,
                        setTimeout(( () => {
                            s.initializeBundleStepCarousel(e, t)
                        }
                        ), 0),
                        v.Widget.callbacks.productsChange(e.products, s),
                        s.data.config.steps.splice(t, 1, e),
                        n(e.products),
                        o.end("Widget Bundle ID:" + s.id, "Widget.getWidgetBundleProducts")
                    }
                    ), a.callError) : n(f)
                }
                restoreCarouselProducts() {
                    var e, t;
                    const n = this
                      , {isFlickity: r, isSplide: a} = (0,
                    i.getCarousel)();
                    if (null == (e = n.View) || !e.carousel)
                        return;
                    const o = n.View.carousel_selectors && document.querySelectorAll(a ? `${n.View.carousel_selectors.items}:not(.splide__slide--clone)` : `${n.View.carousel_selectors.container} > .rebuy-product-block`) || []
                      , s = n.View.carousel_selectors && document.querySelectorAll(n.View.carousel_selectors.viewport)
                      , l = null != (t = s && [...s].findIndex((e => {
                        const t = e.children[0];
                        return e.children.length > 0 && t.children.length > 0
                    }
                    ))) ? t : -1
                      , c = l > -1 && s[l] || s && s[0];
                    if (c && o.length > 0) {
                        const e = [...o]
                          , {carousel: t, carousel_selectors: s} = n.View;
                        if (r) {
                            const n = document.createDocumentFragment();
                            for (; e.length; )
                                n.appendChild(e.shift());
                            c.querySelector(s.list).appendChild(n),
                            t.reloadCells()
                        } else
                            a && (0,
                            i.handleSplideMounted)(s, t, n)
                    }
                    n.View.resizeView(!0)
                }
                initLivePreview() {
                    const e = this;
                    if (C.Y.isAdminPreview() && window.live_preview_object) {
                        const t = window.live_preview_object.settings;
                        for (const n in e.data.config)
                            Object.prototype.hasOwnProperty.call(e.data.config, n) && (Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e.data.config[n]));
                        e.data.config = t
                    }
                }
                shouldDisplay() {
                    var e, t, n, i;
                    const a = this;
                    if (C.Y.isAdminPreview())
                        return m.log("= = = Widget set to display: Admin Preview = = ="),
                        !0;
                    let o = !0;
                    if ("shopify_checkout" === a.data.config.type && C.Y.isShopifyThankYou() && (o = !1,
                    m.log("= = = Widget will not display: Thank You Page = = =")),
                    "shopify_checkout" === a.data.config.type && C.Y.isShopifyOrderConfirmation() && (o = !1,
                    m.log("= = = Widget will not display: Order Confirmation Page = = =")),
                    "shopify_post_purchase" === a.data.config.type && (o = !(!C.Y.isShopifyThankYou() && !C.Y.isShopifyOrderConfirmation()),
                    m.log("= = = Widget will not display: Order Confirmation Page = = =")),
                    ("shopify_checkout_extension" === a.data.config.type || a.data.config.type.startsWith("ui_extension_")) && (o = !1,
                    m.log(`= = = Widget ID: ${a.data.id} will not display: Shopify Checkout UI Extensions (only via Checkout Editor) = = =`)),
                    "recharge_post_purchase" !== a.data.config.type || C.Y.isReChargeThankYou() || (o = !1,
                    m.log("= = = Widget will not display: Order Confirmation Page = = =")),
                    "recharge_customer_portal" === a.data.config.type && (!a.data.recharge.portal || a.data.recharge.portal && "edit_subscription" !== a.data.recharge.step) && (o = !1,
                    m.log("= = = Widget will not display: Recharge Customer Portal - Edit Subscription = = =")),
                    null != (e = a.data.recharge) && e.portal && "recharge_customer_portal" === a.data.config.type && "affinity" === a.data.recharge.themeName && (m.log("= = = Widget set to display: Recharge Customer Portal - Affinity theme = = ="),
                    o = !0),
                    !0 === (null == a || null == (t = a.data) || null == (n = t.config) || null == (i = n.view_options) ? void 0 : i.limit_views)) {
                        const e = a.getWidgetViewCount();
                        0 === a.data.config.view_options.cookie_days && e > 0 && a.setWidgetViewCount(e),
                        e >= a.data.config.view_options.max_views && (o = !1)
                    }
                    return a.data.config.preview_mode && !r.J.isWidgetPreviewMode() && (o = !1,
                    m.log("= = = Widget will not display: Preview Mode = = =")),
                    o
                }
                hasGlobalDiscount() {
                    const e = this;
                    let t = !1;
                    return (0,
                    i.isBundleBuilderWidget)(e) || e.data.config.discount && e.data.config.discount.type && "none" !== e.data.config.discount.type && (t = !0),
                    t
                }
                hasProductDiscount(e) {
                    let t = !1;
                    return e.discount && e.discount.type && "none" !== e.discount.type && (t = !0),
                    t
                }
                initProducts(e) {
                    var t, n, r;
                    const a = this;
                    if (!(e = e.filter((e => e.variants.length > 0))))
                        return [];
                    const o = "both" === a.data.config.product_type || "subscription" === a.data.config.product_type || a.hasSelectedEnabledBundleSubscription();
                    for (let t = 0; t < e.length; t++)
                        (0,
                        i.initializeProduct)(e[t], o, a);
                    if (null != a && null != (t = a.data) && null != (n = t.config) && null != (r = n.product_options) && r.show_variants_as_products) {
                        let t = [];
                        for (let n = 0; n < e.length; n++)
                            for (let r = 0; r < e[n].variants.length; r++) {
                                const a = (0,
                                i.extend)(!0, {}, e[n])
                                  , l = a.variants[r];
                                var s;
                                if (a.selected_variant = l,
                                a.selected_variant_id = l.id,
                                a.option1 = l.option1,
                                a.option2 = l.option2,
                                a.option3 = l.option3,
                                o)
                                    (0,
                                    i.initializeSelectedVariantSellingPlans)(a),
                                    !(0,
                                    i.isDefined)(a.subscription_id) && (null == a || null == (s = a.selling_plan_groups) ? void 0 : s.length) > 0 && ((0,
                                    i.isDefined)(a.selected_variant.selling_plans) ? a.subscription_id = a.selected_variant.selling_plans[0].id : a.subscription_id = a.selling_plan_groups[0].selling_plans[0].id);
                                a.variants = [l],
                                t.push(a)
                            }
                        return "product_limit" === a.data.config.product_options.variant_display_limit && (t = t.slice(0, a.data.config.limit)),
                        t
                    }
                    return e
                }
                registerEventListener(e, t) {
                    const n = this;
                    n.eventListeners[e] = function(e) {
                        -1 !== window.Rebuy.widgets.indexOf(n) ? t(e) : n.unregisterEventListener("rebuy:cart.change")
                    }
                    ,
                    document.addEventListener(e, n.eventListeners[e])
                }
                unregisterEventListener(e) {
                    const t = this;
                    t.eventListeners[e] && document.removeEventListener(e, t.eventListeners[e])
                }
                watchCart(e) {
                    const t = this;
                    e = e || function() {}
                    ,
                    t.data.cart && t.registerEventListener("rebuy:cart.change", (function(n) {
                        p.Z.call.push((function() {
                            if (t.data.cart = p.Z.cart,
                            t.isCartBasedWidget()) {
                                t.data.shopify_product_ids = p.Z.getCartProductIDs(),
                                t.data.shopify_variant_ids = p.Z.getCartVariantIDs();
                                let n = !0;
                                "pre_purchase" === t.data.config.type && t.data.visible && (n = !1),
                                n && t.getWidgetProducts((function(n) {
                                    t.isPrePurchase() && (n.length > 0 ? t.watchCheckoutClick(( () => t.show())) : t.unwatchCheckoutClick()),
                                    e(n)
                                }
                                ))
                            }
                            "cart_subscription" === t.data.settings.type && t.enrichCartWithSubscriptions(),
                            t.data.settings.product_options.match_variant && (0,
                            i.autoSelectVariantsByAttributeMap)(t.data.products, p.Z.itemAttributeMap, t)
                        }
                        ))
                    }
                    ))
                }
                trackABWidgetAddToCart(e, t) {
                    var n, r;
                    const i = this;
                    if (null != i && null != (n = i.element) && null != (r = n.dataset) && r.rebuyExperimentId) {
                        const {rebuyExperimentId: n} = i.element.dataset;
                        n && P.J.trackEvent({
                            subject: "user",
                            verb: "added-from",
                            noun: "widget",
                            defined_noun_id: i.id,
                            metadata: {
                                [`product_id:${e.id.toString()}`]: !0,
                                [`variant_id:${t || e.selected_variant.id.toString()}`]: !0
                            },
                            tags: [`ABN.TEST.${n}`]
                        })
                    }
                }
                unwatchCart() {
                    this.unregisterEventListener("rebuy:cart.change")
                }
                watchAddToCart(e) {
                    const t = this;
                    e = e || function() {}
                    ,
                    t.registerEventListener("rebuy:cart.add", (function(n) {
                        const r = n.detail.item;
                        function tailAddedItem(e) {
                            t.data.shopify_product_ids.length && t.data.shopify_product_ids.includes(e.product_id) && (t.data.tails.added_item = e)
                        }
                        if (m.log("rebuy:cart.add", n.detail),
                        "product_upsell" === t.data.config.type || "switch_to_subscription" === t.data.config.type) {
                            t.data.shopify_variant_ids.find((e => e === n.detail.item.id)) || "switch_to_subscription" !== t.data.config.type || t.data.shopify_variant_ids.push(n.detail.item.id),
                            r.items && r.items.length ? r.items.map(tailAddedItem) : tailAddedItem(r)
                        } else
                            "product_addon" === t.data.config.type && (t.data.tails.added_item = r);
                        e(r)
                    }
                    ))
                }
                watchCheckoutClick(e) {
                    const t = this
                      , n = '[href="/checkout"], form[action="/cart"] button[type="submit"], form[action="/cart"] input[type="submit"], form[action="/checkout"] input[type="submit"], form[action="/checkout"] button[type="submit"], button[class~="rebuy-cart__checkout-button"]';
                    let r = !1;
                    const a = window.Rebuy.SmartCart;
                    e = e || ( () => {}
                    ),
                    C.Y.isSmartCartPreview() || (i.DOM.hasClass(n, "rebuy-cart__checkout-button") && (r = !0),
                    r && t.data.products.length && (a.disableCheckout = !0),
                    t.isPrePurchase() && !t.bindedCheckoutClick && (O()(n).on("click.checkout", (function(t) {
                        t.preventDefault(),
                        e()
                    }
                    )),
                    t.bindedCheckoutClick = !0))
                }
                unwatchAddToCart() {
                    this.unregisterEventListener("rebuy:cart.add")
                }
                unwatchCheckoutClick() {
                    const e = this
                      , t = window.Rebuy.SmartCart;
                    C.Y.isSmartCartPreview() || e.isPrePurchase() && e.bindedCheckoutClick && (t.disableCheckout = !1,
                    O()('[href="/checkout"], form[action="/cart"] button[type="submit"], form[action="/cart"] input[type="submit"], form[action="/checkout"] input[type="submit"], form[action="/checkout"] button[type="submit"], button[class~="rebuy-cart__checkout-button"]').off("click.checkout"),
                    e.data.visible = !1,
                    e.bindedCheckoutClick = !1)
                }
                watchElement() {
                    const e = this;
                    new (window.MutationObserver || window.WebKitMutationObserver)((function(t, n) {
                        document.querySelector(`div#rebuy-widget-${e.id}`) || B.initializeElements(e)
                    }
                    )).observe(document.body, {
                        childList: !0,
                        subtree: !0
                    }),
                    m.log("watchElement called:", e)
                }
                disableSmartCartHandling(e) {
                    const t = O()(e);
                    t.length && (t[0].disableSmartCartHandling = !0)
                }
                removeDisableSmartCartHandling(e) {
                    const t = O()(e);
                    t.length && t[0].disableSmartCartHandling && (t[0].disableSmartCartHandling = !1)
                }
                watchFormSubmit(e, t) {
                    t = t || function() {}
                    ,
                    O()(e).on("submit.rebuy:watchFormSubmit", t),
                    m.log("watchFormSubmit called:", this)
                }
                unwatchFormSubmit(e) {
                    const t = O()(e);
                    this.removeDisableSmartCartHandling(e),
                    t.off("submit.rebuy:watchFormSubmit"),
                    m.log("unwatchFormSubmit called:", this)
                }
                watchFormInputChanges(e, t) {
                    t = t || function() {}
                    ,
                    O()(e).on("change.rebuy:watchFormInputs", ":input", t),
                    m.log("watchFormInputChanges called:", this)
                }
                unwatchFormInputChanges(e) {
                    O()(e).off("change.rebuy:watchFormInputs", ":input"),
                    m.log("unwatchFormInputChanges called:", this)
                }
                enrichCartWithSubscriptions(e) {
                    const t = this;
                    e = e || function() {}
                    ,
                    p.Z.call.push((function() {
                        p.Z.enrichCart((function() {
                            const n = p.Z.availableSubscriptionOptions();
                            t.data.subscription = n,
                            e()
                        }
                        ))
                    }
                    ))
                }
                isCartBasedWidget() {
                    let e = !1;
                    return -1 !== ["cart", "gift_with_purchase", "shopify_checkout", "recharge_checkout", "cart_subscription", "pre_purchase"].indexOf(this.data.config.type) && (e = !0),
                    e
                }
                isPrePurchase() {
                    let e = !1;
                    return "pre_purchase" === this.data.config.type && (e = !0),
                    e
                }
                updateFormVariantID() {
                    const e = this
                      , t = O()('[name="id"]', e.data.config.popup_trigger_selector).val();
                    e.data.dynamic_shopify_variant_ids = [t],
                    e.getWidgetProducts(),
                    m.log("Widget.watchFormInputChanges - variant ID: ", t)
                }
                repositionTemplate() {
                    const e = this;
                    if (e.template && e.View) {
                        const t = i.DOM.windowWidth();
                        let n = !1
                          , r = "body"
                          , a = "append"
                          , o = ""
                          , s = null;
                        if (("" === e.data.config.breakpoints.large.min || t > e.data.config.breakpoints.large.min) && ("" === e.data.config.breakpoints.large.max || t < e.data.config.breakpoints.large.max) ? ({enabled: n, selector: r, location: a} = e.data.config.placement.large) : ("" === e.data.config.breakpoints.medium.min || t > e.data.config.breakpoints.medium.min) && ("" === e.data.config.breakpoints.medium.max || t < e.data.config.breakpoints.medium.max) ? ({enabled: n, selector: r, location: a} = e.data.config.placement.medium) : ("" === e.data.config.breakpoints.small.min || t > e.data.config.breakpoints.small.min) && ("" === e.data.config.breakpoints.small.max || t < e.data.config.breakpoints.small.max) && ({enabled: n, selector: r, location: a} = e.data.config.placement.small),
                        (n || "recharge_customer_portal" !== e.data.config.type || "edit_subscription" !== e.data.recharge.step) && (n || "recharge_customer_portal" !== e.data.config.type || "affinity" !== e.data.recharge.themeName) || (({selector: r, placement: o} = e.data.recharge),
                        n = !0,
                        a = o),
                        n)
                            switch (s = O()(r).eq(0),
                            a) {
                            case "before":
                                s.before(e.template);
                                break;
                            case "after":
                                s.after(e.template);
                                break;
                            case "append":
                                s.append(e.template);
                                break;
                            case "prepend":
                                s.prepend(e.template);
                                break;
                            case "html":
                                s.html(e.template);
                                break;
                            default:
                                console.error("The provided location is not supported", a)
                            }
                    }
                }
                getProductIDs(e) {
                    const t = this;
                    let n = [];
                    return (0,
                    i.isArray)(t.data.shopify_product_ids) && (n = n.concat(t.data.shopify_product_ids)),
                    (0,
                    i.isArray)(t.data.dynamic_shopify_product_ids) && (n = n.concat(t.data.dynamic_shopify_product_ids)),
                    e ? n.join(",") : n
                }
                getVariantIDs(e) {
                    const t = this;
                    let n = [];
                    return (0,
                    i.isArray)(t.data.shopify_variant_ids) && (n = n.concat(t.data.shopify_variant_ids)),
                    (0,
                    i.isArray)(t.data.dynamic_shopify_variant_ids) && (n = n.concat(t.data.dynamic_shopify_variant_ids)),
                    e ? n.join(",") : n
                }
                getCollectionIDs(e) {
                    const t = this;
                    let n = [];
                    return (0,
                    i.isArray)(t.data.shopify_collection_ids) && (n = t.data.shopify_collection_ids),
                    e ? n.join(",") : n
                }
                getOrderIDs(e) {
                    const t = this;
                    let n = [];
                    if ((0,
                    i.isArray)(t.data.shopify_order_ids) && (n = t.data.shopify_order_ids),
                    "shopify" === C.Y.context())
                        window.Shopify && window.Shopify.checkout && window.Shopify.checkout.order_id && n.push(window.Shopify.checkout.order_id);
                    else if ("malomo" === C.Y.context()) {
                        const e = (0,
                        i.urlGetParameter)("_m_alt_id");
                        e && n.push(e)
                    } else
                        "recharge" === C.Y.context() && void 0 !== window.checkout_order_id && n.push(window.checkout_order_id);
                    return e ? n.join(",") : n
                }
                setProductIDs(e) {
                    m.log("this", this),
                    m.log("product_ids is:", e);
                    let t = [];
                    const n = [];
                    t = (0,
                    i.isArray)(e) ? e : e.split(",");
                    for (let e = 0; e < t.length; e++)
                        n.push(parseInt(t[e]));
                    this.shopify_product_ids = n,
                    this.getWidgetProducts()
                }
                getWidgetProductByID(e) {
                    let t = null;
                    const n = this.data.products;
                    if (n)
                        for (let r = 0; r < n.length; r++)
                            if (n[r].id === e) {
                                t = n[r];
                                break
                            }
                    return t
                }
                getWidgetProductVariantByID(e, t) {
                    let n = null;
                    for (let r = 0; r < e.variants.length; r++)
                        if (e.variants[r].id === t) {
                            n = e.variants[r];
                            break
                        }
                    return n
                }
                getCartToken() {
                    const e = this;
                    let t = "";
                    return e.data.cart && e.data.cart && (t = e.data.cart.token),
                    t
                }
                hasTimer() {
                    const e = this;
                    let t = !1;
                    return "gift_with_purchase" !== e.data.settings.type && e.data.config.timer && e.data.config.timer.enabled && (t = !0),
                    t
                }
                timer() {
                    const e = this;
                    if ("gift_with_purchase" !== e.data.settings.type && e.data.config.timer && e.data.config.timer.enabled && !e.setTimer) {
                        const t = setInterval(( () => {
                            const n = e.data.config.timer;
                            let r = parseInt(n.duration_seconds)
                              , i = parseInt(n.duration_minutes);
                            r >= 0 && (r -= 1),
                            r < 0 && (0 === i ? (clearInterval(t),
                            r = 0,
                            e.endOfferTimer()) : (i -= 1,
                            r = 59)),
                            r < 10 && (r = "0" + r.toString()),
                            n.duration_seconds = r,
                            n.duration_minutes = i
                        }
                        ), 1e3);
                        e.setTimer = !0
                    }
                }
                endOfferTimer() {
                    const e = this
                      , t = e.data.config;
                    C.Y.isAdminPreview() || ("pre_purchase" === t.type ? p.Z.checkout() : "dismiss" === t.timer.action ? e.destroy() : "checkout" === t.timer.action ? p.Z.checkout() : "cart" === t.timer.action && p.Z.goToCartPage())
                }
                cartHasSubscriptionProducts() {
                    const e = this;
                    let t = !1
                      , n = [];
                    e.data.cart && e.data.cart.items ? n = e.data.cart.items : e.data.cart && e.data.cart.line_items && (n = e.data.cart.line_items);
                    for (let e, r = 0; r < n.length; r++) {
                        if (e = n[r].properties,
                        e.shipping_interval_frequency) {
                            t = !0;
                            break
                        }
                        if (e.shipping_interval_unit_type) {
                            t = !0;
                            break
                        }
                        if (e.subscription_id) {
                            t = !0;
                            break
                        }
                    }
                    return t
                }
                getShopifyOrder(e) {
                    const t = this
                      , n = window.Rebuy
                      , r = n.libraries.$;
                    e = e || function() {}
                    ;
                    const i = E.routeRoot();
                    if (C.Y.isAdminPreview() && n.shop && n.shop.domain) {
                        const a = {
                            method: "GET",
                            url: `https://${n.shop.domain}${i}cart.json?callback=?`,
                            dataType: "jsonp",
                            success: function(n) {
                                n.line_items = n.items,
                                delete n.items,
                                t.data.order = n,
                                t.data.shopify_product_ids = t.getOrderProductIDs(),
                                t.data.shopify_variant_ids = t.getOrderVariantIDs(),
                                e(n)
                            }
                        };
                        r.ajax(a)
                    } else
                        Shopify.checkout && (t.data.order = Shopify.checkout,
                        t.data.shopify_product_ids = t.getOrderProductIDs(),
                        t.data.shopify_variant_ids = t.getOrderVariantIDs(),
                        e(Shopify.checkout))
                }
                getReChargeCart(e) {
                    const t = this
                      , n = window.Rebuy
                      , r = n.libraries.$;
                    e = e || function() {}
                    ;
                    const i = E.routeRoot();
                    if (C.Y.isAdminPreview() && n.shop && n.shop.domain) {
                        const a = {
                            method: "GET",
                            url: `https://${n.shop.domain}${i}cart.json?callback=?`,
                            dataType: "jsonp",
                            success: function(n) {
                                n.line_items = n.items,
                                delete n.items,
                                t.data.cart = n,
                                t.data.shopify_product_ids = t.getCartProductIDs(),
                                t.data.shopify_variant_ids = t.getCartVariantIDs(),
                                e(n)
                            }
                        };
                        r.ajax(a)
                    } else
                        t.data.cart = window.cart_json,
                        t.data.shopify_product_ids = t.getCartProductIDs(),
                        t.data.shopify_variant_ids = t.getCartVariantIDs(),
                        e(window.cart_json)
                }
                setReChargeCart(e, t) {
                    t = t || function() {}
                    ,
                    window.cart_json = e,
                    this.getReChargeCart((function() {
                        t(window.cart_json)
                    }
                    ))
                }
                getCartProductIDs() {
                    const e = this
                      , t = [];
                    let n = [];
                    e.data.cart && e.data.cart.items ? n = e.data.cart.items : e.data.cart && e.data.cart.line_items && (n = e.data.cart.line_items);
                    for (let e = 0; e < n.length; e++)
                        -1 === t.indexOf(n[e].product_id) && t.push(n[e].product_id);
                    return t
                }
                getCartVariantIDs() {
                    const e = this
                      , t = [];
                    let n = [];
                    e.data.cart && e.data.cart.items ? n = e.data.cart.items : e.data.cart && e.data.cart.line_items && (n = e.data.cart.line_items);
                    for (let e = 0; e < n.length; e++)
                        -1 === t.indexOf(n[e].variant_id) && t.push(n[e].variant_id);
                    return t
                }
                getReChargeOrder(e) {
                    const t = this
                      , n = window.Rebuy
                      , r = n.libraries.$;
                    e = e || function() {}
                    ;
                    const i = E.routeRoot();
                    if (C.Y.isAdminPreview() && n.shop && n.shop.domain) {
                        const a = {
                            method: "GET",
                            url: `https://${n.shop.domain}${i}cart.json?callback=?`,
                            dataType: "jsonp",
                            success: function(n) {
                                n.line_items = n.items,
                                delete n.items,
                                t.data.order = n,
                                t.data.shopify_product_ids = t.getOrderProductIDs(),
                                t.data.shopify_variant_ids = t.getOrderVariantIDs(),
                                e(n)
                            }
                        };
                        r.ajax(a)
                    } else
                        window.cart_json ? (t.data.order = window.cart_json,
                        t.data.shopify_product_ids = t.getOrderProductIDs(),
                        t.data.shopify_variant_ids = t.getOrderVariantIDs(),
                        e(window.cart_json)) : e()
                }
                getOrderProductIDs() {
                    const e = this
                      , t = [];
                    if (e.data.order && e.data.order.line_items) {
                        const n = e.data.order.line_items;
                        for (let e = 0; e < n.length; e++)
                            -1 === t.indexOf(n[e].product_id) && t.push(n[e].product_id)
                    }
                    return t
                }
                getOrderVariantIDs() {
                    const e = this
                      , t = [];
                    if (e.data.order && e.data.order.line_items) {
                        const n = e.data.order.line_items;
                        for (let e = 0; e < n.length; e++)
                            -1 === t.indexOf(n[e].variant_id) && t.push(n[e].variant_id)
                    }
                    return t
                }
                productAvailable(e) {
                    const t = this;
                    let n = !1;
                    for (let r = 0; r < e.variants.length; r++)
                        if (t.variantAvailable(e.variants[r])) {
                            n = !0;
                            break
                        }
                    return n
                }
                variantAvailable(e) {
                    return !(e.inventory_management && "deny" === e.inventory_policy.toLowerCase() && e.inventory_quantity <= 0)
                }
                hasSubscription(e) {
                    let t = !1;
                    return e && e.has_subscription && (t = !0),
                    t
                }
                hasSubscriptionDiscount(e) {
                    let t = !1;
                    const n = this.getSubscriptionDiscount(e);
                    return n && n.amount > 0 && (t = !0),
                    t
                }
                getSubscriptionDiscount(e) {
                    const t = this;
                    let n = null;
                    if (e)
                        if (E.shopifySellingPlansEnabled() && e.has_subscription && e.selling_plan_groups && e.selected_variant.selling_plans) {
                            var r, i, a, o;
                            const t = e.selected_variant.selling_plans.find((t => t.id === e.subscription_id));
                            if (n = {
                                type: (null == t || null == (r = t.price_adjustments) || null == (i = r[0]) ? void 0 : i.value_type) || "none",
                                amount: (null == t || null == (a = t.price_adjustments) || null == (o = a[0]) ? void 0 : o.value) || 0
                            },
                            "price" === n.type) {
                                const t = parseInt(e.selected_variant.price)
                                  , r = n.amount
                                  , i = Math.floor((t - r) / t * 100);
                                n.amount = i,
                                n.type = "percentage"
                            }
                        } else
                            E.sellingPlanEnabled() && e.selling_plan_groups && e.has_subscription ? n = {
                                type: e.selling_plan_groups[0].discount_type,
                                amount: e.selling_plan_groups[0].discount_amount
                            } : e.has_subscription && e.subscription_discount && (n = {
                                type: "percentage",
                                amount: e.subscription_discount
                            });
                    else if (t.data.subscription && t.data.subscription.options && t.data.subscription.options.length > 0) {
                        const e = {
                            type: t.data.subscription.options[0].discount_type,
                            amount: t.data.subscription.options[0].discount_amount
                        };
                        if (t.data.subscription.selectedOption)
                            e.type = t.data.subscription.selectedOption.discount_type,
                            e.amount = t.data.subscription.selectedOption.discount_amount;
                        else if (t.data.subscription.default_frequency)
                            for (let n = 0; n < t.data.subscription.options.length; n++)
                                if (t.data.subscription.options[n].frequency === t.data.subscription.default_frequency) {
                                    e.type = t.data.subscription.options[n].discount_type,
                                    e.amount = t.data.subscription.options[n].discount_amount;
                                    break
                                }
                    }
                    return n
                }
                findSelectedSellingPlan(e) {
                    return (0,
                    i.findSelectedSellingPlan)(e)
                }
                findSelectedSellingPlanAllocation(e) {
                    return (0,
                    i.findSelectedSellingPlanAllocation)(e)
                }
                toggleSubscription(e) {
                    const t = this;
                    t.hasSubscription(e) && e.subscription ? t.selectSubscription(e) : t.selectOnetime(e)
                }
                selectSubscription(e, t) {
                    this.hasSubscription(e) && (e.subscription = !0,
                    e.subscription_frequency = void 0 !== t ? t : e.subscription_frequencies[0])
                }
                selectOnetime(e) {
                    var t;
                    if (e.subscription = !1,
                    e.subscription_frequency = "onetime",
                    e && e.selling_plan_groups && null != (t = e.selected_variant) && t.selling_plan_allocations) {
                        const t = e.selected_variant.selling_plans[0];
                        e.subscription_id = t.id,
                        e.selected_selling_plan = t,
                        e.subscription_discount_amount = t.price_adjustments[0].value
                    }
                }
                localizedCurrency(e, t, n, r=!1) {
                    const i = this;
                    if (!t || !n)
                        return e;
                    const a = (0,
                    S.getShopCurrencyCode)()
                      , o = (0,
                    S.getActiveCurrencyCode)();
                    if (a && o && a !== o) {
                        const a = T.get(_classPrivateFieldGet(W, i).call(i, t));
                        if (null != a && a.variants) {
                            var s;
                            const t = null == (s = a.variants) ? void 0 : s.find(( ({id: e}) => e === n.id));
                            var l, c;
                            if (t)
                                if (r)
                                    e = null == (l = new Money(t.compare_at_price,(0,
                                    S.getActiveCurrencyCode)())) ? void 0 : l.amount;
                                else
                                    e = null == (c = new Money(t.price,(0,
                                    S.getActiveCurrencyCode)())) ? void 0 : c.amount
                        }
                    }
                    return e
                }
                async getProductPricingForCurrency(e) {
                    const t = this
                      , n = T.get(_classPrivateFieldGet(W, t).call(t, e.handle));
                    if (!(n && "undefined" !== n && n.expires > Date.now() && n.currency === (0,
                    S.getActiveCurrencyCode)())) {
                        T.delete(_classPrivateFieldGet(W, t).call(t, e.handle)),
                        m.log(`[Widget ${this.id}] Fetching product pricing data for ${e.handle}`);
                        try {
                            var r, i, a;
                            const n = await fetch(`${E.baseURL()}/products/${e.handle}.js`);
                            if (!n.ok)
                                throw new Error(`Failed to fetch product pricing data for ${e.handle}`);
                            const {variants: o=[]} = await n.json()
                              , s = (0,
                            S.getActiveCurrencyCode)()
                              , l = o.map((e => (0,
                            S.checkIfThreeDigitCurrency)(e, s)));
                            T.set(_classPrivateFieldGet(W, t).call(t, e.handle), {
                                currency: s,
                                variants: l,
                                expires: Date.now() + 36e5
                            }),
                            null == (r = t.View) || null == (i = r.vue) || null == (a = i.$forceUpdate) || a.call(i)
                        } catch (t) {
                            throw m.warn(`[Widget ${this.id}] getProductPricingForCurrency failed for ${e.handle}:`, t),
                            t
                        }
                    }
                }
                async processContextualPricingQueue() {
                    m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Starting...`);
                    const e = this;
                    if (_classPrivateFieldGet(M, e) || 0 === Object.keys(_classPrivateFieldGet(N, e)).length)
                        m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Already processing or empty queue - aborting`);
                    else {
                        _classPrivateFieldSet(M, e, !0);
                        try {
                            const t = Object.keys(_classPrivateFieldGet(N, e));
                            m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Processing products: ${t}`);
                            const n = await (0,
                            i.getStaticProducts)({
                                ids: t,
                                country_code: E.getCurrentCountry(),
                                limit: t.length
                            });
                            m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Fetched country-based products`),
                            n.data.forEach((t => {
                                const n = _classPrivateFieldGet(N, e)[t.id];
                                if (!n)
                                    return void m.log(`[Widget ${this.id}] [processContextualPricingQueue] - No queued product found for ID: ${t.id}`);
                                m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Processing product: ${n.handle}`);
                                const r = n.variants.map((e => {
                                    var n, r;
                                    const i = t.variants.find((t => t.id.toString() === e.id.toString()));
                                    return {
                                        ...e,
                                        price: null != (n = null == i ? void 0 : i.price) ? n : e.price,
                                        compare_at_price: null != (r = null == i ? void 0 : i.compare_at_price) ? r : null
                                    }
                                }
                                ));
                                m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Transformed variants for: ${n.handle}`),
                                T.set(_classPrivateFieldGet(W, e).call(e, n.handle), {
                                    currency: (0,
                                    S.getActiveCurrencyCode)(),
                                    variants: r,
                                    expires: Date.now() + 36e5
                                }),
                                e.data.products = e.data.products.map((e => e.id.toString() === n.id.toString() ? {
                                    ...e,
                                    variants: r
                                } : e))
                            }
                            )),
                            _classPrivateFieldSet(N, e, {}),
                            m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Successfully processed all products`)
                        } catch (t) {
                            console.error(`[Widget ${this.id}] [processContextualPricingQueue] - Batch pricing fetch failed:`, t),
                            Object.values(_classPrivateFieldGet(N, e)).forEach((t => {
                                m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Caching error state for: ${t.handle}`),
                                T.set(_classPrivateFieldGet(W, e).call(e, t.handle), {
                                    error: "Failed to fetch pricing data via both methods",
                                    currency: (0,
                                    S.getActiveCurrencyCode)(),
                                    expires: Date.now() + 9e5
                                })
                            }
                            )),
                            _classPrivateFieldSet(N, e, {})
                        } finally {
                            var t, n, r;
                            _classPrivateFieldSet(M, e, !1),
                            null == (t = e.View) || null == (n = t.vue) || null == (r = n.$forceUpdate) || r.call(n),
                            m.log(`[Widget ${this.id}] [processContextualPricingQueue] - Finished processing`)
                        }
                    }
                }
                variantPrice(e, t) {
                    var n;
                    const r = this;
                    null !== t && t || (t = (0,
                    i.findLowestPricedVariant)(e));
                    let a = _classPrivateFieldGet($, r).call(r, r.data.config.discount, t, null);
                    const o = (0,
                    S.getShopCurrencyCode)()
                      , s = (0,
                    S.getActiveCurrencyCode)();
                    if (o && s && o !== s) {
                        const n = T.get(_classPrivateFieldGet(W, r).call(r, e.handle));
                        if (null != n && n.variants) {
                            var l;
                            const e = null == (l = n.variants) ? void 0 : l.find(( ({id: e}) => e === t.id));
                            e && (a = _classPrivateFieldGet($, r).call(r, r.data.config.discount, e, n.currency))
                        }
                    }