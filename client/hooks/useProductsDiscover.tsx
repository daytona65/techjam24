import {useState, useEffect} from 'react';
import { IProduct, IProductDiscovery } from '../components/exportInterface';

export const useProductsDiscover = ({
  productsDiscovery,
}: IProductDiscovery) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [updating, setUpdating] = useState(false);

  const fetchNewProducts = async () => {
    try {
        const response = await fetch('http://10.0.2.2:5000/recommend?id=1'); // 10.0.2.2 for Android emulators
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const productsArray = await response.text();
        setUpdating(false);
        setProducts(products.concat(JSON.parse(productsArray))); 
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