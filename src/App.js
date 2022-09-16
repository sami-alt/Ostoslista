import { useState } from "react";
import AddProduct from "./AddProduct";
import List from "./List";



function App() {
  const [newProducts, setNewProducts] = useState([])
  return (
    <div>
      Ostoslista
      <List newProducts={newProducts} />
      <AddProduct onProductAdded={product => setNewProducts(newProducts.concat(product)) }/>
    </div>
  );
}

export default App;
