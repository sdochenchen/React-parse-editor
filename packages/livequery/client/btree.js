import SortedSet from 'collections/sorted-set'

const defaultOption = {
  order: 7    // b+tree order
}

const NodeType = {
  UNKNOWN: 0,
  INTERNAL: 1,
  LEAF: 2,
}

export class KeyValue {
  constructor(key = null, pointer =  null) {
    this.key = key
    this.pointer = pointer
  }
}

class TreeNode {
  constructor(values = null) {
    this.keyValues = new SortedSet(
      values,
      (a, b) => a.key === b.key,
      (a, b) => a.key - b.key
    )

    this.parent = null
    this.parentPointer = null
  }

  get type() {
    return NodeType.UNKNOWN
  }

  add(...values) {
    this.keyValues.push(...values)
  }

  get(key) {
    return this.keyValues.get({key})
  }

  sorted() {
    return this.keyValues.sorted()
  }

  findLeastGreaterThanOrEqual(v) {
    return this.keyValues.findLeastGreaterThanOrEqual(v)
  }

  forEach(cb, thisArg = null) {
    this.keyValues.forEach(cb, thisArg)
  }

  shift() {
    return this.keyValues.shift()
  }

  split() {
    const start = Math.floor(this.keyValues.length / 2)
    const len = this.keyValues.length - start
    const newArray = this.keyValues.splice(start, len)
    return this.type === NodeType.LEAF ? new LeafNode(newArray) : new InternalNode(newArray)
  }
}

class InternalNode extends TreeNode {
  constructor(values = null) {
    super(values)
    this.infinityPointer = new KeyValue()
  }

  get type() {
    return NodeType.INTERNAL
  }
}

export class LeafNode extends TreeNode {
  constructor(values = null) {
    super(values)
    this.sibling = null
  }

  get type() {
    return NodeType.LEAF
  }

  atLeastHalfFull(order = defaultOption.order) {
    return this.keyValues.length >= Math.floor((order - 1) / 2)
  }

  isFull(order = defaultOption.order) {
    return this.keyValues.length >= order
  }
}

export class BPlusTree {
  constructor() {
    this.root = null
  }

  findBucket(key) {
    let internalOrLeafNode = this.root

    while(true) {
      let node = internalOrLeafNode.findLeastGreaterThanOrEqual({key})
      if (internalOrLeafNode.type === NodeType.LEAF) {
        break
      }

      if (internalOrLeafNode.type !== NodeType.INTERNAL) {
        throw new Error(`Invalid Node Type ${internalOrLeafNode.type}`)
      }

      if (node == null) {
        internalOrLeafNode = internalOrLeafNode.infinityPointer
      } else {
        if (node.pointer == null) break
        internalOrLeafNode = node.pointer
      }
    }

    return internalOrLeafNode
  }

  insert(k, v) {
    const kv = new KeyValue(k)

    if (this.root == null) {
      this.root = new LeafNode()
      this.root.add(kv)
      return kv
    }

    let bucket = this.findBucket(k)
    bucket.add(kv)
    while(bucket && bucket.isFull()) {
      bucket = this.grow(bucket)
    }
  }

  grow(bucket) {
    let newLeaf = bucket.split()
    let p = newLeaf.shift()
    let parent = bucket.parent

    if (parent == null) {
      parent = this.root = new InternalNode()
      parent.add(p)
      bucket.parent = parent
    }
    newLeaf.parent = parent

    let parentPointer = bucket.parentPointer
    if (parentPointer == null) {
      parentPointer = parent.infinityPointer
    }

    newLeaf.parentPointer = parentPointer
    bucket.parentPointer = p

    p.pointer = bucket
    parentPointer.pointer = newLeaf

    newLeaf.sibling = bucket.sibling
    bucket.sibling = newLeaf

    if (newLeaf.type === NodeType.INTERNAL) {
      newLeaf.forEach((v) => {
        if (v && v.pointer) v.pointer.parent = newLeaf
      })
    }

    return parent
  }

  remove(k) {
    let bucket = this.findBucket(k)
  }
}
