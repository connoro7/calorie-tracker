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
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookies', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  }
  // Returning public methods
  return {
    getItems: () => {
      return data.items
    },
    logData: () => {
      console.log('>> ITEM CONTROLLER: ')
      return data
    },
  }
}
