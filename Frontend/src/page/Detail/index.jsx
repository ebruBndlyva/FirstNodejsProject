import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();  // `id` URL parametrini əldə edirik
  return (
    <div>
      <h1>Product ID: {id}</h1>
    </div>
  );
}

export default Detail;