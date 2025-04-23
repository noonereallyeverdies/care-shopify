
                q = o.createDocumentFragment().appendChild(o.createElement("div")),
                (H = o.createElement("input")).setAttribute("type", "radio"),
                H.setAttribute("checked", "checked"),
                H.setAttribute("name", "t"),
                q.appendChild(H),
                m.checkClone = q.cloneNode(!0).cloneNode(!0).lastChild.checked,
                q.innerHTML = "<textarea>x</textarea>",
                m.noCloneChecked = !!q.cloneNode(!0).lastChild.defaultValue;
                var V = /^key/
                  , z = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
                  , G = /^([^.]*)(?:\.(.+)|)/;
                function returnTrue() {
                    return !0
                }
                function returnFalse() {
                    return !1
                }
                function safeActiveElement() {
                    try {
                        return o.activeElement
                    } catch (e) {}
                }
                function on(e, t, n, r, i, a) {
                    var o, s;
                    if ("object" == typeof t) {
                        for (s in "string" != typeof n && (r = r || n,
                        n = void 0),
                        t)
                            on(e, s, n, r, t[s], a);
                        return e
                    }
                    if (null == r && null == i ? (i = n,
                    r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
                    r = void 0) : (i = r,
                    r = n,
                    n = void 0)),
                    !1 === i)
                        i = returnFalse;
                    else if (!i)
                        return e;
                    return 1 === a && (o = i,
                    i = function(e) {
                        return jQuery().off(e),
                        o.apply(this, arguments)
                    }
                    ,
                    i.guid = o.guid || (o.guid = jQuery.guid++)),
                    e.each((function() {
                        jQuery.event.add(this, t, i, r, n)
                    }
                    ))
                }
                jQuery.event = {
                    global: {},
                    add: function(e, t, n, r, i) {
                        var a, o, s, l, c, u, d, p, f, m, g, v = D.get(e);
                        if (v)
                            for (n.handler && (n = (a = n).handler,
                            i = a.selector),
                            n.guid || (n.guid = jQuery.guid++),
                            (l = v.events) || (l = v.events = {}),
                            (o = v.handle) || (o = v.handle = function(t) {
                                return void 0 !== jQuery && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : void 0
                            }
                            ),
                            c = (t = (t || "").match(R) || [""]).length; c--; )
                                f = g = (s = G.exec(t[c]) || [])[1],
                                m = (s[2] || "").split(".").sort(),
                                f && (d = jQuery.event.special[f] || {},
                                f = (i ? d.delegateType : d.bindType) || f,
                                d = jQuery.event.special[f] || {},
                                u = jQuery.extend({
                                    type: f,
                                    origType: g,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: i,
                                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                                    namespace: m.join(".")
                                }, a),
                                (p = l[f]) || ((p = l[f] = []).delegateCount = 0,
                                d.setup && !1 !== d.setup.call(e, r, m, o) || e.addEventListener && e.addEventListener(f, o)),
                                d.add && (d.add.call(e, u),
                                u.handler.guid || (u.handler.guid = n.guid)),
                                i ? p.splice(p.delegateCount++, 0, u) : p.push(u),
                                jQuery.event.global[f] = !0)
                    },
                    remove: function(e, t, n, r, i) {
                        var a, o, s, l, c, u, d, p, f, m, g, v = D.hasData(e) && D.get(e);
                        if (v && (l = v.events)) {
                            for (c = (t = (t || "").match(R) || [""]).length; c--; )
                                if (f = g = (s = G.exec(t[c]) || [])[1],
                                m = (s[2] || "").split(".").sort(),
                                f) {
                                    for (d = jQuery.event.special[f] || {},
                                    p = l[f = (r ? d.delegateType : d.bindType) || f] || [],
                                    s = s[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                    o = a = p.length; a--; )
                                        u = p[a],
                                        !i && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || r && r !== u.selector && ("**" !== r || !u.selector) || (p.splice(a, 1),
                                        u.selector && p.delegateCount--,
                                        d.remove && d.remove.call(e, u));
                                    o && !p.length && (d.teardown && !1 !== d.teardown.call(e, m, v.handle) || jQuery.removeEvent(e, f, v.handle),
                                    delete l[f])
                                } else
                                    for (f in l)
                                        jQuery.event.remove(e, f + t[c], n, r, !0);
                            jQuery.isEmptyObject(l) && D.remove(e, "handle events")
                        }
                    },
                    dispatch: function(e) {
                        e = jQuery.event.fix(e);
                        var t, n, r, i, a, o, l = s.call(arguments), c = (D.get(this, "events") || {})[e.type] || [], u = jQuery.event.special[e.type] || {};
                        if (l[0] = e,
                        e.delegateTarget = this,
                        !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                            for (o = jQuery.event.handlers.call(this, e, c),
                            t = 0; (i = o[t++]) && !e.isPropagationStopped(); )
                                for (e.currentTarget = i.elem,
                                n = 0; (a = i.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                                    e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a,
                                    e.data = a.data,
                                    void 0 !== (r = ((jQuery.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, l)) && !1 === (e.result = r) && (e.preventDefault(),
                                    e.stopPropagation()));
                            return u.postDispatch && u.postDispatch.call(this, e),
                            e.result
                        }
                    },
                    handlers: function(e, t) {
                        var n, r, i, a, o = [], s = t.delegateCount, l = e.target;
                        if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                            for (; l !== this; l = l.parentNode || this)
                                if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                                    for (r = [],
                                    n = 0; n < s; n++)
                                        void 0 === r[i = (a = t[n]).selector + " "] && (r[i] = a.needsContext ? jQuery(i, this).index(l) > -1 : jQuery.find(i, this, null, [l]).length),
                                        r[i] && r.push(a);
                                    r.length && o.push({
                                        elem: l,
                                        handlers: r
                                    })
                                }
                        return s < t.length && o.push({
                            elem: this,
                            handlers: t.slice(s)
                        }),
                        o
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "),
                        filter: function(e, t) {
                            return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                            e
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function(e, t) {
                            var n, r, i, a = t.button;
                            return null == e.pageX && null != t.clientX && (r = (n = e.target.ownerDocument || o).documentElement,
                            i = n.body,
                            e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0),
                            e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
                            e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
                            e
                        }
                    },
                    fix: function(e) {
                        if (e[jQuery.expando])
                            return e;
                        var t, n, r, i = e.type, a = e, s = this.fixHooks[i];
                        for (s || (this.fixHooks[i] = s = z.test(i) ? this.mouseHooks : V.test(i) ? this.keyHooks : {}),
                        r = s.props ? this.props.concat(s.props) : this.props,
                        e = new jQuery.Event(a),
                        t = r.length; t--; )
                            e[n = r[t]] = a[n];
                        return e.target || (e.target = o),
                        3 === e.target.nodeType && (e.target = e.target.parentNode),
                        s.filter ? s.filter(e, a) : e
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function() {
                                if (this !== safeActiveElement() && this.focus)
                                    return this.focus(),
                                    !1
                            },
                            delegateType: "focusin"
                        },
                        blur: {
                            trigger: function() {
                                if (this === safeActiveElement() && this.blur)
                                    return this.blur(),
                                    !1
                            },
                            delegateType: "focusout"
                        },
                        click: {
                            trigger: function() {
                                if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input"))
                                    return this.click(),
                                    !1
                            },
                            _default: function(e) {
                                return jQuery.nodeName(e.target, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    }
                },
                jQuery.removeEvent = function(e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n)
                }
                ,
                jQuery.Event = function(e, t) {
                    if (!(this instanceof jQuery.Event))
                        return new jQuery.Event(e,t);
                    e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? returnTrue : returnFalse) : this.type = e,
                    t && jQuery.extend(this, t),
                    this.timeStamp = e && e.timeStamp || jQuery.now(),
                    this[jQuery.expando] = !0
                }
                ,
                jQuery.Event.prototype = {
                    constructor: jQuery.Event,
                    isDefaultPrevented: returnFalse,
                    isPropagationStopped: returnFalse,
                    isImmediatePropagationStopped: returnFalse,
                    isSimulated: !1,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = returnTrue,
                        e && !this.isSimulated && e.preventDefault()
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = returnTrue,
                        e && !this.isSimulated && e.stopPropagation()
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = returnTrue,
                        e && !this.isSimulated && e.stopImmediatePropagation(),
                        this.stopPropagation()
                    }
                },
                jQuery.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, (function(e, t) {
                    jQuery.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function(e) {
                            var n, r = e.relatedTarget, i = e.handleObj;
                            return r && (r === this || jQuery.contains(this, r)) || (e.type = i.origType,
                            n = i.handler.apply(this, arguments),
                            e.type = t),
                            n
                        }
                    }
                }
                )),
                jQuery.fn.extend({
                    on: function(e, t, n, r) {
                        return on(this, e, t, n, r)
                    },
                    one: function(e, t, n, r) {
                        return on(this, e, t, n, r, 1)
                    },
                    off: function(e, t, n) {
                        var r, i;
                        if (e && e.preventDefault && e.handleObj)
                            return r = e.handleObj,
                            jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                            this;
                        if ("object" == typeof e) {
                            for (i in e)
                                this.off(i, t, e[i]);
                            return this
                        }
                        return !1 !== t && "function" != typeof t || (n = t,
                        t = void 0),
                        !1 === n && (n = returnFalse),
                        this.each((function() {
                            jQuery.event.remove(this, e, n, t)
                        }
                        ))
                    }
                });
                var Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
                  , K = /<script|<style|<link/i
                  , J = /checked\s*(?:[^=]|=\s*.checked.)/i
                  , Z = /^true\/(.*)/
                  , Q = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                function manipulationTarget(e, t) {
                    return jQuery.nodeName(e, "table") && jQuery.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                }
                function disableScript(e) {
                    return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
                    e
                }
                function restoreScript(e) {
                    var t = Z.exec(e.type);
                    return t ? e.type = t[1] : e.removeAttribute("type"),
                    e
                }
                function cloneCopyEvent(e, t) {
                    var n, r, i, a, o, s, l, c;
                    if (1 === t.nodeType) {
                        if (D.hasData(e) && (a = D.access(e),
                        o = D.set(t, a),
                        c = a.events))
                            for (i in delete o.handle,
                            o.events = {},
                            c)
                                for (n = 0,
                                r = c[i].length; n < r; n++)
                                    jQuery.event.add(t, i, c[i][n]);
                        A.hasData(e) && (s = A.access(e),
                        l = jQuery.extend({}, s),
                        A.set(t, l))
                    }
                }
                function domManip(e, t, n, r) {
                    t = l.apply([], t);
                    var i, a, o, s, c, u, d = 0, p = e.length, f = p - 1, g = t[0], v = jQuery.isFunction(g);
                    if (v || p > 1 && "string" == typeof g && !m.checkClone && J.test(g))
                        return e.each((function(i) {
                            var a = e.eq(i);
                            v && (t[0] = g.call(this, i, a.html())),
                            domManip(a, t, n, r)
                        }
                        ));
                    if (p && (a = (i = buildFragment(t, e[0].ownerDocument, !1, e, r)).firstChild,
                    1 === i.childNodes.length && (i = a),
                    a || r)) {
                        for (s = (o = jQuery.map(getAll(i, "script"), disableScript)).length; d < p; d++)
                            c = i,
                            d !== f && (c = jQuery.clone(c, !0, !0),
                            s && jQuery.merge(o, getAll(c, "script"))),
                            n.call(e[d], c, d);
                        if (s)
                            for (u = o[o.length - 1].ownerDocument,
                            jQuery.map(o, restoreScript),
                            d = 0; d < s; d++)
                                c = o[d],
                                B.test(c.type || "") && !D.access(c, "globalEval") && jQuery.contains(u, c) && (c.src ? jQuery._evalUrl && jQuery._evalUrl(c.src) : jQuery.globalEval(c.textContent.replace(Q, "")))
                    }
                    return e
                }
                function remove(e, t, n) {
                    for (var r, i = t ? jQuery.filter(t, e) : e, a = 0; null != (r = i[a]); a++)
                        n || 1 !== r.nodeType || jQuery.cleanData(getAll(r)),
                        r.parentNode && (n && jQuery.contains(r.ownerDocument, r) && setGlobalEval(getAll(r, "script")),
                        r.parentNode.removeChild(r));
                    return e
                }
                jQuery.extend({
                    htmlPrefilter: function(e) {
                        return e.replace(Y, "<$1></$2>")
                    },
                    clone: function(e, t, n) {
                        var r, i, a, o, s, l, c, u = e.cloneNode(!0), d = jQuery.contains(e.ownerDocument, e);
                        if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || jQuery.isXMLDoc(e)))
                            for (o = getAll(u),
                            r = 0,
                            i = (a = getAll(e)).length; r < i; r++)
                                s = a[r],
                                l = o[r],
                                c = void 0,
                                "input" === (c = l.nodeName.toLowerCase()) && M.test(s.type) ? l.checked = s.checked : "input" !== c && "textarea" !== c || (l.defaultValue = s.defaultValue);
                        if (t)
                            if (n)
                                for (a = a || getAll(e),
                                o = o || getAll(u),
                                r = 0,
                                i = a.length; r < i; r++)
                                    cloneCopyEvent(a[r], o[r]);
                            else
                                cloneCopyEvent(e, u);
                        return (o = getAll(u, "script")).length > 0 && setGlobalEval(o, !d && getAll(e, "script")),
                        u
                    },
                    cleanData: function(e) {
                        for (var t, n, r, i = jQuery.event.special, a = 0; void 0 !== (n = e[a]); a++)
                            if (acceptData(n)) {
                                if (t = n[D.expando]) {
                                    if (t.events)
                                        for (r in t.events)
                                            i[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
                                    n[D.expando] = void 0
                                }
                                n[A.expando] && (n[A.expando] = void 0)
                            }
                    }
                }),
                jQuery.fn.extend({
                    domManip,
                    detach: function(e) {
                        return remove(this, e, !0)
                    },
                    remove: function(e) {
                        return remove(this, e)
                    },
                    text: function(e) {
                        return access(this, (function(e) {
                            return void 0 === e ? jQuery.text(this) : this.empty().each((function() {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                            }
                            ))
                        }
                        ), null, e, arguments.length)
                    },
                    append: function() {
                        return domManip(this, arguments, (function(e) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || manipulationTarget(this, e).appendChild(e)
                        }
                        ))
                    },
                    prepend: function() {
                        return domManip(this, arguments, (function(e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = manipulationTarget(this, e);
                                t.insertBefore(e, t.firstChild)
                            }
                        }
                        ))
                    },
                    before: function() {
                        return domManip(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        }
                        ))
                    },
                    after: function() {
                        return domManip(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        }
                        ))
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++)
                            1 === e.nodeType && (jQuery.cleanData(getAll(e, !1)),
                            e.textContent = "");
                        return this
                    },
                    clone: function(e, t) {
                        return e = null != e && e,
                        t = null == t ? e : t,
                        this.map((function() {
                            return jQuery.clone(this, e, t)
                        }
                        ))
                    },
                    html: function(e) {
                        return access(this, (function(e) {
                            var t = this[0] || {}
                              , n = 0
                              , r = this.length;
                            if (void 0 === e && 1 === t.nodeType)
                                return t.innerHTML;
                            if ("string" == typeof e && !K.test(e) && !j[($.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = jQuery.htmlPrefilter(e);
                                try {
                                    for (; n < r; n++)
                                        1 === (t = this[n] || {}).nodeType && (jQuery.cleanData(getAll(t, !1)),
                                        t.innerHTML = e);
                                    t = 0
                                } catch (e) {}
                            }
                            t && this.empty().append(e)
                        }
                        ), null, e, arguments.length)
                    },
                    replaceWith: function() {
                        var e = [];
                        return domManip(this, arguments, (function(t) {
                            var n = this.parentNode;
                            jQuery.inArray(this, e) < 0 && (jQuery.cleanData(getAll(this)),
                            n && n.replaceChild(t, this))
                        }
                        ), e)
                    }
                }),
                jQuery.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, (function(e, t) {
                    jQuery.fn[e] = function(e) {
                        for (var n, r = [], i = jQuery(e), a = i.length - 1, o = 0; o <= a; o++)
                            n = o === a ? this : this.clone(!0),
                            jQuery(i[o])[t](n),
                            c.apply(r, n.get());
                        return this.pushStack(r)
                    }
                }
                ));
                var X, ee = {
                    HTML: "block",
                    BODY: "block"
                };
                function actualDisplay(e, t) {
                    var n = jQuery(t.createElement(e)).appendTo(t.body)
                      , r = jQuery.css(n[0], "display");
                    return n.detach(),
                    r
                }
                function defaultDisplay(e) {
                    var t = o
                      , n = ee[e];
                    return n || ("none" !== (n = actualDisplay(e, t)) && n || ((t = (X = (X || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(),
                    t.close(),
                    n = actualDisplay(e, t),
                    X.detach()),
                    ee[e] = n),
                    n
                }
                var te = /^margin/
                  , ne = new RegExp("^(" + L + ")(?!px)[a-z%]+$","i")
                  , getStyles = function(e) {
                    var t = e.ownerDocument.defaultView;
                    return t && t.opener || (t = r),
                    t.getComputedStyle(e)
                }
                  , swap = function(e, t, n, r) {
                    var i, a, o = {};
                    for (a in t)
                        o[a] = e.style[a],
                        e.style[a] = t[a];
                    for (a in i = n.apply(e, r || []),
                    t)
                        e.style[a] = o[a];
                    return i
                }
                  , re = o.documentElement;
                function curCSS(e, t, n) {
                    var r, i, a, o, s = e.style;
                    return "" !== (o = (n = n || getStyles(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== o || jQuery.contains(e.ownerDocument, e) || (o = jQuery.style(e, t)),
                    n && !m.pixelMarginRight() && ne.test(o) && te.test(t) && (r = s.width,
                    i = s.minWidth,
                    a = s.maxWidth,
                    s.minWidth = s.maxWidth = s.width = o,
                    o = n.width,
                    s.width = r,
                    s.minWidth = i,
                    s.maxWidth = a),
                    void 0 !== o ? o + "" : o
                }
                function addGetHookIf(e, t) {
                    return {
                        get: function() {
                            if (!e())
                                return (this.get = t).apply(this, arguments);
                            delete this.get
                        }
                    }
                }
                !function() {
                    var e, t, n, i, a = o.createElement("div"), s = o.createElement("div");
                    function computeStyleTests() {
                        s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                        s.innerHTML = "",
                        re.appendChild(a);
                        var o = r.getComputedStyle(s);
                        e = "1%" !== o.top,
                        i = "2px" === o.marginLeft,
                        t = "4px" === o.width,
                        s.style.marginRight = "50%",
                        n = "4px" === o.marginRight,
                        re.removeChild(a)
                    }
                    s.style && (s.style.backgroundClip = "content-box",
                    s.cloneNode(!0).style.backgroundClip = "",
                    m.clearCloneStyle = "content-box" === s.style.backgroundClip,
                    a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
                    a.appendChild(s),
                    jQuery.extend(m, {
                        pixelPosition: function() {
                            return computeStyleTests(),
                            e
                        },
                        boxSizingReliable: function() {
                            return null == t && computeStyleTests(),
                            t
                        },
                        pixelMarginRight: function() {
                            return null == t && computeStyleTests(),
                            n
                        },
                        reliableMarginLeft: function() {
                            return null == t && computeStyleTests(),
                            i
                        },
                        reliableMarginRight: function() {
                            var e, t = s.appendChild(o.createElement("div"));
                            return t.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                            t.style.marginRight = t.style.width = "0",
                            s.style.width = "1px",
                            re.appendChild(a),
                            e = !parseFloat(r.getComputedStyle(t).marginRight),
                            re.removeChild(a),
                            s.removeChild(t),
                            e
                        }
                    }))
                }();
                var ie = /^(none|table(?!-c[ea]).+)/
                  , ae = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }
                  , oe = {
                    letterSpacing: "0",
                    fontWeight: "400"
                }
                  , se = ["Webkit", "O", "Moz", "ms"]
                  , le = o.createElement("div").style;
                function vendorPropName(e) {
                    if (e in le)
                        return e;
                    for (var t = e[0].toUpperCase() + e.slice(1), n = se.length; n--; )
                        if ((e = se[n] + t)in le)
                            return e
                }
                function setPositiveNumber(e, t, n) {
                    var r = W.exec(t);
                    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
                }
                function augmentWidthOrHeight(e, t, n, r, i) {
                    for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; a < 4; a += 2)
                        "margin" === n && (o += jQuery.css(e, n + N[a], !0, i)),
                        r ? ("content" === n && (o -= jQuery.css(e, "padding" + N[a], !0, i)),
                        "margin" !== n && (o -= jQuery.css(e, "border" + N[a] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + N[a], !0, i),
                        "padding" !== n && (o += jQuery.css(e, "border" + N[a] + "Width", !0, i)));
                    return o
                }
                function getWidthOrHeight(e, t, n) {
                    var r = !0
                      , i = "width" === t ? e.offsetWidth : e.offsetHeight
                      , a = getStyles(e)
                      , o = "border-box" === jQuery.css(e, "boxSizing", !1, a);
                    if (i <= 0 || null == i) {
                        if (((i = curCSS(e, t, a)) < 0 || null == i) && (i = e.style[t]),
                        ne.test(i))
                            return i;
                        r = o && (m.boxSizingReliable() || i === e.style[t]),
                        i = parseFloat(i) || 0
                    }
                    return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, a) + "px"
                }
                function showHide(e, t) {
                    for (var n, r, i, a = [], o = 0, s = e.length; o < s; o++)
                        (r = e[o]).style && (a[o] = D.get(r, "olddisplay"),
                        n = r.style.display,
                        t ? (a[o] || "none" !== n || (r.style.display = ""),
                        "" === r.style.display && isHidden(r) && (a[o] = D.access(r, "olddisplay", defaultDisplay(r.nodeName)))) : (i = isHidden(r),
                        "none" === n && i || D.set(r, "olddisplay", i ? n : jQuery.css(r, "display"))));
                    for (o = 0; o < s; o++)
                        (r = e[o]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
                    return e
                }
                function Tween(e, t, n, r, i) {
                    return new Tween.prototype.init(e,t,n,r,i)
                }
                jQuery.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, t) {
                                if (t) {
                                    var n = curCSS(e, "opacity");
                                    return "" === n ? "1" : n
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        float: "cssFloat"
                    },
                    style: function(e, t, n, r) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var i, a, o, s = jQuery.camelCase(t), l = e.style;
                            if (t = jQuery.cssProps[s] || (jQuery.cssProps[s] = vendorPropName(s) || s),
                            o = jQuery.cssHooks[t] || jQuery.cssHooks[s],
                            void 0 === n)
                                return o && "get"in o && void 0 !== (i = o.get(e, !1, r)) ? i : l[t];
                            "string" === (a = typeof n) && (i = W.exec(n)) && i[1] && (n = adjustCSS(e, t, i),
                            a = "number"),
                            null != n && n == n && ("number" === a && (n += i && i[3] || (jQuery.cssNumber[s] ? "" : "px")),
                            m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                            o && "set"in o && void 0 === (n = o.set(e, n, r)) || (l[t] = n))
                        }
                    },
                    css: function(e, t, n, r) {
                        var i, a, o, s = jQuery.camelCase(t);
                        return t = jQuery.cssProps[s] || (jQuery.cssProps[s] = vendorPropName(s) || s),
                        (o = jQuery.cssHooks[t] || jQuery.cssHooks[s]) && "get"in o && (i = o.get(e, !0, n)),
                        void 0 === i && (i = curCSS(e, t, r)),
                        "normal" === i && t in oe && (i = oe[t]),
                        "" === n || n ? (a = parseFloat(i),
                        !0 === n || isFinite(a) ? a || 0 : i) : i
                    }
                }),
                jQuery.each(["height", "width"], (function(e, t) {
                    jQuery.cssHooks[t] = {
                        get: function(e, n, r) {
                            if (n)
                                return ie.test(jQuery.css(e, "display")) && 0 === e.offsetWidth ? swap(e, ae, (function() {
                                    return getWidthOrHeight(e, t, r)
                                }
                                )) : getWidthOrHeight(e, t, r)
                        },
                        set: function(e, n, r) {
                            var i, a = r && getStyles(e), o = r && augmentWidthOrHeight(e, t, r, "border-box" === jQuery.css(e, "boxSizing", !1, a), a);
                            return o && (i = W.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n,
                            n = jQuery.css(e, t)),
                            setPositiveNumber(0, n, o)
                        }
                    }
                }
                )),
                jQuery.cssHooks.marginLeft = addGetHookIf(m.reliableMarginLeft, (function(e, t) {
                    if (t)
                        return (parseFloat(curCSS(e, "marginLeft")) || e.getBoundingClientRect().left - swap(e, {
                            marginLeft: 0
                        }, (function() {
                            return e.getBoundingClientRect().left
                        }
                        ))) + "px"
                }
                )),
                jQuery.cssHooks.marginRight = addGetHookIf(m.reliableMarginRight, (function(e, t) {
                    if (t)
                        return swap(e, {
                            display: "inline-block"
                        }, curCSS, [e, "marginRight"])
                }
                )),
                jQuery.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, (function(e, t) {
                    jQuery.cssHooks[e + t] = {
                        expand: function(n) {
                            for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                                i[e + N[r] + t] = a[r] || a[r - 2] || a[0];
                            return i
                        }
                    },
                    te.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
                }
                )),
                jQuery.fn.extend({
                    css: function(e, t) {
                        return access(this, (function(e, t, n) {
                            var r, i, a = {}, o = 0;
                            if (jQuery.isArray(t)) {
                                for (r = getStyles(e),
                                i = t.length; o < i; o++)
                                    a[t[o]] = jQuery.css(e, t[o], !1, r);
                                return a
                            }
                            return void 0 !== n ? jQuery.style(e, t, n) : jQuery.css(e, t)
                        }
                        ), e, t, arguments.length > 1)
                    },
                    show: function() {
                        return showHide(this, !0)
                    },
                    hide: function() {
                        return showHide(this)
                    },
                    toggle: function(e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                            isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
                        }
                        ))
                    }
                }),
                jQuery.Tween = Tween,
                Tween.prototype = {
                    constructor: Tween,
                    init: function(e, t, n, r, i, a) {
                        this.elem = e,
                        this.prop = n,
                        this.easing = i || jQuery.easing._default,
                        this.options = t,
                        this.start = this.now = this.cur(),
                        this.end = r,
                        this.unit = a || (jQuery.cssNumber[n] ? "" : "px")
                    },
                    cur: function() {
                        var e = Tween.propHooks[this.prop];
                        return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
                    },
                    run: function(e) {
                        var t, n = Tween.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                        this.now = (this.end - this.start) * t + this.start,
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        n && n.set ? n.set(this) : Tween.propHooks._default.set(this),
                        this
                    }
                },
                Tween.prototype.init.prototype = Tween.prototype,
                Tween.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = jQuery.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                        },
                        set: function(e) {
                            jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[jQuery.cssProps[e.prop]] && !jQuery.cssHooks[e.prop] ? e.elem[e.prop] = e.now : jQuery.style(e.elem, e.prop, e.now + e.unit)
                        }
                    }
                },
                Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                },
                jQuery.easing = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    },
                    _default: "swing"
                },
                jQuery.fx = Tween.prototype.init,
                jQuery.fx.step = {};
                var ce, ue, de = /^(?:toggle|show|hide)$/, pe = /queueHooks$/;
                function createFxNow() {
                    return r.setTimeout((function() {
                        ce = void 0
                    }
                    )),
                    ce = jQuery.now()
                }
                function genFx(e, t) {
                    var n, r = 0, i = {
                        height: e
                    };
                    for (t = t ? 1 : 0; r < 4; r += 2 - t)
                        i["margin" + (n = N[r])] = i["padding" + n] = e;
                    return t && (i.opacity = i.width = e),
                    i
                }
                function createTween(e, t, n) {
                    for (var r, i = (Animation.tweeners[t] || []).concat(Animation.tweeners["*"]), a = 0, o = i.length; a < o; a++)
                        if (r = i[a].call(n, t, e))
                            return r
                }
                function Animation(e, t, n) {
                    var r, i, a = 0, o = Animation.prefilters.length, s = jQuery.Deferred().always((function() {
                        delete tick.elem
                    }
                    )), tick = function() {
                        if (i)
                            return !1;
                        for (var t = ce || createFxNow(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), a = 0, o = l.tweens.length; a < o; a++)
                            l.tweens[a].run(r);
                        return s.notifyWith(e, [l, r, n]),
                        r < 1 && o ? n : (s.resolveWith(e, [l]),
                        !1)
                    }, l = s.promise({
                        elem: e,
                        props: jQuery.extend({}, t),
                        opts: jQuery.extend(!0, {
                            specialEasing: {},
                            easing: jQuery.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: ce || createFxNow(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = jQuery.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                            return l.tweens.push(r),
                            r
                        },
                        stop: function(t) {
                            var n = 0
                              , r = t ? l.tweens.length : 0;
                            if (i)
                                return this;
                            for (i = !0; n < r; n++)
                                l.tweens[n].run(1);
                            return t ? (s.notifyWith(e, [l, 1, 0]),
                            s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                            this
                        }
                    }), c = l.props;
                    for (!function propFilter(e, t) {
                        var n, r, i, a, o;
                        for (n in e)
                            if (i = t[r = jQuery.camelCase(n)],
                            a = e[n],
                            jQuery.isArray(a) && (i = a[1],
                            a = e[n] = a[0]),
                            n !== r && (e[r] = a,
                            delete e[n]),
                            (o = jQuery.cssHooks[r]) && "expand"in o)
                                for (n in a = o.expand(a),
                                delete e[r],
                                a)
                                    n in e || (e[n] = a[n],
                                    t[n] = i);
                            else
                                t[r] = i
                    }(c, l.opts.specialEasing); a < o; a++)
                        if (r = Animation.prefilters[a].call(l, e, c, l.opts))
                            return jQuery.isFunction(r.stop) && (jQuery._queueHooks(l.elem, l.opts.queue).stop = jQuery.proxy(r.stop, r)),
                            r;
                    return jQuery.map(c, createTween, l),
                    jQuery.isFunction(l.opts.start) && l.opts.start.call(e, l),
                    jQuery.fx.timer(jQuery.extend(tick, {
                        elem: e,
                        anim: l,
                        queue: l.opts.queue
                    })),
                    l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
                }
                jQuery.Animation = jQuery.extend(Animation, {
                    tweeners: {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t);
                            return adjustCSS(n.elem, e, W.exec(t), n),
                            n
                        }
                        ]
                    },
                    tweener: function(e, t) {
                        jQuery.isFunction(e) ? (t = e,
                        e = ["*"]) : e = e.match(R);
                        for (var n, r = 0, i = e.length; r < i; r++)
                            n = e[r],
                            Animation.tweeners[n] = Animation.tweeners[n] || [],
                            Animation.tweeners[n].unshift(t)
                    },
                    prefilters: [function defaultPrefilter(e, t, n) {
                        var r, i, a, o, s, l, c, u = this, d = {}, p = e.style, f = e.nodeType && isHidden(e), m = D.get(e, "fxshow");
                        for (r in n.queue || (null == (s = jQuery._queueHooks(e, "fx")).unqueued && (s.unqueued = 0,
                        l = s.empty.fire,
                        s.empty.fire = function() {
                            s.unqueued || l()
                        }
                        ),
                        s.unqueued++,
                        u.always((function() {
                            u.always((function() {
                                s.unqueued--,
                                jQuery.queue(e, "fx").length || s.empty.fire()
                            }
                            ))
                        }
                        ))),
                        1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                        "inline" === ("none" === (c = jQuery.css(e, "display")) ? D.get(e, "olddisplay") || defaultDisplay(e.nodeName) : c) && "none" === jQuery.css(e, "float") && (p.display = "inline-block")),
                        n.overflow && (p.overflow = "hidden",
                        u.always((function() {
                            p.overflow = n.overflow[0],
                            p.overflowX = n.overflow[1],
                            p.overflowY = n.overflow[2]
                        }
                        ))),
                        t)
                            if (i = t[r],
                            de.exec(i)) {
                                if (delete t[r],
                                a = a || "toggle" === i,
                                i === (f ? "hide" : "show")) {
                                    if ("show" !== i || !m || void 0 === m[r])
                                        continue;
                                    f = !0
                                }
                                d[r] = m && m[r] || jQuery.style(e, r)
                            } else
                                c = void 0;
                        if (jQuery.isEmptyObject(d))
                            "inline" === ("none" === c ? defaultDisplay(e.nodeName) : c) && (p.display = c);
                        else
                            for (r in m ? "hidden"in m && (f = m.hidden) : m = D.access(e, "fxshow", {}),
                            a && (m.hidden = !f),
                            f ? jQuery(e).show() : u.done((function() {
                                jQuery(e).hide()
                            }
                            )),
                            u.done((function() {
                                var t;
                                for (t in D.remove(e, "fxshow"),
                                d)
                                    jQuery.style(e, t, d[t])
                            }
                            )),
                            d)
                                o = createTween(f ? m[r] : 0, r, u),
                                r in m || (m[r] = o.start,
                                f && (o.end = o.start,
                                o.start = "width" === r || "height" === r ? 1 : 0))
                    }
                    ],
                    prefilter: function(e, t) {
                        t ? Animation.prefilters.unshift(e) : Animation.prefilters.push(e)
                    }
                }),
                jQuery.speed = function(e, t, n) {
                    var r = e && "object" == typeof e ? jQuery.extend({}, e) : {
                        complete: n || !n && t || jQuery.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !jQuery.isFunction(t) && t
                    };
                    return r.duration = jQuery.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default,
                    null != r.queue && !0 !== r.queue || (r.queue = "fx"),
                    r.old = r.complete,
                    r.complete = function() {
                        jQuery.isFunction(r.old) && r.old.call(this),
                        r.queue && jQuery.dequeue(this, r.queue)
                    }
                    ,
                    r
                }
                ,
                jQuery.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(isHidden).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function(e, t, n, r) {
                        var i = jQuery.isEmptyObject(e)
                          , a = jQuery.speed(t, n, r)
                          , doAnimation = function() {
                            var t = Animation(this, jQuery.extend({}, e), a);
                            (i || D.get(this, "finish")) && t.stop(!0)
                        };
                        return doAnimation.finish = doAnimation,
                        i || !1 === a.queue ? this.each(doAnimation) : this.queue(a.queue, doAnimation)
                    },
                    stop: function(e, t, n) {
                        var stopQueue = function(e) {
                            var t = e.stop;
                            delete e.stop,
                            t(n)
                        };
                        return "string" != typeof e && (n = t,
                        t = e,
                        e = void 0),
                        t && !1 !== e && this.queue(e || "fx", []),
                        this.each((function() {
                            var t = !0
                              , r = null != e && e + "queueHooks"
                              , i = jQuery.timers
                              , a = D.get(this);
                            if (r)
                                a[r] && a[r].stop && stopQueue(a[r]);
                            else
                                for (r in a)
                                    a[r] && a[r].stop && pe.test(r) && stopQueue(a[r]);
                            for (r = i.length; r--; )
                                i[r].elem !== this || null != e && i[r].queue !== e || (i[r].anim.stop(n),
                                t = !1,
                                i.splice(r, 1));
                            !t && n || jQuery.dequeue(this, e)
                        }
                        ))
                    },
                    finish: function(e) {
                        return !1 !== e && (e = e || "fx"),
                        this.each((function() {
                            var t, n = D.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], a = jQuery.timers, o = r ? r.length : 0;
                            for (n.finish = !0,
                            jQuery.queue(this, e, []),
                            i && i.stop && i.stop.call(this, !0),
                            t = a.length; t--; )
                                a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0),
                                a.splice(t, 1));
                            for (t = 0; t < o; t++)
                                r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish
                        }
                        ))
                    }
                }),
                jQuery.each(["toggle", "show", "hide"], (function(e, t) {
                    var n = jQuery.fn[t];
                    jQuery.fn[t] = function(e, r, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
                    }
                }
                )),
                jQuery.each({
                    slideDown: genFx("show"),
                    slideUp: genFx("hide"),
                    slideToggle: genFx("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, (function(e, t) {
                    jQuery.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }
                )),