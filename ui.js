import { ItemCtrl } from './item.js'

// let ItemControl = ItemCtrl()

//& UI Controller
export const UICtrl = function (ItemCtrl) {
  //& Test: ensure JS modules are returning outputs to App.js correctly
  // console.log('Test.UI.ItemCtrl.init: ItemCtrl fed to UICtrl correctly?', ItemCtrl().init())

  // UI Selectors: for managing where selector functions are pointed
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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

    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems)

      // Turn Node list into an array:
      listItems = Array.from(listItems)

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute('id')

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`
        }
      })
    },

    // Clear form submission fields
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    addItemToForm: () => {
      // #region Tests for addItemtoForm

      //& VARIETY OF TESTS TO OBSERVE FLOW OF DATA BETWEEN ItemCtrl & UICtrl
      // let currItem = () => {
      // console.log('UI TEST 1: LogData: ', ItemCtrl.logData())
      // console.log('UI TEST 2: getCurrentItem: ', ItemCtrl.getCurrentItem())
      // let foo = ItemCtrl.logData().currentItem
      // console.log('UI TEST 3: ItemCtrl.logData.currentItem: ', foo)
      // console.log('UI TEST 3.5: window.test: ', window.test)
      // console.log('UI TEST 4: PATH TO CURRENTITEM? ', ItemCtrl.logData().currentItem)
      // sets currItem equal to the return of the enclosed arrow function: ItemCtrl.getCurrentItem
      //   return ItemCtrl.getCurrentItem()
      // }
      // #endregion

      //& Test: Checks what currItem has been set to
      // console.log('Test.UI.addItemToForm.currItem(), Is Current Item Set? ', currItem())

      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      //& Test: Logs content of getCurrentItem.name to make sure the correct item is being edited
      // console.log('getCurrentItem().calories', ItemCtrl.getCurrentItem().name)
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
      //& Test: Logs content of getCurrentItem.calories to make sure the correct item is being edited
      // console.log('getCurrentItem().calories', ItemCtrl.getCurrentItem().calories)

      UICtrl().showEditState()
    },

    // Hide Item List if List is Empty (to remove floating line at bottom of new UI instance)
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },

    // Updates total calorie count
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories
    },

    // Clear Edit State
    clearEditState: () => {
      UICtrl().clearInput()
      //   document.querySelector(UISelectors.itemNameInput).value = ''
      //   document.querySelector(UISelectors.itemCaloriesInput).value = ''
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
    },

    // Show Edit State
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    },

    getSelectors: () => {
      return UISelectors
    },
  }
}
