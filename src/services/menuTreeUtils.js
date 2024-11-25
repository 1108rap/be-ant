const buildMenuTree = (menuItems, parentId = null) => {
  return menuItems
    .filter((item) => item.parent_id === parentId)
    .map((item) => ({
      ...item,
      children: buildMenuTree(menuItems, item.id),
    }));
};

module.exports = buildMenuTree;
