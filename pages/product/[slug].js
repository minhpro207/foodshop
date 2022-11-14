import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug == product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Item is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <img
            src={`/${product.image}`}
            alt={product.name}
            width={560}
            height={560}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-3xl">{product.name}</h1>
            </li>
            <li>
              <span className="text-xl font-semibold">Categody:</span>{' '}
              {product.category}
            </li>
            <li>
              <span className="text-xl font-semibold">Brand:</span>{' '}
              {product.brand}
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>
              <span className="text-xl font-semibold">Brand:</span>{' '}
              {product.description}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>{product.price}$</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
              </div>
            </div>
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
