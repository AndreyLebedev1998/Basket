import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Basket from "./Basket";
import styles from "./Shop.module.css";

const category = [
  { name: "Все" },
  { name: "Ноутбуки" },
  { name: "Мониторы" },
  { name: "Системники" },
  { name: "Мыши" },
  { name: "Клавиатуры" },
];
const Shop = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [goods, setGoods] = useState([]);
  const [searchGoods, setSearchGoods] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState(false);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63ce46156d27349c2b6a5b23.mockapi.io/goods?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setGoods(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const quotes = "";

  return (
    <div>
      <header className={styles.header}>
        <ul>
          {category.map((obj, index) => {
            return (
              <li
                key={uuidv4()}
                className={categoryId == index ? "active" : ""}
                onClick={() => {
                  setCategoryId(index);
                  setBasket(false);
                }}
              >
                {obj.name}
              </li>
            );
          })}
        </ul>
        <input
          placeholder="Поиск"
          value={searchGoods}
          onChange={(e) => setSearchGoods(e.target.value)}
        ></input>
        <p onClick={() => setBasket(true)}>Корзина</p>
        <i>({count})</i>
      </header>
      {basket ? (
        <Basket
          product={product}
          setProduct={setProduct}
          price={price}
          setPrice={setPrice}
          count={count}
          setCount={setCount}
        />
      ) : isLoading ? (
        <h2>Идет загрузка...</h2>
      ) : (
        goods
          .filter((obj) => {
            return obj.name
              .toLowerCase()
              .includes(searchGoods.toLocaleLowerCase());
          })
          .map((obj) => {
            return (
              <div key={uuidv4()} className={styles.div}>
                <h3 key={uuidv4()}>{obj.name}</h3>
                <img
                  key={uuidv4()}
                  className={styles.img}
                  src={obj.photos}
                  alt=""
                />
                <h4 key={uuidv4()} className={styles.h4}>
                  Цена: {obj.price} руб
                </h4>
                <button
                  key={uuidv4()}
                  onClick={() => {
                    setPrice((prev) => {
                      return [...prev, obj.price];
                    });
                    setProduct(
                      [...product, !product.includes(obj) ? obj : ""].filter(
                        (el) => el !== quotes
                      ),
                      (obj.quantity += 1)
                    );
                    setCount(count + 1);
                  }}
                  className={styles.button}
                >
                  Купить
                </button>
              </div>
            );
          })
      )}
    </div>
  );
};

export default Shop;
