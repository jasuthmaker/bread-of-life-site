/* Bread of Life: shared behavior. Content lives in config.js.
   Design-review shortcuts: ?demo=weather shows the closure banner,
   ?now=2026-09-22T13:00 pretends it is that pantry-local time. */
(function () {
  "use strict";
  var S = window.SITE;
  var params = new URLSearchParams(location.search);
  var lang = "en";
  try { lang = localStorage.getItem("bol-lang") || "en"; } catch (e) {}

  var UI = {
    en: {
      open: function (t) { return "Open now, until " + t; },
      soon: function (t) { return "Opens today at " + t; },
      closed: function (d, t) { return "Closed now. Next open " + d + " at " + t; },
      weather: "Closed today for weather",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      today: "today", tomorrow: "tomorrow", by: "By appointment only",
      of: " of ", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dateFmt: function (d) { return this.months[d.m] + " " + d.d + ", " + d.y; }
    },
    es: {
      open: function (t) { return "Abierto ahora, hasta las " + t; },
      soon: function (t) { return "Abre hoy a las " + t; },
      closed: function (d, t) { return "Cerrado ahora. Abre el " + d + " a las " + t; },
      weather: "Cerrado hoy por el clima",
      days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      today: "hoy", tomorrow: "mañana", by: "Solo con cita",
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      dateFmt: function (d) { return d.d + " de " + this.months[d.m] + " de " + d.y; }
    }
  };
  function L() { return UI[lang]; }
  function pick(o) { return o && (o[lang] || o.en) || ""; }

  /* ---------- pantry-local time ---------- */
  function localNow() {
    var m = params.get("now") && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(params.get("now"));
    if (m) {
      var dt = new Date(+m[1], +m[2] - 1, +m[3]);
      return { dow: dt.getDay(), mins: +m[4] * 60 + +m[5] };
    }
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: S.timezone, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
    return { dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), mins: +get("hour") * 60 + +get("minute") };
  }
  function toMins(s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; }
  function fmtTime(s) {
    var p = s.split(":"), h = +p[0], mm = p[1];
    var suffix = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
    return h + (mm === "00" ? "" : ":" + mm) + " " + suffix;
  }

  /* ---------- open / closed status ---------- */
  function weatherOn() { return S.weather.active || params.get("demo") === "weather"; }

  function renderStatus() {
    var el = document.getElementById("status");
    var txt = document.getElementById("status-text");
    if (!el) return;
    var now = localNow(), state, msg;
    if (weatherOn()) {
      state = "weather"; msg = L().weather;
    } else {
      var today = S.hours.filter(function (h) { return h.dow === now.dow; })[0];
      if (today && now.mins >= toMins(today.open) && now.mins < toMins(today.close)) {
        state = "open"; msg = L().open(fmtTime(today.close)) + ". " + L().by + ".";
      } else if (today && now.mins < toMins(today.open)) {
        state = "soon"; msg = L().soon(fmtTime(today.open)) + ". " + L().by + ".";
      } else {
        state = "closed";
        var next = null, add;
        for (add = 1; add <= 7 && !next; add++) {
          var d = (now.dow + add) % 7;
          next = S.hours.filter(function (h) { return h.dow === d; })[0];
          if (next) next = { h: next, add: add };
        }
        var dayName = next.add === 1 ? L().tomorrow : L().days[next.h.dow];
        msg = L().closed(dayName, fmtTime(next.h.open)) + ".";
      }
    }
    el.setAttribute("data-state", state);
    txt.textContent = msg;
  }

  function renderWeather() {
    var box = document.getElementById("weather");
    if (!box) return;
    if (!weatherOn()) { box.hidden = true; return; }
    box.hidden = false;
    document.getElementById("weather-title").textContent = pick(S.weather.title);
    document.getElementById("weather-detail").textContent = pick(S.weather.detail);
    document.getElementById("weather-makeup").textContent = pick(S.weather.makeup);
  }

  /* ---------- static links from config ---------- */
  function wireLinks() {
    var q = function (sel, fn) { [].forEach.call(document.querySelectorAll(sel), fn); };
    q("[data-appointment]", function (a) { a.href = S.links.appointment; a.target = "_blank"; a.rel = "noopener"; });
    q("[data-donate]", function (a) { a.href = S.links.donate; a.target = "_blank"; a.rel = "noopener"; });
    q("[data-directions]", function (a) { a.href = S.links.directions; a.target = "_blank"; a.rel = "noopener"; });
    q("[data-facebook]", function (a) { a.href = S.links.facebook; a.target = "_blank"; a.rel = "noopener"; });
    q("[data-tel]", function (a) { a.href = "tel:" + S.phoneTel; });
    q("[data-phone]", function (n) { n.textContent = S.phone; });
  }

  /* ---------- news + voices ---------- */
  function renderNews() {
    var box = document.getElementById("news-slider");
    if (!box) return;
    box.innerHTML = "";
    S.news.forEach(function (n) {
      var p = n.date.split("-"), date = L().dateFmt({ y: p[0], m: +p[1] - 1, d: +p[2] });
      var card = document.createElement("article");
      card.className = "news-card";
      card.innerHTML = '<img alt="" loading="lazy"><p class="meta"></p><h3></h3><p class="body"></p>';
      var img = card.querySelector("img");
      img.src = n.img; img.alt = pick(n.alt);
      card.querySelector(".meta").textContent = date;
      card.querySelector("h3").textContent = pick(n.title);
      card.querySelector(".body").textContent = pick(n.text);
      box.appendChild(card);
    });
    updateSliderButtons();
  }
  function updateSliderButtons() {
    var box = document.getElementById("news-slider");
    if (!box) return;
    var btns = document.querySelectorAll("[data-slide]");
    btns[0].disabled = box.scrollLeft < 4;
    btns[1].disabled = box.scrollLeft + box.clientWidth >= box.scrollWidth - 4;
  }

  var voiceIdx = 0;
  function renderVoice() {
    var t = document.getElementById("voice-text");
    if (!t) return;
    var v = S.voices[voiceIdx];
    t.textContent = "“" + pick(v.text) + "”";
    var c = document.getElementById("voice-cite");
    c.textContent = v.name;
    var tag = document.createElement("span"); tag.textContent = pick(v.tag); c.appendChild(tag);
    document.getElementById("voice-count").textContent = (voiceIdx + 1) + " / " + S.voices.length;
  }


  /* ---------- editable blocks: weather policy, volunteer needs, impact ---------- */
  function renderPolicy() {
    var box = document.getElementById("weather-policy");
    if (!box) return;
    box.innerHTML = "";
    S.weather.policy.forEach(function (block) {
      var wrap = document.createElement("div");
      wrap.className = "policy-block";
      if (block.heading) { var h = document.createElement("h3"); h.textContent = pick(block.heading); wrap.appendChild(h); }
      block.paragraphs.forEach(function (para) { var p = document.createElement("p"); p.textContent = pick(para); wrap.appendChild(p); });
      box.appendChild(wrap);
    });
  }
  function renderNeeds() {
    var ul = document.getElementById("volunteer-needs");
    if (!ul) return;
    ul.innerHTML = "";
    S.volunteerNeeds.forEach(function (n) {
      var li = document.createElement("li");
      li.innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg><span></span>';
      li.querySelector("span").textContent = pick(n);
      ul.appendChild(li);
    });
  }
  function renderImpact() {
    var sec = document.getElementById("impact");
    if (!sec) return;
    if (!S.impact.verified) { sec.hidden = true; return; }
    sec.hidden = false;
    document.getElementById("impact-title").textContent = pick(S.impact.title);
    var ul = document.getElementById("impact-list");
    ul.innerHTML = "";
    S.impact.items.forEach(function (it) {
      var li = document.createElement("li");
      li.innerHTML = "<strong></strong><span></span>";
      li.querySelector("strong").textContent = it.value;
      li.querySelector("span").textContent = pick(it.label);
      ul.appendChild(li);
    });
  }

  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    [].forEach.call(document.querySelectorAll("[data-es]"), function (n) {
      if (!n.hasAttribute("data-en")) n.setAttribute("data-en", n.innerHTML);
      n.innerHTML = lang === "es" ? n.getAttribute("data-es") : n.getAttribute("data-en");
    });
    [].forEach.call(document.querySelectorAll("[data-lang]"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    renderStatus(); renderWeather(); renderNews(); renderVoice(); renderPolicy(); renderNeeds(); renderImpact();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-lang")) {
      lang = b.getAttribute("data-lang");
      try { localStorage.setItem("bol-lang", lang); } catch (x) {}
      applyLang();
    } else if (b.hasAttribute("data-slide")) {
      var box = document.getElementById("news-slider");
      var step = box.firstElementChild ? box.firstElementChild.getBoundingClientRect().width + 20 : 300;
      box.scrollBy({ left: step * +b.getAttribute("data-slide"), behavior: "smooth" });
    } else if (b.hasAttribute("data-voice")) {
      voiceIdx = (voiceIdx + +b.getAttribute("data-voice") + S.voices.length) % S.voices.length;
      renderVoice();
    } else if (b.classList.contains("menu-toggle")) {
      var open = document.getElementById("nav").classList.toggle("open");
      b.setAttribute("aria-expanded", String(open));
    }
  });
  var slider = document.getElementById("news-slider");
  if (slider) slider.addEventListener("scroll", updateSliderButtons, { passive: true });
  window.addEventListener("resize", updateSliderButtons);

  wireLinks();
  applyLang();
  setInterval(renderStatus, 60000);
})();
