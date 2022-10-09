import { useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "../app/app.module.css"
import { IIngredient } from '../../utils/ingredient-type';
import React from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

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
  

  const getData = async () => {
    try {
      const url = "https://norma.nomoreparties.space/api/ingredients "
      const response = await fetch(url);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.log(`Не удаось загрузить данные. Попробуйте открыть страницу позже. ${error}`);
    }
    };
  

  React.useEffect(() => {
    getData();
  }, [])

  const [ingredientsInCart, setIngredientsInCart] = useState<IIngredientsInCart>({
    ingredients: {},
    bunIngredients: {}
  });
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState<IIngredient | undefined>();
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);

  const addIngredient = (ingredient: IIngredient) => {
    const newIngredients = structuredClone(ingredientsInCart);
    const id = ingredient._id;
    const add = (ingrObj: IIngredientsCountedById) => {
      if (!ingrObj[id]) {
        ingrObj[id] = {count: 1, ingredient: ingredient};
      } else {
        ingrObj[id].count++;
      }
    }

    const bunId = Object.keys(newIngredients["bunIngredients"])[0];
    const bunsCount = newIngredients["bunIngredients"][bunId]?.count ?? 0;

    const checkId = bunId === id || !bunId;
    const type = ingredient.type;
    if (type === "bun" && bunsCount < 2 && checkId) {
        add(newIngredients.bunIngredients);
    } else if (type !== "bun") {
      add(newIngredients.ingredients);
    }
    setIngredientsInCart(newIngredients);
  }

  const removeIngredient = (ingredient: IIngredient) => {
    const id = ingredient._id;
    const newIngredients = structuredClone(ingredientsInCart);
    const categorie = newIngredients.ingredients[id];
    categorie.count--;
    if (categorie.count === 0) {
      delete newIngredients.ingredients[id];
    }
    setIngredientsInCart(newIngredients);
  }

  const categoriesData: any = {};
  for (let key in data) {
      let item = data[key];
      if (!categoriesData[item.type]) {
          categoriesData[item.type] = [];
      }
      categoriesData[item.type].push(item);
  }

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
  }
  
  return (
    <>
      <AppHeader />
      <main className={styles.contentWrapper}>
        <section className={styles.mainContainer}>
          <BurgerIngredients
            addIngredient={addIngredient}
            categoriesData={categoriesData}
            ingredientsInCart={ingredientsInCart}
          />
          <BurgerConstructor
            ingredientsInCart={ingredientsInCart}
            removeIngredient={removeIngredient}
            openIngredientModal={(ingredient: IIngredient) => setSelectedIngredientDetails(ingredient)}
            totalPrice={getTotalPrice()}
            buyHandler={() => setIsOrderDetailsVisible(true)}
          />
        </section>
        {selectedIngredientDetails
          && <IngredientDetails
            ingredient={selectedIngredientDetails}
            closeHandler={() => setSelectedIngredientDetails(undefined)}
          />
        }
        {isOrderDetailsVisible
          && <OrderDetails
            closeHandler={() => setIsOrderDetailsVisible(false)}
          />
        }
      </main>
    </>

  );
}

export default App;
