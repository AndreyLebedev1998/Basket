import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import styles from "./Basket.module.css";

const Basket = ({ product, setProduct, price, setPrice, count, setCount }) => {
  let sum = 0;

  let totalQuantity = 0;

  const deleteProduct = (id) => {
    return setProduct(product.filter((el) => el.id !== id));
  };

  product.map((el) => {
    return (totalQuantity += el.quantity);
  });

  let totalPrice = price.map((el) => (sum += el)).reverse()[0];

  return (
    <>
      {product.length == 0 ? (
        <>
          <h2>Корзина пуста</h2>
          <HiOutlineEmojiSad className={styles.iconSad} />
        </>
      ) : (
        <>
          <div className={styles.divIcon}>
            {product.map((el) => {
              return (
                <AiFillDelete
                  key={uuidv4()}
                  className={styles.iconDelete}
                  onClick={() => {
                    setPrice([totalPrice - el.quantity * el.price]);
                    setCount(count - el.quantity);
                    el.quantity = 0;
                    deleteProduct(el.id);
                  }}
                />
              );
            })}
          </div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Наименование</th>
                <th>Колличество</th>
                <th>Цена</th>
              </tr>
              {product.map((el) => {
                return (
                  <>
                    <tr key={uuidv4()}>
                      <td key={uuidv4()}>
                        <img
                          key={uuidv4()}
                          className={styles.img}
                          src={el.photos}
                          alt=""
                        />
                      </td>
                      <td key={uuidv4()}>
                        <h3 key={uuidv4()}>{el.name}</h3>
                      </td>
                      <td key={uuidv4()}>
                        <h3 key={uuidv4()} className={styles.quantity}>
                          {el.quantity}
                        </h3>
                      </td>
                      <td key={uuidv4()}>
                        <h4 key={uuidv4()} className={styles.h4}>
                          {el.price} руб
                        </h4>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <button
            className={styles.deleteButton}
            onClick={() => {
              setProduct(
                [],
                product.forEach((el) => (el.quantity = 0))
              );
              setPrice([]);
              setCount((count = 0));
            }}
          >
            Отчистить
          </button>
          <div className={styles.div}>
            <h2 className={styles.h2}>
              Общая сумма: {price.length == 0 ? 0 : totalPrice} рублей
            </h2>
            <h2 className={styles.h2}>
              Общее колличество товаров: {totalQuantity}
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Basket;
