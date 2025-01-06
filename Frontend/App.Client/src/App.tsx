import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  )
}

function Header() {
  return (
    <h1>E-Commerce Header</h1>
  )
}

function ProductList() {
  const [products, setProducts] = useState(
    [{ id: 1, name: "Starlink", price: 1000, isActive: true },
    { id: 2, name: "Starship", price: 2000, isActive: false },
    { id: 3, name: "Falcon", price: 3000, isActive: true },
    { id: 4, name: "Heavy Booster", price: 4000, isActive: true }]);

  useEffect(() => {
    fetch("https://localhost:7244/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])


  function addProduct() {
    setProducts([...products, { id: Date.now(), name: "Product 5", price: 5000, isActive: true }])
  }

  console.log("render...")
  return (
    <div>
      <h2>Product List</h2>
      {products.map(p => (
        <Product key={p.id} product={p} />
      ))}

      <button onClick={addProduct}>Add a product.</button>
    </div>
  );
}

function Product(props: any) {
  return (
    <>
      {props.product.isActive ? (
        <div>
          <h3>{props.product.name}</h3>
          <p> {props.product.price}</p>
        </div>
      ) : <p>Product is not sale</p>}
    </>
  );
}

export default App
