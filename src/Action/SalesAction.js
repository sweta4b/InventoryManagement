export const fetchSales = () => async (dispatch) => {
  try {
    const response = await fetch("https://inventory.sweta4b.repl.co/sales");
    const dataRecieved = await response.json();
    dispatch({ type: "FETCH_SALES", payload: dataRecieved });
  } catch (error) {
    console.error("Error fetching sales: ", error);
    throw error;
  }
};

export const addSales = (sale) => async (dispatch) => {
  try {
    const response = await fetch("https://inventory.sweta4b.repl.co/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sale)
    });
    const data = await response.json();
    dispatch({ type: "ADD_SALES", payload: data.data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeSale = (saleId) => async (dispatch) => {
  const url = `https://inventory.sweta4b.repl.co/sales/${saleId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    dispatch({ type: "REMOVE_SALES", payload: data.data });
  } catch (error) {
    console.error("Error deleting sale: ", error);
  }
};
