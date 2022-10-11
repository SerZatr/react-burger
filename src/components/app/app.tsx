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

export interface IIngredientCounted {
  count: number,
  ingredient: IIngredient
}

export interface IIngredientsCountedById {
  [id: string]: IIngredientCounted;
}

export interface IIngredientsInCart {
  ingredients: IIngredientsCountedById;
  bunIngredients: IIngredientsCountedById;
}

function App() {

  const [data, setData] = useState<IIngredient[]>([]);
  const [ingredientsInCart, setIngredientsInCart] = useState<IIngredientsInCart>({
    ingredients: {},
    bunIngredients: {}
  });
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState<IIngredient | undefined>();
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);

  const getData = async () => {
    try {
      const url = "https://norma.nomoreparties.space/api/ingredients "
      const response = await fetch(url);
      console.log(response);
      if(response.ok) {
        const json = await response.json();
        const data: IIngredient[] = json.data as IIngredient[];
        setData(data);
        // temporary desicions. Puts default ingredients to card
        console.log(json.data);
        const defaultIngredients: IIngredientsInCart = {
          ingredients: {
            "60d3b41abdacab0026a733ce": {count:1, ingredient: data[8] },
            "60d3b41abdacab0026a733c9": {count:1, ingredient: data[3] },
            "60d3b41abdacab0026a733d1": {count: 1, ingredient: data[11]},
            "60d3b41abdacab0026a733d0": {count: 10, ingredient: data[10]},
          },
          bunIngredients: {"60d3b41abdacab0026a733c6": {count: 2, ingredient: data[0] }}
        }
        setIngredientsInCart(defaultIngredients);
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

  const removeIngredient = (ingredient: IIngredient) => {
    const id = ingredient._id;
    const newIngredients = structuredClone(ingredientsInCart);
    const categorie = newIngredients.ingredients[id];
    categorie.count--;
    if (categorie.count === 0) {
      delete newIngredients.ingredients[id];
    }
    setIngredientsInCart(newIngredients);
  };

  const categoriesData: any = {};
  for (let key in data) {
      let item = data[key];
      if (!categoriesData[item.type]) {
          categoriesData[item.type] = [];
      }
      categoriesData[item.type].push(item);
  };

  const getTotalPrice = () => {
    const ingredients = ingredientsInCart.ingredients;
    const bunIngredients = ingredientsInCart.bunIngredients;
    let price = 0;
    Object.keys(ingredients).forEach( id => {
      const ingredient = ingredients[id];
      price += ingredient.ingredient.price * ingredient.count;
    });
    Object.keys(bunIngredients).forEach( id => {
      const ingredient = bunIngredients[id];
      price += ingredient.ingredient.price * ingredient.count;
    });
    return price;
  };

  const closeIngredientDetailsModal = () => {
    setSelectedIngredientDetails(undefined);
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsVisible(false);
  }
  
  return (
    <>
      <AppHeader />
      <main className={styles.contentWrapper}>
        <section className={styles.mainContainer}>
          <BurgerIngredients
            categoriesData={categoriesData}
            ingredientsInCart={ingredientsInCart}
            openIngredientModal={(ingredient: IIngredient) => setSelectedIngredientDetails(ingredient)}
          />
          <BurgerConstructor
            ingredientsInCart={ingredientsInCart}
            removeIngredient={removeIngredient}
            totalPrice={getTotalPrice()}
            buyHandler={() => setIsOrderDetailsVisible(true)}
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
          </Modal>

        }
        {isOrderDetailsVisible
          && <Modal closeHandler={closeOrderDetailsModal}>
            <OrderDetails />
          </Modal>
        }
      </main>
    </>
  );
}

export default App;
