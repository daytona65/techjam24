import {useState, useEffect} from 'react';
import { IProduct, IProductDiscovery } from '../components/Matchmaker';

export const useProductsDiscover = ({
  productsToDiscover,
}: IProductDiscovery) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchNewProducts = () => {
    // refetch();
  };

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    // fetchNewProducts();
  }, [products.length]);

  useEffect(() => {
    setProducts(productsToDiscover);
  }, [productsToDiscover]);

  return {products: products, setProducts: setProducts};
};