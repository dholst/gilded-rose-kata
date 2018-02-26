function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

let items = [];

function update_quality() {
  const rules = [
    {matcher: /conjured/i, apply_to: conjured_rule},
    {matcher: /aged brie/i, apply_to: aged_brie_rule},
    {matcher: /backstage passes/i, apply_to: backstage_passes_rule},
    {matcher: /sulfuras/i, apply_to: sulfuras_rule, static_quality: true}
  ];

  items.forEach(item => {
    const rule = rules.find(r => r.matcher.test(item.name)) || {
      apply_to: default_rule
    };

    rule.apply_to(item);

    if (!rule.static_quality && item.quality > 50) {
      item.quality = 50;
    }

    if (item.quality < 0) {
      item.quality = 0;
    }
  });

  function default_rule(item) {
    decrease_sell_in(item);
    decrease_quality(item, is_past_sell_date(item) ? 2 : 1);
  }

  function conjured_rule(item) {
    decrease_sell_in(item);
    decrease_quality(item, is_past_sell_date(item) ? 4 : 2);
  }

  function aged_brie_rule(item) {
    decrease_sell_in(item);
    increase_quality(item);
  }

  function backstage_passes_rule(item) {
    decrease_sell_in(item);

    if (is_past_sell_date(item)) return (item.quality = 0);
    if (item.sell_in < 6) return increase_quality(item, 3);
    if (item.sell_in < 11) return increase_quality(item, 2);

    increase_quality(item);
  }

  function sulfuras_rule(item) {
    item.quality = 80;
  }

  function decrease_quality(item, by = 1) {
    item.quality = item.quality - by;
  }

  function increase_quality(item, by = 1) {
    item.quality = item.quality + by;
  }

  function decrease_sell_in(item) {
    item.sell_in = item.sell_in - 1;
  }

  function is_past_sell_date(item) {
    return item.sell_in < 0;
  }
}
