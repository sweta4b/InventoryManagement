import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSales, fetchSales, removeSale } from "../Action/SalesAction";
import { fetchItems } from "../Action/InventoryAction";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Sales() {
  const [saleDate, setSaleDate] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [saleData, setSaleData] = useState({
    description: "",
    amount: "",
    name: "",
    quantity: "",
    date: ""
  });

  const sales = useSelector((state) => state.sales);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSales(saleData));
    setSaleData({
      description: "",
      amount: "",
      name: "",
      quantity: "",
      date: ""
    });
    setIsOpen(!isOpen);
  };

  const convertDate = (date) => {
    const timeStamp = new Date(date);
    const newTime = timeStamp.toDateString();
    return newTime;
  };

  const uniqueDates = sales.reduce((date, sale) => {
    if (!date.includes(sale.date)) {
      date.push(sale.date);
    }
    return date;
  }, []);

  const handleDateChange = (e) => {
    setSaleDate(e.target.value);
  };

  const handleRemoveSale = (saleId) => {
    console.log(saleId);
    dispatch(removeSale(saleId));
  };

  const filteredSale =
    saleDate === "All" ? sales : sales.filter((sale) => sale.date === saleDate);

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    const selectedItem = items.find((item) => item.name === selectedCategory);

    if (selectedItem) {
      setSaleData({
        ...saleData,
        name: selectedCategory,
        amount: selectedItem.price,
        description: selectedItem.description
      });
    } else {
      setSaleData({
        ...saleData,
        name: selectedCategory,
        amount: "",
        description: ""
      });
    }
  };

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <div className="App">
        <Fab color="secondary" aria-label="add" sx={{ m: 4, mt: 10 }}>
          <AddIcon onClick={() => setIsOpen(!isOpen)} />
        </Fab>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{
          display: isOpen ? "flex" : "none"
        }}
      >
        <h1>Add new Sale</h1>
        <div>
          <label>Products:</label>
          <select id="category-select" onChange={handleChange} value="All">
            <option value="All">All Categories</option>
            {items.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <input
          placeholder="name"
          type="text"
          value={saleData.name}
          className="add-form"
          required
        />

        <input
          type="number"
          className="add-form"
          placeholder="quantity"
          value={saleData.quantity}
          onChange={(e) =>
            setSaleData({ ...saleData, quantity: e.target.value })
          }
          required
        />

        <input
          type="text"
          value={saleData.description}
          placeholder="description"
          required
          className="add-form"
        />

        <input
          type="number"
          value={saleData.amount}
          placeholder="amount"
          required
          className="add-form"
        />

        <input
          type="date"
          value={saleData.date}
          className="add-form"
          onChange={(e) => setSaleData({ ...saleData, date: e.target.value })}
          required
        />

        <Button type="submit" variant="contained">
          Add Sale
        </Button>
      </form>

      <div>
        {sales.length === 0 ? (
          <h1
            className="App"
            style={{
              display: isOpen ? "none" : "block"
            }}
          >
            Sales is Empty
          </h1>
        ) : (
          <div
            className="data-box"
            style={{ display: isOpen ? "none" : "block" }}
          >
            <table>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Revenue</th>
                <th>
                  <select onChange={handleDateChange} value={saleDate}>
                    <option value="All">All Dates</option>
                    {uniqueDates.map((date) => (
                      <option key={date} value={date}>
                        {convertDate(date)}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>

              {filteredSale.length > 0 ? (
                filteredSale.map((sale, index) => (
                  <tr key={sale._id}>
                    <td>{sale.name}</td>
                    <td>{sale.description}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.amount * sale.quantity}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      {convertDate(sale.date)}
                      <Button
                        onClick={() => handleRemoveSale(sale._id)}
                        variant="contained"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <li>No sales within the selected date range.</li>
              )}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
