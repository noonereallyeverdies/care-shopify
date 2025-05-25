
                removeFromShopifyCartAtIndex(e, t) {
                    const n = this;
                    t = t || ( () => {}
                    );
                    const r = n.data.cart.items[e]
                      , a = n.getWidgetProductByID(r.product_id);
                    let o = null;
                    if (a && (o = n.getWidgetProductVariantByID(a, r.variant_id)),
                    a && o && n.data.cart.items.filter((e => e.product_id === a.id)).length <= 1)
                        n.removeFromCart(a, t);
                    else {
                        const e = {
                            id: `${r.key}`,
                            quantity: 0
                        }
                          , success = e => {
                            n.refreshShopifyCheckout(),
                            t(a),
                            v.Widget.callbacks.remove(a, n)
                        }
                          , error = e => {
                            m.log("Oh no error!"),
                            m.log(e),
                            a.status = "ready"
                        }
                        ;
                        v.Widget.callbacks.beforeRemove(a, n);
                        const o = {
                            params: {
                                method: "POST",
                                url: E.routeRoot() + "cart/change.js",
                                body: (0,
                                i.isObject)(e) ? JSON.stringify(e) : e,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                success,
                                error
                            },
                            callback: t
                        };
                        n.addToRequestQueue(o)
                    }
                }
                changeItem(e, t) {
                    const n = this;
                    t = t || ( () => {}
                    ),
                    "shopify" === C.Y.context() ? n.changeItemInShopifyCart(e, t) : "recharge" === C.Y.context() && n.changeItemInReChargeCart(e, t)
                }
                changeItemInShopifyCart(e, t) {
                    const n = this;
                    t = t || function() {}
                    ;
                    v.Widget.callbacks.beforeChange(e, n);
                    const r = {
                        params: {
                            method: "POST",
                            url: E.routeRoot() + "cart/change.js",
                            body: (0,
                            i.isObject)(e) ? JSON.stringify(e) : e,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            success: function(r) {
                                n.refreshShopifyCheckout(),
                                t(),
                                v.Widget.callbacks.change(e, n)
                            },
                            error: function(e) {
                                m.log("Oh no error!"),
                                m.log(e)
                            }
                        },
                        callback: t
                    };
                    (0,
                    i.isObject)(e) && e.id && 0 === e.quantity && (r.params = {
                        ...r.params,
                        url: E.routeRoot() + "cart/update.js",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            updates: {
                                [e.id]: 0
                            }
                        })
                    }),
                    n.addToRequestQueue(r)
                }
                purchaseProductNow(e, t, n) {
                    const r = this;
                    if (t = t || function() {}
                    ,
                    n = n || function() {}
                    ,
                    e.status = "adding",
                    "shopify" === C.Y.context()) {
                        const i = r.addToCartData(e, !0)
                          , o = Shopify && Shopify.checkout && Shopify.checkout.order_id ? Shopify.checkout.order_id : null;
                        r.data.address_id && (i.address_id = r.data.address_id),
                        i.shopify_order_id = o,
                        i.next_charge_scheduled_at = "tomorrow",
                        i.charge_now = "yes",
                        i.widget_id = r.id,
                        e.subscription ? a.callAPI("POST", "/recharge/subscribe", i).then((function(n) {
                            n && n.data && n.data.address_id && (r.data.address_id = n.data.address_id),
                            e.status = "added",
                            t(e),
                            v.Widget.callbacks.add(e, r),
                            setTimeout((function() {
                                e.status = "ready"
                            }
                            ), 1500)
                        }
                        ), (function(t) {
                            e.status = "ready",
                            n(t),
                            a.callError()
                        }
                        )) : a.callAPI("POST", "/recharge/onetime", i).then((function(n) {
                            n && n.data && n.data.address_id && (r.data.address_id = n.data.address_id),
                            e.status = "added",
                            t(e),
                            v.Widget.callbacks.add(e, r),
                            setTimeout((function() {
                                e.status = "ready"
                            }
                            ), 1500)
                        }
                        ), (function(t) {
                            e.status = "ready",
                            n(t),
                            a.callError()
                        }
                        ))
                    }
                }
                purchaseOffer(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    e.status = "adding",
                    n.getReChargeOrder((function(t) {
                        const r = n.addToCartData(e, !0);
                        t ? r.charge_id = t.charge_id : r.shopify_order_id = window.checkout_order_id,
                        r.next_charge_scheduled_at = "tomorrow",
                        r.charge_now = "yes",
                        r.widget_id = n.id,
                        e.subscription ? a.callAPI("POST", "/recharge/subscribe", r).then((async function(t) {
                            n.trackABWidgetAddToCart(e),
                            await n.showThankYou(e)
                        }
                        ), a.callError) : a.callAPI("POST", "/recharge/onetime", r).then((async function(t) {
                            n.trackABWidgetAddToCart(e),
                            await n.showThankYou(e)
                        }
                        ), a.callError)
                    }
                    ))
                }
                refreshReChargeThankYou(e, t) {
                    const n = this
                      , r = window.Rebuy
                      , a = r.libraries.$;
                    t = t || function() {}
                    ,
                    a.get(e, (function(e) {
                        const o = a(e)
                          , s = ".order-summary__section.order-summary__section--product-list .product-list"
                          , l = {
                            subtotal: ".order-summary__section .total-line.total-line--subtotal .total-line__price",
                            shipping: ".order-summary__section .total-line.total-line--shipping .total-line__price",
                            taxes: ".order-summary__section .total-line.total-line--taxes .total-line__price",
                            total: ".order-summary__section .total-line.total-line--total .total-line__price",
                            payment_due: ".order-summary__section .payment-due-container .payment-due__price"
                        }
                          , c = a(".order-summary__section.order-summary__section--product-list .product-list .product", o);
                        a(s).append(c);
                        for (const e in l) {
                            const t = {
                                new: a(l[e], o).html(),
                                current: a(l[e]).html()
                            };
                            t.new = t.new.replace(/[^0-9.]/g, ""),
                            t.current = t.current.replace(/[^0-9.]/g, ""),
                            t.new = (0,
                            i.amountToCents)(t.new),
                            t.current = (0,
                            i.amountToCents)(t.current),
                            t.total = t.current + t.new,
                            a(l[e]).html(i.Money.format(t.total))
                        }
                        t(),
                        r.callbacks.refresh(n.id)
                    }
                    ))
                }
                getWidgetViewCount() {
                    return f.H.get(l.Wc.WIDGET_ID.replace(":widgetId", this.id)) || 0
                }
                setWidgetViewCount(e) {
                    const t = this
                      , n = l.Wc.WIDGET_ID.replace(":widgetId", t.id)
                      , r = 0 === t.data.config.view_options.cookie_days ? {
                        minutes: 30
                    } : {
                        days: t.data.config.view_options.cookie_days
                    };
                    f.H.set(n, e, r)
                }
                increaseWidgetViewCount(e) {
                    const t = l.Wc.WIDGET_ID.replace(":widgetId", this.id)
                      , n = f.H.get(t) || 0;
                    this.setWidgetViewCount(n + 1)
                }
                show() {
                    const e = this;
                    let t = !0;
                    e.data.products.length && (e.data.config.view_options.limit_views && (e.getWidgetViewCount() >= e.data.config.view_options.max_views ? t = !1 : e.increaseWidgetViewCount()),
                    "none" === e.initialLayout() && !0 === t && (t = !1,
                    e.data.popup_has_triggered = !0),
                    t && (v.Widget.callbacks.beforeShow(e),
                    e.data.visible = !0,
                    "popup" === e.data.config.display_type && (i.DOM.addClass("body", "rebuy-modal-visible"),
                    e.data.popup_has_triggered = !0,
                    O()(document).on("keydown.rebuy-modal", (function(t) {
                        27 === t.keyCode && e.hide()
                    }
                    ))),
                    e.hasTimer() && e.timer(),
                    v.Widget.callbacks.show(e)))
                }
                hide() {
                    const e = this;
                    "popup" === e.data.config.display_type ? (v.Widget.callbacks.beforeHide(e),
                    e.data.visible = !1,
                    e.data.popup_has_been_dismissed = !0,
                    i.DOM.removeClass("body", "rebuy-modal-visible"),
                    O()(document).off("keydown.rebuy-modal"),
                    "submit" === e.data.config.popup_trigger && e.data.products.length > 0 ? (e.unwatchFormSubmit(e.data.config.popup_trigger_selector),
                    e.unwatchFormInputChanges(e.data.config.popup_trigger_selector),
                    "product" !== e.data.config.type ? O()(e.data.config.popup_trigger_selector).submit() : "cart" === e.data.config.close_redirect ? window.location = E.cartURL() : "checkout" === e.data.config.close_redirect ? e.checkout() : m.log("Close modal will not redirect - your widget is configured for asynchronous close.")) : "cart" === e.data.config.close_redirect ? window.location = E.cartURL() : "checkout" === e.data.config.close_redirect ? e.checkout() : m.log("Close modal will not redirect - your widget is configured for asynchronous close."),
                    v.Widget.callbacks.hide(e)) : e.data.visible = !1
                }
                initialLayout() {
                    const e = this
                      , t = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    let n = null;
                    return n = t <= 480 ? e.data.settings.layout.small : t <= 767 ? e.data.settings.layout.medium : e.data.settings.layout.large,
                    n.style
                }
                declineOffer(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    v.Widget.callbacks.beforeDecline(e, n),
                    "popup" === n.data.config.display_type && "submit" === n.data.config.popup_trigger && n.data.products.length > 0 ? (n.unwatchFormSubmit(n.data.config.popup_trigger_selector),
                    n.unwatchFormInputChanges(n.data.config.popup_trigger_selector),
                    O()(n.data.config.popup_trigger_selector).submit()) : "cart" === n.data.config.decline_redirect ? window.location = E.cartURL() : "checkout" === n.data.config.decline_redirect ? n.checkout() : "close" === n.data.config.decline_redirect ? n.hide() : m.log("Decline offer will not redirect - your widget is configured for asynchronous decline."),
                    "popup" === n.data.config.display_type && (n.data.visible = !1,
                    i.DOM.removeClass("body", "rebuy-modal-visible"),
                    O()(document).off("keydown.rebuy-modal")),
                    t(e),
                    v.Widget.callbacks.decline(e, n)
                }
                async showThankYou(e) {
                    this.data.purchased = e;
                    const {ConfettiParty: t} = await n.e(885).then(n.bind(n, 9831));
                    new t(O()(this.element).find(".rebuy-widget-content")[0])
                }
                dismissThankYou() {
                    this.hide()
                }
                checkout() {
                    p.Z.checkout()
                }
                goToReChargeCheckout() {
                    p.Z.goToReChargeCheckout()
                }
                goToShopifyCheckout() {
                    p.Z.goToShopifyCheckout()
                }
                hasQuantityInputEnabled() {
                    let e = !1;
                    return this.data.config.quantity_inputs.enabled && (e = !0),
                    e
                }
                maxQuantityInputValue() {
                    const e = this;
                    let t = null;
                    return e.data.config.quantity_inputs.enabled && (t = e.data.config.quantity_inputs.max_value),
                    t
                }
                addToReChargeCheckout(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    e.status = "adding";
                    const r = e.id
                      , a = e.selected_variant.id
                      , o = e.subscription && e.selected_variant.subscription_variant_price ? e.selected_variant.subscription_variant_price : e.selected_variant.price;
                    let s = {};
                    if (e.subscription) {
                        let t = e.subscription_interval.toLowerCase();
                        "s" === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)),
                        s = {
                            checkout_token: n.data.cart.token,
                            variant_id: a,
                            quantity: e.quantity,
                            key: n.data.config.key,
                            widget_id: n.id,
                            properties: {
                                subscription_id: e.subscription_id,
                                shipping_interval_frequency: e.subscription_frequency,
                                shipping_interval_unit_type: e.subscription_interval
                            },
                            charge_interval_frequency: e.subscription_frequency,
                            order_interval_frequency: e.subscription_frequency,
                            order_interval_unit: t
                        }
                    } else
                        s = {
                            checkout_token: n.data.cart.token,
                            variant_id: a,
                            quantity: e.quantity,
                            key: n.data.config.key,
                            widget_id: n.id,
                            properties: {}
                        };
                    s = n.addWidgetLineItemProperties(s);
                    v.Widget.callbacks.beforeAdd(e, n);
                    let l = "rebuyengine.com";
                    window.rebuyConfig && window.rebuyConfig.host && (l = window.rebuyConfig.host);
                    const c = {
                        params: {
                            method: "GET",
                            url: `https://${l}/api/v1/recharge/checkout/add?${(0,
                            i.urlSerializeDeep)(s)}`,
                            success: function(s) {
                                const l = s.data;
                                e.status = "added",
                                P.J.trackGA("Rebuy", "Added Product", e.title, (0,
                                i.amountToCents)(o)),
                                P.J.trackEvent({
                                    subject: "user",
                                    verb: "added",
                                    noun: "product",
                                    label: e.title,
                                    value: (0,
                                    i.amountToCents)(o),
                                    shopify_product_id: r,
                                    shopify_product_title: e.title,
                                    shopify_product_handle: e.handle,
                                    shopify_variant_id: a,
                                    shopify_variant_title: e.selected_variant.title,
                                    shopify_variant_price: (0,
                                    i.amountToCents)(o),
                                    widget_id: n.id
                                }),
                                n.trackABWidgetAddToCart(e, a),
                                p.Z.setCart(l),
                                n.refreshReChargeCheckout((function() {
                                    n.decoratePromotionalProducts(),
                                    n.decorateOrderSummary(),
                                    "pre_purchase" !== n.data.config.type && (e.status = "ready"),
                                    t(e),
                                    v.Widget.callbacks.add(e, n)
                                }
                                ))
                            },
                            error: function(t) {
                                m.log("Oh no error!"),
                                m.log(t),
                                e.status = "ready"
                            }
                        },
                        callback: t
                    };
                    n.addToRequestQueue(c)
                }
                addToRechargeShipment(e, t, n) {
                    const r = this
                      , i = new BubbleAlert;
                    t = t || function() {}
                    ,
                    n = n || function() {}
                    ,
                    e.status = "adding";
                    if ("recharge_customer_portal" === C.Y.context() && "edit_subscription" === r.data.recharge.step) {
                        const {address_id: o, next_charge_scheduled_at: s} = r.data.recharge.subscription;
                        v.Widget.callbacks.beforeAdd(e, r);
                        const l = Object.assign({}, r.addToCartData(e, !0), {
                            address_id: o,
                            next_charge_scheduled_at: s,
                            widget_id: r.id
                        })
                          , c = e.subscription ? "/recharge/subscribe" : "/recharge/onetime";
                        m.log("= = = Recharge Customer Portal: API debug = = =", {
                            config: r.data.recharge,
                            payload: l,
                            product: e,
                            RECHARGE_API: c
                        }),
                        a.callAPI("POST", c, l).then((function(n) {
                            m.log("= = = Recharge Customer Portal: Successful API response = = =", n),
                            e.status = "added",
                            i.show(e, "added", "Added!"),
                            t(e),
                            v.Widget.callbacks.add(e, r),
                            setTimeout((function() {
                                e.status = "ready"
                            }
                            ), 1500)
                        }
                        ), (function(t) {
                            e.status = "ready",
                            n(t),
                            a.callError(t)
                        }
                        ))
                    }
                }
                removeFromReChargeCart(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    e.status = "removing";
                    const r = n.getProductIndex(e, n.data.cart.line_items)
                      , a = {
                        checkout_token: n.data.cart.token,
                        index: r,
                        key: n.data.config.key
                    };
                    v.Widget.callbacks.beforeRemove(e, n);
                    let o = "rebuyengine.com";
                    window.rebuyConfig && window.rebuyConfig.host && (o = window.rebuyConfig.host);
                    const s = {
                        params: {
                            method: "GET",
                            url: `https://${o}/api/v1/recharge/checkout/remove?${(0,
                            i.urlSerializeDeep)(a)}`,
                            success: function(r) {
                                const i = r.data;
                                e.status = "removed",
                                p.Z.setCart(i),
                                n.refreshReChargeCheckout((function() {
                                    n.decoratePromotionalProducts(),
                                    n.decorateOrderSummary(),
                                    e.status = "ready",
                                    t(e),
                                    v.Widget.callbacks.remove(e, n)
                                }
                                ))
                            },
                            error: function(t) {
                                m.log("Oh no error!"),
                                m.log(t),
                                e.status = "ready"
                            }
                        },
                        callback: t
                    };
                    n.addToRequestQueue(s)
                }
                removeFromReChargeCartAtIndex(e, t) {
                    const n = this;
                    t = t || function() {}
                    ;
                    const r = n.data.cart.line_items[e];
                    let a = null
                      , o = null;
                    if (r && (a = n.getWidgetProductByID(r.product_id),
                    a && (o = n.getWidgetProductVariantByID(a, r.variant_id))),
                    a && o)
                        n.removeFromReChargeCart(a, t);
                    else {
                        const r = {
                            checkout_token: n.data.cart.token,
                            index: e,
                            key: n.data.config.key
                        }
                          , success = function(e) {
                            const r = e.data;
                            p.Z.setCart(r),
                            n.refreshReChargeCheckout((function() {
                                n.decoratePromotionalProducts(),
                                n.decorateOrderSummary(),
                                t(a),
                                v.Widget.callbacks.remove(a, n)
                            }
                            ))
                        }
                          , error = function(e) {
                            m.log("Oh no error!"),
                            m.log(e)
                        };
                        v.Widget.callbacks.beforeRemove(a, n);
                        let o = "rebuyengine.com";
                        window.rebuyConfig && window.rebuyConfig.host && (o = window.rebuyConfig.host);
                        const s = {
                            params: {
                                method: "GET",
                                url: `https://${o}/api/v1/recharge/checkout/remove?${(0,
                                i.urlSerializeDeep)(r)}`,
                                success,
                                error
                            },
                            callback: t
                        };
                        n.addToRequestQueue(s)
                    }
                }
                changeItemInReChargeCart(e, t) {
                    const n = this;
                    t = t || function() {}
                    ;
                    let r = "rebuyengine.com";
                    window.rebuyConfig && window.rebuyConfig.host && (r = window.rebuyConfig.host);
                    const a = {
                        params: {
                            method: "POST",
                            url: `https://${r}/api/v1/recharge/checkout/change?${(0,
                            i.urlSerializeDeep)(e)}`,
                            success: function(e) {
                                const r = e.data;
                                p.Z.setCart(r),
                                n.refreshReChargeCheckout((function() {
                                    n.decoratePromotionalProducts(),
                                    n.decorateOrderSummary(),
                                    t()
                                }
                                ))
                            },
                            error: function(e) {
                                m.log("Oh no error!"),
                                m.log(e)
                            }
                        },
                        callback: t
                    };
                    n.addToRequestQueue(a)
                }
                setRechargePortalConfig() {
                    var e;
                    const t = this
                      , n = window.ReCharge;
                    let r = null
                      , i = null
                      , a = "unknown"
                      , o = ""
                      , s = "";
                    const l = {
                        portal: !1,
                        placement: s,
                        selector: o,
                        subscription: r,
                        theme: i,
                        themeName: a
                    };
                    if (C.Y.isRechargeCustomerPortal()) {
                        if (void 0 === n)
                            return console.warn("ReCharge not available."),
                            void (t.data.recharge = l);
                        if (n.Prima ? (i = n.Prima,
                        a = "prima",
                        o = ".recharge-te > .wrapper .rct_content",
                        s = "append") : n.Novum ? (i = n.Novum,
                        a = "novum",
                        o = "#rc_te-template-wrapper .upsells--wrapper",
                        s = "html") : null != (e = n.settings) && e.customer_portal && (i = n,
                        a = "affinity",
                        o = "#recharge-customer-portal .recharge-container > div > div",
                        s = "append"),
                        i && i.subscription) {
                            r = i.subscription;
                            const {shopify_product_id: e, shopify_variant_id: n} = r;
                            t.data.shopify_product_ids.length || (t.data.shopify_product_ids = [e]),
                            t.data.shopify_variant_ids.length || (t.data.shopify_variant_ids = [n])
                        }
                        t.data.recharge = {
                            ...l,
                            placement: s,
                            portal: !0,
                            step: C.Y.getRechargeCustomerPortalStep(),
                            selector: o,
                            subscription: r,
                            theme: i,
                            themeName: a
                        }
                    } else
                        t.data.recharge = l
                }
                watchRechargeAffinity(e=!1) {
                    var t;
                    const n = this;
                    n.data.recharge.themeName && "affinity" !== (null == (t = n.data.recharge) ? void 0 : t.themeName) || setTimeout((function() {
                        const t = /\/tools\/recurring\/portal\/[a-z0-9]+\/subscriptions\/([0-9]+)$/
                          , r = document.querySelector("#recharge-customer-portal .recharge-container > div > div > div")
                          , a = {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        };
                        if (r) {
                            new MutationObserver(( (r, a) => {
                                const o = n.data.recharge.theme.subscriptions
                                  , s = (0,
                                i.urlGetLocation)().pathname.match(t);
                                let l, c = null;
                                if (s && (c = "edit_subscription",
                                l = Number(s[1])),
                                !c || !o)
                                    return n.data.visible = !1,
                                    n.data.shopify_product_ids = [],
                                    n.data.shopify_variant_ids = [],
                                    n.data.recharge.subscription = null,
                                    void (n.data.recharge.step = c);
                                if ((n.data.recharge.step !== c || e) && (e = !1,
                                n.data.recharge.step = c,
                                l && o))
                                    for (const e of o)
                                        if (e.id === l) {
                                            n.data.shopify_product_ids = [e.shopify_product_id],
                                            n.data.shopify_variant_ids = [e.shopify_variant_id],
                                            n.data.recharge.subscription = e,
                                            n.getWidgetProducts(( () => {
                                                C.Y.getRechargeCustomerPortalStep() ? n.data.visible = !0 : n.data.visible = !1
                                            }
                                            ));
                                            break
                                        }
                            }
                            )).observe(r, a)
                        }
                    }
                    ), 0)
                }
                manageGiftWithPurchase() {
                    const e = this;
                    e.shouldDisplay() && (void 0 === e.timer && (e.timer = null),
                    clearTimeout(e.timer),
                    e.timer = setTimeout(( () => {
                        const t = e.data.cart.item_count;
                        m.log(`= = = Manage Gift with Purchase (${t} items) = = =`),
                        e.giftWithPurchaseAutoAdd(( () => {
                            m.log(`Gift with Purchase - Finished adding items (${t} items)`),
                            e.giftWithPurchaseAutoAdjust(( () => {
                                m.log(`Gift with Purchase - Finished adjusting items (${t} items)`)
                            }
                            ))
                        }
                        ))
                    }
                    ), 500))
                }
                giftWithPurchaseAutoAdd(e) {
                    const t = this;
                    if (e = e || ( () => {}
                    ),
                    !t.data.cart || "working" === t.status)
                        return;
                    const completed = () => {
                        t.data.add_item_count <= 0 && (t.status = "ready",
                        m.log("GWP Add - Completed!"),
                        e())
                    }
                    ;
                    t.status = "working",
                    void 0 === t.data.add_item_count && (t.data.add_item_count = 0);
                    const n = p.Z.items()
                      , r = t.data.products
                      , a = !1 !== t.data.settings.allow_gifts_without_purchase
                      , o = [];
                    for (const s of r) {
                        const [r] = (0,
                        i.filterArray)(n, {
                            product_id: s.id,
                            variant_id: s.selected_variant.id,
                            "properties._widget_id": t.id
                        });
                        if (!r) {
                            let r = !0;
                            if (0 !== n.length || a || (r = !1),
                            t.data.settings.allow_remove) {
                                const n = f.H.get(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", t.id).replace(":cartToken", t.data.cart.token.split("?")[0]).replace(":productId", s.id));
                                "removed" === n ? r = !1 : "added" === n && (r = !1,
                                t.notifyCustomerOfGiftRemoval(s.id, e))
                            }
                            r && (t.data.add_item_count += 1,
                            o.push(s))
                        }
                    }
                    o.length > 1 ? t.addSelectedProductsToCart(null, (e => {
                        e.forEach((e => {
                            null != e && e.id && (f.H.set(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", t.id).replace(":cartToken", t.data.cart.token.split("?")[0]).replace(":productId", e.id), "added", {
                                days: 14
                            }),
                            t.data.add_item_count -= 1)
                        }
                        )),
                        completed()
                    }
                    )) : 1 === o.length && t.addToCart(o[0], (e => {
                        null != e && e.id && f.H.set(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", t.id).replace(":cartToken", t.data.cart.token.split("?")[0]).replace(":productId", e.id), "added", {
                            days: 14
                        }),
                        t.data.add_item_count -= 1,
                        completed()
                    }
                    )),
                    completed()
                }
                giftWithPurchaseAutoAdjust(e) {
                    const t = this;
                    e = e || ( () => {}
                    );
                    const completed = () => {
                        t.data.adjust_item_count <= 0 && (t.status = "ready",
                        m.log("GWP Adjust - Completed!"),
                        e())
                    }
                    ;
                    if (t.data.cart && "working" !== t.status) {
                        t.status = "working",
                        void 0 === t.data.adjust_item_count && (t.data.adjust_item_count = 0);
                        const e = p.Z.items()
                          , n = t.data.products
                          , r = (0,
                        i.filterArray)(e, {
                            "properties._widget_id": t.id
                        })
                          , a = !1 !== t.data.settings.allow_gifts_without_purchase;
                        r.forEach(( (o, s) => {
                            const [c] = (0,
                            i.filterArray)(n, {
                                id: o.product_id,
                                "selected_variant.id": o.variant_id
                            })
                              , u = e.length === r.length
                              , d = n.length === r.length;
                            !c || u && d && !a ? (t.data.adjust_item_count += 1,
                            t.changeItem({
                                id: `${o.key}`,
                                index: s,
                                quantity: 0
                            }, ( () => {
                                t.data.adjust_item_count -= 1,
                                v.Widget.callbacks.remove(o, t),
                                f.H.remove(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", t.id).replace(":cartToken", t.data.cart.token.split("?")[0]).replace(":productId", o.product_id)),
                                completed(),
                                "cart" === t.data.config.remove_redirect ? p.Z.goToCartPage() : "checkout" === t.data.config.remove_redirect ? t.checkout() : "close" === t.data.config.redirect && t.hide()
                            }
                            ))) : c && c.quantity !== o.quantity && (t.data.adjust_item_count += 1,
                            t.changeItem({
                                id: `${o.key}`,
                                index: s,
                                quantity: c.quantity
                            }, ( () => {
                                t.data.adjust_item_count -= 1,
                                v.Widget.callbacks.change(o, t),
                                completed()
                            }
                            )))
                        }
                        )),
                        completed()
                    }
                }
                notifyCustomerOfGiftRemoval(e, t) {
                    const n = this
                      , {Rebuy: {Modal: r}} = window;
                    r.dialog("dialog", {
                        title: `${n.data.settings.language.remove_title}`,
                        message: `${n.data.settings.language.remove_body}`,
                        buttons: [{
                            type: "primary",
                            label: `${n.data.settings.language.remove_confirm}`,
                            action: "callback",
                            callback: () => {
                                f.H.set(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", n.id).replace(":cartToken", p.Z.cart.token.split("?")[0]).replace(":productId", e), "removed", {
                                    days: 14
                                })
                            }
                        }, {
                            type: "secondary",
                            label: `${n.data.settings.language.remove_deny}`,
                            action: "callback",
                            callback: () => {
                                f.H.remove(l.Wc.WIDGET_TOKEN_PRODUCT.replace(":widgetId", n.id).replace(":cartToken", p.Z.cart.token.split("?")[0]).replace(":productId", e)),
                                n.giftWithPurchaseAutoAdd(t)
                            }
                        }]
                    })
                }
                isInputProduct(e) {
                    const t = this;
                    let n = !1;
                    if (t.data.metadata && t.data.metadata.input_products)
                        for (let r = 0; r < t.data.metadata.input_products.length; r++)
                            if (t.data.metadata.input_products[r].id === e.id) {
                                n = !0;
                                break
                            }
                    return n
                }
                selectedProductCount() {
                    const e = this;
                    let t = 0;
                    for (let n = 0; n < e.data.products.length; n++)
                        e.productIsSelected(e.data.products[n]) && t++;
                    return t
                }
                productIsSelected(e) {
                    return !1 !== e.selected
                }
                selectProduct(e) {
                    e.selected = !0
                }
                unselectProduct(e) {
                    e.selected = !1
                }
                toggleProductSelect(e) {
                    const t = this;
                    t.productIsSelected(e) ? t.unselectProduct(e) : t.selectProduct(e)
                }
                subtotal() {
                    const e = this;
                    let t = 0;
                    for (let n, r, a = 0; a < e.data.products.length; a++)
                        if (n = e.data.products[a],
                        r = e.variantPrice(n, n.selected_variant),
                        !1 !== n.selected) {
                            const e = new Money(r).multiplyBy(n.quantity);
                            t += (0,
                            i.amountToCents)(e)
                        }
                    return t
                }
                compareAtSubtotal() {
                    const e = this;
                    let t = 0;
                    for (let n, r, a = 0; a < e.data.products.length; a++)
                        if (n = e.data.products[a],
                        r = e.variantCompareAtPrice(n, n.selected_variant),
                        !1 !== n.selected) {
                            const e = new Money(r).multiplyBy(n.quantity);
                            t += (0,
                            i.amountToCents)(e)
                        }
                    return t
                }
                bundleOnSale() {
                    let e = !1;
                    const t = this.subtotal();
                    return this.compareAtSubtotal() > t && (e = !0),
                    e
                }
                bundleSavings() {
                    let e = 0;
                    const t = this.subtotal()
                      , n = this.compareAtSubtotal();
                    return n > t && (e = n - t),
                    e
                }
                addSelectedProductsToCart(e, t) {
                    const n = this
                      , r = window.Rebuy.SmartCart;
                    t = t || function() {}
                    ,
                    n.requestQueueStatus = "working",
                    n.View.vue.$forceUpdate();
                    const a = {
                        items: []
                    };
                    if (e && a.items.push(e),
                    (0,
                    i.isBundleBuilderWidget)(n) || (0,
                    i.isDynamicBundleWidget)(n)) {
                        const e = (0,
                        i.UUID)();
                        n.data.products.forEach((t => {
                            !1 !== t.selected && n.variantAvailable(t.selected_variant) && (t.properties = {
                                ...t.properties,
                                _r_added_bundle_session_id: e
                            },
                            a.items.push(n.addToCartData(t)))
                        }
                        ))
                    } else
                        n.data.products.forEach((e => {
                            !1 !== e.selected && n.variantAvailable(e.selected_variant) && a.items.push(n.addToCartData(e))
                        }
                        ));
                    if (a.items.length) {
                        var o, s;
                        if ("tapcart" === C.Y.context())
                            return void n.addToTapcartApp(a.items, t);
                        const success = e => {
                            var i, o, s, l, c, u;
                            m.log("Success!"),
                            m.log(e),
                            "cart" === (null == n || null == (i = n.data) || null == (o = i.config) ? void 0 : o.redirect) ? r && "ready" === r.status ? m.log("Item added will not redirect when Smart Cart is enabled and the widget has setting of Redirect to Cart.") : window.location = E.cartURL() : "checkout" === (null == n || null == (s = n.data) || null == (l = s.config) ? void 0 : l.redirect) ? n.checkout() : "close" === (null == n || null == (c = n.data) || null == (u = c.config) ? void 0 : u.redirect) ? n.hide() : m.log("Item added page will not redirect - your widget is configured for asynchronous add to cart."),
                            t(a.items),
                            v.Widget.callbacks.add(a.items, n)
                        }
                          , error = e => {
                            console.error(e)
                        }
                          , e = {
                            callback: () => {
                                n.requestQueueStatus = "ready",
                                n.View.vue.$forceUpdate()
                            }
                        };
                        "product_addon" === (null == n || null == (o = n.data) || null == (s = o.settings) ? void 0 : s.type) ? (0,
                        i.wait)(( () => {
                            const t = Object.assign({}, n.data.tails.added_item);
                            a.items.forEach(( (e, n) => {
                                t.id === Number(e.id) && a.items.splice(n, 1)
                            }
                            )),
                            v.Widget.callbacks.beforeAdd(a.items, n),
                            e.params = {
                                method: "POST",
                                url: E.routeRoot() + "cart/add.js",
                                body: (0,
                                i.isObject)(a) ? JSON.stringify(a) : a,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                success,
                                error
                            },
                            n.addToRequestQueue(e)
                        }
                        ), 750) : (e.params = {
                            method: "POST",
                            url: E.routeRoot() + "cart/add.js",
                            body: (0,
                            i.isObject)(a) ? JSON.stringify(a) : a,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            success,
                            error
                        },
                        n.addToRequestQueue(e))
                    }
                }
                bundleRequiresAllItems() {
                    var e, t, n, r;
                    return "dynamic_bundle" === this.data.config.type && (null == (e = this.data.config.discount) || null == (t = e.protection) ? void 0 : t.enabled) && (null == (n = this.data.config.discount) || null == (r = n.protection) ? void 0 : r.disable_atc_on_incomplete) && 0 === (this.data.config.discount.protection.allowed_removals || 0)
                }
                isBundleIncomplete() {
                    var e, t, n, r;
                    if ("dynamic_bundle" !== this.data.config.type || null == (e = this.data.config.discount) || null == (t = e.protection) || !t.enabled || null == (n = this.data.config.discount) || null == (r = n.protection) || !r.disable_atc_on_incomplete)
                        return !1;
                    return this.data.products.filter((e => e.selected)).length < this.data.products.length - (this.data.config.discount.protection.allowed_removals || 0)
                }
                addBundleToCart(e, t, n) {
                    const r = this;
                    t = t || ( () => {}
                    ),
                    n = n || !1;
                    let a = !0;
                    const o = {
                        items: []
                    }
                      , s = {
                        names: [],
                        values: [],
                        keys: {}
                    };
                    if (e)
                        for (let t = 0; Object.prototype.hasOwnProperty.call(e, "options_with_values") && t < e.options_with_values.length; t++)
                            s.names.push(e.options_with_values[t].name),
                            s.values.push(e.options_with_values[t].value),
                            s.keys[e.options_with_values[t].name] = e.options_with_values[t].value;
                    for (let t = 0; t < r.data.products.length; t++) {
                        if (r.data.products[t].subscription = n,
                        1 !== r.data.products[t].variants.length && e) {
                            const e = {
                                option1: null,
                                option2: null,
                                option3: null
                            };
                            for (let n, i, a = 0; a < r.data.products[t].options.length; a++)
                                n = r.data.products[t].options[a].name,
                                i = r.data.products[t].options[a].position,
                                -1 !== s.names.indexOf(n) && (e["option" + i] = s.keys[n]);
                            for (let n, i = 0; i < r.data.products[t].variants.length; i++)
                                if (n = r.data.products[t].variants[i],
                                n.option1 === e.option1 && n.option2 === e.option2 && n.option3 === e.option3) {
                                    r.data.products[t].selected_variant = n,
                                    r.data.products[t].selected_variant_id = n.id;
                                    break
                                }
                            o.items.push(r.addToCartData(r.data.products[t]))
                        } else
                            o.items.push(r.addToCartData(r.data.products[t]));
                        r.variantAvailable(r.data.products[t].selected_variant) || (a = !1)
                    }
                    const success = function(e) {
                        m.log("addBundleToCart - Success!"),
                        m.log(e),
                        "cart" === r.data.config.redirect ? p.Z.goToCartPage() : "checkout" === r.data.config.redirect ? r.checkout() : "close" === r.data.config.redirect ? r.hide() : m.log("Item added page will not redirect - your widget is configured for asynchronous add to cart."),
                        t(o.items),
                        v.Widget.callbacks.add(o.items, r)
                    }
                      , error = function(e) {
                        console.error(e)
                    };
                    if (a) {
                        const e = {
                            params: {
                                method: "POST",
                                url: E.routeRoot() + "cart/add.js",
                                body: (0,
                                i.isObject)(o) ? JSON.stringify(o) : o,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                success,
                                error
                            }
                        };
                        r.addToRequestQueue(e)
                    } else {
                        const {Rebuy: {Modal: e}} = window;
                        e.dialog("dialog", {
                            title: "Out of Stock!",
                            message: "Unfortunately, this bundle is no longer available. All available units have been sold.",
                            buttons: [{
                                type: "primary",
                                label: "Okay",
                                action: "callback",
                                callback: t
                            }]
                        })
                    }
                }