//& UI Controller
export const UICtrl = (/*UICtrl*/) => {
  // UI Selectors: for managing where selector functions are pointed
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
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

    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },

    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block'
      // Create <li> element
      const li = document.createElement('li')
      //Add .class and #ID
      li.className = 'collection-item'
      li.id = `item-${item.id}`

      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`

      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },

    // Clear form submission fields
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },

    // Hide Item List if List is Empty (to remove floating line at bottom of new UI instance)
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories
    },

    getSelectors: () => {
      return UISelectors
    },
  }
}
