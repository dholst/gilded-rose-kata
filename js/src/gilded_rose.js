function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  items.forEach(update_item_quality);
}

function update_item_quality(item) {
  function isConjured() {
    return /conjured/i.test(item.name);
  }

  function isAgedBrie() {
    return /^Aged Brie/i.test(item.name);
  }

  function isBackstagePasses() {
    return /^Backstage passes/i.test(item.name);
  }

  function isSulfuras() {
    return /^Sulfuras/i.test(item.name);
  }

  if (isAgedBrie() || isBackstagePasses()) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;

      if (isBackstagePasses()) {
        if (item.sell_in < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sell_in < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  } else {
    if (item.quality > 0) {
      if (!isSulfuras()) {
        item.quality = item.quality - 1;
      }
    }
  }

  if (!isSulfuras()) {
    item.sell_in = item.sell_in - 1;
  }

  if (item.sell_in < 0) {
    if (!isAgedBrie()) {
      if (!isBackstagePasses()) {
        if (item.quality > 0) {
          if (!isSulfuras()) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  if (isConjured()) {
    const degrade_by = item.sell_in < 0 ? 2 : 1;
    item.quality = item.quality - degrade_by;
  }

  if (item.quality < 0) {
    item.quality = 0;
  }

  if (isSulfuras()) {
    item.quality = 80;
  }
}
