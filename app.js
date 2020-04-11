import { ItemCtrl } from './item.js'
import { UICtrl } from './ui.js'
import { StorageCtrl } from './storage.js'

//& App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // Test: ensure JS modules are returning outputs to App.js correctly
  //   console.log('ItemCtrl.logData: ', ItemCtrl.logData())
  //   console.log('UICtrl.init: ', UICtrl.init())
  //   console.log('StorageCtrl.init: ', StorageCtrl.init())
  //   window.test = { ItemCtrl, UICtrl }

  // Returning public methods
  return {
    init: function () {
      // Test: ensure app is being initialized properly
      //   console.log('Initializing App...')

      // Fetch items from data structure
      const items = ItemCtrl.getItems()
      //   console.log(items)

      // Populate list with items
      UICtrl.populateItemList(items)
    },
  }
})(ItemCtrl(), UICtrl(), StorageCtrl())

// Initialize App
App.init()
