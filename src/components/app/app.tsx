import { useCallback, useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "../app/app.module.css"
import React from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredientsData';
import { postOrder } from '../../services/actions/order';
import { clearIngredientDetails } from '../../services/actions/ingredientDetails';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IOrderState } from '../../services/reducers/order';
import { IIngredientsDataState } from '../../services/reducers/ingredientsData';
import { IIngredientDetailsState } from '../../services/reducers/ingredientDetails';
import { ICartState } from '../../services/reducers/cart';

function App() {
  const ingredientsData = useSelector((state: IIngredientsDataState) => state.ingredients.data);
  const ingredientsInCart = useSelector((state: ICartState) => state.cart.ingredients);
  const order = useSelector((state: IOrderState) => state.order);
  const bun = useSelector((state: ICartState) => state.cart.bun);
  const ingredientDetails = useSelector((state: IIngredientDetailsState) => state.ingredientDetails.ingredient);
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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

  const closeIngredientDetailsModal = () => {
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
    dispatch(postOrder(ingredients));
  };

  useEffect( () => {
    if(order.id) {
      setIsOrderDetailsVisible(true);
    }
  }, [order] );

   return (
    <>
      <AppHeader />
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

export default App;
