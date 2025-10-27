import {useEffect, useState} from 'react';
import {formatPrice} from 'format.js'

const Store = () => {
    const [Products, setProducts] = useState([]);

    const base_url = "http://localhost:5173/Products.json";

    const fecthProducts = async () => {
        try {
            const response = await fetch(base_url);
            const data = response.json();
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products: ", error);
        }
}
useEffect(() => {  
    fecthProducts();
}, []);

 return (
    Products.map((product, id) => (
        <div key={id}>
            <p>{product.name}</p>
            <img src={'/catalogo/%prod.imagen}'} alt={product.nombre} />
            <p>{formatPrice}</p>
        </div>  
    )
)

)
}

export default Store;