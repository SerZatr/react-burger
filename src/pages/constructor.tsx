import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { clearIngredientDetails } from "../services/actions/ingredient-details";
import { postOrder } from "../services/actions/order";
import styles from "../components/app/app.module.css";
import { useNavigate } from "react-router-dom";
import { setIngredientsFromStorage } from "../services/actions/cart";
import { useAppSelector, useAppDispatch } from "../utils/hooks";

export default function ConstructorPage() {
  const ingredientsData = useAppSelector((state) => state.ingredients.data);
  const ingredientsInCart = useAppSelector((state) => state.cart.ingredients);
  const order = useAppSelector((state) => state.order);
  const bun = useAppSelector((state) => state.cart.bun);
  const ingredientDetails = useAppSelector((state) => state.ingredientDetails.ingredient);
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const user = useAppSelector((state) => state.profile.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTotalPrice = useCallback(() => {
      let price = 0;
      ingredientsInCart.forEach( ingredientInCart => {
        const ingredientData = ingredientsData.filter( (i) => i._id === ingredientInCart.ingredientId )[0];
        if (ingredientData) {
          price += ingredientData.price;
        }
      });
      if (bun) {
        const bunData = ingredientsData?.filter( (i) => i._id === bun )[0];
        if (bunData) {
          price += bunData.price * 2;
        }
      }
      return price;
  }, [ingredientsInCart, bun, ingredientsData]);

  useEffect(() => {
    if (localStorage.getItem("ingredientsInCart") && !ingredientsInCart.length && !bun) {
      dispatch(setIngredientsFromStorage());
    }
  }, [])

  const closeIngredientDetailsModal = () => {
    navigate(-1);
    dispatch(clearIngredientDetails());
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsVisible(false);
  };

  const buyHandler = () => {
    const ingredients = ingredientsInCart.map( i => i.ingredientId);
    if (bun) {
      ingredients.push(bun);
      ingredients.push(bun);
    }
    if (user?.name) {
      dispatch(postOrder(ingredients));
    } else {
      navigate("/login");
    }
  };

  useEffect( () => {
    if (order.id && isPageLoaded) {
      setIsOrderDetailsVisible(true);
    }
    setIsPageLoaded(true);
  }, [order] );

   return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.contentWrapper}>
          <section className={styles.mainContainer}>
                <BurgerIngredients />
                <BurgerConstructor
                  totalPrice={getTotalPrice()}
                  buyHandler={buyHandler}
                />
          </section>
        </main>
      </DndProvider>

      {ingredientDetails
            && <Modal
              title="Детали ингредиента"
              closeHandler={closeIngredientDetailsModal}
            >
              <IngredientDetails />
          </Modal>}

            {isOrderDetailsVisible
              && <Modal closeHandler={closeOrderDetailsModal}>
                <OrderDetails />
              </Modal>
            }

    </>
  );
}