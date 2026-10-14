/* ===========================================================
   WPlus UI theme runtime (_runtime.js + WPlusUIConfig stub)
   Foundational: defines PU global helpers used by everything
   below. Must load first.
   =========================================================== */

/*--[ Global ]--*/

/*! Theme Configurations (config.js) | Should be defined before bundle.js */
const WPlusUIConfig = () => ({});

/* @include _runtime.js */
this._$ = this._$ || {};
this._$.$0 = this._$.$0 || {};
this._$.$1 = this._$.$1 || {};
this._$.$2 = this._$.$2 || {};
this._$.$3 = this._$.$3 || {};
this._$.$4 = this._$.$4 || {};
this._$.$5 = this._$.$5 || {};
this._$.$6 = this._$.$6 || {};
this._$.$7 = this._$.$7 || {};
this._$.$8 = this._$.$8 || {};
this._$.$9 = this._$.$9 || {};
this._$.$10 = this._$.$10 || {};
this._$.$11 = this._$.$11 || {};
this._$.$12 = this._$.$12 || {};
/* @endinclude */

/* @include bundle.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n, r, i) => {
      let a = `function`,
        o = `object`,
        s = `remove`,
        c = `call`,
        l = `undefined`,
        u = `enumerable`,
        d = `textContent`,
        f = `innerHTML`,
        p = `innerText`,
        m = `insertAdjacentElement`,
        h = `length`,
        g = `cookie`,
        _ = `prototype`,
        v = `toString`,
        y = `readyState`,
        b = `split`,
        x = `appendChild`,
        S = `replace`,
        ee = `push`,
        te = `forEach`,
        C = `match`,
        ne = `test`,
        w = `once`,
        re = `prepend`,
        ie = `prependOnce`,
        ae = `listeners`,
        oe = `removeListener`,
        se = `terminate`,
        ce = `indexOf`,
        le = `includes`,
        ue = `apply`,
        de = `slice`,
        T = `concat`,
        fe = `classList`,
        E = `type`,
        pe = `module`,
        me = `toLowerCase`,
        D = `warn`,
        he = typeof globalThis == l ? e : globalThis,
        ge = t.documentElement,
        _e = t.head,
        ve = t.currentScript,
        ye = e.location,
        O = e.Object,
        be = e.RegExp,
        k = e.console,
        xe = e.String,
        A = e.Number,
        Se = e.Boolean,
        j = e.Promise,
        Ce = e.Error,
        M = e.TypeError,
        we = e.URL,
        Te = e.Worker,
        Ee = e.Math,
        De = e.JSON,
        Oe = e.Symbol,
        ke = e.Date;
      e.URLSearchParams;
      let Ae = e.encodeURIComponent,
        je = e.decodeURIComponent,
        Me = e.setTimeout,
        Ne = e.clearTimeout;
      (e.localStorage, e.sessionStorage);
      let Pe = e.navigator,
        Fe = e.Element,
        Ie = e.WeakMap,
        Le = e.getComputedStyle;
      O.create;
      let Re = O.assign,
        ze = O.defineProperty,
        Be = O.defineProperties;
      (O.getOwnPropertyDescriptor, O.getOwnPropertyNames);
      let Ve = O.getPrototypeOf,
        He = (e, t) => O[_].hasOwnProperty[c](e, t),
        Ue = O.getOwnPropertySymbols,
        We = (e, t) => O.propertyIsEnumerable[c](e, t),
        Ge = O.keys,
        Ke = we.createObjectURL,
        N = Ee.floor,
        qe = A.MIN_SAFE_INTEGER,
        Je = A.MAX_SAFE_INTEGER,
        Ye = Pe.userAgent,
        Xe = Ye[me](),
        Ze = De.parse,
        Qe = De.stringify,
        P = (e, t, n, r) => e.addEventListener(t, n, r),
        F = (e, t, n, r) => e.removeEventListener(t, n, r),
        $e = /(?:^\[object\s(.*?)\]$)/,
        I = (e) => O[_][v][c](e)[S]($e, `$1`),
        L = (e, t) => typeof e === t,
        R = (e) => L(e, `string`),
        z = (e) => e === void 0,
        B = (e) => L(e, a),
        V = (e) => L(e, `boolean`),
        et = (e) => L(e, `symbol`),
        H = (e) => e === null,
        tt = (e) => z(e) || H(e),
        nt = (e) => L(e, `bigint`),
        rt = (e) => tt(e) || (!L(e, o) && !B(e)),
        it = (e) => !!e && (L(e, o) || B(e)) && B(e.then),
        U = Array.isArray,
        at = (e) => e != null && !B(e) && yt(e[h]),
        ot = (e) => !!e && L(e, o),
        st = (e) => ot(e) && !U(e),
        ct = (e) => ot(e) && I(e) === `Arguments`,
        lt = (e) => I(e) === `RegExp`,
        ut = (e) => I(e) === `Date`,
        dt = (e) => I(e) === `URL`,
        ft = (e) => {
          if (!ot(e)) return !1;
          if (H(Ve(e))) return !0;
          if (I(e) !== `Object`) return !1;
          let t = e;
          for (; !H(Ve(t));) t = Ve(t);
          return Ve(e) === t;
        },
        pt = (e) => L(e, `number`),
        mt = (e) => A.isNaN(e),
        ht = (e) => A.isFinite(e),
        gt = (e) => pt(e) && !mt(e) && ht(e),
        _t = (e) => pt(e) && e >= qe && e <= Je,
        vt = (e) => _t(e) && e > 0,
        yt = (e) => pt(e) && e >= 0 && A.isSafeInteger(e),
        bt = /[-\/\\^$*+?.()|[\]{}]/g,
        xt = (e) => e[S](bt, `\\$&`),
        St = () => new ke().getTime(),
        W = (e, n) => (n[h] >= 2 ? n[1] : t)[e](n[0]),
        Ct = (...e) => W(`getElementById`, e),
        wt = (...e) => W(`getElementsByTagName`, e),
        Tt = (...e) => W(`getElementsByClassName`, e),
        Et = (...e) => W(`getElementsByName`, e),
        Dt = (...e) => W(`querySelector`, e),
        Ot = (...e) => W(`querySelectorAll`, e),
        kt = (e, ...t) => e[fe].add(...t),
        At = (e, ...t) => e[fe][s](...t),
        jt = (e, t) => e[fe].contains(t),
        Mt = (e, t, n) => e[fe].toggle(t, n),
        Nt = (e, t) => e.getAttribute(t),
        Pt = (e, t, n) => e.setAttribute(t, n),
        Ft = (e, t) => e.removeAttribute(t),
        It = (e, t) => e.hasAttribute(t),
        Lt = (e, t, n) => e[m](t, n),
        Rt = (e, t, n) => e.insertAdjacentHTML(t, n),
        zt = (e) => {
          let t = R(e) ? Dt(e) : e;
          if (t)
            try {
              return Ze(t[d] || t[p]);
            } catch (e) {
              throw (k[D](`Invalid JSON:`, e, t), e);
            }
        },
        Bt = (e) => new we(e, t.baseURI),
        Vt = (e) => e[S](/(^\w+:|^)/, ``),
        Ht = (e) => Bt(Vt(e)),
        Ut = () => t[y] === `complete` || t[y] !== `loading`,
        G = (e, t) => `${e} is not type of ${t}`;
      At(ge, `nJs`);
      let Wt = B(Oe) && !!Oe.for,
        Gt = /bot|spider|crawl|http|lighthouse/i,
        Kt,
        qt = () => {
          if (!Kt)
            try {
              Kt = new be(
                ` daum[ /]| deusu/| yadirectfetcher|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<![hg]m)score|@[a-z][\\w-]+\\.|\\(\\)|\\.com|\\b\\d{13}\\b|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[^ ]{50,}$|^\\d+\\b|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^active|^ad muncher|^amaya|^avsdevicesdk/|^biglotron|^bot|^bw/|^clamav[ /]|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^offline|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^valid|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|analyzer|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|evc-batch/|exaleadcloudview|feed|firephp|functionize|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|infrawatch|insight|inspect|iplabel|ips-agent|java(?!;)|library|linkcheck|mail\\.ru/|manager|measure|neustar wpm|node|nutch|offbyone|optimize|pageburst|pagespeed|parser|perl|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reputation|resolver|retriever|rexx;|rigor|rss\\b|scan|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|trace|transcoder|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|zgrab`,
                `i`,
              );
            } catch (e) {
              Kt = Gt;
            }
          return Kt;
        },
        Jt = (e) => !!e && qt()[ne](e),
        Yt = async (t, n = 9, r = 1e3, i = !0) => {
          let a = 0;
          do {
            try {
              return (
                i &&
                  !Pe.onLine &&
                  (await new j((t) => {
                    let n = () => {
                      (F(e, `online`, n), t());
                    };
                    P(e, `online`, n);
                  })),
                await t(a)
              );
            } catch (e) {
              (k[D](e), r !== 0 && (await new j((e) => Me(e, r))));
            }
            a++;
          } while (a <= n);
          throw new Ce(`Max retries reached.`);
        },
        Xt = (e, t, { signal: n, edges: r } = {}) => {
          let i,
            a = null,
            o = r && r[le](`leading`),
            s = !r || r[le](`trailing`),
            c = () => {
              a !== null && (e[ue](i, a), (i = void 0), (a = null));
            },
            l = () => {
              (s && c(), p());
            },
            u = null,
            d = () => {
              (u != null && Ne(u),
                (u = Me(() => {
                  ((u = null), l());
                }, t)));
            },
            f = () => {
              u !== null && (Ne(u), (u = null));
            },
            p = () => {
              (f(), (i = void 0), (a = null));
            },
            m = () => {
              (f(), c());
            },
            h = function (...e) {
              if (n && n.aborted) return;
              ((i = this), (a = e));
              let t = u == null;
              (d(), o && t && c());
            };
          return (
            (h.schedule = d),
            (h.cancel = p),
            (h.flush = m),
            n && P(n, `abort`, p, { [w]: !0 }),
            h
          );
        },
        Zt = (t, n = !1) => {
          let { top: r, left: i, bottom: a, right: o } = t.getBoundingClientRect(),
            { innerHeight: s, innerWidth: c } = e;
          return n
            ? r >= 0 && i >= 0 && a <= s && o <= c
            : ((r > 0 && r < s) || (a > 0 && a < s)) && ((i > 0 && i < c) || (o > 0 && o < c));
        },
        Qt = (e) => {
          let t = {
            g: (t) => {
              try {
                return e.getItem(t);
              } catch (e) {
                k[D](e);
              }
              return null;
            },
            s: (t, n) => {
              try {
                e.setItem(t, n);
              } catch (e) {
                k[D](e);
              }
            },
            r: (t) => {
              try {
                e.removeItem(t);
              } catch (e) {
                k[D](e);
              }
            },
            c: () => {
              try {
                e.clear();
              } catch (e) {
                k[D](e);
              }
            },
            pZ: (e, n = 0) => {
              let r = t.g(e);
              if (r)
                try {
                  let e = Ze(r);
                  if (st(e) && e.version === n) return { state: {}, ...e };
                } catch (e) {
                  k[D](e);
                }
              return null;
            },
            sZ: (e, n, r = 0) => {
              let i = t.pZ(e, r) || {},
                a = i.state,
                o = { ...i, state: { ...(a || {}), ...(B(n) ? n(a || null) : n) }, version: r };
              t.s(e, Qe(o));
            },
            gZ: (e, n = 0) => (t.pZ(e, n) || {}).state || null,
          };
          return t;
        },
        K = Qt(e.localStorage),
        $t = Qt(e.sessionStorage),
        q = {
          get v() {
            return t[g];
          },
          set v(e) {
            t[g] = e;
          },
          h(e) {
            return !H(q.g(e));
          },
          g(e) {
            let t = new be(`(?:^|; )${xt(Ae(e))}=([^;]*)`),
              n = q.v[C](t);
            return n && R(n[1]) ? je(n[1]) : null;
          },
          gA() {
            let e = {},
              t = q.v[b](`; `);
            for (let n = 0; n < t[h]; n++) {
              let r = t[n][b](`=`),
                i = r[0],
                a = r[1];
              i && (e[je(i)] = a ? je(a) : ``);
            }
            return e;
          },
          s(e, t, n) {
            let r = Re({ path: `/` }, n),
              i = `${Ae(e)}=${z(t) ? `` : Ae(t)}`;
            for (let e in r) {
              let t = r[e];
              switch (e) {
                case `expires`:
                  ut(t) && (t = t.toUTCString());
                  break;
                case `maxAge`:
                  e = `max-age`;
                  break;
                case `sameSite`:
                case `samesite`:
                  ((e = `samesite`), t === `none` && (t = !0));
                  break;
              }
              ((i += `; ${e}`), (V(t) ? t !== !0 : !z(t)) && (i += `=${t}`));
            }
            return ((q.v = i), i);
          },
          r(e) {
            q.s(e, ``, { maxAge: -1 });
          },
          c() {
            for (let e in q.gA()) q.r(e);
          },
          get k() {
            return Ge(q.gA());
          },
          get l() {
            return q.k[h];
          },
        },
        en = new Ie();
      class tn extends j {
        constructor(e) {
          let t;
          (super((n, r) => {
            ((t = [n, r]), z(e) || e(n, r));
          }),
            en.set(this, t || []));
        }
        resolve(e) {
          return (en.get(this)[0](e), this);
        }
        reject(e) {
          return (en.get(this)[1](e), this);
        }
      }
      let nn = (e) => {
          if (!B(e)) throw new M(G(`fn`, a));
          let t = j.resolve();
          return async (...n) => {
            let r = () => e(...n);
            return ((t = t.then(r, r)), t);
          };
        },
        J = new tn((n) => {
          let r = [`scroll`, `click`],
            i = [`keydown`, `mouseover`, `touchmove`, `touchstart`],
            a = r[T](i),
            o = `WPLUS_UI_LAZY`,
            s = `true`,
            c = () => {
              try {
                return K.g(o) === s;
              } catch (e) {
                return !1;
              }
            },
            l = () => {
              try {
                return K.s(o, s);
              } catch (e) {}
            },
            u = (t) => {
              for (let t = 0; t < a[h]; t++) F(e, a[t], u);
              (l(), n({ type: t.type }));
            };
          if (c()) n({ type: `local` });
          else if (ge.scrollTop !== 0 || (t.body && t.body.scrollTop !== 0)) u({ type: `scroll` });
          else {
            let t = () => {
              F(e, `load`, t);
              for (let t = 0; t < i[h]; t++) P(e, i[t], u);
            };
            for (let t = 0; t < r[h]; t++) P(e, r[t], u);
            P(e, `load`, t);
          }
        });
      ((J._lazied = !1),
        (J._type = null),
        J.then((e) => {
          ((J._lazied = !0), e && e.type && (J._type = e.type));
        }));
      let rn = new j((e) => {
          let n = `DOMContentLoaded`,
            r = () => {
              (F(t, n, r), e({ type: n }));
            };
          Ut() ? r() : P(t, n, r);
        }),
        an = new tn(),
        Y = (e, n) => {
          let r = R(e) ? t.createElement(e) : e;
          if (n)
            for (let e in n) {
              let t = n[e];
              switch (e) {
                case `class`:
                  {
                    let e = (U(t) ? t : R(t) && t.trim() ? t[b](` `) : []).filter(
                      (e) => R(e) && !!e.trim(),
                    );
                    e[h] && kt(r, ...e);
                  }
                  break;
                case `datasets`:
                case `styles`:
                case `attributes`:
                  if (e === `styles` && R(t)) Pt(r, `style`, t);
                  else if (ft(t))
                    for (let n in t) {
                      let i = t[n];
                      if (!z(i)) {
                        let t = xe(i);
                        switch (e) {
                          case `datasets`:
                            r.dataset[n] = t;
                            break;
                          case `styles`:
                            n in r.style && (r.style[n] = t);
                            break;
                          default:
                            Pt(r, n, t);
                        }
                      }
                    }
                  break;
                default:
                  e in r && (r[e] = t);
              }
            }
          return r;
        },
        on = (e, t) => {
          let n = wt(t, _e),
            r = n[h] ? n[n[h] - 1] : null,
            i = () => _e[x](e);
          if (r) {
            let t = r.nextElementSibling,
              n = r.parentElement;
            m in r ? r[m](`afterend`, e) : t && n ? n.insertBefore(e, t) : i();
          } else i();
          return e;
        },
        sn = (e) => (t, n) => {
          let r = Y(e, Re(!B(n) && n ? n : {}, { [d]: t }));
          return (B(n) && n(r), on(r, e));
        },
        cn = sn(`script`),
        ln = sn(`style`);
      class un extends Ce {
        constructor(e, t, n) {
          super(n);
          let r = this;
          ((r.source = t), (r.element = e), (r.name = `ResourceLoadingError`));
        }
      }
      let dn = (e) => (t, n) =>
          new j((r, i) => {
            if (!R(t) && !dt(t)) i(new M(G(`source`, `URL or string`)));
            else if (R(t) && !t.trim()[h]) i(new M(`source is blank string`));
            else {
              let a = R(t) ? t : t[v](),
                o = !B(n) && n ? n : void 0,
                s = e ? `script` : `link`,
                c = Y(s, e ? { async: !0, ...o, src: a } : { ...o, rel: `stylesheet`, href: a });
              B(n) && n(c);
              let l = () => {
                  (F(c, `load`, u), F(c, `error`, d));
                },
                u = () => {
                  (l(), r(c));
                },
                d = () => {
                  l();
                  let t = e ? c.src : c.href;
                  i(new un(c, t, `failed to load ${e ? `javascript` : `stylesheet`} from "${t}"`));
                };
              (P(c, `load`, u), P(c, `error`, d), on(c, s));
            }
          }),
        fn = dn(!0),
        pn = dn(!1),
        X = Y(`div`),
        mn = (e, t = !0, n = !0, r = !0, i = !1) => {
          let a = e;
          return (
            t && n && i
              ? ((X[d] = a), (a = X[f]), (X[f] = ``))
              : (t && (a = a[S](/&/g, `&amp;`)), n && (a = a[S](/</g, `&lt;`)[S](/>/g, `&gt;`))),
            r ? a[S](/"/g, `&quot;`)[S](/'/g, `&#39;`) : a
          );
        },
        hn = (e, t = !0) => {
          let n = e;
          return (
            t
              ? ((X[f] = n), (n = X[d] || X[p]), (X[f] = ``))
              : (n = n[S](/&#39;/g, `'`)
                  [S](/&apos;/g, `'`)
                  [S](/&quot;/g, `"`)
                  [S](/&gt;/g, `>`)
                  [S](/&lt;/g, `<`)
                  [S](/&amp;/g, `&`)),
            n
          );
        },
        gn = `x-script-classic`,
        _n = `x-script-module`,
        vn = (e) => {
          for (let t = 0; t < e[h]; t++) {
            let n = e[t];
            !n[E] || n[E] === `text/javascript` ? (n[E] = gn) : n[E] === pe && (n[E] = _n);
          }
        },
        yn = (e) => {
          for (let t = 0; t < e[h]; t++) {
            let n = e[t];
            if (n[E] === gn || n[E] === _n) {
              let e = Y(`script`);
              n[E] === _n && (e[E] = pe);
              let t = [`innerHTML`, `defer`, `async`, `crossOrigin`, `src`];
              for (let r = 0; r < t[h]; r++) {
                let i = t[r],
                  a = n[i];
                a && (e[i] = a);
              }
              (Lt(n, `afterend`, e), n[s]());
            }
          }
        },
        bn = (e) => {
          let t = e[C](
            /^(https?\:)?\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
          );
          return (
            t && {
              href: e,
              protocol: t[1] || ``,
              host: t[2],
              hostname: t[3],
              port: t[4] || ``,
              pathname: t[5],
              search: t[6],
              hash: t[7],
              origin: (t[1] || ``) + `//` + t[2],
            }
          );
        },
        xn = /(googleusercontent\.com|blogspot\.com)$/,
        Sn =
          /^(w|h|s|b|e|r|l|v|m|a|ba|pd|br|cp|iv|pc|sc|vb)(\d+)$|^(rj|rp|rw|rwa|rg|rh|nw|h|g|k|x|y|z|a|d|b|r|n|s|c|o|p|cc|dv|vm|no|ip|sm|fg|pg|ft|ng|lo|fv|ci|al|df|fh|pf|pp|gd|il|lf|md|mo|mv|nc|nd|ns|nu|nt0|pa|rwu|sg|sm)$|^(c|bc|pc)(0x[0-9A-Fa-f]{6,8})$|^(fcrop64)(=1,[0-9A-Fa-f]{6,16})$|^(fSoften)(=\d+,\d+,\d+)$|^(mm)(,[0-9A-Za-z]+)$|^(t|q)([0-9A-Za-z]+)$/,
        Cn = {
          jpeg: `rj`,
          jpg: `rj`,
          png: `rp`,
          webp: `rw`,
          animatedWebp: `rwa`,
          gif: `rg`,
          mp4: `rh`,
          noWebp: `nw`,
          html: `h`,
          xml: `g`,
        },
        wn = {};
      for (let e in Cn) wn[Cn[e]] = e;
      let Tn = (e) => {
        let t = e.match(Sn);
        if (t) {
          if (t[1] && t[2]) return [1, t[1], A(t[2])];
          if (t[3]) return [2, t[3], !0];
          if (t[4] && t[5]) return [3, t[4], t[5]];
          if (t[6] && t[7]) return [4, t[6], t[7]];
          if (t[8] && t[9]) return [5, t[8], t[9]];
          if (t[10] && t[11]) return [6, t[10], t[11]];
          if (t[12] && t[13]) return [7, t[12], t[13]];
        }
        return [];
      };
      class En {
        constructor(e, t) {
          if (!R(e) && !dt(e)) throw new M(G(`argument 1`, `string or URL`));
          let n = this,
            r = R(e) ? bn(e) : e;
          if (((n.i = e), (n.u = r), (n.m = ``), (n.d = ``), (n.x = null), (n.p = {}), r)) {
            let e = r.host,
              t = r.pathname;
            if (((n.m = t), xn[ne](e))) {
              let e = t[ce](`=`);
              if (e !== -1) ((n.d = t[de](e + 1)), (n.x = t[de](0, e + 1)));
              else {
                let e = t[b](`/`),
                  r = e[h],
                  i = r - 1,
                  a = r - 2,
                  o = e[i];
                a in e && o && o[ce](`.`) !== -1 && ((n.d = e[a]), (n.x = e));
              }
            }
          }
          (n[T](n.d), t && n.set(t));
        }
        n(e) {
          let t = this;
          return (
            t.x && (R(t.x) ? (t.m = t.x + e) : ((t.x[t.x[h] - 2] = e), (t.m = t.x.join(`/`)))),
            t
          );
        }
        h() {
          let e = this,
            t = e.u;
          return t ? `${t.protocol}//${t.host}${e.m}${t.search}${t.hash}` : e.i;
        }
        is() {
          return !!this.d;
        }
        params() {
          let e = this,
            t = e.p,
            n = ``;
          if (e.d)
            for (let e in t) {
              let r = e[de](1),
                i = t[e];
              i !== void 0 &&
                i !== !1 &&
                i !== null &&
                (n += `${n ? `-` : ``}${r}${i === !0 ? `` : i}`);
            }
          return n || `s0`;
        }
        set({
          width: e,
          height: t,
          size: n,
          ratio: r,
          rotate: i,
          format: a,
          cache: o,
          download: c,
          symbol: l,
          flipHorizontally: u,
          flipVertically: d,
          forceScaling: f,
          noUpScaling: p,
          freeCrop: m,
        } = {}) {
          let h = this;
          return (
            h.d &&
              ((e = !z(e) && vt(e) ? N(e) : void 0),
              (t = !z(t) && vt(t) ? N(t) : void 0),
              (n = !z(n) && vt(n) ? N(n) : void 0),
              (r = !z(r) && vt(r) ? r : void 0),
              (i = !z(i) && vt(i) && i <= 270 && i % 90 == 0 ? i : void 0),
              (a = R(a) && a in Cn ? a : void 0),
              (o = !z(o) && _t(o) && o >= 0 && o <= 90 && o % 1 == 0 ? o : void 0),
              (c = V(c) ? c : void 0),
              (l = !z(l) && _t(l) && l >= 0 && l <= 11 && l % 1 == 0 ? l : void 0),
              (u = V(u) ? u : void 0),
              (d = V(d) ? d : void 0),
              (f = V(f) ? f : void 0),
              (p = V(p) ? p : void 0),
              (m = R(m) ? m.trim()[me]() : void 0),
              h[s](
                ...[
                  f === !1 && `s`,
                  u === !1 && `fh`,
                  d === !1 && `fv`,
                  c === !1 && `d`,
                  p === !1 && `nu`,
                ].filter(Se),
              ),
              h.add(
                ...[
                  e && `w${e}`,
                  t && `h${t}`,
                  !z(n) && `s${n}`,
                  f === !0 && `s`,
                  u === !0 && `fh`,
                  d === !0 && `fv`,
                  c === !0 && `d`,
                  p === !0 && `nu`,
                  i && `r${i}`,
                  !z(l) && `ba${l}`,
                  a && Cn[a],
                  o && `e${o}`,
                  m && `fcrop64=1,${m}`,
                ].filter(Se),
              ),
              r &&
                ((e || t || n) && h.add(`p`, `k`, `no`, `nu`),
                e
                  ? h.add(`h${N(e / r)}`)
                  : t
                    ? h.add(`w${N(t * r)}`)
                    : n && h.add(`w${n}`, `h${N(n / r)}`))),
            h
          );
        }
        get(e) {
          let t = this;
          if (this.d) {
            let n = t.p,
              r = `1${e}`;
            if (r in n && pt(n[r])) return n[r];
          }
          return null;
        }
        add(...e) {
          let t = this,
            n = t.p;
          if (t.d && e[h])
            for (let t = 0; t < e[h]; t++) {
              let r = e[t];
              if (r) {
                let e = Tn(r);
                if (e[0]) {
                  if (e[1] in wn)
                    for (let t in wn) {
                      let r = e[0] + t;
                      if (r in n) {
                        delete n[r];
                        break;
                      }
                    }
                  let t = e[0] + e[1];
                  n[t] = e[2];
                }
              }
            }
          return t;
        }
        [s](...e) {
          let t = this,
            n = t.p;
          if (t.d && e[h])
            for (let t = 0; t < e[h]; t++) {
              let r = e[t];
              if (r)
                for (let e in n) {
                  let t = e[de](1) + n[e];
                  (R(r) ? t === r : r[ne](t)) && delete n[e];
                }
            }
          return t;
        }
        reset() {
          let e = this;
          if (e.d) return ((e.p = {}), e[T](e.d), e);
        }
        href() {
          let e = this;
          return (e.n(e.params()), e.h());
        }
        [T](...e) {
          let t = this;
          if (t.d && e[h])
            for (let n = 0; n < e[h]; n++) {
              let r = e[n][b](`-`);
              if (r[h]) for (let e = 0; e < r[h]; e++) t.add(r[e]);
            }
          return t;
        }
        [v]() {
          return this.href();
        }
      }
      let Dn = (() => {
          let e = `isMergeableObject`,
            t = `customMerge`,
            n = `arrayMerge`,
            r = (e) => !!e && L(e, o),
            i = Wt ? Oe.for(`react.element`) : 60103,
            a = (e) => e.$$typeof === i,
            s = (e) => lt() || ut() || a(e),
            c = (e) => r(e) && !s(e),
            l = (e) => (U(e) ? [] : {}),
            u = (t, n) => (n.clone !== !1 && n[e](t) ? v(l(t), t, n) : t),
            d = (e, t, n) => e[T](t).map((e) => u(e, n)),
            f = (e, n) => {
              if (!n[t]) return v;
              let r = n[t](e);
              return B(r) ? r : v;
            },
            p = (e) => (Ue ? Ue(e).filter((t) => We(e, t)) : []),
            m = (e) => O.keys(e)[T](p(e)),
            h = (e, t) => {
              try {
                return t in e;
              } catch (e) {
                return !1;
              }
            },
            g = (e, t) => h(e, t) && !(He(e, t) && We(e, t)),
            _ = (t, n, r) => {
              let i = {};
              return (
                r[e](t) &&
                  m(t)[te]((e) => {
                    i[e] = u(t[e], r);
                  }),
                m(n)[te]((a) => {
                  g(t, a) ||
                    (h(t, a) && r[e](n[a]) ? (i[a] = f(a, r)(t[a], n[a], r)) : (i[a] = u(n[a], r)));
                }),
                i
              );
            },
            v = (t, r, i) => {
              ((i = i || {}),
                (i[n] = i[n] || d),
                (i[e] = i[e] || c),
                (i.cloneUnlessOtherwiseSpecified = u));
              let a = U(r);
              return a === U(t) ? (a ? i[n](t, r, i) : _(t, r, i)) : u(r, i);
            };
          return (
            (v.all = (e, t) => {
              if (!U(e)) throw new M(G(`argument 1`, `array`));
              return e.reduce((e, n) => v(e, n, t), {});
            }),
            v
          );
        })(),
        On = (() => {
          let e = `--[[event-emitter]]--`,
            t = Wt ? Oe.for(e) : e,
            n = t,
            r = (e) => {
              if (!R(e) && !et(e)) throw new M(G(`type`, `string or symbol`));
            },
            i = (e) => {
              if (!B(e)) throw new M(G(`fn`, a));
            },
            o = (e) => ({ [t]: `always`, fn: e }),
            s = (e) => ({ [t]: w, fn: e });
          return class {
            constructor() {
              this[n] = {};
            }
            addListener(e, t) {
              return this.on(e, t);
            }
            on(e, t) {
              (r(e), i(t));
              let a = this;
              return ((a[n][e] = a[n][e] || []), a[n][e][ee](o(t)), a);
            }
            prependListener(e, t) {
              return this[re](e, t);
            }
            [re](e, t) {
              (r(e), i(t));
              let a = this;
              return ((a[n][e] = a[n][e] || []), a[n][e].unshift(o(t)), a);
            }
            prependOnceListener(e, t) {
              return this[ie](e, t);
            }
            [ie](e, t) {
              (r(e), i(t));
              let a = this;
              return ((a[n][e] = a[n][e] || []), a[n][e].unshift(s(t)), a);
            }
            [ae](e) {
              return (this[n][e] || []).map((e) => e.fn);
            }
            [w](e, t) {
              (r(e), i(t));
              let a = this;
              return ((a[n][e] = a[n][e] || []), a[n][e][ee](s(t)), a);
            }
            removeAllListeners() {
              this[n] = {};
            }
            off(e, t) {
              return this[oe](e, t);
            }
            [oe](e, t) {
              r(e);
              let i = this,
                a = i[ae](e);
              if (B(t)) {
                let r = -1,
                  o = !1;
                for (; (r = a[ce](t)) >= 0;) (a.splice(r, 1), i[n][e].splice(r, 1), (o = !0));
                return o;
              } else return delete i[n][e];
            }
            async emit(e, ...i) {
              r(e);
              let a = this,
                o = a[ae](e),
                s = [];
              if (o && o[h]) {
                for (let r = 0; r < o[h]; r++) {
                  let c = o[r],
                    l = c[ue](a, i);
                  (it(l) && (await l), a[n][e] && a[n][e][r] && a[n][e][r][t] === w && s[ee](c));
                }
                return (s[te]((t) => a[oe](e, t)), !0);
              }
              return !1;
            }
            emitSync(e, ...i) {
              r(e);
              let a = this,
                o = a[ae](e),
                s = [];
              if (o && o[h]) {
                for (let r = 0; r < o[h]; r++) {
                  let c = o[r];
                  (c[ue](a, i), a[n][e] && a[n][e][r] && a[n][e][r][t] === w && s[ee](c));
                }
                return (s[te]((t) => a[oe](e, t)), !0);
              }
              return !1;
            }
          };
        })();
      class kn extends Te {
        constructor(e, t = {}, a) {
          let o = t.toMain,
            s = t.toWorker,
            c = t.type === `module`,
            u = `registerHandler`,
            f = (e) => e[v](),
            p = (e) => (B(e) ? f(e) : l),
            m = (e) => (B(e) ? e : void 0),
            h = `self.${u}=(${f(i)})(self,${f(r)},${p(o)},${f(n)});`;
          if (B(e)) {
            if (c) throw new M(`'type' cannot be 'module' when function`);
            h += `self.registered=self.${u}(${f(e)});`;
          } else if (dt(e) || R(e)) {
            let t = `"${(dt(e) ? e : Bt(e))[v]()}"`;
            h += c ? `import ${t};` : `self.importScripts(${t});`;
          } else if (e instanceof Fe) {
            if (e.tagName !== `SCRIPT`) throw new M(`Element is not a script`);
            let n = e.type,
              r = `worker/classic`,
              i = `worker/module`;
            if (n !== r && n !== i) throw new M(`Element type is not "${r}" or "${i}"`);
            ((t.type = e.type[S](`worker/`, ``)), (h += e[d]));
          } else {
            if (!ft(e)) throw new M(G(`Argument 1`, `URL, string or function`));
            let t = e.script;
            if (!t) throw new M(G(`Field 'script'`, `string`));
            h += t;
          }
          let g = Ke(new Blob([h], { type: `text/javascript` }));
          (super(g, t),
            (this._ = r(
              {
                post: (...e) => {
                  this.postMessage(...e);
                },
                close: () => {
                  this.terminate();
                },
                on: (...e) => {
                  this.addEventListener(...e);
                },
                off: (...e) => {
                  this.removeEventListener(...e);
                },
              },
              () => `from-main-${n()}`,
              m(s),
              m(a),
            )));
        }
        call(...e) {
          return this._.call(...e);
        }
        get proxy() {
          return this._.proxy;
        }
        [se]() {
          this._[se]();
        }
      }
      let An = (e) => {
          let n = `toast_notif`,
            r = Ct(n);
          (r || (r = t.body[x](Y(`div`, { id: n, class: `tNtf alt notranslate` }))),
            (r[f] = `<div>${e}</div>`));
        },
        Z = new On(),
        jn = (e) => {
          for (let t in e) ze(Z, t, { get: () => e[t], [u]: !0 });
          return Z;
        },
        Mn = (e, t) => {
          let n;
          if (typeof WPlusUIConfig != l) {
            let r = WPlusUIConfig;
            B(r) ? (n = r(e, t)) : r && (n = r);
          }
          return n;
        },
        Nn = zt(Ct(`json:data`)),
        Pn = Mn(Nn, {});
      jn(Pn && Pn !== Nn ? Dn(Nn, Pn, { isMergeableObject: ft }) : Nn);
      let Fn = `WPLUS_UI_STORAGE`;
      (ze(Z.vw, `iAd`, {
        get: () => {
          try {
            let e = K.gZ(Fn);
            if (e) {
              let t = e.isAdmin;
              if (V(t)) return t;
            }
          } catch (e) {}
          return null;
        },
        set: (e) => {
          try {
            e === null ? K.sZ(Fn, { isAdmin: void 0 }) : V(e) && K.sZ(Fn, { isAdmin: e });
          } catch (e) {}
        },
        [u]: !0,
      }),
        (Z.vw.iBt = Jt(Ye)),
        (Z.vw.iAi = Xe[le](`googleadsenseinfeed`)));
      let In = /^[0-9]{12,24}$/,
        Ln = (e) => (st(e) && R(e.id) && In[ne](e.id) ? e.id : !1),
        Rn = (e) => {
          let t = {},
            n = (e) => {
              let n = e.id,
                r = e.lab;
              if (!Z.ps[n]) {
                if (r && r[h]) for (let e = 0; e < r[h]; e++) r[e] = hn(r[e]);
                ((Z.ps[n] = e), (t[n] = e));
              }
            };
          if (U(e)) {
            if (e[h]) for (let t = 0; t < e[h]; t++) Ln(e[t]) && n(e[t]);
          } else if (st(e)) for (let t in e) Ln(e[t]) === t && n(e[t]);
          return t;
        },
        zn = () => {
          let e = Z.bg.siId;
          return e && Z.ps[e] ? Z.ps[e] : null;
        };
      Be(Z.ps, { push: { get: () => Rn }, c: { get: () => zn() } }, { [u]: !1 });
      let { vw: Q, bg: Bn, pl: Vn, st: Hn, ms: Un, mc: Wn } = Z;
      for (let e in Un) Un[e] = hn(Un[e]);
      for (let e in Wn) Wn[e] = hn(Wn[e]);
      Q.sr && Q.sr.l && (Q.sr.l = hn(Q.sr.l));
      let Gn = `https://www.blogger.com/dyn-css/authorization.css?targetBlogID=${Bn.bgId}`,
        $,
        Kn = async () => {
          if ($)
            try {
              await $;
            } catch (e) {
              $ = void 0;
            }
          return (
            $ ||
              ($ = (async () => {
                await rn;
                let e = `i-admin-${St()}`,
                  n = Y(`div`, {
                    className: `${e} blog-admin`,
                    [f]: `<style>.${e}{display:none}</style>`,
                  });
                t.body[x](n);
                try {
                  await pn(Gn);
                  let e = Le(n).display === `block`;
                  return (n[s](), e);
                } catch (e) {
                  throw (n[s](), e);
                }
              })()),
            $
          );
        },
        qn = async () => {
          let e = Kn().then((e) => ((Q.iAd = e), e));
          return V(Q.iAd) ? Q.iAd : e;
        };
      if (
        (Q.iBt || t.head.classList.add(`notranslate`),
        !Q.iPv && !Q.iEr && ye.hostname !== `localhost`)
      ) {
        let t = (e, t) => {
          switch (t) {
            case 1:
              break;
            case 2:
              return rn.then(e);
            case 3:
              return J.then(e);
            case 4:
              return rn.then(() => J).then(e);
          }
        };
        if (!Q.iBt) {
          let n = Vn.cl;
          if (n.ok && n.trId && n.src) {
            let r = () => {
              let t = `clarity`;
              e[t] =
                e[t] ||
                function () {
                  ((e[t].q = e[t].q || []), e[t].q.push(arguments));
                };
            };
            t(() => {
              let e = n.src,
                t = n.trId;
              e &&
                t &&
                !Dt(`script[src*='//www.clarity.ms/tag/${t}']`) &&
                (r(), fn(e, { async: !0 }));
            }, n.typ);
          }
          let r = Vn.an;
          if (r.ok && r.trId && r.src) {
            let n = (t) => {
              let n = `dataLayer`,
                r = `gtag`;
              ((e[n] = e[n] || []),
                (e[r] =
                  e[r] ||
                  function () {
                    e[n].push(arguments);
                  }),
                e[r](`js`, new ke()),
                e[r](`config`, t));
            };
            t(async () => {
              let e = r.src,
                t = r.trId;
              e &&
                t &&
                !Dt(`script[src*='//www.googletagmanager.com/gtag/js?id=${t}']`) &&
                (n(t), await fn(e, { async: !0 }));
            }, r.typ);
          }
        }
        let n = Vn.ad;
        if (!Bn.iPrB && n.ok && n.src) {
          let e = async () => {
            let e = n.src,
              t = K.gZ(`WPLUS_UI_STORAGE`),
              r = !!t && t.isAdmin === !0;
            e &&
              (!n.dWa || !r) &&
              !Dt(`script[src*='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?']`) &&
              (await fn(e, { async: !0, crossOrigin: `anonymous` }));
          };
          Q.iBt ? Q.iAi && n.typ !== 1 && e() : t(e, n.typ);
        }
      }
      (J.then(() => {
        if (!Q.iBt) {
          let e = () => {
            let e = Q.iAd;
            V(e) && kt(ge, e ? `iAd` : `iUs`);
          };
          (e(), qn().then(e));
          let t = Hn.fnt;
          if (Vn.op.fntLd === 2) {
            let e = t.css,
              n = t.lnk;
            if ((e && ln(e), n[h])) for (let e = 0; e < n[h]; e++) pn(n[e]);
          }
        }
      }),
        (he.PU = Z),
        jn({
          EE: On,
          DP: tn,
          WW: kn,
          RLE: un,
          GI: En,
          LS: K,
          SS: $t,
          CS: q,
          g: he,
          dPr: ze,
          dPrs: Be,
          exp: jn,
          hOwn: He,
          lz: J,
          df: rn,
          fl: an,
          pEJ: zt,
          qSel: Dt,
          qSell: Ot,
          gId: Ct,
          gCl: Tt,
          gTg: wt,
          gNm: Et,
          cEl: Y,
          cJs: cn,
          cCss: ln,
          lJs: fn,
          lCss: pn,
          aCl: kt,
          rCl: At,
          hCl: jt,
          tCl: Mt,
          sAb: Pt,
          gAb: Nt,
          hAb: It,
          rAb: Ft,
          iStr: R,
          iFun: B,
          iBig: nt,
          iThen: it,
          iUnd: z,
          iBol: V,
          iSym: et,
          iNul: H,
          iNil: tt,
          iPri: rt,
          iArr: U,
          iArrL: at,
          iArg: ct,
          iObj: st,
          iObjL: ot,
          iObjP: ft,
          iLen: yt,
          iNum: pt,
          iNumV: gt,
          iNumS: _t,
          iNan: mt,
          iFin: ht,
          iReg: lt,
          eReg: xt,
          tStr: I,
          mrg: Dn,
          eUC: Ae,
          dUC: je,
          cOU: Ke,
          genI: n,
          aEL: P,
          rEL: F,
          wLP: nn,
          cwR: Yt,
          iAH: Rt,
          iAE: Lt,
          eHTML: mn,
          uHTML: hn,
          iAdm: qn,
          iVwp: Zt,
          iBot: Jt,
          tNtf: An,
          dbc: Xt,
          asB: vn,
          asA: yn,
          _: {},
          x: {},
        }));
      let Jn = `WPLUS_UI_LAZY_CONTENTS`,
        Yn = () => K.gZ(Jn),
        Xn = (e) => {
          K.sZ(Jn, e);
        },
        Zn = () => K.r(Jn),
        Qn = (e) => {
          let t = Ct(`js:lazy`, e),
            n = Ct(`css:lazy`, e);
          return t && n ? { js: t, css: n } : null;
        },
        $n = (e) => ({ js: e.js[d], css: e.css[d] }),
        er = (t) => {
          let n = t.js,
            r = t.css;
          (r && ln(r), n && e.eval(n));
        },
        tr = (e) => er($n(e)),
        nr = (e = !0) => {
          let n = Qn(t);
          return n ? (tr(n), e && (n.css[s](), n.js[s]()), !0) : !1;
        },
        rr = (e) => {
          let t = Yn(),
            n = e || Nt(ve, `data-match`);
          return t && (!t.expAt || t.expAt >= St()) && (!(n || t[C]) || n === t[C])
            ? (er(t), !0)
            : !1;
        },
        ir = (e) => {
          let [t, n] = [`data-max-age-sec`, `data-match`].map((t) => Nt(e.js, t)),
            r = Re($n(e), { expAt: t ? St() + A(t * 1e3) : void 0, [C]: n || void 0 });
          (er(r), Xn(r));
        };
      nr()
        ? Zn()
        : !rr() &&
          !Q.iBt &&
          (Zn(),
          J.then(() => {
            Yt(() =>
              fetch(`${Ht(Bn.cnHmU)}?m=0&view=x-content-lazy`).then((e) =>
                e.ok ? e.text() : null,
              ),
            ).then((e) => {
              if (e) {
                let t = Qn(new DOMParser().parseFromString(e, `text/html`));
                t && ir(t);
              }
            });
          }));
    })(
      window,
      document,
      (e = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`) => {
        let t = new Date().getTime(),
          n = (typeof performance < `u` && performance.now && performance.now() * 1e3) || 0;
        return e.replace(/[xy]/g, (e) => {
          let r = Math.random() * 16;
          return (
            t > 0
              ? ((r = ((t + r) % 16) | 0), (t = Math.floor(t / 16)))
              : ((r = ((n + r) % 16) | 0), (n = Math.floor(n / 16))),
            (e === `x` ? r : (r & 3) | 8).toString(16)
          );
        });
      },
      (e, t, n, r) => {
        let i = Object.create,
          a = (e, t) => Object.hasOwnProperty.call(e, t),
          o = (e, t) => typeof e === t,
          s = (e) => o(e, `string`),
          c = (e) => o(e, `number`),
          l = (e) => o(e, `function`),
          u = (e) => {
            let t = {};
            return (
              (t.p = new Promise((n, r) => {
                (e && e(n, r), (t.f = n), (t.r = r));
              })),
              t
            );
          },
          d = (e) => {
            let t = e.data;
            return o(t, `object`) && t !== null && a(t, x.n);
          },
          f = (e) => Error(e),
          p = (e) => TypeError(e),
          m = (e) => {
            throw e;
          },
          h = (e, t) => f(`Requested '${e}' type but got '${t}'`),
          g = (e, t) => {
            m(h(e, t));
          },
          _ = (e) => {
            m(f(`Invalid response: ${JSON.stringify(e)}`));
          },
          v = () => m(p(`Name must be of type string or number`)),
          y = `call`,
          b = `close`,
          x = {
            n: `--[[communicator]]--`,
            t: e,
            q: {},
            b: !1,
            g: () => {
              let e;
              do e = t();
              while (a(x.q, e));
              return e;
            },
            w: u(),
            o: u(),
            s: (e, t, n) => {
              x.t.post({ ...t, id: e, ts: new Date().getTime(), [x.n]: !0 }, n);
            },
            r: async (e, t) => {
              let n = x.g(),
                r = u();
              return ((x.q[n] = r), x.s(n, e, t), r.p);
            },
            l: (e) => {
              if (d(e)) {
                e.stopImmediatePropagation();
                let t = e.data,
                  n = t.id,
                  r = t.tp;
                if (n) {
                  if (t.rq === 1)
                    if (r === `ctx`) (x.w.f(t.bd), x.s(n, { tp: `ctx`, rq: 0, st: 1 }));
                    else if (r === y) {
                      let e = t.nm,
                        r = t.ag;
                      x.i(e, r)
                        .then((t) => {
                          x.s(n, { tp: y, rq: 0, st: 1, nm: e, bd: t });
                        })
                        .catch((t) => {
                          x.s(n, { tp: y, rq: 0, st: 0, nm: e, er: t });
                        });
                    } else r === b && (x.z(), x.d(), x.s(n, { tp: b, rq: 0 }));
                  else if (t.rq === 0) {
                    let e = x.q[n];
                    e && (r === `ctx` || r === y || r == b) && (e.f(t), delete x.q[n]);
                  }
                }
              }
            },
            a: () => {
              (x.d(), x.t.on(`message`, x.l));
            },
            d: () => {
              x.t.off(`message`, x.l);
            },
            i: async (e, t) => {
              !s(e) && !c(e) && v();
              let n = await x.o.p;
              return (
                n || m(f(`Handler is not set, failed to call '${e}'`)),
                a(n, e) || m(f(`Method '${e}' does not exist`)),
                l(n[e]) || m(f(`Property '${e}' is not a function`)),
                n[e](...t)
              );
            },
            y: async (e, t, n) => {
              (x.b === !0 && m(f(`Communicator is disconnected`)),
                !s(e) && !c(e) && v(),
                await x.w.p);
              let r = await x.r({ tp: y, rq: 1, nm: e, ag: t }, n);
              if ((r.tp !== y && g(y, r.tp), r.rq !== 0 && _(r), r.st === 1)) return r.bd;
              (r.st === 0 && m(r.er), _(r));
            },
            call: async (...e) => {
              if (![`string`, `number`, `object`].includes(typeof e[0]) || e[0] === null)
                throw TypeError(`Argument 1 must be of type string, number, object or array`);
              let t,
                n,
                r,
                i = typeof e[0] == `object`;
              if (
                (i ? ([r, t, ...n] = e) : ([t, ...n] = e), ![`string`, `number`].includes(typeof t))
              )
                throw TypeError(
                  `${i ? `Argument 2` : `Argument 1`} must be of type string or number`,
                );
              return x.y(t, n, r);
            },
            x: null,
            get proxy() {
              return (x.x =
                x.x ||
                i(
                  new Proxy(
                    {},
                    {
                      get:
                        (e, t) =>
                        (...e) =>
                          x.y(t, e),
                    },
                  ),
                ));
            },
            z: () => {
              if (!x.b) {
                for (let e in x.q) (x.q[e].r(f(`Communicator disconnected`)), delete x.q[e]);
                return ((x.b = !0), !0);
              }
              return !1;
            },
            terminate: () => {
              x.z() &&
                x.r({ tp: b, rq: 1 }).finally(() => {
                  (x.d(), x.t.close());
                });
            },
          };
        return (
          x.a(),
          x
            .r({ tp: `ctx`, rq: 1, bd: l(n) ? n() : void 0 })
            .then((e) => {
              let t = e.tp,
                n = e.st;
              t === `ctx` ? n !== 1 && x.w.r(e.er) : x.w.r(h(`ctx`, t));
            })
            .catch((e) => {
              x.w.r(e);
            }),
          x.w.p
            .then(async (t) => {
              let n;
              (l(r) && (n = await r(e, t, x)), x.o.f(n));
            })
            .catch((e) => {
              console.warn(`Initialization failed: `, e);
            }),
          x
        );
      },
      (e, t, n, r) => {
        let i = !1;
        return (a) => {
          if (i) throw Error(`Cannot register multiple times`);
          return (
            (i = !0),
            t(
              {
                post: (...t) => {
                  e.postMessage(...t);
                },
                close: () => {
                  e.close();
                },
                on: (...t) => {
                  e.addEventListener(...t);
                },
                off: (...t) => {
                  e.removeEventListener(...t);
                },
              },
              () => `from-worker-${r()}`,
              n,
              a,
            )
          );
        };
      },
    );
  })());
/* @endinclude */

