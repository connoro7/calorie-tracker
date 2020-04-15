//& Storage Controller
export const StorageCtrl = ((/*StorageCtrl*/) => {
  // Returning public methods
  return {
    init: () => {
      console.log('>> STORAGE CONTROLLER: ')
    },

    storeItem: (item) => {
      //& Test: Will log to console whenever storeItem is called
      // console.log('Storage Test: StorageCtrl.storeItem() called')
      let items

      // Check if any existing items in LS
      if (localStorage.getItem('items') === null) {
        // For cases with empty LS, sets our list of items to be an empty array so that we can push() our new item onto it
        items = []

        // Push new item as the first entry in our item object
        items.push(item)

        // Set LS; Takes the updated item object and converts it into a string so that it can be stored in LS
        localStorage.setItem('items', JSON.stringify(items))
      } else {
        // Get existing items in LS; Need to use JSON.parse to convert strings in LS to objects, so that we can push() the new item onto it
        items = JSON.parse(localStorage.getItem('items'))

        // Push new item onto our existing list of items
        items.push(item)

        // Reset LS; Takes the updated item object and converts it into a string so that it can be stored in LS
        localStorage.setItem('items', JSON.stringify(items))
      }
    },

    getItemsFromStorage: () => {
      let items
      if (localStorage.getItem('items') === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('items'))
      }
      return items
    },
  }
})()
