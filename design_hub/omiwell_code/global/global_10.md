
                    e.has_subscription && e.subscription && t.subscription_variant_price && (a = new Money(t.subscription_variant_price));
                    let c = a.amount;
                    const u = !1
                      , d = r.hasProductDiscount(e)
                      , p = r.hasGlobalDiscount()
                      , f = (null == (n = r.data.config.discount) ? void 0 : n.discounted_by) === A.FUNCTIONS;
                    if (E.sellingPlanEnabled() && r.hasSubscriptionDiscount(e) && e.subscription) {
                        const t = r.getSubscriptionDiscount(e)
                          , n = t.type
                          , i = t.amount;
                        let o = 0;
                        const s = a.toCents();
                        "percentage" === n ? o = (0,
                        S.round)(s * (i / 100)) : "fixed" !== n && "fixed_amount" !== n || (o = (0,
                        S.round)(i * a.decimalMultiplier)),
                        c = a.subtract(o, u)
                    }
                    if (d) {
                        const t = e.discount.type
                          , n = e.discount.amount;
                        let r = 0;
                        const i = a.toCents();
                        "percentage" === t ? r = (0,
                        S.round)(i * (n / 100)) : "fixed" === t && (r = (0,
                        S.round)(n * a.decimalMultiplier)),
                        c = a.subtract(r, u)
                    } else if (p) {
                        const e = r.data.config.discount.type
                          , t = r.data.config.discount.amount;
                        let n = 0;
                        const i = a.toCents();
                        "percentage" === e ? n = (0,
                        S.shopifyDiscountRound)(i * (t / 100)) : "fixed" === e && (n = f ? (0,
                        S.shopifyDiscountRound)(t) : (0,
                        S.round)(t * a.decimalMultiplier)),
                        c = a.subtract(n, u)
                    }
                    return c
                }
                variantCompareAtPrice(e, t) {
                    const n = this;
                    null !== t && t || (t = (0,
                    i.findLowestPricedVariant)(e));
                    let r = new Money(t.price)
                      , a = new Money(t.compare_at_price);
                    const o = (0,
                    S.getShopCurrencyCode)()
                      , s = (0,
                    S.getActiveCurrencyCode)();
                    if (o && s && o !== s) {
                        const i = T.get(_classPrivateFieldGet(W, n).call(n, e.handle));
                        if (null != i && i.variants) {
                            var l;
                            const e = null == (l = i.variants) ? void 0 : l.find(( ({id: e}) => e === t.id));
                            e && (r = new Money(e.price,(0,
                            S.getActiveCurrencyCode)()),
                            a = new Money(e.compare_at_price,(0,
                            S.getActiveCurrencyCode)()))
                        }
                    }
                    return "none" !== n.data.config.discount.type ? "compare_at_price" === n.data.config.discount.discounted_from && a.amount ? a.amount : r.amount : a.toCents() > r.toCents() ? a.amount : r.amount
                }
                variantOnSale(e, t) {
                    const n = this
                      , r = n.hasGlobalDiscount() || n.hasProductDiscount(e)
                      , i = n.variantPrice(e, t)
                      , a = n.variantCompareAtPrice(e, t)
                      , o = {
                        price: new Money(i),
                        compare_at_price: new Money(a)
                    };
                    return r || o.compare_at_price.toCents() > o.price.toCents()
                }
                bundleVariantPrice(e, t, n=!1) {
                    var r;
                    const a = this;
                    t || (t = (0,
                    i.findLowestPricedVariant)(e));
                    const o = new Money(t.price);
                    let s = a.localizedCurrency(o.amount, null != (r = null == e ? void 0 : e.handle) ? r : "", t);
                    return !(0,
                    i.isBundleBuilderWidget)(a) || "string" != typeof s && "number" != typeof s || (s = a.getBundleBuilderDiscountedPriceProduct(e, s, n)),
                    s
                }
                bundleVariantCompareAtPrice(e, t) {
                    var n, r;
                    t = t || (0,
                    i.findLowestPricedVariant)(e);
                    const a = new Money(this.localizedCurrency(t.price, null != (n = null == e ? void 0 : e.handle) ? n : "", t))
                      , o = t.compare_at_price ? new Money(this.localizedCurrency(t.compare_at_price, null != (r = null == e ? void 0 : e.handle) ? r : "", t, !0)) : null;
                    return o && o.toCents() > a.toCents() ? o.amount : a.amount
                }
                bundleVariantOnSale(e, t) {
                    const n = this.bundleVariantPrice(e, t)
                      , r = this.bundleVariantCompareAtPrice(e, t)
                      , i = {
                        price: new Money(n),
                        compareAtPrice: new Money(r)
                    };
                    return i.compareAtPrice.toCents() > i.price.toCents()
                }
                switchCartToSubscription() {
                    const e = this;
                    if (e.data.subscription) {
                        e.data.subscription.isSubscription = !0;
                        let t = e.data.subscription.options[0];
                        if (e.data.subscription.default_frequency)
                            for (let n = 0; n < e.data.subscription.options.length; n++)
                                if (e.data.subscription.options[n].frequency === e.data.subscription.default_frequency) {
                                    t = e.data.subscription.options[n];
                                    break
                                }
                        e.data.subscription.selectedOption = t,
                        f.H.set(l.Wc.SHOPIFY_CART_TOKEN.replace(":cartToken", e.data.cart.token), e.data.subscription),
                        p.Z.switchCartToFrequency(e.data.subscription.selectedOption, (function() {
                            e.refreshShopifyCheckout()
                        }
                        ))
                    }
                }
                switchCartToOnetime() {
                    const e = this;
                    e.data.subscription && (e.data.subscription.isSubscription = !1,
                    e.data.subscription.selectedOption = null,
                    f.H.set(l.Wc.SHOPIFY_CART_TOKEN.replace(":cartToken", e.data.cart.token), e.data.subscription),
                    p.Z.switchCartToFrequency(e.data.subscription.selectedOption, (function() {
                        e.refreshShopifyCheckout()
                    }
                    )))
                }
                toggleCartSubscription() {
                    const e = this;
                    e.data.subscription.isSubscription ? e.switchCartToSubscription() : e.switchCartToOnetime()
                }
                updateCartSubscriptionFrequency() {
                    const e = this;
                    f.H.set(l.Wc.SHOPIFY_CART_TOKEN.replace(":cartToken", e.data.cart.token), e.data.subscription),
                    p.Z.switchCartToFrequency(e.data.subscription.selectedOption, (function() {
                        e.refreshShopifyCheckout()
                    }
                    ))
                }
                cartItemIsPromotionalItem(e) {
                    const t = e.properties && e.properties._attribution === l.s9.WIDGET_TYPES.SHOPIFY_CHECKOUT
                      , n = e.properties && e.properties._attribution === l.s9.WIDGET_TYPES.RECHARGE_CHECKOUT;
                    return t || n
                }
                cartItemIsWidgetItem(e) {
                    let t = !1;
                    return e.properties && e.properties._widget_id === this.id && (t = !0),
                    t
                }
                cartHasProduct(e) {
                    const t = this;
                    let n = !1
                      , r = [];
                    if (t.data.cart && t.data.cart.items ? r = t.data.cart.items : t.data.cart && t.data.cart.line_items && (r = t.data.cart.line_items),
                    r) {
                        -1 !== t.getProductIndex(e, r) && (n = !0)
                    }
                    return n
                }
                rechargeCheckoutHasProduct(e) {
                    const t = this;
                    let n = !1
                      , r = [];
                    if (t.data.cart && t.data.cart.items ? r = t.data.cart.items : t.data.cart && t.data.cart.line_items && (r = t.data.cart.line_items),
                    r) {
                        -1 !== t.getProductIndex(e, r) && (n = !0)
                    }
                    return n
                }
                decoratePromotionalProducts() {
                    const e = this;
                    let t = [];
                    e.data.cart && e.data.cart.items ? t = e.data.cart.items : e.data.cart && e.data.cart.line_items && (t = e.data.cart.line_items);
                    for (let n = 0; n < t.length; n++)
                        if (e.cartItemIsPromotionalItem(t[n])) {
                            const r = e.getWidgetProductByID(t[n].product_id);
                            if (r) {
                                const i = e.getWidgetProductVariantByID(r, t[n].variant_id);
                                r.selected_variant = i,
                                r.selected_variant_id = i.id
                            }
                        }
                }
                decorateOrderSummary() {
                    const e = this;
                    let t = [];
                    e.data.cart && e.data.cart.items ? t = e.data.cart.items : e.data.cart && e.data.cart.line_items && (t = e.data.cart.line_items);
                    const n = O()(".order-summary__section .product, .order-summary__section--product-list .product-list .product");
                    m.log("cart items:", t);
                    for (let r, i = 0; i < t.length; i++)
                        if (m.log("cart item at index " + i + ":", t[i]),
                        e.cartItemIsPromotionalItem(t[i]) && (r = n.eq(i),
                        m.log("element at index " + i + ":", r),
                        r.length && !r[0].dataset.initialized)) {
                            const n = e.data.config.language.remove_from_cart;
                            r.find(".product__description, .product__info").append('<button class="product__remove" data-index="' + i + '" data-index="' + i + '" data-product-id="' + t[i].product_id + '" data-variant-id="' + t[i].variant_id + '">(' + n + ")</button>"),
                            r[0].dataset.initialized = !0
                        }
                }
                addWindowEventsToDOM() {
                    const e = this;
                    "shopify_checkout" === e.data.config.type && (O()(".order-summary__section").off("click.rebuy-checkout"),
                    O()(".order-summary__section").on("click.rebuy-checkout", ".product__remove", (function(t) {
                        const n = O()(this)
                          , r = n.data("index")
                          , i = e.data.config.language.removing_from_cart;
                        n.html("(" + i + ")"),
                        e.removeFromCartAtIndex(r)
                    }
                    ))),
                    "recharge_checkout" === e.data.config.type && (O()(".order-summary__section--product-list").off("click.rebuy-checkout"),
                    O()(".order-summary__section--product-list").on("click.rebuy-checkout", ".product__remove", (function(t) {
                        const n = O()(this)
                          , r = n.data("index");
                        n.html("(Removing...)"),
                        e.removeFromReChargeCartAtIndex(r)
                    }
                    ))),
                    O()(window).off("resize.rebuy"),
                    O()(window).on("resize.rebuy", (0,
                    i.debounce)((function() {
                        e.repositionTemplate()
                    }
                    ), 100))
                }
                refreshShopifyCheckout(e) {
                    const t = this;
                    if (C.Y.isShopifyCheckout()) {
                        if (t.polling.summary > t.polling.summary_max_attempts)
                            return console.warn("= = = POLLING COUNT EXHAUSTED: Widget.refreshShopifyCheckout = = ="),
                            t.polling.summary = 0,
                            !1;
                        t.polling.summary += 1,
                        e = e || function() {}
                        ;
                        const n = (0,
                        i.urlAddParameter)(window.location.href, "t", (0,
                        i.timestamp)());
                        O().get(n, (function(n) {
                            const r = ".order-summary__section.order-summary__section--product-list"
                              , i = ".order-summary__section.order-summary__section--total-lines"
                              , a = ".order-summary-toggle__total-recap.total-recap"
                              , o = ".order-summary__section .total-line.total-line--recurring-total"
                              , s = O()(n)
                              , l = O()(r, s).html()
                              , c = O()(i, s).html()
                              , u = O()(a, s).html();
                            O()(r).html(l),
                            O()(i).html(c),
                            O()(a).html(u),
                            t.decoratePromotionalProducts(),
                            t.decorateOrderSummary(),
                            t.refreshShopifyCheckoutShipping();
                            if (p.Z.cartHasSubscriptionItems() !== !!O()(o, s).length)
                                return t.refreshShopifyCheckout(e),
                                !1;
                            t.polling.summary = 0,
                            e(),
                            v.Widget.callbacks.refresh(t)
                        }
                        )).fail((function() {
                            console.error("= = = ERROR: Widget.refreshShopifyCheckout = = ="),
                            t.refreshShopifyCheckout(e)
                        }
                        ))
                    }
                }
                refreshShopifyAlternativePayments(e) {
                    const t = this;
                    if (e = e || function() {}
                    ,
                    C.Y.isShopifyCheckout() && "contact_information" === C.Y.getShopifyCheckoutStep()) {
                        const n = {
                            alternative_payments: "[data-alternative-payments]",
                            loading: ".dynamic-checkout.dynamic-checkout--loading"
                        };
                        if (t.polling.alt_payments > t.polling.alt_payments_max_attempts)
                            return console.warn("= = = POLLING COUNT EXHAUSTED: Widget.refreshShopifyAlternativePayments = = ="),
                            O()(n.alternative_payments).hide(),
                            t.polling.alt_payments = 0,
                            !1;
                        t.polling.alt_payments += 1;
                        if (i.DOM.selectAll(n.loading).length > 0) {
                            let e = new CustomEvent("lineItemsChanged",{
                                detail: null
                            });
                            document.dispatchEvent(e),
                            e = new CustomEvent("shopify:block:select",{
                                detail: null
                            }),
                            document.dispatchEvent(e),
                            clearTimeout(t.polling.alt_payments_timer),
                            t.polling.alt_payments_timer = setTimeout((function() {
                                t.refreshShopifyAlternativePayments()
                            }
                            ), 1e3)
                        } else
                            t.polling.alt_payments = 0,
                            e(),
                            v.Widget.callbacks.alternativePaymentsRefresh(t)
                    }
                }
                refreshShopifyCheckoutShipping(e) {
                    const t = this;
                    if (C.Y.isShopifyCheckout() && "payment_method" === C.Y.getShopifyCheckoutStep()) {
                        const n = (0,
                        i.urlAddParameter)(window.location.pathname + "?step=shipping_method", "t", (0,
                        i.timestamp)());
                        O().get(n, (function(n) {
                            const r = 'input[name="checkout[shipping_rate][id]"]'
                              , i = ".section.section--shipping-method"
                              , a = ".order-summary__section .total-line.total-line--taxes"
                              , o = "[data-shipping-warning]"
                              , s = O()(n)
                              , l = O()(i, s)
                              , c = O()(a, s).html();
                            O()(a).html(c);
                            const u = document.querySelector(a);
                            u.classList.contains("hidden") && u.classList.remove("hidden");
                            const d = O()(r, l);
                            if (O()(o, l).length && d.length) {
                                const n = l.closest("form").parent().html();
                                1 !== O()("#shipping-method-options").length && O()("body").append(O()('<div id="shipping-method-options" style="display:none">'));
                                const i = O()("#shipping-method-options");
                                i.html(n);
                                const a = O()("form", i).eq(0);
                                O()(a).on("submit", (function(n) {
                                    n.preventDefault(),
                                    O().ajax({
                                        method: "POST",
                                        url: O()(this).attr("action"),
                                        data: O()(this).serializeArray(),
                                        dataType: "html",
                                        success: function(n) {
                                            const r = O()(n)
                                              , a = {
                                                payment_due: ".order-summary__section .total-line .payment-due",
                                                shipping_cost: '.section [data-review-section="shipping-cost"]',
                                                shipping: ".order-summary__section .total-line.total-line--shipping",
                                                subtotal: ".order-summary__section .total-line.total-line--subtotal",
                                                taxes: ".order-summary__section .total-line.total-line--taxes",
                                                totals: ".order-summary__section.order-summary__section--total-lines"
                                            };
                                            for (const e in a) {
                                                const t = O()(a[e], r).html();
                                                O()(a[e]).html(t)
                                            }
                                            i.html("");
                                            const o = document.querySelector(a.taxes);
                                            o.classList.contains("hidden") && o.classList.remove("hidden"),
                                            e && e(),
                                            v.Widget.callbacks.shippingRateRefresh(t)
                                        },
                                        error: function(e) {
                                            console.error("There was an error updating Shopify Checkout shipping", e)
                                        }
                                    })
                                }
                                ));
                                const o = O()(r + ":checked", l);
                                if (d.length && o.length) {
                                    const e = O()(r + '[value="' + o.val() + '"]', i);
                                    e.length ? e.eq(0).click() : O()(r, i).eq(0).click(),
                                    a.submit()
                                } else
                                    d.length ? (O()(r, i).eq(0).click(),
                                    a.submit()) : console.warn("= = = NO SHIPPING OPTIONS TO REFRESH = = =")
                            }
                            t.polling.shipping = 0
                        }
                        )).fail((function() {
                            console.error("= = = ERROR: Widget.refreshShopifyCheckoutShipping = = ="),
                            t.refreshShopifyCheckoutShipping(e)
                        }
                        ))
                    }
                    if (C.Y.isShopifyCheckout() && "shipping_method" === C.Y.getShopifyCheckoutStep()) {
                        if (t.polling.shipping > t.polling.shipping_max_attempts)
                            return console.warn("= = = POLLING COUNT EXHAUSTED: Widget.refreshShopifyCheckoutShipping = = ="),
                            t.polling.shipping = 0,
                            !1;
                        t.polling.shipping += 1,
                        e = e || function() {}
                        ;
                        const n = (0,
                        i.urlAddParameter)(window.location.href, "t", (0,
                        i.timestamp)());
                        O().get(n, (function(n) {
                            const r = ".order-summary__section.order-summary__section--total-lines"
                              , i = ".order-summary-toggle__total-recap.total-recap"
                              , a = ".section.section--shipping-method"
                              , o = 'input[name="checkout[shipping_rate][id]"]'
                              , s = "[data-poll-refresh]"
                              , l = "[data-shipping-warning]"
                              , c = O()(o + ":checked")
                              , u = O()(n);
                            if (0 === O()(s, u).length) {
                                const n = O()(a, u).html()
                                  , s = O()(r, u).html()
                                  , d = O()(i, u).html();
                                O()(r).html(s),
                                O()(i).html(d),
                                O()(a).html(n);
                                const p = O()(o, a);
                                if (p.length && c.length) {
                                    const e = O()(o + '[value="' + c.val() + '"]', a);
                                    e.length ? e.eq(0).click() : p.eq(0).click()
                                } else
                                    p.length ? p.eq(0).click() : console.warn("= = = NO SHIPPING OPTIONS = = =");
                                O()(l, a).length && p.length && O()(l).remove(),
                                t.polling.shipping = 0,
                                e(),
                                v.Widget.callbacks.shippingRateRefresh(t)
                            } else
                                t.refreshShopifyCheckoutShipping(e)
                        }
                        )).fail((function() {
                            console.error("= = = ERROR: Widget.refreshShopifyCheckoutShipping = = ="),
                            t.refreshShopifyCheckoutShipping(e)
                        }
                        ))
                    }
                }
                refreshReChargeCheckout(e) {
                    const t = this;
                    e = e || function() {}
                    ;
                    let n, r = "GET";
                    const a = C.Y.getReChargeCheckoutStep()
                      , o = (0,
                    i.urlAddParameter)(window.location.href, "t", Date.now());
                    if ("payment_method" === a) {
                        r = "POST";
                        const e = JSON.parse(T.get("recharge_checkout_shipping"));
                        n = e && e.reduce(( (e, {name: t, value: n}) => ({
                            ...e,
                            [t]: n
                        })), {})
                    }
                    O().ajax({
                        type: r,
                        url: o,
                        data: n,
                        dataType: "html",
                        success: function(n) {
                            const r = O()(n)
                              , i = {
                                products: ".order-summary__section.order-summary__section--product-list",
                                discount: "#discount",
                                subtotal: ".order-summary__section .total-line.total-line--subtotal",
                                shipping: ".order-summary__section .total-line.total-line--shipping",
                                taxes: ".order-summary__section .total-line.total-line--taxes",
                                total: ".order-summary__section .total-line.total-line--total",
                                payment_due: ".order-summary__section .payment-due-container",
                                savings: ".order-summary__section .savings",
                                shipping_method: "#shipping-method"
                            };
                            for (const e in i) {
                                const t = O()(i[e], r).html();
                                O()(i[e]).html(t)
                            }
                            const o = O()(i.products, r).html();
                            O()(".main .order-summary-recap").html(o),
                            "function" == typeof updateShipping && window.updateShipping(),
                            "payment_method" === a && setTimeout(( () => {
                                const e = document.querySelector(".shipping-option input");
                                document.querySelectorAll(".shipping-option input:checked").length > 0 || e.click()
                            }
                            ), 2e3),
                            e(),
                            v.Widget.callbacks.refresh(t)
                        }
                    })
                }
                getProductIndex(e, t) {
                    const n = this;
                    let r = -1;
                    for (let i = 0; i < t.length; i++)
                        if (t[i].product_id === e.id && t[i].properties && "Rebuy" === t[i].properties._source && t[i].properties._widget_id === n.id) {
                            r = i;
                            break
                        }
                    return r
                }
                availableAddOnCount() {
                    const e = this;
                    let t = 0;
                    for (let n = 0; n < e.data.products.length; n++)
                        e.rechargeCheckoutHasProduct(e.data.products[n]) || (t += 1);
                    return t
                }
                hasLearnMore() {
                    let e = !1;
                    return -1 === ["shopify_checkout", "recharge_checkout", "recharge_post_purchase"].indexOf(this.data.config.type) && "product" === this.data.config.learn_more && (e = !0),
                    e
                }
                learnMoreURL(e) {
                    var t, n;
                    const r = this;
                    let a = E.baseURL();
                    const o = C.Y.getHandles("collection");
                    return o && (a += "/collections/" + o),
                    a += "/products/" + e.handle,
                    e.selected_variant && (a = (0,
                    i.urlAddParameter)(a, "variant", e.selected_variant.id)),
                    r.data.settings.tracking.enable_product_discovery && (a = (0,
                    i.urlAddParameter)(a, l.zd.DISCOVERY_HANDLE, e.handle)),
                    r.data.settings.tracking.enable_widget && (a = (0,
                    i.urlAddParameter)(a, l.zd.DISCOVERY_WIDGET, r.id)),
                    null != r && null != (t = r.element) && null != (n = t.dataset) && n.rebuyExperimentId && (a = (0,
                    i.urlAddParameter)(a, l.zd.EXPERIMENT_ID, r.element.dataset.rebuyExperimentId)),
                    C.Y.isMalomoTracking() && (a = (0,
                    i.urlAddParameter)(a, "utm_source", "malomo"),
                    a = (0,
                    i.urlAddParameter)(a, "utm_medium", "malomo-tracking-page"),
                    a = (0,
                    i.urlAddParameter)(a, "utm_campaign", "malomo-page-link")),
                    a
                }
                learnMore(e, t) {
                    if (C.Y.isAdminPreview())
                        return window.postMessage({
                            action: "iframe:widget-learn-more",
                            payload: {}
                        }),
                        null;
                    const n = this;
                    if (n.hasLearnMore()) {
                        const r = n.learnMoreURL(e);
                        if (P.J.trackGA("Rebuy", "Viewed Product", e.title, (0,
                        i.amountToCents)(e.selected_variant.price), !0),
                        P.J.trackEvent({
                            subject: "user",
                            verb: "tapped",
                            noun: "product",
                            label: e.title,
                            value: (0,
                            i.amountToCents)(e.selected_variant.price),
                            shopify_product_id: e.id,
                            shopify_product_title: e.title,
                            shopify_product_handle: e.handle,
                            shopify_variant_id: e.selected_variant.id,
                            shopify_variant_title: e.selected_variant.title,
                            shopify_variant_price: (0,
                            i.amountToCents)(e.selected_variant.price),
                            shopify_variant_sku: e.selected_variant.sku,
                            widget_id: n.id
                        }),
                        v.Widget.callbacks.view(e, n),
                        n.data.settings.tracking.enable_product_discovery && P.J.recordDiscoveryProduct(e.handle, {
                            widget: n.id
                        }),
                        "tapcart" === C.Y.context() && t)
                            return t.preventDefault(),
                            void window.Tapcart.actions.openProduct({
                                productId: `${e.id}`
                            });
                        setTimeout((function() {
                            null == C.Y.context() ? window.open(r, "_blank") : window.location = r
                        }
                        ), 100)
                    }
                }
                addToCartData(e, t) {
                    const n = this
                      , r = window.Rebuy;
                    let a = {};
                    if (!0 === t)
                        if (a.key = r.shop.api_key,
                        a.quantity = e.quantity,
                        e.subscription && !E.sellingPlanEnabled()) {
                            let t = e.subscription_interval.toLowerCase();
                            "s" === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)),
                            a.shopify_variant_id = e.selected_variant.subscription_variant_id,
                            a.charge_interval_frequency = e.subscription_frequency,
                            a.order_interval_frequency = e.subscription_frequency,
                            a.order_interval_unit = t
                        } else if (e.subscription && E.sellingPlanEnabled()) {
                            if (a.shopify_variant_id = e.selected_variant.id,
                            a.charge_interval_frequency = e.subscription_frequency,
                            a.order_interval_frequency = e.subscription_frequency,
                            a.order_interval_unit = e.subscription_interval,
                            C.Y.isRechargeCustomerPortal()) {
                                let e = a.order_interval_frequency
                                  , t = a.order_interval_unit;
                                const n = Number(e) === parseInt(e)
                                  , isValidUnit = e => ["day", "week", "month"].includes(e);
                                if (!isValidUnit(t)) {
                                    const e = a.order_interval_frequency.match(/(day|week|month)/i);
                                    e && (t = e[0].toLowerCase(),
                                    isValidUnit(t) && (a.order_interval_unit = t))
                                }
                                if (!n) {
                                    const t = a.order_interval_frequency.match(/(\d+)/);
                                    t && (e = t[0],
                                    a.charge_interval_frequency = e,
                                    a.order_interval_frequency = e)
                                }
                            }
                        } else
                            a.shopify_variant_id = e.selected_variant.id;
                    else
                        a.quantity = e.quantity,
                        e.subscription && !E.sellingPlanEnabled() ? a.id = e.selected_variant.subscription_variant_id : e.subscription && E.sellingPlanEnabled() ? (a.id = e.selected_variant.id,
                        a.selling_plan = e.subscription_id) : a.id = e.selected_variant.id;
                    if (e.subscription && !E.sellingPlanEnabled() && (a.properties = {
                        subscription_id: e.subscription_id,
                        shipping_interval_frequency: e.subscription_frequency,
                        shipping_interval_unit_type: e.subscription_interval
                    }),
                    (0,
                    i.isBundleBuilderWidget)(n) && "subscription" === n.data.selected_purchase_type) {
                        const t = n.data.selected_interval
                          , r = (0,
                        i.findMatchingSellingPlanBasedOnInterval)(e, t);
                        r && (a.selling_plan = r.id)
                    }
                    return e.properties && (a.properties = Object.assign({}, e.properties, a.properties)),
                    e.selected_variant.properties && (a.properties = Object.assign({}, e.selected_variant.properties, a.properties)),
                    a = n.addWidgetLineItemProperties(a),
                    a
                }
                addWidgetLineItemProperties(e) {
                    var t, n, r;
                    const i = this
                      , a = {
                        _source: "Rebuy",
                        _widget_id: i.id
                    };
                    switch (i.data.config.type) {
                    case "cart":
                        a._attribution = l.s9.WIDGET_TYPES.CART;
                        break;
                    case "product":
                        a._attribution = l.s9.WIDGET_TYPES.PRODUCT;
                        break;
                    case "product_upsell":
                        a._attribution = l.s9.WIDGET_TYPES.PRODUCT_UPSELL;
                        break;
                    case "switch_to_subscription":
                        a._attribution = l.s9.WIDGET_TYPES.SWITCH_TO_SUBSCRIPTION;
                        break;
                    case "bundle":
                        a._attribution = l.s9.WIDGET_TYPES.BUNDLE;
                        break;
                    case "shopify_checkout":
                        a._attribution = l.s9.WIDGET_TYPES.SHOPIFY_CHECKOUT;
                        break;
                    case "shopify_post_purchase":
                        a._attribution = l.s9.WIDGET_TYPES.SHOPIFY_POST_PURCHASE;
                        break;
                    case "recharge_checkout":
                        a._attribution = l.s9.WIDGET_TYPES.RECHARGE_CHECKOUT;
                        break;
                    case "recharge_customer_portal":
                        a._attribution = l.s9.WIDGET_TYPES.RECHARGE_CUSTOMER_PORTAL;
                        break;
                    case "recharge_post_purchase":
                        a._attribution = l.s9.WIDGET_TYPES.RECHARGE_POST_PURCHASE;
                        break;
                    case "gift_with_purchase":
                        a._attribution = l.s9.WIDGET_TYPES.GIFT_WITH_PURCHASE,
                        i.data.config.hide_quantity_selector && (a[l.LX.HIDE_QUANTITY_SELECTOR] = "true");
                        break;
                    case "dynamic_bundle":
                        a._attribution = l.s9.WIDGET_TYPES.DYNAMIC_BUNDLE;
                        break;
                    case "pre_purchase":
                        a._attribution = l.s9.WIDGET_TYPES.PRE_PURCHASE;
                        break;
                    case "product_addon":
                        a._attribution = l.s9.WIDGET_TYPES.PRODUCT_ADDON;
                        break;
                    case "bundle_builder":
                        e.selling_plan ? a._attribution = l.s9.WIDGET_TYPES.BUNDLE_BUILDER_SUBSCRIPTION : a._attribution = l.s9.WIDGET_TYPES.BUNDLE_BUILDER
                    }
                    if (i.data.config.association && ("malomo" === i.data.config.association ? a._attribution = l.s9.WIDGET_CONTEXTS.MALOMO : "wonderment" === i.data.config.association && (a._attribution = l.s9.WIDGET_CONTEXTS.WONDERMENT)),
                    "tapcart" === C.Y.context() && (a._attribution = `${l.s9.WIDGET_CONTEXTS.TAPCART_PREFIX}${a._attribution}`),
                    "dynamic_bundle" === i.data.config.type && "none" !== (null == (t = i.data.config.discount) ? void 0 : t.type) && null != (n = i.data.config.discount) && null != (r = n.protection) && r.enabled) {
                        const e = i.data.products.length
                          , t = i.data.config.discount.protection.allowed_removals || 0
                          , n = Math.max(e - t, 1)
                          , r = Date.now();
                        a[l.LX.BUNDLE_PROTECTION] = `${n}:${r}`
                    }
                    return e.properties = Object.assign({}, e.properties, a),
                    !1 === i.data.config.tracking.enable_source && delete e.properties._source,
                    "gift_with_purchase" !== i.data.settings.type && !1 === i.data.config.tracking.enable_widget && delete e.properties._widget_id,
                    !1 === i.data.config.tracking.enable_attribution && delete e.properties._attribution,
                    e
                }
                addToCart(e, t) {
                    const n = this;
                    t = t || function() {}
                    ;
                    const r = C.Y.context();
                    "admin_preview" !== r ? "shopify" === r ? n.addToShopifyCart(e, t) : "recharge" === r ? n.addToReChargeCheckout(e, t) : "recharge_customer_portal" === r && "recharge_customer_portal" === n.data.config.type ? n.addToRechargeShipment(e, t) : "tapcart" === r ? n.addToTapcartApp(e, t) : n.addToCartProxy(e, t) : C.Y.isSmartCartPreview() && _assertClassBrand(L, n, _addToSmartCartPreview).call(n, e, t)
                }
                addToShopifyCart(e, t) {
                    const n = this
                      , r = window.Rebuy.SmartCart;
                    let o = !1;
                    t = t || function() {}
                    ,
                    "shopify_post_purchase" === n.data.config.type && "draft_order" === n.data.config.redirect && (C.Y.isShopifyThankYou() || C.Y.isShopifyOrderConfirmation()) && (o = !0),
                    e.status = "adding";
                    const s = e.subscription && e.subscription_product_id ? e.subscription_product_id : e.id
                      , l = e.subscription && e.selected_variant.subscription_variant_id ? e.selected_variant.subscription_variant_id : e.selected_variant.id
                      , c = e.subscription && e.selected_variant.subscription_variant_price ? e.selected_variant.subscription_variant_price : e.selected_variant.price
                      , u = {
                        subject: "user",
                        verb: "added",
                        noun: "product",
                        label: e.title,
                        value: (0,
                        i.amountToCents)(c),
                        shopify_product_id: s,
                        shopify_product_title: e.title,
                        shopify_product_handle: e.handle,
                        shopify_variant_id: l,
                        shopify_variant_title: e.selected_variant.title,
                        shopify_variant_price: (0,
                        i.amountToCents)(c),
                        widget_id: n.id
                    }
                      , success = function(a) {
                        e.status = "added",
                        P.J.trackGA("Rebuy", "Added Product", e.title, (0,
                        i.amountToCents)(c)),
                        P.J.trackEvent(u),
                        n.trackABWidgetAddToCart(e, l),
                        "cart" === n.data.config.redirect ? r && "ready" === r.status ? m.log("Item added will not redirect when Smart Cart is enabled and the widget has setting of Redirect to Cart.") : p.Z.goToCartPage() : "checkout" === n.data.config.redirect ? n.checkout() : "close" === n.data.config.redirect ? n.hide() : m.log("Item added page will not redirect - your widget is configured for asynchronous add to cart."),
                        n.refreshShopifyCheckout(),
                        t(e),
                        v.Widget.callbacks.add(e, n),
                        "pre_purchase" !== n.data.config.type && setTimeout((function() {
                            e.status = "ready"
                        }
                        ), 1500)
                    }
                      , error = function(t) {
                        m.log("Oh no error!"),
                        m.log(t),
                        e.status = "ready"
                    };
                    if (v.Widget.callbacks.beforeAdd(e, n),
                    o) {
                        const t = window.Shopify
                          , r = f.H.get("cart");
                        if (t) {
                            var d;
                            const o = {
                                key: Rebuy.shop.api_key,
                                shop: Rebuy.shop.myshopify_domain,
                                customer_id: (null == t || null == (d = t.checkout) ? void 0 : d.customer_id) || "",
                                shopify_product_id: s,
                                shopify_variant_id: l,
                                quantity: e.quantity,
                                widget_id: n.id,
                                cart_token: r
                            };
                            a.callAPI("POST", "/draft_order/post_do", o).then((function(t) {
                                e.status = "added",
                                P.J.trackGA("Rebuy", "Added Product", e.title, (0,
                                i.amountToCents)(c)),
                                P.J.trackEvent(u),
                                n.trackABWidgetAddToCart(e, l),
                                e.status = "ready",
                                t.url ? setTimeout(( () => {
                                    window.location = t.url
                                }
                                ), 500) : m.log("Missing location URL!")
                            }
                            ), a.callError)
                        } else
                            m.log("Missing Shopify Object!")
                    } else {
                        const r = n.addToCartData(e)
                          , a = {
                            params: {
                                method: "POST",
                                url: E.routeRoot() + "cart/add.js",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: (0,
                                i.isObject)(r) ? JSON.stringify(r) : r,
                                success,
                                error
                            },
                            callback: t
                        };
                        n.addToRequestQueue(a)
                    }
                }
                addToCartProxy(e, t) {
                    const n = this
                      , r = window.Rebuy;
                    t = t || function() {}
                    ,
                    e.status = "adding";
                    const a = e.subscription && e.subscription_product_id ? e.subscription_product_id : e.id
                      , o = e.subscription && e.selected_variant.subscription_variant_id ? e.selected_variant.subscription_variant_id : e.selected_variant.id
                      , s = e.subscription && e.selected_variant.subscription_variant_price ? e.selected_variant.subscription_variant_price : e.selected_variant.price
                      , l = n.addToCartData(e);
                    "cart" === n.data.config.redirect ? l.redirect = "cart" : "checkout" === n.data.config.redirect && (l.redirect = "checkout"),
                    v.Widget.callbacks.beforeAdd(e, n);
                    const c = new URL(`https://${r.shop.domain}/apps/rebuy/cart`);
                    c.search = new URLSearchParams((0,
                    i.urlSerializeDeep)(l)),
                    window.open(c, "_blank"),
                    P.J.trackGA("Rebuy", "Added Product", e.title, (0,
                    i.amountToCents)(s)),
                    P.J.trackEvent({
                        subject: "user",
                        verb: "added",
                        noun: "product",
                        label: e.title,
                        value: (0,
                        i.amountToCents)(s),
                        shopify_product_id: a,
                        shopify_product_title: e.title,
                        shopify_product_handle: e.handle,
                        shopify_variant_id: o,
                        shopify_variant_title: e.selected_variant.title,
                        shopify_variant_price: (0,
                        i.amountToCents)(s),
                        widget_id: n.id
                    }),
                    n.trackABWidgetAddToCart(e, o),
                    e.status = "added",
                    setTimeout((function() {
                        e.status = "ready",
                        t(e),
                        v.Widget.callbacks.add(e, n)
                    }
                    ), 1500)
                }
                addUpsellToCart(e, t) {
                    const n = this
                      , r = Object.assign({}, n.data.tails.added_item);
                    let a;
                    "switch_to_subscription" === n.data.config.type && (a = E.sellingPlanEnabled() ? r.variant_id : e.selected_variant.subscription_variant_id);
                    const o = r && Object.keys(r).length ? r.key : r.variant_id ? r.variant_id : e.selected_variant_id;
                    t = t || function() {}
                    ,
                    e.status = "adding",
                    p.Z.call.push((function() {
                        let s = {};
                        s.params = {
                            method: "POST",
                            url: E.routeRoot() + "cart/change.js",
                            body: JSON.stringify({
                                id: `${o}`,
                                quantity: 0
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            },
                            meta: {
                                item: r
                            },
                            success: e => {
                                m.log("Added item removed"),
                                m.log(e)
                            }
                            ,
                            error: e => {
                                console.error(e)
                            }
                        },
                        "switch_to_subscription" === n.data.config.type && r.quantity && (e.quantity = r.quantity),
                        n.addToRequestQueue(s);
                        const l = e.subscription && e.subscription_product_id ? e.subscription_product_id : e.id;
                        let c = e.subscription && e.selected_variant.subscription_variant_id ? e.selected_variant.subscription_variant_id : e.selected_variant.id;
                        const u = e.subscription && e.selected_variant.subscription_variant_price ? e.selected_variant.subscription_variant_price : e.selected_variant.price;
                        r.properties && (e.properties = Object.assign({}, r.properties, e.properties));
                        const d = n.addToCartData(e);
                        "switch_to_subscription" === n.data.config.type && (c = d.id = e.subscription && a ? a : c);
                        v.Widget.callbacks.beforeAdd(e, n),
                        s = {
                            params: {
                                method: "POST",
                                url: E.routeRoot() + "cart/add.js",
                                body: (0,
                                i.isObject)(d) ? JSON.stringify(d) : d,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                success: function(r) {
                                    m.log("Upsell item added"),
                                    m.log(r),
                                    e.status = "added",
                                    P.J.trackGA("Rebuy", "Added Product", e.title, (0,
                                    i.amountToCents)(u)),
                                    P.J.trackEvent({
                                        subject: "user",
                                        verb: "added",
                                        noun: "product",
                                        label: e.title,
                                        value: (0,
                                        i.amountToCents)(u),
                                        shopify_product_id: l,
                                        shopify_product_title: e.title,
                                        shopify_product_handle: e.handle,
                                        shopify_variant_id: c,
                                        shopify_variant_title: e.selected_variant.title,
                                        shopify_variant_price: (0,
                                        i.amountToCents)(u),
                                        widget_id: n.id
                                    }),
                                    n.trackABWidgetAddToCart(e),
                                    "cart" === n.data.config.redirect ? p.Z.goToCartPage() : "checkout" === n.data.config.redirect ? n.checkout() : "close" === n.data.config.redirect ? n.hide() : m.log("Item added page will not redirect - your widget is configured for asynchronous add to cart."),
                                    "popup" === n.data.config.display_type && (n.data.visible = !1),
                                    n.refreshShopifyCheckout(),
                                    t(e),
                                    v.Widget.callbacks.add(e, n),
                                    setTimeout((function() {
                                        e.status = "ready"
                                    }
                                    ), 1500)
                                },
                                error: function(t) {
                                    m.log("Oh no error!"),
                                    m.log(t),
                                    e.status = "ready"
                                }
                            },
                            callback: t
                        },
                        (0,
                        i.wait)(( () => n.addToRequestQueue(s)), 500)
                    }
                    ))
                }
                addToTapcartApp(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    n.requestQueueStatus = "working";
                    const r = (0,
                    i.isArray)(e) ? e : [e]
                      , a = [];
                    for (let e of r) {
                        e.status = "adding",
                        e.selected_variant && (e = n.addToCartData(e));
                        const t = {
                            variantId: `${e.id}`,
                            quantity: e.quantity,
                            attributes: []
                        };
                        e.subscription && e.subscription_id && (t.sellingPlanId = `${e.subscription_id}`);
                        const r = e.properties;
                        for (const e in r) {
                            const n = {
                                key: e,
                                value: r[e]
                            };
                            t.attributes.push(n)
                        }
                        a.push(t)
                    }
                    try {
                        window.Tapcart.actions.addToCart({
                            lineItems: a
                        });
                        for (const e of r)
                            e.status = "ready";
                        n.requestQueueStatus = "ready",
                        t()
                    } catch (e) {
                        m.error("There was an issue adding to Tapcart", e),
                        window.Tapcart.actions.showToast({
                            message: "There was an issue adding to cart.",
                            type: "error"
                        })
                    }
                }
                removeFromCart(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    "shopify" === C.Y.context() ? n.removeFromShopifyCart(e, t) : "recharge" === C.Y.context() && n.removeFromReChargeCart(e, t)
                }
                removeFromCartAtIndex(e, t) {
                    const n = this;
                    t = t || function() {}
                    ,
                    "shopify" === C.Y.context() ? n.removeFromShopifyCartAtIndex(e, t) : "recharge" === C.Y.context() && n.removeFromReChargeCartAtIndex(e, t)
                }
                removeFromShopifyCart(e, t) {
                    const n = this;
                    t = t || ( () => {}
                    ),
                    e.status = "removing";
                    const r = n.getProductIndex(e, n.data.cart.items)
                      , a = {
                        id: `${n.data.cart.items[r].key}`,
                        quantity: 0
                    };
                    v.Widget.callbacks.beforeRemove(e, n);
                    const o = {
                        params: {
                            method: "POST",
                            url: E.routeRoot() + "cart/change.js",
                            body: (0,
                            i.isObject)(a) ? JSON.stringify(a) : a,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            success: function(r) {
                                e.status = "removed",
                                P.J.trackGA("Rebuy", "Removed Product", e.title, e.selected_variant.price),
                                n.refreshShopifyCheckout(),
                                t(e),
                                v.Widget.callbacks.remove(e, n),
                                setTimeout((function() {
                                    e.status = "ready"
                                }
                                ), 1500)
                            },
                            error: function(t) {
                                m.log("Oh no error!"),
                                m.log(t),
                                e.status = "ready"
                            }
                        },
                        callback: t
                    };
                    n.addToRequestQueue(o)
                }