/*--[ Custom JS Global (placed above </head>) ]--*/

/*--[ Desktop ]--*/

/*--[ SingleItem ]--*/

/*--[ Post ]--*/

/* ===========================================================
   onload.js — mobile menu, theme toggle, search toggle, TOC
   scrollspy, lazy-loading (lazysizes bundled in), back-to-top,
   smooth scroll, cookie consent, copy-code button, etc.
   =========================================================== */

/*--[ Global ]--*/

/* @include onload.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n) => {
      let {
          g: r,
          pEJ: i,
          fb: a,
          gId: o,
          qSel: s,
          gTg: c,
          gCl: l,
          qSell: u,
          gAb: d,
          sAb: f,
          rAb: p,
          hAb: m,
          aCl: ee,
          rCl: te,
          hCl: ne,
          cOU: re,
          cEl: h,
          aEL: g,
          rEL: ie,
          uHTML: _,
          wLP: ae,
          iAH: oe,
          dPr: se,
          iStr: v,
          iBol: ce,
          iNumV: y,
          iObjL: le,
          exp: ue,
          eHTML: b,
          df: de,
          lz: fe,
          cJs: pe,
          cCss: me,
          lJs: x,
          lb: S,
          pl: C,
          ps: w,
          bg: T,
          vw: E,
          cf: D,
          mc: he,
          tNtf: O,
          pg: ge,
        } = e,
        _e = t.Object,
        k = t.String,
        A = t.Number,
        j = t.Error,
        M = t.TypeError,
        N = t.JSON,
        P = t.Math,
        F = t.navigator;
      n.documentElement;
      let I = n.head,
        L = n.body,
        R = k.fromCharCode,
        z = _e.assign,
        ve = N.parse,
        B = N.stringify,
        V = (e, t) => e.charCodeAt(t),
        H = (e, t) => e.charAt(t),
        U = (e, t) => e.indexOf(t),
        ye = (e) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e),
        be = (e) =>
          e
            .toLowerCase()
            .replace(/([-_][a-z])/g, (e) => e.toUpperCase().replace(`-`, ``).replace(`_`, ``)),
        xe = (e, t = !0, n = !0) => {
          (p(e, `hidden`),
            t && te(e, `hidden`),
            n && m(e, `aria-hidden`) && f(e, `aria-hidden`, `false`));
        },
        W = i(o(`json:bloglabels`));
      if (W)
        for (let e in W) {
          let t = _(e);
          S[t] = W[e];
        }
      let Se = i(o(`json:blogposts`));
      Se && w.push(Se);
      let Ce = i(o(`json:blogpager`));
      Ce && z(ge, Ce);
      let we = i(o(`json:firebaseconfig`));
      we && z(a.cf, we);
      let Te = i(o(`json:contactconfig`));
      Te && z(D.con, Te);
      let Ee = i(o(`json:translateconfig`));
      Ee && z(D.gtr, Ee);
      let De = i(o(`json:statsconfig`));
      De && z(D.bst, De);
      let G = i(o(`json:accessblocker`));
      if (G) {
        let e = D.blk;
        (e.ip.push(...G.ip), e.ctry.push(...G.ctry), e.tzn.push(...G.tzn));
      }
      let Oe = o(`Header01`);
      if (Oe) {
        let e = d(Oe, `data-description`);
        e !== null && (T.des = e);
      }
      let K = i(o(`json:pwaconfig`));
      if (K) {
        let e = K.wbm;
        (e.description === `` &&
          (e.description = T.des === null ? `No description provided...` : T.des),
          e.name && (e.name = _(e.name)),
          e.short_name && (e.name = _(e.short_name)),
          z(C.pwa, K),
          (C.pwa.use = !s(`link[rel='manifest']`)));
      }
      let ke = `input is not correctly encoded`,
        Ae = (e) => {
          let t = e.replace(
              /\r\n/g,
              `
`,
            ),
            n = ``;
          for (let e = 0; e < t.length; e++) {
            let r = V(t, e);
            r < 128
              ? (n += R(r))
              : r > 127 && r < 2048
                ? ((n += R((r >> 6) | 192)), (n += R((r & 63) | 128)))
                : ((n += R((r >> 12) | 224)),
                  (n += R(((r >> 6) & 63) | 128)),
                  (n += R((r & 63) | 128)));
          }
          return n;
        },
        je = (e) => {
          let t = ``,
            n = 0,
            r = 0,
            i = r,
            a = r;
          for (; n < e.length;)
            ((r = V(e, n)),
              r < 128
                ? ((t += R(r)), n++)
                : r > 191 && r < 224
                  ? ((i = V(e, n + 1)), (t += R(((r & 31) << 6) | (i & 63))), (n += 2))
                  : ((i = V(e, n + 1)),
                    (a = V(e, n + 2)),
                    (t += R(((r & 15) << 12) | ((i & 63) << 6) | (a & 63))),
                    (n += 3)));
          return t;
        };
      class q {
        constructor(e) {
          this.k = v(e) ? e : q.DK;
        }
        e(e) {
          let t = this.k,
            n = Ae(e),
            r = ``,
            i = 0;
          for (; i < n.length;) {
            let e = V(n, i);
            i++;
            let a = V(n, i);
            i++;
            let o = V(n, i);
            i++;
            let s = e >> 2,
              c = ((e & 3) << 4) | (a >> 4),
              l = ((a & 15) << 2) | (o >> 6),
              u = o & 63;
            (A.isNaN(a) ? ((l = 64), (u = l)) : A.isNaN(o) && (u = 64),
              (r += H(t, s) + H(t, c) + H(t, l) + H(t, u)));
          }
          return r;
        }
        eD(e) {
          let t = B(e);
          return this.e(t);
        }
        dD(e) {
          let t = this.d(e);
          try {
            return ve(t);
          } catch (e) {
            throw (console.error(`JSON invalid:`, e), new j(ke));
          }
        }
        d(e) {
          let t = this.k,
            n = ``,
            r = 0,
            i = e.replace(/[^A-Za-z0-9+\\=]/g, ``);
          for (; r < e.length;) {
            let e = U(t, H(i, r));
            r++;
            let a = U(t, H(i, r));
            r++;
            let o = U(t, H(i, r));
            r++;
            let s = U(t, H(i, r));
            r++;
            let c = (e << 2) | (a >> 4),
              l = ((a & 15) << 4) | (o >> 2),
              u = ((o & 3) << 6) | s;
            ((n += R(c)), o !== 64 && (n += R(l)), s !== 64 && (n += R(u)));
          }
          if (((n = je(n)), this.e(n) !== e)) throw new j(ke);
          return n;
        }
      }
      ((q.DK = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`),
        (q.OD = new q()),
        (q.O1 = new q(`FINEUiBYDevSagARlwXVuCGzbdjMHQcnKypsZhoWLxfkOmrTPtJq2738506491+/=`)),
        (q.O2 = new q(`MBDRTNFJCAPOSQEIGWLHVYZUKXmbdrtnfjcaposqeigwlhvyzukx3508749216+/=`)),
        (q.O3 = new q(`MNBVCXZLKJHGFDSAPOIUYTREWQmnbvcxzlkjhgfdsapoiuytrewq0987654321+/=`)));
      let Me = {
          blk: null,
          push(e) {
            let n = `--[[adsense-pushed]]--`,
              r = [],
              i = (e) =>
                e[n] === !0 ||
                !e.matches(
                  `.adsbygoogle:not(.adsbygoogle-noablate):not([data-adsbygoogle-status]):not([data-ad-status]):not([adsbygoogle-noablate])`,
                ),
              a = (e) => {
                let t = e.nextElementSibling;
                if (t) {
                  let e = t.tagName.toLowerCase(),
                    n = t.textContent || t.innerText;
                  return e === `script` && n.includes(`adsbygoogle`) && n.includes(`push`);
                }
                return !1;
              },
              o = (e) => {
                try {
                  return (
                    (t.adsbygoogle = t.adsbygoogle || []).push({}),
                    (e[n] = !0),
                    r.push(e),
                    !0
                  );
                } catch (t) {
                  return (console.warn(`An error ocurred pushing ad:`, e, t), !1);
                }
              },
              s = (e) => {
                !i(e) && !a(e) && o(e);
              },
              c = e || l(`adsbygoogle`);
            for (let e = 0; e < c.length; e++) s(c[e]);
            return r;
          },
          async iBlk() {
            let e = this;
            if (ce(e.blk)) return e.blk;
            let t = `position: fixed; bottom: -99px; right: -99px; height: 18px; width: 18px; pointer-events: none;`,
              n = [
                [`div`, `div-gpt-ad-3061307416813-0`, null, t],
                [
                  `div`,
                  null,
                  `textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox ads`,
                  t,
                ],
                [`ins`, null, `adsbygoogle`, t],
              ].map(([e, t, n, r]) => {
                let i = h(e, { style: r });
                return (t && (i.id = t), n && (i.className = n), i);
              });
            return new Promise((t, r) => {
              for (let e = 0; e < n.length; e++) L.appendChild(n[e]);
              let i = (n) => {
                  ((e.blk = n), t(n));
                },
                a = (e) => e.offsetHeight;
              setTimeout(() => {
                a(n[0]) !== 18 || a(n[1]) !== 18 || a(n[2]) !== 18 || n[2].firstElementChild
                  ? i(!0)
                  : F.onLine
                    ? fetch(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`)
                        .then((e) => {
                          e.ok && e.headers.has(`Content-Length`) ? i(!1) : i(!0);
                        })
                        .catch((e) => {
                          F.onLine ? i(!0) : r(e);
                        })
                    : i(!1);
                for (let e = 0; e < n.length; e++) n[e].remove();
              }, 50);
            });
          },
        },
        J = {
          r: {
            t: `https://www.cloudflare.com/cdn-cgi/trace`,
            l: `https://raw.githubusercontent.com/Netrvin/cloudflare-colo-list/main/locations.json`,
            c: `https://raw.githubusercontent.com/Netrvin/cloudflare-colo-list/main/country.json`,
          },
          s: {},
          async countries() {
            return (
              this.s.c ||
                (this.s.c = await fetch(this.r.c).then((e) => {
                  if (!e.ok) throw new j(`Failed to fetch countries`);
                  return e.json();
                })),
              this.s.c
            );
          },
          async locations() {
            return (
              this.s.l ||
                (this.s.l = await fetch(this.r.l).then((e) => {
                  if (!e.ok) throw new j(`Failed to fetch locations`);
                  return e.json();
                })),
              this.s.l
            );
          },
          async location(e) {
            if (v(e) && e.trim().length) {
              let t = await this.locations();
              for (let n = 0; n < t.length; n += 1) {
                let r = t[n];
                if (r.iata === e) return r;
              }
            }
            return null;
          },
          async country(e) {
            if (v(e) && e.trim().length) {
              let t = await this.countries();
              if (v(t[e])) return t[e];
            }
            return null;
          },
          async info(e = !1) {
            let t = async (e) => {
              let t = { ts: `timestamp`, visit_scheme: `visitScheme`, uag: `userAgent` },
                n = [`h`],
                r = e
                  .trim()
                  .split(
                    `
`,
                  )
                  .reduce((e, r) => {
                    let [i, a] = r.split(`=`).map((e) => e.trim());
                    if (i && !n.includes(i)) {
                      let n = i === `ts` ? 1e3 * a : a,
                        r = t[i] || i;
                      e[r] = n;
                    }
                    return e;
                  }, {});
              return (
                (r.location = await this.location(r.colo)),
                (r.country = await this.country(r.loc)),
                r
              );
            };
            return (
              (e || !this.s.i) &&
                (this.s.i = await fetch(this.r.t).then(async (e) => {
                  if (!e.ok) throw new j(`Failed to fetch trace`);
                  return t(await e.text());
                })),
              this.s.i
            );
          },
        },
        Ne = async (e) => {
          if (!v(e)) throw new M(`input is not type of string`);
          if (`clipboard` in F) return (await F.clipboard.writeText(e), e);
          let t = L.appendChild(
            h(`textarea`, {
              style: `position: fixed; left: 100%; width: 0; height: 0; opacity: 0`,
              textContent: e,
            }),
          );
          (t.focus(), t.select());
          let r = !!n.execCommand(`copy`);
          if ((t.remove(), r)) return e;
          throw new j(`failed to copy text`);
        },
        Pe = [`kB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`],
        Fe = [`KiB`, `MiB`, `GiB`, `TiB`, `PiB`, `EiB`, `ZiB`, `YiB`],
        Ie = (e, t = !1, n = 1, r = !1) => {
          if (!y(e)) throw new M(`${e} is not a valid input.`);
          let i = e,
            a = t ? 1e3 : 1024;
          if (P.abs(i) < a) return [k(i), `B`];
          let o = t ? Pe : Fe,
            s = -1,
            c = 10 ** n;
          do ((i /= a), s++);
          while (P.round(P.abs(i) * c) / c >= a && s < o.length - 1);
          let l = i.toFixed(n);
          return (r || (l = k(A(l))), [l, o[s]]);
        },
        Le = [`K`, `M`, `B`, `T`, `Q`, `Qu`, `S`, `Se`, `O`, `N`, `D`],
        Re = (e, t = 1, n = !1) => {
          if (!y(e)) throw new M(`${e} is not a valid input`);
          let r = e,
            i = 1e3;
          if (P.abs(r) < i) return [k(r), ``];
          let a = Le,
            o = -1,
            s = 10 ** t;
          do ((r /= i), o++);
          while (P.round(P.abs(r) * s) / s >= i && o < a.length - 1);
          let c = r.toFixed(t);
          return (n || (c = k(A(c))), [c, a[o]]);
        },
        Y = a.v || `10.13.2`,
        X = [
          `analytics`,
          `app`,
          `app-check`,
          `auth`,
          `database`,
          `firestore`,
          `functions`,
          `installations`,
          `messaging`,
          `performance`,
          `remote-config`,
          `storage`,
        ],
        Z = [`SDK_VERSION`, `apps`, `initializeApp`, `onLog`, `registerVersion`, `setLogLevel`];
      for (let e = 0; e < X.length; e++) Z.push(be(X[e]));
      for (let e = 0; e < Z.length; e++) {
        let t = Z[e];
        se(a, t, { get: () => (r.firebase || {})[t] });
      }
      let ze = (e) =>
          x(`https://www.gstatic.com/firebasejs/${Y}/firebase-${e}-compat.js`, {
            crossOrigin: `anonymous`,
            referrerPolicy: `no-referrer`,
          }),
        Be = ae(async (...e) => {
          if (!v(a.SDK_VERSION)) await ze(`app`);
          else if (a.SDK_VERSION !== Y)
            throw new j(
              `a different version of firebase SDK (${a.SDK_VERSION}) is already loaded, required version: ${Y}`,
            );
          if (e.length) {
            for (let t = 0; t < e.length; t++)
              if (!X.includes(e[t])) throw new M(`${B(e[t])} is not a valid firebase service`);
            let t = Promise.resolve();
            for (let n = 0; n < e.length; n++) {
              let r = e[n];
              a[r] || (t = t.then(() => ze(r)));
            }
            await t;
          }
          return a;
        }),
        Ve = ae(
          async () => (
            r.BloggerFeed ||
              (await x(
                `https://cdn.jsdelivr.net/npm/@deox/blogger-feed@0.0.9/dist/blogger-feed.min.js`,
                { crossOrigin: `anonymous`, referrerPolicy: `no-referrer` },
              )),
            r.BloggerFeed
          ),
        ),
        He = async ({ email: e, name: t, message: n }, r) => {
          await de;
          let i = D.con;
          if (!ye(e)) throw new M(`Not a valid email address.`);
          if (!n || !n.trim()) throw new M(`Message cannot be undefined or blank.`);
          let a = { email: e, message: n, blogID: T.bgId, token: i.tk };
          (r &&
            z(a, {
              blogId: T.bgId,
              blogUrl: T.cnHmU,
              blogTitle: T.ttl,
              blogLocale: T.lc,
              pageUrl: T.cnU,
              pageTitle: T.pgNm,
              submitUrl: i.au,
            }),
            t && (a.name = t));
          let o = await fetch(r || i.au, { method: `POST`, body: new URLSearchParams(a) });
          if (o.ok) {
            let e = await o.json();
            if (
              e &&
              e.type !== `error` &&
              (`details` in e
                ? e.details && e.details.emailSentStatus === `true`
                : `data` in e
                  ? e.data && e.data.sentStatus === !0
                  : !(`submitted` in e) || e.submitted === !0)
            )
              return a;
          }
          throw new j(`Failed to submit (status: ${o.status})`);
        },
        Q = (e, t) => {
          let n = ``;
          if (!e.matches(t))
            for (let r = 0; r < e.childNodes.length; r += 1) {
              let i = e.childNodes[r],
                a = i.nodeType === Node.ELEMENT_NODE,
                o = i.nodeType === Node.COMMENT_NODE;
              a && !i.matches(t) ? (n += Q(i, t)) : o || (n += i.nodeValue);
            }
          return n.trim();
        },
        Ue = (e, t, n, r) => (r === !0 ? e.length / t : e.split(` `).length / n),
        We = (
          e,
          {
            ignoreSelector: t = `script, style`,
            isHTML: n = !0,
            charactersPerMin: r = 900,
            wordsPerMin: i = 200,
            useCharacters: a = !0,
          } = {},
        ) => {
          let o;
          if (y(e)) o = e / r;
          else if (v(e)) {
            let s;
            if (n) {
              let n = h(`div`);
              ((n.innerHTML = e), (s = Q(n, t)));
            } else s = e;
            o = Ue(s, r, i, a);
          } else if (e) o = Ue(Q(e, t), r, i, a);
          else throw new M(`argument 1 is not an element, string or number.`);
          return o;
        },
        $ = o(`footer_year`);
      $ && ($.innerHTML = new Date().getFullYear());
      let Ge = 0;
      g(t, `scroll`, () => {
        let e = t.pageYOffset || t.scrollY || n.documentElement.scrollTop;
        (e > Ge ? ee(L, `onSb`) : te(L, `onSb`), (Ge = e <= 0 ? 0 : e));
      });
      let Ke = (e, t) => {
          let n = d(e, t);
          if (
            n &&
            !n.includes(`-rw`) &&
            !n.includes(`/blogger_img_proxy/`) &&
            (n.includes(`blogspot.com`) || n.includes(`googleusercontent.com`)) &&
            (n.includes(`-pd`) || n.includes(`-p-k-no-nu`))
          ) {
            let r = n
              .replace(`-p-k-no-nu`, `-p-k-no-nu-rw-e90`)
              .replace(`-pd`, `-p-k-no-nu-rw-e90`);
            r !== n && f(e, t, r);
          }
        },
        qe = u(`img.sldI, img.imgThm, .sImg img, .abtL img, img.ldC`);
      for (let e = 0; e < qe.length; e++) {
        let t = qe[e];
        ne(t, `lazyloaded`) || (Ke(t, `data-src`), Ke(t, `data-bg`));
      }
      let Je = (e) => {
          let t = c(`iframe`);
          if (t.length && e.source)
            for (let n = 0; n < t.length; n++)
              try {
                let r = t[n],
                  i = r.contentWindow || r.contentDocument.defaultView;
                if (e.source === i) return r;
              } catch (e) {}
          return null;
        },
        Ye = (e, t) => {
          e && typeof t == `number` && (f(e, `scrolling`, `no`), f(e, `height`, k(t)));
        };
      if (
        (g(t, `message`, (e) => {
          let t = e.data;
          if (v(t)) {
            let n = t.match(/^set-comment-editor-height (\d+)px$/i);
            n && n[1] && Ye(Je(e), A(n[1]));
          } else
            le(t) &&
              t.sentinel === `amp` &&
              t.type === `embed-size` &&
              y(t.height) &&
              Ye(Je(e), t.height);
        }),
        !E.iBt)
      ) {
        (g(t, `offline`, () => O(he.youAreOffline)), g(t, `online`, () => O(he.youAreOnline)));
        let e = C.pwa;
        if (location.protocol === `https:` && e.use && e.wbm) {
          let t = B(e.wbm),
            n = h(`link`, {
              rel: `manifest`,
              href: re(new Blob([t], { type: `application/json` })),
            }),
            r = c(`link`, I)[0];
          r ? r.parentNode.insertBefore(n, r) : I.appendChild(n);
        }
      }
      let Xe = () => {
        let e = o(`template_widgets_js`);
        e && e.remove();
        let t = C.mt,
          n = (e, t, n) => ({ "@type": `ImageObject`, url: e, width: t, height: n }),
          r = (e, t, n) => ({ "@type": `Person`, name: b(e), url: t, image: n }),
          i = (e) => {
            let t = e.aut.im && e.aut.im.includes(`/img/blogger_logo_round_35`) ? 35 : 512,
              a = e.aut.im ? n(e.aut.im, t, t) : null,
              o = {
                "@type": `Comment`,
                text: b(e.con),
                datePublished: e.pub,
                author: r(e.aut.nm, e.aut.url || T.cnHmU, a),
              },
              s = e.rep;
            if (s && s.length) {
              let e = [];
              for (let t = 0; t < s.length; t++) {
                let n = s[t];
                n.iDel || e.push(i(n));
              }
              o.comment = e;
            }
            return o;
          },
          a = (e) => {
            let a = {
              "@context": `http://schema.org`,
              "@type":
                e.id === E.pgId
                  ? `Article`
                  : e.lab.includes(`Blog`)
                    ? `BlogPosting`
                    : e.lab.includes(`Article`)
                      ? `Article`
                      : e.lab.includes(`News`)
                        ? `News`
                        : t.dpt,
              mainEntityOfPage: { "@type": `WebPage`, "@id": e.url },
              headline: e.ttl,
              description: e.sum,
              datePublished: e.pub,
              dateModified: e.upd,
              image: n(e.thm || t.defTh, 1280, 712),
              publisher: { "@type": `Organization`, name: T.ttl, logo: n(t.orgLg, 512, 512) },
              author: r(e.aut.nm, e.aut.url || T.cnHmU, e.aut.im ? n(e.aut.im, 512, 512) : null),
            };
            if (w.c === e) {
              e.text && (a.articleBody = b(e.text));
              let t = e.com.ent;
              if (t && t.length) {
                let e = [];
                for (let n = 0; n < t.length; n++) {
                  let r = t[n];
                  r.iDel || e.push(i(r));
                }
                a.comment = e;
              }
            }
            return a;
          };
        if (t.uJs === !0)
          for (let e in w) {
            let n = w[e];
            (w.c === n || t.arTyp === 1 || (t.arTyp === 3 && !E.iSi)) &&
              pe(B(a(n)), { type: `application/ld+json` });
          }
        let c = s(`.ldW .ldP`);
        c && f(c, `data-num-posts`, S[d(c, `data-label`)] || ``);
        let u = (e, t, n) => {
          let r = D.blk,
            i = r.tzn,
            a = r.ctry,
            o = r.ip,
            s = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase(),
            c = (e) => e.trim().length !== 0,
            l = !1;
          if (i.length) {
            let t = Intl.DateTimeFormat().resolvedOptions().timeZone;
            for (let n = 0; n < i.length; n++)
              if (c(i[n]) && s(i[n], t)) {
                (e(`timezone`, i[n]), (l = !0));
                break;
              }
          }
          !l &&
            (a.length || o.length) &&
            (n ? fe.then(() => J.info()) : J.info())
              .then((t) => {
                if (t.ip) {
                  for (let n = 0; n < o.length; n++)
                    if (c(o[n]) && s(o[n], t.ip)) {
                      (e(`ip`, o[n]), (l = !0));
                      break;
                    }
                }
                if (!l && (t.country || t.loc)) {
                  for (let n = 0; n < a.length; n++)
                    if ((t.country && s(a[n], t.country)) || (t.loc && s(a[n], t.loc))) {
                      (e(`country`, a[n]), (l = !0));
                      break;
                    }
                }
              })
              .catch((e) => {
                (console.warn(`Error while getting geolocation info:`, e), t && t(e));
              });
        };
        if (!E.iBt && !E.iPv) {
          let e = s(`.js-accessblocker`),
            t = () => {
              me(`body .adsbygoogle{display:none!important}`);
            };
          e &&
            u(
              (n, r) => {
                (console.warn(`Blocking access due to matching ${n} with value "${r}"`),
                  E.iAd
                    ? O(
                        `Access is blocked! It seems you are an admin, so the popup wasn't displayed.`,
                      )
                    : (t(), xe(e)));
              },
              null,
              !0,
            );
          let n = s(`.js-antiadblocker`);
          n &&
            fe
              .then(() => Me.iBlk())
              .then((e) => {
                e &&
                  (E.iAd
                    ? O(
                        `AdBlock is enabled! It seems you are an admin, so the popup wasn't displayed.`,
                      )
                    : (t(), xe(n)));
              });
        }
        let p = D.con,
          m = l(`blogger-contact-form`);
        if (m.length)
          for (let e = 0; e < m.length; e++) {
            let t = m[e];
            if (t.tagName === `FORM`) {
              let e = t.elements,
                n = e.name,
                r = e.email,
                i = e.message;
              if (r && i) {
                let e = !1;
                g(t, `submit`, (a) => {
                  if ((a.preventDefault(), !e))
                    if (!ye(r.value.trim()))
                      (O(d(t, `data-mes-invalid-email`) || p.tx.invalidEmail), r.focus());
                    else if (!i.value.trim())
                      (O(d(t, `data-mes-empty-message`) || p.tx.emptyMessage), i.focus());
                    else {
                      let a = { email: r.value.trim(), message: i.value };
                      (n.value.trim() && (a.name = n.value),
                        (e = !0),
                        O(d(t, `data-mes-sending`) || p.tx.sending),
                        He(a, d(t, `data-action`) || d(t, `action`))
                          .then(() => {
                            (O(d(t, `data-mes-sent`) || p.tx.sent), t.reset(), (e = !1));
                          })
                          .catch((n) => {
                            (console.warn(`Contact from submission error:`, n),
                              O(d(t, `data-mes-not-sent`) || p.tx.notSent),
                              (e = !1));
                          }));
                    }
                });
              }
            }
          }
      };
      (de.then(() => setTimeout(Xe, 20)),
        ue({
          B64: q,
          cpT: Ne,
          prtB: Ie,
          abvN: Re,
          ads: Me,
          ip: J,
          iFb: Be,
          iBF: Ve,
          sFrm: He,
          rdTm: We,
        }));
    })(PU, window, document);
  })());
/* @endinclude */

