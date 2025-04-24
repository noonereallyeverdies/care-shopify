!function() {
    var e = {
        314: function() {
            document.addEventListener("DOMContentLoaded", ( () => {
                function e() {
                    const e = navigator.userAgent
                      , t = e.match(/OS (\d+)_/);
                    let r = "";
                    return !(!/iPad|iPhone|iPod/.test(e) || !t) && (r = parseInt(t[1], 10),
                    r <= 13)
                }
                let t = "";
                function r() {
                    if (!e()) {
                        const e = document.querySelectorAll(".text-wpr.animate, .top-text.animate");
                        if (!e.length)
                            return;
                        const r = new IntersectionObserver((e => {
                            e.forEach((e => {
                                const r = e.target.querySelectorAll(":scope > h1:not(.fade-in-lines), :scope > h2, :scope > h3, :scope > p, :scope > .text-width-small > p");
                                e.isIntersecting ? r.forEach(( (e, t) => {
                                    setTimeout(( () => e.classList.add("fade-down")), 300 * t)
                                }
                                )) : "up" === t && r.forEach((e => e.classList.remove("fade-down")))
                            }
                            ))
                        }
                        ),{
                            threshold: .2
                        });
                        e.forEach((e => r.observe(e)))
                    }
                }
                e() || (!function() {
                    const r = new Lenis({
                        smooth: !0
                    });
                    var n;
                    requestAnimationFrame((function e(t) {
                        r.raf(t),
                        requestAnimationFrame(e)
                    }
                    )),
                    n = r,
                    e() || n.on("scroll", (e => {
                        t = 1 === e.direction ? "down" : "up"
                    }
                    ))
                }(),
                t = "down"),
                r(),
                function() {
                    if (!e()) {
                        const e = document.querySelectorAll(".fade-in-lines");
                        if (!e.length)
                            return;
                        e.forEach((e => {
                            !function(e) {
                                const t = e.getAttribute("data-original-text") || e.textContent;
                                e.setAttribute("data-original-text", t),
                                e.textContent = "";
                                const r = t.split(" ").map((e => {
                                    const t = document.createElement("span");
                                    return t.textContent = e + " ",
                                    t
                                }
                                ));
                                r.forEach((t => e.appendChild(t)));
                                const n = function(e) {
                                    const t = [];
                                    let r = []
                                      , n = null;
                                    return e.forEach((e => {
                                        const o = e.getBoundingClientRect().top;
                                        null !== n && o === n || (r.length > 0 && t.push(r),
                                        r = [],
                                        n = o),
                                        r.push(e)
                                    }
                                    )),
                                    r.length > 0 && t.push(r),
                                    t
                                }(r);
                                e.textContent = "",
                                n.forEach((t => {
                                    const r = document.createElement("div");
                                    r.classList.add("line"),
                                    t.forEach((e => r.appendChild(e))),
                                    e.appendChild(r)
                                }
                                )),
                                e.style.visibility = "visible",
                                e.style.opacity = "1"
                            }(e),
                            function(e) {
                                new IntersectionObserver((r => {
                                    r.forEach((r => {
                                        const n = e.querySelectorAll(".line");
                                        r.isIntersecting ? function(e, t) {
                                            e.forEach(( (r, n) => {
                                                setTimeout(( () => {
                                                    r.classList.add("visible"),
                                                    n === e.length - 1 && setTimeout(( () => t.classList.add("animation-complete")), 500)
                                                }
                                                ), 500 * n)
                                            }
                                            ))
                                        }(n, e) : "up" === t && function(e, t) {
                                            e.forEach((e => e.classList.remove("visible"))),
                                            t.classList.remove("animation-complete")
                                        }(n, e)
                                    }
                                    ))
                                }
                                ),{
                                    threshold: .8
                                }).observe(e)
                            }(e)
                        }
                        ))
                    }
                }();
                const n = document.querySelectorAll(".results-filter");
                n.length > 0 && n.forEach((e => {
                    const t = e.querySelectorAll(".result-filter-tag button");
                    function n(e) {
                        const t = document.getElementById("MainContent");
                        if (!t)
                            return;
                        t.querySelectorAll(".shopify-section").forEach((e => {
                            "shopify-section-template--18063665234101__results_filter_bep9nP" !== e.id && (e.style.display = "none")
                        }
                        ));
                        const n = document.querySelector(".loading-spinner");
                        n.style.display = "flex",
                        fetch("/pages/results-content-sections").then((e => e.text())).then((o => {
                            const s = (new DOMParser).parseFromString(o, "text/html")
                              , i = "all" === e ? s.querySelectorAll("#MainContent .shopify-section") : s.querySelectorAll(`[data-filter="${e}"]`)
                              , l = t.querySelector(".results-filter")
                              , c = l ? l.closest(".shopify-section") : null;
                            t.innerHTML = "",
                            c && t.appendChild(c),
                            0 !== i.length ? (i.forEach((e => {
                                const r = e.closest(".shopify-section");
                                if (r) {
                                    const e = r.cloneNode(!0);
                                    e.className = r.className,
                                    t.appendChild(e)
                                }
                            }
                            )),
                            document.querySelector(".results-filter .no-results").style.display = "none",
                            setTimeout(( () => {
                                lenis.resize(),
                                r(),
                                initColumnCardsFadeIn(),
                                initImageTextSlideIn(),
                                initResultsVideo(),
                                initProductSliders(),
                                document.dispatchEvent(new Event("shopify:section:load")),
                                t.querySelectorAll(".shopify-section").forEach((e => {
                                    e.style.display = ""
                                }
                                )),
                                n.style.display = "none"
                            }
                            ), 100)) : (n.style.display = "none",
                            document.querySelector(".results-filter .no-results").style.display = "block")
                        }
                        )).catch((e => {
                            console.error("Error loading content:", e),
                            n.style.display = "none"
                        }
                        ))
                    }
                    setTimeout(( () => {
                        n("all")
                    }
                    ), 100),
                    t.forEach((e => {
                        e.addEventListener("click", (function() {
                            const e = this.getAttribute("id");
                            document.querySelectorAll(".result-filter-tag").forEach((e => {
                                e.classList.remove("active")
                            }
                            )),
                            this.closest(".result-filter-tag").classList.add("active"),
                            n(e)
                        }
                        ))
                    }
                    ))
                }
                ));
                const o = document.querySelectorAll(".clinical-trials-filter");
                o.length > 0 && o.forEach((e => {
                    const t = e.querySelectorAll(".result-filter-tag button");
                    function n(e) {
                        const t = document.getElementById("MainContent").querySelector(".clinical-trials-filter .insert-cards");
                        if (!t)
                            return;
                        t.querySelectorAll(".col-50").forEach((e => e.remove()));
                        const n = document.querySelector(".loading-spinner");
                        n.style.display = "flex",
                        fetch("/pages/clinical-trials-cards").then((e => e.text())).then((o => {
                            const s = (new DOMParser).parseFromString(o, "text/html");
                            let i;
                            if (i = "all" == e ? s.querySelectorAll(".clinical-trials-cards .card") : s.querySelectorAll(`.card[data-filter="${e}"]`),
                            0 !== i.length) {
                                {
                                    const e = i.length
                                      , r = t.getAttribute("data-cards-per-page");
                                    document.querySelector(".load-more-wrapper").style.display = e > r ? "block" : "none",
                                    i.forEach(( (e, n) => {
                                        const o = document.createElement("div");
                                        o.classList.add("col-50"),
                                        n >= r && (e.style.display = "none"),
                                        o.appendChild(e),
                                        t.appendChild(o)
                                    }
                                    ))
                                }
                                setTimeout(( () => {
                                    lenis.resize(),
                                    r(),
                                    initColumnCardsFadeIn(),
                                    initImageTextSlideIn(),
                                    document.dispatchEvent(new Event("shopify:section:load")),
                                    n.style.display = "none"
                                }
                                ), 100)
                            } else
                                n.style.display = "none",
                                document.querySelector(".clinical-trials-filter .no-results").style.display = "block"
                        }
                        )).catch((e => {
                            console.error("Error loading content:", e),
                            n.style.display = "none"
                        }
                        ))
                    }
                    setTimeout(( () => {
                        n("all")
                    }
                    ), 100),
                    t.forEach((e => {
                        e.addEventListener("click", (function() {
                            const e = this.getAttribute("id");
                            document.querySelectorAll(".result-filter-tag").forEach((e => {
                                e.classList.remove("active")
                            }
                            )),
                            this.closest(".result-filter-tag").classList.add("active"),
                            n(e)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            ))
        },
        299: function() {
            document.addEventListener("DOMContentLoaded", ( () => {
                function e() {
                    const e = navigator.userAgent
                      , t = e.match(/OS (\d+)_/);
                    let r = "";
                    return !(!/iPad|iPhone|iPod/.test(e) || !t) && (r = parseInt(t[1], 10),
                    r <= 13)
                }
                if (!e()) {
                    const e = new Lenis({
                        smooth: !0
                    });
                    requestAnimationFrame((function t(r) {
                        e.raf(r),
                        requestAnimationFrame(t)
                    }
                    ))
                }
                setInterval(( () => {
                    const e = document.querySelector('[data-acsb="widget"]');
                    e && e.setAttribute("data-lenis-prevent", "true")
                }
                ), 300);
                const t = document.querySelector(".icon-hamburger")
                  , r = document.querySelector(".icon-close")
                  , n = document.querySelector(".mobile-menu-drawer")
                  , o = document.querySelector(".mobile-menu-overlay")
                  , s = document.querySelector(".menu-drawer-close-button")
                  , i = document.querySelector(".mobile-menu-close")
                  , l = document.querySelector(".header-wpr")
                  , c = document.querySelector(".search-overlay")
                  , a = document.querySelector(".search-close")
                  , d = document.querySelector(".search-modal")
                  , u = document.querySelector(".header__icon--search")
                  , h = document.querySelector(".search__input.field__input")
                  , p = document.querySelector(".search__button")
                  , m = document.querySelector(".predictive-search--header")
                  , f = document.querySelector(".announcement-bar")
                  , g = document.querySelector(".glide")
                  , y = document.querySelector(".header-main:not(.filled-in)") || null;
                let v, S = 0;
                function q() {
                    y && (window.innerWidth > 768 ? S > 80 ? (y.classList.remove("transparent"),
                    y.querySelector(".logo.transparent-logo").style.display = "none",
                    y.querySelector(".logo.filled-in-logo").style.display = "block") : (y.classList.add("transparent"),
                    y.querySelector(".logo.transparent-logo").style.display = "block",
                    y.querySelector(".logo.filled-in-logo").style.display = "none") : (y.classList.remove("transparent"),
                    y.querySelector(".logo.transparent-logo").style.display = "none",
                    y.querySelector(".logo.filled-in-logo").style.display = "block"),
                    l.classList.add("scrolling"),
                    clearTimeout(v),
                    v = setTimeout(( () => {
                        l.classList.remove("scrolling")
                    }
                    ), 200))
                }
                function E(e) {
                    const t = document.querySelector(".mobile-toggle");
                    t?.classList.toggle("active", e),
                    n?.classList.toggle("active", e),
                    o?.classList.toggle("active", e)
                }
                function b() {
                    c?.classList.remove("active"),
                    a?.classList.remove("active"),
                    lenis.start(),
                    l?.classList.contains("transparent") && y && (y.classList.add("transparent"),
                    y.querySelector(".logo.transparent-logo").style.display = "block",
                    y.querySelector(".logo.filled-in-logo").style.display = "none")
                }
                function w() {
                    c?.classList.add("active"),
                    a?.classList.add("active"),
                    lenis.stop(),
                    y?.classList.contains("transparent") && (y.classList.remove("transparent"),
                    y.querySelector(".logo.transparent-logo").style.display = "none",
                    y.querySelector(".logo.filled-in-logo").style.display = "block")
                }
                if (q(),
                setInterval((function() {
                    if (!l)
                        return;
                    const e = l.offsetHeight
                      , t = (e, t) => {
                        document.querySelectorAll(e).forEach((e => {
                            Object.assign(e.style, t)
                        }
                        ))
                    }
                    ;
                    t(".product .gallery-wpr .grid-item", {
                        top: `${e + 10}px`
                    }),
                    t(".large-before-after .slide", {
                        top: `${e}px`
                    }),
                    t(".large-before-after .slide .slide__image img", {
                        height: `calc(100vh - ${e}px)`
                    }),
                    t(".large-before-after .label-container", {
                        top: `${e}px`,
                        height: `calc(100vh - ${e}px)`
                    }),
                    t(".section.steps .image-wrapper", {
                        top: `${e + 10}px`
                    }),
                    t(".header-main .container-fluid .right-wpr .header__search .search-modal", {
                        top: `${e}px`
                    }),
                    t(".header-main .container-fluid .right-wpr .header__search .search-close, .header-main .shopify-policy__container .right-wpr .header__search .search-close", {
                        top: `${e}px`
                    }),
                    t(".tile-image-scroll .inner-wrapper .image-wpr", {
                        top: `${e + 10}px`
                    }),
                    t(".header-main .container-fluid .mobile-toggle-wpr .mobile-menu-overlay", {
                        top: `${e}px`
                    });
                    const r = document.querySelector("#MainContent");
                    l.classList.contains("make-sticky") && window.innerWidth < 768 ? r.style.paddingTop = `${e}px` : r.style.paddingTop = "0px"
                }
                ), 300),
                e() || lenis.on("scroll", (e => {
                    S = e.scroll,
                    q()
                }
                )),
                window.addEventListener("resize", q),
                t?.addEventListener("click", ( () => E(!0))),
                r?.addEventListener("click", ( () => E(!1))),
                s?.addEventListener("click", ( () => {
                    const e = s.closest("details");
                    e && e.removeAttribute("open")
                }
                )),
                i?.addEventListener("click", ( () => E(!1))),
                document.addEventListener("click", (e => {
                    !n || n.contains(e.target) || e.target.closest(".mobile-toggle") || E(!1)
                }
                )),
                u && c && (u.addEventListener("click", (e => {
                    e.stopPropagation(),
                    c.classList.contains("active") ? b() : w()
                }
                )),
                c.addEventListener("click", (e => {
                    e.stopPropagation(),
                    b()
                }
                )),
                a?.addEventListener("click", (e => {
                    e.stopPropagation(),
                    b()
                }
                )),
                document.addEventListener("click", (e => {
                    !(c.contains(e.target) || u.contains(e.target) || h && h.contains(e.target) || p && p.contains(e.target) || d?.contains(e.target) || m?.contains(e.target)) && c.classList.contains("active") && b()
                }
                )),
                h?.addEventListener("focus", (e => {
                    e.stopPropagation(),
                    w()
                }
                ))),
                h && m && (h.addEventListener("input", ( () => {
                    m.classList.add("active")
                }
                )),
                h.addEventListener("blur", ( () => {
                    h.value.trim() || m.classList.remove("active")
                }
                ))),
                f && g && f.querySelectorAll(".glide__slide").length > 1) {
                    const e = g.getAttribute("data-glide-speed") || 5e3;
                    new Glide(".announcement-bar .glide",{
                        type: "carousel",
                        perView: 1,
                        autoplay: e,
                        hoverpause: !0
                    }).mount()
                }
            }
            ))
        },
        367: function() {
            document.addEventListener("DOMContentLoaded", (function() {
                function e() {
                    const e = navigator.userAgent
                      , t = e.match(/OS (\d+)_/);
                    let r = "";
                    return !(!/iPad|iPhone|iPod/.test(e) || !t) && (r = parseInt(t[1], 10),
                    r <= 14)
                }
                if (e())
                    document.querySelector(".page-container").classList.add("no-lenis");
                else {
                    document.querySelector(".page-container").classList.remove("no-lenis");
                    const h = new Lenis({
                        smooth: !0
                    });
                    window.lenis = h,
                    requestAnimationFrame((function e(t) {
                        h.raf(t),
                        requestAnimationFrame(e)
                    }
                    ));
                    let p = "down";
                    h.on("scroll", (e => {
                        p = 1 === e.direction ? "down" : "up"
                    }
                    ))
                }
                function t(e, t=500) {
                    e.style.opacity = 0,
                    e.style.display = "block";
                    let r = null;
                    requestAnimationFrame((function n(o) {
                        r || (r = o);
                        const s = Math.min((o - r) / t, 1);
                        e.style.opacity = s,
                        s < 1 && requestAnimationFrame(n)
                    }
                    ))
                }
                document.querySelectorAll('a[href^="#"]').forEach((e => {
                    e.addEventListener("click", (t => {
                        t.preventDefault();
                        const r = e.getAttribute("href").substring(1)
                          , n = document.getElementById(r);
                        if (!n)
                            return;
                        const o = n.closest(".modal-wpr");
                        if (!o) {
                            const e = document.getElementById(r) || document.querySelector(`[name='${r}']`);
                            e && window.scrollTo({
                                top: e.offsetTop,
                                behavior: "smooth"
                            })
                        }
                        o.classList.add("active");
                        const s = o.querySelector(".close");
                        s && s.addEventListener("click", ( () => {
                            o.classList.remove("active")
                        }
                        )),
                        document.addEventListener("click", (t => {
                            o.querySelector(".modal").contains(t.target) || e.contains(t.target) || o.classList.remove("active")
                        }
                        ))
                    }
                    ))
                }
                )),
                ( () => {
                    const e = document.querySelectorAll(".before-after-slider");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelector(".custom-slider-container")
                          , r = t ? t.querySelector(".custom-slider-thumb") : null
                          , n = t ? t.querySelector(".custom-slider-track") : null
                          , o = e.querySelector(".after-image")
                          , s = e.querySelector(".image-circle");
                        if (!(t && r && n && o && s))
                            return;
                        let i = n.querySelector(".divider-line");
                        i || (i = document.createElement("div"),
                        i.classList.add("divider-line"),
                        n.appendChild(i));
                        let l = !1;
                        function c(e) {
                            r.style.left = `${e}%`,
                            o.style.clipPath = `inset(0 0 0 ${e}%)`,
                            i.style.left = `${e}%`
                        }
                        function a() {
                            l = !0,
                            document.body.style.cursor = "grabbing",
                            s.style.opacity = "0"
                        }
                        function d() {
                            l && (l = !1,
                            document.body.style.cursor = "")
                        }
                        function u(e) {
                            if (!l)
                                return;
                            const t = n.getBoundingClientRect();
                            let r = (e - t.left) / t.width * 100;
                            r = Math.min(100, Math.max(0, r)),
                            c(r)
                        }
                        r.addEventListener("mousedown", (e => {
                            e.preventDefault(),
                            a()
                        }
                        )),
                        r.addEventListener("touchstart", (e => {
                            e.preventDefault(),
                            a()
                        }
                        ), {
                            passive: !1
                        }),
                        document.addEventListener("mousemove", (e => u(e.clientX))),
                        document.addEventListener("touchmove", (e => {
                            e.touches[0] && u(e.touches[0].clientX)
                        }
                        ), {
                            passive: !1
                        }),
                        document.addEventListener("mouseup", d),
                        document.addEventListener("touchend", d),
                        c(50)
                    }
                    ))
                }
                )(),
                ( () => {
                    const t = document.querySelectorAll(".slider-before-after");
                    t.length > 0 && (e() || t.forEach((e => {
                        const t = e.querySelector(".glide");
                        if (!t)
                            return;
                        const r = e.querySelector(".progress")
                          , n = e.querySelectorAll(".glide__slide").length
                          , o = e.querySelector(".glide-controls")
                          , s = new Glide(t,{
                            type: "carousel",
                            perView: 1,
                            autoplay: 5e5,
                            hoverpause: !0,
                            dragThreshold: !1
                        }).mount();
                        s.on("run", ( () => {
                            const e = (s.index + 1) / n * 100;
                            r && (r.style.width = `${e}%`)
                        }
                        )),
                        s.mount(),
                        o?.querySelector(".arrow-prev")?.addEventListener("click", ( () => s.go("<"))),
                        o?.querySelector(".arrow-next")?.addEventListener("click", ( () => s.go(">")))
                    }
                    )),
                    t.forEach((e => {
                        const t = e.querySelector(".glide");
                        if (!t)
                            return;
                        const r = e.querySelector(".progress")
                          , n = e.querySelectorAll(".glide__slide").length
                          , o = e.querySelector(".glide-controls")
                          , s = e.querySelectorAll(".glide__slide");
                        s.forEach((e => {
                            const t = e.querySelector(".custom-slider-container")
                              , r = t?.querySelector(".custom-slider-thumb")
                              , n = t?.querySelector(".custom-slider-track")
                              , o = e.querySelector(".after-image")
                              , s = e.querySelector(".image-circle");
                            if (!(t && r && n && o && s))
                                return;
                            let i = n.querySelector(".divider-line");
                            i || (i = document.createElement("div"),
                            i.classList.add("divider-line"),
                            n.appendChild(i));
                            let l = !1;
                            function c(e) {
                                r.style.left = `${e}%`,
                                o.style.clipPath = `inset(0 0 0 ${e}%)`,
                                i.style.left = `${e}%`
                            }
                            function a(e) {
                                e.preventDefault(),
                                l = !0,
                                document.body.style.cursor = "grabbing",
                                s.style.opacity = "0"
                            }
                            function d() {
                                l && (l = !1,
                                document.body.style.cursor = "")
                            }
                            function u(e) {
                                if (!l)
                                    return;
                                const t = n.getBoundingClientRect();
                                let r = (e - t.left) / t.width * 100;
                                r = Math.min(100, Math.max(0, r)),
                                c(r)
                            }
                            r.addEventListener("mousedown", a),
                            r.addEventListener("touchstart", a, {
                                passive: !1
                            }),
                            document.addEventListener("mousemove", (e => u(e.clientX))),
                            document.addEventListener("touchmove", (e => {
                                e.touches[0] && u(e.touches[0].clientX)
                            }
                            ), {
                                passive: !1
                            }),
                            document.addEventListener("mouseup", d),
                            document.addEventListener("touchend", d),
                            c(50)
                        }
                        ));
                        let i = 0;
                        function l(e) {
                            if (e < 0 || e >= s.length)
                                return;
                            const o = 100 * -e;
                            t.querySelector(".glide__slides").style.transition = "transform 0.5s",
                            t.querySelector(".glide__slides").style.transform = `translateX(${o}%)`,
                            i = e;
                            const l = (i + 1) / n * 100;
                            r && (r.style.width = `${l}%`)
                        }
                        t.querySelector(".glide__slides").style.transform = "translateX(0)",
                        o?.querySelector(".arrow-next")?.addEventListener("click", ( () => {
                            let e = i + 1;
                            e >= s.length && (e = 0),
                            l(e)
                        }
                        )),
                        o?.querySelector(".arrow-prev")?.addEventListener("click", ( () => {
                            let e = i - 1;
                            e < 0 && (e = s.length - 1),
                            l(e)
                        }
                        )),
                        o?.querySelector(".arrow-prev")?.addEventListener("click", ( () => glide.go("<"))),
                        o?.querySelector(".arrow-next")?.addEventListener("click", ( () => glide.go(">")))
                    }
                    )))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".before-after-slider-multi:not(.before-after-vertical)");
                    e.length > 0 && e.forEach((e => {
                        const r = e.querySelectorAll(".slide")
                          , n = e.querySelectorAll(".thumb-container")
                          , o = e.querySelector(".arrow-prev")
                          , s = e.querySelector(".arrow-next");
                        r.forEach((e => {
                            e.style.display = "none",
                            e.style.opacity = 0
                        }
                        ));
                        let i = 0;
                        function l(e) {
                            const o = i;
                            if (o === e || e < 0 || e >= r.length)
                                return;
                            n.forEach((e => e.classList.remove("active"))),
                            n[e].classList.add("active");
                            const s = r[o]
                              , l = r[e];
                            s ? function(e, t=500, r) {
                                e.style.opacity = 1;
                                let n = null;
                                requestAnimationFrame((function o(s) {
                                    n || (n = s);
                                    const i = Math.min((s - n) / t, 1);
                                    e.style.opacity = 1 - i,
                                    i < 1 ? requestAnimationFrame(o) : (e.style.display = "none",
                                    "function" == typeof r && r())
                                }
                                ))
                            }(s, 300, ( () => t(l, 300))) : t(l, 300),
                            i = e
                        }
                        r[i].style.display = "block",
                        r[i].style.opacity = 1,
                        n[i].classList.add("active"),
                        n.forEach(( (e, t) => {
                            e.addEventListener("click", ( () => l(t)))
                        }
                        )),
                        s?.addEventListener("click", ( () => {
                            let e = i + 1;
                            e >= r.length && (e = 0),
                            l(e)
                        }
                        )),
                        o?.addEventListener("click", ( () => {
                            let e = i - 1;
                            e < 0 && (e = r.length - 1),
                            l(e)
                        }
                        )),
                        r.forEach((e => {
                            const t = e.querySelector(".custom-slider-container")
                              , r = t?.querySelector(".custom-slider-thumb")
                              , n = t?.querySelector(".custom-slider-track")
                              , o = e.querySelector(".after-image")
                              , s = e.querySelector(".image-circle");
                            if (!(t && r && n && o && s))
                                return;
                            let i = n.querySelector(".divider-line");
                            i || (i = document.createElement("div"),
                            i.classList.add("divider-line"),
                            n.appendChild(i));
                            let l = !1;
                            function c(e) {
                                r.style.left = `${e}%`,
                                o.style.clipPath = `inset(0 0 0 ${e}%)`,
                                i.style.left = `${e}%`
                            }
                            function a(e) {
                                e.preventDefault(),
                                l = !0,
                                document.body.style.cursor = "grabbing",
                                s.style.opacity = "0"
                            }
                            function d() {
                                l && (l = !1,
                                document.body.style.cursor = "")
                            }
                            function u(e) {
                                if (!l)
                                    return;
                                const t = n.getBoundingClientRect();
                                let r = (e - t.left) / t.width * 100;
                                r = Math.min(100, Math.max(0, r)),
                                c(r)
                            }
                            r.addEventListener("mousedown", a),
                            r.addEventListener("touchstart", a, {
                                passive: !1
                            }),
                            document.addEventListener("mousemove", (e => u(e.clientX))),
                            document.addEventListener("touchmove", (e => {
                                e.touches[0] && u(e.touches[0].clientX)
                            }
                            ), {
                                passive: !1
                            }),
                            document.addEventListener("mouseup", d),
                            document.addEventListener("touchend", d),
                            c(50)
                        }
                        ))
                    }
                    ))
                }
                )(),
                ( () => {
                    const t = document.querySelectorAll(".percentage-item-wpr");
                    t.length > 0 && (e() ? t.forEach((e => {
                        e.querySelectorAll(".percentage-item").forEach((e => {
                            const t = e.querySelector(".percentage-number")
                              , r = t.getAttribute("data-target");
                            t.textContent = r
                        }
                        ))
                    }
                    )) : t.forEach((e => {
                        const t = e.querySelectorAll(".percentage-item")
                          , r = new IntersectionObserver((e => {
                            e.forEach((e => {
                                const t = e.target
                                  , r = t.querySelector(".percentage-number");
                                if (r && e.isIntersecting && !t.classList.contains("animate")) {
                                    t.classList.add("animate");
                                    const e = t.querySelector(".percentage-divider");
                                    e?.classList.add("divider-animate");
                                    const n = r.getAttribute("data-target") || "0";
                                    let o = []
                                      , s = []
                                      , i = !1;
                                    n.includes("-") ? (o = n.split("-").map((e => parseFloat(e.replace(/,/g, "")))),
                                    s = ["", ""]) : n.endsWith("%") ? (o = [parseFloat(n)],
                                    s = ["%"]) : n.endsWith("x") ? (o = [parseFloat(n)],
                                    s = ["x"]) : n.endsWith(".") ? (o = [parseFloat(n)],
                                    s = ["."],
                                    i = !0) : (o = [parseFloat(n.replace(/,/g, ""))],
                                    s = [""]);
                                    let l = o.map(( () => 0));
                                    const c = o.map((e => Math.ceil(e / (i ? 200 : 50))))
                                      , a = () => {
                                        let e = !0;
                                        l = l.map(( (t, r) => ((t += c[r]) >= o[r] ? t = o[r] : e = !1,
                                        t))),
                                        s.length > 1 ? r.textContent = l.map(( (e, t) => `${e.toLocaleString()}${s[t]}`)).join("-") : r.textContent = `${l[0].toLocaleString()}${s[0]}`,
                                        e || requestAnimationFrame(a)
                                    }
                                    ;
                                    a()
                                }
                            }
                            ))
                        }
                        ),{
                            threshold: .8
                        });
                        t.forEach((e => r.observe(e)))
                    }
                    )))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".column-text");
                    e.length > 0 && e.forEach((e => {
                        new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting && e.target.querySelectorAll(".col-4 .percentage-item").forEach((e => {
                                    const t = e.querySelector(".percentage-number");
                                    if (t && !e.classList.contains("animate")) {
                                        e.classList.add("animate");
                                        const r = e.querySelector(".percentage-divider");
                                        r?.classList.add("divider-animate");
                                        const n = t.getAttribute("data-target") || "0";
                                        let o = []
                                          , s = []
                                          , i = !1;
                                        n.includes("-") ? (o = n.split("-").map((e => parseFloat(e.replace(/,/g, "")))),
                                        s = ["", ""]) : n.endsWith("%") ? (o = [parseFloat(n)],
                                        s = ["%"]) : n.endsWith("x") ? (o = [parseFloat(n)],
                                        s = ["x"]) : n.endsWith(".") ? (o = [parseFloat(n)],
                                        s = ["."],
                                        i = !0) : (o = [parseFloat(n.replace(/,/g, ""))],
                                        s = [""]);
                                        let l = o.map(( () => 0));
                                        const c = o.map((e => Math.ceil(e / (i ? 200 : 50))))
                                          , a = () => {
                                            let e = !0;
                                            l = l.map(( (t, r) => ((t += c[r]) >= o[r] ? t = o[r] : e = !1,
                                            t))),
                                            s.length > 1 ? t.textContent = l.map(( (e, t) => `${e.toLocaleString()}${s[t]}`)).join("-") : t.textContent = `${l[0].toLocaleString()}${s[0]}`,
                                            e || requestAnimationFrame(a)
                                        }
                                        ;
                                        a()
                                    }
                                }
                                ))
                            }
                            ))
                        }
                        ),{
                            threshold: .5
                        }).observe(e)
                    }
                    ))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".hero");
                    e.length > 0 && e.forEach((e => {
                        e.querySelectorAll(".hero .percentage-circle-number").forEach((e => {
                            const t = e;
                            if (t && !e.classList.contains("animate")) {
                                e.classList.add("animate");
                                const r = e.querySelector(".percentage-divider");
                                r?.classList.add("divider-animate");
                                const n = t.getAttribute("data-target") || "0";
                                let o = []
                                  , s = []
                                  , i = !1;
                                n.includes("-") ? (o = n.split("-").map((e => parseFloat(e.replace(/,/g, "")))),
                                s = ["", ""]) : n.endsWith("%") ? (o = [parseFloat(n)],
                                s = ["%"]) : n.endsWith("x") ? (o = [parseFloat(n)],
                                s = ["x"]) : n.endsWith(".") ? (o = [parseFloat(n)],
                                s = ["."],
                                i = !0) : (o = [parseFloat(n.replace(/,/g, ""))],
                                s = [""]);
                                let l = o.map(( () => 0));
                                const c = o.map((e => Math.ceil(e / (i ? 200 : 50))))
                                  , a = () => {
                                    let e = !0;
                                    l = l.map(( (t, r) => ((t += c[r]) >= o[r] ? t = o[r] : e = !1,
                                    t))),
                                    s.length > 1 ? t.textContent = l.map(( (e, t) => `${e.toLocaleString()}${s[t]}`)).join("-") : t.textContent = `${l[0].toLocaleString()}${s[0]}`,
                                    e || requestAnimationFrame(a)
                                }
                                ;
                                a()
                            }
                        }
                        ))
                    }
                    ))
                }
                )(),
                ( () => {
                    const t = document.querySelectorAll(".social-slider");
                    t.length > 0 && (e() || t.forEach((e => {
                        const t = e.querySelector(".glide");
                        if (!t)
                            return;
                        const r = e.querySelector(".progress")
                          , n = e.querySelectorAll(".glide__slide").length
                          , o = e.querySelector(".glide-controls")
                          , s = new Glide(`#${t.id}`,{
                            type: "carousel",
                            perView: 3,
                            hoverpause: !0,
                            peek: {
                                before: 0,
                                after: 200
                            },
                            gap: 60,
                            breakpoints: {
                                1080: {
                                    perView: 2,
                                    peek: {
                                        before: 0,
                                        after: 150
                                    },
                                    gap: 30
                                },
                                768: {
                                    perView: 1,
                                    gap: 20,
                                    peek: {
                                        before: 0,
                                        after: 50
                                    }
                                },
                                568: {
                                    perView: 1,
                                    gap: 20,
                                    peek: {
                                        before: 0,
                                        after: 50
                                    }
                                }
                            }
                        });
                        s.on("run", ( () => {
                            const e = (s.index + 1) / n * 100;
                            r && (r.style.width = `${e}%`)
                        }
                        )),
                        s.mount(),
                        o?.querySelector(".arrow-prev")?.addEventListener("click", ( () => s.go("<"))),
                        o?.querySelector(".arrow-next")?.addEventListener("click", ( () => s.go(">")))
                    }
                    )))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".video");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelector(".video-element")
                          , r = e.querySelector(".play-icon-wrapper");
                        t && r && (r.addEventListener("click", (e => {
                            e.stopPropagation(),
                            t.paused ? t.play() : t.pause()
                        }
                        )),
                        t.addEventListener("play", ( () => {
                            r.style.display = "none"
                        }
                        )),
                        t.addEventListener("pause", ( () => {
                            r.style.display = "flex"
                        }
                        )),
                        t.addEventListener("click", ( () => {
                            t.paused || (t.pause(),
                            t.currentTime = 0,
                            r.style.display = "flex")
                        }
                        )))
                    }
                    ))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".faq, .faq-one-col");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelectorAll(".faq-question");
                        t.forEach((e => {
                            const r = e.nextElementSibling;
                            r && e.addEventListener("click", ( () => {
                                const n = "true" === e.getAttribute("aria-expanded");
                                t.forEach((t => {
                                    t !== e && (t.setAttribute("aria-expanded", "false"),
                                    t.nextElementSibling?.classList.remove("expanded"))
                                }
                                )),
                                e.setAttribute("aria-expanded", String(!n)),
                                r.classList.toggle("expanded", !n)
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".section.steps");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelectorAll(".step-question");
                        t.forEach((e => {
                            const r = e.nextElementSibling;
                            r && e.addEventListener("click", ( () => {
                                const n = "true" === e.getAttribute("aria-expanded");
                                t.forEach((t => {
                                    t !== e && (t.setAttribute("aria-expanded", "false"),
                                    t.nextElementSibling?.classList.remove("expanded"))
                                }
                                )),
                                e.setAttribute("aria-expanded", String(!n)),
                                r.classList.toggle("expanded", !n)
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
                )();
                const r = document.querySelector(".article-references-title")
                  , n = document.querySelector(".article-references")
                  , o = document.querySelector(".icon-arrow");
                r && n && r.addEventListener("click", ( () => {
                    n.classList.toggle("visible"),
                    o.classList.toggle("expanded")
                }
                )),
                ( () => {
                    const e = document.querySelectorAll(".author-bio-wpr");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelector(".tooltip-icon-wrapper")
                          , r = e.querySelector(".author-bio-tooltip");
                        t && r && (t.addEventListener("mouseenter", ( () => {
                            r.classList.add("visible")
                        }
                        )),
                        t.addEventListener("mouseleave", ( () => {
                            r.classList.remove("visible")
                        }
                        )))
                    }
                    ))
                }
                )(),
                ( () => {
                    const e = document.querySelectorAll(".featured-article-main-section");
                    e.length > 0 && e.forEach((e => {
                        const t = [];
                        let r = e.nextElementSibling;
                        for (; r && r.classList.contains("article-content"); )
                            t.push(r),
                            r = r.nextElementSibling;
                        if (t.length > 0) {
                            const r = document.createElement("div");
                            r.classList.add("featured-article-content-wrapper");
                            const n = document.createElement("div");
                            n.classList.add("container-fluid", "lg");
                            const o = document.createElement("div");
                            o.classList.add("inner-wrapper");
                            const s = document.createElement("div");
                            s.classList.add("col-70", "col"),
                            t.forEach((e => {
                                e.classList.contains("article-content-product-wpr") && e.classList.contains("article-content-link-wpr") || s.appendChild(e)
                            }
                            )),
                            o.appendChild(s),
                            n.appendChild(o),
                            r.appendChild(n),
                            e.parentNode.insertBefore(r, e.nextElementSibling);
                            const i = document.querySelector(".article-content-product-wpr");
                            if (i) {
                                const e = document.createElement("div");
                                e.classList.add("col-30", "col"),
                                e.appendChild(i),
                                o.appendChild(e)
                            }
                        }
                    }
                    ))
                }
                )();
                const s = () => {
                    const e = document.querySelectorAll(".logo-tab");
                    e.length > 0 && e.forEach((e => {
                        e.addEventListener("click", ( () => {
                            const t = e.getAttribute("data-tab")
                              , r = document.getElementById(t);
                            r && (s.forEach((e => e.classList.remove("active"))),
                            document.querySelectorAll(".text-tab").forEach((e => e.classList.remove("active"))),
                            e.classList.add("active"),
                            r.classList.add("active"))
                        }
                        ))
                    }
                    ))
                }
                ;
                function i() {
                    const e = document.querySelectorAll(".column-cards, .column-cards-overlay");
                    e.length > 0 && e.forEach((e => {
                        const t = e.querySelectorAll(".card.animated");
                        t.length && new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting ? t.forEach(( (e, t) => {
                                    setTimeout(( () => {
                                        e.classList.add("visible")
                                    }
                                    ), 300 * t)
                                }
                                )) : e.boundingClientRect.top > 0 && t.forEach((e => {
                                    e.classList.remove("visible")
                                }
                                ))
                            }
                            ))
                        }
                        ),{
                            threshold: .6
                        }).observe(e)
                    }
                    ))
                }
                if (s(),
                ( () => {
                    const e = document.querySelector(".ot-sdk-li-item");
                    if (e) {
                        const t = document.querySelector(".menu-wpr .footer-main-wpr:last-of-type .footer-main");
                        t && t.appendChild(e)
                    }
                }
                )(),
                window.initColumnCardsFadeIn = i,
                i(),
                ( () => {
                    const t = document.querySelectorAll(".difference-table-videos");
                    t.length > 0 && (e() || t.forEach((e => {
                        const t = e.querySelector(".comparison-table")
                          , r = e.querySelector(".highlight-background");
                        t && r && new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting && r.classList.add("visible")
                            }
                            ))
                        }
                        ),{
                            threshold: .6
                        }).observe(t)
                    }
                    )))
                }
                )(),
                ( () => {
                    const t = document.querySelectorAll(".animate-image, .animated-container");
                    if (t.length > 0 && !e()) {
                        const e = document.querySelector(".featured-blog-article .tag.pill");
                        t.forEach((t => {
                            new IntersectionObserver((r => {
                                r.forEach((r => {
                                    const n = t.closest(".section")?.classList.contains("blog-journal");
                                    if (r.isIntersecting) {
                                        const r = parseInt(t.getAttribute("data-delay") || 0, 10);
                                        setTimeout(( () => {
                                            t.classList.add("visible"),
                                            n && e && e.classList.add("animation-completed"),
                                            t.classList.contains("animated-container") && (t.classList.add("expanded"),
                                            t.querySelector(".animated-content")?.classList.add("expanded"))
                                        }
                                        ), r)
                                    }
                                }
                                ))
                            }
                            ),{
                                threshold: .2
                            }).observe(t)
                        }
                        ))
                    }
                }
                )(),
                e() || document.querySelectorAll(".testimonial-slider").forEach((e => {
                    const t = e.querySelector(".glide");
                    t && new Glide(t,{
                        type: "carousel",
                        perView: 1,
                        autoplay: 3e3,
                        hoverpause: !0
                    }).mount()
                }
                )),
