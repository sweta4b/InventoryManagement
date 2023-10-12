import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addItems, fetchItems, removeItem } from "../Action/InventoryAction";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import "./Page.css";
import EditProduct from "../Component/EditProduct";
import { fetchSales } from "../Action/SalesAction";

export default function InventoryPage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    imageURL: ""
  });
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const uniqueCategories = items.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSales());
  }, [dispatch]);

  const handleAddItems = () => {
    if (
      item.name.trim() === "" ||
      item.price === "" ||
      item.description.trim() === "" ||
      item.quantity === "" ||
      item.category.trim() === "" ||
      item.imageURL.trim() === ""
    ) {
      alert("Please fill out all required fields.");
    } else {
      dispatch(addItems(item));
      setItem({
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
        imageURL: ""
      });
      setIsOpen(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="App">
        <Fab color="secondary" aria-label="add" sx={{ m: 4, mt: 10 }}>
          <AddIcon onClick={() => setIsOpen(!isOpen)} />
        </Fab>
      </div>
      <form
        className="container"
        style={{
          display: isOpen ? "flex" : "none"
        }}
      >
        <h1>Add new Item</h1>
        <input
          className="add-form"
          type="text"
          required
          placeholder="name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <input
          className="add-form"
          type="number"
          required
          placeholder="quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
        <input
          className="add-form"
          type="text"
          required
          placeholder="description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
        <input
          className="add-form"
          type="text"
          required
          placeholder="category"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        />
        <input
          className="add-form"
          type="number"
          required
          placeholder="price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
        <input
          className="add-form"
          type="text"
          required
          placeholder="image"
          value={item.imageURL}
          onChange={(e) => setItem({ ...item, imageURL: e.target.value })}
        />
        <Button onClick={handleAddItems} variant="contained">
          Add item
        </Button>
      </form>
      {items.length === 0 ? (
        <h1
          className="App"
          style={{
            display: isOpen ? "none" : "block"
          }}
        >
          Inventory is Empty
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
              <th>Image</th>
              <th>
                <select
                  id="category-select"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="All">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
            {filteredItems.map((item) => (
              <>
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>$ {item.price}</td>
                  <td>{item.quantity <= 0 ? "Out of Stock" : item.quantity}</td>
                  <td>
                    <img
                      alt="img"
                      src={item.imageURL}
                      style={{ width: "100px", height: "80px" }}
                    />
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap"
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setShowEditForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemoveItem(item._id)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
                {showEditForm && (
                  <EditProduct
                    item={item}
                    setShowEditForm={setShowEditForm}
                    showEditForm={showEditForm}
                  />
                )}
              </>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
