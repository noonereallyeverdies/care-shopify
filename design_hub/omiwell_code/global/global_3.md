
                manageURLParameters: function() {
                    const e = (0,
                    a.getQueryStringObject)();
                    i.y.log("Cart.manageURLParameters:query", e),
                    o.fetchProduct(e.product, (function(t) {
                        let n;
                        e.variant && o.selectVariant(t, e.variant),
                        e.quantity && (t.quantity = e.quantity),
                        e.subscription && (t.subscription = !0),
                        e.subscription_frequency && (t.subscription_frequency = e.subscription_frequency),
                        e.subscription_interval && (t.subscription_interval = e.subscription_interval),
                        e.selling_plan && (t.subscription = !0,
                        t.subscription_id = e.selling_plan),
                        e.discount && o.setDiscount(e.discount),
                        n = t.subscription ? i.D9.sellingPlanEnabled() ? {
                            id: t.selected_variant.id,
                            selling_plan: t.subscription_id,
                            quantity: t.quantity,
                            properties: {
                                _source: "Rebuy",
                                _attribution: r.s9.SMART_LINKS
                            }
                        } : {
                            id: t.selected_variant.subscription_variant_id,
                            quantity: t.quantity,
                            properties: {
                                subscription_id: t.subscription_id,
                                shipping_interval_frequency: t.subscription_frequency,
                                shipping_interval_unit_type: t.subscription_interval,
                                _source: "Rebuy",
                                _attribution: r.s9.SMART_LINKS
                            }
                        } : {
                            id: t.selected_variant.id,
                            quantity: t.quantity,
                            properties: {
                                _source: "Rebuy",
                                _attribution: r.s9.SMART_LINKS
                            }
                        };
                        let redirect = function() {};
                        "checkout" === e.redirect || "true" === e.checkout ? redirect = function() {
                            o.checkout()
                        }
                        : "recharge_checkout" === e.redirect ? redirect = function() {
                            o.goToReChargeCheckout()
                        }
                        : "shopify_checkout" === e.redirect && (redirect = function() {
                            o.goToShopifyCheckout()
                        }
                        ),
                        i.y.log("Cart.manageURLParameters:data", n),
                        o.clearCart(),
                        o.addItem(n, (function() {
                            redirect()
                        }
                        ))
                    }
                    ))
                },
                fetchProduct: function(e, t) {
                    const n = window.Rebuy;
                    if ((0,
                    a.isDefined)(e)) {
                        t = t || ( () => {}
                        );
                        const r = {
                            key: n.shop.api_key,
                            limit: 1,
                            query: e,
                            metafields: "yes"
                        };
                        i.nC.callAPI("GET", "/products/search", r).then((function(e) {
                            if (1 === e.data.length) {
                                const n = o.initProduct(e.data[0]);
                                t(n)
                            }
                        }
                        ), i.nC.callError)
                    }
                },
                initProduct: function(e, t) {
                    var n, r, o;
                    if ((0,
                    a.isObject)(t))
                        !0 === t.clone && (e = (0,
                        a.extend)(!0, {}, e)),
                        t.item && (t.variant_id = t.item.variant_id,
                        e.has_components = t.item.has_components);
                    else if ((0,
                    a.isNumeric)(t)) {
                        t = {
                            variant_id: Number(t)
                        }
                    }
                    let s = e.variants[0];
                    if (null != (n = t) && n.variant_id)
                        for (let n = 0; n < e.variants.length; n++) {
                            if (e.variants[n].id === t.variant_id) {
                                s = e.variants[n];
                                break
                            }
                            if (e.variants[n].subscription_variant_id && Number(e.variants[n].subscription_variant_id) === t.variant_id) {
                                var l, c, u, d;
                                e.subscription = !0,
                                s = e.variants[n],
                                null != (l = t.item) && null != (c = l.properties) && c.shipping_interval_frequency && (e.subscription_frequency = t.item.properties.shipping_interval_frequency),
                                null != (u = t.item) && null != (d = u.properties) && d.shipping_interval_unit_type && (e.subscription_interval = t.item.properties.shipping_interval_unit_type);
                                break
                            }
                        }
                    else
                        for (let t = 0; t < e.variants.length; t++)
                            if (!(e.variants[t].inventory_management && "deny" === e.variants[t].inventory_policy.toLowerCase() && e.variants[t].inventory_quantity <= 0)) {
                                s = e.variants[t];
                                break
                            }
                    if (i.D9.sellingPlanEnabled() && null != (r = t) && null != (o = r.item) && o.product && t.item.selling_plan_allocation) {
                        const n = i.D9.shopifySellingPlansEnabled() ? "name" : "order_interval_frequency";
                        e.subscription = !0,
                        e.subscription_id = t.item.selling_plan_allocation.selling_plan.id,
                        e.subscription_discount_type = (0,
                        a.getSellingPlanAttribute)(t.item.product, "discount_type", e.subscription_id, "id"),
                        e.subscription_discount_amount = (0,
                        a.getSellingPlanAttribute)(t.item.product, "discount_amount", e.subscription_id, "id"),
                        e.subscription_frequency = (0,
                        a.getSellingPlanAttribute)(t.item.product, n, e.subscription_id, "id")
                    } else
                        i.D9.sellingPlanEnabled() && (e.subscription = !1);
                    e.selected_variant = s,
                    e.selected_variant_id = s.id,
                    e.selected_product_id = s.product_id;
                    return (0,
                    a.initializeProduct)(e, !0),
                    e
                },
                selectVariant: function(e, t) {
                    for (let r = 0; r < (null == (n = e.variants) ? void 0 : n.length); r++) {
                        var n;
                        const i = e.variants[r];
                        if (i.id === t || i.sku === t || i.title.includes(t)) {
                            e.selected_variant = i,
                            e.selected_variant_id = i.id;
                            break
                        }
                    }
                },
                applyQueuedCalls: function() {
                    const e = o.call;
                    if (!e || !e._ready) {
                        const Test = function(e) {
                            try {
                                "function" == typeof e ? (i.y.groupCollapsed("➕ Function added to Cart call queue"),
                                i.y.log(e),
                                i.y.groupEnd(),
                                e()) : (i.y.groupCollapsed("🚫 Non-function added to Cart call queue"),
                                i.y.log(e),
                                i.y.groupEnd())
                            } catch (e) {
                                i.y.error("Error triggering the next item ", e)
                            }
                        };
                        for (i.y.log("Processing Cart call queue"); e.length; )
                            Test(e.shift());
                        e.push = Test,
                        e._ready = !0
                    }
                },
                formatMoney: function(e, t) {
                    return a.Money.format(e, t)
                },
                purgeSmartCartData: async function(e) {
                    var t, n, a, s;
                    if (!e)
                        return void i.y.log("Cart.purgeSmartCartData - no options provided");
                    i.y.log("Cart.purgeSmartCartData", e),
                    i.Hk.remove(r.Wc.GIFTS_DECLINED);
                    const {progressBar: l, buyMoreSaveMore: c} = e
                      , u = o.items().filter((e => {
                        var t;
                        return (null == (t = e.properties) ? void 0 : t._attribution) === r.s9.TIERED_PROGRESS_BAR
                    }
                    ))
                      , d = null == (t = o.cart) || null == (n = t.attributes) ? void 0 : n._barId
                      , p = null == (a = o.cart) || null == (s = a.attributes) ? void 0 : s._rebuyCartId;
                    if (0 === u.length && !d && (!c || c && !p))
                        return void i.y.log("No data to purge from the Cart.");
                    const f = {
                        attributes: {
                            _barId: null
                        }
                    };
                    if (c && p && (f.attributes._rebuyCartId = null),
                    u.length) {
                        f.updates = {};
                        u.map((e => e.key)).forEach((e => f.updates[e] = 0))
                    }
                    const m = await new Promise((e => {
                        o.updateItem(f, (t => {
                            i.y.log("Purged all progress bar data from the Cart."),
                            e(t)
                        }
                        ))
                    }
                    ));
                    return i.y.log("Cart.purgeSmartCartData response", m),
                    m
                },
                purgeStaleGiftItems: function() {
                    i.Hk.remove(r.Wc.GIFTS_DECLINED);
                    const e = o.items().filter((e => {
                        var t;
                        return (null == (t = e.properties) ? void 0 : t._attribution) === r.s9.TIERED_PROGRESS_BAR
                    }
                    ));
                    if (!e.length)
                        return;
                    const t = e.map((e => e.key))
                      , n = {
                        updates: {}
                    };
                    t.forEach((e => n.updates[e] = 0)),
                    o.updateItem(n, ( () => {
                        i.y.log("Purged stale gift items from the Cart.")
                    }
                    ))
                },
                purgeBarAttribute: () => o.updateItem({
                    attributes: {
                        _barId: null
                    }
                }),
                purgeCartIdAttribute: () => o.updateItem({
                    attributes: {
                        _rebuyCartId: null
                    }
                })
            }
        }
        ,
        2333: (e, t, n) => {
            "use strict";
            n.d(t, {
                H: () => a
            });
            n(5119),
            n(7754),
            n(9028),
            n(3838);
            var r = n(5863)
              , i = n(9228);
            const a = {
                enabled: function() {
                    const e = {
                        key: r.Wc.TEST,
                        value: 1
                    };
                    a.set(e.key, e.value);
                    const t = a.get(e.key) === e.value;
                    return t && a.remove(e.key),
                    t
                },
                get: function(e, t) {
                    const n = document.cookie.match(`(^|;) ?${decodeURIComponent(e)}=([^;]*)(;|$)`);
                    let r = n ? n[2] : null;
                    return r ? (r = decodeURIComponent(r),
                    (0,
                    i.isDefined)(t) && (0,
                    i.isObject)(t) && t.encode && (r = decodeURIComponent(escape(atob(r)))),
                    (0,
                    i.isDefined)(t) && (0,
                    i.isObject)(t) && t.encrypt && (r = (0,
                    i.decrypt)(r)),
                    (0,
                    i.isJSONString)(r) && (r = JSON.parse(r)),
                    r) : null
                },
                set: function(e, t, n) {
                    const r = {
                        path: "/"
                    }
                      , a = {
                        encode: !1,
                        encrypt: !1
                    }
                      , o = ["path", "domain", "max-age", "expires", "secure", "samesite"];
                    if ((0,
                    i.isDefined)(n) && (0,
                    i.isNumber)(n))
                        a.expires = n;
                    else if ((0,
                    i.isDefined)(n) && (0,
                    i.isObject)(n))
                        for (const e in n)
                            o.includes(e) ? r[e] = n[e] : a[e] = n[e];
                    for (const e in a)
                        if ("days" === e) {
                            const t = new Date;
                            t.setTime(t.getTime() + 864e5 * a[e]),
                            r.expires = t.toGMTString()
                        } else if ("hours" === e) {
                            const t = new Date;
                            t.setTime(t.getTime() + 36e5 * a[e]),
                            r.expires = t.toGMTString()
                        } else if ("minutes" === e) {
                            const t = new Date;
                            t.setTime(t.getTime() + 6e4 * a[e]),
                            r.expires = t.toGMTString()
                        } else if ("seconds" === e) {
                            const t = new Date;
                            t.setTime(t.getTime() + 1e3 * a[e]),
                            r.expires = t.toGMTString()
                        }
                    t = "string" == typeof t ? t : JSON.stringify(t),
                    a.encrypt && (t = (0,
                    i.encrypt)(t)),
                    a.encode && (t = btoa(unescape(encodeURIComponent(t))));
                    let s = `${encodeURIComponent(e)}=${encodeURIComponent(t)}`;
                    for (const e in r)
                        s += ";" + e + "=" + r[e];
                    document.cookie = s
                },
                find: function(e) {
                    const t = [];
                    if (document.cookie && "" !== document.cookie) {
                        const n = document.cookie.split(";");
                        for (let r = 0; r < n.length; r++) {
                            const i = n[r].split("=");
                            i[0] = i[0].replace(/^ /, "");
                            const a = decodeURIComponent(i[0])
                              , o = decodeURIComponent(i[1]);
                            a.includes(e) && t.push({
                                name: a,
                                value: o
                            })
                        }
                    }
                    return t
                },
                remove: function(e) {
                    a.set(e, "", {
                        days: -1
                    })
                }
            }
        }
        ,
        5275: (e, t, n) => {
            "use strict";
            n.d(t, {
                Y: () => a
            });
            n(2901),
            n(9028),
            n(3406);
            var r = n(5863)
              , i = n(9228);
            const a = {
                context: () => {
                    let e = null;
                    return a.isAdminPreview() ? e = "admin_preview" : a.isRebuyProxy() ? e = "rebuy_proxy" : a.isReChargeCheckout() ? e = "recharge" : a.isRechargeCustomerPortal() ? e = "recharge_customer_portal" : a.isTapcartApp() ? e = "tapcart" : a.isShopify() || a.isShopifyCheckout() ? e = "shopify" : a.isMalomoTracking() && (e = "malomo"),
                    e
                }
                ,
                isAdminPreview: () => !!window.admin_preview,
                getAdminPreviewType: () => {
                    var e;
                    return null != (e = window.admin_preview_type) ? e : null
                }
                ,
                isSmartCartPreview: () => a.getAdminPreviewType() === r.XA.SMART_CART,
                isSmartFlowPreview: () => a.getAdminPreviewType() === r.XA.SMART_FLOW,
                isReactivateLandingPagePreview: () => a.getAdminPreviewType() === r.XA.REACTIVATE_LANDING_PAGE,
                isReorderLandingPagePreview: () => a.getAdminPreviewType() === r.XA.REORDER_LANDING_PAGE,
                isShopify: () => !!window.Shopify,
                isShopifyCheckout: () => {
                    var e;
                    return !(null == (e = window.Shopify) || !e.Checkout)
                }
                ,
                getShopifyCheckoutStep: () => {
                    let e = null;
                    return a.isShopifyCheckout() && window.Shopify.Checkout.step && (e = window.Shopify.Checkout.step),
                    e
                }
                ,
                isShopifyThankYou: () => {
                    let e = !1;
                    return a.isShopifyCheckout() && window.Shopify.Checkout.step && window.Shopify.checkout && (e = !0),
                    e
                }
                ,
                isShopifyCartPage: () => {
                    var e;
                    return null == (e = (0,
                    i.urlGetLocation)().pathname) ? void 0 : e.includes("/cart")
                }
                ,
                isShopifyOrderConfirmation: () => {
                    let e = !1;
                    return a.isShopifyCheckout() && window.Shopify.Checkout.isOrderStatusPage && (e = !0),
                    e
                }
                ,
                isShopifyProductPage: () => {
                    let e = !1;
                    const t = (0,
                    i.urlGetLocation)();
                    var n;
                    document && (document.body.classList.contains("template-product") && (e = !0),
                    document.querySelector('script[type="application/json"][data-product-json]') && (e = !0),
                    null != (n = t.pathname) && n.includes("/products") && (e = !0));
                    return e
                }
                ,
                isShopifyAdmin: () => {
                    var e, t, n, r;
                    let i = !1;
                    return null != (e = window.ShopifyAnalytics) && null != (t = e.lib) && null != (n = t.trekkie) && null != (r = n.defaultAttributes) && r.isMerchantRequest && (i = !0),
                    i
                }
                ,
                isReChargeCheckout: () => {
                    const e = (0,
                    i.urlGetLocation)()
                      , t = ["/r/checkout", "/r/pay", "/r/purchase/thanks"];
                    let n = !1;
                    for (let r = 0; r < t.length; r++)
                        e.pathname.includes(t[r]) && (n = !0);
                    return n
                }
                ,
                isRechargeCustomerPortal: () => {
                    const e = (0,
                    i.urlGetLocation)().pathname;
                    let t = !1;
                    const n = [/\/tools\/recurring\/portal\/[a-z0-9]+\/.*$/gi];
                    for (const r of n)
                        e.match(r) && (t = !0);
                    return t
                }
                ,
                isTapcartApp: () => {
                    var e, t;
                    return !(null == (e = window) || null == (t = e.Tapcart) || !t.isInitialized)
                }
                ,
                getReChargeCheckoutStep: () => {
                    const e = (0,
                    i.urlGetLocation)();
                    let t = null;
                    return e.pathname.includes("/r/checkout") ? t = "contact_information" : e.pathname.includes("/r/pay") ? t = "payment_method" : e.pathname.includes("/r/purchase/thanks") && (t = "thank_you"),
                    t
                }
                ,
                getRechargeCustomerPortalStep: () => {
                    let e = null;
                    return (0,
                    i.urlGetLocation)().pathname.match(/\/tools\/recurring\/portal\/[a-z0-9]+\/subscriptions\/[0-9]+$/gi) && (e = "edit_subscription"),
                    e
                }
                ,
                isReChargeThankYou: () => {
                    const e = (0,
                    i.urlGetLocation)()
                      , t = ["/r/purchase/thanks"];
                    let n = !1;
                    for (let r = 0; r < t.length; r++)
                        e.pathname.includes(t[r]) && (n = !0);
                    return n
                }
                ,
                getReChargeOrder: () => {
                    let e = null;
                    return (0,
                    i.isDefined)(window.cart_json) && (e = window.cart_json),
                    e
                }
                ,
                isRebuyProxy: () => {
                    let e = !1;
                    return "/apps/rebuy/" === window.location.pathname && (e = !0),
                    e
                }
                ,
                isRebuyCartProxy: () => {
                    let e = !1;
                    return "/apps/rebuy/cart" !== window.location.pathname && "/apps/rebuy/cart/" !== window.location.pathname || window.location.search.includes("build_link=yes") || (e = !0),
                    e
                }
                ,
                isMalomoTracking: () => {
                    let e = !1;
                    return ((0,
                    i.urlGetLocation)().host.includes(".mymalomo.com") || void 0 !== window.Malomo) && (e = !0),
                    e
                }
                ,
                getThemeID: () => {
                    var e, t, n;
                    return (null == (e = window.trekkie) || null == (t = e.trekkie) || null == (n = t.defaultAttributes) ? void 0 : n.themeId) || null
                }
                ,
                getHandles: (e="") => {
                    const {pathname: t} = (0,
                    i.urlGetLocation)()
                      , n = {
                        collection: t.match(/\/collections\/([^/]*).*$/),
                        product: t.match(/\/products\/([^/]*).*$/),
                        page: t.match(/\/pages\/([^/]*).*$/),
                        blog: t.match(/\/blogs\/([^/]*).*$/),
                        article: t.match(/\/blogs\/.*\/([^/]*).*$/)
                    };
                    let r = n;
                    return e && ["collection", "product", "page", "blog", "article"].includes(e) && (r = n[e] ? n[e][1] : null),
                    r
                }
                ,
                searchParameters: () => {
                    let e = null;
                    if (window.location.search) {
                        const t = window.location.search.substring(1);
                        if (t) {
                            e = {};
                            const n = t.split("&")
                              , r = /(.*)\[(\d*)\]$/;
                            for (let t, a, o, s, l, c = 0; c < n.length; c++)
                                if (t = n[c].split("="),
                                a = "",
                                o = "",
                                t[0] && (a = decodeURIComponent(t[0].replace("+", " "))),
                                t[1] && (o = decodeURIComponent(t[1].replace("+", " "))),
                                s = a.match(r),
                                l = null,
                                s && (a = s[1],
                                "" !== s[2] && (l = Number(s[2]))),
                                o = o.split(","),
                                void 0 === e[a] && (e[a] = null),
                                null == e[a] || (0,
                                i.isArray)(e[a]) || (e[a] = [e[a]]),
                                null == e[a] && o.length > 1 && null == l)
                                    e[a] = o;
                                else if (null == e[a] && 1 === o.length && null == l)
                                    e[a] = o[0];
                                else if (null != e[a] && null == l)
                                    e[a] = e[a].concat(o);
                                else {
                                    null == e[a] && (e[a] = []);
                                    const t = Math.max(e[a].length, l)
                                      , n = Array.apply(null, Array(t)).map(( () => null));
                                    for (let t = 0; t < e[a].length; t++)
                                        n[t] = e[a][t];
                                    for (let e = 0; e < o.length; e++)
                                        null == n[l + e] ? n[l + e] = o[e] : n.splice(l + e, 0, o[e]);
                                    e[a] = n
                                }
                        }
                    }
                    return e
                }
                ,
                getSmartSearchParameters: () => {
                    const e = {};
                    if (window.location.search) {
                        const t = window.location.search.substring(1);
                        if (t) {
                            const n = t.split("&");
                            for (let t = 0; t < n.length; t++) {
                                let[r,i] = n[t].split("=");
                                r && (r = decodeURIComponent(r)),
                                i && (i = decodeURIComponent(i).replace(/\+/g, " ")),
                                i && i.includes(",") ? e[r] = i.split(",").map((e => e.trim())) : e[r] = i
                            }
                        }
                    }
                    return e
                }
                ,
                getUTMObject: () => {
                    let e = !1;
                    const t = {}
                      , n = ["utm_campaign", "utm_medium", "utm_source", "utm_term", "utm_content"];
                    for (let r, a, o = 0; o < n.length; o++)
                        r = n[o],
                        a = (0,
                        i.urlGetParameter)(n[o]),
                        a && (t[r] = a,
                        e = !0);
                    return e ? t : null
                }
                ,
                getCurrentShopifyPageKey: () => {
                    const e = (0,
                    i.urlGetLocation)().pathname;
                    return e.match(/^\/$/) ? "home_page" : e.match(/^\/collections\/[^/]+$/) ? "collection_pages" : a.isShopifyProductPage() ? "product_pages" : a.isShopifyCartPage() ? "cart_page" : a.isShopifyThankYou() ? "thank_you_pages" : e.match(/^\/account\/?$/) ? "account_pages" : e.match(/^\/search$/) ? "search_page" : e.match(/^\/blogs\/[^/]+$/) ? "blog_pages" : e.match(/^\/blogs\/[^/]+\/[^/]+$/) ? "article_pages" : e.match(/^\/pages\/[^/]+$/) ? "pages" : "unknown_page"
                }
                ,
                isMatchedPagePath: (e="") => (0,
                i.urlGetLocation)().pathname.match(e)
            }
        }
        ,
        5803: (e, t, n) => {
            "use strict";
            n.d(t, {
                J: () => l
            });
            n(3838),
            n(2901),
            n(3406),
            n(4949);
            var r = n(5863)
              , i = n(9812)
              , a = n(9228)
              , o = n(5329)
              , s = n(7157);
            const l = {
                new_identity: !1,
                identity_expires: 1095,
                discovery_expires: Date.now() - 864e5,
                utm_expires: 1800,
                identity: null,
                init: function() {
                    var e;
                    const t = this;
                    i.y.heading("Tracker.init()"),
                    i.YW.isAdminPreview() ? i.y.log("Tracker.init() - Admin preview detected, aborting") : (null != (e = window.Shopify) && e.loadFeatures && window.Shopify.loadFeatures([{
                        name: "consent-tracking-api",
                        version: "0.1"
                    }]),
                    t.identity = t.identify(),
                    t.userCanBeTracked() && (window.Rebuy.identity = () => t.getIdentity(),
                    window.Rebuy.getGeolocation = () => t.getGeolocation(),
                    t.new_identity && t.trackUserSession()),
                    t.trackProductViewed(),
                    t.trackCollectionViewed(),
                    t.manageUTMParameters(),
                    t.trackView(),
                    t.trackConversionEvent(),
                    t.watchAddToCart(),
                    t.manageDiscoveryProductURL(),
                    t.manageDiscoveryProduct(),
                    window.Rebuy.modules.Tracker = !0,
                    i.y.log("✅ Tracker initialized"))
                },
                userCanBeTracked: function() {
                    var e;
                    let t = !0;
                    return null != (e = window.Shopify) && e.customerPrivacy && !window.Shopify.customerPrivacy.userCanBeTracked() && (t = !1),
                    t
                },
                identify: function() {
                    return this.getIdentity() ? this.setIdentity(this.getIdentity()) : this.createIdentity(),
                    this.updateIdentity(),
                    this.identity
                },
                getIdentity: function() {
                    const e = i.DT.get(r.Hh.IDENTITY, {
                        encrypt: !0
                    })
                      , t = i.Hk.get(r.Wc.IDENTITY, {
                        encode: !0
                    });
                    let n = null;
                    return e ? n = e : t && (n = t),
                    n
                },
                setIdentity: function(e) {
                    this.identity = e
                },
                createIdentity: function() {
                    this.new_identity = !0,
                    this.setIdentity({
                        uuid: (0,
                        a.UUID)()
                    })
                },
                updateIdentity: function() {
                    const e = this.getSession();
                    this.getCustomerID() && (i.y.log("Customer ID detected for the first time:", this.getCustomerID()),
                    this.identity.cid = this.getCustomerID()),
                    this.getCustomerEmail() && (i.y.log("Customer email detected for the first time:", this.getCustomerEmail()),
                    this.identity.email = this.getCustomerEmail()),
                    this.identity.session = e,
                    this.saveIdentity(),
                    e && !e.geolocation && this.getGeolocation().then((t => {
                        t && (e.geolocation = t,
                        this.saveSession(e))
                    }
                    ))
                },
                saveIdentity: function() {
                    if (!this.userCanBeTracked())
                        return i.Hk.remove(r.Wc.IDENTITY),
                        void i.DT.remove(r.Hh.IDENTITY);
                    i.Hk.set(r.Wc.IDENTITY, {
                        uuid: this.identity.uuid
                    }, {
                        days: this.identity_expires,
                        encode: !0
                    }),
                    i.DT.set(r.Hh.IDENTITY, this.identity, {
                        encrypt: !0
                    })
                },
                getSession: function() {
                    let e = null
                      , t = i.Hk.get(r.Wc.SESSION);
                    t || (t = (0,
                    a.sessionID)()),
                    i.Hk.set(r.Wc.SESSION, t, {
                        minutes: 30
                    });
                    const n = i.DT.get(r.Hh.SESSION, {
                        encrypt: !0
                    });
                    return e = n && n[t] ? n[t] : {
                        id: t,
                        first_active: Date.now()
                    },
                    e.last_active = Date.now(),
                    i.YW.getUTMObject() && (e.tracking = i.YW.getUTMObject()),
                    this.saveSession(e),
                    e
                },
                saveSession: function(e) {
                    if (!this.userCanBeTracked())
                        return i.Hk.remove(r.Wc.SESSION),
                        void i.DT.remove(r.Hh.SESSION);
                    if (!e)
                        return;
                    i.Hk.set(r.Wc.SESSION, e.id, {
                        minutes: 30
                    });
                    const t = {};
                    t[e.id] = e,
                    i.DT.set(r.Hh.SESSION, t, {
                        encrypt: !0
                    })
                },
                getThemeID: function() {
                    var e, t, n, r;
                    let i = null;
                    return null != (e = window.trekkie) && null != (t = e.trekkie) && null != (n = t.defaultAttributes) && n.themeId && (i = window.trekkie.trekkie.defaultAttributes.themeId),
                    null == (r = i) ? void 0 : r.toString()
                },
                getCustomerID: function() {
                    var e, t, n, r, i, a, o, s;
                    let l = null;
                    return null != (e = window.Shopify) && null != (t = e.checkout) && t.customer_id ? l = window.Shopify.checkout.customer_id : null != (n = window.ShopifyAnalytics) && null != (r = n.meta) && null != (i = r.page) && i.customerId ? l = window.ShopifyAnalytics.meta.page.customerId : null != (a = window.meta) && null != (o = a.page) && o.customerId ? l = window.meta.page.customerId : null != (s = window.__st) && s.cid && (l = window.__st.cid),
                    l
                },
                getCustomerEmail: function() {
                    var e, t;
                    let n = null;
                    return null != (e = window.Shopify) && null != (t = e.checkout) && t.email && (n = window.Shopify.checkout.email),
                    n
                },
                trackConversionEvent: function() {
                    if (i.YW.isShopifyThankYou()) {
                        const r = window.Shopify.checkout;
                        for (let i, a = 0; a < r.line_items.length; a++) {
                            var e, t, n;
                            i = r.line_items[a];
                            const o = {
                                subject: "user",
                                verb: "purchased",
                                noun: "product",
                                label: i.title,
                                value: i.price,
                                shopify_product_id: null == (e = i) || null == (t = e.product_id) ? void 0 : t.toString(),
                                shopify_product_title: i.title,
                                shopify_variant_id: i.variant_id,
                                shopify_variant_title: i.variant_title,
                                shopify_variant_price: i.price
                            };
                            "Rebuy" === (null == (n = i.properties) ? void 0 : n._source) && (i.properties._widget_id && (o.widget_id = i.properties._widget_id),
                            i.properties._promo_id && (o.promo_id = i.properties._promo_id)),
                            this.trackEvent(o)
                        }
                    }
                    i.YW.isReChargeThankYou()
                },
                trackUserSession: function() {
                    var e, t;
                    const n = this.identity
                      , r = {
                        subject: "user",
                        verb: "started",
                        noun: "session",
                        defined_noun_id: null != n && null != (e = n.session) && null != (t = e.id) && t.length ? n.session.id[0] : "-",
                        uuid: n.uuid,
                        rsid: n.session.id,
                        meta: {
                            platform: (0,
                            a.getUserPlatform)(),
                            mobile: !!/Mobi|Android/i.test(navigator.userAgent),
                            language: navigator.language,
                            userAgent: navigator.userAgent
                        }
                    };
                    this.trackEvent(r)
                },
                trackCollectionViewed: function() {
                    const e = i.YW.getCurrentShopifyPageKey()
                      , t = i.YW.getHandles("collection");
                    if ("collection_pages" === e) {
                        const e = {
                            subject: "user",
                            verb: "viewed",
                            noun: "collection",
                            defined_noun_id: t
                        };
                        this.trackEvent(e)
                    }
                },
                trackSmartCollectionsViewed: function() {
                    const e = this
                      , t = i.YW.getCurrentShopifyPageKey()
                      , n = this.getIdentity();
                    if ("collection_pages" === t) {
                        var r, a;
                        const t = {
                            subject: "collections",
                            noun: "session",
                            verb: "used-in",
                            defined_noun_id: null != n && null != (r = n.session) && null != (a = r.id) && a.length ? n.session.id[0] : "-"
                        };
                        e.trackEvent(t)
                    }
                },
                trackUserViedCollectionId: function(e) {
                    if (!e)
                        return;
                    const t = {
                        subject: "user",
                        verb: "viewed",
                        noun: "collection",
                        defined_noun_id: e
                    };
                    this.trackEvent(t)
                },
                trackCollectionProductViewed: function(e, t) {
                    if (!e || !t)
                        return;
                    const n = {
                        subject: "user",
                        verb: "viewed",
                        noun: "collection-product",
                        defined_noun_id: e,
                        tags: [`COLL.${t}`],
                        meta: {
                            [`collection:${t}`]: !0
                        }
                    };
                    this.trackEvent(n)
                },
                trackClickedCollectionProductClickedTo: function(e, t) {
                    if (!e || !t)
                        return;
                    const n = {
                        subject: "user",
                        verb: "clicked-to-pdp-from",
                        noun: "collection",
                        defined_noun_id: e
                    }
                      , r = {
                        subject: "user",
                        verb: "clicked-to-pdp-from",
                        noun: "product-in-collection",
                        defined_noun_id: t,
                        tags: [`COLL.${e}`],
                        meta: {
                            [`collection:${e}`]: !0
                        }
                    };
                    this.trackEvent(n),
                    this.trackEvent(r)
                },
                trackSmartCollectionDiscoveryCollectionBias: function(e, t) {
                    if (!e || !t)
                        return;
                    const n = new i.v0(t.original_line_price)
                      , r = {
                        subject: "user",
                        verb: "added-from",
                        noun: "pdp-via-collection",
                        defined_noun_id: e,
                        meta: {
                            conversion: `vid:${t.variant_id}`,
                            [`product_id:${t.product_id}`]: !0,
                            [`variant_id:${t.variant_id}`]: !0,
                            quantity: t.quantity || 1,
                            source: "PDP",
                            subtotal: (0,
                            o.E)((0,
                            s.q)(n.amount, n.currency.decimal_digits))
                        }
                    };
                    this.trackEvent(r)
                },
                trackSmartCollectionDiscoveryProductBias: function(e, t) {
                    if (!e || !t)
                        return;
                    const n = new i.v0(t.original_line_price)
                      , r = {
                        subject: "user",
                        verb: "added-from",
                        noun: "pdp-via-collection-product",
                        defined_noun_id: t.product_id.toString(),
                        tags: [`COLL.${e}`],
                        meta: {
                            conversion: `vid:${t.variant_id}`,
                            [`collection:${e}`]: !0,
                            [`variant_id:${t.variant_id}`]: !0,
                            quantity: t.quantity || 1,
                            source: "PDP",
                            subtotal: (0,
                            o.E)((0,
                            s.q)(n.amount, n.currency.decimal_digits)),
                            [`variant_id_subtotal:${t.variant_id}`]: (0,
                            o.E)((0,
                            s.q)(n.amount, n.currency.decimal_digits)),
                            [`variant_id_quantity:${t.variant_id}`]: t.quantity || 1
                        }
                    };
                    this.trackEvent(r)
                },
                trackProductViewed: function() {
                    const e = i.YW.getHandles("product");
                    if (e) {
                        i.y.log("Viewed product:", e),
                        this.recordRecentlyViewedProduct(e);
                        const t = {
                            subject: "user",
                            verb: "viewed",
                            noun: "product",
                            shopify_product_handle: e
                        };
                        window.__st && "product" === window.__st.rtyp && window.__st.rid && (t.shopify_product_id = window.__st.rid.toString()),
                        this.trackEvent(t)
                    }
                },
                trackView: function() {
                    var e, t, n;
                    const r = (new Date).getTime()
                      , o = i.YW.getHandles();
                    let s = document.referrer;
                    const c = i.YW.searchParameters()
                      , u = null == (e = window) || null == (t = e.Rebuy) || null == (n = t.shop) ? void 0 : n.has_smart_search_enabled;
                    var d, p;
                    null != c && c.q && !u && l.trackEvent({
                        subject: "user",
                        verb: "passive-searched",
                        noun: "term",
                        defined_noun_id: null != (d = null == (p = c.q) ? void 0 : p.toLowerCase()) ? d : ""
                    });
                    if (s) {
                        (0,
                        a.urlGetLocation)(s).hostname === window.location.hostname && (s = "")
                    }
                    this.identity.last_active && this.identity.last_active.url === window.location.href && (r - this.identity.last_active.timestamp) / 1e3 < 60 && i.y.log("= = = We already tracked this view event in the last minute = = ="),
                    o.collection && i.y.log("Viewed collection:", o.collection[1]),
                    o.page && i.y.log("Viewed page:", o.page[1]),
                    o.blog && i.y.log("Viewed blog:", o.blog[1]),
                    o.article && i.y.log("Viewed article:", o.article[1]);
                    const f = {
                        url: window.location.href,
                        timestamp: r,
                        referrer: s
                    };
                    this.identity.first_active || (this.identity.first_active = f),
                    this.identity.last_active = f,
                    s && !this.identity.first_referrer && (this.identity.first_referrer = f),
                    s && (this.identity.last_referrer = f),
                    this.saveIdentity()
                },
                trackABTestings: function() {
                    var e;
                    const t = this
                      , n = (null == (e = window.Rebuy) ? void 0 : e.Experiment) || {};
                    if (null != n && n.foundActiveExperiments) {
                        const e = n.foundActiveExperiments;
                        null != e && e.length && e.forEach((e => {
                            var n, r;
                            const i = (null == e || null == (n = e.evaluatedExperimentDataset) || null == (r = n.selectedInstance) ? void 0 : r.id) || "0"
                              , a = {
                                subject: "abtest",
                                verb: "tracking",
                                noun: "cart",
                                defined_noun_id: `${e.id}.${i}`,
                                tags: [`ABN.TEST.${e.id}`]
                            };
                            t.trackEvent(a)
                        }
                        ))
                    }
                },
                trackSmartFlowLinkClick: (e, t, n=a.noop) => {
                    var o;
                    if (i.Ji.smartFlowPreview)
                        return;
                    const s = {
                        subject: "user",
                        verb: "clicked-in",
                        noun: "smart-flow",
                        defined_noun_id: e.toString(),
                        shopify_cart_token: null == (o = window.Rebuy.Cart) ? void 0 : o.getCartToken(),
                        meta: {
                            [`url:${t.toUpperCase()}`]: !0,
                            qr_click: !!(0,
                            a.urlGetParameter)(r.zd.SMART_FLOW_LINK_QR)
                        }
                    };
                    l.trackEvent(s, n)
                }
                ,
                trackSmartFlowStart: (e, t=a.noop) => {
                    var n;
                    if (i.Ji.smartFlowPreview)
                        return;
                    const r = {
                        subject: "user",
                        verb: "started",
                        noun: "smart-flow",
                        defined_noun_id: e.toString(),
                        shopify_cart_token: null == (n = window.Rebuy.Cart) ? void 0 : n.getCartToken()
                    };
                    l.trackEvent(r, t)
                }
                ,
                trackABTesting: function(e) {
                    const t = this;
                    if (e) {
                        var n, r;
                        const i = (null == e || null == (n = e.evaluatedExperimentDataset) || null == (r = n.selectedInstance) ? void 0 : r.id) || "0"
                          , a = {
                            subject: "abtest",
                            verb: "tracking",
                            noun: "cart",
                            defined_noun_id: `${e.id}.${i}`,
                            tags: [`ABN.TEST.${e.id}`]
                        };
                        t.trackEvent(a)
                    }
                },
                captureSearchSession: function() {
                    if (this.userCanBeTracked()) {
                        var e, t;
                        const n = this.getIdentity()
                          , r = {
                            subject: "search",
                            noun: "session",
                            verb: "used-in",
                            defined_noun_id: null != n && null != (e = n.session) && null != (t = e.id) && t.length ? n.session.id[0] : "-"
                        };
                        l.trackEvent(r)
                    }
                },
                trackUserSearchEvent: function(e, t) {
                    if (0 === (null == t ? void 0 : t.length))
                        return void l.trackSearchNoProducts(e.searchTerm || e.query);
                    const n = {
                        subject: "user",
                        verb: "searched",
                        noun: "term",
                        defined_noun_id: "",
                        meta: {}
                    }
                      , r = (0,
                    a.urlGetLocation)();
                    if (null != r && r.pathname && (n.meta.page_of_search = r.pathname),
                    Object.prototype.hasOwnProperty.call(e, "query") && (n.defined_noun_id = e.query.toLowerCase()),
                    Object.prototype.hasOwnProperty.call(e, "searchTerm") && (n.defined_noun_id = e.searchTerm.toLowerCase()),
                    Object.prototype.hasOwnProperty.call(e, "filters")) {
                        n.meta.filters = "";
                        const t = [];
                        for (const n in e.filters)
                            if ("price" !== n) {
                                if ("options" === n)
                                    for (const r of e.filters[n]) {
                                        const e = r.split("#");
                                        e[0] = e[0].trim(),
                                        t.push(`${n}=${e.join("")}`)
                                    }
                                else if ("available" === n)
                                    t.push(`${n}=${e.filters[n]}`);
                                else if (e.filters[n])
                                    for (const r of e.filters[n])
                                        t.push(`${n}=${r}`)
                            } else {
                                const r = e.filters[n];
                                for (const e in r)
                                    t.push(`${n}.${e}=${r[e]}`)
                            }
                        const r = t.join(", ");
                        n.meta.filters = r
                    }
                    if (t && t.length > 0)
                        for (const e of t) {
                            const t = `result:${e.id || e.productId}`;
                            n.meta[t] = !0
                        }
                    l.trackEvent(n),
                    l.trackSearchResultProducts(t, e),
                    l.trackSearchFilterType(e)
                },
                trackSearchResultProducts: function(e, t) {
                    var n;
                    const r = `term:${null == (n = t.searchTerm || t.query) ? void 0 : n.toLowerCase()}`;
                    let i = 0;
                    if (null != t && t.currentPage && null != t && t.pageSize && (i = (t.currentPage - 1) * (t.pageSize - 1)),
                    e && e.length > 0)
                        for (const [t,n] of e.entries()) {
                            const e = {
                                subject: "user",
                                verb: "viewed",
                                noun: "searched-product",
                                defined_noun_id: n.id || n.productId,
                                meta: {
                                    [r]: !0,
                                    position: i + t
                                }
                            };
                            l.trackEvent(e)
                        }
                },
                trackSearchFilterType: function(e) {
                    if (!e.filters)
                        return;
                    const trackEvent = (e, t, n, r, i) => {
                        const a = {
                            subject: e,
                            verb: t,
                            noun: n,
                            defined_noun_id: r
                        };
                        (null == i ? void 0 : i.length) > 0 && (a.tags = i),
                        l.trackEvent(a)
                    }
                    ;
                    for (const n in e.filters) {
                        var t;
                        const r = e.filters[n];
                        if ((null == (t = Object.keys(r)) ? void 0 : t.length) > 0)
                            if (trackEvent("user", "filtered-with", "search-filter-type", n),
                            (0,
                            a.isArray)(r))
                                for (const e of r)
                                    trackEvent("user", "filtered-with", "search-filter-values", `${n}.${e}`, [`FT.${n}`]);
                            else if ((0,
                            a.isObject)(r))
                                for (const e in r) {
                                    trackEvent("user", "filtered-with", "search-filter-values", `${n}.${r[e]}`, [`FT.${n}`])
                                }
                    }
                },
                trackSearchNoProducts: function(e) {
                    var t;
                    if (!e)
                        return;
                    const n = {
                        subject: "search",
                        verb: "returned",
                        noun: "no-search-results",
                        defined_noun_id: null != (t = null == e ? void 0 : e.toLowerCase()) ? t : ""
                    };
                    l.trackEvent(n)
                },
                watchAddToCart: function(e) {
                    const t = this;
                    e = e || ( () => {}
                    );
                    a.DOM.on("rebuy:cart.add", (n => {
                        var r, o;
                        r = n.detail.item,
                        (0,
                        a.isRebuyItem)(r) || (t.trackEvent({
                            subject: "user",
                            verb: "added",
                            noun: "product",
                            label: r.product_title,
                            value: (0,
                            a.amountToCents)(r.price),
                            shopify_product_id: null == r || null == (o = r.product_id) ? void 0 : o.toString(),
                            shopify_product_title: r.product_title,
                            shopify_product_handle: r.handle,
                            shopify_variant_id: r.variant_id,
                            shopify_variant_title: r.variant_title,
                            shopify_variant_price: (0,
                            a.amountToCents)(r.price),
                            shopify_variant_sku: r.sku
                        }),
                        i.y.log("Tracker.watchAddToCart triggered and item is not from Rebuy"),
                        i.y.log("item", r)),
                        e(n.detail.item)
                    }
                    ))
                },