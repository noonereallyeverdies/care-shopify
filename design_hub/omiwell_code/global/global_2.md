
                enrichCartAsync: function() {
                    const e = o.items()
                      , t = window.Rebuy.SmartCart
                      , n = {};
                    null != t && t.shouldRender() && null != t && t.shouldUseProductMetafields() && (n.metafields = !0);
                    const r = e.map((e => new Promise(( (t, r) => {
                        n.id = e.product_id;
                        try {
                            o.getEnrichedProduct(n, (function(n) {
                                n ? (o.enrichCartItems(n),
                                t(n)) : r(new Error(`Failed to enrich product ${e.product_id}`))
                            }
                            ))
                        } catch (e) {
                            r(e)
                        }
                    }
                    ))));
                    return Promise.allSettled(r).then((t => (t.forEach(( (t, n) => {
                        "rejected" === t.status && console.warn(`Failed to enrich cart item ${e[n].product_id}:`, t.reason)
                    }
                    )),
                    t)))
                },
                enrichCartItems: function(e, t) {
                    t = t || ( () => {}
                    ),
                    o.status = "enriching";
                    const n = o.items();
                    let r = o.getEnrichedProducts();
                    e && (0,
                    a.isArray)(e) ? r = e : e && (0,
                    a.isObject)(e) && (r = [e]);
                    for (let e, t, a = 0; a < r.length; a++) {
                        var i, s, l, c;
                        if (e = r[a],
                        null == (i = e.metafields) || null == (s = i.subscriptions) || !s.original_handle) {
                            t = [e.id],
                            null != (l = e.metafields) && null != (c = l.subscriptions) && c.discount_product_id && t.push(e.metafields.subscriptions.discount_product_id);
                            for (let r, i = 0; i < n.length; i++)
                                r = n[i],
                                -1 !== t.indexOf(r.product_id) && (r.product = e,
                                r.product = o.initProduct(e, {
                                    item: r,
                                    clone: !0
                                }))
                        }
                    }
                    o.status = "ready",
                    t(o.cart)
                },
                getEnrichedProducts: function() {
                    const e = Date.now() - 36e5
                      , t = []
                      , n = i.DT.get(r.Hh.ENRICHED_PRODUCTS);
                    if (n)
                        for (let r = 0; r < n.length; r++)
                            n[r].timestamp >= e && t.push(n[r]);
                    return t
                },
                addEnrichedProduct: function(e) {
                    e = Object.assign({}, e),
                    (e = o.initProduct(e)).timestamp = Date.now();
                    let t = !1;
                    const n = o.getEnrichedProducts();
                    for (let r = 0; r < n.length; r++)
                        n[r].id === e.selected_variant.product_id && (t = !0,
                        n[r].selected_variant_id !== e.selected_variant_id && (e.variants = (0,
                        a.getUniquesByProperty)([...e.variants, ...n[r].variants], "id")),
                        n[r] = e);
                    t || n.push(e),
                    o.saveEnrichedProducts(n)
                },
                saveEnrichedProducts: function(e) {
                    i.y.log("Local Storage enriched with Product data"),
                    i.DT.set(r.Hh.ENRICHED_PRODUCTS, e)
                },
                getEnrichedProduct: function(e, t) {
                    const n = window.Rebuy
                      , r = n.SmartCart;
                    if (t = t || ( () => {}
                    ),
                    !(0,
                    a.isObject)(e) && (e.id || e.handle))
                        return console.warn("You cannot fetch enriched products with this query object:", e),
                        void t();
                    const s = {}
                      , l = {
                        key: n.shop.api_key
                    }
                      , c = {};
                    e.id ? (s.id = e.id,
                    l.ids = e.id) : e.handle && (s.handle = e.handle,
                    l.handles = e.handle),
                    i.y.groupCollapsed("Enriched Product Data"),
                    i.y.log("Query", e),
                    i.y.log("Local Query", s),
                    i.y.log("Network Query", l),
                    i.y.groupEnd(),
                    i.D9.shopifySellingPlansEnabled() ? l.shopify_selling_plans = "yes" : i.D9.sellingPlanEnabled() && (l.selling_plans = "yes"),
                    (null != e && e.metafields || null != r && r.shouldUseProductMetafields()) && (l.metafields = "yes"),
                    !1 === e.convert_subscription && (c.convert_subscription = e.convert_subscription);
                    let u = null;
                    const d = o.getEnrichedProducts();
                    if (d) {
                        const e = (0,
                        a.filterArray)(d, s);
                        e.length > 0 && (u = e[0])
                    }
                    var p, f, m, g;
                    u && (!1 !== c.convert_subscription && null != (p = u.metafields) && null != (f = p.subscriptions) && f.original_handle ? o.getEnrichedProduct({
                        handle: u.metafields.subscriptions.original_handle,
                        convert_subscription: !1
                    }, (function(e) {
                        t(e)
                    }
                    )) : (t(u),
                    !1 !== c.convert_subscription && null != (m = u.metafields) && null != (g = m.subscriptions) && g.discount_product_id && o.getEnrichedProduct({
                        id: u.metafields.subscriptions.discount_product_id,
                        convert_subscription: !1
                    })));
                    let v = !0;
                    if (u) {
                        const e = Date.now() - 6e4;
                        u.timestamp > e && (v = !1)
                    }
                    v && i.nC.callAPI("GET", "/products/static", l).then((function(e) {
                        var n;
                        if (null != e && null != (n = e.data) && n.length) {
                            var r, s;
                            i.D9.shopifySellingPlansEnabled() && (0,
                            a.sortShopifySellingPlans)(e.data[0]);
                            const n = o.initProduct(e.data[0]);
                            var l, u;
                            if (o.addEnrichedProduct(n),
                            !1 !== c.convert_subscription && null != (r = n.metafields) && null != (s = r.subscriptions) && s.original_handle)
                                o.getEnrichedProduct({
                                    handle: n.metafields.subscriptions.original_handle,
                                    convert_subscription: !1
                                }, (function(e) {
                                    t(e)
                                }
                                ));
                            else
                                t(n),
                                !1 !== c.convert_subscription && null != (l = n.metafields) && null != (u = l.subscriptions) && u.discount_product_id && o.getEnrichedProduct({
                                    id: n.metafields.subscriptions.discount_product_id,
                                    convert_subscription: !1
                                })
                        }
                    }
                    ), i.nC.callError)
                },
                getCurrency: function() {
                    let e = "";
                    return o.cart && o.cart.currency && (e = o.cart.currency),
                    e
                },
                subtotal: function() {
                    let e = 0;
                    return o.cart && (e = o.cart.total_price),
                    e
                },
                items: function() {
                    let e = [];
                    return o.cart && (e = o.cart.items || o.cart.line_items || []),
                    e
                },
                hasItems: function() {
                    return !!o.items().length
                },
                itemCount: function() {
                    let e = 0;
                    const t = o.items();
                    for (let n = 0; n < t.length; n++)
                        e += t[n].quantity;
                    return e
                },
                lineCount: function() {
                    return o.items().length
                },
                addEnrichedProductToItem: function(e, t) {
                    let n = null;
                    if (e.product_id === t.id) {
                        t = (0,
                        a.extend)(!0, {}, t);
                        for (let r = 0; r < t.variants.length; r++)
                            if (e.variant_id === t.variants[r].id) {
                                n = t.variants[r];
                                break
                            }
                        n && (t.selected_variant_id = n.id,
                        t.selected_variant = n),
                        e.product = t
                    }
                },
                addItem: function(e, t) {
                    var n, r, s, l;
                    (0,
                    a.isFunction)(t) ? t = {
                        success: t
                    } : (0,
                    a.isBoolean)(t) && (t = {
                        raw: t
                    });
                    const c = {
                        params: {
                            method: "POST",
                            url: i.D9.routeRoot() + "cart/add.js",
                            body: (0,
                            a.isObject)(e) ? (0,
                            a.urlSerializeDeep)(e) : e,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        }
                    };
                    if (null != (n = t) && n.success && (c.params.success = t.success),
                    null != (r = t) && r.error && (c.params.error = t.error),
                    null != (s = t) && s.children && (c.children = t.children),
                    !0 === (null == (l = t) ? void 0 : l.raw))
                        return c;
                    o.queue.push(c),
                    o.manageQueue()
                },
                changeItem: function(e, t) {
                    var n, r, s, l;
                    (0,
                    a.isFunction)(t) ? t = {
                        success: t
                    } : (0,
                    a.isBoolean)(t) && (t = {
                        raw: t
                    });
                    const c = {
                        params: {
                            method: "POST",
                            url: i.D9.routeRoot() + "cart/change.js",
                            body: (0,
                            a.isObject)(e) ? (0,
                            a.urlSerializeDeep)(e) : e,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        }
                    };
                    if ((0,
                    a.isObject)(e) && e.id && 0 === e.quantity && (c.params = {
                        ...c.params,
                        url: i.D9.routeRoot() + "cart/update.js",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            updates: {
                                [e.id]: 0
                            }
                        })
                    }),
                    null != (n = t) && n.success && (c.params.success = t.success),
                    null != (r = t) && r.error && (c.params.error = t.error),
                    null != (s = t) && s.children && (c.children = t.children),
                    !0 === (null == (l = t) ? void 0 : l.raw))
                        return c;
                    o.queue.push(c),
                    o.manageQueue()
                },
                updateItem: function(e, t) {
                    var n, r, s, l;
                    i.y.groupCollapsed("Cart.updateItem()"),
                    i.y.log({
                        data: e,
                        options: t
                    }),
                    i.y.groupEnd(),
                    (0,
                    a.isFunction)(t) ? t = {
                        success: t
                    } : (0,
                    a.isBoolean)(t) && (t = {
                        raw: t
                    });
                    const c = {
                        params: {
                            method: "POST",
                            url: i.D9.routeRoot() + "cart/update.js",
                            body: (0,
                            a.isObject)(e) ? (0,
                            a.urlSerializeDeep)(e) : e,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        }
                    };
                    if (null != (n = t) && n.success && (c.params.success = t.success),
                    null != (r = t) && r.error && (c.params.error = t.error),
                    null != (s = t) && s.children && (c.children = t.children),
                    !0 === (null == (l = t) ? void 0 : l.raw))
                        return c;
                    i.YW.isAdminPreview() || o.queue.push(c),
                    o.manageQueue()
                },
                increaseItem: function(e, t=a.noop, n=a.noop) {
                    var r;
                    const s = o.getItemLineNumber(e)
                      , l = (null == (r = e.quantity_rule) ? void 0 : r.increment) || 1;
                    s ? o.changeItem({
                        line: s,
                        quantity: e.quantity + l
                    }, {
                        success: t,
                        error: n
                    }) : i.y.error("Cannot find item", e)
                },
                decreaseItem: function(e, t) {
                    var n;
                    const r = o.getItemLineNumber(e)
                      , a = (null == (n = e.quantity_rule) ? void 0 : n.increment) || 1;
                    r ? o.changeItem({
                        line: r,
                        quantity: Math.max(0, e.quantity - a)
                    }, t) : i.y.error("Cannot find item", e)
                },
                setItemQuantity: function(e, t, n) {
                    const r = o.getItemLineNumber(e);
                    r ? o.changeItem({
                        line: r,
                        quantity: t
                    }, n) : i.y.error("Cannot find item", e)
                },
                removeItem: function(e, t) {
                    e && e.key ? o.changeItem({
                        id: e.key,
                        quantity: 0
                    }, t) : i.y.error("Cannot find item", e)
                },
                getItems: function(e, t) {
                    return (0,
                    a.filterArray)(o.items(), e, t)
                },
                getItemAttributes: function(e, t) {
                    return (0,
                    a.arrayAttributes)(o.items(), e, t)
                },
                getItemAtIndex: function(e) {
                    return o.items()[e]
                },
                getItemLineNumber: function(e) {
                    const t = o.items().indexOf(e);
                    return -1 !== t ? t + 1 : null
                },
                getCartProductIDs: function() {
                    return (0,
                    a.arrayAttributes)(o.items(), "product_id")
                },
                getCartVariantIDs: function() {
                    return (0,
                    a.arrayAttributes)(o.items(), "variant_id")
                },
                getRebuyItems: function(e) {
                    const t = []
                      , n = o.cart.items || o.cart.line_items;
                    for (const r of n)
                        r.properties._source && "Rebuy" === r.properties._source && (e ? r.properties._widget_id && r.properties._widget_id === e && t.push(r) : t.push(r));
                    return t
                },
                getRebuyItemCount: function(e) {
                    let t = 0;
                    const n = o.cart.items || o.cart.line_items;
                    for (const r of n)
                        r.properties._source && "Rebuy" === r.properties._source && (e ? r.properties._widget_id && r.properties._widget_id === e && (t += r.quantity) : t += r.quantity);
                    return t
                },
                switchToOneTime: function(e, t) {
                    t = t || ( () => {}
                    ),
                    o.switchItemToFrequency(e, "onetime", t)
                },
                switchToSubscription: function(e, t, n) {
                    var r;
                    (n = n || ( () => {}
                    ),
                    2 === arguments.length && "function" == typeof arguments[1]) && (n = arguments[1],
                    null != e && null != (r = e.product) && r.subscription_frequencies && (t = e.product.subscription_frequencies[0]));
                    o.switchItemToFrequency(e, t, n)
                },
                switchItemToFrequency: function(e, t, n, r) {
                    const a = window.Rebuy;
                    if (n = n || ( () => {}
                    ),
                    r = r || ( () => {}
                    ),
                    e && t) {
                        const s = o.switchItemToFrequencyData(e, t);
                        if (s)
                            if (i.D9.sellingPlanEnabled()) {
                                const t = s.selling_plan ? s.selling_plan : null
                                  , i = {
                                    id: e.key,
                                    quantity: s.quantity,
                                    properties: s.properties,
                                    selling_plan: t
                                };
                                o.changeItem({
                                    ...i
                                }, {
                                    success: e => {
                                        n()
                                    }
                                    ,
                                    error: () => {
                                        r()
                                    }
                                })
                            } else if (a.shop && a.shop.myshopify_domain.includes("vitacup"))
                                if (i.y.log("run v2"),
                                e.product.subscription && "onetime" !== t)
                                    o.changeItem({
                                        id: e.key,
                                        quantity: s.quantity,
                                        properties: s.properties
                                    }, {
                                        success: () => {
                                            n()
                                        }
                                        ,
                                        error: () => {
                                            r()
                                        }
                                    });
                                else {
                                    let i = !0;
                                    const a = e.key
                                      , l = s.id
                                      , c = {};
                                    c[a] = 0,
                                    c[l] = s.quantity,
                                    o.cart.items.forEach((e => {
                                        e.variant_id === s.id && (i = !1,
                                        c[e.key] = s.quantity + e.quantity,
                                        delete c[l])
                                    }
                                    )),
                                    o.updateItem({
                                        updates: c
                                    }, {
                                        success: () => {
                                            let e = 0;
                                            i && function updateInterval() {
                                                let i, a = o.getCart();
                                                const c = setInterval(( () => {
                                                    if (a = o.getCart(),
                                                    e += 1,
                                                    a.items[0].variant_id === l && o.isEnriched(a.items[0]) && "onetime" !== t) {
                                                        i = o.switchItemToFrequencyData(a.items[0], t);
                                                        let e = {
                                                            ...i.properties
                                                        };
                                                        s.properties && (e = {
                                                            ...s.properties,
                                                            ...i.properties
                                                        }),
                                                        o.changeItem({
                                                            id: a.items[0].key,
                                                            quantity: a.items[0].quantity,
                                                            properties: e
                                                        }, {
                                                            success: () => {
                                                                setTimeout(( () => {
                                                                    var e;
                                                                    "onetime" === (null == (e = o.getCart().items[0].product) ? void 0 : e.subscription_frequency) && updateInterval(),
                                                                    n()
                                                                }
                                                                ), 500)
                                                            }
                                                            ,
                                                            error: () => {
                                                                r()
                                                            }
                                                        }),
                                                        clearInterval(c)
                                                    } else
                                                        "onetime" === t && (setTimeout(( () => {
                                                            const e = o.getItems();
                                                            o.changeItem({
                                                                id: e[0].key,
                                                                quantity: s.quantity,
                                                                properties: s.properties
                                                            }, {
                                                                success: () => {
                                                                    n()
                                                                }
                                                                ,
                                                                error: () => {
                                                                    r()
                                                                }
                                                            })
                                                        }
                                                        ), 500),
                                                        clearInterval(c));
                                                    e > 20 && clearInterval(c)
                                                }
                                                ), 200)
                                            }()
                                        }
                                        ,
                                        error: () => {
                                            r()
                                        }
                                    })
                                }
                            else
                                o.addItem(s, {
                                    success: function() {
                                        n()
                                    },
                                    error: function() {
                                        r()
                                    },
                                    children: [o.changeItem({
                                        id: e.key,
                                        quantity: 0
                                    }, !0)]
                                })
                    }
                },
                switchCartToFrequency: function(e, t, n) {
                    t = t || ( () => {}
                    ),
                    n = n || ( () => {}
                    );
                    const r = o.getItems()
                      , i = [];
                    let a;
                    for (const t of r)
                        if (a = e ? o.switchItemToFrequencyData(t, e.frequency, e.interval) : o.switchItemToFrequencyData(t, "onetime"),
                        a)
                            i.push(a);
                        else {
                            const e = o.itemAddToCartData(t);
                            i.push(e)
                        }
                    i.length && o.clearCart({
                        children: [o.addItem({
                            items: i
                        }, {
                            success: function() {
                                t()
                            },
                            error: function() {
                                n()
                            },
                            raw: !0
                        })]
                    })
                },
                itemDeliveryFrequency: function(e) {
                    let t = "onetime";
                    return null != e && e.product && e.selling_plan_allocation ? t = (0,
                    a.getSellingPlanAttribute)(e.product, "order_interval_frequency", e.selling_plan_allocation.selling_plan.id, "id") : null != e && e.selling_plan_allocation ? t = parseInt(e.selling_plan_allocation.selling_plan.options[0].value) : null != e && e.properties && e.properties.shipping_interval_frequency && (t = e.properties.shipping_interval_frequency),
                    t
                },
                itemDeliveryInterval: function(e) {
                    let t = "once";
                    return null != e && e.product && e.selling_plan_allocation ? t = (0,
                    a.getSellingPlanAttribute)(e.product, "order_interval_unit_type", e.selling_plan_allocation.selling_plan.id, "id") : null != e && e.selling_plan_allocation ? t = e.selling_plan_allocation.selling_plan.options[0].value.toLowerCase().match(/[a-z]{2,}/g)[0] : null != e && e.properties && e.properties.shipping_interval_frequency && (t = e.properties.shipping_interval_unit_type.toLowerCase()),
                    t
                },
                itemAddToCartData: function(e) {
                    let t = null;
                    if (e) {
                        var n, r;
                        const i = Object.assign({}, e.properties);
                        t = {
                            id: e.variant_id,
                            quantity: e.quantity,
                            properties: i
                        },
                        null != (n = e.selling_plan_allocation) && null != (r = n.selling_plan) && r.id && (t.selling_plan = e.selling_plan_allocation.selling_plan.id)
                    }
                    return t
                },
                switchItemToOneTimeData: function(e) {
                    let t = null;
                    const n = o.itemDeliveryFrequency(e);
                    if (o.isEnriched(e) && "onetime" !== n && !e.product.is_subscription_only) {
                        var a;
                        const n = Object.assign({}, e.properties);
                        "/apps/rebuy/reorder" === window.location.pathname ? Object.assign(n, {
                            _source: "Rebuy",
                            _attribution: r.s9.REORDER_LANDING_PAGE
                        }) : (null == (a = e.properties) ? void 0 : a._attribution) !== r.s9.BUY_MORE_SAVE_MORE && Object.assign(n, {
                            _source: "Rebuy",
                            _attribution: r.s9.SWITCH_TO_ONE_TIME
                        }),
                        i.D9.sellingPlanEnabled() || (delete n.subscription_id,
                        delete n.shipping_interval_frequency,
                        delete n.shipping_interval_unit_type),
                        t = {
                            id: e.product.selected_variant_id,
                            quantity: e.quantity,
                            properties: n
                        }
                    } else
                        i.y.warn("Item is not enriched. Please enrich before attempting to switch to a one-time item.", e);
                    return t
                },
                switchItemToSubscriptionData: function(e, t, n) {
                    let s = null;
                    const l = o.itemDeliveryFrequency(e);
                    if (void 0 === t && e && e.product && e.product.subscription_frequencies && (t = e.product.subscription_frequencies[0]),
                    o.isEnriched(e) && e.product.has_subscription && l !== t) {
                        const n = o.isSubscription(e)
                          , l = Object.assign({}, e.properties);
                        if (i.D9.shopifySellingPlansEnabled()) {
                            var c;
                            let n = null;
                            var u;
                            if (e.product.selected_variant.selling_plans)
                                n = null == (u = e.product.selected_variant.selling_plans.find((e => e.name === t))) ? void 0 : u.id,
                                n || (n = e.product.selected_variant.selling_plans[0].id);
                            n && (null == (c = e.properties) ? void 0 : c._attribution) !== r.s9.BUY_MORE_SAVE_MORE && Object.assign(l, {
                                _source: "Rebuy",
                                _attribution: r.s9.SWITCH_TO_SUBSCRIPTION
                            }),
                            s = {
                                id: e.product.selected_variant_id,
                                quantity: e.quantity,
                                selling_plan: n,
                                properties: l
                            }
                        } else if (i.D9.sellingPlanEnabled()) {
                            var d;
                            const i = n ? e.selling_plan_allocation.selling_plan.id : null
                              , o = (0,
                            a.getSellingPlanAttribute)(e.product, "id", t, "order_interval_frequency")
                              , c = e.product.selling_plan_groups[0].selling_plans[0].id;
                            let u = null;
                            u = o || (i || c),
                            u !== i && (null == (d = e.properties) ? void 0 : d._attribution) !== r.s9.BUY_MORE_SAVE_MORE && Object.assign(l, {
                                _source: "Rebuy",
                                _attribution: r.s9.SWITCH_TO_SUBSCRIPTION
                            }),
                            s = {
                                id: e.product.selected_variant_id,
                                quantity: e.quantity,
                                selling_plan: u,
                                properties: l
                            }
                        } else {
                            var p;
                            (null == (p = e.properties) ? void 0 : p._attribution) !== r.s9.BUY_MORE_SAVE_MORE && Object.assign(l, {
                                _source: "Rebuy",
                                _attribution: r.s9.SWITCH_TO_SUBSCRIPTION
                            }),
                            Object.assign(l, {
                                shipping_interval_frequency: t,
                                shipping_interval_unit_type: e.product.subscription_interval,
                                subscription_id: e.product.subscription_id
                            }),
                            s = {
                                id: e.product.selected_variant.subscription_variant_id,
                                quantity: e.quantity,
                                properties: l
                            }
                        }
                    } else
                        i.y.warn("Item is not enriched. Please enrich before attempting to switch to a subscription item.", e);
                    return s
                },
                switchItemToFrequencyData: function(e, t, n) {
                    let r = null;
                    const i = o.itemDeliveryFrequency(e)
                      , a = o.itemDeliveryInterval(e);
                    return !o.isEnriched(e) || i === t && a === n || (r = "onetime" === t ? o.switchItemToOneTimeData(e) : o.switchItemToSubscriptionData(e, t, n)),
                    r
                },
                isEnriched: function(e) {
                    let t = !1;
                    return e.product && e.product.selected_variant && (Number(e.product.selected_variant.id) === e.id || Number(e.product.selected_variant.onetime_variant_id) === e.id || Number(e.product.selected_variant.subscription_variant_id) === e.id) && (t = !0),
                    t
                },
                isOnSale: function(e) {
                    let t = !1
                      , n = 0
                      , r = 0;
                    return o.isEnriched(e) ? (n = new i.v0(e.product.selected_variant.price).toCents(),
                    r = new i.v0(e.product.selected_variant.compare_at_price).toCents()) : (n = new i.v0(e.price).toCents(),
                    r = new i.v0(e.compare_at_price).toCents()),
                    o.currencySyncedWithShop() || (n = new i.v0(e.price).toCents(),
                    r = new i.v0(e.compare_at_price).toCents()),
                    "NaN" !== n && "NaN" !== r && r && (0,
                    a.amountToCents)(r) > (0,
                    a.amountToCents)(n) && (t = !0),
                    t
                },
                isSubscription: function(e) {
                    let t = !1;
                    return (e.selling_plan_allocation || e.properties && (e.properties.subscription_id || e.properties.shipping_interval_frequency || e.properties.shipping_interval_unit_type)) && (t = !0),
                    t
                },
                hasDiscountedPrice: function(e) {
                    let t = !1;
                    return (o.hasLineItemDiscount(e) || o.hasSubscriptionDiscount(e) || o.isOnSale(e)) && (t = !0),
                    t
                },
                hasSubscriptionDiscount: function(e) {
                    let t = !1;
                    if (o.isSubscription(e)) {
                        const n = o.itemPrice(e);
                        let r = 0
                          , s = 0;
                        o.isEnriched(e) ? (r = new i.v0(e.product.selected_variant.price).toCents(),
                        s = new i.v0(e.product.selected_variant.compare_at_price).toCents()) : (r = new i.v0(e.price).toCents(),
                        s = new i.v0(e.compare_at_price).toCents()),
                        o.currencySyncedWithShop() || (r = new i.v0(e.price).toCents(),
                        s = new i.v0(e.compare_at_price).toCents());
                        const l = "NaN" !== n && "NaN" !== s && s && (0,
                        a.amountToCents)(n) < (0,
                        a.amountToCents)(s)
                          , c = "NaN" !== n && "NaN" !== r && r && (0,
                        a.amountToCents)(n) < (0,
                        a.amountToCents)(r);
                        (l || c) && (t = !0)
                    }
                    return t
                },
                hasLineItemDiscount: function(e) {
                    var t, n, r;
                    const i = null != (t = null == (n = window.Rebuy) ? void 0 : n.SmartCart) ? t : null;
                    var a;
                    return null != i && i.hasStorefrontDiscounts ? Boolean(null == e || null == (a = e.line_level_discount_allocations) ? void 0 : a.some((e => e.amount > 0))) : Boolean(null == e || null == (r = e.discounts) ? void 0 : r.some((e => e.amount > 0)))
                },
                itemPrice: function(e) {
                    var t;
                    let n = new i.v0(e.price).toCents();
                    if (null != (t = e.selling_plan_allocation) && t.price && (n = new i.v0(e.selling_plan_allocation.price).toCents()),
                    o.hasLineItemDiscount(e)) {
                        var r, a;
                        const t = null != (r = null == (a = window.Rebuy) ? void 0 : a.SmartCart) ? r : null;
                        n = null != t && t.hasStorefrontDiscounts ? e.final_price : e.discounted_price
                    }
                    return n
                },
                compareAtPrice: function(e) {
                    let t = null;
                    o.isSubscription(e) && (t = o.compareAtSubscriptionPrice(e));
                    const n = o.isEnriched(e)
                      , r = o.isOnSale(e);
                    return o.hasLineItemDiscount(e) && (t = e.price),
                    n && r ? t = e.product.selected_variant.compare_at_price : r && (t = e.compare_at_price),
                    !o.currencySyncedWithShop() && e.compare_at_price && (t = new i.v0(e.compare_at_price).toCents()),
                    t
                },
                compareAtSubscriptionPrice: function(e) {
                    var t;
                    let n = null;
                    if (!o.isSubscription(e))
                        return o.compareAtPrice(e);
                    const r = o.hasSubscriptionDiscount(e)
                      , a = o.isEnriched(e)
                      , s = o.isOnSale(e)
                      , l = o.currencySyncedWithShop();
                    var c;
                    (o.hasLineItemDiscount(e) && (n = e.price),
                    a && r ? n = s ? e.product.selected_variant.compare_at_price : e.product.selected_variant.price : r && (n = e.compare_at_price),
                    l || r) || (n = null != (c = e.compare_at_price) ? c : e.price);
                    return null != (t = e.selling_plan_allocation) && t.compare_at_price && (n = new i.v0(e.selling_plan_allocation.compare_at_price).toCents()),
                    n
                },
                lineItemDiscountMessage: e => {
                    var t, n;
                    return e.discounts.length > 0 ? null == (t = [...e.discounts].sort(( (e, t) => t.amount - e.amount))) || null == (n = t[0]) ? void 0 : n.title : null
                }
                ,
                processQueue: async function(e=a.noop) {
                    const {Rebuy: {Modal: t}} = window;
                    for (; o.queue.length; ) {
                        var n;
                        const e = o.queue.shift();
                        if (null != (n = e.children) && n.length)
                            for (const t of e.children)
                                o.queue.unshift(t);
                        const {url: l, ...c} = e.params
                          , {success: u=a.noop, error: d=a.noop, ...p} = c;
                        try {
                            const e = await fetch(l, p)
                              , t = await e.json();
                            if (!e.ok) {
                                const n = t.stack || t.message || `Received a non 200 range response: ${e.status}`;
                                throw new Error(n,{
                                    cause: {
                                        req: e,
                                        res: t
                                    }
                                })
                            }
                            u(t)
                        } catch (n) {
                            var i, s;
                            if (d(n),
                            null != (i = e.children) && i.length && (o.queue = o.queue.slice(e.children.length)),
                            null != n && null != (s = n.cause) && s.res && !r.YC.includes(n.cause.res.message)) {
                                const e = n.cause.res;
                                e.message === e.description && (e.description = null),
                                t.dialog("dialog", {
                                    title: e.message,
                                    message: e.description,
                                    buttons: [{
                                        type: "primary",
                                        label: "Okay",
                                        action: "dismiss"
                                    }]
                                })
                            }
                        }
                    }
                    o.process = null,
                    e()
                },
                manageQueue: async function(e=a.noop) {
                    if (!o.process) {
                        o.process = !0;
                        try {
                            await o.processQueue(e)
                        } catch (e) {
                            console.error("Queue processing error:", e)
                        } finally {
                            o.process = null
                        }
                    }
                },
                getCartToken: function() {
                    const e = o.getCart();
                    let t = "";
                    return null != e && e.token && (t = e.token),
                    t
                },
                getDiscount: function() {
                    return o.discount
                },
                removeDiscount: function(e) {
                    o.discount = null,
                    i.DT.remove(r.Hh.DISCOUNT_CODE),
                    i.DT.remove(r.Hh.DISCOUNT_LIKELY_USED),
                    e && i.DT.remove(e)
                },
                setDiscount: function(e) {
                    var t;
                    null != (t = Rebuy.SmartCart) && t.hasStorefrontDiscounts ? i.y.log("🔍 Cart.setDiscount called while using Storefront API - returning") : (o.discount = e,
                    !i.YW.isAdminPreview() && i.DT.set(r.Hh.DISCOUNT_CODE, e, {
                        samesite: "Lax"
                    }))
                },
                updateDiscount: function() {
                    const e = (0,
                    a.urlGetParameter)("discount");
                    if (e)
                        o.setDiscount(e);
                    else {
                        const e = i.DT.get(r.Hh.DISCOUNT_CODE);
                        e && o.setDiscount(e)
                    }
                },
                storeCheckedOutDiscount: function() {
                    const e = i.DT.get(r.Hh.DISCOUNT_CODE);
                    e && (i.DT.set(r.Hh.DISCOUNT_LIKELY_USED, e, {
                        samesite: "Lax"
                    }),
                    i.DT.set(r.Hh.DISCOUNT_LIKELY_USED_WITH_CART_TOKEN, o.getCartToken(), {
                        samesite: "Lax"
                    }))
                },
                checkStorageForUsedDiscount: function() {
                    i.y.log("🔍 Cart.checkStorageForUsedDiscount");
                    const e = i.DT.get(r.Hh.DISCOUNT_LIKELY_USED_WITH_CART_TOKEN)
                      , t = i.DT.get(r.Hh.DISCOUNT_LIKELY_USED)
                      , n = i.DT.get(r.Hh.DISCOUNT_CODE)
                      , a = e && o.getCartToken() !== e
                      , s = t && n && t === n;
                    !o.hasItems() && a && s && (i.y.log("❌ Cart.checkStorageForUsedDiscount clearing stored discount"),
                    o.clearAllStoredDiscounts(),
                    i.DT.remove(r.Hh.DISCOUNT_LIKELY_USED_WITH_CART_TOKEN))
                },
                clearAllStoredDiscounts: function() {
                    const e = i.DT.get(r.Hh.DISCOUNT_CODE);
                    if (e) {
                        var t;
                        const i = `${r.Hh.DISCOUNT_CODE}-${e}`;
                        var n;
                        if (o.removeDiscount(i),
                        null == (t = Rebuy.SmartCart) || !t.hasStorefrontDiscounts)
                            null == (n = Rebuy.SmartCart) || n.removeDiscount()
                    }
                },
                applyShopifyDiscount: function(e, t) {
                    t = t || ( () => {}
                    );
                    const n = {
                        method: "GET",
                        url: `/discount/${e}`,
                        success: e => {
                            i.y.log("✅ Cart.applyShopifyDiscount complete"),
                            i.y.log(e),
                            t(e)
                        }
                        ,
                        error: e => {
                            i.y.error("❌ Cart.applyShopifyDiscount error", e)
                        }
                    };
                    fetch(n.url, {
                        method: n.method
                    }).then((e => e.text())).then(n.success).catch(n.error)
                },
                validateDiscount: function(e, t) {
                    t = t || ( () => {}
                    );
                    const n = {
                        isEligible: !0
                    };
                    if (e) {
                        const t = o.cart.items
                          , i = o.cart.total_price
                          , s = o.cart.item_count
                          , l = {};
                        if ("number" == typeof e.usage_limit && 0 === e.usage_limit)
                            return !1;
                        if (e.starts_at || e.ends_at) {
                            if (e.starts_at && new Date(e.starts_at) > new Date)
                                return !1;
                            if (e.ends_at && new Date(e.ends_at) < new Date)
                                return !1
                        }
                        if ("prerequisite" === e.customer_selection)
                            return !1;
                        if (e.prerequisite_subtotal_range || e.prerequisite_quantity_range) {
                            var r;
                            if (null != (r = e.prerequisite_subtotal_range) && r.greater_than_or_equal_to) {
                                const t = new a.Money(100 * e.prerequisite_subtotal_range.greater_than_or_equal_to).units;
                                i < t && (l.prerequisite_subtotal_range = `Subtotal needs to be above or equal ${a.Money.format(t)} to be eligible.`)
                            }
                            if (e.prerequisite_quantity_range) {
                                const t = e.prerequisite_quantity_range.greater_than_or_equal_to;
                                s < t && (l.prerequisite_quantity_range = `Quantity needs to be above or equal ${t} to be eligible.`)
                            }
                            Object.keys(l).length > 0 && (n.prerequisites = l)
                        }
                        if ("entitled" === e.target_selection) {
                            const r = []
                              , i = {};
                            if (t.length <= 0)
                                return !1;
                            if (e.entitled_product_ids && e.entitled_product_ids.length > 0) {
                                for (const n of e.entitled_product_ids) {
                                    let e;
                                    e = t.find((e => e.product_id === n)),
                                    e && r.push(e.product_id)
                                }
                                i.products = e.entitled_product_ids
                            }
                            if (e.entitled_variant_ids && e.entitled_variant_ids.length > 0) {
                                for (const n of e.entitled_variant_ids) {
                                    let e;
                                    e = t.find((e => e.variant_id === n)),
                                    e && r.push(e.product_id)
                                }
                                i.variants = e.entitled_variant_ids
                            }
                            if (e.entitled_collection_ids && e.entitled_collection_ids.length > 0) {
                                for (const n of e.entitled_collection_ids) {
                                    let e;
                                    e = t.find((e => {
                                        if (e.product && e.product.collection_ids && e.product.collection_ids.length)
                                            return e.product.collection_ids.includes(n)
                                    }
                                    )),
                                    e && r.push(e.product_id)
                                }
                                i.collection_products = e.entitled_collection_ids
                            }
                            n.matched = r,
                            n.entitled = i
                        }
                        return n.prerequisites && Object.keys(n.prerequisites).length > 0 && (n.isEligible = !1),
                        "entitled" !== e.target_selection || n.matched.length || (n.isEligible = !1),
                        n.targetSelection = e.target_selection,
                        n.targetType = e.target_type,
                        n.type = e.value_type,
                        n.value = e.value,
                        n.targetSelection = e.target_selection,
                        n
                    }
                    return !1
                },
                removeShopifyDiscount: function(e) {
                    e = e || ( () => {}
                    );
                    const t = {
                        method: "GET",
                        url: "/checkout?discount=%20",
                        success: t => {
                            i.y.log("✅ Cart.removeShopifyDiscount complete"),
                            i.y.log(t),
                            e(t)
                        }
                        ,
                        error: e => {
                            i.y.error("❌ Cart.removeShopifyDiscount error", e)
                        }
                    };
                    fetch(t.url, {
                        method: t.method
                    }).then((e => e.text())).then(t.success).catch(t.error)
                },
                itemIsOneTime: function(e) {
                    let t = !0;
                    return "onetime" !== o.itemDeliveryFrequency(e) && (t = !1),
                    t
                },
                itemIsSubscription: function(e) {
                    let t = !1;
                    return "onetime" !== o.itemDeliveryFrequency(e) && (t = !0),
                    t
                },
                allItemsAreOneTime: function() {
                    let e = !0;
                    const t = o.getItems();
                    for (let n = 0; n < t.length; n++)
                        if ("onetime" !== o.itemDeliveryFrequency(t[n])) {
                            e = !1;
                            break
                        }
                    return e
                },
                allItemsAreSubscription: function() {
                    let e = !0;
                    const t = o.getItems();
                    for (const n of t)
                        if ("onetime" === o.itemDeliveryFrequency(n)) {
                            e = !1;
                            break
                        }
                    return e
                },
                allSubscribableItemsAreSubscription: function() {
                    let e = !0;
                    const t = o.getItems();
                    for (const r of t) {
                        var n;
                        if (o.isEnriched(r) && null != (n = r.product) && n.has_subscription && !r.product.subscription) {
                            e = !1;
                            break
                        }
                    }
                    return e
                },
                cartHasSellingPlanSubscriptionItems: function() {
                    let e = !1;
                    const t = o.items();
                    for (const n of t)
                        if (null != n && n.selling_plan_allocation) {
                            e = !0;
                            break
                        }
                    return e
                },
                cartHasMetafieldSubscriptionItems: function() {
                    let e = !1;
                    const t = o.items();
                    for (const a of t) {
                        var n, r, i;
                        if (null != a && null != (n = a.properties) && n.shipping_interval_frequency) {
                            e = !0;
                            break
                        }
                        if (null != a && null != (r = a.product) && r.subscription && null != (i = a.product.metafields) && i.subscriptions) {
                            e = !0;
                            break
                        }
                    }
                    return e
                },
                cartHasSubscriptionItems: function() {
                    let e = !1;
                    return (o.cartHasSellingPlanSubscriptionItems() || o.cartHasMetafieldSubscriptionItems()) && (e = !0),
                    e
                },
                hasSubscribableItems: function() {
                    let e = !1;
                    const t = o.items();
                    for (const r of t) {
                        var n;
                        if (o.isEnriched(r) && null != (n = r.product) && n.has_subscription) {
                            e = !0;
                            break
                        }
                    }
                    return e
                },
                availableSubscriptionOptions: function() {
                    const e = {
                        isSubscription: !1,
                        options: [],
                        selectedOption: null
                    }
                      , t = []
                      , n = o.getItems();
                    for (const s of n) {
                        var r;
                        if (o.isEnriched(s) && null != (r = s.product) && r.has_subscription) {
                            var i;
                            const n = o.itemIsSubscription(s)
                              , r = null != (i = o.itemDeliveryFrequency(s)) ? i : s.product.subscription_frequency
                              , l = o.itemDeliveryInterval(s)
                              , c = l ? `${r}:${l}` : `${r}:`;
                            for (const n of s.product.subscription_frequencies) {
                                var a;
                                const r = null != (a = s.product.subscription_interval) ? a : ""
                                  , i = `${n}:${r}`;
                                let o = 0;
                                switch (r.toLowerCase()) {
                                default:
                                    break;
                                case "day":
                                case "days":
                                    o = 1 * n;
                                    break;
                                case "week":
                                case "weeks":
                                    o = 7 * n;
                                    break;
                                case "month":
                                case "months":
                                    o = 30 * n;
                                    break;
                                case "year":
                                case "years":
                                    o = 365 * n
                                }
                                if (t.indexOf(i) < 0) {
                                    const a = {
                                        key: i,
                                        frequency: n,
                                        interval: r,
                                        intervalDuration: o,
                                        itemCount: 0
                                    };
                                    s.product.subscription_discount ? (a.discount_type = "percentage",
                                    a.discount_amount = s.product.subscription_discount) : s.product.subscription_discount_amount && s.product.subscription_discount_type && (a.discount_type = s.product.subscription_discount_type,
                                    a.discount_amount = s.product.subscription_discount_amount),
                                    e.options.push(a),
                                    t.push(i)
                                }
                            }
                            if (n) {
                                const n = t.indexOf(c);
                                e.options[n].itemCount += s.quantity
                            }
                        }
                    }
                    if (e.options.sort((function(e, t) {
                        return e.intervalDuration - t.intervalDuration
                    }
                    )),
                    e.isSubscription = o.allSubscribableItemsAreSubscription(),
                    e.isSubscription) {
                        let t = 0;
                        for (let n = 0; n < e.options.length; n++) {
                            const r = e.options[n];
                            r.itemCount > t && (e.selectedOption = r,
                            t = r.itemCount)
                        }
                    }
                    return e.options.length > 0 ? e : null
                },
                checkout: async function() {
                    var e, t;
                    null != (e = Rebuy.SmartCart) && e.hasStorefrontDiscounts || this.storeCheckedOutDiscount(),
                    null != (t = Rebuy.SmartCart) && t.progressBar || await o.purgeSmartCartData({
                        progressBar: !0
                    }),
                    o.cartHasMetafieldSubscriptionItems() ? o.goToReChargeCheckout() : o.goToShopifyCheckout()
                },
                getReChargeCheckoutDomain: function() {
                    const e = window.Rebuy;
                    let t = "checkout.rechargeapps.com";
                    return e.shop.recharge_custom_domain && (t = e.shop.recharge_custom_domain),
                    o.recharge_host && (t = o.recharge_host),
                    "https://" + t + "/r/checkout"
                },
                goToReChargeCheckout: function() {
                    const e = window.Rebuy;
                    let t = o.getReChargeCheckoutDomain();
                    o.updateItem({
                        attributes: {
                            [r.$x.AB_CART_TOKEN]: o.cart.token
                        }
                    }),
                    t = (0,
                    a.urlAddParameter)(t, "myshopify_domain", e.shop.myshopify_domain),
                    t = (0,
                    a.urlAddParameter)(t, "cart_token", o.getCartToken());
                    try {
                        const {ga: e} = window;
                        t += "&" + e.getAll()[0].get("linkerParam")
                    } catch (e) {}
                    o.discount && (t = (0,
                    a.urlAddParameter)(t, "discount", o.getDiscount()));
                    const n = i.JD.getIdentity();
                    n && n.email && (t = (0,
                    a.urlAddParameter)(t, "email", n.email)),
                    o.email && (t = (0,
                    a.urlAddParameter)(t, "email", o.email)),
                    window.location = t
                },
                goToShopifyCheckout: function(e) {
                    const t = window.Rebuy;
                    let n = "/checkout";
                    if (i.YW.isShopify() || (n = "https://" + t.shop.domain + "/checkout"),
                    o.discount)
                        n = (0,
                        a.urlAddParameter)(n, "discount", o.getDiscount());
                    else {
                        const e = i.DT.get(r.Hh.DISCOUNT_CODE);
                        e && (n = (0,
                        a.urlAddParameter)(n, "discount", e))
                    }
                    const s = i.JD.getIdentity();
                    if (s && s.email && (n = (0,
                    a.urlAddParameter)(n, "email", s.email)),
                    o.email && (n = (0,
                    a.urlAddParameter)(n, "email", o.email)),
                    i.D9.routeRoot().length > 1) {
                        const e = i.D9.routeRoot().replace(/\//g, "");
                        n = (0,
                        a.urlAddParameter)(n, "locale", e)
                    }
                    window.location = e && "shop_pay" === e ? (0,
                    a.urlAddParameter)(n, "payment", "shop_pay") : n
                },
                goToShopPayCheckout: function() {
                    o.goToShopifyCheckout("shop_pay")
                },
                getCartPageUrl: () => {
                    let e = `${i.D9.baseURL()}/cart`;
                    if (i.D9.routeRoot().length > 1) {
                        const t = i.D9.routeRoot().replace(/\//g, "");
                        e = (0,
                        a.urlAddParameter)(e, "locale", t)
                    }
                    return e
                }
                ,
                goToCartPage: () => {
                    window.location = o.getCartPageUrl()
                }
                ,
                managePermalinks: function() {
                    const e = (0,
                    a.getQueryStringObject)();
                    i.y.log("Cart.managePermalinks:query", e);
                    const t = {};
                    if (e.variants) {
                        let n;
                        t.items = [];
                        for (const i in e.variants)
                            Object.prototype.hasOwnProperty.call(e.variants, i) && (n = e.variants[i],
                            n.id = i,
                            void 0 === n.properties && (n.properties = {}),
                            n.properties._source = "Rebuy",
                            n.properties._attribution = r.s9.SMART_LINKS,
                            t.items.push(n))
                    } else if (e.id)
                        t.id = e.id;
                    else if (!e.message)
                        return;
                    if (e.quantity && (t.quantity = e.quantity),
                    e.properties && (t.properties = e.properties),
                    e.recharge_host && (o.recharge_host = e.recharge_host),
                    e.domain && (o.recharge_host = e.domain),
                    e.email && (o.email = e.email),
                    e.discount && o.setDiscount(e.discount),
                    "yes" === e.clear_cart && o.clearCart(),
                    e.message && void 0 !== e.message) {
                        const n = e.message;
                        t.message = n,
                        i.Hk.set(r.Wc.SMART_LINK_MESSAGE, n)
                    }
                    if (e.cid) {
                        let t = null;
                        if ("true" === e.cid)
                            try {
                                const {ga: e} = window;
                                t = e.getAll()[0].get("clientId")
                            } catch (e) {}
                        else
                            t = e.cid;
                        null !== t && o.updateItem({
                            attributes: {
                                "google-clientID": t
                            }
                        })
                    }
                    let redirect = function() {};
                    if ("checkout" === e.redirect || "checkout" === e.landing_page ? redirect = function() {
                        o.checkout()
                    }
                    : "recharge_checkout" === e.redirect || "recharge_checkout" === e.landing_page ? redirect = function() {
                        o.goToReChargeCheckout()
                    }
                    : "shopify_checkout" === e.redirect || "shopify_checkout" === e.landing_page ? redirect = function() {
                        o.goToShopifyCheckout()
                    }
                    : "cart" === e.redirect || "cart" === e.landing_page ? redirect = function() {
                        o.goToCartPage()
                    }
                    : "shop_pay_checkout" === e.redirect || "shop_pay_checkout" === e.landing_page ? redirect = function() {
                        o.goToShopPayCheckout()
                    }
                    : e.redirect ? redirect = "yes" === e.smart_cart_show ? function() {
                        window.location = e.redirect + "?viewcart=true"
                    }
                    : function() {
                        window.location = e.redirect
                    }
                    : e.landing_page ? redirect = "yes" === e.smart_cart_show ? function() {
                        window.location = e.landing_page + "?viewcart=true"
                    }
                    : function() {
                        window.location = e.landing_page
                    }
                    : o.goToCartPage(),
                    t.items)
                        for (let e = 0; e < t.items.length; e++)
                            "undefined" === t.items[e].properties && (t.items[e].properties = {}),
                            t.items[e].properties._source = "Rebuy",
                            t.items[e].properties._attribution = r.s9.SMART_LINKS;
                    else
                        t.id && (void 0 === t.properties && (t.properties = {}),
                        t.properties._source = "Rebuy",
                        t.properties._attribution = r.s9.SMART_LINKS);
                    t.items || t.id ? o.addItem(t, (function(e) {
                        setTimeout((function() {
                            o.fetchCart((function() {
                                redirect()
                            }
                            ))
                        }
                        ), 500)
                    }
                    )) : redirect()
                },