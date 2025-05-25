
                jQuery.timers = [],
                jQuery.fx.tick = function() {
                    var e, t = 0, n = jQuery.timers;
                    for (ce = jQuery.now(); t < n.length; t++)
                        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || jQuery.fx.stop(),
                    ce = void 0
                }
                ,
                jQuery.fx.timer = function(e) {
                    jQuery.timers.push(e),
                    e() ? jQuery.fx.start() : jQuery.timers.pop()
                }
                ,
                jQuery.fx.interval = 13,
                jQuery.fx.start = function() {
                    ue || (ue = r.setInterval(jQuery.fx.tick, jQuery.fx.interval))
                }
                ,
                jQuery.fx.stop = function() {
                    r.clearInterval(ue),
                    ue = null
                }
                ,
                jQuery.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                jQuery.fn.delay = function(e, t) {
                    return e = jQuery.fx && jQuery.fx.speeds[e] || e,
                    t = t || "fx",
                    this.queue(t, (function(t, n) {
                        var i = r.setTimeout(t, e);
                        n.stop = function() {
                            r.clearTimeout(i)
                        }
                    }
                    ))
                }
                ,
                function() {
                    var e = o.createElement("input")
                      , t = o.createElement("select")
                      , n = t.appendChild(o.createElement("option"));
                    e.type = "checkbox",
                    m.checkOn = "" !== e.value,
                    m.optSelected = n.selected,
                    t.disabled = !0,
                    m.optDisabled = !n.disabled,
                    (e = o.createElement("input")).value = "t",
                    e.type = "radio",
                    m.radioValue = "t" === e.value
                }();
                var fe, me = jQuery.expr.attrHandle;
                jQuery.fn.extend({
                    attr: function(e, t) {
                        return access(this, jQuery.attr, e, t, arguments.length > 1)
                    },
                    removeAttr: function(e) {
                        return this.each((function() {
                            jQuery.removeAttr(this, e)
                        }
                        ))
                    }
                }),
                jQuery.extend({
                    attr: function(e, t, n) {
                        var r, i, a = e.nodeType;
                        if (3 !== a && 8 !== a && 2 !== a)
                            return void 0 === e.getAttribute ? jQuery.prop(e, t, n) : (1 === a && jQuery.isXMLDoc(e) || (t = t.toLowerCase(),
                            i = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? fe : void 0)),
                            void 0 !== n ? null === n ? void jQuery.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                            n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = jQuery.find.attr(e, t)) ? void 0 : r)
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!m.radioValue && "radio" === t && jQuery.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t),
                                    n && (e.value = n),
                                    t
                                }
                            }
                        }
                    },
                    removeAttr: function(e, t) {
                        var n, r, i = 0, a = t && t.match(R);
                        if (a && 1 === e.nodeType)
                            for (; n = a[i++]; )
                                r = jQuery.propFix[n] || n,
                                jQuery.expr.match.bool.test(n) && (e[r] = !1),
                                e.removeAttribute(n)
                    }
                }),
                fe = {
                    set: function(e, t, n) {
                        return !1 === t ? jQuery.removeAttr(e, n) : e.setAttribute(n, n),
                        n
                    }
                },
                jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                    var n = me[t] || jQuery.find.attr;
                    me[t] = function(e, t, r) {
                        var i, a;
                        return r || (a = me[t],
                        me[t] = i,
                        i = null != n(e, t, r) ? t.toLowerCase() : null,
                        me[t] = a),
                        i
                    }
                }
                ));
                var he = /^(?:input|select|textarea|button)$/i
                  , ge = /^(?:a|area)$/i;
                jQuery.fn.extend({
                    prop: function(e, t) {
                        return access(this, jQuery.prop, e, t, arguments.length > 1)
                    },
                    removeProp: function(e) {
                        return this.each((function() {
                            delete this[jQuery.propFix[e] || e]
                        }
                        ))
                    }
                }),
                jQuery.extend({
                    prop: function(e, t, n) {
                        var r, i, a = e.nodeType;
                        if (3 !== a && 8 !== a && 2 !== a)
                            return 1 === a && jQuery.isXMLDoc(e) || (t = jQuery.propFix[t] || t,
                            i = jQuery.propHooks[t]),
                            void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var t = jQuery.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : he.test(e.nodeName) || ge.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    },
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    }
                }),
                m.optSelected || (jQuery.propHooks.selected = {
                    get: function(e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex,
                        null
                    },
                    set: function(e) {
                        var t = e.parentNode;
                        t && (t.selectedIndex,
                        t.parentNode && t.parentNode.selectedIndex)
                    }
                }),
                jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                    jQuery.propFix[this.toLowerCase()] = this
                }
                ));
                var ve = /[\t\r\n\f]/g;
                function getClass(e) {
                    return e.getAttribute && e.getAttribute("class") || ""
                }
                jQuery.fn.extend({
                    addClass: function(e) {
                        var t, n, r, i, a, o, s, l = 0;
                        if (jQuery.isFunction(e))
                            return this.each((function(t) {
                                jQuery(this).addClass(e.call(this, t, getClass(this)))
                            }
                            ));
                        if ("string" == typeof e && e)
                            for (t = e.match(R) || []; n = this[l++]; )
                                if (i = getClass(n),
                                r = 1 === n.nodeType && (" " + i + " ").replace(ve, " ")) {
                                    for (o = 0; a = t[o++]; )
                                        r.indexOf(" " + a + " ") < 0 && (r += a + " ");
                                    i !== (s = jQuery.trim(r)) && n.setAttribute("class", s)
                                }
                        return this
                    },
                    removeClass: function(e) {
                        var t, n, r, i, a, o, s, l = 0;
                        if (jQuery.isFunction(e))
                            return this.each((function(t) {
                                jQuery(this).removeClass(e.call(this, t, getClass(this)))
                            }
                            ));
                        if (!arguments.length)
                            return this.attr("class", "");
                        if ("string" == typeof e && e)
                            for (t = e.match(R) || []; n = this[l++]; )
                                if (i = getClass(n),
                                r = 1 === n.nodeType && (" " + i + " ").replace(ve, " ")) {
                                    for (o = 0; a = t[o++]; )
                                        for (; r.indexOf(" " + a + " ") > -1; )
                                            r = r.replace(" " + a + " ", " ");
                                    i !== (s = jQuery.trim(r)) && n.setAttribute("class", s)
                                }
                        return this
                    },
                    toggleClass: function(e, t) {
                        var n = typeof e;
                        return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each((function(n) {
                            jQuery(this).toggleClass(e.call(this, n, getClass(this), t), t)
                        }
                        )) : this.each((function() {
                            var t, r, i, a;
                            if ("string" === n)
                                for (r = 0,
                                i = jQuery(this),
                                a = e.match(R) || []; t = a[r++]; )
                                    i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                            else
                                void 0 !== e && "boolean" !== n || ((t = getClass(this)) && D.set(this, "__className__", t),
                                this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : D.get(this, "__className__") || ""))
                        }
                        ))
                    },
                    hasClass: function(e) {
                        var t, n, r = 0;
                        for (t = " " + e + " "; n = this[r++]; )
                            if (1 === n.nodeType && (" " + getClass(n) + " ").replace(ve, " ").indexOf(t) > -1)
                                return !0;
                        return !1
                    }
                });
                var _e = /\r/g
                  , ye = /[\x20\t\r\n\f]+/g;
                jQuery.fn.extend({
                    val: function(e) {
                        var t, n, r, i = this[0];
                        return arguments.length ? (r = jQuery.isFunction(e),
                        this.each((function(n) {
                            var i;
                            1 === this.nodeType && (null == (i = r ? e.call(this, n, jQuery(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, (function(e) {
                                return null == e ? "" : e + ""
                            }
                            ))),
                            (t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                        }
                        ))) : i ? (t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()]) && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(_e, "") : null == n ? "" : n : void 0
                    }
                }),
                jQuery.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = jQuery.find.attr(e, "value");
                                return null != t ? t : jQuery.trim(jQuery.text(e)).replace(ye, " ")
                            }
                        },
                        select: {
                            get: function(e) {
                                for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || i < 0, o = a ? null : [], s = a ? i + 1 : r.length, l = i < 0 ? s : a ? i : 0; l < s; l++)
                                    if (((n = r[l]).selected || l === i) && (m.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                                        if (t = jQuery(n).val(),
                                        a)
                                            return t;
                                        o.push(t)
                                    }
                                return o
                            },
                            set: function(e, t) {
                                for (var n, r, i = e.options, a = jQuery.makeArray(t), o = i.length; o--; )
                                    ((r = i[o]).selected = jQuery.inArray(jQuery.valHooks.option.get(r), a) > -1) && (n = !0);
                                return n || (e.selectedIndex = -1),
                                a
                            }
                        }
                    }
                }),
                jQuery.each(["radio", "checkbox"], (function() {
                    jQuery.valHooks[this] = {
                        set: function(e, t) {
                            if (jQuery.isArray(t))
                                return e.checked = jQuery.inArray(jQuery(e).val(), t) > -1
                        }
                    },
                    m.checkOn || (jQuery.valHooks[this].get = function(e) {
                        return null === e.getAttribute("value") ? "on" : e.value
                    }
                    )
                }
                ));
                var be = /^(?:focusinfocus|focusoutblur)$/;
                jQuery.extend(jQuery.event, {
                    trigger: function(e, t, n, i) {
                        var a, s, l, c, u, d, p, m = [n || o], g = f.call(e, "type") ? e.type : e, v = f.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (s = l = n = n || o,
                        3 !== n.nodeType && 8 !== n.nodeType && !be.test(g + jQuery.event.triggered) && (g.indexOf(".") > -1 && (v = g.split("."),
                        g = v.shift(),
                        v.sort()),
                        u = g.indexOf(":") < 0 && "on" + g,
                        (e = e[jQuery.expando] ? e : new jQuery.Event(g,"object" == typeof e && e)).isTrigger = i ? 2 : 3,
                        e.namespace = v.join("."),
                        e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        e.result = void 0,
                        e.target || (e.target = n),
                        t = null == t ? [e] : jQuery.makeArray(t, [e]),
                        p = jQuery.event.special[g] || {},
                        i || !p.trigger || !1 !== p.trigger.apply(n, t))) {
                            if (!i && !p.noBubble && !jQuery.isWindow(n)) {
                                for (c = p.delegateType || g,
                                be.test(c + g) || (s = s.parentNode); s; s = s.parentNode)
                                    m.push(s),
                                    l = s;
                                l === (n.ownerDocument || o) && m.push(l.defaultView || l.parentWindow || r)
                            }
                            for (a = 0; (s = m[a++]) && !e.isPropagationStopped(); )
                                e.type = a > 1 ? c : p.bindType || g,
                                (d = (D.get(s, "events") || {})[e.type] && D.get(s, "handle")) && d.apply(s, t),
                                (d = u && s[u]) && d.apply && acceptData(s) && (e.result = d.apply(s, t),
                                !1 === e.result && e.preventDefault());
                            return e.type = g,
                            i || e.isDefaultPrevented() || p._default && !1 !== p._default.apply(m.pop(), t) || !acceptData(n) || u && jQuery.isFunction(n[g]) && !jQuery.isWindow(n) && ((l = n[u]) && (n[u] = null),
                            jQuery.event.triggered = g,
                            n[g](),
                            jQuery.event.triggered = void 0,
                            l && (n[u] = l)),
                            e.result
                        }
                    },
                    simulate: function(e, t, n) {
                        var r = jQuery.extend(new jQuery.Event, n, {
                            type: e,
                            isSimulated: !0
                        });
                        jQuery.event.trigger(r, null, t)
                    }
                }),
                jQuery.fn.extend({
                    trigger: function(e, t) {
                        return this.each((function() {
                            jQuery.event.trigger(e, t, this)
                        }
                        ))
                    },
                    triggerHandler: function(e, t) {
                        var n = this[0];
                        if (n)
                            return jQuery.event.trigger(e, t, n, !0)
                    }
                }),
                jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), (function(e, t) {
                    jQuery.fn[t] = function(e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }
                }
                )),
                jQuery.fn.extend({
                    hover: function(e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    }
                }),
                m.focusin = "onfocusin"in r,
                m.focusin || jQuery.each({
                    focus: "focusin",
                    blur: "focusout"
                }, (function(e, t) {
                    var handler = function(e) {
                        jQuery.event.simulate(t, e.target, jQuery.event.fix(e))
                    };
                    jQuery.event.special[t] = {
                        setup: function() {
                            var n = this.ownerDocument || this
                              , r = D.access(n, t);
                            r || n.addEventListener(e, handler, !0),
                            D.access(n, t, (r || 0) + 1)
                        },
                        teardown: function() {
                            var n = this.ownerDocument || this
                              , r = D.access(n, t) - 1;
                            r ? D.access(n, t, r) : (n.removeEventListener(e, handler, !0),
                            D.remove(n, t))
                        }
                    }
                }
                ));
                var we = r.location
                  , Se = jQuery.now()
                  , Ce = /\?/;
                jQuery.parseJSON = function(e) {
                    return JSON.parse(e + "")
                }
                ,
                jQuery.parseXML = function(e) {
                    var t;
                    if (!e || "string" != typeof e)
                        return null;
                    try {
                        t = (new r.DOMParser).parseFromString(e, "text/xml")
                    } catch (e) {
                        t = void 0
                    }
                    return t && !t.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + e),
                    t
                }
                ;
                var ke = /#.*$/
                  , Te = /([?&])_=[^&]*/
                  , Ee = /^(.*?):[ \t]*([^\r\n]*)$/gm
                  , Pe = /^(?:GET|HEAD)$/
                  , xe = /^\/\//
                  , Re = {}
                  , De = {}
                  , Ae = "*/".concat("*")
                  , Ie = o.createElement("a");
                function addToPrefiltersOrTransports(e) {
                    return function(t, n) {
                        "string" != typeof t && (n = t,
                        t = "*");
                        var r, i = 0, a = t.toLowerCase().match(R) || [];
                        if (jQuery.isFunction(n))
                            for (; r = a[i++]; )
                                "+" === r[0] ? (r = r.slice(1) || "*",
                                (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                    }
                }
                function inspectPrefiltersOrTransports(e, t, n, r) {
                    var i = {}
                      , a = e === De;
                    function inspect(o) {
                        var s;
                        return i[o] = !0,
                        jQuery.each(e[o] || [], (function(e, o) {
                            var l = o(t, n, r);
                            return "string" != typeof l || a || i[l] ? a ? !(s = l) : void 0 : (t.dataTypes.unshift(l),
                            inspect(l),
                            !1)
                        }
                        )),
                        s
                    }
                    return inspect(t.dataTypes[0]) || !i["*"] && inspect("*")
                }
                function ajaxExtend(e, t) {
                    var n, r, i = jQuery.ajaxSettings.flatOptions || {};
                    for (n in t)
                        void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                    return r && jQuery.extend(!0, e, r),
                    e
                }
                Ie.href = we.href,
                jQuery.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: we.href,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(we.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Ae,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /\bxml\b/,
                            html: /\bhtml/,
                            json: /\bjson\b/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": jQuery.parseJSON,
                            "text xml": jQuery.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
                    },
                    ajaxPrefilter: addToPrefiltersOrTransports(Re),
                    ajaxTransport: addToPrefiltersOrTransports(De),
                    ajax: function(e, t) {
                        "object" == typeof e && (t = e,
                        e = void 0),
                        t = t || {};
                        var n, i, a, s, l, c, u, d, p = jQuery.ajaxSetup({}, t), f = p.context || p, m = p.context && (f.nodeType || f.jquery) ? jQuery(f) : jQuery.event, g = jQuery.Deferred(), v = jQuery.Callbacks("once memory"), _ = p.statusCode || {}, y = {}, b = {}, w = 0, S = "canceled", C = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === w) {
                                    if (!s)
                                        for (s = {}; t = Ee.exec(a); )
                                            s[t[1].toLowerCase()] = t[2];
                                    t = s[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return 2 === w ? a : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return w || (e = b[n] = b[n] || e,
                                y[e] = t),
                                this
                            },
                            overrideMimeType: function(e) {
                                return w || (p.mimeType = e),
                                this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (w < 2)
                                        for (t in e)
                                            _[t] = [_[t], e[t]];
                                    else
                                        C.always(e[C.status]);
                                return this
                            },
                            abort: function(e) {
                                var t = e || S;
                                return n && n.abort(t),
                                done(0, t),
                                this
                            }
                        };
                        if (g.promise(C).complete = v.add,
                        C.success = C.done,
                        C.error = C.fail,
                        p.url = ((e || p.url || we.href) + "").replace(ke, "").replace(xe, we.protocol + "//"),
                        p.type = t.method || t.type || p.method || p.type,
                        p.dataTypes = jQuery.trim(p.dataType || "*").toLowerCase().match(R) || [""],
                        null == p.crossDomain) {
                            c = o.createElement("a");
                            try {
                                c.href = p.url,
                                c.href = c.href,
                                p.crossDomain = Ie.protocol + "//" + Ie.host != c.protocol + "//" + c.host
                            } catch (e) {
                                p.crossDomain = !0
                            }
                        }
                        if (p.data && p.processData && "string" != typeof p.data && (p.data = jQuery.param(p.data, p.traditional)),
                        inspectPrefiltersOrTransports(Re, p, t, C),
                        2 === w)
                            return C;
                        for (d in (u = jQuery.event && p.global) && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"),
                        p.type = p.type.toUpperCase(),
                        p.hasContent = !Pe.test(p.type),
                        i = p.url,
                        p.hasContent || (p.data && (i = p.url += (Ce.test(i) ? "&" : "?") + p.data,
                        delete p.data),
                        !1 === p.cache && (p.url = Te.test(i) ? i.replace(Te, "$1_=" + Se++) : i + (Ce.test(i) ? "&" : "?") + "_=" + Se++)),
                        p.ifModified && (jQuery.lastModified[i] && C.setRequestHeader("If-Modified-Since", jQuery.lastModified[i]),
                        jQuery.etag[i] && C.setRequestHeader("If-None-Match", jQuery.etag[i])),
                        (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && C.setRequestHeader("Content-Type", p.contentType),
                        C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ae + "; q=0.01" : "") : p.accepts["*"]),
                        p.headers)
                            C.setRequestHeader(d, p.headers[d]);
                        if (p.beforeSend && (!1 === p.beforeSend.call(f, C, p) || 2 === w))
                            return C.abort();
                        for (d in S = "abort",
                        {
                            success: 1,
                            error: 1,
                            complete: 1
                        })
                            C[d](p[d]);
                        if (n = inspectPrefiltersOrTransports(De, p, t, C)) {
                            if (C.readyState = 1,
                            u && m.trigger("ajaxSend", [C, p]),
                            2 === w)
                                return C;
                            p.async && p.timeout > 0 && (l = r.setTimeout((function() {
                                C.abort("timeout")
                            }
                            ), p.timeout));
                            try {
                                w = 1,
                                n.send(y, done)
                            } catch (e) {
                                if (!(w < 2))
                                    throw e;
                                done(-1, e)
                            }
                        } else
                            done(-1, "No Transport");
                        function done(e, t, o, s) {
                            var c, d, y, b, S, k = t;
                            2 !== w && (w = 2,
                            l && r.clearTimeout(l),
                            n = void 0,
                            a = s || "",
                            C.readyState = e > 0 ? 4 : 0,
                            c = e >= 200 && e < 300 || 304 === e,
                            o && (b = function ajaxHandleResponses(e, t, n) {
                                for (var r, i, a, o, s = e.contents, l = e.dataTypes; "*" === l[0]; )
                                    l.shift(),
                                    void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (r)
                                    for (i in s)
                                        if (s[i] && s[i].test(r)) {
                                            l.unshift(i);
                                            break
                                        }
                                if (l[0]in n)
                                    a = l[0];
                                else {
                                    for (i in n) {
                                        if (!l[0] || e.converters[i + " " + l[0]]) {
                                            a = i;
                                            break
                                        }
                                        o || (o = i)
                                    }
                                    a = a || o
                                }
                                if (a)
                                    return a !== l[0] && l.unshift(a),
                                    n[a]
                            }(p, C, o)),
                            b = function ajaxConvert(e, t, n, r) {
                                var i, a, o, s, l, c = {}, u = e.dataTypes.slice();
                                if (u[1])
                                    for (o in e.converters)
                                        c[o.toLowerCase()] = e.converters[o];
                                for (a = u.shift(); a; )
                                    if (e.responseFields[a] && (n[e.responseFields[a]] = t),
                                    !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                                    l = a,
                                    a = u.shift())
                                        if ("*" === a)
                                            a = l;
                                        else if ("*" !== l && l !== a) {
                                            if (!(o = c[l + " " + a] || c["* " + a]))
                                                for (i in c)
                                                    if ((s = i.split(" "))[1] === a && (o = c[l + " " + s[0]] || c["* " + s[0]])) {
                                                        !0 === o ? o = c[i] : !0 !== c[i] && (a = s[0],
                                                        u.unshift(s[1]));
                                                        break
                                                    }
                                            if (!0 !== o)
                                                if (o && e.throws)
                                                    t = o(t);
                                                else
                                                    try {
                                                        t = o(t)
                                                    } catch (e) {
                                                        return {
                                                            state: "parsererror",
                                                            error: o ? e : "No conversion from " + l + " to " + a
                                                        }
                                                    }
                                        }
                                return {
                                    state: "success",
                                    data: t
                                }
                            }(p, b, C, c),
                            c ? (p.ifModified && ((S = C.getResponseHeader("Last-Modified")) && (jQuery.lastModified[i] = S),
                            (S = C.getResponseHeader("etag")) && (jQuery.etag[i] = S)),
                            204 === e || "HEAD" === p.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = b.state,
                            d = b.data,
                            c = !(y = b.error))) : (y = k,
                            !e && k || (k = "error",
                            e < 0 && (e = 0))),
                            C.status = e,
                            C.statusText = (t || k) + "",
                            c ? g.resolveWith(f, [d, k, C]) : g.rejectWith(f, [C, k, y]),
                            C.statusCode(_),
                            _ = void 0,
                            u && m.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? d : y]),
                            v.fireWith(f, [C, k]),
                            u && (m.trigger("ajaxComplete", [C, p]),
                            --jQuery.active || jQuery.event.trigger("ajaxStop")))
                        }
                        return C
                    },
                    getJSON: function(e, t, n) {
                        return jQuery.get(e, t, n, "json")
                    },
                    getScript: function(e, t) {
                        return jQuery.get(e, void 0, t, "script")
                    }
                }),
                jQuery.each(["get", "post"], (function(e, t) {
                    jQuery[t] = function(e, n, r, i) {
                        return jQuery.isFunction(n) && (i = i || r,
                        r = n,
                        n = void 0),
                        jQuery.ajax(jQuery.extend({
                            url: e,
                            type: t,
                            dataType: i,
                            data: n,
                            success: r
                        }, jQuery.isPlainObject(e) && e))
                    }
                }
                )),
                jQuery._evalUrl = function(e) {
                    return jQuery.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                    })
                }
                ,
                jQuery.fn.extend({
                    wrapAll: function(e) {
                        var t;
                        return jQuery.isFunction(e) ? this.each((function(t) {
                            jQuery(this).wrapAll(e.call(this, t))
                        }
                        )) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0),
                        this[0].parentNode && t.insertBefore(this[0]),
                        t.map((function() {
                            for (var e = this; e.firstElementChild; )
                                e = e.firstElementChild;
                            return e
                        }
                        )).append(this)),
                        this)
                    },
                    wrapInner: function(e) {
                        return jQuery.isFunction(e) ? this.each((function(t) {
                            jQuery(this).wrapInner(e.call(this, t))
                        }
                        )) : this.each((function() {
                            var t = jQuery(this)
                              , n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e)
                        }
                        ))
                    },
                    wrap: function(e) {
                        var t = jQuery.isFunction(e);
                        return this.each((function(n) {
                            jQuery(this).wrapAll(t ? e.call(this, n) : e)
                        }
                        ))
                    },
                    unwrap: function() {
                        return this.parent().each((function() {
                            jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
                        }
                        )).end()
                    }
                }),
                jQuery.expr.filters.hidden = function(e) {
                    return !jQuery.expr.filters.visible(e)
                }
                ,
                jQuery.expr.filters.visible = function(e) {
                    return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
                }
                ;
                var Oe = /%20/g
                  , Le = /\[\]$/
                  , We = /\r?\n/g
                  , Ne = /^(?:submit|button|image|reset|file)$/i
                  , Me = /^(?:input|select|textarea|keygen)/i;
                function buildParams(e, t, n, r) {
                    var i;
                    if (jQuery.isArray(t))
                        jQuery.each(t, (function(t, i) {
                            n || Le.test(e) ? r(e, i) : buildParams(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                        }
                        ));
                    else if (n || "object" !== jQuery.type(t))
                        r(e, t);
                    else
                        for (i in t)
                            buildParams(e + "[" + i + "]", t[i], n, r)
                }
                jQuery.param = function(e, t) {
                    var n, r = [], add = function(e, t) {
                        t = jQuery.isFunction(t) ? t() : null == t ? "" : t,
                        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                    if (void 0 === t && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional),
                    jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e))
                        jQuery.each(e, (function() {
                            add(this.name, this.value)
                        }
                        ));
                    else
                        for (n in e)
                            buildParams(n, e[n], t, add);
                    return r.join("&").replace(Oe, "+")
                }
                ,
                jQuery.fn.extend({
                    serialize: function() {
                        return jQuery.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map((function() {
                            var e = jQuery.prop(this, "elements");
                            return e ? jQuery.makeArray(e) : this
                        }
                        )).filter((function() {
                            var e = this.type;
                            return this.name && !jQuery(this).is(":disabled") && Me.test(this.nodeName) && !Ne.test(e) && (this.checked || !M.test(e))
                        }
                        )).map((function(e, t) {
                            var n = jQuery(this).val();
                            return null == n ? null : jQuery.isArray(n) ? jQuery.map(n, (function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(We, "\r\n")
                                }
                            }
                            )) : {
                                name: t.name,
                                value: n.replace(We, "\r\n")
                            }
                        }
                        )).get()
                    }
                }),
                jQuery.ajaxSettings.xhr = function() {
                    try {
                        return new r.XMLHttpRequest
                    } catch (e) {}
                }
                ;
                var $e = {
                    0: 200,
                    1223: 204
                }
                  , Fe = jQuery.ajaxSettings.xhr();
                m.cors = !!Fe && "withCredentials"in Fe,
                m.ajax = Fe = !!Fe,
                jQuery.ajaxTransport((function(e) {
                    var t, n;
                    if (m.cors || Fe && !e.crossDomain)
                        return {
                            send: function(i, a) {
                                var o, s = e.xhr();
                                if (s.open(e.type, e.url, e.async, e.username, e.password),
                                e.xhrFields)
                                    for (o in e.xhrFields)
                                        s[o] = e.xhrFields[o];
                                for (o in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType),
                                e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"),
                                i)
                                    s.setRequestHeader(o, i[o]);
                                t = function(e) {
                                    return function() {
                                        t && (t = n = s.onload = s.onerror = s.onabort = s.onreadystatechange = null,
                                        "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? a(0, "error") : a(s.status, s.statusText) : a($e[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                            binary: s.response
                                        } : {
                                            text: s.responseText
                                        }, s.getAllResponseHeaders()))
                                    }
                                }
                                ,
                                s.onload = t(),
                                n = s.onerror = t("error"),
                                void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                                    4 === s.readyState && r.setTimeout((function() {
                                        t && n()
                                    }
                                    ))
                                }
                                ,
                                t = t("abort");
                                try {
                                    s.send(e.hasContent && e.data || null)
                                } catch (e) {
                                    if (t)
                                        throw e
                                }
                            },
                            abort: function() {
                                t && t()
                            }
                        }
                }
                )),
                jQuery.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /\b(?:java|ecma)script\b/
                    },
                    converters: {
                        "text script": function(e) {
                            return jQuery.globalEval(e),
                            e
                        }
                    }
                }),
                jQuery.ajaxPrefilter("script", (function(e) {
                    void 0 === e.cache && (e.cache = !1),
                    e.crossDomain && (e.type = "GET")
                }
                )),
                jQuery.ajaxTransport("script", (function(e) {
                    var t, n;
                    if (e.crossDomain)
                        return {
                            send: function(r, i) {
                                t = jQuery("<script>").prop({
                                    charset: e.scriptCharset,
                                    src: e.url
                                }).on("load error", n = function(e) {
                                    t.remove(),
                                    n = null,
                                    e && i("error" === e.type ? 404 : 200, e.type)
                                }
                                ),
                                o.head.appendChild(t[0])
                            },
                            abort: function() {
                                n && n()
                            }
                        }
                }
                ));
                var Be = []
                  , je = /(=)\?(?=&|$)|\?\?/;
                jQuery.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = Be.pop() || jQuery.expando + "_" + Se++;
                        return this[e] = !0,
                        e
                    }
                }),
                jQuery.ajaxPrefilter("json jsonp", (function(e, t, n) {
                    var i, a, o, s = !1 !== e.jsonp && (je.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && je.test(e.data) && "data");
                    if (s || "jsonp" === e.dataTypes[0])
                        return i = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                        s ? e[s] = e[s].replace(je, "$1" + i) : !1 !== e.jsonp && (e.url += (Ce.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
                        e.converters["script json"] = function() {
                            return o || jQuery.error(i + " was not called"),
                            o[0]
                        }
                        ,
                        e.dataTypes[0] = "json",
                        a = r[i],
                        r[i] = function() {
                            o = arguments
                        }
                        ,
                        n.always((function() {
                            void 0 === a ? jQuery(r).removeProp(i) : r[i] = a,
                            e[i] && (e.jsonpCallback = t.jsonpCallback,
                            Be.push(i)),
                            o && jQuery.isFunction(a) && a(o[0]),
                            o = a = void 0
                        }
                        )),
                        "script"
                }
                )),
                jQuery.parseHTML = function(e, t, n) {
                    if (!e || "string" != typeof e)
                        return null;
                    "boolean" == typeof t && (n = t,
                    t = !1),
                    t = t || o;
                    var r = S.exec(e)
                      , i = !n && [];
                    return r ? [t.createElement(r[1])] : (r = buildFragment([e], t, i),
                    i && i.length && jQuery(i).remove(),
                    jQuery.merge([], r.childNodes))
                }
                ;
                var qe = jQuery.fn.load;
                function getWindow(e) {
                    return jQuery.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
                }
                jQuery.fn.load = function(e, t, n) {
                    if ("string" != typeof e && qe)
                        return qe.apply(this, arguments);
                    var r, i, a, o = this, s = e.indexOf(" ");
                    return s > -1 && (r = jQuery.trim(e.slice(s)),
                    e = e.slice(0, s)),
                    jQuery.isFunction(t) ? (n = t,
                    t = void 0) : t && "object" == typeof t && (i = "POST"),
                    o.length > 0 && jQuery.ajax({
                        url: e,
                        type: i || "GET",
                        dataType: "html",
                        data: t
                    }).done((function(e) {
                        a = arguments,
                        o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
                    }
                    )).always(n && function(e, t) {
                        o.each((function() {
                            n.apply(this, a || [e.responseText, t, e])
                        }
                        ))
                    }
                    ),
                    this
                }
                ,
                jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                    jQuery.fn[t] = function(e) {
                        return this.on(t, e)
                    }
                }
                )),
                jQuery.expr.filters.animated = function(e) {
                    return jQuery.grep(jQuery.timers, (function(t) {
                        return e === t.elem
                    }
                    )).length
                }
                ,
                jQuery.offset = {
                    setOffset: function(e, t, n) {
                        var r, i, a, o, s, l, c = jQuery.css(e, "position"), u = jQuery(e), d = {};
                        "static" === c && (e.style.position = "relative"),
                        s = u.offset(),
                        a = jQuery.css(e, "top"),
                        l = jQuery.css(e, "left"),
                        ("absolute" === c || "fixed" === c) && (a + l).indexOf("auto") > -1 ? (o = (r = u.position()).top,
                        i = r.left) : (o = parseFloat(a) || 0,
                        i = parseFloat(l) || 0),
                        jQuery.isFunction(t) && (t = t.call(e, n, jQuery.extend({}, s))),
                        null != t.top && (d.top = t.top - s.top + o),
                        null != t.left && (d.left = t.left - s.left + i),
                        "using"in t ? t.using.call(e, d) : u.css(d)
                    }
                },
                jQuery.fn.extend({
                    offset: function(e) {
                        if (arguments.length)
                            return void 0 === e ? this : this.each((function(t) {
                                jQuery.offset.setOffset(this, e, t)
                            }
                            ));
                        var t, n, r = this[0], i = {
                            top: 0,
                            left: 0
                        }, a = r && r.ownerDocument;
                        return a ? (t = a.documentElement,
                        jQuery.contains(t, r) ? (i = r.getBoundingClientRect(),
                        n = getWindow(a),
                        {
                            top: i.top + n.pageYOffset - t.clientTop,
                            left: i.left + n.pageXOffset - t.clientLeft
                        }) : i) : void 0
                    },
                    position: function() {
                        if (this[0]) {
                            var e, t, n = this[0], r = {
                                top: 0,
                                left: 0
                            };
                            return "fixed" === jQuery.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(),
                            t = this.offset(),
                            jQuery.nodeName(e[0], "html") || (r = e.offset()),
                            r.top += jQuery.css(e[0], "borderTopWidth", !0),
                            r.left += jQuery.css(e[0], "borderLeftWidth", !0)),
                            {
                                top: t.top - r.top - jQuery.css(n, "marginTop", !0),
                                left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map((function() {
                            for (var e = this.offsetParent; e && "static" === jQuery.css(e, "position"); )
                                e = e.offsetParent;
                            return e || re
                        }
                        ))
                    }
                }),
                jQuery.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, (function(e, t) {
                    var n = "pageYOffset" === t;
                    jQuery.fn[e] = function(r) {
                        return access(this, (function(e, r, i) {
                            var a = getWindow(e);
                            if (void 0 === i)
                                return a ? a[t] : e[r];
                            a ? a.scrollTo(n ? a.pageXOffset : i, n ? i : a.pageYOffset) : e[r] = i
                        }
                        ), e, r, arguments.length)
                    }
                }
                )),
                jQuery.each(["top", "left"], (function(e, t) {
                    jQuery.cssHooks[t] = addGetHookIf(m.pixelPosition, (function(e, n) {
                        if (n)
                            return n = curCSS(e, t),
                            ne.test(n) ? jQuery(e).position()[t] + "px" : n
                    }
                    ))
                }
                )),