/* initialize lazysizes explicitly */
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;
document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (PU.vw.iBt || PU.vw.iAi) {
      const lazyloadImages = document.querySelectorAll("img.lazyload[data-src],.lazyload[data-bg]");
      for (let i = 0; i < lazyloadImages.length; i++) {
        lazyloadImages[i].classList.add("lazypreload");
      }
    }
    lazySizes.init();
  },
  { once: true },
);

/*! github.com/aFarkas/lazysizes (v5.3.2 - lazysizes.min.js) | Author: Alexander Farkas | License: MIT | Copyright (c) 2015 Alexander Farkas */
!(function (e) {
  var t = (function (u, D, f) {
    "use strict";
    var k, H;
    if (
      ((function () {
        var e;
        var t = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          fastLoadedClass: "ls-is-cached",
          iframeLoadMode: 0,
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: true,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: true,
          ricTimeout: 0,
          throttleDelay: 125,
        };
        H = u.lazySizesConfig || u.lazysizesConfig || {};
        for (e in t) {
          if (!(e in H)) {
            H[e] = t[e];
          }
        }
      })(),
      !D || !D.getElementsByClassName)
    ) {
      return { init: function () {}, cfg: H, noSupport: true };
    }
    var O = D.documentElement,
      i = u.HTMLPictureElement,
      P = "addEventListener",
      $ = "getAttribute",
      q = u[P].bind(u),
      I = u.setTimeout,
      U = u.requestAnimationFrame || I,
      o = u.requestIdleCallback,
      j = /^picture$/i,
      r = ["load", "error", "lazyincluded", "_lazyloaded"],
      a = {},
      G = Array.prototype.forEach,
      J = function (e, t) {
        if (!a[t]) {
          a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)");
        }
        return a[t].test(e[$]("class") || "") && a[t];
      },
      K = function (e, t) {
        if (!J(e, t)) {
          e.setAttribute("class", (e[$]("class") || "").trim() + " " + t);
        }
      },
      Q = function (e, t) {
        var a;
        if ((a = J(e, t))) {
          e.setAttribute("class", (e[$]("class") || "").replace(a, " "));
        }
      },
      V = function (t, a, e) {
        var i = e ? P : "removeEventListener";
        if (e) {
          V(t, a);
        }
        r.forEach(function (e) {
          t[i](e, a);
        });
      },
      X = function (e, t, a, i, r) {
        var n = D.createEvent("Event");
        if (!a) {
          a = {};
        }
        a.instance = k;
        n.initEvent(t, !i, !r);
        n.detail = a;
        e.dispatchEvent(n);
        return n;
      },
      Y = function (e, t) {
        var a;
        if (!i && (a = u.picturefill || H.pf)) {
          if (t && t.src && !e[$]("srcset")) {
            e.setAttribute("srcset", t.src);
          }
          a({ reevaluate: true, elements: [e] });
        } else if (t && t.src) {
          e.src = t.src;
        }
      },
      Z = function (e, t) {
        return (getComputedStyle(e, null) || {})[t];
      },
      s = function (e, t, a) {
        a = a || e.offsetWidth;
        while (a < H.minSize && t && !e._lazysizesWidth) {
          a = t.offsetWidth;
          t = t.parentNode;
        }
        return a;
      },
      ee = (function () {
        var a, i;
        var t = [];
        var r = [];
        var n = t;
        var s = function () {
          var e = n;
          n = t.length ? r : t;
          a = true;
          i = false;
          while (e.length) {
            e.shift()();
          }
          a = false;
        };
        var e = function (e, t) {
          if (a && !t) {
            e.apply(this, arguments);
          } else {
            n.push(e);
            if (!i) {
              i = true;
              (D.hidden ? I : U)(s);
            }
          }
        };
        e._lsFlush = s;
        return e;
      })(),
      te = function (a, e) {
        return e
          ? function () {
              ee(a);
            }
          : function () {
              var e = this;
              var t = arguments;
              ee(function () {
                a.apply(e, t);
              });
            };
      },
      ae = function (e) {
        var a;
        var i = 0;
        var r = H.throttleDelay;
        var n = H.ricTimeout;
        var t = function () {
          a = false;
          i = f.now();
          e();
        };
        var s =
          o && n > 49
            ? function () {
                o(t, { timeout: n });
                if (n !== H.ricTimeout) {
                  n = H.ricTimeout;
                }
              }
            : te(function () {
                I(t);
              }, true);
        return function (e) {
          var t;
          if ((e = e === true)) {
            n = 33;
          }
          if (a) {
            return;
          }
          a = true;
          t = r - (f.now() - i);
          if (t < 0) {
            t = 0;
          }
          if (e || t < 9) {
            s();
          } else {
            I(s, t);
          }
        };
      },
      ie = function (e) {
        var t, a;
        var i = 99;
        var r = function () {
          t = null;
          e();
        };
        var n = function () {
          var e = f.now() - a;
          if (e < i) {
            I(n, i - e);
          } else {
            (o || r)(r);
          }
        };
        return function () {
          a = f.now();
          if (!t) {
            t = I(n, i);
          }
        };
      },
      e = (function () {
        var v, m, c, h, e;
        var y, z, g, p, C, b, A;
        var n = /^img$/i;
        var d = /^iframe$/i;
        var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
        var _ = 0;
        var w = 0;
        var M = 0;
        var N = -1;
        var L = function (e) {
          M--;
          if (!e || M < 0 || !e.target) {
            M = 0;
          }
        };
        var x = function (e) {
          if (A == null) {
            A = Z(D.body, "visibility") == "hidden";
          }
          return (
            A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
          );
        };
        var W = function (e, t) {
          var a;
          var i = e;
          var r = x(e);
          g -= t;
          b += t;
          p -= t;
          C += t;
          while (r && (i = i.offsetParent) && i != D.body && i != O) {
            r = (Z(i, "opacity") || 1) > 0;
            if (r && Z(i, "overflow") != "visible") {
              a = i.getBoundingClientRect();
              r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1;
            }
          }
          return r;
        };
        var t = function () {
          var e, t, a, i, r, n, s, o, l, u, f, c;
          var d = k.elements;
          if ((h = H.loadMode) && M < 8 && (e = d.length)) {
            t = 0;
            N++;
            for (; t < e; t++) {
              if (!d[t] || d[t]._lazyRace) {
                continue;
              }
              if (!E || (k.prematureUnveil && k.prematureUnveil(d[t]))) {
                R(d[t]);
                continue;
              }
              if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                n = w;
              }
              if (!u) {
                u =
                  !H.expand || H.expand < 1
                    ? O.clientHeight > 500 && O.clientWidth > 500
                      ? 500
                      : 370
                    : H.expand;
                k._defEx = u;
                f = u * H.expFactor;
                c = H.hFac;
                A = null;
                if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                  w = f;
                  N = 0;
                } else if (h > 1 && N > 1 && M < 6) {
                  w = u;
                } else {
                  w = _;
                }
              }
              if (l !== n) {
                y = innerWidth + n * c;
                z = innerHeight + n;
                s = n * -1;
                l = n;
              }
              a = d[t].getBoundingClientRect();
              if (
                (b = a.bottom) >= s &&
                (g = a.top) <= z &&
                (C = a.right) >= s * c &&
                (p = a.left) <= y &&
                (b || C || p || g) &&
                (H.loadHidden || x(d[t])) &&
                ((m && M < 3 && !o && (h < 3 || N < 4)) || W(d[t], n))
              ) {
                R(d[t]);
                r = true;
                if (M > 9) {
                  break;
                }
              } else if (
                !r &&
                m &&
                !i &&
                M < 4 &&
                N < 4 &&
                h > 2 &&
                (v[0] || H.preloadAfterLoad) &&
                (v[0] || (!o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto")))
              ) {
                i = v[0] || d[t];
              }
            }
            if (i && !r) {
              R(i);
            }
          }
        };
        var a = ae(t);
        var S = function (e) {
          var t = e.target;
          if (t._lazyCache) {
            delete t._lazyCache;
            return;
          }
          L(e);
          K(t, H.loadedClass);
          Q(t, H.loadingClass);
          V(t, B);
          X(t, "lazyloaded");
        };
        var i = te(S);
        var B = function (e) {
          i({ target: e.target });
        };
        var T = function (e, t) {
          var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
          if (a == 0) {
            e.contentWindow.location.replace(t);
          } else if (a == 1) {
            e.src = t;
          }
        };
        var F = function (e) {
          var t;
          var a = e[$](H.srcsetAttr);
          if ((t = H.customMedia[e[$]("data-media") || e[$]("media")])) {
            e.setAttribute("media", t);
          }
          if (a) {
            e.setAttribute("srcset", a);
          }
        };
        var s = te(function (t, e, a, i, r) {
          var n, s, o, l, u, f;
          if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
            if (i) {
              if (a) {
                K(t, H.autosizesClass);
              } else {
                t.setAttribute("sizes", i);
              }
            }
            s = t[$](H.srcsetAttr);
            n = t[$](H.srcAttr);
            if (r) {
              o = t.parentNode;
              l = o && j.test(o.nodeName || "");
            }
            f = e.firesLoad || ("src" in t && (s || n || l));
            u = { target: t };
            K(t, H.loadingClass);
            if (f) {
              clearTimeout(c);
              c = I(L, 2500);
              V(t, B, true);
            }
            if (l) {
              G.call(o.getElementsByTagName("source"), F);
            }
            if (s) {
              t.setAttribute("srcset", s);
            } else if (n && !l) {
              if (d.test(t.nodeName)) {
                T(t, n);
              } else {
                t.src = n;
              }
            }
            if (r && (s || l)) {
              Y(t, { src: n });
            }
          }
          if (t._lazyRace) {
            delete t._lazyRace;
          }
          Q(t, H.lazyClass);
          ee(function () {
            var e = t.complete && t.naturalWidth > 1;
            if (!f || e) {
              if (e) {
                K(t, H.fastLoadedClass);
              }
              S(u);
              t._lazyCache = true;
              I(function () {
                if ("_lazyCache" in t) {
                  delete t._lazyCache;
                }
              }, 9);
            }
            if (t.loading == "lazy") {
              M--;
            }
          }, true);
        });
        var R = function (e) {
          if (e._lazyRace) {
            return;
          }
          var t;
          var a = n.test(e.nodeName);
          var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
          var r = i == "auto";
          if (
            (r || !m) &&
            a &&
            (e[$]("src") || e.srcset) &&
            !e.complete &&
            !J(e, H.errorClass) &&
            J(e, H.lazyClass)
          ) {
            return;
          }
          t = X(e, "lazyunveilread").detail;
          if (r) {
            re.updateElem(e, true, e.offsetWidth);
          }
          e._lazyRace = true;
          M++;
          s(e, t, r, i, a);
        };
        var r = ie(function () {
          H.loadMode = 3;
          a();
        });
        var o = function () {
          if (H.loadMode == 3) {
            H.loadMode = 2;
          }
          r();
        };
        var l = function () {
          if (m) {
            return;
          }
          if (f.now() - e < 999) {
            I(l, 999);
            return;
          }
          m = true;
          H.loadMode = 3;
          a();
          q("scroll", o, true);
        };
        return {
          _: function () {
            e = f.now();
            k.elements = D.getElementsByClassName(H.lazyClass);
            v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
            q("scroll", a, true);
            q("resize", a, true);
            q("pageshow", function (e) {
              if (e.persisted) {
                var t = D.querySelectorAll("." + H.loadingClass);
                if (t.length && t.forEach) {
                  U(function () {
                    t.forEach(function (e) {
                      if (e.complete) {
                        R(e);
                      }
                    });
                  });
                }
              }
            });
            if (u.MutationObserver) {
              new MutationObserver(a).observe(O, {
                childList: true,
                subtree: true,
                attributes: true,
              });
            } else {
              O[P]("DOMNodeInserted", a, true);
              O[P]("DOMAttrModified", a, true);
              setInterval(a, 999);
            }
            q("hashchange", a, true);
            ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(
              function (e) {
                D[P](e, a, true);
              },
            );
            if (/d$|^c/.test(D.readyState)) {
              l();
            } else {
              q("load", l);
              D[P]("DOMContentLoaded", a);
              I(l, 2e4);
            }
            if (k.elements.length) {
              t();
              ee._lsFlush();
            } else {
              a();
            }
          },
          checkElems: a,
          unveil: R,
          _aLSL: o,
        };
      })(),
      re = (function () {
        var a;
        var n = te(function (e, t, a, i) {
          var r, n, s;
          e._lazysizesWidth = i;
          i += "px";
          e.setAttribute("sizes", i);
          if (j.test(t.nodeName || "")) {
            r = t.getElementsByTagName("source");
            for (n = 0, s = r.length; n < s; n++) {
              r[n].setAttribute("sizes", i);
            }
          }
          if (!a.detail.dataAttr) {
            Y(e, a.detail);
          }
        });
        var i = function (e, t, a) {
          var i;
          var r = e.parentNode;
          if (r) {
            a = s(e, r, a);
            i = X(e, "lazybeforesizes", { width: a, dataAttr: !!t });
            if (!i.defaultPrevented) {
              a = i.detail.width;
              if (a && a !== e._lazysizesWidth) {
                n(e, r, i, a);
              }
            }
          }
        };
        var e = function () {
          var e;
          var t = a.length;
          if (t) {
            e = 0;
            for (; e < t; e++) {
              i(a[e]);
            }
          }
        };
        var t = ie(e);
        return {
          _: function () {
            a = D.getElementsByClassName(H.autosizesClass);
            q("resize", t);
          },
          checkElems: t,
          updateElem: i,
        };
      })(),
      t = function () {
        if (!t.i && D.getElementsByClassName) {
          t.i = true;
          re._();
          e._();
        }
      };
    return (
      I(function () {
        H.init && t();
      }),
      (k = {
        cfg: H,
        autoSizer: re,
        loader: e,
        init: t,
        uP: Y,
        aC: K,
        rC: Q,
        hC: J,
        fire: X,
        gW: s,
        rAF: ee,
      })
    );
  })(e, e.document, Date);
  ((e.lazySizes = t), "object" == typeof module && module.exports && (module.exports = t));
})("undefined" != typeof window ? window : {});

