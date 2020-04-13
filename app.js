import { ItemCtrl } from './item.js'
import { UICtrl } from './ui.js'
import { StorageCtrl } from './storage.js'

//& App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // Test: ensure JS modules are returning outputs to App.js correctly
  //   console.log('ItemCtrl.init: ', ItemCtrl.init())
  //   console.log('UICtrl.init: ', UICtrl.init())
  //   console.log('StorageCtrl.init: ', StorageCtrl.init())
  //   window.test = { ItemCtrl, UICtrl }

  // Load Event Listeners
  const loadEventListerners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors()
    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
  }

  // Add Item Submit
  const itemAddSubmit = (e) => {
    // Test: Make sure "Add Meal" button is triggering properl
    // console.log('Add')
    const input = UICtrl.getItemInput()

    // Test: Make sure "Meal" and "Calories" input fields are being stored correctly when "Add Meal" button is clicked
    // console.log(input)

    if (input.name !== '' && input.calories !== '') {
      console.log('Test passed: Meal name and calories inputs are not null-ish')
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      console.log('ItemCtrl.logData(): ', ItemCtrl.logData())

      // Add item to UI list
      UICtrl.addListItem(newItem)

      // Clear fields after form submit
      UICtrl.clearInput()
    } else {
      console.log('Test failed: Meal name and calories are null-ish')
    }

    e.preventDefault()
  }

  // Returning public methods
  return {
    init: function () {
      // Test: ensure app is being initialized properly
      //   console.log('Initializing App...')

      // Fetch items from data structure
      const items = ItemCtrl.getItems()
      //   console.log(items)

      // Check if any items already exist
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        // Populate list with items
        UICtrl.populateItemList(items)
      }

      // Load event listeners
      loadEventListerners()
    },
  }
})(ItemCtrl(), UICtrl(), StorageCtrl())

// Initialize App
App.init()
