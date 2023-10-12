import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { updateItem } from "../Action/InventoryAction";

const Container = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  backgroundColor: "white",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px"
});

function EditProduct({ item, showEditForm, setShowEditForm }) {
  const [editedProduct, setEditedProduct] = useState({
    _id: item?._id,
    name: item?.name,
    imageURL: item?.imageURL,
    description: item?.description,
    category: item?.category,
    price: item?.price,
    quantity: item?.quantity
  });
  const dispatch = useDispatch();

  const editCurrentProduct = () => {
    if (
      editedProduct.name.trim() === "" ||
      editedProduct.price === "" ||
      editedProduct.description.trim() === "" ||
      editedProduct.quantity === "" ||
      editedProduct.category.trim() === "" ||
      editedProduct.imageURL.trim() === ""
    ) {
      alert("Please fill out all required fields.");
    } else {
      dispatch(updateItem(editedProduct?._id, editedProduct));
      setShowEditForm(false);
    }
  };

  return (
    <>
      <Modal
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: "black"
              }}
            >
              Edit Product
            </h1>
            {editedProduct?.name && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                value={editedProduct?.name}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    name: event.target.value
                  })
                }
              ></input>
            )}
            {editedProduct?.description && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                placeholder="description"
                value={editedProduct?.description}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: event.target.value
                  })
                }
              />
            )}
            {editedProduct?.price && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                value={editedProduct?.price}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: event.target.value
                  })
                }
              ></input>
            )}
            {editedProduct?.quantity && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                value={editedProduct?.quantity}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    quantity: event.target.value
                  })
                }
              ></input>
            )}
            {editedProduct?.category && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                value={editedProduct?.category}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: event.target.value
                  })
                }
              ></input>
            )}
            {editedProduct?.imageURL && (
              <input
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  border: "0.5px solid grey",
                  margin: "auto",
                  display: "block",
                  padding: "5px",
                  marginTop: "20px"
                }}
                value={editedProduct?.imageURL}
                onChange={(event) =>
                  setEditedProduct({
                    ...editedProduct,
                    imageURL: event.target.value
                  })
                }
              ></input>
            )}
            <Button
              onClick={() => editCurrentProduct()}
              variant="contained"
              size="small"
              sx={{
                marginBottom: "10px",
                marginLeft: "20px",
                marginTop: "10px"
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => setShowEditForm(false)}
              variant="contained"
              size="small"
              sx={{
                marginBottom: "10px",
                marginLeft: "10px",
                marginTop: "10px"
              }}
            >
              Discard
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}

export default EditProduct;
