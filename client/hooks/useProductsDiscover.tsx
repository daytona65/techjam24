import {useState, useEffect} from 'react';
import { IProduct, IProductDiscovery } from '../components/exportInterface';

export const shortenName = (products: IProduct[], maxLength: number) => {
  for (let i = 0; i < products.length; i++) {
    const name = products[i].product_name;
    if (name.length > maxLength) {
      products[i].product_name = name.substring(0, maxLength - 3) + '...';
    }
  }
  return products;
 
}
export const useProductsDiscover = ({
  productsDiscovery,
  userId
}: IProductDiscovery) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [updating, setUpdating] = useState(false);

  const fetchNewProducts = async () => {
    try {
        const response = await fetch(`http://10.0.2.2:5000/recommend?id=${userId}`); // 10.0.2.2 for Android emulators
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const productsArray = await response.text();
        setUpdating(false);
        setProducts(shortenName(products.concat(JSON.parse(productsArray)), 40));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  useEffect(() => {
    if (products.length > 9 || updating) {
      return;
    }
    setUpdating(true);
    fetchNewProducts();
  }, [products.length]);

  useEffect(() => {
    setProducts(productsDiscovery);
  }, [productsDiscovery]);

  return {products: products, setProducts: setProducts};
};