import { useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "../app/app.module.css"
import { IIngredient } from '../../utils/ingredient-type';
import React from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import buyHandler from './buyHandler';
import { OrderContext } from '../../services/order-context';
import { DataContext } from '../../services/data-context';
import { IngredientsInCart } from '../../services/ingredients-in-cart-context';

export interface IIngredientsCountById {
  [id: string]: number;
}

export interface IIngredientsInCart {
  ingredients: IIngredientsCountById;
  bunIngredients: IIngredientsCountById;
}

function App() {

  const [data, setData] = useState<IIngredient[]>([]);
  const [ingredientsInCart, setIngredientsInCart] = useState<IIngredientsInCart>({
    ingredients: {},
    bunIngredients: {}
  });
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState<IIngredient | undefined>();
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);
  const [order, setOrder] = useState<number>();

  const getData = async () => {
    try {
      const url = "https://norma.nomoreparties.space/api/ingredients "
      const response = await fetch(url);
      if(response.ok) {
        const json = await response.json();
        const data: IIngredient[] = json.data as IIngredient[];
        setData(data);
      } else {
        throw new Error("Не удаось загрузить данные. Попробуйте открыть страницу позже.");
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const getTotalPrice = () => {
    const ingredientsCount = ingredientsInCart.ingredients;
    const bunIngredients = ingredientsInCart.bunIngredients;
    let price = 0;
    Object.keys(ingredientsCount).forEach( id => {
      const ingredient = data.filter( i => i._id === id )[0];
      price += ingredient.price * ingredientsCount[id];
    });
    Object.keys(bunIngredients).forEach( id => {
      const ingredient = data.filter( i => i._id === id )[0];
      price += ingredient.price * ingredientsCount[id];
    });
    return price;
  };

  const closeIngredientDetailsModal = () => {
    setSelectedIngredientDetails(undefined);
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsVisible(false);
  };

  const openOrderModal = () => {
    setIsOrderDetailsVisible(true);
  };

   return (
    <>
      <AppHeader />
      <OrderContext.Provider value={{order, setOrder}}>
        <DataContext.Provider value={{data, setData}}>
          <IngredientsInCart.Provider value={{ingredientsInCart, setIngredientsInCart}}>
            <main className={styles.contentWrapper}>
              <section className={styles.mainContainer}>
                <BurgerIngredients
                  openIngredientModal={(ingredient: IIngredient) => setSelectedIngredientDetails(ingredient)}
                />
              
                <BurgerConstructor
                  totalPrice={getTotalPrice()}
                  buyHandler={() => buyHandler(openOrderModal, ingredientsInCart, setOrder)}
                />
              </section>

              {selectedIngredientDetails
                && <Modal
                  title="Детали ингредиента"
                  closeHandler={closeIngredientDetailsModal}
                >
                  <IngredientDetails
                    ingredient={selectedIngredientDetails}
                  />
              </Modal>}

              {isOrderDetailsVisible
                && <Modal closeHandler={closeOrderDetailsModal}>
                  <OrderDetails />
                </Modal>
              }
            
            </main>
            </IngredientsInCart.Provider>
          </DataContext.Provider>
        </OrderContext.Provider>
    </>
  );
}

export default App;
