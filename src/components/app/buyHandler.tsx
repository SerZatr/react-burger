import { IIngredientsCountById, IIngredientsInCart } from "./app";

export default async function buyHandler(
    openOrderModal: () => void,
    ingredientsInCart: IIngredientsInCart,
    setOrder: Function
) {
    openOrderModal();
    try {
        const url = "https://norma.nomoreparties.space/api/orders";
        let ingredientsIds: string[] = [];

        const getIngredientsIds = (array: string[], ingredientsCounted?: IIngredientsCountById) => {
            if (ingredientsCounted) {
                Object.keys(ingredientsCounted).forEach( id => {
                    const count = ingredientsCounted[id];
                    for (let i=0; i<count; i++ ) {
                        array.push(id);
                    }
                });
            }
        };

        getIngredientsIds(ingredientsIds, ingredientsInCart?.ingredients, );
        getIngredientsIds(ingredientsIds, ingredientsInCart?.bunIngredients);

        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ingredients: ingredientsIds})
        };
        if (ingredientsIds.length === 0) {
            throw new Error("Заказ не может быть пустым");
        } else {
            const response = await fetch(url, options);
            if(response.ok) {
                const json = await response.json();
                const number: number = json.order.number as number;
                setOrder?.(number);
            } else {
                throw new Error("Не удалось отправить заказ. Попробуйте повторить позже.");
            }
        }

    } catch (error) {
        console.log(`${error}`);
    }
}