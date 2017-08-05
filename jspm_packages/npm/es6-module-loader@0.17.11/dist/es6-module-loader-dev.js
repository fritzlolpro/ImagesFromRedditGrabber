/* */ 
(function(process) {
  !function(a) {
    function b(a, c) {
      if ("string" != typeof a)
        throw new TypeError("URL must be a string");
      var d = String(a).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
      if (!d)
        throw new RangeError("Invalid URL format");
      var e = d[1] || "",
          f = d[2] || "",
          g = d[3] || "",
          h = d[4] || "",
          i = d[5] || "",
          j = d[6] || "",
          k = d[7] || "",
          l = d[8] || "",
          m = d[9] || "";
      if (void 0 !== c) {
        var n = c instanceof b ? c : new b(c),
            o = !e && !h && !f;
        !o || k || l || (l = n.search), o && "/" !== k[0] && (k = k ? (!n.host && !n.username || n.pathname ? "" : "/") + n.pathname.slice(0, n.pathname.lastIndexOf("/") + 1) + k : n.pathname);
        var p = [];
        k.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(a) {
          "/.." === a ? p.pop() : p.push(a);
        }), k = p.join("").replace(/^\//, "/" === k[0] ? "/" : ""), o && (j = n.port, i = n.hostname, h = n.host, g = n.password, f = n.username), e || (e = n.protocol);
      }
      "file:" == e && (k = k.replace(/\\/g, "/")), this.origin = h ? e + ("" !== e || "" !== h ? "//" : "") + h : "", this.href = e + (e && h || "file:" == e ? "//" : "") + ("" !== f ? f + ("" !== g ? ":" + g : "") + "@" : "") + h + k + l + m, this.protocol = e, this.username = f, this.password = g, this.host = h, this.hostname = i, this.port = j, this.pathname = k, this.search = l, this.hash = m;
    }
    a.URLPolyfill = b;
  }("undefined" != typeof self ? self : global), function(a) {
    function b(a, b) {
      return a instanceof Error ? (a.message = b + "\n	" + a.message, Error.call(a, a.message)) : a = b + "\n	" + a, a;
    }
    function c(a, c, d) {
      try {
        new Function(a).call(d);
      } catch (e) {
        throw b(e, "Evaluating " + c);
      }
    }
    function d() {}
    function e(b) {
      this._loader = {
        loaderObj: this,
        loads: [],
        modules: {},
        importPromises: {},
        moduleRecords: {}
      }, k(this, "global", {get: function() {
          return a;
        }});
    }
    function f() {
      e.call(this), this.paths = {};
    }
    function g(a, b) {
      var c,
          d = "",
          e = 0;
      for (var f in a) {
        var g = f.split("*");
        if (g.length > 2)
          throw new TypeError("Only one wildcard in a path is permitted");
        if (1 == g.length) {
          if (b == f)
            return a[f];
          if (b.substr(0, f.length - 1) == f.substr(0, f.length - 1) && (b.length < f.length || b[f.length - 1] == f[f.length - 1]) && "/" == a[f][a[f].length - 1])
            return a[f].substr(0, a[f].length - 1) + (b.length > f.length ? "/" + b.substr(f.length) : "");
        } else {
          var h = g[0].length;
          h >= e && b.substr(0, g[0].length) == g[0] && b.substr(b.length - g[1].length) == g[1] && (e = h, d = f, c = b.substr(g[0].length, b.length - g[1].length - g[0].length));
        }
      }
      var i = a[d];
      return "string" == typeof c && (i = i.replace("*", c)), i;
    }
    function h() {}
    var i = ("undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts, "undefined" != typeof window && "undefined" != typeof document),
        j = "undefined" != typeof process && "undefined" != typeof process.platform && !!process.platform.match(/^win/);
    a.console || (a.console = {assert: function() {}});
    var k,
        l = Array.prototype.indexOf || function(a) {
          for (var b = 0,
              c = this.length; c > b; b++)
            if (this[b] === a)
              return b;
          return -1;
        };
    !function() {
      try {
        Object.defineProperty({}, "a", {}) && (k = Object.defineProperty);
      } catch (a) {
        k = function(a, b, c) {
          try {
            a[b] = c.value || c.get.call(a);
          } catch (d) {}
        };
      }
    }();
    var m;
    if ("undefined" != typeof document && document.getElementsByTagName) {
      if (m = document.baseURI, !m) {
        var n = document.getElementsByTagName("base");
        m = n[0] && n[0].href || window.location.href;
      }
      m = m.split("#")[0].split("?")[0], m = m.substr(0, m.lastIndexOf("/") + 1);
    } else if ("undefined" != typeof process && process.cwd)
      m = "file://" + (j ? "/" : "") + process.cwd() + "/", j && (m = m.replace(/\\/g, "/"));
    else {
      if ("undefined" == typeof location)
        throw new TypeError("No environment baseURI");
      m = a.location.href;
    }
    var o = a.URLPolyfill || a.URL;
    k(d.prototype, "toString", {value: function() {
        return "Module";
      }}), function() {
      function f(a) {
        return {
          status: "loading",
          name: a,
          linkSets: [],
          dependencies: [],
          metadata: {}
        };
      }
      function g(a, b, c) {
        return new Promise(n({
          step: c.address ? "fetch" : "locate",
          loader: a,
          moduleName: b,
          moduleMetadata: c && c.metadata || {},
          moduleSource: c.source,
          moduleAddress: c.address
        }));
      }
      function h(a, b, c, d) {
        return new Promise(function(e, f) {
          e(a.loaderObj.normalize(b, c, d));
        }).then(function(b) {
          var c;
          if (a.modules[b])
            return c = f(b), c.status = "linked", c.module = a.modules[b], c;
          for (var d = 0,
              e = a.loads.length; e > d; d++)
            if (c = a.loads[d], c.name == b)
              return c;
          return c = f(b), a.loads.push(c), i(a, c), c;
        });
      }
      function i(a, b) {
        j(a, b, Promise.resolve().then(function() {
          return a.loaderObj.locate({
            name: b.name,
            metadata: b.metadata
          });
        }));
      }
      function j(a, b, c) {
        m(a, b, c.then(function(c) {
          return "loading" == b.status ? (b.address = c, a.loaderObj.fetch({
            name: b.name,
            metadata: b.metadata,
            address: c
          })) : void 0;
        }));
      }
      function m(b, d, e) {
        e.then(function(e) {
          return "loading" == d.status ? Promise.resolve(b.loaderObj.translate({
            name: d.name,
            metadata: d.metadata,
            address: d.address,
            source: e
          })).then(function(a) {
            return d.source = a, b.loaderObj.instantiate({
              name: d.name,
              metadata: d.metadata,
              address: d.address,
              source: a
            });
          }).then(function(e) {
            if (void 0 === e)
              return d.address = d.address || "<Anonymous Module " + ++F + ">", d.isDeclarative = !0, q.call(b.loaderObj, d).then(function(b) {
                var e = a.System,
                    f = e.register;
                e.register = function(a, b, c) {
                  "string" != typeof a && (c = b, b = a), d.declare = c, d.depsList = b;
                }, c(b, d.address, {}), e.register = f;
              });
            if ("object" != typeof e)
              throw TypeError("Invalid instantiate return value");
            d.depsList = e.deps || [], d.execute = e.execute, d.isDeclarative = !1;
          }).then(function() {
            d.dependencies = [];
            for (var a = d.depsList,
                c = [],
                e = 0,
                f = a.length; f > e; e++)
              (function(a, e) {
                c.push(h(b, a, d.name, d.address).then(function(b) {
                  if (d.dependencies[e] = {
                    key: a,
                    value: b.name
                  }, "linked" != b.status)
                    for (var c = d.linkSets.concat([]),
                        f = 0,
                        g = c.length; g > f; f++)
                      p(c[f], b);
                }));
              })(a[e], e);
            return Promise.all(c);
          }).then(function() {
            d.status = "loaded";
            for (var a = d.linkSets.concat([]),
                b = 0,
                c = a.length; c > b; b++)
              s(a[b], d);
          }) : void 0;
        })["catch"](function(a) {
          d.status = "failed", d.exception = a;
          for (var b = d.linkSets.concat([]),
              c = 0,
              e = b.length; e > c; c++)
            t(b[c], d, a);
        });
      }
      function n(a) {
        return function(b, c) {
          var d = a.loader,
              e = a.moduleName,
              g = a.step;
          if (d.modules[e])
            throw new TypeError('"' + e + '" already exists in the module table');
          for (var h,
              k = 0,
              l = d.loads.length; l > k; k++)
            if (d.loads[k].name == e && (h = d.loads[k], "translate" != g || h.source || (h.address = a.moduleAddress, m(d, h, Promise.resolve(a.moduleSource))), h.linkSets.length && h.linkSets[0].loads[0].name == h.name))
              return h.linkSets[0].done.then(function() {
                b(h);
              });
          var n = h || f(e);
          n.metadata = a.moduleMetadata;
          var p = o(d, n);
          d.loads.push(n), b(p.done), "locate" == g ? i(d, n) : "fetch" == g ? j(d, n, Promise.resolve(a.moduleAddress)) : (n.address = a.moduleAddress, m(d, n, Promise.resolve(a.moduleSource)));
        };
      }
      function o(a, b) {
        var c = {
          loader: a,
          loads: [],
          startingLoad: b,
          loadingCount: 0
        };
        return c.done = new Promise(function(a, b) {
          c.resolve = a, c.reject = b;
        }), p(c, b), c;
      }
      function p(a, b) {
        if ("failed" != b.status) {
          for (var c = 0,
              d = a.loads.length; d > c; c++)
            if (a.loads[c] == b)
              return;
          a.loads.push(b), b.linkSets.push(a), "loaded" != b.status && a.loadingCount++;
          for (var e = a.loader,
              c = 0,
              d = b.dependencies.length; d > c; c++)
            if (b.dependencies[c]) {
              var f = b.dependencies[c].value;
              if (!e.modules[f])
                for (var g = 0,
                    h = e.loads.length; h > g; g++)
                  if (e.loads[g].name == f) {
                    p(a, e.loads[g]);
                    break;
                  }
            }
        }
      }
      function r(a) {
        var b = !1;
        try {
          y(a, function(c, d) {
            t(a, c, d), b = !0;
          });
        } catch (c) {
          t(a, null, c), b = !0;
        }
        return b;
      }
      function s(a, b) {
        if (a.loadingCount--, !(a.loadingCount > 0)) {
          var c = a.startingLoad;
          if (a.loader.loaderObj.execute === !1) {
            for (var d = [].concat(a.loads),
                e = 0,
                f = d.length; f > e; e++) {
              var b = d[e];
              b.module = b.isDeclarative ? {
                name: b.name,
                module: G({}),
                evaluated: !0
              } : {module: G({})}, b.status = "linked", u(a.loader, b);
            }
            return a.resolve(c);
          }
          var g = r(a);
          g || a.resolve(c);
        }
      }
      function t(a, c, d) {
        var e = a.loader;
        a: if (c)
          if (a.loads[0].name == c.name)
            d = b(d, "Error loading " + c.name);
          else {
            for (var f = 0; f < a.loads.length; f++)
              for (var g = a.loads[f],
                  h = 0; h < g.dependencies.length; h++) {
                var i = g.dependencies[h];
                if (i.value == c.name) {
                  d = b(d, "Error loading " + c.name + ' as "' + i.key + '" from ' + g.name);
                  break a;
                }
              }
            d = b(d, "Error loading " + c.name + " from " + a.loads[0].name);
          }
        else
          d = b(d, "Error linking " + a.loads[0].name);
        for (var j = a.loads.concat([]),
            f = 0,
            k = j.length; k > f; f++) {
          var c = j[f];
          e.loaderObj.failed = e.loaderObj.failed || [], -1 == l.call(e.loaderObj.failed, c) && e.loaderObj.failed.push(c);
          var m = l.call(c.linkSets, a);
          if (c.linkSets.splice(m, 1), 0 == c.linkSets.length) {
            var n = l.call(a.loader.loads, c);
            -1 != n && a.loader.loads.splice(n, 1);
          }
        }
        a.reject(d);
      }
      function u(a, b) {
        if (a.loaderObj.trace) {
          a.loaderObj.loads || (a.loaderObj.loads = {});
          var c = {};
          b.dependencies.forEach(function(a) {
            c[a.key] = a.value;
          }), a.loaderObj.loads[b.name] = {
            name: b.name,
            deps: b.dependencies.map(function(a) {
              return a.key;
            }),
            depMap: c,
            address: b.address,
            metadata: b.metadata,
            source: b.source,
            kind: b.isDeclarative ? "declarative" : "dynamic"
          };
        }
        b.name && (a.modules[b.name] = b.module);
        var d = l.call(a.loads, b);
        -1 != d && a.loads.splice(d, 1);
        for (var e = 0,
            f = b.linkSets.length; f > e; e++)
          d = l.call(b.linkSets[e].loads, b), -1 != d && b.linkSets[e].loads.splice(d, 1);
        b.linkSets.splice(0, b.linkSets.length);
      }
      function v(a, b, c) {
        try {
          var e = b.execute();
        } catch (f) {
          return void c(b, f);
        }
        return e && e instanceof d ? e : void c(b, new TypeError("Execution must define a Module instance"));
      }
      function w(a, b, c) {
        var d = a._loader.importPromises;
        return d[b] = c.then(function(a) {
          return d[b] = void 0, a;
        }, function(a) {
          throw d[b] = void 0, a;
        });
      }
      function x(a, b, c) {
        if (c[a.groupIndex] = c[a.groupIndex] || [], -1 == l.call(c[a.groupIndex], a)) {
          c[a.groupIndex].push(a);
          for (var d = 0,
              e = b.length; e > d; d++)
            for (var f = b[d],
                g = 0; g < a.dependencies.length; g++)
              if (f.name == a.dependencies[g].value) {
                var h = a.groupIndex + (f.isDeclarative != a.isDeclarative);
                if (void 0 === f.groupIndex || f.groupIndex < h) {
                  if (void 0 !== f.groupIndex && (c[f.groupIndex].splice(l.call(c[f.groupIndex], f), 1), 0 == c[f.groupIndex].length))
                    throw new TypeError("Mixed dependency cycle detected");
                  f.groupIndex = h;
                }
                x(f, b, c);
              }
        }
      }
      function y(a, b) {
        var c = a.loader;
        if (a.loads.length) {
          var d = [],
              e = a.loads[0];
          e.groupIndex = 0, x(e, a.loads, d);
          for (var f = e.isDeclarative == d.length % 2,
              g = d.length - 1; g >= 0; g--) {
            for (var h = d[g],
                i = 0; i < h.length; i++) {
              var j = h[i];
              if (f)
                A(j, a.loads, c);
              else {
                var k = v(a, j, b);
                if (!k)
                  return;
                j.module = {
                  name: j.name,
                  module: k
                }, j.status = "linked";
              }
              u(c, j);
            }
            f = !f;
          }
        }
      }
      function z(a, b) {
        var c = b.moduleRecords;
        return c[a] || (c[a] = {
          name: a,
          dependencies: [],
          module: new d,
          importers: []
        });
      }
      function A(b, c, d) {
        if (!b.module) {
          var e = b.module = z(b.name, d),
              f = b.module.module,
              g = b.declare.call(a, function(a, b) {
                if (e.locked = !0, "object" == typeof a)
                  for (var c in a)
                    f[c] = a[c];
                else
                  f[a] = b;
                for (var d = 0,
                    g = e.importers.length; g > d; d++) {
                  var h = e.importers[d];
                  if (!h.locked)
                    for (var i = 0; i < h.dependencies.length; ++i)
                      h.dependencies[i] === e && h.setters[i](f);
                }
                return e.locked = !1, b;
              }, {id: b.name});
          e.setters = g.setters, e.execute = g.execute;
          for (var h = 0,
              i = b.dependencies.length; i > h; h++) {
            var j = b.dependencies[h].value,
                k = d.modules[j];
            if (!k)
              for (var l = 0; l < c.length; l++)
                c[l].name == j && (c[l].module ? k = z(j, d) : (A(c[l], c, d), k = c[l].module));
            k.importers ? (e.dependencies.push(k), k.importers.push(e)) : e.dependencies.push(null), e.setters[h] && e.setters[h](k.module);
          }
          b.status = "linked";
        }
      }
      function B(b) {
        try {
          b.execute.call(a);
        } catch (c) {
          return c;
        }
      }
      function C(a, b) {
        return D(b.module, [], a), b.module.module;
      }
      function D(a, b, c) {
        var d = E(a, b, c);
        if (d)
          throw d;
      }
      function E(a, c, d) {
        if (!a.evaluated && a.dependencies) {
          c.push(a);
          for (var e,
              f = a.dependencies,
              g = 0,
              h = f.length; h > g; g++) {
            var i = f[g];
            if (i && -1 == l.call(c, i) && (e = E(i, c, d)))
              return e = b(e, "Error evaluating " + i.name);
          }
          if (a.failed)
            return new Error("Module failed execution.");
          if (!a.evaluated)
            return a.evaluated = !0, e = B(a), e ? a.failed = !0 : Object.preventExtensions && Object.preventExtensions(a.module), a.execute = void 0, e;
        }
      }
      var F = 0;
      e.prototype = {
        constructor: e,
        define: function(a, b, c) {
          if (this._loader.importPromises[a])
            throw new TypeError("Module is already loading.");
          return w(this, a, new Promise(n({
            step: "translate",
            loader: this._loader,
            moduleName: a,
            moduleMetadata: c && c.metadata || {},
            moduleSource: b,
            moduleAddress: c && c.address
          })));
        },
        "delete": function(a) {
          var b = this._loader;
          return delete b.importPromises[a], delete b.moduleRecords[a], b.modules[a] ? delete b.modules[a] : !1;
        },
        get: function(a) {
          return this._loader.modules[a] ? (D(this._loader.modules[a], [], this), this._loader.modules[a].module) : void 0;
        },
        has: function(a) {
          return !!this._loader.modules[a];
        },
        "import": function(a, b, c) {
          "object" == typeof b && (b = b.name);
          var d = this;
          return Promise.resolve(d.normalize(a, b)).then(function(a) {
            var b = d._loader;
            return b.modules[a] ? (D(b.modules[a], [], b._loader), b.modules[a].module) : b.importPromises[a] || w(d, a, g(b, a, {}).then(function(c) {
              return delete b.importPromises[a], C(b, c);
            }));
          });
        },
        load: function(a) {
          var b = this._loader;
          return b.modules[a] ? Promise.resolve() : b.importPromises[a] || w(this, a, new Promise(n({
            step: "locate",
            loader: b,
            moduleName: a,
            moduleMetadata: {},
            moduleSource: void 0,
            moduleAddress: void 0
          })).then(function() {
            delete b.importPromises[a];
          }));
        },
        module: function(a, b) {
          var c = f();
          c.address = b && b.address;
          var d = o(this._loader, c),
              e = Promise.resolve(a),
              g = this._loader,
              h = d.done.then(function() {
                return C(g, c);
              });
          return m(g, c, e), h;
        },
        newModule: function(a) {
          if ("object" != typeof a)
            throw new TypeError("Expected object");
          var b = new d,
              c = [];
          if (Object.getOwnPropertyNames && null != a)
            c = Object.getOwnPropertyNames(a);
          else
            for (var e in a)
              c.push(e);
          for (var f = 0; f < c.length; f++)
            (function(c) {
              k(b, c, {
                configurable: !1,
                enumerable: !0,
                get: function() {
                  return a[c];
                },
                set: function() {
                  throw new Error("Module exports cannot be changed externally.");
                }
              });
            })(c[f]);
          return Object.freeze && Object.freeze(b), b;
        },
        set: function(a, b) {
          if (!(b instanceof d))
            throw new TypeError("Loader.set(" + a + ", module) must be a module");
          this._loader.modules[a] = {module: b};
        },
        normalize: function(a, b, c) {
          return a;
        },
        locate: function(a) {
          return a.name;
        },
        fetch: function(a) {},
        translate: function(a) {
          return a.source;
        },
        instantiate: function(a) {}
      };
      var G = e.prototype.newModule;
    }();
    var p,
        q = function() {
          function b(b) {
            var d = this;
            return Promise.resolve(a["typescript" == d.transpiler ? "ts" : d.transpiler] || (d.pluginLoader || d)["import"](d.transpiler)).then(function(a) {
              a.__useDefault && (a = a["default"]);
              var e;
              return e = a.Compiler ? c : a.createLanguageService ? g : f, "(function(__moduleName){" + e.call(d, b, a) + '\n})("' + b.name + '");\n//# sourceURL=' + b.address + "!transpiled";
            });
          }
          function c(a, b) {
            var c = this.traceurOptions || {};
            c.modules = "instantiate", c.script = !1, void 0 === c.sourceMaps && (c.sourceMaps = "inline"), c.filename = a.address, c.inputSourceMap = a.metadata.sourceMap, c.moduleName = !1;
            var e = new b.Compiler(c);
            return d(a.source, e, c.filename);
          }
          function d(a, b, c) {
            try {
              return b.compile(a, c);
            } catch (d) {
              if (d.length)
                throw d[0];
              throw d;
            }
          }
          function f(a, b) {
            var c = this.babelOptions || {};
            return c.modules = "system", void 0 === c.sourceMap && (c.sourceMap = "inline"), c.inputSourceMap = a.metadata.sourceMap, c.filename = a.address, c.code = !0, c.ast = !1, b.transform(a.source, c).code;
          }
          function g(a, b) {
            var c = this.typescriptOptions || {};
            return c.target = c.target || b.ScriptTarget.ES5, void 0 === c.sourceMap && (c.sourceMap = !0), c.sourceMap && c.inlineSourceMap !== !1 && (c.inlineSourceMap = !0), c.module = b.ModuleKind.System, b.transpile(a.source, c, a.address);
          }
          return e.prototype.transpiler = "traceur", b;
        }();
    h.prototype = e.prototype, f.prototype = new h;
    var r = /^([^\/]+:\/\/|\/)/;
    f.prototype.normalize = function(a, b, c) {
      return a = a.match(r) || "." == a[0] ? new o(a, b || m).href : new o(g(this.paths, a) || a, m).href;
    }, f.prototype.locate = function(a) {
      return a.name;
    }, f.prototype.instantiate = function(b) {
      var d = this;
      return Promise.resolve(d.normalize(d.transpiler)).then(function(e) {
        return b.address === e ? {
          deps: [],
          execute: function() {
            var e = a.System,
                f = a.Reflect.Loader;
            return c("(function(require,exports,module){" + b.source + "})();", b.address, a), a.System = e, a.Reflect.Loader = f, d.newModule({
              "default": a[d.transpiler],
              __useDefault: !0
            });
          }
        } : void 0;
      });
    };
    var s;
    if ("undefined" != typeof XMLHttpRequest)
      s = function(a, b, c, d) {
        function e() {
          c(g.responseText);
        }
        function f() {
          d(new Error("XHR error" + (g.status ? " (" + g.status + (g.statusText ? " " + g.statusText : "") + ")" : "") + " loading " + a));
        }
        var g = new XMLHttpRequest,
            h = !0,
            i = !1;
        if (!("withCredentials" in g)) {
          var j = /^(\w+:)?\/\/([^\/]+)/.exec(a);
          j && (h = j[2] === window.location.host, j[1] && (h &= j[1] === window.location.protocol));
        }
        h || "undefined" == typeof XDomainRequest || (g = new XDomainRequest, g.onload = e, g.onerror = f, g.ontimeout = f, g.onprogress = function() {}, g.timeout = 0, i = !0), g.onreadystatechange = function() {
          4 === g.readyState && (0 == g.status ? g.responseText ? e() : (g.addEventListener("error", f), g.addEventListener("load", e)) : 200 === g.status ? e() : f());
        }, g.open("GET", a, !0), g.setRequestHeader && (g.setRequestHeader("Accept", "application/x-es-module, */*"), b && ("string" == typeof b && g.setRequestHeader("Authorization", b), g.withCredentials = !0)), i ? setTimeout(function() {
          g.send();
        }, 0) : g.send(null);
      };
    else if ("undefined" != typeof require && "undefined" != typeof process) {
      var t;
      s = function(a, b, c, d) {
        if ("file:///" != a.substr(0, 8))
          throw new Error('Unable to fetch "' + a + '". Only file URLs of the form file:/// allowed running in Node.');
        return t = t || require('fs'), a = j ? a.replace(/\//g, "\\").substr(8) : a.substr(7), t.readFile(a, function(a, b) {
          if (a)
            return d(a);
          var e = b + "";
          "\ufeff" === e[0] && (e = e.substr(1)), c(e);
        });
      };
    } else {
      if ("undefined" == typeof self || "undefined" == typeof self.fetch)
        throw new TypeError("No environment fetch API available.");
      s = function(a, b, c, d) {
        var e = {headers: {Accept: "application/x-es-module, */*"}};
        b && ("string" == typeof b && (e.headers.Authorization = b), e.credentials = "include"), fetch(a, e).then(function(a) {
          if (a.ok)
            return a.text();
          throw new Error("Fetch error: " + a.status + " " + a.statusText);
        }).then(c, d);
      };
    }
    f.prototype.fetch = function(a) {
      return new Promise(function(b, c) {
        s(a.address, void 0, b, c);
      });
    }, function() {
      function a() {
        document.removeEventListener("DOMContentLoaded", a, !1), window.removeEventListener("load", a, !1), b();
      }
      function b() {
        for (var a = document.getElementsByTagName("script"),
            b = 0; b < a.length; b++) {
          var c = a[b];
          if ("module" == c.type) {
            var d = c.innerHTML.substr(1);
            p.module(d)["catch"](function(a) {
              setTimeout(function() {
                throw a;
              });
            });
          }
        }
      }
      if (i && "undefined" != typeof document.getElementsByTagName) {
        var c = document.getElementsByTagName("script");
        c = c[c.length - 1], "complete" === document.readyState ? setTimeout(b) : document.addEventListener && (document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1));
      }
    }(), "object" == typeof exports && (module.exports = e), a.Reflect = a.Reflect || {}, a.Reflect.Loader = a.Reflect.Loader || e, a.Reflect.global = a.Reflect.global || a, a.LoaderPolyfill = e, p || (p = new f, p.constructor = f), "object" == typeof exports && (module.exports = p), a.System = p;
  }("undefined" != typeof self ? self : global);
})(require('process'));
