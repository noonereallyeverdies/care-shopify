                document.querySelectorAll(".flip-slider").forEach((e => {
                    const t = e.querySelector(".flip-slider-container")
                      , r = e.querySelectorAll(".slider-card")
                      , n = e.querySelector(".next-btn")
                      , o = e.querySelector(".prev-btn");
                    if (!t || 0 === r.length)
                        return;
                    let s = 0;
                    function i(e) {
                        r.forEach(( (t, n) => {
                            if (t.classList.remove("active", "prev", "incoming"),
                            t.style.transform = "",
                            n === e)
                                t.classList.add("active"),
                                t.style.zIndex = r.length;
                            else if (n === (e - 1 + r.length) % r.length)
                                t.classList.add("prev"),
                                t.style.zIndex = r.length - 1;
                            else {
                                t.classList.add("incoming");
                                const o = (n - e + r.length) % r.length
                                  , s = 35 * o
                                  , i = 1 - .1 * o;
                                t.style.transform = `translateX(${s}px) scale(${i})`,
                                t.style.zIndex = r.length - o - 1
                            }
                        }
                        ))
                    }
                    n?.addEventListener("click", ( () => {
                        s = (s + 1) % r.length,
                        i(s)
                    }
                    )),
                    o?.addEventListener("click", ( () => {
                        s = (s - 1 + r.length) % r.length,
                        i(s)
                    }
                    )),
                    i(s)
                }
                )),
                e() || document.querySelectorAll(".logo-tabs-section").forEach((e => {
                    const t = e.querySelector(".mobile-tabs-slider .glide");
                    t && new Glide(t,{
                        type: "carousel",
                        perView: 1,
                        autoplay: 5e3,
                        hoverpause: !0
                    }).mount()
                }
                )),
                !e()) {
                    function l() {
                        document.querySelectorAll(".product-slider:not(.blog-slider)").forEach((e => {
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
                        ))
                    }
                    function c() {
                        const e = document.querySelectorAll(".results-simple-video");
                        e.length > 0 && e.forEach((e => {
                            const t = e.querySelector(".icon-play")
                              , r = e.querySelector(".video-element");
                            e.querySelector(".video-wpr"),
                            t.addEventListener("click", ( () => {
                                e.classList.add("playing"),
                                e.querySelector(".video-element").play(),
                                t.style.display = "none"
                            }
                            )),
                            r.addEventListener("click", ( () => {
                                e.classList.contains("playing") && (e.querySelector(".video-element").pause(),
                                t.style.display = "block",
                                e.classList.remove("playing"))
                            }
                            ))
                        }
                        ))
                    }
                    document.querySelectorAll(".powered-by-ai").forEach((e => {
                        const t = e.querySelector(".text-slider .glide");
                        if (!t)
                            return;
                        const r = e.querySelector(".progress")
                          , n = e.querySelectorAll(".glide__slide").length
                          , o = (e.querySelector(".glide-controls"),
                        new Glide(t,{
                            type: "carousel",
                            perView: 1,
                            autoplay: 5e3,
                            hoverpause: !0
                        }));
                        o.on("run", ( () => {
                            const e = (o.index + 1) / n * 100;
                            r && (r.style.width = `${e}%`)
                        }
                        )),
                        o.mount()
                    }
                    )),
                    document.querySelectorAll(".clinical-trials-filter").forEach((e => {
                        const t = e.querySelector(".load-more-wrapper .load-more")
                          , r = e.querySelector(".load-more-wrapper .icon-down-wpr");
                        t && (t.addEventListener("click", ( () => {
                            e.querySelectorAll(".insert-cards .card").forEach((e => {
                                e.style.display = "block"
                            }
                            )),
                            e.querySelector(".load-more-wrapper").style.display = "none"
                        }
                        )),
                        r.addEventListener("click", ( () => {
                            e.querySelectorAll(".insert-cards .card").forEach((e => {
                                e.style.display = "block"
                            }
                            )),
                            e.querySelector(".load-more-wrapper").style.display = "none"
                        }
                        )))
                    }
                    )),
                    window.initProductSliders = l,
                    l(),
                    document.querySelectorAll(".blog-slider").forEach((e => {
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
                            swipeThreshold: !1,
                            dragThreshold: !1,
                            peek: {
                                before: 0,
                                after: 200
                            },
                            gap: 30,
                            breakpoints: {
                                1280: {
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
                    )),
                    document.querySelectorAll(".multi-image-parallax").forEach((e => {
                        const t = e.querySelectorAll(".main-image .image");
                        if (!t.length)
                            return;
                        function r() {
                            const e = window.scrollY;
                            t.forEach((t => {
                                const r = t.getBoundingClientRect()
                                  , n = t.offsetHeight
                                  , o = e + r.top
                                  , s = window.innerHeight
                                  , i = o - s
                                  , l = (e - i) / (o + n + s - i)
                                  , c = 100 * Math.max(0, Math.min(10, l)) - 50;
                                t.style.objectPosition = `50% ${Math.round(c)}px`
                            }
                            ))
                        }
                        const n = new IntersectionObserver((function(e) {
                            e.forEach((e => {
                                e.isIntersecting ? window.addEventListener("scroll", r) : window.removeEventListener("scroll", r)
                            }
                            ))
                        }
                        ),{
                            root: null,
                            threshold: 0
                        });
                        t.forEach((e => n.observe(e)))
                    }
                    )),
                    window.initResultsVideo = c,
                    c();
                    const m = document.querySelectorAll(".filter-view-toggle .filter-view");
                    m.forEach((e => {
                        e.addEventListener("click", ( () => {
                            m.forEach((e => {
                                e.classList.remove("active")
                            }
                            )),
                            e.classList.add("active");
                            const t = e.getAttribute("data-view-toggle")
                              , r = document.querySelector(".inner-wrapper.insert-cards");
                            r.classList.remove("grid-view", "list-view"),
                            r.classList.add(t)
                        }
                        )),
                        window.innerWidth < 768 && "list-view" === e.getAttribute("data-view-toggle") && e.click()
                    }
                    ));
                    const f = document.querySelectorAll(".hero")
                      , g = new IntersectionObserver((e => {
                        e.forEach((e => {
                            e.isIntersecting ? e.target.classList.add("in-view") : e.target.classList.remove("in-view")
                        }
                        ))
                    }
                    ),{
                        threshold: .1
                    });
                    f.forEach((function(e) {
                        g.observe(e);
                        const t = e.querySelector(".video-element");
                        if (!t)
                            return;
                        const r = window.matchMedia("(min-width: 768px)").matches;
                        t.src = r ? t.dataset.desktopVideo : t.dataset.mobileVideo
                    }
                    )),
                    e() || window.lenis.on("scroll", (e => {
                        const t = e.scroll;
                        f.forEach((e => {
                            if (e.classList.contains("in-view")) {
                                const r = e.querySelector(".main-image img, .video-element");
                                if (!r)
                                    return;
                                const n = e.offsetTop
                                  , o = .2 * (t - n)
                                  , s = Math.min(Math.max(o, 0), 100);
                                r.style.objectPosition = `center ${s}px`
                            }
                        }
                        ))
                    }
                    )),
                    document.querySelectorAll(".peptide-banner-badge-text").forEach((function(e) {
                        var t = e.textContent.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
                        if (e.parentElement.classList.add("processed"),
                        t) {
                            var r = t[1]
                              , n = t[2];
                            e.innerHTML = "<span>" + r + "</span>" + (n ? '<span class="suffix">' + n + "</span>" : "")
                        }
                    }
                    )),
                    document.querySelectorAll(".featured-media-gallery").forEach((e => {
                        e.querySelectorAll(".media-item:not(.video-item)").length && new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting
                            }
                            ))
                        }
                        ),{
                            threshold: .3
                        }).observe(e)
                    }
                    )),
                    document.querySelectorAll(".five-reasons-why").forEach((e => {
                        const t = e.querySelectorAll(".reason-why")
                          , r = e.querySelector("#lines")
                          , n = e.querySelector(".reasons-why-wpr");
                        if (!t.length || !r || !n)
                            return;
                        let o = 0
                          , s = null
                          , i = null;
                        function l() {
                            r.innerHTML = "",
                            t.forEach(( (e, n) => {
                                if (n === t.length - 1)
                                    return;
                                const o = e.getBoundingClientRect()
                                  , s = t[n + 1].getBoundingClientRect()
                                  , i = r.getBoundingClientRect()
                                  , l = o.left + o.width / 2 - i.left
                                  , c = o.top + o.height / 2 - i.top
                                  , a = s.left + s.width / 2 - i.left
                                  , d = s.top + s.height / 2 - i.top;
                                let u = r.querySelector("defs");
                                if (!u) {
                                    u = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
                                    r.appendChild(u);
                                    const e = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                                    e.setAttribute("id", "strokeGradient"),
                                    e.setAttribute("x1", "0%"),
                                    e.setAttribute("y1", "0%"),
                                    e.setAttribute("x2", "100%"),
                                    e.setAttribute("y2", "0%"),
                                    [{
                                        offset: "0%",
                                        color: "#a85a2e"
                                    }, {
                                        offset: "2%",
                                        color: "#864622"
                                    }, {
                                        offset: "6%",
                                        color: "#7b3f1e"
                                    }, {
                                        offset: "10%",
                                        color: "#914c25"
                                    }, {
                                        offset: "12%",
                                        color: "#9e5429"
                                    }, {
                                        offset: "17%",
                                        color: "#bd652f"
                                    }, {
                                        offset: "20%",
                                        color: "#cb7342"
                                    }, {
                                        offset: "22%",
                                        color: "#d67c50"
                                    }, {
                                        offset: "25%",
                                        color: "#ce7747"
                                    }, {
                                        offset: "28.99%",
                                        color: "#bf6432"
                                    }, {
                                        offset: "29.99%",
                                        color: "#bb6130"
                                    }, {
                                        offset: "35.99%",
                                        color: "#a85429"
                                    }, {
                                        offset: "37.99%",
                                        color: "#a35128"
                                    }, {
                                        offset: "41.99%",
                                        color: "#9d4f28"
                                    }, {
                                        offset: "48.99%",
                                        color: "#a6572e"
                                    }, {
                                        offset: "55.99%",
                                        color: "#a6572e"
                                    }, {
                                        offset: "57.99%",
                                        color: "#ab5b32"
                                    }, {
                                        offset: "61.99%",
                                        color: "#b9663c"
                                    }, {
                                        offset: "67.99%",
                                        color: "#d27a4d"
                                    }, {
                                        offset: "70.99%",
                                        color: "#e88d5f"
                                    }, {
                                        offset: "74.99%",
                                        color: "#f79a6b"
                                    }, {
                                        offset: "77.99%",
                                        color: "#f79a6b"
                                    }, {
                                        offset: "79.99%",
                                        color: "#ed9264"
                                    }, {
                                        offset: "82.99%",
                                        color: "#d37e51"
                                    }, {
                                        offset: "83.99%",
                                        color: "#ce7a4e"
                                    }, {
                                        offset: "87.99%",
                                        color: "#af6037"
                                    }, {
                                        offset: "89.99%",
                                        color: "#a2552d"
                                    }, {
                                        offset: "95.99%",
                                        color: "#86492a"
                                    }, {
                                        offset: "99.99%",
                                        color: "#b6633b"
                                    }].forEach(( ({offset: t, color: r}) => {
                                        const n = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                                        n.setAttribute("offset", t),
                                        n.setAttribute("stop-color", r),
                                        e.appendChild(n)
                                    }
                                    )),
                                    u.appendChild(e)
                                }
                                const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
                                h.setAttribute("x1", l),
                                h.setAttribute("y1", c),
                                h.setAttribute("x2", a),
                                h.setAttribute("y2", d),
                                h.setAttribute("stroke", "url(#strokeGradient)"),
                                h.setAttribute("stroke-width", "1"),
                                r.appendChild(h)
                            }
                            ))
                        }
                        function c() {
                            !function() {
                                const e = n.getBoundingClientRect();
                                r.style.width = `${e.width}px`,
                                r.style.height = `${e.height}px`,
                                r.style.position = "absolute"
                            }(),
                            l()
                        }
                        function a() {
                            t.forEach((e => e.classList.remove("active"))),
                            t[o].classList.add("active"),
                            o = (o + 1) % t.length,
                            l()
                        }
                        function d() {
                            s || (s = setInterval(a, 5e3))
                        }
                        function u() {
                            s && (clearInterval(s),
                            s = null)
                        }
                        function h() {
                            i || (i = setInterval(l, 50))
                        }
                        new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting ? (d(),
                                h()) : (u(),
                                i && (clearInterval(i),
                                i = null))
                            }
                            ))
                        }
                        ),{
                            threshold: .1
                        }).observe(n),
                        t.forEach(( (e, t) => {
                            e.addEventListener("mouseenter", ( () => {
                                e.classList.contains("active") && u()
                            }
                            )),
                            e.addEventListener("mouseleave", ( () => {
                                e.classList.contains("active") && d()
                            }
                            )),
                            e.addEventListener("click", ( () => {
                                u(),
                                o = t,
                                a(),
                                d()
                            }
                            ))
                        }
                        )),
                        c(),
                        a(),
                        d(),
                        h(),
                        window.addEventListener("resize", c)
                    }
                    ));
                    const y = document.querySelector(".additional-pr-stories");
                    if (y) {
                        const w = y.querySelector(".load-more")
                          , L = y.querySelector(".icon-down-wpr")
                          , A = y.querySelectorAll(".story");
                        function a() {
                            A.length > 0 && (A.forEach((e => {
                                e.classList.contains("hidden") && e.classList.remove("hidden")
                            }
                            )),
                            w.style.display = "none",
                            L.style.display = "none")
                        }
                        w && w.addEventListener("click", a),
                        L && L.addEventListener("click", a)
                    }
                    function d() {
                        if (!e()) {
                            let r = window.innerWidth > 1080 ? .75 * window.innerHeight : 0;
                            const n = []
                              , o = document.querySelectorAll(".image-text-slide-in");
                            if (!o.length)
                                return;
                            o.forEach((e => {
                                const t = e.querySelectorAll(".timeline-item")
                                  , r = e.querySelector(".flex-wpr")
                                  , o = e.querySelector(".timeline-line .timeline-progress")
                                  , s = e.querySelectorAll(".tooltip")
                                  , i = e.querySelectorAll(".images")
                                  , l = e.querySelector(".timeline-wpr")
                                  , c = e.querySelector(".image");
                                if (!(t.length && r && o && s.length && i.length))
                                    return;
                                const a = r.offsetHeight
                                  , d = a / t.length;
                                n.push({
                                    section: e,
                                    flexWrapper: r,
                                    timelineWrapper: l,
                                    timelineItems: Array.from(t),
                                    timelineLine: o,
                                    tooltips: Array.from(s),
                                    images: Array.from(i),
                                    imageElement: c,
                                    wrapperHeight: a,
                                    segmentHeight: d
                                })
                            }
                            ));
                            const s = new IntersectionObserver((e => {
                                e.forEach((e => {
                                    const t = n.find((t => t.section === e.target));
                                    t && (e.isIntersecting || e.boundingClientRect.top < 0 ? (t.flexWrapper.classList.add("visible"),
                                    t.timelineWrapper.classList.add("visible")) : e.boundingClientRect.top > 0 && (t.flexWrapper.classList.remove("visible"),
                                    t.timelineWrapper.classList.remove("visible")))
                                }
                                ))
                            }
                            ),{
                                root: null,
                                threshold: .25
                            });
                            function t(e, t) {
                                const {flexWrapper: n, timelineItems: o, timelineLine: s, tooltips: i, images: l, wrapperHeight: c} = e
                                  , a = window.scrollY
                                  , d = n.getBoundingClientRect().top + a - r
                                  , u = d + c
                                  , h = u - d
                                  , p = Math.min(Math.max((a - d) / h, 0), 1)
                                  , m = o.length
                                  , f = Math.floor(p * m)
                                  , g = f / m
                                  , y = (f + 1) / m
                                  , v = Math.min(Math.max((p - g) / (y - g), 0), 1);
                                o.forEach(( (e, t) => {
                                    t === f || a >= u - window.innerHeight && t === o.length - 1 ? e.classList.add("visible") : e.classList.remove("visible")
                                }
                                )),
                                i.forEach(( (e, t) => t === f ? e.classList.add("active") : e.classList.remove("active"))),
                                l.forEach(( (e, t) => {
                                    t === f || a >= u - window.innerHeight && t === l.length - 1 ? e.classList.add("visible") : e.classList.remove("visible")
                                }
                                )),
                                requestAnimationFrame(( () => {
                                    if (t === m - 1 && p >= .925)
                                        return;
                                    const e = 0 === t ? 0 : o[t].getBoundingClientRect().top - 150
                                      , r = o[t].offsetHeight;
                                    s.style.transform = `translateY(${e}px) scaleY(${v})`,
                                    s.style.height = `${r}px`,
                                    s.style.bottom = "unset",
                                    s.style.top = "0"
                                }
                                ))
                            }
                            n.forEach((e => s.observe(e.section))),
                            n.forEach((e => {
                                if (!e.imageElement)
                                    return;
                                const t = () => {
                                    e.timelineWrapper.style.minHeight = `${e.imageElement.offsetHeight}px`
                                }
                                ;
                                e.imageElement.complete ? t() : e.imageElement.addEventListener("load", t)
                            }
                            )),
                            n.forEach((e => t(e, 0))),
                            window.addEventListener("scroll", ( () => {
                                const e = window.scrollY;
                                window.innerWidth >= 1080 && n.forEach((n => {
                                    const {flexWrapper: o, wrapperHeight: s, segmentHeight: i, timelineItems: l} = n
                                      , c = o.getBoundingClientRect().top + e - r
                                      , a = c + s;
                                    let d = -1;
                                    l.forEach(( (t, r) => {
                                        const n = c + i * r;
                                        e >= n && e < n + i && (d = r)
                                    }
                                    )),
                                    e < c ? d = 0 : e > a - window.innerHeight && (d = l.length - 1),
                                    t(n, d)
                                }
                                ))
                            }
                            ), {
                                passive: !0
                            }),
                            window.addEventListener("resize", ( () => {
                                r = window.innerWidth > 1080 ? .75 * window.innerHeight : 0,
                                n.forEach((e => {
                                    e.wrapperHeight = e.flexWrapper.offsetHeight,
                                    e.segmentHeight = e.wrapperHeight / e.timelineItems.length
                                }
                                ))
                            }
                            )),
                            n.forEach((e => {
                                e.timelineItems.forEach((n => {
                                    const o = n.querySelector(".title")
                                      , s = n.querySelector(".content");
                                    o && s && o.addEventListener("click", ( () => {
                                        if (window.innerWidth <= 1080)
                                            e.timelineItems.forEach((e => e.classList.remove("visible"))),
                                            n.classList.toggle("visible");
                                        else {
                                            const o = Array.from(e.timelineItems).indexOf(n)
                                              , s = e.flexWrapper.getBoundingClientRect().top + window.scrollY - r;
                                            window.scrollTo({
                                                top: s + o * e.segmentHeight + 150,
                                                behavior: "smooth"
                                            }),
                                            t(e, o),
                                            setTimeout(( () => window.scrollBy(0, 1)), 600)
                                        }
                                    }
                                    ))
                                }
                                ))
                            }
                            ))
                        }
                    }
                    document.querySelectorAll(".large-before-after").forEach((e => {
                        const t = e.querySelectorAll(".slide")
                          , r = e.querySelectorAll(".label__line")
                          , n = e.querySelectorAll(".label");
                        if (t.length > 1 && r.length > 0 && n.length > 0) {
                            const s = [];
                            t.forEach((e => {
                                const t = e.getBoundingClientRect().top + window.scrollY;
                                s.push(t)
                            }
                            ));
                            const i = t[t.length - 1]
                              , l = i.getBoundingClientRect().top + window.scrollY + i.offsetHeight;
                            function o() {
                                const e = window.scrollY || window.pageYOffset;
                                r.forEach(( (t, r) => {
                                    const o = s[r]
                                      , i = s[r + 1]
                                      , l = n[r]
                                      , c = o + .75 * (i - o);
                                    if (e < o)
                                        return t.style.transform = "translateY(-50%) scaleX(0)",
                                        void (l && (l.classList.remove("active"),
                                        l.classList.remove("passed")));
                                    if (e >= i)
                                        return t.style.transform = "translateY(-50%) scaleX(1)",
                                        void (l && (l.classList.remove("active"),
                                        l.classList.add("passed")));
                                    if (e >= c)
                                        return t.style.transform = "translateY(-50%) scaleX(1)",
                                        void (l && (l.classList.remove("active"),
                                        l.classList.add("passed")));
                                    const a = (e - o) / (c - o);
                                    t.style.transform = `translateY(-50%) scaleX(${a})`,
                                    l && (l.classList.add("active"),
                                    l.classList.remove("passed"))
                                }
                                ))
                            }
                            s.push(l),
                            window.addEventListener("scroll", o),
                            o(),
                            n.forEach((e => {
                                e.addEventListener("click", (function() {
                                    const r = e.getAttribute("data-slide") - 1
                                      , n = t[r];
                                    if (n) {
                                        const e = n.getBoundingClientRect().top + window.scrollY;
                                        window.scrollTo({
                                            top: e,
                                            behavior: "smooth"
                                        })
                                    }
                                }
                                ))
                            }
                            ))
                        }
                    }
                    )),
                    window.initImageTextSlideIn = d,
                    d();
                    const v = document.querySelector(".faq-tabs");
                    if (!v)
                        return;
                    const S = v.querySelectorAll('.faq-tabs-navigation [role="tab"]')
                      , q = v.querySelectorAll(".faq-item")
                      , E = v.querySelectorAll(".mobile-faq-item")
                      , b = v.querySelector("#faq-search-input");
                    function u(e, t, r) {
                        e.forEach((n => {
                            const o = n.querySelector(t)
                              , s = n.querySelector(r);
                            o.addEventListener("click", ( () => {
                                const n = "true" === o.getAttribute("aria-expanded");
                                e.forEach((e => {
                                    const n = e.querySelector(t)
                                      , o = e.querySelector(r);
                                    n.setAttribute("aria-expanded", "false"),
                                    o.hidden = !0
                                }
                                )),
                                n || (o.setAttribute("aria-expanded", "true"),
                                s.hidden = !1)
                            }
                            ))
                        }
                        ))
                    }
                    S.forEach((e => {
                        e.addEventListener("click", ( () => {
                            S.forEach((e => e.classList.remove("active"))),
                            e.classList.add("active");
                            const t = e.dataset.tab;
                            q.forEach((e => {
                                if (e.dataset.tabContent === t) {
                                    e.style.display = "block",
                                    e.classList.add("active");
                                    const r = Array.from(q).filter((e => e.dataset.tabContent === t));
                                    r.forEach(( (e, t) => {}
                                    ))
                                } else {
                                    e.style.display = "none",
                                    e.classList.remove("active");
                                    const r = Array.from(q).filter((e => e.dataset.tabContent !== t));
                                    r.forEach(( (e, t) => {
                                        0 === t && (e.style.paddingTop = "",
                                        e.style.borderTop = "")
                                    }
                                    ))
                                }
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    S.length > 0 && S[0].click(),
                    u(q, ".faq-question", ".faq-answer"),
                    u(E, ".mobile-faq-question", ".mobile-faq-answer"),
                    b && b.addEventListener("input", (function() {
                        const e = this.value.toLowerCase();
                        if ("" === e) {
                            const e = v.querySelector('.faq-tabs-navigation [role="tab"].active');
                            if (e) {
                                const t = e.dataset.tab;
                                q.forEach((e => {
                                    e.dataset.tabContent === t ? e.style.display = "block" : e.style.display = "none"
                                }
                                ))
                            }
                        } else
                            q.forEach((t => {
                                t.querySelector(".faq-question").textContent.toLowerCase().includes(e) ? t.style.display = "block" : t.style.display = "none"
                            }
                            ))
                    }
                    )),
                    document.querySelectorAll(".simple-text-section").forEach((e => {
                        if (e.classList.contains("remove-padding-bottom")) {
                            const t = e.closest(".shopify-section");
                            t && (t.style.marginBottom = "-40px")
                        }
                    }
                    ))
                }
            }
            ))
        }
    }
      , t = {};
    function r(n) {
        var o = t[n];
        if (void 0 !== o)
            return o.exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n](s, s.exports, r),
        s.exports
    }
    !function() {
        "use strict";
        if (function() {
            const e = navigator.userAgent
              , t = e.match(/OS (\d+)_/);
            let r = "";
            return !(!/iPad|iPhone|iPod/.test(e) || !t) && (r = parseInt(t[1], 10),
            r <= 14)
        }() && document.querySelector(".page-container").classList.add("no-lenis"),
        function() {
            const e = navigator.userAgent
              , t = e.match(/OS (\d+)_(\d+)/);
            if (/iPad|iPhone|iPod/.test(e) && t) {
                const e = parseInt(t[1], 10)
                  , r = parseInt(t[2], 10);
                return parseFloat(`${e}.${r}`) <= 13.4
            }
            return !1
        }()) {
            const e = document.createElement("div");
            e.style.position = "fixed",
            e.style.top = "0",
            e.style.left = "0",
            e.style.width = "100%",
            e.style.backgroundColor = "#ffcc00",
            e.style.color = "#000",
            e.style.padding = "10px 20px",
            e.style.zIndex = "1000",
            e.style.textAlign = "center";
            const t = document.createElement("p");
            t.classList.add("mb-0", "sm"),
            t.textContent = "Your browser or device is too old to view this site properly. Please update your browser or device.",
            e.appendChild(t),
            document.body.prepend(e),
            document.querySelector(".header-wpr").style.top = "58px"
        }
        document.addEventListener("DOMContentLoaded", (function() {}
        )),
        r(367),
        r(314),
        r(299);
        class e extends HTMLElement {
            constructor() {
                super(),
                this.input = this.querySelector('input[type="search"]'),
                this.resetButton = this.querySelector('button[type="reset"]'),
                this.input && (this.input.form.addEventListener("reset", this.onFormReset.bind(this)),
                this.input.addEventListener("input", function(e) {
                    let t;
                    return (...r) => {
                        clearTimeout(t),
                        t = setTimeout(( () => e.apply(this, r)), 300)
                    }
                }((e => {
                    this.onChange(e)
                }
                )).bind(this)))
            }
            toggleResetButton() {
                const e = this.resetButton.classList.contains("hidden");
                this.input.value.length > 0 && e ? this.resetButton.classList.remove("hidden") : 0 !== this.input.value.length || e || this.resetButton.classList.add("hidden")
            }
            onChange() {
                this.toggleResetButton()
            }
            shouldResetForm() {
                return !document.querySelector('[aria-selected="true"] a')
            }
            onFormReset(e) {
                e.preventDefault(),
                this.shouldResetForm() && (this.input.value = "",
                this.input.focus(),
                this.toggleResetButton())
            }
        }
        customElements.define("search-form", e),
        customElements.define("main-search", class extends e {
            constructor() {
                super(),
                this.allSearchInputs = document.querySelectorAll('input[type="search"]'),
                this.setupEventListeners()
            }
            setupEventListeners() {
                let e = [];
                this.allSearchInputs.forEach((t => e.push(t.form))),
                this.input.addEventListener("focus", this.onInputFocus.bind(this)),
                e.length < 2 || (e.forEach((e => e.addEventListener("reset", this.onFormReset.bind(this)))),
                this.allSearchInputs.forEach((e => e.addEventListener("input", this.onInput.bind(this)))))
            }
            onFormReset(e) {
                super.onFormReset(e),
                super.shouldResetForm() && this.keepInSync("", this.input)
            }
            onInput(e) {
                const t = e.target;
                this.keepInSync(t.value, t)
            }
            onInputFocus() {
                window.innerWidth < 750 && this.scrollIntoView({
                    behavior: "smooth"
                })
            }
            keepInSync(e, t) {
                this.allSearchInputs.forEach((r => {
                    r !== t && (r.value = e)
                }
                ))
            }
        }
        ),
        customElements.define("predictive-search", class extends e {
            constructor() {
                super(),
                this.cachedResults = {},
                this.predictiveSearchResults = this.querySelector("[data-predictive-search]"),
                this.allPredictiveSearchInstances = document.querySelectorAll("predictive-search"),
                this.isOpen = !1,
                this.abortController = new AbortController,
                this.searchTerm = "",
                this.setupEventListeners()
            }
            setupEventListeners() {
                this.input.form.addEventListener("submit", this.onFormSubmit.bind(this)),
                this.input.addEventListener("focus", this.onFocus.bind(this)),
                this.addEventListener("focusout", this.onFocusOut.bind(this)),
                this.addEventListener("keyup", this.onKeyup.bind(this)),
                this.addEventListener("keydown", this.onKeydown.bind(this))
            }
            getQuery() {
                return this.input.value.trim()
            }
            onChange() {
                super.onChange();
                const e = this.getQuery();
                this.searchTerm && e.startsWith(this.searchTerm) || this.querySelector("#predictive-search-results-groups-wrapper")?.remove(),
                this.updateSearchForTerm(this.searchTerm, e),
                this.searchTerm = e,
                this.searchTerm.length ? this.getSearchResults(this.searchTerm) : this.close(!0)
            }
            onFormSubmit(e) {
                this.getQuery().length && !this.querySelector('[aria-selected="true"] a') || e.preventDefault()
            }
            onFormReset(e) {
                super.onFormReset(e),
                super.shouldResetForm() && (this.searchTerm = "",
                this.abortController.abort(),
                this.abortController = new AbortController,
                this.closeResults(!0))
            }
            onFocus() {
                const e = this.getQuery();
                e.length && (this.searchTerm !== e ? this.onChange() : "true" === this.getAttribute("results") ? this.open() : this.getSearchResults(this.searchTerm))
            }
            onFocusOut() {
                setTimeout(( () => {
                    this.contains(document.activeElement) || this.close()
                }
                ))
            }
            onKeyup(e) {
                switch (this.getQuery().length || this.close(!0),
                e.preventDefault(),
                e.code) {
                case "ArrowUp":
                    this.switchOption("up");
                    break;
                case "ArrowDown":
                    this.switchOption("down");
                    break;
                case "Enter":
                    this.selectOption()
                }
            }
            onKeydown(e) {
                "ArrowUp" !== e.code && "ArrowDown" !== e.code || e.preventDefault()
            }
            updateSearchForTerm(e, t) {
                const r = this.querySelector("[data-predictive-search-search-for-text]")
                  , n = r?.innerText;
                if (n) {
                    if (n.match(new RegExp(e,"g")).length > 1)
                        return;
                    const o = n.replace(e, t);
                    r.innerText = o
                }
            }
            switchOption(e) {
                if (!this.getAttribute("open"))
                    return;
                const t = "up" === e
                  , r = this.querySelector('[aria-selected="true"]')
                  , n = Array.from(this.querySelectorAll("li, button.predictive-search__item")).filter((e => null !== e.offsetParent));
                let o = 0;
                if (t && !r)
                    return;
                let s = -1
                  , i = 0;
                for (; -1 === s && i <= n.length; )
                    n[i] === r && (s = i),
                    i++;
                if (this.statusElement.textContent = "",
                !t && r ? o = s === n.length - 1 ? 0 : s + 1 : t && (o = 0 === s ? n.length - 1 : s - 1),
                o === s)
                    return;
                const l = n[o];
                l.setAttribute("aria-selected", !0),
                r && r.setAttribute("aria-selected", !1),
                this.input.setAttribute("aria-activedescendant", l.id)
            }
            selectOption() {
                const e = this.querySelector('[aria-selected="true"] a, button[aria-selected="true"]');
                e && e.click()
            }
            getSearchResults(e) {
                const t = e.replace(" ", "-").toLowerCase();
                this.setLiveRegionLoadingState(),
                this.cachedResults[t] ? this.renderSearchResults(this.cachedResults[t]) : fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(e)}&section_id=predictive-search`, {
                    signal: this.abortController.signal
                }).then((e => {
                    if (!e.ok) {
                        var t = new Error(e.status);
                        throw this.close(),
                        t
                    }
                    return e.text()
                }
                )).then((e => {
                    const r = (new DOMParser).parseFromString(e, "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
                    this.allPredictiveSearchInstances.forEach((e => {
                        e.cachedResults[t] = r
                    }
                    )),
                    this.renderSearchResults(r)
                }
                )).catch((e => {
                    if (20 !== e?.code)
                        throw this.close(),
                        e
                }
                ))
            }
            setLiveRegionLoadingState() {
                this.statusElement = this.statusElement || this.querySelector(".predictive-search-status"),
                this.loadingText = this.loadingText || this.getAttribute("data-loading-text"),
                this.setLiveRegionText(this.loadingText),
                this.setAttribute("loading", !0)
            }
            setLiveRegionText(e) {
                this.statusElement.setAttribute("aria-hidden", "false"),
                this.statusElement.textContent = e,
                setTimeout(( () => {
                    this.statusElement.setAttribute("aria-hidden", "true")
                }
                ), 1e3)
            }
            renderSearchResults(e) {
                this.predictiveSearchResults.innerHTML = e,
                this.setAttribute("results", !0),
                this.setLiveRegionResults(),
                this.open()
            }
            setLiveRegionResults() {
                this.removeAttribute("loading"),
                this.setLiveRegionText(this.querySelector("[data-predictive-search-live-region-count-value]").textContent)
            }
            getResultsMaxHeight() {
                return this.resultsMaxHeight = window.innerHeight - document.querySelector(".section-header")?.getBoundingClientRect().bottom,
                this.resultsMaxHeight
            }
            open() {
                this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || `${this.getResultsMaxHeight()}px`,
                this.setAttribute("open", !0),
                this.input.setAttribute("aria-expanded", !0),
                this.isOpen = !0
            }
            close(e=!1) {
                this.closeResults(e),
                this.isOpen = !1
            }
            closeResults(e=!1) {
                e && (this.input.value = "",
                this.removeAttribute("results"));
                const t = this.querySelector('[aria-selected="true"]');
                t && t.setAttribute("aria-selected", !1),
                this.input.setAttribute("aria-activedescendant", ""),
                this.removeAttribute("loading"),
                this.removeAttribute("open"),
                this.input.setAttribute("aria-expanded", !1),
                this.resultsMaxHeight = !1,
                this.predictiveSearchResults.removeAttribute("style")
            }
        }
        )
    }()
}();
