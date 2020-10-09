export default nodes => {
  return nodes.reduce(
    (acc, cur) => [
      ...acc,
      { id: cur.node.id, uid: cur.node.uid, ...cur.node.data },
    ],
    []
  )
}
