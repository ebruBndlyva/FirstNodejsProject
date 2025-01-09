import { useState } from "react";
import "./App.css";
import { usePostProductMutation } from "./Redux/services/ProductsApi";
import { useGetProductQuery } from "./Redux/services/ProductsApi";
import { MdDelete } from "react-icons/md";
import { useDeleteProductMutation } from "./Redux/services/ProductsApi";

function App() {
  const { data, isLoading, refetch } = useGetProductQuery();
  let [nameInp, setName] = useState("");
  let [descriptionInp, setDescription] = useState("");
  let [priceInp, setPrice] = useState(0);
  const [postProduct] = usePostProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  async function AddProduct(e) {
    e.preventDefault();
    let newProduct = {
      name: nameInp,
      description: descriptionInp,
      price: priceInp,
    };
    await postProduct(newProduct);
    setName('')
    setDescription("")
    setPrice(0)
    refetch();
  }
  async function DeleteProduct(id) {
    await deleteProduct(id);
    refetch();
  }
  return (
    <div className="content">
      <form onSubmit={(e) => AddProduct(e)}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Name"
            value={nameInp}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={descriptionInp}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={priceInp}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {isLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div className="products">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {data.map((item, index) => (
              <tbody key={item._id}>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => DeleteProduct(item._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
