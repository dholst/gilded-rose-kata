describe('Gilded Rose', function() {
  describe('Item', () => {
    it('should create an item', () => {
      const item = new Item('foo', 1, 2);
      expect(item.name).toEqual('foo');
      expect(item.sell_in).toEqual(1);
      expect(item.quality).toEqual(2);
    });
  });

  describe('Once the sell by date has passed, quality degrades twice as fast', () => {
    it('should decrease quality normally when not passed sell by date', () => {
      update_quality_for('foo', 1, 4);
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(3);
    });

    it('should decrease quality twice as fast when passed sell by date', () => {
      update_quality_for('foo', 0, 4);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(2);
    });
  });

  describe('The quality of an item is never negative', () => {
    it('should not decrease the quality below 0', () => {
      update_quality_for('foo', 0, 0);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });

  describe('"Aged Brie" actually increases in quality the older it gets', () => {
    it('should get better as it gets older', () => {
      update_quality_for('Aged Brie', 1, 0);
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(1);
    });
  });

  describe('The quality of an item is never more than 50', () => {
    it('should increase up to 50', () => {
      update_quality_for('Aged Brie', 1, 49);
      expect(items[0].quality).toEqual(50);
    });

    it('should not increase quality above 50', () => {
      update_quality_for('Aged Brie', 1, 50);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe('Sulfuras', () => {
    const SULFURAS = 'Sulfuras, Hand of Ragnaros';

    it('should not decrease sell_by', () => {
      update_quality_for(SULFURAS, 1, 49);
      expect(items[0].sell_in).toEqual(1);
    });

    it('should always have a quality of 80', () => {
      update_quality_for(SULFURAS, 1, 25);
      expect(items[0].quality).toEqual(80);
    });
  });

  describe('Backstage passes', () => {
    const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';

    it('should increase in quality normally when more than 10 days left', () => {
      update_quality_for(BACKSTAGE_PASS, 11, 1);
      expect(items[0].quality).toEqual(2);
    });

    it('should increase in quality twice as fast from 6 to 10 days left', () => {
      for (let sell_in = 6; sell_in <= 10; sell_in++) {
        update_quality_for(BACKSTAGE_PASS, sell_in, 1);
        expect(items[0].quality).toEqual(3);
      }
    });

    it('should increase in quality three times as fast from 0 to 5 days left', () => {
      for (let sell_in = 1; sell_in <= 5; sell_in++) {
        update_quality_for(BACKSTAGE_PASS, sell_in, 1);
        expect(items[0].quality).toEqual(4);
      }
    });

    it('should drop quality to zero after the concert', () => {
      update_quality_for(BACKSTAGE_PASS, 0, 10);
      expect(items[0].quality).toEqual(0);
    });

    it('should not increase quality passed 50', () => {
      update_quality_for(BACKSTAGE_PASS, 1, 49);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe('Conjured items', () => {
    const CONJURED = 'Conjured something';

    it('degrades twice as fast as normal items');
  });

  function update_quality_for(name, sell_in = 0, quality = 0) {
    items = [new Item(name, sell_in, quality)];
    update_quality();
  }
});

/*

 Just for clarification, an item can never have its quality increase above 50,
 however "Sulfuras" is a legendary item and as such its quality is 80 and it
 never alters.
 */
