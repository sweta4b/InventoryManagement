export const fetchItems = () => async (dispatch) => {
  try {
    const response = await fetch("https://inventory.sweta4b.repl.co/items");
    const dataRecieved = await response.json();
    dispatch({ type: "FETCH_ITEMS", payload: dataRecieved });
  } catch (error) {
    console.error("Error fetching items: ", error);
    // dispatch({ type: "FETCH_EXERCISE_FAILURE" });
  }
};

export const addItems = (item) => async (dispatch) => {
  try {
    const response = await fetch("https://inventory.sweta4b.repl.co/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    dispatch({ type: "ADD_ITEMS", payload: data.data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeItem = (itemId) => async (dispatch) => {
  const url = `https://inventory.sweta4b.repl.co/items/${itemId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    dispatch({ type: "REMOVE_ITEMS", payload: data.data });
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};

export const updateItem = (editingItemId, item) => async (dispatch) => {
  try {
    const url = `https://inventory.sweta4b.repl.co/items/${editingItemId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: "UPDATE_ITEMS", payload: data.data });
  } catch (error) {
    console.error("Error updating item: ", error);
  }
};
