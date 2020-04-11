//& UI Controller
export const UICtrl = (/*UICtrl*/) => {
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
      document.querySelector('#item-list').innerHTML = html
    },
  }
}
