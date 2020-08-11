const miModulo = (() => {
    "use strict";
    let e = [];
    const t = ["C", "D", "H", "S"],
        a = ["A", "J", "Q", "K"];
    let n = [];
    const l = document.querySelectorAll("small"),
        o = document.querySelectorAll(".divCartas"),
        r = document.getElementById("btnPedirCarta"),
        s = document.getElementById("btnDetener"),
        d = document.getElementById("btnNuevo"),
        c = () => {
            e = [];
            for (let a = 2; a <= 10; a++)
                for (let n of t) e.push(a + n);
            for (let n of t)
                for (let t of a) e.push(t + n);
            return _.shuffle(e);
        },
        i = () => {
            if (0 === e.length) throw "No hay cartas en la baraja";
            return e.pop();
        },
        u = (e, t) => (
            (n[t] =
                n[t] +
                ((e) => {
                    const t = e.substring(0, e.length - 1);
                    return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
                })(e)),
            (l[t].innerText = n[t]),
            n[t]
        ),
        m = (e, t) => {
            const a = document.createElement("img");
            (a.src = `../img/cartas/${e}.png `),
            a.classList.add("carta"),
                o[t].append(a);
        },
        f = (e) => {
            let t = 0;
            do {
                const e = i();
                (t = u(e, n.length - 1)), m(e, n.length - 1);
            } while (t < e && e <= 21);
            (() => {
                const [e, t] = n;
                setTimeout(() => {
                    e > 21 ?
                        alert("pc a ganado") :
                        t > 21 ?
                        alert("Has ganado") :
                        t == e ?
                        alert("Has empatado con una PC") :
                        alert("pc a ganado");
                }, 150);
            })();
        };
    r.addEventListener("click", () => {
            const e = i(),
                t = u(e, 0);
            m(e, 0),
                t > 21 ? ((r.disabled = !0), (s.disabled = !0), f(t)) : 21 === t && f(t);
        }),
        s.addEventListener("click", () => {
            (r.disabled = !0), (s.disabled = !0), f(n[0]);
        }),
        d.addEventListener("click", () => {
            ((t = 2) => {
                (e = c()), (n = []);
                for (let e = 0; e < t; e++) n.push(0);
                console.clear(),
                    (r.disabled = !1),
                    (s.disabled = !1),
                    l.forEach((e) => (e.innerHTML = 0)),
                    o.forEach((e) => (e.innerHTML = ""));
            })();
        });
})();