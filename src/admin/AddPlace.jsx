import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosApi } from "../AxiosApi";

const AddPlace = () => {
  const navigateTo = useNavigate();
  const handleSubmit = async(e) => {

    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await AxiosApi.post(`admin/addplace`, formData);
      toast.success("Place added successfully!");
      navigateTo("/admin/places");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add place.");
    }
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-center p-5">
          <h1 className="text-2xl font-bold">Add New Place</h1>
        </div>
        <div className="p-10 border rounded border-blue-400 m-3">
          <form onSubmit={handleSubmit}>
          
            <div className="grid grid-cols-2 gap-3">
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="location"
                >
                  Location
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter the Location of the place"
                />
              </div>
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="category"
                >
                  Category
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  id="category"
                  name="category"
                >
                  <option value="">--select--</option>
                  <option value="Park">Park</option>
                  <option value="Museum">Museum</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Historical Building">
                    Historical Building
                  </option>
                  <option value="Beach">Beach</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter the name of the place"
                />
              </div>
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="description"
                >
                  Description
                </label>
                <textarea name="description" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500" />
              </div>
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Image
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  id="name"
                  type="file"
                  name="image"
                  title="Image of the place"
                />
              </div>
              <div className="mb-4 col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="price"
                >
                  Min Amount
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500"
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Min Amount required to visit this location" 
                />
              </div>
              <div className="col-span-2 mx-10 flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Place
                </button>
                <button
                  type="reset"
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
