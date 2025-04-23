
                            lang: markFunction((function(e) {
                                return G.test(e || "") || Sizzle.error("unsupported lang: " + e),
                                e = e.replace(te, funescape).toLowerCase(),
                                function(t) {
                                    var n;
                                    do {
                                        if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                            return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                            }
                            )),
                            target: function(t) {
                                var n = e.location && e.location.hash;
                                return n && n.slice(1) === t.id
                            },
                            root: function(e) {
                                return e === m
                            },
                            focus: function(e) {
                                return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            },
                            enabled: function(e) {
                                return !1 === e.disabled
                            },
                            disabled: function(e) {
                                return !0 === e.disabled
                            },
                            checked: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex,
                                !0 === e.selected
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6)
                                        return !1;
                                return !0
                            },
                            parent: function(e) {
                                return !r.pseudos.empty(e)
                            },
                            header: function(e) {
                                return J.test(e.nodeName)
                            },
                            input: function(e) {
                                return K.test(e.nodeName)
                            },
                            button: function(e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            },
                            text: function(e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                            },
                            first: createPositionalPseudo((function() {
                                return [0]
                            }
                            )),
                            last: createPositionalPseudo((function(e, t) {
                                return [t - 1]
                            }
                            )),
                            eq: createPositionalPseudo((function(e, t, n) {
                                return [n < 0 ? n + t : n]
                            }
                            )),
                            even: createPositionalPseudo((function(e, t) {
                                for (var n = 0; n < t; n += 2)
                                    e.push(n);
                                return e
                            }
                            )),
                            odd: createPositionalPseudo((function(e, t) {
                                for (var n = 1; n < t; n += 2)
                                    e.push(n);
                                return e
                            }
                            )),
                            lt: createPositionalPseudo((function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; --r >= 0; )
                                    e.push(r);
                                return e
                            }
                            )),
                            gt: createPositionalPseudo((function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; ++r < t; )
                                    e.push(r);
                                return e
                            }
                            ))
                        }
                    },
                    r.pseudos.nth = r.pseudos.eq,
                    {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    })
                        r.pseudos[t] = createInputPseudo(t);
                    for (t in {
                        submit: !0,
                        reset: !0
                    })
                        r.pseudos[t] = createButtonPseudo(t);
                    function setFilters() {}
                    function toSelector(e) {
                        for (var t = 0, n = e.length, r = ""; t < n; t++)
                            r += e[t].value;
                        return r
                    }
                    function addCombinator(e, t, n) {
                        var r = t.dir
                          , i = n && "parentNode" === r
                          , a = k++;
                        return t.first ? function(t, n, a) {
                            for (; t = t[r]; )
                                if (1 === t.nodeType || i)
                                    return e(t, n, a)
                        }
                        : function(t, n, o) {
                            var s, l, c, u = [C, a];
                            if (o) {
                                for (; t = t[r]; )
                                    if ((1 === t.nodeType || i) && e(t, n, o))
                                        return !0
                            } else
                                for (; t = t[r]; )
                                    if (1 === t.nodeType || i) {
                                        if ((s = (l = (c = t[w] || (t[w] = {}))[t.uniqueID] || (c[t.uniqueID] = {}))[r]) && s[0] === C && s[1] === a)
                                            return u[2] = s[2];
                                        if (l[r] = u,
                                        u[2] = e(t, n, o))
                                            return !0
                                    }
                        }
                    }
                    function elementMatcher(e) {
                        return e.length > 1 ? function(t, n, r) {
                            for (var i = e.length; i--; )
                                if (!e[i](t, n, r))
                                    return !1;
                            return !0
                        }
                        : e[0]
                    }
                    function condense(e, t, n, r, i) {
                        for (var a, o = [], s = 0, l = e.length, c = null != t; s < l; s++)
                            (a = e[s]) && (n && !n(a, r, i) || (o.push(a),
                            c && t.push(s)));
                        return o
                    }
                    function setMatcher(e, t, n, r, i, a) {
                        return r && !r[w] && (r = setMatcher(r)),
                        i && !i[w] && (i = setMatcher(i, a)),
                        markFunction((function(a, o, s, l) {
                            var c, u, d, p = [], f = [], m = o.length, g = a || function multipleContexts(e, t, n) {
                                for (var r = 0, i = t.length; r < i; r++)
                                    Sizzle(e, t[r], n);
                                return n
                            }(t || "*", s.nodeType ? [s] : s, []), v = !e || !a && t ? g : condense(g, p, e, s, l), _ = n ? i || (a ? e : m || r) ? [] : o : v;
                            if (n && n(v, _, s, l),
                            r)
                                for (c = condense(_, f),
                                r(c, [], s, l),
                                u = c.length; u--; )
                                    (d = c[u]) && (_[f[u]] = !(v[f[u]] = d));
                            if (a) {
                                if (i || e) {
                                    if (i) {
                                        for (c = [],
                                        u = _.length; u--; )
                                            (d = _[u]) && c.push(v[u] = d);
                                        i(null, _ = [], c, l)
                                    }
                                    for (u = _.length; u--; )
                                        (d = _[u]) && (c = i ? indexOf(a, d) : p[u]) > -1 && (a[c] = !(o[c] = d))
                                }
                            } else
                                _ = condense(_ === o ? _.splice(m, _.length) : _),
                                i ? i(null, o, _, l) : O.apply(o, _)
                        }
                        ))
                    }
                    function matcherFromTokens(e) {
                        for (var t, n, i, a = e.length, o = r.relative[e[0].type], s = o || r.relative[" "], l = o ? 1 : 0, u = addCombinator((function(e) {
                            return e === t
                        }
                        ), s, !0), d = addCombinator((function(e) {
                            return indexOf(t, e) > -1
                        }
                        ), s, !0), p = [function(e, n, r) {
                            var i = !o && (r || n !== c) || ((t = n).nodeType ? u(e, n, r) : d(e, n, r));
                            return t = null,
                            i
                        }
                        ]; l < a; l++)
                            if (n = r.relative[e[l].type])
                                p = [addCombinator(elementMatcher(p), n)];
                            else {
                                if ((n = r.filter[e[l].type].apply(null, e[l].matches))[w]) {
                                    for (i = ++l; i < a && !r.relative[e[i].type]; i++)
                                        ;
                                    return setMatcher(l > 1 && elementMatcher(p), l > 1 && toSelector(e.slice(0, l - 1).concat({
                                        value: " " === e[l - 2].type ? "*" : ""
                                    })).replace(q, "$1"), n, l < i && matcherFromTokens(e.slice(l, i)), i < a && matcherFromTokens(e = e.slice(i)), i < a && toSelector(e))
                                }
                                p.push(n)
                            }
                        return elementMatcher(p)
                    }
                    return setFilters.prototype = r.filters = r.pseudos,
                    r.setFilters = new setFilters,
                    o = Sizzle.tokenize = function(e, t) {
                        var n, i, a, o, s, l, c, u = E[e + " "];
                        if (u)
                            return t ? 0 : u.slice(0);
                        for (s = e,
                        l = [],
                        c = r.preFilter; s; ) {
                            for (o in n && !(i = H.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                            l.push(a = [])),
                            n = !1,
                            (i = U.exec(s)) && (n = i.shift(),
                            a.push({
                                value: n,
                                type: i[0].replace(q, " ")
                            }),
                            s = s.slice(n.length)),
                            r.filter)
                                !(i = Y[o].exec(s)) || c[o] && !(i = c[o](i)) || (n = i.shift(),
                                a.push({
                                    value: n,
                                    type: o,
                                    matches: i
                                }),
                                s = s.slice(n.length));
                            if (!n)
                                break
                        }
                        return t ? s.length : s ? Sizzle.error(e) : E(e, l).slice(0)
                    }
                    ,
                    s = Sizzle.compile = function(e, t) {
                        var n, i = [], a = [], s = P[e + " "];
                        if (!s) {
                            for (t || (t = o(e)),
                            n = t.length; n--; )
                                (s = matcherFromTokens(t[n]))[w] ? i.push(s) : a.push(s);
                            s = P(e, function matcherFromGroupMatchers(e, t) {
                                var n = t.length > 0
                                  , i = e.length > 0
                                  , superMatcher = function(a, o, s, l, u) {
                                    var d, m, v, _ = 0, y = "0", b = a && [], w = [], S = c, k = a || i && r.find.TAG("*", u), T = C += null == S ? 1 : Math.random() || .1, E = k.length;
                                    for (u && (c = o === f || o || u); y !== E && null != (d = k[y]); y++) {
                                        if (i && d) {
                                            for (m = 0,
                                            o || d.ownerDocument === f || (p(d),
                                            s = !g); v = e[m++]; )
                                                if (v(d, o || f, s)) {
                                                    l.push(d);
                                                    break
                                                }
                                            u && (C = T)
                                        }
                                        n && ((d = !v && d) && _--,
                                        a && b.push(d))
                                    }
                                    if (_ += y,
                                    n && y !== _) {
                                        for (m = 0; v = t[m++]; )
                                            v(b, w, o, s);
                                        if (a) {
                                            if (_ > 0)
                                                for (; y--; )
                                                    b[y] || w[y] || (w[y] = A.call(l));
                                            w = condense(w)
                                        }
                                        O.apply(l, w),
                                        u && !a && w.length > 0 && _ + t.length > 1 && Sizzle.uniqueSort(l)
                                    }
                                    return u && (C = T,
                                    c = S),
                                    b
                                };
                                return n ? markFunction(superMatcher) : superMatcher
                            }(a, i)),
                            s.selector = e
                        }
                        return s
                    }
                    ,
                    l = Sizzle.select = function(e, t, i, a) {
                        var l, c, u, d, p, f = "function" == typeof e && e, m = !a && o(e = f.selector || e);
                        if (i = i || [],
                        1 === m.length) {
                            if ((c = m[0] = m[0].slice(0)).length > 2 && "ID" === (u = c[0]).type && n.getById && 9 === t.nodeType && g && r.relative[c[1].type]) {
                                if (!(t = (r.find.ID(u.matches[0].replace(te, funescape), t) || [])[0]))
                                    return i;
                                f && (t = t.parentNode),
                                e = e.slice(c.shift().value.length)
                            }
                            for (l = Y.needsContext.test(e) ? 0 : c.length; l-- && (u = c[l],
                            !r.relative[d = u.type]); )
                                if ((p = r.find[d]) && (a = p(u.matches[0].replace(te, funescape), X.test(c[0].type) && testContext(t.parentNode) || t))) {
                                    if (c.splice(l, 1),
                                    !(e = a.length && toSelector(c)))
                                        return O.apply(i, a),
                                        i;
                                    break
                                }
                        }
                        return (f || s(e, m))(a, t, !g, i, !t || X.test(e) && testContext(t.parentNode) || t),
                        i
                    }
                    ,
                    n.sortStable = w.split("").sort(sortOrder).join("") === w,
                    n.detectDuplicates = !!d,
                    p(),
                    n.sortDetached = assert((function(e) {
                        return 1 & e.compareDocumentPosition(f.createElement("div"))
                    }
                    )),
                    assert((function(e) {
                        return e.innerHTML = "<a href='#'></a>",
                        "#" === e.firstChild.getAttribute("href")
                    }
                    )) || addHandle("type|href|height|width", (function(e, t, n) {
                        if (!n)
                            return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                    }
                    )),
                    n.attributes && assert((function(e) {
                        return e.innerHTML = "<input/>",
                        e.firstChild.setAttribute("value", ""),
                        "" === e.firstChild.getAttribute("value")
                    }
                    )) || addHandle("value", (function(e, t, n) {
                        if (!n && "input" === e.nodeName.toLowerCase())
                            return e.defaultValue
                    }
                    )),
                    assert((function(e) {
                        return null == e.getAttribute("disabled")
                    }
                    )) || addHandle(W, (function(e, t, n) {
                        var r;
                        if (!n)
                            return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                    }
                    )),
                    Sizzle
                }(r);
                jQuery.find = b,
                jQuery.expr = b.selectors,
                jQuery.expr[":"] = jQuery.expr.pseudos,
                jQuery.uniqueSort = jQuery.unique = b.uniqueSort,
                jQuery.text = b.getText,
                jQuery.isXMLDoc = b.isXML,
                jQuery.contains = b.contains;
                var dir = function(e, t, n) {
                    for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                        if (1 === e.nodeType) {
                            if (i && jQuery(e).is(n))
                                break;
                            r.push(e)
                        }
                    return r
                }
                  , siblings = function(e, t) {
                    for (var n = []; e; e = e.nextSibling)
                        1 === e.nodeType && e !== t && n.push(e);
                    return n
                }
                  , w = jQuery.expr.match.needsContext
                  , S = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
                  , C = /^.[^:#\[\.,]*$/;
                function winnow(e, t, n) {
                    if (jQuery.isFunction(t))
                        return jQuery.grep(e, (function(e, r) {
                            return !!t.call(e, r, e) !== n
                        }
                        ));
                    if (t.nodeType)
                        return jQuery.grep(e, (function(e) {
                            return e === t !== n
                        }
                        ));
                    if ("string" == typeof t) {
                        if (C.test(t))
                            return jQuery.filter(t, e, n);
                        t = jQuery.filter(t, e)
                    }
                    return jQuery.grep(e, (function(e) {
                        return u.call(t, e) > -1 !== n
                    }
                    ))
                }
                jQuery.filter = function(e, t, n) {
                    var r = t[0];
                    return n && (e = ":not(" + e + ")"),
                    1 === t.length && 1 === r.nodeType ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, (function(e) {
                        return 1 === e.nodeType
                    }
                    )))
                }
                ,
                jQuery.fn.extend({
                    find: function(e) {
                        var t, n = this.length, r = [], i = this;
                        if ("string" != typeof e)
                            return this.pushStack(jQuery(e).filter((function() {
                                for (t = 0; t < n; t++)
                                    if (jQuery.contains(i[t], this))
                                        return !0
                            }
                            )));
                        for (t = 0; t < n; t++)
                            jQuery.find(e, i[t], r);
                        return (r = this.pushStack(n > 1 ? jQuery.unique(r) : r)).selector = this.selector ? this.selector + " " + e : e,
                        r
                    },
                    filter: function(e) {
                        return this.pushStack(winnow(this, e || [], !1))
                    },
                    not: function(e) {
                        return this.pushStack(winnow(this, e || [], !0))
                    },
                    is: function(e) {
                        return !!winnow(this, "string" == typeof e && w.test(e) ? jQuery(e) : e || [], !1).length
                    }
                });
                var k, T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (jQuery.fn.init = function(e, t, n) {
                    var r, i;
                    if (!e)
                        return this;
                    if (n = n || k,
                    "string" == typeof e) {
                        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : T.exec(e)) || !r[1] && t)
                            return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (r[1]) {
                            if (t = t instanceof jQuery ? t[0] : t,
                            jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)),
                            S.test(r[1]) && jQuery.isPlainObject(t))
                                for (r in t)
                                    jQuery.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                            return this
                        }
                        return (i = o.getElementById(r[2])) && i.parentNode && (this.length = 1,
                        this[0] = i),
                        this.context = o,
                        this.selector = e,
                        this
                    }
                    return e.nodeType ? (this.context = this[0] = e,
                    this.length = 1,
                    this) : jQuery.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(jQuery) : (void 0 !== e.selector && (this.selector = e.selector,
                    this.context = e.context),
                    jQuery.makeArray(e, this))
                }
                ).prototype = jQuery.fn,
                k = jQuery(o);
                var E = /^(?:parents|prev(?:Until|All))/
                  , P = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
                function sibling(e, t) {
                    for (; (e = e[t]) && 1 !== e.nodeType; )
                        ;
                    return e
                }
                jQuery.fn.extend({
                    has: function(e) {
                        var t = jQuery(e, this)
                          , n = t.length;
                        return this.filter((function() {
                            for (var e = 0; e < n; e++)
                                if (jQuery.contains(this, t[e]))
                                    return !0
                        }
                        ))
                    },
                    closest: function(e, t) {
                        for (var n, r = 0, i = this.length, a = [], o = w.test(e) || "string" != typeof e ? jQuery(e, t || this.context) : 0; r < i; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && jQuery.find.matchesSelector(n, e))) {
                                    a.push(n);
                                    break
                                }
                        return this.pushStack(a.length > 1 ? jQuery.uniqueSort(a) : a)
                    },
                    index: function(e) {
                        return e ? "string" == typeof e ? u.call(jQuery(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(e, t) {
                        return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(e, t))))
                    },
                    addBack: function(e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }),
                jQuery.each({
                    parent: function(e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null
                    },
                    parents: function(e) {
                        return dir(e, "parentNode")
                    },
                    parentsUntil: function(e, t, n) {
                        return dir(e, "parentNode", n)
                    },
                    next: function(e) {
                        return sibling(e, "nextSibling")
                    },
                    prev: function(e) {
                        return sibling(e, "previousSibling")
                    },
                    nextAll: function(e) {
                        return dir(e, "nextSibling")
                    },
                    prevAll: function(e) {
                        return dir(e, "previousSibling")
                    },
                    nextUntil: function(e, t, n) {
                        return dir(e, "nextSibling", n)
                    },
                    prevUntil: function(e, t, n) {
                        return dir(e, "previousSibling", n)
                    },
                    siblings: function(e) {
                        return siblings((e.parentNode || {}).firstChild, e)
                    },
                    children: function(e) {
                        return siblings(e.firstChild)
                    },
                    contents: function(e) {
                        return e.contentDocument || jQuery.merge([], e.childNodes)
                    }
                }, (function(e, t) {
                    jQuery.fn[e] = function(n, r) {
                        var i = jQuery.map(this, t, n);
                        return "Until" !== e.slice(-5) && (r = n),
                        r && "string" == typeof r && (i = jQuery.filter(r, i)),
                        this.length > 1 && (P[e] || jQuery.uniqueSort(i),
                        E.test(e) && i.reverse()),
                        this.pushStack(i)
                    }
                }
                ));
                var x, R = /\S+/g;
                function completed() {
                    o.removeEventListener("DOMContentLoaded", completed),
                    r.removeEventListener("load", completed),
                    jQuery.ready()
                }
                jQuery.Callbacks = function(e) {
                    e = "string" == typeof e ? function createOptions(e) {
                        var t = {};
                        return jQuery.each(e.match(R) || [], (function(e, n) {
                            t[n] = !0
                        }
                        )),
                        t
                    }(e) : jQuery.extend({}, e);
                    var t, n, r, i, a = [], o = [], s = -1, fire = function() {
                        for (i = e.once,
                        r = t = !0; o.length; s = -1)
                            for (n = o.shift(); ++s < a.length; )
                                !1 === a[s].apply(n[0], n[1]) && e.stopOnFalse && (s = a.length,
                                n = !1);
                        e.memory || (n = !1),
                        t = !1,
                        i && (a = n ? [] : "")
                    }, l = {
                        add: function() {
                            return a && (n && !t && (s = a.length - 1,
                            o.push(n)),
                            function add(t) {
                                jQuery.each(t, (function(t, n) {
                                    jQuery.isFunction(n) ? e.unique && l.has(n) || a.push(n) : n && n.length && "string" !== jQuery.type(n) && add(n)
                                }
                                ))
                            }(arguments),
                            n && !t && fire()),
                            this
                        },
                        remove: function() {
                            return jQuery.each(arguments, (function(e, t) {
                                for (var n; (n = jQuery.inArray(t, a, n)) > -1; )
                                    a.splice(n, 1),
                                    n <= s && s--
                            }
                            )),
                            this
                        },
                        has: function(e) {
                            return e ? jQuery.inArray(e, a) > -1 : a.length > 0
                        },
                        empty: function() {
                            return a && (a = []),
                            this
                        },
                        disable: function() {
                            return i = o = [],
                            a = n = "",
                            this
                        },
                        disabled: function() {
                            return !a
                        },
                        lock: function() {
                            return i = o = [],
                            n || (a = n = ""),
                            this
                        },
                        locked: function() {
                            return !!i
                        },
                        fireWith: function(e, n) {
                            return i || (n = [e, (n = n || []).slice ? n.slice() : n],
                            o.push(n),
                            t || fire()),
                            this
                        },
                        fire: function() {
                            return l.fireWith(this, arguments),
                            this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                    return l
                }
                ,
                jQuery.extend({
                    Deferred: function(e) {
                        var t = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
                          , n = "pending"
                          , r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments),
                                this
                            },
                            then: function() {
                                var e = arguments;
                                return jQuery.Deferred((function(n) {
                                    jQuery.each(t, (function(t, a) {
                                        var o = jQuery.isFunction(e[t]) && e[t];
                                        i[a[1]]((function() {
                                            var e = o && o.apply(this, arguments);
                                            e && jQuery.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                        }
                                        ))
                                    }
                                    )),
                                    e = null
                                }
                                )).promise()
                            },
                            promise: function(e) {
                                return null != e ? jQuery.extend(e, r) : r
                            }
                        }
                          , i = {};
                        return r.pipe = r.then,
                        jQuery.each(t, (function(e, a) {
                            var o = a[2]
                              , s = a[3];
                            r[a[1]] = o.add,
                            s && o.add((function() {
                                n = s
                            }
                            ), t[1 ^ e][2].disable, t[2][2].lock),
                            i[a[0]] = function() {
                                return i[a[0] + "With"](this === i ? r : this, arguments),
                                this
                            }
                            ,
                            i[a[0] + "With"] = o.fireWith
                        }
                        )),
                        r.promise(i),
                        e && e.call(i, i),
                        i
                    },
                    when: function(e) {
                        var t, n, r, i = 0, a = s.call(arguments), o = a.length, l = 1 !== o || e && jQuery.isFunction(e.promise) ? o : 0, c = 1 === l ? e : jQuery.Deferred(), updateFunc = function(e, n, r) {
                            return function(i) {
                                n[e] = this,
                                r[e] = arguments.length > 1 ? s.call(arguments) : i,
                                r === t ? c.notifyWith(n, r) : --l || c.resolveWith(n, r)
                            }
                        };
                        if (o > 1)
                            for (t = new Array(o),
                            n = new Array(o),
                            r = new Array(o); i < o; i++)
                                a[i] && jQuery.isFunction(a[i].promise) ? a[i].promise().progress(updateFunc(i, n, t)).done(updateFunc(i, r, a)).fail(c.reject) : --l;
                        return l || c.resolveWith(r, a),
                        c.promise()
                    }
                }),
                jQuery.fn.ready = function(e) {
                    return jQuery.ready.promise().done(e),
                    this
                }
                ,
                jQuery.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(e) {
                        e ? jQuery.readyWait++ : jQuery.ready(!0)
                    },
                    ready: function(e) {
                        (!0 === e ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0,
                        !0 !== e && --jQuery.readyWait > 0 || (x.resolveWith(o, [jQuery]),
                        jQuery.fn.triggerHandler && (jQuery(o).triggerHandler("ready"),
                        jQuery(o).off("ready"))))
                    }
                }),
                jQuery.ready.promise = function(e) {
                    return x || (x = jQuery.Deferred(),
                    "complete" === o.readyState || "loading" !== o.readyState && !o.documentElement.doScroll ? r.setTimeout(jQuery.ready) : (o.addEventListener("DOMContentLoaded", completed),
                    r.addEventListener("load", completed))),
                    x.promise(e)
                }
                ,
                jQuery.ready.promise();
                var access = function(e, t, n, r, i, a, o) {
                    var s = 0
                      , l = e.length
                      , c = null == n;
                    if ("object" === jQuery.type(n))
                        for (s in i = !0,
                        n)
                            access(e, t, s, n[s], !0, a, o);
                    else if (void 0 !== r && (i = !0,
                    jQuery.isFunction(r) || (o = !0),
                    c && (o ? (t.call(e, r),
                    t = null) : (c = t,
                    t = function(e, t, n) {
                        return c.call(jQuery(e), n)
                    }
                    )),
                    t))
                        for (; s < l; s++)
                            t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
                    return i ? e : c ? t.call(e) : l ? t(e[0], n) : a
                }
                  , acceptData = function(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };
                function Data() {
                    this.expando = jQuery.expando + Data.uid++
                }
                Data.uid = 1,
                Data.prototype = {
                    register: function(e, t) {
                        var n = t || {};
                        return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                            value: n,
                            writable: !0,
                            configurable: !0
                        }),
                        e[this.expando]
                    },
                    cache: function(e) {
                        if (!acceptData(e))
                            return {};
                        var t = e[this.expando];
                        return t || (t = {},
                        acceptData(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0
                        }))),
                        t
                    },
                    set: function(e, t, n) {
                        var r, i = this.cache(e);
                        if ("string" == typeof t)
                            i[t] = n;
                        else
                            for (r in t)
                                i[r] = t[r];
                        return i
                    },
                    get: function(e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                    },
                    access: function(e, t, n) {
                        var r;
                        return void 0 === t || t && "string" == typeof t && void 0 === n ? void 0 !== (r = this.get(e, t)) ? r : this.get(e, jQuery.camelCase(t)) : (this.set(e, t, n),
                        void 0 !== n ? n : t)
                    },
                    remove: function(e, t) {
                        var n, r, i, a = e[this.expando];
                        if (void 0 !== a) {
                            if (void 0 === t)
                                this.register(e);
                            else {
                                jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t),
                                r = t in a ? [t, i] : (r = i)in a ? [r] : r.match(R) || []),
                                n = r.length;
                                for (; n--; )
                                    delete a[r[n]]
                            }
                            (void 0 === t || jQuery.isEmptyObject(a)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                        }
                    },
                    hasData: function(e) {
                        var t = e[this.expando];
                        return void 0 !== t && !jQuery.isEmptyObject(t)
                    }
                };
                var D = new Data
                  , A = new Data
                  , I = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
                  , O = /[A-Z]/g;
                function dataAttr(e, t, n) {
                    var r;
                    if (void 0 === n && 1 === e.nodeType)
                        if (r = "data-" + t.replace(O, "-$&").toLowerCase(),
                        "string" == typeof (n = e.getAttribute(r))) {
                            try {
                                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : I.test(n) ? jQuery.parseJSON(n) : n)
                            } catch (e) {}
                            A.set(e, t, n)
                        } else
                            n = void 0;
                    return n
                }
                jQuery.extend({
                    hasData: function(e) {
                        return A.hasData(e) || D.hasData(e)
                    },
                    data: function(e, t, n) {
                        return A.access(e, t, n)
                    },
                    removeData: function(e, t) {
                        A.remove(e, t)
                    },
                    _data: function(e, t, n) {
                        return D.access(e, t, n)
                    },
                    _removeData: function(e, t) {
                        D.remove(e, t)
                    }
                }),
                jQuery.fn.extend({
                    data: function(e, t) {
                        var n, r, i, a = this[0], o = a && a.attributes;
                        if (void 0 === e) {
                            if (this.length && (i = A.get(a),
                            1 === a.nodeType && !D.get(a, "hasDataAttrs"))) {
                                for (n = o.length; n--; )
                                    o[n] && 0 === (r = o[n].name).indexOf("data-") && (r = jQuery.camelCase(r.slice(5)),
                                    dataAttr(a, r, i[r]));
                                D.set(a, "hasDataAttrs", !0)
                            }
                            return i
                        }
                        return "object" == typeof e ? this.each((function() {
                            A.set(this, e)
                        }
                        )) : access(this, (function(t) {
                            var n, r;
                            if (a && void 0 === t)
                                return void 0 !== (n = A.get(a, e) || A.get(a, e.replace(O, "-$&").toLowerCase())) ? n : (r = jQuery.camelCase(e),
                                void 0 !== (n = A.get(a, r)) || void 0 !== (n = dataAttr(a, r, void 0)) ? n : void 0);
                            r = jQuery.camelCase(e),
                            this.each((function() {
                                var n = A.get(this, r);
                                A.set(this, r, t),
                                e.indexOf("-") > -1 && void 0 !== n && A.set(this, e, t)
                            }
                            ))
                        }
                        ), null, t, arguments.length > 1, null, !0)
                    },
                    removeData: function(e) {
                        return this.each((function() {
                            A.remove(this, e)
                        }
                        ))
                    }
                }),
                jQuery.extend({
                    queue: function(e, t, n) {
                        var r;
                        if (e)
                            return t = (t || "fx") + "queue",
                            r = D.get(e, t),
                            n && (!r || jQuery.isArray(n) ? r = D.access(e, t, jQuery.makeArray(n)) : r.push(n)),
                            r || []
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = jQuery.queue(e, t)
                          , r = n.length
                          , i = n.shift()
                          , a = jQuery._queueHooks(e, t);
                        "inprogress" === i && (i = n.shift(),
                        r--),
                        i && ("fx" === t && n.unshift("inprogress"),
                        delete a.stop,
                        i.call(e, (function() {
                            jQuery.dequeue(e, t)
                        }
                        ), a)),
                        !r && a && a.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return D.get(e, n) || D.access(e, n, {
                            empty: jQuery.Callbacks("once memory").add((function() {
                                D.remove(e, [t + "queue", n])
                            }
                            ))
                        })
                    }
                }),
                jQuery.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return "string" != typeof e && (t = e,
                        e = "fx",
                        n--),
                        arguments.length < n ? jQuery.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                            var n = jQuery.queue(this, e, t);
                            jQuery._queueHooks(this, e),
                            "fx" === e && "inprogress" !== n[0] && jQuery.dequeue(this, e)
                        }
                        ))
                    },
                    dequeue: function(e) {
                        return this.each((function() {
                            jQuery.dequeue(this, e)
                        }
                        ))
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, t) {
                        var n, r = 1, i = jQuery.Deferred(), a = this, o = this.length, resolve = function() {
                            --r || i.resolveWith(a, [a])
                        };
                        for ("string" != typeof e && (t = e,
                        e = void 0),
                        e = e || "fx"; o--; )
                            (n = D.get(a[o], e + "queueHooks")) && n.empty && (r++,
                            n.empty.add(resolve));
                        return resolve(),
                        i.promise(t)
                    }
                });
                var L = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
                  , W = new RegExp("^(?:([+-])=|)(" + L + ")([a-z%]*)$","i")
                  , N = ["Top", "Right", "Bottom", "Left"]
                  , isHidden = function(e, t) {
                    return e = t || e,
                    "none" === jQuery.css(e, "display") || !jQuery.contains(e.ownerDocument, e)
                };
                function adjustCSS(e, t, n, r) {
                    var i, a = 1, o = 20, s = r ? function() {
                        return r.cur()
                    }
                    : function() {
                        return jQuery.css(e, t, "")
                    }
                    , l = s(), c = n && n[3] || (jQuery.cssNumber[t] ? "" : "px"), u = (jQuery.cssNumber[t] || "px" !== c && +l) && W.exec(jQuery.css(e, t));
                    if (u && u[3] !== c) {
                        c = c || u[3],
                        n = n || [],
                        u = +l || 1;
                        do {
                            u /= a = a || ".5",
                            jQuery.style(e, t, u + c)
                        } while (a !== (a = s() / l) && 1 !== a && --o)
                    }
                    return n && (u = +u || +l || 0,
                    i = n[1] ? u + (n[1] + 1) * n[2] : +n[2],
                    r && (r.unit = c,
                    r.start = u,
                    r.end = i)),
                    i
                }
                var M = /^(?:checkbox|radio)$/i
                  , $ = /<([\w:-]+)/
                  , B = /^$|\/(?:java|ecma)script/i
                  , j = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
                function getAll(e, t) {
                    var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                    return void 0 === t || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
                }
                function setGlobalEval(e, t) {
                    for (var n = 0, r = e.length; n < r; n++)
                        D.set(e[n], "globalEval", !t || D.get(t[n], "globalEval"))
                }
                j.optgroup = j.option,
                j.tbody = j.tfoot = j.colgroup = j.caption = j.thead,
                j.th = j.td;
                var q, H, U = /<|&#?\w+;/;
                function buildFragment(e, t, n, r, i) {
                    for (var a, o, s, l, c, u, d = t.createDocumentFragment(), p = [], f = 0, m = e.length; f < m; f++)
                        if ((a = e[f]) || 0 === a)
                            if ("object" === jQuery.type(a))
                                jQuery.merge(p, a.nodeType ? [a] : a);
                            else if (U.test(a)) {
                                for (o = o || d.appendChild(t.createElement("div")),
                                s = ($.exec(a) || ["", ""])[1].toLowerCase(),
                                l = j[s] || j._default,
                                o.innerHTML = l[1] + jQuery.htmlPrefilter(a) + l[2],
                                u = l[0]; u--; )
                                    o = o.lastChild;
                                jQuery.merge(p, o.childNodes),
                                (o = d.firstChild).textContent = ""
                            } else
                                p.push(t.createTextNode(a));
                    for (d.textContent = "",
                    f = 0; a = p[f++]; )
                        if (r && jQuery.inArray(a, r) > -1)
                            i && i.push(a);
                        else if (c = jQuery.contains(a.ownerDocument, a),
                        o = getAll(d.appendChild(a), "script"),
                        c && setGlobalEval(o),
                        n)
                            for (u = 0; a = o[u++]; )
                                B.test(a.type || "") && n.push(a);
                    return d
                }