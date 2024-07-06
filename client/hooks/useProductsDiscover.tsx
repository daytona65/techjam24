import {useState, useEffect} from 'react';
import { IProduct, IProductDiscovery } from '../components/exportInterface';

export const useProductsDiscover = ({
  productsDiscovery,
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
    setProducts(productsDiscovery);
  }, [productsDiscovery]);

  return {products: products, setProducts: setProducts};
};