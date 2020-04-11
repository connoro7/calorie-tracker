//& UI Controller
export const UICtrl = (/*UICtrl*/) => {
  // UI Selectors for managing where selector functions are pointed (if #item-list is changed)
  const UISelectors = {
    itemList: '#item-list',
  }

  // Returning public methods
  return {
    init: () => {
      console.log('>> UI CONTROLLER: ')
    },
    populateItemList: (items) => {
      let html = ''

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
        `
      })

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
  }
}