/*! github.com/aFarkas/lazysizes (v5.3.2 - plugins/unveilhooks/ls.unveilhooks.min.js) | Author: Alexander Farkas | License: MIT | Copyright (c) 2015 Alexander Farkas */
!(function (e, t) {
  var a = function () {
    (t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0));
  };
  ((t = t.bind(null, e, e.document)),
    "object" == typeof module && module.exports
      ? t(require("lazysizes"))
      : "function" == typeof define && define.amd
        ? define(["lazysizes"], t)
        : e.lazySizes
          ? a()
          : e.addEventListener("lazyunveilread", a, !0));
})(window, function (e, i, o) {
  "use strict";
  var l,
    d,
    u = {};
  function s(e, t, a) {
    var n, r;
    u[e] ||
      ((n = i.createElement(t ? "link" : "script")),
      (r = i.getElementsByTagName("script")[0]),
      t
        ? ((n.rel = "stylesheet"), (n.href = e))
        : ((n.onload = function () {
            ((n.onerror = null), (n.onload = null), a());
          }),
          (n.onerror = n.onload),
          (n.src = e)),
      (u[e] = !0),
      (u[n.src || n.href] = !0),
      r.parentNode.insertBefore(n, r));
  }
  i.addEventListener &&
    ((l = function (e, t) {
      var a = i.createElement("img");
      ((a.onload = function () {
        ((a.onload = null), (a.onerror = null), (a = null), t());
      }),
        (a.onerror = a.onload),
        (a.src = e),
        a && a.complete && a.onload && a.onload());
    }),
    addEventListener(
      "lazybeforeunveil",
      function (e) {
        var t, a, n;
        if (e.detail.instance == o && !e.defaultPrevented) {
          var r = e.target;
          if (
            ("none" == r.preload && (r.preload = r.getAttribute("data-preload") || "auto"),
            null != r.getAttribute("data-autoplay"))
          )
            if (r.getAttribute("data-expand") && !r.autoplay)
              try {
                r.play();
              } catch (e) {}
            else
              requestAnimationFrame(function () {
                (r.setAttribute("data-expand", "-10"), o.aC(r, o.cfg.lazyClass));
              });
          ((t = r.getAttribute("data-link")) && s(t, !0),
            (t = r.getAttribute("data-script")) &&
              ((e.detail.firesLoad = !0),
              s(t, null, function () {
                ((e.detail.firesLoad = !1), o.fire(r, "_lazyloaded", {}, !0, !0));
              })),
            (t = r.getAttribute("data-require")) && (o.cfg.requireJs ? o.cfg.requireJs([t]) : s(t)),
            (a = r.getAttribute("data-bg")) &&
              ((e.detail.firesLoad = !0),
              l(a, function () {
                ((r.style.backgroundImage = "url(" + (d.test(a) ? JSON.stringify(a) : a) + ")"),
                  (e.detail.firesLoad = !1),
                  o.fire(r, "_lazyloaded", {}, !0, !0));
              })),
            (n = r.getAttribute("data-poster")) &&
              ((e.detail.firesLoad = !0),
              l(n, function () {
                ((r.poster = n), (e.detail.firesLoad = !1), o.fire(r, "_lazyloaded", {}, !0, !0));
              })));
        }
      },
      !(d = /\(|\)|\s|'/),
    ));
});

/*--[ Custom JS Global (placed above </body>) ]--*/

/*--[ Desktop ]--*/

/*--[ SingleItem ]--*/

/* @include single-item.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n) => {
      let {
          gId: r,
          qSel: i,
          qSell: a,
          gCl: o,
          cEl: s,
          aCl: c,
          rCl: l,
          hCl: u,
          gAb: d,
          hAb: f,
          sAb: p,
          rAb: m,
          aEL: h,
          rEL: g,
          iAE: _,
          iAH: v,
          cpT: y,
          eHTML: b,
          ms: x,
          mc: S,
          pl: C,
          vw: w,
          ps: T,
          df: E,
          lz: D,
        } = e,
        O = t.Object,
        k = t.location,
        A = `data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`,
        j = O.assign,
        M = (e, t = !0, n = !0) => {
          (p(e, `hidden`, ``),
            t && c(e, `hidden`),
            n && f(e, `aria-hidden`) && p(e, `aria-hidden`, `true`));
        },
        N = (e, t = !0, n = !0) => {
          (m(e, `hidden`),
            t && l(e, `hidden`),
            n && f(e, `aria-hidden`) && p(e, `aria-hidden`, `false`));
        },
        P = (e) => /^https?:\/\/(.+)$/.test(e),
        F = (e, t) => {
          let n = [];
          if (e.length)
            for (let r = 0; r < e.length; r++) {
              let a = e[r],
                [o, s, c, l, u, f, p, m, h] = [
                  `data-id`,
                  `data-timestamp`,
                  `data-unix-time`,
                  `data-author-name`,
                  `data-author-image`,
                  `data-author-url`,
                  `data-is-author`,
                  `data-is-anonymous`,
                  `data-is-deleted`,
                ].map((e) => d(a, e));
              if (o && s && c && l !== null) {
                let e = new Date(Number(c)),
                  r = i(`[data-comment-body-id="${o}"]`, a);
                if (r) {
                  let c = {
                      id: o,
                      html: r.innerHTML,
                      text: r.innerText,
                      con: r.textContent || r.innerText,
                      ts: s,
                      pub: e,
                      iAut: p === `true`,
                      iAno: m === `true`,
                      iDel: h === `true`,
                      aut: { nm: l, url: f, im: u },
                    },
                    d = i(`ol`, a);
                  (d && (c.rep = d ? F(d.children, { repTo: o }) : []),
                    t && O.assign(c, t),
                    n.push(c));
                }
              }
            }
          return n;
        },
        I = () => {
          let e = r(`cmHolder`);
          return e ? F(e.children) : [];
        },
        L = (e) => {
          let t = d(e, `data-embed`);
          if (t) {
            e.innerHTML = `<div class='play' title='Play'><svg viewbox='0 0 213.7 213.7'><polygon class='a' points='73.5,62.5 148.5,105.8 73.5,149.1'/><circle class='b' cx='106.8' cy='106.8' r='103.3'/></svg></div>`;
            let [n, r] = [`default`, `maxresdefault`].map(
                (e) => `https://img.youtube.com/vi/${t}/${e}.jpg`,
              ),
              i = s(`img`, {
                class: `lazyload`,
                attributes: {
                  src: D._lazied ? n : A,
                  alt: `YouTube video thumbnail`,
                  "data-src": r,
                },
              });
            e.appendChild(i);
            let a = () => {
              g(e, `click`, a);
              let n = s(`iframe`, {
                  class: `loading`,
                  src: `https://www.youtube.com/embed/${t}?rel=0&showinfo=0&autoplay=1`,
                  title: `YouTube video player`,
                  allow: `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`,
                  referrerPolicy: `strict-origin-when-cross-origin`,
                  allowFullscreen: !0,
                  attributes: { frameborder: 0 },
                }),
                r = () => {
                  (g(n, `load`, r), l(n, `loading`), c(n, `loaded`));
                },
                i = () => {
                  (g(n, `error`, i), l(n, `loading`), c(n, `error`));
                };
              (h(n, `load`, r), h(n, `error`, r), (e.innerHTML = ``), e.appendChild(n));
            };
            h(e, `click`, a);
          }
        };
      r(`postBody`) &&
        T.c &&
        (j(T.c, { con: postBody.textContent, html: postBody.innerHTML, text: postBody.innerText }),
        j(T.c.com, { ent: I() }));
      let R = () => {
        let e = a(`.cmCo a`);
        if (e.length)
          for (let t = 0; t < e.length; t += 1) {
            let n = e[t];
            n.host !== k.host && ((n.rel = `nofollow noreferrer noopener`), (n.target = `_blank`));
          }
        if (!w.iBt) {
          let e = `comment-editor`,
            n = `data-thread-src`,
            u = `data-thread-sandbox`,
            x = C.cm,
            w = r(`iCmn`),
            T = r(`forComments`),
            E = r(`addCm`),
            O = r(`commentForm`),
            j = () => /^#comment$/.test(k.hash),
            F = () => /[?&](showComment|sc)=(\d+)/i.test(k.search) || /^#c(\d{6,})$/.test(k.hash),
            I = !1,
            R = () => {
              if (!I && w && !r(e)) {
                let t = d(w, n),
                  r = d(w, u);
                if (t) {
                  let i = s(`iframe`, {
                    id: e,
                    class: `lazyload`,
                    attributes: {
                      name: `comment-editor`,
                      title: `Blogger comment`,
                      frameborder: `0`,
                      allowtransparency: ``,
                      height: `96`,
                      "data-src": t,
                      [n]: t,
                    },
                  });
                  (r !== null && (p(i, `sandbox`, r), p(i, u, r)),
                    _(w, `beforebegin`, i),
                    w.remove(),
                    (I = !0));
                }
              }
            },
            z = () => {
              (w && g(w, `click`, z), T && g(T, `click`, z), R());
            };
          if (T) {
            (h(T, `click`, z), w && h(w, `click`, z));
            let e = () => {
              (j() || F()) && (z(), (T.checked = !0));
            };
            (h(t, `hashchange`, e), e());
            let n = a(`a[href='#comment']`);
            if (n.length) for (let t = 0; t < n.length; t++) h(n[t], `click`, e);
          } else z();
          if (O) {
            let t = o(`rpTo`);
            for (let i = 0; i < t.length; i++) {
              let a = t[i];
              f(a, `data-reply-to`) &&
                h(a, `click`, () => {
                  z();
                  let t = r(e);
                  if (t) {
                    let e = d(a, `data-reply-to`),
                      i = r(`c${e}`),
                      o = `${d(t, n)}&parentID=${e}`;
                    (c(O, `cmRbox`),
                      N(E),
                      O.parentNode === i
                        ? O.scrollIntoView({ behavior: `smooth` })
                        : i.appendChild(O),
                      d(t, `data-src`) !== o &&
                        (m(t, `src`),
                        p(t, `height`, `96`),
                        p(t, `data-src`, o),
                        l(t, `lazyloading`, `lazyloaded`),
                        c(t, `lazyload`)));
                  }
                });
            }
            if (
              (E &&
                h(E, `click`, () => {
                  z();
                  let t = r(e);
                  if (t) {
                    let e = d(t, n);
                    (l(O, `cmRbox`),
                      M(E),
                      E.nextElementSibling === O
                        ? O.scrollIntoView({ behavior: `smooth` })
                        : _(E, `afterend`, O),
                      d(t, `data-src`) !== e &&
                        (m(t, `src`),
                        p(t, `height`, `96`),
                        p(t, `data-src`, e),
                        l(t, `lazyloading`, `lazyloaded`),
                        c(t, `lazyload`)));
                  }
                }),
              x.par)
            ) {
              v(
                O,
                `afterbegin`,
                `<div class='tabs'><input id='cmnT-1' type='radio' name='cmnTabs' checked=''/><input id='cmnT-2' type='radio' name='cmnTabs'/><div><label for='cmnT-1'>${S.commentMessage}</label><label for='cmnT-2'>${S.mediaPlus}</label></div><div class='cmnC-1'></div><div class='cmnC-2'>${S.commentMediaParserMessage ? `<p class='note'>${S.commentMediaParserMessage}</p>` : ``}<div class='cmPar'><div><textarea id='cmParTx' class='tx' placeholder='${b(S.commentMediaInputPlaceholder)}'></textarea><div class='nc'></div><button type='button' class='btn pr' data-action='pre' aria-label='${b(S.codeBlock)}'></button><button type='button' class='btn pr' data-action='code'aria-label='${b(S.inlineCode)}'></button><button type='button' class='btn pr' data-action='quote' aria-label='${b(S.quote)}'></button>${x.im ? `<button type='button' class='btn pr' data-action='image' aria-label='${b(S.imageUrl)}'></button>` : ``}<button type='button' class='btn pr' data-action='tag' aria-label='${b(S.tag)}'></button>${x.lnk ? `<button type='button' class='btn pr' data-action='link' aria-label='${b(S.link)}'></button>` : ``}<br/><button type='button' class='btn cp hidden' data-action='copy' aria-label='${b(S.copyCode)}'></button><button type='button' class='btn cl' data-action='clear' aria-label='${b(S.clear)}'></button></div></div></div></div>`,
              );
              let e = i(`.cmPar`, O),
                t = a(`button[data-action]`, e),
                n = i(`textarea`, e),
                r = i(`.nc`, e),
                o,
                s = (e, t = 3e3) => {
                  (clearTimeout(o),
                    p(r, `data-message`, e),
                    (o = setTimeout(() => {
                      m(r, `data-message`);
                    }, t)));
                },
                c = () => {
                  ((n.disabled = !1), (n.value = ``));
                  for (let e = 0; e < t.length; e++) {
                    let n = t[e],
                      r = d(n, `data-action`);
                    ((n.disabled = !1), r === `copy` && M(n));
                  }
                },
                l = () => {
                  n.disabled = !0;
                  for (let e = 0; e < t.length; e++) {
                    let n = t[e],
                      r = d(n, `data-action`);
                    (r !== `clear` && r !== `copy` && (n.disabled = !0), r === `copy` && N(n));
                  }
                };
              for (let e = 0; e < t.length; e++) {
                let r = t[e];
                h(r, `click`, () => {
                  let e = d(r, `data-action`);
                  if (!n.value) n.focus();
                  else
                    switch (e) {
                      case `pre`:
                      case `code`:
                      case `quote`:
                      case `tag`:
                        ((n.value = `<i rel='${e}'>${b(n.value, !0, !0, !1)}</i>`), l());
                        break;
                      case `link`:
                        P(n.value.trim())
                          ? ((n.value = `<a href='${encodeURI(n.value.trim())}'>edit_this_after_pasting</a>`),
                            l())
                          : (s(S.notAValidURL), n.focus());
                        break;
                      case `image`:
                        P(n.value.trim())
                          ? ((n.value = `<i rel='${e}'>${encodeURI(n.value.trim())}</i>`), l())
                          : (s(S.notAValidURL), n.focus());
                        break;
                      case `clear`:
                        (c(), n.focus());
                        break;
                      case `copy`:
                        ((r.disabled = !0),
                          y(n.value),
                          s(S.copiedCode, 2e3),
                          setTimeout(() => c(), 2e3));
                    }
                });
              }
            }
            x.im &&
              D.then(() => {
                let e = a(`.cmCo i[rel='image']`);
                for (let t = 0; t < e.length; t += 1) {
                  let n = e[t],
                    r = (n.textContent || n.innerText).trim();
                  if (r) {
                    let e = s(`img`, {
                      src: A,
                      alt: `Comment image`,
                      class: `lazyload`,
                      attributes: { "data-src": r },
                    });
                    n.insertAdjacentElement(`beforebegin`, e);
                  }
                  n.remove();
                }
              });
          }
          let B = o(`lazyYt`);
          for (let e = 0; e < B.length; e++) L(B[e]);
          let V = r(`postGreeting`);
          if (V) {
            let e = [
                S.welcome,
                S.timeToSleep,
                S.haveSweetDreams,
                S.goodMorning,
                S.goodAfternoon,
                S.goodEvening,
                S.goodNight,
              ],
              t = new Date().getHours(),
              n = e[1];
            (t < 4
              ? (n = e[2])
              : t < 12
                ? (n = e[3])
                : t < 17
                  ? (n = e[4])
                  : t < 19
                    ? (n = e[5])
                    : t < 22 && (n = e[6]),
              p(V, `data-text`, n));
          }
        }
      };
      E.then(() => {
        if (!w.iBt) {
          let e = r(`postSplit`);
          if (e) {
            let t = e.innerHTML.split(`<!--nextpage-->`),
              n = t.length;
            if (n > 1) {
              let r = k.search.match(/[?&]page=(\d+)/),
                i = r && r[1] ? Number(r[1]) : 1;
              i > n && (i = 1);
              let a = t[i - 1],
                o = `<svg class='line' viewBox='0 0 24 24'><path d='M9.57 5.92993L3.5 11.9999L9.57 18.0699' stroke-miterlimit='10'></path><path d='M20.5 12H3.67004' stroke-miterlimit='10'></path></svg>`,
                s = `<svg class='line' viewBox='0 0 24 24'><path d='M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699' stroke-miterlimit='10'></path><path d='M3.5 12H20.33' stroke-miterlimit='10'></path></svg>`;
              ((a += `<div class='blogN numP'>`),
                (a += `<div class='nPst' data-text='Page ${i} of ${n}:'></div>`),
                i - 1 == 0 && (a += `<div class='nwLnk nPst'>${o}</div>`));
              for (let e = 1; e <= n; e += 1)
                e === i
                  ? (a += `<div class='nPst' data-text='${e}'></div>`)
                  : e === i - 1
                    ? (a += `<a class='nwLnk' href='?page=${e}' rel='nofollow noreferrer noopener' aria-label='${b(S.previous)}' data-text='${e}'>${o}</a>`)
                    : e === i + 1
                      ? (a += `<a class='olLnk' href='?page=${e}' rel='nofollow noreferrer noopener' aria-label='${b(S.next)}' data-text='${e}'>${s}</a>`)
                      : (e >= i - 3 && e <= i + 3) || e === 1 || e === n
                        ? (a += `<a href='?page=${e}' rel='nofollow noreferrer noopener' aria-label='Page ${e}' data-text='${e}'></a>`)
                        : (e === i - 4 || e === i + 4) &&
                          (a += `<div class='nPst' data-text='...'></div>`);
              (i + 1 > n && (a += `<div class='olLnk nPst'>${s}</div>`),
                (a += `</div>`),
                (e.innerHTML = a),
                c(e, `splitted`));
            }
          }
        }
        setTimeout(R, 20);
      });
    })(PU, window, document);
  })());
/* @endinclude */

/*--[ Custom JS SingleItem (placed above </body>) ]--*/

/*--[ Post ]--*/

/* ===========================================================
   notification.js — dismissible notification bar
   =========================================================== */

/* @include notification.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n) => {
      let { CS: r, gId: i, gAb: a, aEL: o, rEL: s, iNumV: c } = e,
        l = `WPLUS_UI_NOTIFICATION_DISMISS`,
        u = `true`,
        d = i(`forNotification`);
      if (d) {
        let e = a(d, `data-max-age-sec`),
          t = e ? Number(e) : null;
        if (c(t))
          if (r.g(l) === u) d.checked = !0;
          else {
            let e = () => {
              d.checked === !0 && (r.s(l, u, { maxAge: t }), s(d, `change`, e));
            };
            o(d, `change`, e);
          }
      }
    })(PU, window, document);
  })());
/* @endinclude */

/* --- Lazy-loaded post-page JS (TOC builder, infinite pagination, etc.) --- */

/*--[ Lazy ]--*/

/* @include infinite-pagination.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n) => {
      let {
          EE: r,
          mrg: i,
          iObjP: a,
          iStr: o,
          qSel: s,
          qSell: c,
          cEl: l,
          aCl: u,
          rCl: d,
          rEL: f,
          aEL: p,
          exp: m,
          gTg: h,
          iAE: g,
          asB: _,
          asA: v,
        } = e,
        y,
        b = () => (y = y || new DOMParser()),
        x = async (e, t) => {
          let n = await fetch(e, t);
          if (!n.ok) throw Error(`Failed to fetch (status: ${n.status}).`);
          let r = await n.text();
          return b().parseFromString(r, `text/html`);
        },
        S = l(`div`),
        C = (e) => {
          S.innerHTML = e;
          let t = S.firstElementChild;
          return ((S.innerHTML = ``), t);
        },
        w = `infinite-scroll`,
        T = `${w}-state`,
        E = {
          tp: 0,
          el: { pg: `.anchors`, ps: `.posts`, an: `.anchors .anchor` },
          tg: { ar: `.posts .post`, an: `.anchors .anchor` },
          bt: { ld: `%s`, ldg: `%s`, ldd: `%s`, err: `%s` },
          cl: {
            pg: w,
            ld: `${T}-load`,
            ldg: `${T}-loading`,
            ldd: `${T}-loaded`,
            err: `${T}-error`,
          },
        };
      class D extends r {
        constructor(e) {
          (super(), (this.supported = !1));
          let r = e ? i(E, e, { isMergeableObject: a }) : E,
            l = o(r.el.ps) ? s(r.el.ps) : r.el.ps,
            m = o(r.el.pg) ? s(r.el.pg) : r.el.pg,
            g = n.documentElement,
            y = r.tp === 1;
          if (l && m) {
            ((this.supported = !0), u(m, r.cl.pg));
            let e = (e) => {
                for (let e in r.cl) e !== `pg` && d(m, r.cl[e]);
                u(m, r.cl[e]);
              },
              i = Promise.resolve(),
              a = (o, s, c = !0) => {
                let u = () => {
                    (r.tp === 2 && (y = !0),
                      (m.innerHTML = r.bt.ldg),
                      e(`ldg`),
                      this.emit(`loading`),
                      (i = i
                        .then(() => x(s))
                        .then((t) => {
                          (e(`ldd`), b(t));
                        })
                        .catch((t) => {
                          console.log(`Failed to paginate:`, t, o, s);
                          let n = C(r.bt.err);
                          (n
                            ? (a(n, s, !1), (m.innerHTML = ``), m.appendChild(n))
                            : (m.innerHTML = r.bt.err),
                            e(`err`),
                            this.emit(`error`, t));
                        })));
                  },
                  d = l.offsetTop + l.offsetHeight,
                  h = t.innerHeight,
                  _ = () => {
                    (f(o, `click`, _), f(t, `scroll`, v), u());
                  },
                  v = () => {
                    ((d = l.offsetTop + l.offsetHeight), (h = t.innerHeight));
                    let e = n.body.scrollTop || g.scrollTop;
                    d < h + e && _();
                  };
                (p(o, `click`, _), y && c && (p(t, `scroll`, v), v()));
              },
              b = (t) => {
                let i = t === n,
                  u = i ? (o(r.el.an) ? s(r.el.an, t) : r.el.an) : s(r.tg.an, t);
                if (!i) {
                  let e = c(r.tg.ar, t),
                    n = [];
                  if (e.length)
                    for (let t = 0; t < e.length; t++) {
                      let r = e[t],
                        i = h(`script`, r);
                      (_(i), l.appendChild(r), v(i), n.push(r));
                    }
                  this.emit(`load`, n);
                }
                if (u && u.href) {
                  let t = C(r.bt.ld);
                  t
                    ? (a(t, u.href), (m.innerHTML = ``), m.appendChild(t), e(`ld`))
                    : ((m.innerHTML = r.bt.ld), e(`err`));
                } else ((m.innerHTML = r.bt.ldd), e(`ldd`), this.emit(`loaded`));
              };
            b(n);
          }
        }
      }
      m({ IS: D });
    })(PU, window, document);
  })());
/* @endinclude */

/* @include numbered-pagination.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n, r) => {
      let {
          df: i,
          gId: a,
          qSel: o,
          qSell: s,
          pEJ: c,
          iNum: l,
          iNumV: u,
          cEl: d,
          aEL: f,
          gAb: p,
          sAb: m,
          exp: h,
          aCl: g,
          vw: _,
          bg: v,
          lb: y,
          pg: b,
          mc: x,
          eHTML: S,
          cwR: C,
        } = e,
        w = (e) => new URL(e, n.baseURI),
        T = (e) => e.replace(/(^\w+:|^)/, ``),
        E = (e) => w(T(e)),
        D,
        O = () => (D = D || new DOMParser()),
        k = (e, t) => {
          let n = e.get(t);
          if (n) {
            let e = Number(n);
            if (u(e)) return e;
          }
          return null;
        },
        A = (e) => k((e instanceof URL ? e : new URL(e)).searchParams, `max-results`),
        j = (e) => {
          let t = c(a(`json:blogposts`, e));
          return t ? Object.keys(t).length : null;
        },
        M = (e) => {
          let t = c(a(`json:blogpager`, e));
          if (t) {
            if (t.old) {
              let e = A(t.old);
              if (e) return e;
            }
            if (t.new) {
              let e = A(t.new);
              if (e) return e;
            }
          }
          return null;
        },
        N = (e, t) => {
          let n = j(e);
          if (n) return n;
          if (t) {
            let t = M(e);
            if (t) return t;
          }
          return null;
        };
      h({
        numP: async (a) => {
          let c = Object.assign({ perPage: 7, pager: `.blogN`, class: `numP` }, r, a),
            l = o(c.pager);
          if (l) {
            await i;
            let r = (e, n, r, i, a) => {
              g(l, c.class);
              let o = `<svg class='line' viewBox='0 0 24 24'><path d='M9.57 5.92993L3.5 11.9999L9.57 18.0699' stroke-miterlimit='10'></path><path d='M20.5 12H3.67004' stroke-miterlimit='10'></path>`,
                u = `<svg class='line' viewBox='0 0 24 24'><path d='M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699' stroke-miterlimit='10'></path><path d='M3.5 12H20.33' stroke-miterlimit='10'></path></svg>`,
                d = ``;
              i - 1 == 0 && (d += `<div class='nwLnk nPst'>${o}</div>`);
              for (let e = 1; e <= r; e++)
                e === i
                  ? (d += `<div class='nPst' data-text='${e}'></div>`)
                  : e === i - 1
                    ? (d += `<button type='button' class='nwLnk' aria-label='${S(x.previous)}' data-text='${e}' data-page='${e}'>${o}</button>`)
                    : e === i + 1
                      ? (d += `<button type='button' class='olLnk' aria-label='${S(x.next)}' data-text='${e}' data-page='${e}'>${u}</button>`)
                      : (e >= i - 3 && e <= i + 3) || e === 1 || e === r
                        ? (d += `<button type='button' aria-label='Page ${e}' data-text='${e}' data-page='${e}'></button>`)
                        : (e === i - 4 || e === i + 4) &&
                          (d += `<div class='nPst' data-text='...'></div>`);
              (i + 1 > r && (d += `<div class='olLnk nPst'>${u}</div>`), (l.innerHTML = d));
              let h = s(`[data-page]`, l),
                _ = (e) => {
                  for (let t = 0; t < h.length; t++) h[t].disabled = e;
                };
              for (let e = 0; e < h.length; e++) {
                let n = h[e],
                  r = Number(p(n, `data-page`));
                f(n, `click`, () => {
                  let e = p(n, `data-url`);
                  e
                    ? (t.location.href = e)
                    : e === null &&
                      (_(!0),
                      a(r)
                        .then((e) => {
                          (_(!1),
                            e
                              ? (m(n, `data-url`, e), (t.location.href = e))
                              : m(n, `data-url`, ``));
                        })
                        .catch((e) => {
                          (console.log(`Failed to paginate:`, e, n), _(!1));
                        }));
                });
              }
            };
            if (_.iHm || (_.iSr && !_.sr) || (_.sr && _.sr.l)) {
              let i = new URL(t.location.href).searchParams,
                a = _.iHm ? null : k(i, `max-results`),
                o = _.iHm ? null : k(i, `start`),
                s = 0;
              if (
                (_.iHm
                  ? (s = 1)
                  : (!b.new || b.new === v.hmU) &&
                    (s = !o && (i.has(`updated-max`) || i.has(`updated-min`)) ? 2 : 1),
                s || o >= 0)
              ) {
                let t =
                  a ||
                  N(n, _.iHm || !!s) ||
                  N(
                    await C(() =>
                      fetch(`${E(v.cnHmU)}?m=0&view=x-content-blog`).then((e) =>
                        e.ok ? e.text() : null,
                      ),
                    ).then((e) => {
                      if (e) return new O().parseFromString(e, `text/html`);
                      throw Error(`No document response.`);
                    }),
                    !0,
                  ) ||
                  c.perPage ||
                  7;
                if (u(t) && t > 0 && ((s = (o ? Math.floor(o / t) + 1 : 0) || s), s > 0)) {
                  let n = new (await e.iBF())(E(v.cnHmU)),
                    i =
                      _.sr && _.sr.l
                        ? y[_.sr.l]
                        : (await n.posts.list({ summary: !0, maxResults: 0 })).totalResults;
                  if (i > 0) {
                    let e = Math.ceil(i / t);
                    if (s <= e) {
                      let a = (e, n) =>
                          e === 0 && (_.iHm || b.new === v.hmU || !(_.sr && _.sr.l))
                            ? v.cnHmU
                            : `${v.cnHmU}search${_.sr && _.sr.l ? `/label/${encodeURI(_.sr.l)}` : ``}?${n ? `updated-max=${n}&` : ``}max-results=${t}&start=${e}&by-date=false`,
                        o = async (r) => {
                          if (r > 0 && r <= e) {
                            let e = (r - 1) * t;
                            if (e === 0) return a(e);
                            let i = { summary: !0, maxResults: 1, startIndex: e };
                            _.sr && _.sr.l && (i.label = _.sr.l);
                            let o = (await n.posts.list(i))[0];
                            if (o) {
                              let t = o.published;
                              return a(
                                e,
                                (t.substring(0, 19) + t.substring(23, 29)).replace(/\+/g, `%2B`),
                              );
                            }
                          }
                          return null;
                        };
                      return (
                        r(i, t, e, s, o),
                        {
                          totalResults: i,
                          totalPages: e,
                          itemsPerPage: t,
                          currentPage: s,
                          getPageUrl: o,
                        }
                      );
                    }
                  }
                }
              }
            }
          }
          throw Error(`Numbered pagination not available.`);
        },
      });
    })(PU, window, document, { perPage: 7, pager: `.blogN`, class: `numP` });
  })());
/* @endinclude */

/* @include lazy.js */
("use strict");
((this._$ = this._$ || {}),
  (function () {
    ((e, t, n, r) => {
      let {
          LS: i,
          CS: a,
          EE: o,
          GI: s,
          IS: c,
          WW: l,
          numP: u,
          df: d,
          lz: f,
          pEJ: p,
          fl: m,
          wLP: h,
          cwR: g,
          iStr: _,
          iFun: v,
          iBol: ee,
          iNum: y,
          iArr: te,
          iNumV: ne,
          cEl: b,
          gId: x,
          gCl: S,
          gTg: re,
          qSel: C,
          qSell: w,
          gAb: T,
          sAb: E,
          rAb: ie,
          hAb: D,
          aEL: O,
          rEL: k,
          iAE: ae,
          aCl: A,
          rCl: j,
          tCl: oe,
          hCl: M,
          dbc: se,
          eReg: ce,
          cCss: le,
          lJs: ue,
          eHTML: N,
          exp: de,
          tNtf: fe,
          iVwp: pe,
          pl: P,
          cf: me,
          st: he,
          ps: F,
          lb: ge,
          bg: I,
          vw: L,
          pg: _e,
          ms: R,
          mc: z,
          ml: ve,
          _: ye,
          x: be,
          asB: xe,
          asA: Se,
        } = e,
        B = t.Object,
        V = t.String,
        H = t.Number,
        U = t.console,
        Ce = t.JSON,
        we = t.Promise,
        Te = t.Error,
        Ee = t.URL,
        W = t.Math,
        G = t.Date,
        K = t.decodeURIComponent,
        De = t.navigator,
        q = t.getComputedStyle,
        Oe = t.requestAnimationFrame,
        J = t.parseFloat,
        ke = t.matchMedia,
        Ae = t.location,
        Y = n.documentElement;
      Ce.parse;
      let je = Ce.stringify,
        Me = `data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`,
        Ne = (e) => new Ee(e, n.baseURI),
        Pe = (e) => e.replace(/(^\w+:|^)/, ``),
        Fe = (e) => Ne(Pe(e)),
        Ie = (e, t = !0, n = !0) => {
          (E(e, `hidden`, ``),
            t && A(e, `hidden`),
            n && D(e, `aria-hidden`) && E(e, `aria-hidden`, `true`));
        },
        X = (e, t = !0, n = !0) => {
          (ie(e, `hidden`),
            t && j(e, `hidden`),
            n && D(e, `aria-hidden`) && E(e, `aria-hidden`, `false`));
        },
        Le,
        Re = () => (Le = Le || new DOMParser()),
        ze = (e, t, n) => {
          if (
            typeof e != `number` ||
            e < -1 ||
            e > 1 ||
            !_(t) ||
            (t[0] != `r` && t[0] != `#`) ||
            (n && !_(n))
          )
            return null;
          var r = function (e) {
              var t = e.length,
                n = {};
              if (t > 9) {
                if (((e = e.split(`,`)), e.length < 3 || e.length > 4)) return null;
                ((n[0] = i(e[0].split(`(`)[1])),
                  (n[1] = i(e[1])),
                  (n[2] = i(e[2])),
                  (n[3] = e[3] ? J(e[3]) : -1));
              } else {
                if (t == 8 || t == 6 || t < 4) return null;
                (t < 6 &&
                  (e =
                    `#` +
                    e[1] +
                    e[1] +
                    e[2] +
                    e[2] +
                    e[3] +
                    e[3] +
                    (t > 4 ? `` + e[4] + e[4] : ``)),
                  (e = i(e.slice(1), 16)),
                  (n[0] = (e >> 16) & 255),
                  (n[1] = (e >> 8) & 255),
                  (n[2] = e & 255),
                  (n[3] = -1),
                  (t == 9 || t == 5) &&
                    ((n[3] = a((n[2] / 255) * 1e4) / 1e4),
                    (n[2] = n[1]),
                    (n[1] = n[0]),
                    (n[0] = (e >> 24) & 255)));
              }
              return n;
            },
            i = parseInt,
            a = W.round,
            o = t.length > 9,
            o = typeof n == `string` ? (n.length > 9 ? !0 : n == `c` ? !o : !1) : o,
            s = e < 0,
            e = s ? e * -1 : e,
            n = n && n != `c` ? n : s ? `#000000` : `#FFFFFF`,
            c = r(t),
            l = r(n);
          return !c || !l
            ? null
            : o
              ? `rgb` +
                (c[3] > -1 || l[3] > -1 ? `a(` : `(`) +
                a((l[0] - c[0]) * e + c[0]) +
                `,` +
                a((l[1] - c[1]) * e + c[1]) +
                `,` +
                a((l[2] - c[2]) * e + c[2]) +
                (c[3] < 0 && l[3] < 0
                  ? `)`
                  : `,` +
                    (c[3] > -1 && l[3] > -1
                      ? a(((l[3] - c[3]) * e + c[3]) * 1e4) / 1e4
                      : l[3] < 0
                        ? c[3]
                        : l[3]) +
                    `)`)
              : `#` +
                (
                  4294967296 +
                  a((l[0] - c[0]) * e + c[0]) * 16777216 +
                  a((l[1] - c[1]) * e + c[1]) * 65536 +
                  a((l[2] - c[2]) * e + c[2]) * 256 +
                  (c[3] > -1 && l[3] > -1
                    ? a(((l[3] - c[3]) * e + c[3]) * 255)
                    : l[3] > -1
                      ? a(l[3] * 255)
                      : c[3] > -1
                        ? a(c[3] * 255)
                        : 255)
                )
                  .toString(16)
                  .slice(1, c[3] > -1 || l[3] > -1 ? void 0 : -2);
        },
        Z = (e, t) => (e === null ? (ee(t) ? t : !1) : e !== `false`),
        Be = (e, n) => {
          let r = (t) => {
            try {
              typeof localStorage < `u` && t.storageArea === localStorage && t.key === e && n(t);
            } catch (e) {
              U.warn(e);
            }
          };
          return (
            O(t, `storage`, r),
            () => {
              k(t, `storage`, r);
            }
          );
        },
        Ve = (e) => {
          let n = (n) => {
            let r = !1;
            if (n.persisted) r = !0;
            else if (t.performance) {
              let e = t.performance.getEntriesByType(`navigation`)[0];
              e && e.type === `back_forward` && (r = !0);
            }
            r && e(n);
          };
          return (
            O(t, `pageshow`, n),
            () => {
              k(t, `pageshow`, n);
            }
          );
        },
        Q = {
          settingCross: `<svg class='line' viewBox='0 0 24 24'><g class='g1'><path class='c' d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z' stroke-miterlimit='10'></path><path d='M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z' stroke-miterlimit='10'></path></g><g class='g2'><line x1='18' x2='6' y1='6' y2='18'></line><line x1='6' x2='18' y1='6' y2='18'></line></g></svg>`,
          setting: `<svg class='line' viewBox='0 0 24 24'><path d='M3 9.11011V14.8801C3 17.0001 3 17.0001 5 18.3501L10.5 21.5301C11.33 22.0101 12.68 22.0101 13.5 21.5301L19 18.3501C21 17.0001 21 17.0001 21 14.8901V9.11011C21 7.00011 21 7.00011 19 5.65011L13.5 2.47011C12.68 1.99011 11.33 1.99011 10.5 2.47011L5 5.65011C3 7.00011 3 7.00011 3 9.11011Z'></path><path class='c' d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'></path></svg>`,
          comment: `<svg class='line' viewBox='0 0 24 24'><g transform='translate(2.000000, 2.000000)'><line class='c' x1='13.9394' x2='13.9484' y1='10.413' y2='10.413'></line><line class='c' x1='9.9304' x2='9.9394' y1='10.413' y2='10.413'></line><line class='c' x1='5.9214' x2='5.9304' y1='10.413' y2='10.413'></line><path d='M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z'></path></g></svg>`,
          stat: `<svg class='line' viewBox='0 0 24 24'><g transform='translate(2.300000, 2.300000)'><line class='c' x1='5.18305279' x2='5.18305279' y1='7.960947' y2='14.6546312'></line><line class='c' x1='9.73684179' x2='9.73684179' y1='4.757368' y2='14.6552627'></line><line class='c' x1='14.2156838' x2='14.2156838' y1='11.498211' y2='14.6550531'></line><path d='M-3.55271368e-14,9.73684211 C-3.55271368e-14,2.43473684 2.43473684,2.13162821e-14 9.73684211,2.13162821e-14 C17.0389474,2.13162821e-14 19.4736842,2.43473684 19.4736842,9.73684211 C19.4736842,17.0389474 17.0389474,19.4736842 9.73684211,19.4736842 C2.43473684,19.4736842 -3.55271368e-14,17.0389474 -3.55271368e-14,9.73684211 Z'></path></g></svg>`,
          element2: `<svg class='line' viewBox='0 0 24 24'><path d='M10.5 19.9V4.1C10.5 2.6 9.86 2 8.27 2H4.23C2.64 2 2 2.6 2 4.1V19.9C2 21.4 2.64 22 4.23 22H8.27C9.86 22 10.5 21.4 10.5 19.9Z'></path><path class='c' d='M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z'></path><path d='M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z'></path></svg>`,
          brushBig: `<svg class='line' viewBox='0 0 24 24'><path class='c' d='M7.98999 2V7'></path><path class='c' d='M12 2V4'></path><path d='M9.5 19.5V18H4.5C3.95 18 3.45 17.78 3.09 17.41C2.72 17.05 2.5 16.55 2.5 16C2.5 14.97 3.3 14.11 4.31 14.01C4.37 14 4.43 14 4.5 14H19.5C19.57 14 19.63 14 19.69 14.01C20.17 14.05 20.59 14.26 20.91 14.59C21.32 14.99 21.54 15.56 21.49 16.18C21.4 17.23 20.45 18 19.39 18H14.5V19.5C14.5 20.88 13.38 22 12 22C10.62 22 9.5 20.88 9.5 19.5Z'></path><path d='M20.17 5.3L19.69 14.01C19.63 14 19.57 14 19.5 14H4.50001C4.43001 14 4.37001 14 4.31001 14.01L3.83001 5.3C3.65001 3.53 5.04001 2 6.81001 2H17.19C18.96 2 20.35 3.53 20.17 5.3Z'></path></svg>`,
          html5: `<svg class='line' viewBox='0 0 24 24'><path d='M4.1 2h15.8c.6 0 1.1.5 1 1.1l-1.8 16.2c0 .4-.3.7-.7.9l-6.1 1.7c-.2.1-.4.1-.5 0l-6.1-1.7c-.4-.1-.7-.4-.7-.9L3.1 3.1c0-.6.4-1.1 1-1.1Z' stroke-miterlimit='10'></path><path class='c' d='M16.2 6.8H7.8l.4 4.4h7.6l-.6 5-3.4 1-3.6-1v-2' stroke-miterlimit='10'></path></svg>`,
          list: `<svg class='line' viewBox='0 0 24 24'><line x1='8' x2='21' y1='6' y2='6'/><line x1='8' x2='21' y1='12' y2='12'/><line x1='8' x2='21' y1='18' y2='18'/><line class='c' x1='3' x2='3.01' y1='6' y2='6'/><line class='c' x1='3' x2='3.01' y1='12' y2='12'/><line class='c' x1='3' x2='3.01' y1='18' y2='18'/></svg>`,
          pencil: `<svg class='line' viewBox='0 0 24 24'><g transform='translate(3.500000, 3.500000)'><line class='c' x1='9.8352' x2='16.2122' y1='16.0078' y2='16.0078'></line><path d='M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z'></path><line x1='7.0041' x2='11.8681' y1='3.7114' y2='7.3624'></line></g></svg>`,
          documentDownload: `<svg class='line' viewBox='0 0 24 24'><path class='c' d='M9 11V17L11 15'></path><path class='c' d='M9 17L7 15'></path><path d='M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14'></path><path d='M22 10H18C15 10 14 9 14 6V2L22 10Z'></path></svg>`,
          download: `<svg class='line' viewBox='0 0 24 24'><polyline class='c' points='8 17 12 21 16 17'></polyline><line class='c' x1='12' x2='12' y1='12' y2='21'></line><path d='M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29'></path></svg>`,
          speedometer: `<svg class='line' viewBox='0 0 24 24'><path d='M19.14 19.5C20.91 17.7 22 15.22 22 12.5C22 6.98 17.52 2.5 12 2.5C6.48 2.5 2 6.98 2 12.5C2 15.22 3.08 17.68 4.84 19.49' stroke-miterlimit='10'></path><path class='c' d='M12 21.5C13.8667 21.5 15.38 19.9867 15.38 18.12C15.38 16.2533 13.8667 14.74 12 14.74C10.1333 14.74 8.62 16.2533 8.62 18.12C8.62 19.9867 10.1333 21.5 12 21.5Z' stroke-miterlimit='10'></path><path class='c' d='M15.25 12H16C16.82 12 17.5 11.33 17.5 10.5C17.5 9.68 16.82 9 16 9C15.18 9 14.5 9.67 14.5 10.5V11.25C14.5 11.66 14.84 12 15.25 12Z' stroke-miterlimit='10'></path></svg>`,
          ranking: `<svg class='line' viewBox='0 0 24 24'><path d='M13.3 8.10998L14.62 10.75C14.8 11.11 15.28 11.47 15.68 11.53L18.07 11.93C19.6 12.19 19.96 13.29 18.86 14.39L17 16.25C16.69 16.56 16.51 17.17 16.61 17.61L17.14 19.92C17.56 21.74 16.59 22.45 14.98 21.5L12.74 20.17C12.33 19.93 11.67 19.93 11.26 20.17L9.01996 21.5C7.40996 22.45 6.43995 21.74 6.85995 19.92L7.38998 17.61C7.48998 17.18 7.30997 16.57 6.99997 16.25L5.13998 14.39C4.03998 13.29 4.39996 12.18 5.92996 11.93L8.31997 11.53C8.71997 11.46 9.19997 11.11 9.37997 10.75L10.7 8.10998C11.41 6.67998 12.59 6.67998 13.3 8.10998Z'></path><path class='c' d='M6 9V2'></path><path class='c' d='M18 9V2'></path><path class='c' d='M12 4V2'></path></svg>`,
          flash1: `<svg class='line' viewBox='0 0 24 24'><path d='M6.08998 13.28H9.17998V20.48C9.17998 22.16 10.09 22.5 11.2 21.24L18.77 12.64C19.7 11.59 19.31 10.72 17.9 10.72H14.81V3.52002C14.81 1.84002 13.9 1.50002 12.79 2.76002L5.21998 11.36C4.29998 12.42 4.68998 13.28 6.08998 13.28Z' stroke-miterlimit='10'></path></svg>`,
          delete: `<svg class='line' viewBox='0 0 24 24'><path d='M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998'></path><path d='M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97'></path><path d='M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001'></path><path d='M10.33 16.5H13.66'></path><path d='M9.5 12.5H14.5'></path></svg>`,
        },
        He,
        Ue = () => {
          if (He) return He;
          let e = /^#([0-9a-f]{3}){1,2}$/i,
            r = n.documentElement,
            a = w(
              `meta[name='theme-color'], meta[name='msapplication-navbutton-color'], meta[name='apple-mobile-web-app-status-bar-style']`,
              n.head,
            ),
            o = ke ? ke(`(prefers-color-scheme: dark)`) : null,
            s = [`light`, `dark`],
            c = s.concat(`system`),
            l = { light: `lgT`, dark: `drK`, system: `syS` },
            u = [];
          for (let e in l) u.push(l[e]);
          let d = (e, t = 10, n = 100) => {
              let r = [],
                i = [],
                a = t / 2;
              for (let t = 1; t <= a; t++) {
                let o = ((n / 100) * t) / a,
                  s = ze(o, e),
                  c = ze(o * -1, e);
                (r.push(s), i.push(c));
              }
              return r.reverse().concat(i);
            },
            f = (e) => l[e],
            p = he.ui,
            m = {
              vt: p.vt,
              k: `WPLUS_UI_STORAGE`,
              gS() {
                return i.gZ(m.k) || {};
              },
              sS(e) {
                i.sZ(m.k, e);
              },
              get th() {
                let e = m.gS().theme;
                if (e) return e;
                if (c.includes(p.dft)) return p.dft;
                for (let e = 0; e < c.length; e++) if (M(r, u[e])) return c[e];
                return c[2];
              },
              set th(e) {
                c.includes(e) &&
                  (m.sS({ theme: e }), j(r, ...u), A(r, f(e)), e === c[2] && A(r, f(m.rT)), m.sB());
              },
              get rT() {
                return (m.th === c[2] && o ? o.matches : m.th === s[1]) ? c[1] : c[0];
              },
              _s(e, r) {
                let i = m.rT === c[1],
                  a = e === 2 && o ? o.matches : e === 1;
                if (
                  r &&
                  m.vt &&
                  a !== i &&
                  !/^((?!chrome|android).)*safari/i.test(De.userAgent) &&
                  n.startViewTransition
                ) {
                  let i = t.visualViewport,
                    a = i ? i.offsetLeft : 0,
                    o = i ? i.offsetTop : 0,
                    s = i && i.width > 0 ? i.width : t.innerWidth,
                    l = i && i.height > 0 ? i.height : t.innerHeight,
                    u = H.isFinite(r.clientX) ? r.clientX : a + s / 2,
                    d = H.isFinite(r.clientY) ? r.clientY : o + l / 2,
                    f = W.min(100, W.max(0, ((u - a) / s) * 100)),
                    p = W.min(100, W.max(0, ((d - o) / l) * 100)),
                    h = W.max(s, l),
                    g =
                      h > 0
                        ? (W.hypot((W.max(f, 100 - f) / 100) * s, (W.max(p, 100 - p) / 100) * l) /
                            h) *
                          100
                        : 0;
                  n.startViewTransition(() => {
                    m.th = c[e];
                  }).ready.then(() => {
                    n.documentElement.animate(
                      {
                        clipPath: [
                          `circle(0vmax at ${f}% ${p}%)`,
                          `circle(${g}vmax at ${f}% ${p}%)`,
                        ],
                      },
                      {
                        duration: 600,
                        easing: `cubic-bezier(.76,.32,.29,.99)`,
                        pseudoElement: `::view-transition-new(root)`,
                      },
                    );
                  });
                } else m.th = c[e];
              },
              lT(e) {
                m._s(0, e);
              },
              dT(e) {
                m._s(1, e);
              },
              sT(e) {
                m._s(2, e);
              },
              tT(e) {
                m._s(m.rT === s[1] ? 0 : 1, e);
              },
              cl: [],
              get cs() {
                let e = m.gS().scheme;
                if (ne(e) && m.cl[e]) return e;
                if (ne(p.dfs) && m.cl[p.dfs]) return p.dfs;
                let t = r.className.match(/cs(\d+)\b/);
                return t && t[1] && m.cl[t[1]] ? H(t[1]) : 0;
              },
              set cs(e) {
                if (ne(e) && m.cl[e]) {
                  m.sS({ scheme: e });
                  let t = r.className.match(/cs(\d+)\b/g);
                  (t && j(r, ...t), A(r, `cs${e}`), A(r, `csN`), m.sB());
                }
              },
              sC(e) {
                m.cs = e;
              },
              sB(t) {
                let n;
                if (t && e.test(t)) n = t;
                else {
                  let t = q(r).getPropertyValue(`--statusC`);
                  e.test(t) && (n = t);
                }
                if (n) for (let e = 0; e < a.length; e++) a[e].content = n;
              },
            },
            h = p.csH;
          if (p.csOk && h.length) {
            let t = `:root{`,
              n = ``;
            for (let r = 0; r < h.length; r++) {
              let i = h[r];
              if (_(i) && e.test(i)) {
                (m.cl.push(i), (n += `.cs${r}{`));
                let e = [i].concat(d(i, 40, 98));
                for (let i = 0; i < e.length; i++)
                  ((t += `--cs${r}-${i}:${e[i]};`), (n += `--cs-${i}:var(--cs${r}-${i});`));
                n += `}`;
              } else m.cl.push(null);
            }
            ((t += `}`), le(t + n));
          }
          return (
            o &&
              O(o, `change`, () => {
                m.th = m.th;
              }),
            Be(m.k, () => {
              ((m.th = m.th), (m.cs = m.cs));
            }),
            Ve(() => {
              ((m.th = m.th), (m.cs = m.cs));
            }),
            (m.th = m.th),
            (m.cs = m.cs),
            (He = m),
            He
          );
        },
        We = ({
          rippleClass: e = `ripple`,
          rippleContainerClass: t = `ripple-container`,
          colorProperty: r = `--ripple-color`,
        } = {}) => {
          let i = { pointerdown: null, pointerup: null, pointermove: null, pointercancel: null },
            a = null;
          return {
            start() {
              if (!a) {
                a = B.keys(i).reduce((e, t) => {
                  let r = t,
                    a = (e) => {
                      let t = i[r];
                      v(t) && t(e);
                    };
                  return (O(n, r, a), (e[r] = a), e);
                }, {});
                let o = null;
                i.pointerdown = (n) => {
                  let { target: a } = n;
                  if (o) {
                    let e = o;
                    ((o = null),
                      setTimeout(() => {
                        e.parentNode && e.parentNode.removeChild(e);
                      }, 400));
                  }
                  for (; a.classList && !M(a, e);) a = a.parentNode;
                  if (a.classList && M(a, e)) {
                    let e = a.getBoundingClientRect(),
                      s = n.x - e.left,
                      c = n.y - e.top,
                      l = W.max(s, a.offsetWidth - s),
                      u = W.max(c, a.offsetHeight - c),
                      d = W.sqrt(l * l + u * u),
                      f = q(a),
                      p = f.getPropertyValue(r) || f.color,
                      m = b(`i`, { class: t });
                    a.appendChild(m);
                    let h = b(`i`, {
                      style: `top: ${`${c - d}px`}; left: ${`${s - d}px`}; width: ${`${2 * d}px`}; height: ${`${2 * d}px`}; background-color: ${p}; transform: scale(0); opacity: 1;`,
                    });
                    (m.appendChild(h), (o = m));
                    let g = setTimeout(() => {
                        h.style.transform = `scale(1)`;
                      }, 24),
                      _ = () => {
                        ((i.pointerup = null),
                          (i.pointercancel = null),
                          (i.pointermove = null),
                          o && o.firstChild && (o.firstChild.style.opacity = `0`));
                      };
                    ((i.pointerup = _),
                      (i.pointercancel = _),
                      (i.pointermove = (e) => {
                        n.y !== e.y && (n.y < 4 - e.y || n.y > -4 - e.y) && (clearTimeout(g), _());
                      }));
                  }
                };
              }
              return this;
            },
            stop() {
              if (a) {
                for (let e in a) {
                  let t = e,
                    r = a[t];
                  r && k(n, t, r);
                }
                a = null;
              }
              return this;
            },
          };
        },
        Ge = (e, t = 0.6, n = 0.3, r = 400, i = 200) => {
          if (e.tagName === `DETAILS` && `animate` in e && e.children.length) {
            let a = null,
              o = [];
            for (let t = 0; t < e.children.length; t += 1) {
              let n = e.children[t];
              n.tagName === `SUMMARY` ? a || (a = n) : o.push(n);
            }
            if (a && o.length) {
              let s = null,
                c = !1,
                l = !1,
                u = (e, t, n) => {
                  let r = e.offsetHeight;
                  if (t || n) {
                    let i = q(e);
                    (t && (r += J(i.marginTop) + J(i.marginBottom)),
                      n && (r += J(i.borderTopWidth) + J(i.borderBottomWidth)));
                  }
                  return r;
                },
                d = () => {
                  l = !0;
                  let n = q(e),
                    c = J(n.borderTopWidth) + J(n.borderBottomWidth),
                    d = u(a, !0) + J(n.paddingTop) + J(n.paddingBottom),
                    f = o.reduce((e, t) => u(t, !0, !0), 0),
                    m = W.round(u(e)),
                    h = W.round(d + f + c);
                  (s && s.cancel(),
                    (s = e.animate(
                      { height: [`${m}px`, `${h}px`] },
                      { duration: W.max(t ? h * t : r, i), easing: `ease-out` },
                    )),
                    (s.onfinish = () => p(!0)),
                    (s.oncancel = () => (l = !1)));
                },
                f = () => {
                  ((e.style.height = `${e.offsetHeight}px`), (e.open = !0), Oe(() => d()));
                },
                p = (t) => {
                  ((e.open = t),
                    (s = null),
                    (c = !1),
                    (l = !1),
                    (e.style.height = ``),
                    (e.style.overflow = ``));
                },
                m = () => {
                  c = !0;
                  let t = q(e),
                    o = J(t.borderTopWidth) + J(t.borderBottomWidth),
                    l = u(a, !0) + J(t.paddingTop) + J(t.paddingBottom),
                    d = W.round(u(e)),
                    f = W.round(l + o);
                  (s && s.cancel(),
                    (s = e.animate(
                      { height: [`${d}px`, `${f}px`] },
                      { duration: W.max(n ? d * n : r, i), easing: `ease-out` },
                    )),
                    (s.onfinish = () => p(!1)),
                    (s.oncancel = () => (c = !1)));
                },
                h = (t) => {
                  (t.preventDefault(),
                    (e.style.overflow = `hidden`),
                    c || !e.open ? f() : (l || e.open) && m());
                };
              return (
                O(a, `click`, h),
                () => {
                  k(a, `click`, h);
                }
              );
            }
          }
          return () => {};
        },
        Ke = (e) => {
          let t = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 },
            n = e.tagName.toLowerCase();
          return typeof t[n] == `number` ? t[n] : 1;
        },
        qe = (e) =>
          e
            .trim()
            .toLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ``)
            .replace(/\s+/g, `-`),
        Je = (e) => e.id || qe(e.textContent || e.innerText) || null,
        Ye = (e) => {
          let t = 6;
          for (let n = 0; n < e.length; n++) {
            let r = Ke(e[n]);
            t = r < t ? r : t;
          }
          return t;
        },
        Xe = (e) => {
          let t = {},
            n = (e) => {
              if (e.id) return e.id;
              let n = Je(e) || `heading`,
                r;
              do
                ((t[n] = typeof t[n] == `number` ? t[n] + 1 : 0),
                  (r = `${n}${t[n] ? `-${t[n]}` : ``}`));
              while (x(r) !== null);
              return r;
            },
            r = w(`h1, h2, h3, h4, h5, h6`, e),
            i = b(`div`),
            a = Ye(r) - 1,
            o = i;
          for (let e = 0; e < r.length; e++) {
            let t = r[e],
              i = Ke(t),
              s = i - a,
              c = b(`a`);
            if (((t.id = n(t)), (c.href = `#${t.id}`), (c.textContent = t.textContent), s > 0)) {
              for (let e = 0; e < s; e++) {
                let e = b(`ol`),
                  t = b(`li`);
                (e.appendChild(t), o.appendChild(e), (o = t));
              }
              o.appendChild(c);
            } else {
              for (let e = 0; e < -s; e++) o = o.parentNode.parentNode;
              let e = b(`li`);
              (e.appendChild(c), o.parentNode.appendChild(e), (o = e));
            }
            a = i;
          }
          let s = i.firstChild;
          return s && s.firstChild ? s : null;
        },
        { nodeStream: Ze, mergeStreams: Qe } = (() => {
          let e = (e) =>
              e
                .replace(/&/g, `&amp;`)
                .replace(/</g, `&lt;`)
                .replace(/>/g, `&gt;`)
                .replace(/"/g, `&quot;`)
                .replace(/'/g, `&#x27;`),
            t = (e) => e.nodeName.toLowerCase();
          return {
            nodeStream: (e) => {
              let n = [];
              return (
                (function e(r, i) {
                  let a = i;
                  for (let i = r.firstChild; i; i = i.nextSibling)
                    i.nodeType === 3 && i.nodeValue
                      ? (a += i.nodeValue.length)
                      : i.nodeType === 1 &&
                        (n.push({ event: `start`, offset: a, node: i }),
                        (a = e(i, a)),
                        t(i).match(/br|hr|img|input/) ||
                          n.push({ event: `stop`, offset: a, node: i }));
                  return a;
                })(e, 0),
                n
              );
            },
            mergeStreams: (n, r, i) => {
              let a = 0,
                o = ``,
                s = [],
                c = () =>
                  !n.length || !r.length
                    ? n.length
                      ? n
                      : r
                    : n[0].offset === r[0].offset
                      ? r[0].event === `start`
                        ? n
                        : r
                      : n[0].offset < r[0].offset
                        ? n
                        : r,
                l = (n) => {
                  o += `<${t(n)}${Array.prototype.map.call(n.attributes, (t) => ` ${t.nodeName}="${e(t.value)}"`).join(``)}>`;
                },
                u = (e) => {
                  o += `</${t(e)}>`;
                },
                d = (e) => {
                  (e.event === `start` ? l : u)(e.node);
                };
              for (; n.length || r.length;) {
                let t = c();
                if (((o += e(i.substring(a, t[0].offset))), (a = t[0].offset), t === n)) {
                  s.reverse().forEach(u);
                  do (d(t.splice(0, 1)[0]), (t = c()));
                  while (t === n && t.length && t[0].offset === a);
                  s.reverse().forEach(l);
                } else (t[0].event === `start` ? s.push(t[0].node) : s.pop(), d(t.splice(0, 1)[0]));
              }
              return o + e(i.substr(a));
            },
          };
        })(),
        $e = (() => {
          let e;
          return () => (e || (e = new l(r, { name: `wplus-ui:hljs` })), e);
        })();
      async function et(e, t = {}) {
        return $e().call(`highlight`, e, t);
      }
      async function tt(e, t = {}) {
        let r = n.createElement(`div`),
          i = t.merge && e.firstElementChild ? Ze(e) : [],
          a = e.textContent,
          o = e.className.match(/\blanguage-([\w-]+)\b/i),
          s = o && o[1] ? o[1] : null,
          c = {};
        s && (c.language = s);
        let l = await et(a, c);
        return (
          i.length && ((r.innerHTML = l.value), (l.value = Qe(i, Ze(r), a))),
          (e.innerHTML = l.value),
          l
        );
      }
      let nt = (t) => {
          let n = P.sy,
            r = t.parentElement && t.parentElement.tagName === `PRE` ? t.parentElement : null,
            i = () => t.textContent || t.innerText,
            a = () => i().split(/\r?\n|\r|\n/g);
          if (
            (/<br\s*\/?>/gi.test(t.innerHTML) &&
              (t.innerHTML = t.innerHTML.replace(
                /<br\s*\/?>/gi,
                `
`,
              )),
            i().trim().length)
          ) {
            if (r) {
              let [o, s, c] = [`data-syntax`, `data-lines`, `data-copy`].map((e) => T(r, e)),
                l = Z(o, n.ok),
                u = Z(s, n.ln),
                d = Z(c, n.cp);
              if (l) {
                let e = q(t),
                  n =
                    [`pre`, `pre-line`].includes(e.whiteSpace.toLowerCase()) &&
                    e.maxHeight.toLowerCase() === `none`;
                if (u && n) {
                  let e = C(`.num`, r);
                  e || ((e = b(`div`, { class: `num` })), ae(t, `beforebegin`, e));
                  let n = s
                      ? s.split(`,`).reduce((e, t) => {
                          let n = t.trim();
                          if (n) {
                            let t = H(n);
                            !H.isNaN(t) && t > 0 && e.push(t);
                          }
                          return e;
                        }, [])
                      : [],
                    i = ``;
                  for (let e = 0; e < a().length; e++)
                    i += `<i${n.includes(e + 1) ? ` class='m'` : ``}></i>`;
                  e.innerHTML = i;
                }
              }
              if (d) {
                let n = C(`button.cp`, r);
                (n ||
                  ((n = b(`button`, {
                    class: `cp`,
                    type: `button`,
                    innerHTML: `<svg class='d1' viewBox='0 0 16 16'><path d='M2 14.5H9C9.275 14.5 9.5 14.275 9.5 14V12H11V14C11 15.1031 10.1031 16 9 16H2C0.896875 16 0 15.1031 0 14V7C0 5.89687 0.896875 5 2 5H4V6.5H2C1.725 6.5 1.5 6.725 1.5 7V14C1.5 14.275 1.725 14.5 2 14.5ZM7 11C5.89687 11 5 10.1031 5 9V2C5 0.896875 5.89687 0 7 0H14C15.1031 0 16 0.896875 16 2V9C16 10.1031 15.1031 11 14 11H7Z'></path></svg><svg class='d2' viewBox='0 0 16 11'><path d='M14.7813 1.21873C15.0751 1.51248 15.0751 1.98748 14.7813 2.2781L6.53135 10.5312C6.2376 10.825 5.7626 10.825 5.47197 10.5312L1.21885 6.28123C0.925098 5.98748 0.925098 5.51248 1.21885 5.22185C1.5126 4.93123 1.9876 4.9281 2.27822 5.22185L5.99697 8.9406L13.7188 1.21873C14.0126 0.924976 14.4876 0.924976 14.7782 1.21873H14.7813Z'></path></svg>`,
                    attributes: {
                      "data-copy": z.copy,
                      "data-copied": z.copied,
                      "aria-label": z.copy,
                    },
                  })),
                  O(n, `click`, () => {
                    (A(n, `d`),
                      (n.disabled = !0),
                      e.cpT(i()),
                      setTimeout(() => {
                        (j(n, `d`), (n.disabled = !1));
                      }, 3e3));
                  }),
                  ae(t, `afterend`, n)),
                  a().length < 2 ? A(n, `a`) : j(n, `a`));
              }
            }
            let [o, s] = [`data-syntax`, `data-highlight`].map((e) => T(r || t, e)),
              c = Z(o, n.ok),
              l = Z(s, n.hl);
            c &&
              l &&
              (ie(t, `data-highlighted`),
              tt(t, { merge: t.tagName === `CODE` }).then((e) => {
                (E(t, `data-highlighted`, `yes`),
                  e.language && E(r || t, `data-result-language`, e.language));
              }));
          }
        },
        rt = (e) => {
          let t = P.lb,
            n = e.tagName === `IMG` ? e : C(`img`, e);
          if (n) {
            let [r, i] = [`data-lightbox`, `data-caption`].map((e) => T(n, e)),
              a = Z(r, t.ok),
              o = Z(i, t.cap);
            if (a) {
              let t = b(`div`, {
                class: `zmImg`,
                attributes: n.alt && o ? { "data-text": n.alt } : void 0,
              });
              (O(t, `click`, () => oe(t, `s`)),
                ae(e, `beforebegin`, t),
                t.appendChild(e),
                O(n, `click`, (e) => {
                  M(t, `s`) || e.preventDefault();
                }));
            }
          }
        },
        it,
        at = h(async () => {
          if (!it) {
            await d;
            let t = await e.iFb(`app`, `database`),
              n = t.initializeApp(t.cf, `wplus-ui-view-counter`);
            it = { firebase: t, app: n, db: t.database(n) };
          }
          return it;
        }),
        ot = (t) => {
          let n = `--[[wplus-ui-view-counter]]--`,
            [r, i, a, o] = [`data-id`, `data-increment`, `data-abbreviate`, `data-watch`].map((e) =>
              T(t, e),
            );
          if (r && /^\d{18,22}$/.test(r) && t[n] !== !0) {
            t[n] = !0;
            let s = Z(a),
              c = Z(o),
              l = i == null || i === `false` ? 0 : i === `true` ? 1 : /^\d+$/.test(i) ? H(i) : 1;
            d.then(() => at()).then(async ({ firebase: n, db: i }) => {
              let a = (n) => {
                  (E(t, `data-value`, V(n)), E(t, `data-views`, V(s ? e.abvN(n).join(``) : n)));
                },
                o = (e) => {
                  (X(t), a(e.exists() ? e.val() : 0));
                },
                u = (e) => {
                  (U.warn(`View counter error:`, e, t), A(t, `error`));
                },
                d = i.ref(`/blogs/${I.bgId}/posts/${r}/views`);
              try {
                (l > 0 && (await d.set(n.database.ServerValue.increment(l))),
                  c ? d.on(`value`, (e) => o(e), u) : o(await d.get()));
              } catch (e) {
                u(e);
              }
            });
          }
        },
        st = () => {
          let e = Ae.hash.substring(1);
          if (e) {
            let t = x(e);
            t && t.scrollIntoView({ behavior: `auto` });
          }
        },
        ct,
        lt = (e) => {
          if (ct === void 0) {
            let e = C(`.pS`);
            e && (ct = Xe(e));
          }
          ct
            ? (A(e, `loaded`), (e.innerHTML = ct.outerHTML))
            : (A(e, `no-toc`), (e.innerHTML = `<p class='n'>${R.theresNothingHere}</p>`));
        },
        ut = b(`div`),
        dt = async (e, t, n = !1, r, i, a) => {
          let o = await g(() => fetch(e).then((e) => (e.ok ? e.text() : null)), r, i, a);
          if (o) {
            let e = Re().parseFromString(o, `text/html`),
              r = x(`json:data`, e),
              i = x(`json:blogposts`, e);
            if (i && r) {
              let a = p(r),
                o = p(i),
                s = [],
                c = w(`#Blog01 .blogP > ${n && t !== `updated` ? `*` : `article`}`, e);
              for (let e = 0; e < c.length; e++)
                ((ut.innerHTML = c[e].outerHTML), s.push(ut.firstChild), (ut.innerHTML = ``));
              if (a && o) {
                let n = a.bg.siId,
                  r = B.keys(o).map((e) => {
                    let t = o[e];
                    return ((t.pub = new G(t.pub)), (t.upd = new G(t.upd)), t);
                  }),
                  i = s;
                return (
                  (t === `updated` || t === `published`) &&
                    (r.sort((e, n) => {
                      if (t === `updated`) {
                        if (e.upd > n.upd) return -1;
                        if (e.upd < n.upd) return 1;
                      } else {
                        if (e.pub > n.pub) return -1;
                        if (e.pub < n.pub) return 1;
                      }
                      return 0;
                    }),
                    i.sort((e, n) => {
                      let r = T(e, `data-published`),
                        i = T(e, `data-updated`),
                        a = T(n, `data-published`),
                        o = T(n, `data-updated`);
                      if (t === `updated`) {
                        if (i && o) {
                          let e = new G(i),
                            t = new G(o);
                          if (e > t) return -1;
                          if (e < t) return 1;
                        }
                      } else if (r && a) {
                        let e = new G(r),
                          t = new G(a);
                        if (e > t) return -1;
                        if (e < t) return 1;
                      }
                      return 0;
                    })),
                  { dom: e, data: a, posts: r, elements: i, post: n && o[n] ? o[n] : null }
                );
              }
            }
          }
          return null;
        },
        ft = (e) => (e.length ? e[W.floor(W.random() * e.length)] : void 0),
        pt = (e) => (e in ge && ge[e] > 0 ? ge[e] : 0),
        mt = (e, t) => {
          let n = pt(e),
            r = n > 0;
          return [r, n, r && (v(t) ? t(e, n) : !0)];
        },
        ht = (e, t) => {
          let n = null;
          return (
            e && mt(e, t)[2]
              ? (n = e)
              : L.iPs && F.c && (n = ft(F.c.lab.filter((e) => mt(e, t)[2]))),
            n || (n = ft(B.keys(ge).filter((e) => mt(e, t)[2]))),
            n
          );
        },
        gt = async (e, t = 20, n = `published`, r = !1, i = !1, a = !1) => {
          let o = pt(e);
          if (e && o > 0) {
            let s = i && !!F.c && F.c.lab.includes(e),
              c = s ? t + 1 : t,
              l = r && o > c ? W.floor(W.random() * (o - c + 1)) : 0;
            if (s ? o >= 2 : o >= 1) {
              let r = Fe(I.cnHmU),
                i = r.searchParams,
                o;
              (l !== 0 && !e.includes(`|`) && !e.includes(`"`)
                ? ((o = !1),
                  (r.pathname = `/search`),
                  /\s/.test(e) ? i.set(`q`, `label:"${e}"`) : i.set(`q`, `label:${e}`))
                : ((o = !0), (r.pathname = `/search/label/${K(e)}`)),
                i.set(`m`, `0`),
                i.set(`view`, `x-content-blog`),
                i.set(`max-results`, V(c)),
                i.set(`sort-by`, n),
                i.set(`by-date`, V(n === `published` || n === `updated`)),
                i.set(`start`, V(l)));
              let u = await dt(r, n, a);
              if (u) {
                if (
                  (s &&
                    I.siId &&
                    ((u.elements = u.elements.filter((e) =>
                      D(e, `data-id`) ? T(e, `data-id`) !== I.siId : !0,
                    )),
                    (u.posts = u.posts.filter((e) => e.id !== I.siId))),
                  u.elements.length > t)
                ) {
                  let e = u.elements.filter((e) => e.tagName.toLowerCase() === `article`);
                  (n === `updated` ||
                    (o ? n !== `published` : n === `published`) ||
                    e.length > t) &&
                    (e.length > t && e.splice(t), (u.elements = e));
                }
                return (u.posts.length > t && u.posts.splice(t), u);
              }
            }
          }
          return null;
        },
        _t = (e, t, r = !1) => {
          if (M(e, `lazyloaded`) || (r && !M(e, `lazyload`)) || M(e, `no-lazyload`)) t();
          else {
            let r = (i) => {
              i.target === e && (k(n, `lazyloaded`, r), t());
            };
            (O(n, `lazyloaded`, r), A(e, `lazyload`));
          }
        },
        vt = (t) => {
          let n = S(`fb-views`, t);
          if (n.length) for (let e = 0; e < n.length; e++) ot(n[e]);
          (Pt().s(), e.ads && e.ads.push());
        },
        yt = (e) => {
          let [t, n, r, i, a, o, s] = [
              `data-label`,
              `data-title`,
              `data-max-results`,
              `data-sort-by`,
              `data-random`,
              `data-one-grid`,
              `data-ads`,
            ].map((t) => T(e, t)),
            c = t,
            l = n,
            u = H(r || 6),
            d = i || `published`,
            f = Z(a, !1),
            p = o === null ? void 0 : o !== `false`,
            m = Z(s, !1);
          if (c && l) {
            (E(e, `data-max-results`, u),
              E(e, `data-sort-by`, d),
              E(e, `data-random`, f),
              p !== void 0 && E(e, `data-one-grid`, p),
              E(e, `data-ads`, m));
            let t = b(`div`, { class: `blogT`, innerHTML: `<h2 class='title'>${l}</h2>` }),
              n = b(`div`, { class: `n`, innerHTML: R.loading });
            (e.appendChild(t), e.appendChild(n), A(e, `loading`));
            let r = (r, i) => {
                (j(e, `loading`), A(e, `loaded`));
                let a = b(`a`, {
                  href: `${I.cnHmU}search/label/${K(c)}`,
                  attributes: { "aria-label": R.viewAll },
                });
                if ((t.appendChild(a), j(n, `n`), A(n, `blogP`), p !== void 0)) p && A(n, `oGrd`);
                else {
                  let t = C(`#Blog01 .blogP`, i),
                    r = t && M(t, `oGrd`);
                  (E(e, `data-one-grid`, `true`), r && A(n, `oGrd`));
                }
                n.innerHTML = ``;
                for (let e = 0; e < r.length; e++) {
                  let t = r[e],
                    i = re(`script`, t);
                  (xe(i), n.appendChild(t), Se(i));
                }
                vt(n);
              },
              i = () => {
                (j(e, `loading`), A(e, `no-posts`), (n.innerHTML = R.theresNothingHere));
              },
              a = (t) => {
                (U.warn(`Categorized posts error:`, t, e),
                  j(e, `loading`),
                  A(e, `error`),
                  (n.innerHTML = z.failedToLoad));
              };
            pt(c)
              ? _t(e, async () => {
                  try {
                    let e = await gt(c, u, d, f, !1, m);
                    e && e.elements.length ? r(e.elements, e.dom) : i();
                  } catch (e) {
                    a(e);
                  }
                })
              : i();
          }
        },
        bt = (e) => {
          let t = P.rp;
          if (!L.iPv) {
            let [n, r, i, a, o, s] = [
                `data-label`,
                `data-max-results`,
                `data-sort-by`,
                `data-random`,
                `data-title`,
                `data-product-title`,
              ].map((t) => T(e, t)),
              c = `Product`,
              l = n === c || (!!F.c && F.c.lab.includes(c)),
              u = l ? c : n,
              d = o || z.relatedPosts,
              f = s || z.relatedProducts,
              p = ht(
                u,
                (e, t) => (F.c && F.c.lab.includes(e) ? t >= 2 : t >= 1) && (l ? e === c : e !== c),
              ),
              m = p === c,
              h = H(r || t.mr),
              g = i || t.sb || `published`,
              _ = Z(a, !0);
            (p && E(e, `data-label`, p),
              E(e, `data-max-results`, h),
              E(e, `data-sort-by`, g),
              E(e, `data-random`, _),
              (e.innerHTML = `<h2 class='title dt'>${m ? f : d}</h2><div class='n'>${R.loading}</div>`),
              A(e, `loading`));
            let v = C(`.n`, e),
              ee = (t) => {
                (j(e, `loading`), A(e, `loaded`), j(v, `n`), A(v, `itemRp`), (v.innerHTML = ``));
                for (let e = 0; e < t.length; e++) v.appendChild(t[e]);
                vt(v);
              },
              y = () => {
                (j(e, `loading`), A(e, `no-posts`), (v.innerHTML = R.theresNothingHere));
              },
              te = (t) => {
                (U.warn(`Related posts error:`, t, e),
                  j(e, `loading`),
                  A(e, `error`),
                  (v.innerHTML = z.failedToLoad));
              };
            p
              ? _t(e, async () => {
                  try {
                    let e = await gt(p, h, g, _, !0, !1);
                    e && e.elements.length ? ee(e.elements) : y(e);
                  } catch (e) {
                    te(e);
                  }
                })
              : y();
          }
        },
        xt = (e) => {
          if (L.iPv)
            (A(e, `unavailable`),
              (e.innerHTML = `<p class='n'>The feature 'Automatic Related Posts' is not available in preview mode.</p>`));
          else {
            let [t, n, r, i] = [
                `data-label`,
                `data-max-results`,
                `data-sort-by`,
                `data-random`,
              ].map((t) => T(e, t)),
              a = ht(t, (e, t) => (F.c && F.c.lab.includes(e) ? t >= 2 : t >= 1)),
              o = H(n || 6),
              s = r || `updated`,
              c = Z(i, !0),
              l = a && F.c && F.c.lab.includes(a) ? o + 1 : o;
            if (
              (a && E(e, `data-label`, a),
              E(e, `data-max-results`, o),
              E(e, `data-sort-by`, s),
              E(e, `data-random`, c),
              A(e, `loading`),
              a)
            ) {
              let t = pt(a),
                n = o <= t ? o : t,
                r = `<ol>`;
              for (let e = 0; e < n; e++) r += `<li></li>`;
              ((r += `</ol>`), (e.innerHTML = r));
            }
            let u = () => {
                (j(e, `loading`),
                  A(e, `no-posts`),
                  (e.innerHTML = `<p class='n'>${R.theresNothingHere}</p>`));
              },
              d = (t) => {
                (U.warn(`Auto related posts error:`, t, e),
                  j(e, `loading`),
                  A(e, `error`),
                  (e.innerHTML = `<p class='n'>${z.failedToLoad}</p>`));
              },
              f = (t) => {
                (j(e, `loading`), A(e, `loaded`));
                let n = `<ol data-label='${N(a)}'>`;
                for (let e = 0; e < t.length; e++) {
                  let r = t[e];
                  n += `<li><a href='${N(r.url)}' aria-label='${r.ttl}'><span>${r.ttl}</span></a></li>`;
                }
                ((n += `</ol>`), (e.innerHTML = n));
              };
            a
              ? _t(e, async () => {
                  try {
                    let e = await gt(a, l, s, c, !0, !1);
                    e && e.posts.length ? f(e.posts) : u();
                  } catch (e) {
                    d(e);
                  }
                })
              : u();
          }
        },
        St = (e, t) =>
          `<a class='${t ? `n` : `o`}' href='${N(e.url)}' aria-label='${e.ttl}'><div class='b' data-text='${N(t ? z.next : z.previous)}'></div><div class='t' data-text='${e.ttl}'></div></a>`,
        Ct = (e) => {
          let t = D(e, `data-older`) ? T(e, `data-older`) : _e.old,
            n = D(e, `data-newer`) ? T(e, `data-newer`) : _e.new;
          (t && E(e, `data-older`, t), n && E(e, `data-newer`, n), A(e, `loading`));
          let r = ([t, n]) => {
              (X(e),
                j(e, `loading`),
                A(e, `loaded`),
                (e.innerHTML = `${t ? St(t) : ``}${n ? St(n, !0) : ``}`));
            },
            i = () => {
              (Ie(e),
                j(e, `loading`),
                A(e, `no-post`),
                (e.innerHTML = `<p class='n'>${R.theresNothingHere}</p>`));
            },
            a = (t) => {
              (U.warn(`Posts pagination error:`, t, e),
                Ie(e),
                j(e, `loading`),
                A(e, `error`),
                (e.innerHTML = `<p class='n'>${z.failedToLoad}</p>`));
            };
          t || n
            ? _t(e, async () => {
                try {
                  let [e, a] = await we.all(
                    [t, n].map(async (e) => {
                      if (e) {
                        let t = new Ee(e),
                          n = t.searchParams;
                        (n.set(`m`, `0`), n.set(`view`, `x-content-blog`));
                        let r = await dt(t);
                        if (r && r.post) return r.post;
                      }
                      return null;
                    }),
                  );
                  e || a ? r([e, a]) : i();
                } catch (e) {
                  a(e);
                }
              })
            : i();
        },
        wt = {
          af: `Afrikaans`,
          sq: `Albanian`,
          am: `Amharic`,
          ar: `Arabic`,
          hy: `Armenian`,
          as: `Assamese`,
          ay: `Aymara`,
          az: `Azerbaijani`,
          bm: `Bambara`,
          eu: `Basque`,
          be: `Belarusian`,
          bn: `Bengali`,
          bho: `Bhojpuri`,
          bs: `Bosnian`,
          bg: `Bulgarian`,
          ca: `Catalan`,
          ceb: `Cebuano`,
          ny: `Chichewa`,
          "zh-CN": `Chinese (Simplified)`,
          "zh-TW": `Chinese (Traditional)`,
          co: `Corsican`,
          hr: `Croatian`,
          cs: `Czech`,
          da: `Danish`,
          dv: `Dhivehi`,
          doi: `Dogri`,
          nl: `Dutch`,
          en: `English`,
          eo: `Esperanto`,
          et: `Estonian`,
          ee: `Ewe`,
          tl: `Filipino`,
          fi: `Finnish`,
          fr: `French`,
          fy: `Frisian`,
          gl: `Galician`,
          ka: `Georgian`,
          de: `German`,
          el: `Greek`,
          gn: `Guarani`,
          gu: `Gujarati`,
          ht: `Haitian Creole`,
          ha: `Hausa`,
          haw: `Hawaiian`,
          iw: `Hebrew`,
          hi: `Hindi`,
          hmn: `Hmong`,
          hu: `Hungarian`,
          is: `Icelandic`,
          ig: `Igbo`,
          ilo: `Ilocano`,
          id: `Indonesian`,
          ga: `Irish Gaelic`,
          it: `Italian`,
          ja: `Japanese`,
          jw: `Javanese`,
          kn: `Kannada`,
          kk: `Kazakh`,
          km: `Khmer`,
          rw: `Kinyarwanda`,
          gom: `Konkani`,
          ko: `Korean`,
          kri: `Krio`,
          ku: `Kurdish (Kurmanji)`,
          ckb: `Kurdish (Sorani)`,
          ky: `Kyrgyz`,
          lo: `Lao`,
          la: `Latin`,
          lv: `Latvian`,
          ln: `Lingala`,
          lt: `Lithuanian`,
          lg: `Luganda`,
          lb: `Luxembourgish`,
          mk: `Macedonian`,
          mai: `Maithili`,
          mg: `Malagasy`,
          ms: `Malay`,
          ml: `Malayalam`,
          mt: `Maltese`,
          mi: `Maori`,
          mr: `Marathi`,
          "mni-Mtei": `Meiteilon (Manipuri)`,
          lus: `Mizo`,
          mn: `Mongolian`,
          my: `Myanmar (Burmese)`,
          ne: `Nepali`,
          no: `Norwegian`,
          or: `Odia (Oriya)`,
          om: `Oromo`,
          ps: `Pashto`,
          fa: `Persian`,
          pl: `Polish`,
          pt: `Portuguese`,
          pa: `Punjabi`,
          qu: `Quechua`,
          ro: `Romanian`,
          ru: `Russian`,
          sm: `Samoan`,
          sa: `Sanskrit`,
          gd: `Scots Gaelic`,
          nso: `Sepedi`,
          sr: `Serbian`,
          st: `Sesotho`,
          sn: `Shona`,
          sd: `Sindhi`,
          si: `Sinhala`,
          sk: `Slovak`,
          sl: `Slovenian`,
          so: `Somali`,
          es: `Spanish`,
          su: `Sundanese`,
          sw: `Swahili`,
          sv: `Swedish`,
          tg: `Tajik`,
          ta: `Tamil`,
          tt: `Tatar`,
          te: `Telugu`,
          th: `Thai`,
          ti: `Tigrinya`,
          ts: `Tsonga`,
          tr: `Turkish`,
          tk: `Turkmen`,
          ak: `Twi`,
          uk: `Ukrainian`,
          ur: `Urdu`,
          ug: `Uyghur`,
          uz: `Uzbek`,
          vi: `Vietnamese`,
          cy: `Welsh`,
          xh: `Xhosa`,
          yi: `Yiddish`,
          yo: `Yoruba`,
          zu: `Zulu`,
        },
        Tt = `WPLUS_UI_TRANSLATE`,
        Et = B.keys(wt).filter((e) => e.includes(`-`)),
        $ = (() => {
          let e = ((De.languages || [De.language || De.userLanguage])[0] || ``).trim();
          return (Et.includes(e) ? e : e.split(`-`)[0].toLowerCase()) || null;
        })(),
        Dt = `__on_load_google_translate__`,
        Ot = wt,
        kt = `__google_translator_element`,
        At,
        jt = h(
          async (e) => (
            At ||
              (At = new we((r, i) => {
                ((t[Dt] = () => {
                  let a = t.google,
                    o = n.body.appendChild(
                      b(`div`, { class: `notranslate`, id: `__google_translator_container` }),
                    ),
                    s = o.appendChild(b(`div`, { id: kt })),
                    c = a.translate.TranslateElement(
                      {
                        multilanguagePage: e,
                        layout: a.translate.TranslateElement.InlineLayout.VERTICAL,
                      },
                      kt,
                    ),
                    l = setTimeout(() => {
                      i(new Te(`Timed out, failed to load Google translate.`));
                    }, 3e4),
                    u = setInterval(() => {
                      let e = C(`select.goog-te-combo`, s);
                      if (e && e.children.length !== 0) {
                        let t = { wrapper: o, element: s, select: e, instance: c, languages: {} };
                        for (let n = 0; n < e.options.length; n++) {
                          let r = e.options[n],
                            i = r.value.trim(),
                            a = (r.textContent || r.innerText).trim();
                          i && a && (t.languages[i] = a);
                        }
                        (r(t), clearInterval(u), clearTimeout(l));
                      }
                    }, 50);
                }),
                  ue(`https://translate.google.com/translate_a/element.js?cb=${Dt}`).catch(i));
              })),
            At
          ),
        ),
        Mt = async (e = {}) => {
          a.r(`googtrans`);
          let t = e.languages || {},
            r = B.keys(Ot).reduce((e, n) => {
              let r = _(t[n]) ? t[n] : Ot[n];
              return (_(r) && (e[n] = r), e);
            }, {}),
            s = B.keys(r)
              .sort((e, t) => r[e].localeCompare(r[t]))
              .reduce((e, t) => ((e[t] = r[t]), e), {}),
            c =
              _(e.pageLanguage) && s[e.pageLanguage]
                ? e.pageLanguage
                : n.documentElement.lang || null,
            l = _(c) && s[c] ? c : `en`,
            u = Array.isArray(e.includedLanguages)
              ? e.includedLanguages
                  .filter((e) => _(e) && _(s[e]))
                  .sort((e, t) => e.localeCompare(t))
              : [],
            d = Array.isArray(e.excludedLanguages)
              ? e.excludedLanguages
                  .filter((e) => _(e) && _(s[e]))
                  .sort((e, t) => e.localeCompare(t))
              : [],
            f = e.default && [`page`, `system`].includes(e.default) ? e.default : `page`,
            p = {
              code: $,
              name: _($) && s[$] ? s[$] : null,
              supported: _($) && !!s[$],
              enabled: ee(e.system) ? e.system : !0,
            },
            m = { code: l, name: s[l] },
            h = B.keys(s)
              .filter((e) =>
                l === e || (p.enabled && p.supported && p.code === e)
                  ? !0
                  : d.includes(e)
                    ? !1
                    : u.length === 0
                      ? !0
                      : u.includes(e),
              )
              .reduce((e, t) => ((e[t] = s[t]), e), {}),
            g = i.g(Tt) || f,
            v = await jt(e.multiLanguage === !0),
            y = B.assign(new o(), {
              system: p,
              elements: { select: v.select },
              instance: v.instance,
              page: m,
              languages: s,
              included: u,
              excluded: d,
              selected: h,
              current: g,
              language: ``,
              update(e) {
                if (!_(e)) return !1;
                let t = this.elements.select,
                  n = e.trim();
                Et.includes(n) || (n = n.toLowerCase());
                let r = this.current,
                  a = this.language,
                  o = a === ``;
                ((this.current =
                  _(n) &&
                  ((n === `system` && this.system.supported && this.system.enabled) ||
                    n === `page` ||
                    this.selected[n])
                    ? n
                    : this.page.code),
                  this.current === `system`
                    ? (this.language = this.system.code)
                    : this.current === `page`
                      ? (this.language = this.page.code)
                      : (this.language = this.current),
                  i.s(Tt, this.current));
                let s = o
                    ? this.language !== this.page.code &&
                      this.current !== `page` &&
                      (this.current !== `system` || this.system.code !== this.page.code)
                    : this.language !== a && (this.current !== `system` || this.system.code !== a),
                  c = () => {
                    ((t.value = this.language), t.dispatchEvent(new Event(`change`)));
                  };
                return s
                  ? (c(),
                    c(),
                    o ||
                      this.emitSync(`change`, {
                        oldLanguage: a,
                        oldCurrent: r,
                        newLanguage: this.language,
                        newCurrent: this.current,
                      }),
                    !0)
                  : !1;
              },
              systemLanguage() {
                return this.update(`system`);
              },
              pageLanguage() {
                return this.update(`page`);
              },
              changeLanguage(e) {
                return this.update(e);
              },
            });
          return (y.update(y.current), y);
        },
        Nt,
        Pt = () => {
          if (Nt) return Nt;
          let e = {
            k: `WPLUS_UI_STORAGE`,
            d() {
              let e = i.gZ(this.k);
              return e && e.bookmarks ? e.bookmarks : {};
            },
            b: [],
            i: null,
            g(e) {
              return this.d()[e] || null;
            },
            h(e) {
              return !!this.g(e);
            },
            a(e) {
              let t = this.d();
              ((t[e.id] = e), i.sZ(this.k, { bookmarks: t }), this.s());
            },
            r(e) {
              let t = this.d();
              return e in t ? (delete t[e], i.sZ(this.k, { bookmarks: t }), this.s(), !0) : !1;
            },
            s() {
              let e = this.d(),
                t = B.keys(e),
                n = C(`.wBkm`);
              n && X(n);
              let r = x(`dBmPs`);
              if (r)
                if ((this.i || (this.i = r.innerHTML), t.length)) {
                  r.innerHTML = ``;
                  for (let n = 0; n < t.length; n++) {
                    let i = e[t[n]],
                      a = `<div class='pThmb${i.image ? `` : ` nul`}'><a class='thmb' href='${N(i.url)}'>${i.image ? `<img alt='${N(i.title)}' class='imgThm lazyload' src='${Me}' data-src='${N(i.image)}' width='240' height='240'>` : `<span class='imgThm' data-text='${N(z.noImage)}'></span>`}</a></div><div class='itmC'><div class='itmTtl'><a href='${N(i.url)}'>${N(i.title)}</a></div>`;
                    if (i.labels && i.labels.length) {
                      a += `<div class='pLbls' data-text='${ve.labels}'>`;
                      for (let e = 0; e < i.labels.length; e++) {
                        let t = i.labels[e];
                        if (
                          ((a += ` <a aria-label='${N(t)}' data-text='${N(t)}' href='${N(`${I.cnHmU}search/label/${encodeURI(t)}`)}' rel='tag'> </a> `),
                          e === 1)
                        )
                          break;
                      }
                      a += `</div>`;
                    }
                    a += `</div><button type='button' aria-label='Delete' class='del'>${Q.delete}</button>`;
                    let o = b(`div`, { class: `item`, innerHTML: a });
                    (O(C(`.del`, o), `click`, () => this.r(i.id)), r.appendChild(o));
                  }
                } else r.innerHTML = this.i;
              let i = C(`.tBkm`);
              i && (t.length ? E(i, `data-text`, V(t.length)) : ie(i, `data-text`));
              let a = S(`bm-button`);
              for (let e = 0; e < a.length; e++) {
                let t = a[e],
                  [n, r, i, o, s, c, l, u] = [
                    `data-bm-id`,
                    `data-bm-url`,
                    `data-bm-title`,
                    `data-bm-image`,
                    `data-bm-published`,
                    `data-bm-updated`,
                    `data-bm-snippet`,
                    `data-bm-labels`,
                  ].map((e) => T(t, e));
                (this.b.includes(t) ||
                  (O(t, `click`, () => {
                    if (this.h(n)) (this.r(n), fe(N(z.removedFromBookmarks)));
                    else {
                      let e = { id: n, url: r, title: i, image: o, timestamp: new G().toJSON() };
                      if (
                        (s && (e.published = s),
                        c && (e.updated = c),
                        l !== null && (e.snippet = l),
                        u)
                      )
                        try {
                          e.labels = Ce.parse(u);
                        } catch (t) {
                          e.labels = [];
                        }
                      (this.a(e), fe(N(z.addedToBookmarks)));
                    }
                  }),
                  this.b.push(t)),
                  this.h(n) ? A(t, `added`) : j(t, `added`));
              }
            },
          };
          return (
            Be(e.k, () => {
              e.s();
            }),
            Ve(() => {
              e.s();
            }),
            (Nt = e),
            Nt
          );
        },
        Ft = () => {
          if (!L.iBt) {
            let e = Ue();
            (A(Y, `lzD`),
              e.sB(),
              We().start(),
              P.pb.ok &&
                ue(`https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace.min.js`, {
                  crossOrigin: `anonymous`,
                  referrerPolicy: `no-referrer`,
                  attributes: { "data-pace-options": je({ startOnPageLoad: !1 }) },
                }).then(() => {
                  let e = Pace.options,
                    t = `determinate`;
                  ((e.className = e.className ? `${e.className} ${t}` : t), Pace.start());
                }),
              de({ ui: e }));
          }
        },
        It = () => {
          let e = w(`.aToc, #postToc .tocIn`);
          for (let t = 0; t < e.length; t++)
            if ((lt(e[t]), ct)) {
              let e = x(`postToc`);
              (e && X(e), st());
            }
          if (!L.iBt) {
            let e = C(`.sldW`, n.body);
            if (e) {
              let t = T(e, `data-auto-advance-after`),
                n = re(`input`, e);
              if (t && n.length > 1) {
                A(e, `a`);
                let r = H(t),
                  i = () => {
                    for (let e = 0; e < n.length; e++) if (n[e].checked) return e;
                    return -1;
                  },
                  a = () => {
                    let e = i();
                    return e === n.length - 1 ? 0 : e + 1;
                  },
                  o = () => {
                    let e = a();
                    n[e].checked = !0;
                  },
                  s,
                  c = () => {
                    (clearInterval(s), j(e, `play`), A(e, `pause`));
                  },
                  l = () => {
                    (c(), (s = setInterval(o, r * 1e3)), j(e, `pause`), A(e, `play`));
                  };
                (l(), O(e, `mouseover`, c), O(e, `mouseout`, l));
              }
            }
            let r = C(`.js-cookieconsent`);
            if (
              (r &&
                (X(r, !0, !1),
                setTimeout(() => {
                  let e = T(r, `data-max-age-sec`),
                    t = C(`button`, r),
                    n = `WPLUS_UI_COOKIE_CONSENT`,
                    i = `accepted`;
                  t &&
                    a.g(n) !== i &&
                    (A(r, `v`),
                    D(r, `aria-hidden`) && E(r, `aria-hidden`, `false`),
                    O(t, `click`, () => {
                      (j(r, `v`),
                        D(r, `aria-hidden`) && E(r, `aria-hidden`, `true`),
                        a.s(n, i, { maxAge: e ? H(e) : 2592e3 }));
                    }));
                }, 200)),
              P.sb.ok)
            ) {
              let e = `Scroll to bottom`,
                r = b(`button`, {
                  type: `button`,
                  class: `tTb b`,
                  attributes: { "aria-label": e },
                  innerHTML: `<svg viewBox='0 0 34 34'><g transform='translate(0, 34) rotate(-90)' stroke-width='2.2' stroke='currentColor' stroke-linecap='round'><circle cx='17' cy='17' r='15.92'></circle><circle cx='17' cy='17' r='15.92' fill='none' stroke-dasharray='100, 100'></circle><path d='M15.07,21.06,19.16,17l-4.09-4.06' fill='none' stroke-width='1.25'></path></g></svg>`,
                }),
                i = C(`circle:last-of-type`, r);
              n.body.appendChild(r);
              let a = () => (Y.scrollHeight || n.body.scrollHeight) - t.innerHeight,
                o = () => t.pageYOffset || Y.scrollTop || n.body.scrollTop || 0,
                s = () => {
                  let e = (o() / a()) * 100;
                  return (e < 0 ? (e = 0) : e > 100 && (e = 100), e);
                },
                c = () => {
                  let t = s(),
                    a = n.dir === `rtl` ? t - 100 : 100 - t;
                  ((i.style.strokeDashoffset = a),
                    o() <= 20
                      ? (A(r, `b`), E(r, `aria-label`, e))
                      : (j(r, `b`), E(r, `aria-label`, `Scroll to top`)));
                };
              (c(),
                O(t, `scroll`, c),
                O(r, `click`, () => t.scrollTo({ top: o() <= 20 ? a() : 0, behavior: `smooth` })));
            }
          }
        },
        Lt = () => {
          if (!L.iBt) {
            let t = Pt();
            (t.s(), (be.bkm = t));
            let r = x(`postBody`),
              i = x(`postReadTime`);
            r && i && E(i, `data-minutes`, V(W.max(1, W.floor(e.rdTm(r)))));
            let a = w(
              [
                `.pS .separator >a`,
                `.pS .tr-caption-container td >a`,
                `.pS .separator >img`,
                `.pS .tr-caption-container td >img`,
                `.pS .psImg img`,
                `.pS .glImg img`,
                `.pS .lbx img`,
                `figure img`,
              ].join(`, `),
            );
            if (a.length) for (let e = 0; e < a.length; e++) rt(a[e]);
            let o = w(`code, .cmCo i[rel=pre], .cmCo i[rel=code]`);
            if (o.length) for (let e = 0; e < o.length; e++) nt(o[e]);
            let l = S(`aCat`);
            for (let e = 0; e < l.length; e++) yt(l[e]);
            let d = S(`aRps`);
            for (let e = 0; e < d.length; e++) bt(d[e]);
            let f = S(`aRel`);
            for (let e = 0; e < f.length; e++) xt(f[e]);
            if (L.iPs) {
              let e = S(`aChp`);
              if (e.length) for (let t = 0; t < e.length; t++) Ct(e[t]);
            }
            let p = S(`fb-views`);
            if (p.length) for (let e = 0; e < p.length; e++) ot(p[e]);
            let m = w(`details.tr`);
            if (m.length) for (let e = 0; e < m.length; e += 1) Ge(m[e]);
            !L.iPv &&
              P.qe.ok &&
              P.qe.sc &&
              e.iAdm().then((e) => {
                if (e) {
                  let e = (e, t, n) =>
                      `<a href='${N(t)}' rel='noreferrer noopener nofollow' target='_blank' title='${N(e)}'>${n}</a>`,
                    t = b(`div`, {
                      class: `qeF`,
                      innerHTML: `<input class='qeI' id='forQuickEdit' type='checkbox' hidden=''><label class='fCls' for='forQuickEdit'></label><label class='qeT' for='forQuickEdit'>${Q.settingCross}</label><div class='qeL'>${e(`Blog settings`, `${I.bgrU}/blog/settings/${I.bgId}`, Q.setting)}${e(`Blog comments`, `${I.bgrU}/blog/comments/${I.bgId}`, Q.comment)}${e(`Blog stats (week)`, `${I.bgrU}/blog/stats/week/${I.bgId}`, Q.stat)}${e(`Layout`, `${I.bgrU}/blog/layout/${I.bgId}`, Q.element2)}${e(`Theme Designer`, `${I.bgrU}/blog/themes/customizer/${I.bgId}`, Q.brushBig)}${e(`Edit HTML`, `${I.bgrU}/blog/themes/edit/${I.bgId}`, Q.html5)}${e(L.iPg ? `Pages dashboard` : `Posts dashboard`, L.iPg ? `${I.bgrU}/blog/pages/${I.bgId}` : `${I.bgrU}/blog/posts/${I.bgId}`, Q.list)}${L.iPg || L.iPs ? e(L.iPg ? `Edit page` : `Edit post`, L.iPg ? `${I.bgrU}/blog/page/edit/${I.bgId}/${L.pgId}` : `${I.bgrU}/blog/post/edit/${I.bgId}/${L.psId}`, Q.pencil) : ``}${e(`Backup Theme`, `${I.bgrU}/blogger-nongwt.g?blogID=${I.bgId}&action=download`, Q.documentDownload)}${e(`Backup content`, `${I.bgrU}/feeds/${I.bgId}/archive?authuser=0`, Q.download)}${!I.iPrB && !L.iEr ? e(`PageSpeed Insights`, `https://pagespeed.web.dev/analysis?url=${K(L.url)}`, Q.speedometer) : ``}${!I.iPr && !I.iPrB && !L.iEr ? e(`Rich Results Test`, `https://search.google.com/test/rich-results?url=${K(L.url)}`, Q.ranking) : ``}${!I.iPr && !I.iPrB && !L.iEr && P.amp.ok ? e(`AMP Test`, `https://search.google.com/test/amp?url=${K(L.url)}`, Q.flash1) : ``}</div>`,
                    });
                  n.body.appendChild(t);
                }
              });
            let h = P.ls,
              g = h.mr || 50;
            if (!L.iPrB && h.ok) {
              let t = x(`sec_Header_Search`),
                r = x(`forSearch`);
              if (t && r) {
                let i = C(`form`, t);
                if (i) {
                  let a = () => r.value.trim(),
                    o = () => {
                      e.iBF()
                        .then((e) => {
                          let n = new e(Fe(I.cnHmU), { jsonp: !0 }),
                            o = t.appendChild(b(`div`, { class: `wSrl` })),
                            c = o.appendChild(b(`div`, { class: `srlM` })),
                            l = se((e) => {
                              n.posts
                                .query(e, { summary: !0, maxResults: g + 1 })
                                .then((t) => {
                                  if (a() === e)
                                    if (t.length) {
                                      let n = `<div class='srlH'><div class='q' data-search='${R.search}' data-query='${N(e)}'></div>`;
                                      (e.length >= 3 &&
                                        (t.totalResults > g || t.length > g) &&
                                        (!L.sr ||
                                          !L.sr.q ||
                                          L.sr.q.trim().toLowerCase() !== e.trim().toLowerCase()) &&
                                        (n += `<a class='l' aria-label='${R.viewAll}' href='${`${I.srU}?q=${K(e)}`}'></a>`),
                                        (n += `</div><div class='srlC'>`));
                                      for (let r = 0; r < (t.length > g ? g : t.length); r += 1) {
                                        let i = t[r];
                                        if (
                                          ((n += `<div class='item'><div class='pThmb${i.thumbnail ? `` : ` nul`}'><a class='thmb' href='${N(i.url)}'>${i.thumbnail ? `<img alt='${N(i.title)}' class='imgThm lazyload' src='${Me}' data-src='${N(new s(i.thumbnail).remove(/./).concat(`w240-h240-p-k-no-nu`).href())}' width='240' height='240'>` : `<span class='imgThm' data-text='${N(z.noImage)}'></span>`}</a></div><div class='itmC'><div class='itmTtl'><a href='${N(i.url)}'>${N(i.title).replace(RegExp(`(${ce(N(e))})`, `gi`), `<u>$1</u>`)}</a></div>`),
                                          i.labels && i.labels.length)
                                        ) {
                                          n += `<div class='pLbls' data-text='${ve.labels}'>`;
                                          for (let e = 0; e < i.labels.length; e++) {
                                            let t = i.labels[e];
                                            if (
                                              ((n += ` <a aria-label='${N(t)}' data-text='${N(t)}' href='${N(`${I.cnHmU}search/label/${encodeURI(t)}`)}' rel='tag'> </a> `),
                                              e === 1)
                                            )
                                              break;
                                          }
                                          n += `</div>`;
                                        }
                                        n += `</div></div>`;
                                      }
                                      ((n += `</div>`), (c.innerHTML = n));
                                    } else
                                      c.innerHTML = `<div class='srlC'><div class='n'>${R.noResultsFound}</div></div>`;
                                })
                                .catch((t) => {
                                  (U.warn(`Live search error:`, t),
                                    a() === e &&
                                      (c.innerHTML = `<div class='srlC'><div class='n'>${z.failedToLoad}</div></div>`));
                                });
                            }, 200),
                            u = ``,
                            d = () => {
                              let e = a();
                              (u !== e &&
                                (e.length
                                  ? (A(o, `a`),
                                    (c.innerHTML = `<div class='srlC'><div class='n'>${R.loading}</div></div>`),
                                    l(e))
                                  : j(o, `a`)),
                                (u = e));
                            };
                          (O(r, `change`, d),
                            O(r, `keyup`, d),
                            O(i, `reset`, () => {
                              ((r.value = ``),
                                T(r, `value`) !== r.value && E(r, `value`, r.value),
                                d());
                            }),
                            d());
                        })
                        .catch((e) => {
                          U.warn(`Live search error:`, e);
                        });
                    };
                  if (a().trim().length || n.activeElement === r) o();
                  else {
                    let e = () => {
                      (k(r, `focus`, e), k(r, `input`, e), o());
                    };
                    (O(r, `focus`, e), O(r, `input`, e));
                  }
                }
              }
            }
            if (!L.iPv) {
              let t = P.pg,
                n =
                  L.iMi &&
                  !L.url.includes(`updated-max=`) &&
                  !L.url.includes(`updated-min=`) &&
                  !L.url.includes(`start=`),
                r = L.iMi && !I.iPrB && (L.iHm || (L.iSr && !L.sr) || (L.sr && L.sr.l)),
                i = {
                  tp: t.ifTyp - 1,
                  el: { ps: `.blogP`, pg: `.blogN`, an: `.blogN .olLnk` },
                  tg: { ar: `.blogP .ntry`, an: `.blogN .olLnk` },
                  bt: {
                    ld: `<button type='button' class='jsLd' aria-label='${R.loadMorePosts}' data-text='${R.loadMorePosts}'></button>`,
                    ldg: `<div class='jsLd wait nPst' data-text='${R.loading}'><svg viewBox='0 0 50 50' x='0px' y='0px'><path d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'><animateTransform attributeName='transform' attributeType='xml' dur='0.6s' from='0 25 25' repeatCount='indefinite' to='360 25 25' type='rotate'></animateTransform></path></svg></div>`,
                    ldd: `<div class='jsLd nPst' data-text='${R.noResultsFound}'></div>`,
                    err: `<button type='button' class='jsLd error' aria-label='${R.loadMorePosts}' data-text='${R.moreEllipsis}'></button>`,
                  },
                  cl: { pg: `infP` },
                },
                a = () => {
                  if (n) {
                    let t = new c(i);
                    return (
                      t.on(`load`, (t) => {
                        for (let e = 0; e < t.length; e++) {
                          let n = S(`fb-views`, t[e]);
                          if (n.length) for (let e = 0; e < n.length; e++) ot(n[e]);
                        }
                        (Pt().s(), e.ads && e.ads.push());
                      }),
                      (ye.iS = t),
                      !0
                    );
                  }
                  return !1;
                },
                o = async () => (r ? u().then((e) => (e && (ye.nP = e), e)) : !1);
              switch (t.bgTyp) {
                case 1:
                  break;
                case 2:
                  a();
                  break;
                case 3:
                  o();
                  break;
                case 4:
                  let e = o();
                  (e.then((e) => {
                    e || a();
                  }),
                    e.catch(a));
                  break;
              }
            }
            let _ = me.gtr,
              v = C(`.isTrans > label`),
              ee = C(`.wTrans`),
              y = C(`.transC`);
            if (v && ee && y) {
              if ((X(ee), _.dr)) {
                let e = n.dir,
                  t = () => {
                    let t = e;
                    (M(Y, `translated-ltr`) ? (t = `ltr`) : M(Y, `translated-rtl`) && (t = `rtl`),
                      n.dir !== t && (n.dir = t));
                  };
                (t(),
                  new MutationObserver(t).observe(Y, {
                    attributes: !0,
                    attributeFilter: [`class`],
                  }));
              }
              ((y.innerHTML = `<div class='n w'>${R.loading}</div>`),
                Mt({
                  pageLanguage: _.pl,
                  languages: _.nm,
                  default: _.df,
                  system: _.se,
                  includedLanguages: _.il,
                  excludedLanguages: _.el,
                  multiLanguage: _.ml,
                })
                  .then((e) => {
                    y.innerHTML = ``;
                    let t = () => {
                        switch (
                          (E(v, `data-language`, e.language),
                          E(v, `data-current`, e.current),
                          j(v, `s`, `p`, `l`),
                          e.current)
                        ) {
                          case `system`:
                            A(v, `s`);
                            break;
                          case `page`:
                            A(v, `p`);
                            break;
                          default:
                            A(v, `l`);
                        }
                        let t = re(`button`, y);
                        for (let n = 0; n < t.length; n++) {
                          let r = t[n];
                          T(r, `data-code`) === e.current ? A(r, `s`) : j(r, `s`);
                        }
                      },
                      n = [{ code: `page`, name: _.nm.page || `Page Language` }];
                    e.system.supported &&
                      e.system.enabled &&
                      n.push({ code: `system`, name: _.nm.system || `System Language` });
                    for (let t in e.selected) n.push({ code: t, name: e.selected[t] });
                    for (let r = 0; r < n.length; r++) {
                      let i = n[r],
                        a = b(`button`, {
                          type: `button`,
                          attributes: { "data-code": i.code, "aria-label": i.name },
                        });
                      (O(a, `click`, () => {
                        (e.changeLanguage(T(a, `data-code`)), t());
                      }),
                        y.appendChild(a));
                    }
                    t();
                  })
                  .catch((e) => {
                    (U.warn(`Google translate error:`, e),
                      (y.innerHTML = `<div class='n e'>${z.failedToLoad}</div>`));
                  }));
            }
          }
        };
      (f.then(() => {
        (Ft(),
          d.then(() => {
            (setTimeout(Lt, 20), m.resolve());
          }));
      }),
        d.then(() => setTimeout(It, 20)),
        (be.rVC = ot),
        (be.rSH = nt),
        de({ gToc: Xe, pSBC: ze }));
    })(PU, window, document, () => {
      let e = (e) => {
          if (typeof e != `function`) throw TypeError(`Argument 'fn' must be of type function`);
          let t = Promise.resolve();
          return async (...n) => {
            let r = () => e(...n);
            return ((t = t.then(r, r)), t);
          };
        },
        t = async (e, t = `11.9.0`) =>
          self.importScripts(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${t}/${e}`),
        n = e(async (e) => {
          if (
            (self.hljs ||
              (await t(`highlight.min.js`), self.hljs.configure({ classPrefix: `hl-` })),
            e && e.length)
          ) {
            let n = Promise.resolve();
            for (let r = 0; r < e.length; r++) {
              let i = e[r];
              typeof i == `string` &&
                (self.hljs.getLanguage(i) ||
                  (n = n.then(() => t(`languages/${i.toLowerCase()}.min.js`))));
            }
            await n;
          }
          return self.hljs;
        });
      return {
        async highlight(e, t = {}) {
          let r = [];
          t.language && r.push(t.language);
          let i = await n(r),
            a = t.language
              ? i.highlight(e, t)
              : t.subset
                ? i.highlightAuto(e, t.subset)
                : i.highlightAuto(e);
          return { illegal: a.illegal, language: a.language, value: a.value };
        },
      };
    });
  })());
/* @endinclude */

/*--[ Custom JS Lazy ]--*/
