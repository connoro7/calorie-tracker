//& Item Controller
export const ItemCtrl = (/*ItemCtrl*/) => {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // Data Structure / State
  const data = {
    items: [
      // Test items for initial UI development
      //   { id: 0, name: 'Steak Dinner', calories: 1200 },
      //   { id: 1, name: 'Cookies', calories: 400 },
      //   { id: 2, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  }
  // Returning public methods
  return {
    init: () => {
      console.log('>> ITEM CONTROLLER: ')
    },

    getItems: () => {
      return data.items
    },
    addItem: (name, calories) => {
      // Test: Checks to see if meal name and calorie input fields are reaching the ItemCtrl.addItem() method
      //   console.log(name, calories)
      let ID
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0
      }

      // Convert calories input field from string to number
      calories = parseInt(calories)

      // Create new item
      let newItem = new Item(ID, name, calories)

      // Add object created by newItem to array
      data.items.push(newItem)

      return newItem
    },

    getTotalCalories: () => {
      let total = 0

      // Loop through items and add calories to total count
      data.items.forEach((item) => {
        total += item.calories
      })
      // Set total calories in data structure
      data.totalCalories = total

      return data.totalCalories
    },

    logData: () => {
      return data
    },
  }
}
