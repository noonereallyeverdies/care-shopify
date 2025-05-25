
                declineLabel() {
                    var e, t, n;
                    return null == (e = this.Widget.data) || null == (t = e.config) || null == (n = t.language) ? void 0 : n.decline
                }
                declinePrepurchaseOffer() {
                    this.Widget.hide(),
                    window.Rebuy.Cart.checkout()
                }
                continueLabel() {
                    var e, t, n;
                    return null == (e = this.Widget.data) || null == (t = e.config) || null == (n = t.language) ? void 0 : n.continue
                }
                upgradeToSubscriptionLabel(e) {
                    var t, n, r;
                    const a = this.Widget.getSubscriptionDiscount(e);
                    let o, s = null == (t = this.Widget.data) || null == (n = t.config) || null == (r = n.language) ? void 0 : r.upgrade_to_subscription;
                    var l, c, u, d, p, f;
                    E.sellingPlanEnabled() ? o = "percentage" === a.type ? (0,
                    i.formatNumber)(a.amount, 0) : null != (l = e.selected_variant) && null != (c = l.selling_plan_allocations) && null != (u = c[0]) && u.price && null != (d = e.selected_variant) && null != (p = d.selling_plan_allocations) && null != (f = p[0]) && f.compare_at_price ? (0,
                    i.formatNumber)(100 * (1 - parseFloat(e.selected_variant.selling_plan_allocations[0].price) / e.selected_variant.selling_plan_allocations[0].compare_at_price), 0) : "fixed" === a.type || "fixed_amount" === a.type ? (0,
                    i.formatNumber)(1 - parseFloat(e.selected_variant.price - a.amount / e.selected_variant.price), 0) : "price" === a.type || "amount" === a.type ? (0,
                    i.formatNumber)(1 - parseFloat(a.amount / e.selected_variant.price), 0) : 0 : o = (0,
                    i.formatNumber)(e.subscription_discount, 0);
                    return s = a ? s.replace("{{subscription_discount}}", o) : s.replace("{{subscription_discount}}", ""),
                    s
                }
                upgradeToSubscriptionAriaLabel(e) {
                    return `${e.title}: ${this.upgradeToSubscriptionLabel(e)}`
                }
                switchCartToOnetimeLabel() {
                    var e, t, n;
                    return null == (e = this.Widget.data) || null == (t = e.config) || null == (n = t.language) ? void 0 : n.cart_switch_to_onetime
                }
                switchCartToSubscriptionLabel() {
                    var e, t, n, r, i;
                    let a = this.Widget.getSubscriptionDiscount();
                    if (null === a && (null == (e = Rebuy.Cart) || null == (t = e.cart) ? void 0 : t.items.length) > 0)
                        for (const e of Rebuy.Cart.cart.items) {
                            var o, s;
                            if (null != (o = e.product) && o.subscription_discount_amount && null != (s = e.product) && s.subscription_discount_type) {
                                a = {
                                    amount: e.product.subscription_discount_amount.toString().split(".")[0],
                                    type: e.product.subscription_discount_type.toString()
                                };
                                break
                            }
                        }
                    return (null == (n = this.Widget.data) || null == (r = n.config) || null == (i = r.language) ? void 0 : i.cart_switch_to_subscription).replace("{{subscription_discount}}", a ? a.amount : "")
                }
                cartHasProduct(e) {
                    return this.Widget.cartHasProduct(e)
                }
                rechargeCheckoutHasProduct(e) {
                    return this.Widget.rechargeCheckoutHasProduct(e)
                }
                displayColorSwatches(e) {
                    var t, n, r, i, o, s;
                    if (["recharge_post_purchase", "recharge_checkout"].includes(this.Widget.data.settings.type) || !e)
                        return m.error(e),
                        !1;
                    let l = !1
                      , c = "";
                    return null != (t = window.trekkie) && null != (n = t.trekkie) && null != (r = n.defaultAttributes) && r.themeId ? c = window.trekkie.trekkie.defaultAttributes.themeId : window.Shopify ? c = window.Shopify.theme.id : C.Y.isAdminPreview() && (c = window.theme_id),
                    "color" !== e.name.toLowerCase() && "colour" !== e.name.toLowerCase() || "buttons" !== (null == (i = this.Widget.data) || null == (o = i.settings) || null == (s = o.view_options) ? void 0 : s.variant_selector) || (l = !0,
                    c && a.callAPI("GET", `/v1_theme/id/${c}`, {
                        key: window.Rebuy.shop.api_key
                    }).then((e => {
                        let t = [];
                        e && (t = e.filter((e => e.key.includes("assets/") && e.key.includes("color-")))),
                        t.length > 0 && t.forEach(( (e, t) => {
                            var n;
                            const r = e.key.split("color-").pop();
                            let i = null;
                            r.includes(".jpg") ? i = r.split(".jpg").shift() : r.includes(".jpeg") ? i = r.split(".jpeg").shift() : r.includes(".png") && (i = r.split(".png").shift()),
                            null == (n = document.querySelectorAll(`#rebuy-widget-${this.Widget.id} .rebuy-color-swatch input`)) || n.forEach(( (t, n) => {
                                t.value.toLowerCase() === i && (t.nextElementSibling.style.backgroundImage = `url(${e.public_url})`)
                            }
                            ))
                        }
                        ))
                    }
                    ), a.callError)),
                    l
                }
                displaySizeSwatches(e) {
                    var t, n, r, i, a, o, s, l;
                    let c = !1;
                    return "recharge_post_purchase" === (null == (t = this.Widget.data) || null == (n = t.settings) ? void 0 : n.type) && "recharge_checkout" === (null == (r = this.Widget.data) || null == (i = r.settings) ? void 0 : i.type) || "buttons" !== (null == (a = this.Widget.data) || null == (o = a.settings) || null == (s = o.view_options) ? void 0 : s.variant_selector) || "size" !== (null == e || null == (l = e.name) ? void 0 : l.toLowerCase()) || (c = !0),
                    c
                }
                selectVariant(e) {
                    var t, n, r, a, o, s, l;
                    const c = this.Widget;
                    let u = null;
                    for (let t = 0; t < e.variants.length; t++)
                        if (e.variants[t].id === e.selected_variant_id) {
                            u = e.variants[t];
                            break
                        }
                    if (this.hasProductGroup(e)) {
                        const t = u.product_id;
                        e.selected_product_group_id = t,
                        e.id = t;
                        const n = e.product_group_variants.find(( ({id: e}) => e === t));
                        e.image = n.image
                    }
                    if (e.selected_variant = u,
                    null != (t = c.data) && null != (n = t.config) && null != (r = n.discount) && r.show_saving_amount) {
                        let t = {};
                        const n = "original_price" !== c.data.config.discount.discounted_from;
                        "none" !== c.data.config.discount.type && (t = {
                            ...c.data.config.discount,
                            discountType: "one-time"
                        }),
                        e.selected_variant.rebuy_calculated_discount = (0,
                        i.calculateDiscount)(e, n, [t])
                    }
                    E.shopifySellingPlansEnabled() && (null == (a = e.selected_variant) || null == (o = a.selling_plan_allocations) ? void 0 : o.length) > 0 ? ((0,
                    i.initializeSelectedVariantSellingPlans)(e),
                    e.subscription_id = e.selected_variant.selling_plan_allocations[0].selling_plan_id,
                    e.subscription_frequencies = e.selected_variant.subscription_frequencies || [],
                    e.subscription_frequency = e.subscription_frequencies[0]) : E.shopifySellingPlansEnabled() && (null == (s = e.selected_variant) || null == (l = s.selling_plan_allocations) ? void 0 : l.length) <= 0 && e.has_subscription && (e.subscription = !1,
                    e.subscription_id = null,
                    e.subscription_frequencies = [],
                    e.subscription_frequency = "onetime",
                    e.subscription_discount_type = null,
                    e.subscription_discount_amount = null),
                    this.selectOptionsForVariant(e),
                    (0,
                    i.isBundleBuilderWidget)(c) && this.vue.$forceUpdate(),
                    v.Widget.callbacks.selectedVariantChange(u, e, c)
                }
                selectVariantByColor(e, t, n) {
                    var r;
                    const i = null == (r = document.querySelector(`#rebuy-widget-${this.Widget.id} .${e.handle} .rebuy-size-input:checked`)) ? void 0 : r.value;
                    let a = i ? `${t} / ${i}` : `${t}`
                      , o = this.selectVariantByName(n, a);
                    if (o || (a = i ? `${i} / ${t}` : `${t}`,
                    o = this.selectVariantByName(n, a)),
                    o) {
                        const t = document.querySelectorAll(`#rebuy-widget-${this.Widget.id} .rebuy-select`)
                          , [r] = [...t].filter((e => e.id.includes(`${this.Widget.id}-select-${n}`)));
                        r ? r.value = o : m.error("Select element not found for selector: ", `#${this.Widget.id}-select-${n}`),
                        e.selected_variant = o,
                        e.selected_variant_id = o
                    }
                    this.selectVariant(e)
                }
                selectVariantBySize(e, t, n) {
                    var r;
                    const i = null == (r = document.querySelector(`#rebuy-widget-${this.Widget.id} .${e.handle} .rebuy-color-input:checked`)) ? void 0 : r.value;
                    let a = i ? `${i} / ${t}` : `${t}`
                      , o = this.selectVariantByName(n, a);
                    if (o || (a = i ? `${t} / ${i}` : `${t}`,
                    o = this.selectVariantByName(n, a)),
                    o) {
                        const t = document.querySelectorAll(`#rebuy-widget-${this.Widget.id} .rebuy-select`)
                          , [r] = [...t].filter((e => e.id.includes(`${this.Widget.id}-select-${n}`)));
                        r ? r.value = o : m.error("Select element not found for selector: ", `#${this.Widget.id}-select-${n}`),
                        e.selected_variant = o,
                        e.selected_variant_id = o
                    }
                    this.selectVariant(e)
                }
                selectVariantByName(e, t) {
                    var n;
                    let r;
                    return null == (n = [...document.querySelectorAll(`#rebuy-widget-${this.Widget.id} .rebuy-select > option`)].filter((t => t.closest("select").id.includes(`${this.Widget.id}-select-${e}`)))) || n.forEach(( (e, n) => {
                        e.textContent.trim() === t && (r = parseInt(e.value))
                    }
                    )),
                    r
                }
                selectOptionsForVariant(e) {
                    for (let t = 1; t <= 3; t++) {
                        const n = "option" + t;
                        e[n] = e.selected_variant ? e.selected_variant[n] : null
                    }
                }
                selectVariantOption(e, t, n) {
                    e[t] = n,
                    this.selectVariantForOptions(e)
                }
                selectVariantForOptions(e) {
                    let t = null;
                    for (let n, r = 0; r < e.variants.length; r++)
                        if (n = e.variants[r],
                        n.option1 === e.option1 && n.option2 === e.option2 && n.option3 === e.option3) {
                            t = n;
                            break
                        }
                    null === t && (e.selected_variant_id = null),
                    e.selected_variant = t
                }
                variantOptionAvailable(e, t, n) {
                    const r = {
                        option1: e.option1,
                        option2: e.option2,
                        option3: e.option3
                    };
                    let i = !1;
                    r[t] = n;
                    let a = null;
                    for (let t, n = 0; n < e.variants.length; n++)
                        if (t = e.variants[n],
                        t.option1 === r.option1 && t.option2 === r.option2 && t.option3 === r.option3) {
                            a = t;
                            break
                        }
                    return a && this.variantAvailable(a) && (i = !0),
                    i
                }
                hasSubscription(e) {
                    return this.Widget.hasSubscription(e)
                }
                toggleSubscription(e) {
                    this.Widget.toggleSubscription(e),
                    setTimeout(( () => {
                        this.resizeCarousel()
                    }
                    ), 0)
                }
                selectSubscription(e, t) {
                    this.Widget.selectSubscription(e, t)
                }
                selectOnetime(e) {
                    this.Widget.selectOnetime(e)
                }
                productIsSelected(e) {
                    return this.Widget.productIsSelected(e)
                }
                toggleProductSelect(e) {
                    this.Widget.toggleProductSelect(e)
                }
                hasLearnMore() {
                    return this.Widget.hasLearnMore()
                }
                learnMoreURL(e) {
                    return this.Widget.learnMoreURL(e)
                }
                learnMore(e, t) {
                    this.Widget.learnMore(e, t)
                }
                hasQuantityInputEnabled() {
                    return this.Widget.hasQuantityInputEnabled()
                }
                maxQuantityInputValue() {
                    return this.Widget.maxQuantityInputValue()
                }
                initCarousel() {
                    var e, t;
                    const n = this;
                    if ("recharge_checkout" === (null == (e = n.Widget.data) || null == (t = e.config) ? void 0 : t.type) || (0,
                    i.isBundleBuilderWidget)(n.Widget))
                        return;
                    const {isFlickity: r, isSplide: a} = (0,
                    i.getCarousel)();
                    r ? n.initCarouselFlickity() : a && n.initCarouselSplide()
                }
                async initCarouselFlickity() {
                    const e = this
                      , t = this.Widget
                      , {Rebuy: r} = window;
                    e.carousel_selectors = {
                        container: `#rebuy-widget-${t.id} .rebuy-product-grid`,
                        items: `#rebuy-widget-${t.id} .rebuy-product-block`,
                        list: ".flickity-slider",
                        viewport: `#rebuy-widget-${t.id} .rebuy-product-grid .flickity-viewport`
                    };
                    const {container: i} = e.carousel_selectors
                      , a = document.querySelector(i);
                    if (a) {
                        m.log(`Carousel container (${r.shop.carousel}): ${i}`, {
                            target: a
                        });
                        const {default: t} = await n.e(266).then(n.t.bind(n, 6268, 23));
                        e.carousel = new t(i,{
                            cellSelector: ".rebuy-product-block",
                            cellAlign: "left",
                            wrapAround: !0,
                            groupCells: !0,
                            lazyLoad: !0,
                            imagesLoaded: !0,
                            watchCSS: !0,
                            resize: !1,
                            on: {
                                ready: () => {
                                    setTimeout(( () => {
                                        e.manageCarouselSlides()
                                    }
                                    ), 0)
                                }
                            }
                        })
                    }
                }
                async initCarouselSplide() {
                    const e = this
                      , t = this.Widget
                      , {Rebuy: r} = window;
                    e.carousel_selectors = {
                        container: `#rebuy-widget-${t.id} .rebuy-product-grid`,
                        items: `#rebuy-widget-${t.id} .rebuy-product-block`,
                        list: ".splide__list",
                        viewport: `#rebuy-widget-${t.id} .rebuy-product-grid .splide__track`
                    };
                    const {items: a, container: o} = e.carousel_selectors
                      , s = document.querySelector(o);
                    if (s) {
                        var l;
                        if ((0,
                        i.carouselSplideAddTrack)(e.carousel_selectors))
                            null == (l = e.carousel) || l.destroy();
                        const {small: c, medium: u, large: d} = t.data.settings.layout
                          , p = document.querySelectorAll(a).length;
                        m.log(`Carousel container (${r.shop.carousel}): ${o}`, {
                            target: s,
                            totalSlides: p
                        });
                        const {Splide: f} = await n.e(486).then(n.bind(n, 440))
                          , g = {
                            768: {
                                arrows: !0,
                                destroy: d.columns >= p || !d.carousel,
                                pagination: d.show_paginations,
                                perPage: d.columns
                            },
                            481: {
                                arrows: !0,
                                destroy: u.columns >= p || !u.carousel,
                                pagination: u.show_paginations,
                                perPage: u.columns
                            },
                            1: {
                                arrows: !0,
                                destroy: c.columns >= p || !c.carousel,
                                pagination: c.show_paginations,
                                perPage: c.columns
                            }
                        };
                        e.carousel = new f(o,{
                            type: "slide",
                            rewind: !0,
                            lazyload: !0,
                            mediaQuery: "min",
                            breakpoints: g,
                            classes: {
                                arrows: "splide__arrows rebuy-carousel__arrows",
                                arrow: "splide__arrow rebuy-carousel__arrow",
                                prev: "splide__arrow--prev rebuy-carousel__arrow--prev",
                                next: "splide__arrow--next rebuy-carousel__arrow--next",
                                pagination: "splide__pagination rebuy-carousel__pagination",
                                page: "splide__pagination__page rebuy-carousel__page",
                                slide: "splide__slide rebuy-carousel__slide"
                            }
                        }),
                        e.carousel.on("mounted", ( () => {
                            var t;
                            null == (t = e.Widget) || t.restoreCarouselProducts()
                        }
                        )).mount()
                    }
                }
                manageCarouselSlides() {
                    const e = this
                      , {isFlickity: t, isSplide: n} = (0,
                    i.getCarousel)();
                    t ? e.manageCarouselSlidesFlickity() : n && e.manageCarouselSlidesSplide()
                }
                manageCarouselSlidesFlickity() {
                    var e, t, n;
                    const r = this
                      , a = this.Widget
                      , o = i.DOM.windowWidth();
                    null != (e = r.carousel) && e.slides && (r.carousel.updateDraggable(),
                    r.carousel.slides && r.carousel.slides.length < 2 ? i.DOM.addClass(r.carousel_selectors.container, "no-paging") : i.DOM.removeClass(r.carousel_selectors.container, "no-paging"),
                    o < a.data.config.breakpoints.small.max && !a.data.settings.layout.small.show_paginations || o > a.data.config.breakpoints.medium.min && o < a.data.config.breakpoints.medium.max && !a.data.settings.layout.medium.show_paginations || o > a.data.config.breakpoints.large.min && !a.data.settings.layout.large.show_paginations ? i.DOM.addClass(r.carousel_selectors.container, "hide-paging") : i.DOM.removeClass(r.carousel_selectors.container, "hide-paging"),
                    null == (t = document.querySelector(r.carousel_selectors.container)) || t.setAttribute("role", ""),
                    null == (n = document.querySelectorAll(r.carousel_selectors.container + " .rebuy-product-block")) || n.forEach((e => {
                        e.setAttribute("role", "")
                    }
                    )))
                }
                manageCarouselSlidesSplide() {
                    var e, t, n;
                    const r = this
                      , a = this.Widget
                      , o = (null == (e = r.carousel) || null == (t = e.Components) || null == (n = t.Slides) ? void 0 : n.getLength(!0)) || 0;
                    if (o >= 1) {
                        const {breakpoints: e} = a.data.config
                          , {layout: t} = a.data.settings
                          , n = document.querySelector(r.carousel_selectors.container).classList
                          , s = i.DOM.windowWidth();
                        o < 2 ? n.add("no-paging") : n.remove("no-paging"),
                        !t.small.show_paginations && s < e.small.max || !t.medium.show_paginations && s > e.medium.min && s < e.medium.max || !t.large.show_paginations && s > e.large.min ? n.add("hide-paging") : n.remove("hide-paging")
                    }
                }
                resizeCarousel() {
                    const e = this
                      , {isFlickity: t} = (0,
                    i.getCarousel)();
                    if (!(0,
                    i.isBundleBuilderWidget)(e.Widget) && t) {
                        var n;
                        const t = document.querySelector(e.carousel_selectors.viewport);
                        t && (t.style.height = "auto",
                        t.style.height = t.scrollHeight + "px"),
                        null == (n = e.carousel) || n.resize()
                    }
                }
                subtotal() {
                    return this.Widget.subtotal()
                }
                compareAtSubtotal() {
                    return this.Widget.compareAtSubtotal()
                }
                bundleOnSale() {
                    return this.Widget.bundleOnSale()
                }
                bundleSavings() {
                    return this.Widget.bundleSavings()
                }
                pushToCart(e, t, n, r) {
                    let i = !0;
                    "dynamic" === e && "ready" === n.status && n.variants.length > 1 || "default" === e && "line" === this.layout && "ready" === n.status && n.variants.length > 1 ? (i = !1,
                    n.status = "selecting") : "function" == typeof this.Widget[t] && this.Widget[t](n, r),
                    setTimeout(( () => {
                        var e, t;
                        i && this.Widget.isCartBasedWidget() && null != (e = window.Rebuy.SmartCart) && e.visible && (null == (t = document.querySelector("[data-smartcart-items]")) || t.focus())
                    }
                    ), 500)
                }
                addToCart(e, t) {
                    var n, r, i;
                    this.pushToCart(null == (n = this.Widget.data) || null == (r = n.config) || null == (i = r.product_options) ? void 0 : i.show_variant_options, "addToCart", e, t),
                    setTimeout(( () => {
                        this.resizeCarousel()
                    }
                    ), 0)
                }
                addUpsellToCart(e, t) {
                    var n, r, i;
                    this.pushToCart(null == (n = this.Widget.data) || null == (r = n.config) || null == (i = r.product_options) ? void 0 : i.show_variant_options, "addUpsellToCart", e, t),
                    setTimeout(( () => {
                        this.resizeCarousel()
                    }
                    ), 0)
                }
                addToReChargeCheckout(e, t) {
                    var n, r, i;
                    this.pushToCart(null == (n = this.Widget.data) || null == (r = n.config) || null == (i = r.product_options) ? void 0 : i.show_variant_options, "addToReChargeCheckout", e, t)
                }
                addSelectedProductsToCart(e, t) {
                    const n = this;
                    if ((0,
                    i.isBundleBuilderWidget)(n.Widget)) {
                        if (n.shouldDisableAddBundleToCart(n.Widget.data.products))
                            return;
                        t = () => {
                            v.Widget.callbacks.addBundleToCart(n.Widget.data.products, n.Widget),
                            n.Widget.data.products = [],
                            n.Widget.data.has_container_expanded = !1,
                            n.Widget.data.selected_purchase_type = "one-time",
                            n.Widget.setBundleBuilderATCStorage([], !0)
                        }
                    }
                    C.Y.isAdminPreview() ? (window.postMessage({
                        action: "iframe:widget-add-selected-products-to-cart",
                        payload: {}
                    }),
                    n.Widget.data.products = [],
                    (0,
                    i.isBundleBuilderWidget)(n.Widget) && (n.Widget.data.has_container_expanded = !1,
                    n.Widget.setBundleBuilderATCStorage([], !0))) : this.Widget.addSelectedProductsToCart(e, t)
                }
                bundleRequiresAllItems() {
                    return this.Widget.bundleRequiresAllItems()
                }
                isBundleIncomplete() {
                    return this.Widget.isBundleIncomplete()
                }
                removeFromReChargeCart(e, t) {
                    this.Widget.removeFromReChargeCart(e, t)
                }
                toggleCartSubscription() {
                    return this.Widget.toggleCartSubscription()
                }
                updateCartSubscriptionFrequency() {
                    return this.Widget.updateCartSubscriptionFrequency()
                }
                availableAddOnCount() {
                    return this.Widget.availableAddOnCount()
                }
                purchaseOffer(e, t) {
                    this.Widget.purchaseOffer(e, t)
                }
                declineOffer(e, t) {
                    this.Widget.declineOffer(e, t)
                }
                purchaseProductNow(e, t, n) {
                    this.Widget.purchaseProductNow(e, t, n)
                }
                thankYouTitle(e) {
                    return this.Widget.data.config.language.thank_you_title.replace("{{product_title}}", e.title)
                }
                thankYouDescription(e) {
                    return this.Widget.data.config.language.thank_you_description.replace("{{product_title}}", e.title)
                }
                dismissThankYou() {
                    this.Widget.dismissThankYou()
                }
                checkout() {
                    this.Widget.isPrePurchase() && this.Widget.hide(),
                    this.Widget.checkout()
                }
                filterOOSOptions(e, t) {
                    var n, r, i;
                    let a = null;
                    const o = e.values.filter((e => t.variants.some((t => t.title.includes(e)))));
                    return null != (n = this.Widget.data) && null != (r = n.config) && null != (i = r.product_options) && i.hide_out_of_stock_variants && t.options ? (t.options.forEach((t => {
                        var n, r;
                        (null == (n = t.name) ? void 0 : n.toLowerCase()) === (null == (r = e.name) ? void 0 : r.toLowerCase()) && (a = t.position)
                    }
                    )),
                    a ? o.filter((e => void 0 !== t.variants.find((t => e === t["option" + a])))) : []) : o
                }
                addProductToBundle(e, t, n) {
                    const {Widget: r} = this;
                    r.addProductToBundle(e, t, n)
                }
                addProductsToBundle(e, t) {
                    const {Widget: n} = this;
                    return n.addProductsToBundle(e, t)
                }
                handleRemovingProductFromBundle(e) {
                    const t = this;
                    (0,
                    i.isBundleBuilderWidget)(t.Widget) && (v.Widget.callbacks.removeProductFromBundle(t.Widget.data.products[e], t.Widget),
                    t.Widget.handleRemovingProductFromBundle(e))
                }
                handleExpandingBundleContainer() {
                    const e = this;
                    (0,
                    i.isBundleBuilderWidget)(e.Widget) && (e.Widget.data.has_container_expanded = !e.Widget.data.has_container_expanded,
                    e.Widget.data.has_container_expanded ? i.DOM.addClass("body", "rebuy-modal-visible rebuy-bundle-builder-container-visible") : i.DOM.removeClass("body", "rebuy-modal-visible rebuy-bundle-builder-container-visible"))
                }
                getBundleBuilderLayoutClasses(e) {
                    const {Widget: t} = this
                      , n = ["large", "medium", "small"];
                    return (0,
                    i.isBundleBuilderWidget)(t) ? n.reduce(( (n, r) => {
                        var i;
                        const a = null != e && null != (i = e.overrides) && i.product_display ? e.product_display.breakpoints[r] : t.data.config.breakpoints[r];
                        if (a) {
                            const e = `${r}-columns`;
                            n.push("boolean" == typeof a ? e : `${e}-${a}`)
                        }
                        return n
                    }
                    ), []) : ""
                }
                shouldRenderBundleStep(e) {
                    const {Widget: t} = this;
                    return !t.isBundleBuilderTabLayout() || t.data.active_step_index === e
                }
            }
            n(4949),
            n(8787);
            const isDate = e => e instanceof Date
              , isEmpty = e => 0 === Object.keys(e).length
              , isObject = e => null != e && "object" == typeof e
              , utils_hasOwnProperty = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t)
              , isEmptyObject = e => isObject(e) && isEmpty(e)
              , makeObjectWithoutPrototype = () => Object.create(null)
              , addedDiff = (e, t) => e !== t && isObject(e) && isObject(t) ? Object.keys(t).reduce(( (n, r) => {
                if (utils_hasOwnProperty(e, r)) {
                    const i = addedDiff(e[r], t[r]);
                    return isObject(i) && isEmpty(i) || (n[r] = i),
                    n
                }
                return n[r] = t[r],
                n
            }
            ), makeObjectWithoutPrototype()) : {}
              , x = addedDiff
              , deletedDiff = (e, t) => e !== t && isObject(e) && isObject(t) ? Object.keys(e).reduce(( (n, r) => {
                if (utils_hasOwnProperty(t, r)) {
                    const i = deletedDiff(e[r], t[r]);
                    return isObject(i) && isEmpty(i) || (n[r] = i),
                    n
                }
                return n[r] = void 0,
                n
            }
            ), makeObjectWithoutPrototype()) : {}
              , R = deletedDiff
              , updatedDiff = (e, t) => e === t ? {} : isObject(e) && isObject(t) ? isDate(e) || isDate(t) ? e.valueOf() == t.valueOf() ? {} : t : Object.keys(t).reduce(( (n, r) => {
                if (utils_hasOwnProperty(e, r)) {
                    const i = updatedDiff(e[r], t[r]);
                    return !isEmptyObject(i) || isDate(i) || !isEmptyObject(e[r]) && isEmptyObject(t[r]) ? (n[r] = i,
                    n) : n
                }
                return n
            }
            ), makeObjectWithoutPrototype()) : t
              , D = updatedDiff
              , detailed = (e, t) => ({
                added: x(e, t),
                deleted: R(e, t),
                updated: D(e, t)
            });
            var A, I = n(3886), O = n.n(I);
            function _classPrivateFieldInitSpec(e, t, n) {
                _checkPrivateRedeclaration(e, t),
                t.set(e, n)
            }
            function _checkPrivateRedeclaration(e, t) {
                if (t.has(e))
                    throw new TypeError("Cannot initialize the same private elements twice on an object")
            }
            function _classPrivateFieldSet(e, t, n) {
                return e.set(_assertClassBrand(e, t), n),
                n
            }
            function _classPrivateFieldGet(e, t) {
                return e.get(_assertClassBrand(e, t))
            }
            function _assertClassBrand(e, t, n) {
                if ("function" == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : n;
                throw new TypeError("Private element is not present on this object")
            }
            !function(e) {
                e.FUNCTIONS = "functions",
                e.OTHER = "other"
            }(A || (A = {}));
            var L = new WeakSet
              , W = new WeakMap
              , N = new WeakMap
              , M = new WeakMap
              , $ = new WeakMap;
            class Widget {
                constructor(e) {
                    if (function _classPrivateMethodInitSpec(e, t) {
                        _checkPrivateRedeclaration(e, t),
                        t.add(e)
                    }(this, L),
                    _classPrivateFieldInitSpec(this, W, (e => l.qm.PRODUCT_HANDLE.replace(":productHandle", e))),
                    _classPrivateFieldInitSpec(this, N, {}),
                    _classPrivateFieldInitSpec(this, M, !1),
                    _classPrivateFieldInitSpec(this, $, ( (e, t, n) => {
                        const r = (0,
                        S.getActiveCurrencyCode)()
                          , i = null != n ? n : r;
                        return (null == e ? void 0 : e.discounted_by) !== A.FUNCTIONS && "none" !== (null == e ? void 0 : e.type) && "compare_at_price" === e.discounted_from && t.compare_at_price ? new Money(t.compare_at_price,i) : new Money(t.price,i)
                    }
                    )),
                    e.dataset.initialized)
                        return m.log("DOM element is already initialized", e),
                        null;
                    this.init(e)
                }
                init(e) {
                    const t = this;
                    this.moduleType = "widget",
                    this.request_queue = [],
                    this.request_queue_timer = null,
                    this.id = null,
                    this.element = e,
                    this.data = {},
                    this.methods = {},
                    this.status = "initializing",
                    this.requestQueueStatus = "ready",
                    this.eventListeners = {},
                    this.getWidgetAttributes((e => {
                        o.start("Widget ID:" + t.id),
                        t.setRechargePortalConfig(),
                        t.getWidgetSettings((function(e) {
                            var n, r;
                            if (null != t && null != (n = t.element) && null != (r = n.dataset) && r.rebuyExperimentId) {
                                const e = {
                                    subject: "user",
                                    verb: "viewed",
                                    noun: "widget",
                                    widget_id: t.id
                                }
                                  , {rebuyExperimentId: n} = t.element.dataset;
                                e.tags = [`ABN.TEST.${n}`],
                                P.J.trackEvent(e)
                            }
                            "placeholder" !== t.data.config.type && t.getWidgetStyles((function() {
                                var e;
                                null != (e = t.data.recharge) && e.portal && "recharge_customer_portal" === t.data.config.type && "affinity" === t.data.recharge.themeName && t.watchRechargeAffinity(!0),
                                (0,
                                i.isBundleBuilderWidget)(t) ? (_assertClassBrand(L, t, _initializeBundleBuilderDefaults).call(t),
                                v.Widget.callbacks.init(t),
                                t.render()) : t.getWidgetProducts((function(e) {
                                    m.log("products", e),
                                    v.Widget.callbacks.init(t),
                                    t.render()
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    t.methods.reload = function() {
                        m.log("Widget.reload called:", t),
                        B.initializeElements(t)
                    }
                    ,
                    t.element.dataset.initialized = !0
                }
                destroy(e) {
                    const t = this;
                    e = e || function() {}
                    ,
                    "gift_with_purchase" === t.data.config.type && t.data.config.trigger_options.auto_add.enabled && f.H.remove(l.Wc.GIFT_WITH_PURCHASE_WIDGET_ID.replace(":widgetId", t.id)),
                    t.hide(),
                    t.detachWidget(),
                    t.unbindEvents(),
                    e()
                }
                detachWidget() {
                    const e = this;
                    i.DOM.remove(`[data-rebuy-id="${e.id}"]`),
                    window.Rebuy.widgets = window.Rebuy.widgets.filter((t => t.id !== e.id))
                }
                addToRequestQueue(e) {
                    this.request_queue.push(e),
                    this.startRequestQueue()
                }
                startRequestQueue() {
                    const e = this;
                    clearTimeout(e.request_queue_timer),
                    e.request_queue_timer = setTimeout(( () => {
                        e.processRequestQueue()
                    }
                    ), 100)
                }
                async processRequestQueue(e) {
                    const t = this
                      , {Rebuy: {Modal: n}} = window;
                    if (t.request_queue.length) {
                        const e = t.request_queue.shift()
                          , {callback: i, params: a} = e;
                        let {url: o, error: s, success: c, meta: u={}, ...d} = a;
                        s = s || ( () => {}
                        ),
                        c = c || ( () => {}
                        );
                        try {
                            const e = await fetch(o, _assertClassBrand(L, t, _handleStaleKey).call(t, o, d, u))
                              , n = await e.json();
                            if (!e.ok) {
                                const t = n.stack || n.message || `Received a non 200 range response: ${e.status}`;
                                throw new Error(t,{
                                    cause: {
                                        req: e,
                                        res: n
                                    }
                                })
                            }
                            c(n)
                        } catch (e) {
                            var r;
                            if (s(e),
                            null != e && null != (r = e.cause) && r.res && !l.YC.includes(e.cause.res.message)) {
                                const t = e.cause.res;
                                t.message === t.description && (t.description = null),
                                n.dialog("dialog", {
                                    title: t.message,
                                    message: t.description || t.error,
                                    buttons: [{
                                        type: "primary",
                                        label: "Okay",
                                        action: "dismiss"
                                    }]
                                })
                            }
                        }
                        t.processRequestQueue(i)
                    } else
                        "function" == typeof e && e()
                }
                compileConfig() {
                    const e = this
                      , t = window.Rebuy
                      , n = {};
                    if (e.data.metadata && (e.data.metadata.discount && (n.discount = e.data.metadata.discount),
                    e.data.metadata.widget))
                        for (const t in e.data.metadata.widget)
                            Object.prototype.hasOwnProperty.call(e.data.metadata.widget, t) && (n[t] = e.data.metadata.widget[t]);
                    e.data.config = (0,
                    i.extend)(!0, {}, e.data.settings, n, e.data.attributes, {
                        shop: t.shop
                    })
                }
                getWidgetStyles(e) {
                    var t, n, r;
                    const s = this
                      , {config: l} = s.data;
                    if (e = e || ( () => {}
                    ),
                    C.Y.isShopifyCheckout()) {
                        i.DOM.addClass("body", "shopify-checkout");
                        const e = C.Y.getShopifyCheckoutStep();
                        e && i.DOM.addClass("body", "step-" + e.replace(/_/g, "-"))
                    }
                    if (C.Y.isReChargeCheckout()) {
                        i.DOM.addClass("body", "recharge-checkout");
                        const e = C.Y.getReChargeCheckoutStep();
                        e && (i.DOM.addClass("body", "step-" + e.replace(/_/g, "-")),
                        "contact_information" !== e && "payment_method" !== e || O()("form.checkout_shipping_form").on("submit", (function(e) {
                            const t = O()(this).serializeArray();
                            T.set("recharge_checkout_shipping", t)
                        }
                        )))
                    }
                    if (s.data.recharge.portal) {
                        const {step: e, themeName: t} = s.data.recharge
                          , n = ["recharge-customer-portal", `recharge-theme-${t}`];
                        if (e && n.push("step-" + e.replace(/_/g, "-")),
                        i.DOM.addClass("body", n.join(" ")),
                        s.shouldDisplay()) {
                            const e = document.querySelector("#rebuy-recharge-portal-styles")
                              , t = document.querySelector("#rebuy-global-styles");
                            if (!e) {
                                const e = a.getAssetAPIURL("onsite/css/recharge-portal.min.css")
                                  , n = document.createElement("link");
                                n.href = e.split("?").shift(),
                                n.rel = "stylesheet",
                                n.type = "text/css",
                                n.id = "rebuy-recharge-portal-styles",
                                document.head.insertBefore(n, t)
                            }
                        }
                    }
                    if ("custom" === l.theme || null != (t = l.styles) && t.custom_css || "show" === (null == (n = l.product_options) ? void 0 : n.show_product_description) || "show" === (null == (r = l.product_options) ? void 0 : r.show_variant_title)) {
                        const t = {
                            id: s.id,
                            format: "css"
                        };
                        C.Y.isRechargeCustomerPortal() && (t.context = "recharge_customer_portal");
                        const n = a.getAPIURL("/widgets/styles", t, !0);
                        o.start("Widget ID:" + s.id, "Widget.getWidgetStyles"),
                        (0,
                        i.addStylesheet)(n, ( () => {
                            o.end("Widget ID:" + s.id, "Widget.getWidgetStyles"),
                            e()
                        }
                        ), {
                            id: "rebuy-stylesheet-" + s.id
                        })
                    } else
                        e()
                }
                async getWidgetTemplate() {
                    const e = this
                      , t = O()(e.element).html().trim()
                      , n = document.querySelector(`script#rebuy-widget-${e.id}`);
                    if (t.length)
                        e.template = t;
                    else if (n)
                        e.template = n.innerHTML.trim();
                    else
                        switch (e.data.config.type) {
                        case "recharge_checkout":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-recharge-checkout-template", "rechargeCheckout");
                            break;
                        case "switch_to_subscription":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-switch-to-subscription-template", "switchToSubscription");
                            break;
                        case "product_upsell":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-upsell-template", "productUpsell");
                            break;
                        case "recharge_post_purchase":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-post-purchase-template", "postPurchase");
                            break;
                        case "shopify_post_purchase":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-thank-you-template", "thankYou");
                            break;
                        case "gift_with_purchase":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-gift-with-purchase-template", "giftWithPurchase");
                            break;
                        case "dynamic_bundle":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-dynamic-bundle-template", "dynamicBundle");
                            break;
                        case "product_addon":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-product-addon-template", "productAddon");
                            break;
                        case "cart_subscription":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-cart-subscription-radios", "cartSubscriptionRadios");
                            break;
                        case "pre_purchase":
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-pre-purchase-template", "prePurchase");
                            break;
                        case "bundle_builder":
                            {
                                this.template = await (0,
                                i.getDynamicTemplate)(this.constructor.name, "rebuy-bundle-builder-template", "bundleBuilder");
                                const e = document.querySelector("#rebuy-shopify-bundle-builder-styles")
                                  , t = document.querySelector("#rebuy-global-styles");
                                if (!e) {
                                    const e = a.getAssetAPIURL("onsite/css/bundle-builder.min.css")
                                      , n = document.createElement("link");
                                    n.href = e,
                                    n.rel = "stylesheet",
                                    n.type = "text/css",
                                    n.id = "rebuy-shopify-bundle-builder-styles",
                                    document.head.insertBefore(n, t)
                                }
                            }
                            break;
                        default:
                            this.template = await (0,
                            i.getDynamicTemplate)(this.constructor.name, "rebuy-recommended-template", "recommended")
                        }
                }
                getWidgetAttributes(e) {
                    const t = this;
                    if (e = e || function(e) {}
                    ,
                    t.element) {
                        t.data.attributes = {};
                        for (let e, n, r, a = 0; a < t.element.attributes.length; a++)
                            if (e = t.element.attributes[a],
                            e.specified && -1 !== e.name.indexOf("data-rebuy")) {
                                if (n = e.name.replace(/data-rebuy-/g, "").replace(/-/g, "_"),
                                r = e.value,
                                -1 !== ["shopify_product_ids", "shopify_variant_ids", "shopify_collection_ids"].indexOf(n) || -1 !== r.indexOf(",")) {
                                    const e = r.split(",");
                                    r = [];
                                    for (let t, n = 0; n < e.length; n++)
                                        t = isNaN(e[n]) ? e[n].trim() : Number(e[n]),
                                        r.push(t)
                                }
                                -1 !== n.indexOf(".") ? (0,
                                i.setObjectPath)(n, t.data.attributes, r) : t.data.attributes[n] = r
                            }
                        void 0 !== t.data.attributes.shopify_product_ids ? t.data.shopify_product_ids = t.data.attributes.shopify_product_ids : t.data.shopify_product_ids = [],
                        void 0 !== t.data.attributes.shopify_variant_ids ? t.data.shopify_variant_ids = t.data.attributes.shopify_variant_ids : t.data.shopify_variant_ids = [],
                        void 0 !== t.data.attributes.shopify_collection_ids ? t.data.shopify_collection_ids = t.data.attributes.shopify_collection_ids : t.data.shopify_collection_ids = [],
                        t.data.dynamic_shopify_product_ids = [],
                        t.data.dynamic_shopify_variant_ids = [],
                        t.id = t.data.attributes.id,
                        t.data.id = t.data.attributes.id,
                        e(t.data.attributes)
                    }
                }
                getWidgetSettings(e) {
                    var t;
                    const n = this
                      , r = !(null == (t = window.rebuyAdminPreview) || !t.widget);
                    var i, s, l;
                    if (e = e || function() {}
                    ,
                    C.Y.isAdminPreview() && r)
                        return n.data.settings = (null == (i = window) || null == (s = i.rebuyAdminPreview) || null == (l = s.widget) ? void 0 : l.settings) || {},
                        p.Z.call.push((function() {
                            n.data.cart = p.Z.cart
                        }
                        )),
                        n.compileConfig(),
                        n.initLivePreview(),
                        e(n.data.settings),
                        void m.log("Widget Settings found from admin preview: ", n.data.settings);
                    o.start("Widget ID:" + n.id, "Widget.getWidgetSettings"),
                    a.callAPI("GET", "/widgets/settings", {
                        id: n.id
                    }, !0).then((function(t) {
                        n.data.settings = t.data,
                        p.Z.call.push((function() {
                            n.data.cart = p.Z.cart
                        }
                        )),
                        ("shopify_checkout" === n.data.settings.type || "cart_subscription" === n.data.settings.type || C.Y.isShopifyCheckout() && "gift_with_purchase" === n.data.settings.type) && (n.polling = {
                            summary: 0,
                            summary_max_attempts: 10,
                            summary_timer: null,
                            shipping: 0,
                            shipping_max_attempts: 10,
                            shipping_timer: null,
                            alt_payments: 0,
                            alt_payments_max_attempts: 10,
                            alt_payments_timer: null
                        }),
                        "product_upsell" !== n.data.settings.type && "product_addon" !== n.data.settings.type && "switch_to_subscription" !== n.data.settings.type || (n.data.tails = {}),
                        "recharge_post_purchase" === n.data.settings.type && (n.data.purchased = null),
                        "switch_to_subscription" === n.data.settings.type && (n.data.settings.endpoint = "/products/static"),
                        "cart_subscription" === n.data.settings.type && (n.data.subscription = null,
                        n.enrichCartWithSubscriptions()),
                        n.compileConfig(),
                        n.initLivePreview(),
                        e(t.data),
                        o.end("Widget ID:" + n.id, "Widget.getWidgetSettings")
                    }
                    ), a.callError)
                }
                getWidgetProducts(e) {
                    const t = this
                      , n = window.Rebuy;
                    if (e = e || function() {}
                    ,
                    t.isCartBasedWidget()) {
                        if (!t.data.cart)
                            return void p.Z.call.push((function() {
                                t.data.cart = p.Z.cart,
                                t.data.shopify_product_ids = p.Z.getCartProductIDs(),
                                t.data.shopify_variant_ids = p.Z.getCartVariantIDs(),
                                t.getWidgetProducts(e)
                            }
                            ));
                        t.data.shopify_product_ids = p.Z.getCartProductIDs(),
                        t.data.shopify_variant_ids = p.Z.getCartVariantIDs(),
                        ["shopify_product_ids", "shopify_variant_ids"].forEach((e => {
                            const n = t.data.attributes[e];
                            Array.isArray(n) && t.data[e].push(...n)
                        }
                        ))
                    }
                    o.start("Widget ID:" + t.id, "Widget.getWidgetProducts");
                    const r = {
                        key: n.shop.api_key,
                        limit: t.data.config.limit,
                        url: window.location.href,
                        shopify_product_ids: t.getProductIDs(!0),
                        shopify_variant_ids: t.getVariantIDs(!0),
                        shopify_collection_ids: t.getCollectionIDs(!0),
                        shopify_order_ids: t.getOrderIDs(!0)
                    };
                    for (const e in n.shop.integrations)
                        if (t.data.config.integrations && t.data.config.integrations[e]) {
                            r.metafields = "yes";
                            break
                        }