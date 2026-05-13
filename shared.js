/* ============================================================
   БЛОК 5 · ЧТО ТАКОЕ ДРОБЬ? · Общая логика
   ============================================================ */

var BLOCK_ID = 'math5_block5';
var NODES = ['node1', 'node2', 'node3', 'node4'];

// ── Таймауты ─────────────────────────────────────────────────
// Менять здесь — применится во всех узлах

var TIMING = {
  wrongHint:  3000,  /* подсказка при неверном ответе в чек-вопросе */
  quizNext:   3000,  /* пауза перед следующим вопросом в квизе */
  matchShake:  500   /* анимация shake в тренажёре */
};

// ── Прогресс ────────────────────────────────────────────────

var Progress = {
  _key: BLOCK_ID + '_progress',

  load: function() {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || {};
    } catch(e) { return {}; }
  },

  save: function(data) {
    try {
      localStorage.setItem(this._key, JSON.stringify(data));
    } catch(e) {}
  },

  markDone: function(nodeId) {
    var data = this.load();
    data[nodeId] = { done: true, ts: Date.now() };
    this.save(data);
    this.checkBlockDone();
  },

  checkBlockDone: function() {
    var data = this.load();
    var allDone = true;
    for (var i = 0; i < NODES.length; i++) {
      if (!data[NODES[i]] || !data[NODES[i]].done) { allDone = false; break; }
    }
    if (allDone) {
      data.blockDone = true;
      this.save(data);
    }
  },

  isDone: function(nodeId) {
    var data = this.load();
    return !!(data[nodeId] && data[nodeId].done);
  },

  countDone: function() {
    var data = this.load();
    var count = 0;
    for (var i = 0; i < NODES.length; i++) {
      if (data[NODES[i]] && data[NODES[i]].done) { count++; }
    }
    return count;
  },

  reset: function() {
    try { localStorage.removeItem(this._key); } catch(e) {}
  }
};

// ── Навигация ────────────────────────────────────────────────

function goBack() {
  window.location.href = 'index.html';
}

function goNode(n) {
  window.location.href = 'node' + n + '.html';
}

// ── Утилиты ─────────────────────────────────────────────────

function shuffle(arr) {
  var a = arr.slice(), i, j, t;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
