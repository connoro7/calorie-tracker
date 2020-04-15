import { ItemCtrl } from './item.js'
import { UICtrl } from './ui.js'
import { StorageCtrl } from './storage.js'

const itemCtrl = ItemCtrl()
const uiCtrl = UICtrl(itemCtrl)
const storageCtrl = StorageCtrl()

//& App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  //& Test: ensure JS modules are returning outputs to App.js correctly
  //   console.log('Test.App.ItemCtrl.init: ', ItemCtrl.init())
  //   console.log('Test.App.UICtrl.init: ', UICtrl.init())
  //   console.log('Test.App.StorageCtrl.init: ', StorageCtrl.init())
  //& Test: Use window.test in Chrome console to see if ItemCtrl and UICtrl are being fed to the DOM correctly
  //   window.test = { ItemCtrl, UICtrl }
  //   window.test = ItemCtrl.getCurrentItem()

  // Load Event Listeners
  const loadEventListerners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors()
    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    // Disable form submission when pressing Enter
    document.addEventListener('keypress', (e) => {
      // Keycode for "enter" is 13
      // e.which used for older browsers, if they lack e.keyCode support
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })
    // Edit icon click event
    // Need to use event delegation to find the edit icons because they will be created after the DOM loads, so we'll be looking for a pre-existing parent element (the list that its in) that holds our clickable edit icon
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
  }

  // Add Item Submit
  const itemAddSubmit = (e) => {
    //& Test: Make sure "Add Meal" button is triggering properl
    // console.log('Test.App.itemAddSubmit: Add meal button click event triggered')
    const input = UICtrl.getItemInput()

    //& Test: Make sure "Meal" and "Calories" input fields are being stored correctly when "Add Meal" button is clicked
    // console.log('Test.App.itemAddSubmit: Add Meal button correctly stored form submission', input)

    if (input.name !== '' && input.calories !== '') {
      //& Test: Checks if input fields are not empty
      //   console.log('Test passed: Meal name and calories inputs are not null-ish')

      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)

      //& Test: ensure item data is being logged correctly to item controller
      //   console.log('Test.App.itemAddSubmit: ItemCtrl.logData(): ', ItemCtrl.logData())

      // Add item to UI list
      UICtrl.addListItem(newItem)

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories)

      // Clear fields after form submit
      UICtrl.clearInput()
    } else {
      //& Test: Checks if input fields are not empty
      //   console.log('Test App.itemAddSubmit: Test failed: Meal name and calories are null-ish')
    }

    e.preventDefault()
  }

  // Click edit item
  const itemEditClick = (e) => {
    //& Test: ensure list items are registering click events
    // console.log('Test App.itemEditClick: test passed')

    if (e.target.classList.contains('edit-item')) {
      //& Test: ensure edit icons are registering click events
      //   console.log('Test.App.itemEditClick: edit item clicked')
      const listId = e.target.parentNode.parentNode.id
      //& Test: ensure we're grabbing the correct list ID for each item in list
      //   console.log('Test.App.itemEditClick, listId: ', listId)

      // Break item-IDs into array so that we separate the ID number from the ID tag in the html
      // Split it at the hyphen, because each ID tag looks like "item-#"
      const listIdArr = listId.split('-')

      //& Test: Ensure we're breaking the list ID tags correctly:
      //   console.log('Test.App.itemEditClick, listIdArr: ', listIdArr)

      // Get the actual id from the list ID array by grabbing the index @1
      const id = parseInt(listIdArr[1])

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id)

      //& Test: ensure we're getting all of the correct data when an edit icon is clicked on
      //   console.log('Test.App.itemEditClick, itemToEdit: ', itemToEdit)

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)

      // Add item to form
      UICtrl.addItemToForm()
    }
    e.preventDefault()
  }

  // Update Item Submit
  const itemUpdateSubmit = (e) => {
    //& Test: checks for correct event listening on the "Update Meal" button
    // console.log('App Test: itemUpdateSubmit triggered')

    // Get item input
    const input = UICtrl.getItemInput()

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

    // Update UI
    UICtrl.updateListItem(updatedItem)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // Returning public methods
  return {
    init: function () {
      // Clear edit state / set initial state
      UICtrl.clearEditState()

      //& Test: ensure app is being initialized properly
      //   console.log('Test.App.init: Initializing App...')

      // Fetch items from data structure
      const items = ItemCtrl.getItems()
      //& Test: logs the current items stored in local storage, or items added via dev environment
      //   console.log('Test.App.init: getItems(): ', items)

      // Check if any items already exist
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        // Populate list with items
        UICtrl.populateItemList(items)
      }

      // Fetch total calories from local storage
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories)

      // Load event listeners
      loadEventListerners()
    },
  }
})(itemCtrl, uiCtrl, storageCtrl)

// Initialize App
App.init()
