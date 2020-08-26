const { LeafNode, KeyValue } = require('../../../client/btree')

test('test leaf node sorted', () => {
  let leaf = new LeafNode()
  leaf.add(new KeyValue(15), new KeyValue(7), new KeyValue(9))
  const arr = leaf.sorted()
  expect(arr.map(v => v.key)).toEqual([7, 9, 15])
})
