import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateItemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item: existingFoodItem } = location.state || {};

  const [formData, setFormData] = useState({
    category: existingFoodItem?.category || "",
    foodName: existingFoodItem?.foodName || "",
    image: existingFoodItem?.image || "",
    price: existingFoodItem?.price || "",
    description: existingFoodItem?.description || "",
    rating: existingFoodItem?.rating || "",
    allergyIngredients: existingFoodItem?.allergyIngredients || "",
    availability: existingFoodItem?.availability || true,
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "image" ? files[0] : value,
    }));
  };

  const handleDelete = async () => {
    console.log("Deleting",existingFoodItem._id);
    try{      
      const response = await fetch(`http://localhost:5000/menu/${existingFoodItem._id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
    //   const errorResponse = await response.json();
    //   throw new Error(errorResponse.message || 'Failed to update item');
    // }
    setAlertMessage("Item Deleted successfully!");
    setAlertType("success");
    setTimeout(() => navigate("/admin/panel"), 2000);
    }
  } catch (error) {
    setAlertMessage("Failed to Delete item. Please try again.");
    setAlertType("danger");
    console.error("Error updating item:", error);
  }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      formDataToSend.append("data", JSON.stringify({
        category: formData.category,
        foodName: formData.foodName,
        price: formData.price,
        description: formData.description,
        rating: formData.rating,
        allergyIngredients: formData.allergyIngredients,
        availability: formData.availability,
      }));
      const response = await fetch(`http://localhost:5000/menu/${existingFoodItem._id}`, {
        method: 'PATCH',
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to update item');
      }
      setAlertMessage("Item updated successfully!");
      setAlertType("success");
      setTimeout(() => navigate("/admin/panel"), 2000);
    } catch (error) {
      setAlertMessage("Failed to update item. Please try again.");
      setAlertType("danger");
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Update Menu Item</h2>
              {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                  {alertMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage("")}></button>
                </div>
              )}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="foodName" className="form-label">Food Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="foodName"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label htmlFor="allergyIngredients" className="form-label">Allergy Ingredients</label>
                    <input
                      type="text"
                      className="form-control"
                      id="allergyIngredients"
                      name="allergyIngredients"
                      value={formData.allergyIngredients}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="availability"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="availability">Available</label>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-success btn-lg">Update Item</button>
                </div>
              </form>
              <br></br>
              <button type="button" className="btn btn-danger btn-lg" onClick={handleDelete}>Delete Item</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemForm;