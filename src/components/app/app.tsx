import { useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "../../main.module.css"
import { data } from '../../utils/data';
import { IIngredient } from '../../utils/ingredient-type';

export interface IIngredientsInCart {
  ingredients: {
    [id: string]: {
      count: number,
      ingredient: IIngredient
    }
  };
  bunIngredients: IIngredient[];
}

function App() {

  const [ingredientsInCart, setIngredientsInCart] = useState<IIngredientsInCart>({
    ingredients: {},
    bunIngredients: []
  });

  const addIngredient = (ingredient: IIngredient) => {
    const type = ingredient.type;
    const newIngredients = structuredClone(ingredientsInCart);
    if (type === "bun") {
      if (newIngredients["bunIngredients"].length < 2) {
        newIngredients["bunIngredients"].push(ingredient);
      }
    } else {
      const id = ingredient._id;
      if (!newIngredients.ingredients[id]) {
        newIngredients.ingredients[id] = {count: 1, ingredient: ingredient};
      } else {
        newIngredients.ingredients[id].count++;
      }
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
    bunIngredients.forEach( bun => {
      price += bun.price;
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
            totalPrice={getTotalPrice()}
          />
        </section>

      </main>
    </>

  );
}

export default App;
