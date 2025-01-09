import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useGetProductQuery } from '../../Redux/services/ProductsApi';
import { usePostProductMutation } from '../../Redux/services/ProductsApi';
import { useDeleteProductMutation } from '../../Redux/services/ProductsApi';
import { Link } from 'react-router-dom';

function Home() {
    const { data, isLoading, refetch } = useGetProductQuery();
    let [nameInp, setName] = useState("");
    let [descriptionInp, setDescription] = useState("");
    let [priceInp, setPrice] = useState("");
    let [isNewInp, setIsNew] = useState("");
    
    const [postProduct] = usePostProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    
    async function AddProduct(e) {
      e.preventDefault();
      let newProduct = {
        name: nameInp,
        description: descriptionInp,
        price: priceInp,
        isNew: isNewInp,
      };
      await postProduct(newProduct);
      setName("");
      setDescription("");
      setPrice(0);
      setIsNew("");
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
            <input
              type="text"
              placeholder="IsNew"
              value={isNewInp}
              onChange={(e) => setIsNew(e.target.value)}
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
                  <tr
                    style={{
                      backgroundColor: item.isNew == true ? "green" : "red",
                    }}
                  >
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => DeleteProduct(item._id)}>
                        <MdDelete />
                      </button>
                      <Link to={`/${item._id}`}>
                        <FaInfoCircle />
                      </Link>
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

export default Home