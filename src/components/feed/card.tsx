import { IIngredientsDataState } from "../../services/reducers/ingredients-data";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { orderFeedData, orderStatusRu } from "../../utils/constants";
import subtractImgPath from "../../images/subtract.svg";
import styles from "./feed.module.css";
import { IngredientIcon } from "./ingredient-icon";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
interface ICardProps {
    orderFeedData: orderFeedData;
    large?: boolean;
}

export default function Card(props: ICardProps) {
    const ingredientsData = useAppSelector((state: IIngredientsDataState) => state.ingredients.data);
    const location = useLocation();

    const getPrice = () => {
        let totalPrice = 0;
        for (const id of props.orderFeedData.ingredients) {
            const ingredientPrice = ingredientsData.find( ingredient => ingredient._id === id)?.price;
            totalPrice += ingredientPrice ?? 0;
        };
        return totalPrice
    }

    const getIngredientIcons = () => {
        const element = [];
        for (const id of props.orderFeedData.ingredients) {
            const imgUrl = ingredientsData.find( ingredient => ingredient._id === id)?.image;
            if (imgUrl) {
                element.push(
                    <IngredientIcon imgUrl={imgUrl} key={"icon" + id + element.length} class={styles.overlaying} />
                );
                const ingredientsCount = Object.keys(props.orderFeedData.ingredients).length
                if (element.length === 4 && ingredientsCount > 5) {
                    const text = "+" + (props.orderFeedData.ingredients.length - 5);
                    element.push(
                        <IngredientIcon imgUrl={imgUrl} key={"icon" + id + element.length} text={text} class={styles.overlaying} />
                    )
                    break;
                }
            }

        }
        return element;
    }

    let className = styles.card;
    className += props.large ? " mb-6" : " mb-4";
    return (
        <article className={className}>
            <Link
                to={{
                    pathname: `${props.orderFeedData._id}`,
                    state: {background: location, oderNum: props.orderFeedData.number}
                } as any}
                state={{background: location, oderNum: props.orderFeedData.number}}
            >
                <div className={`${styles.header} mb-6`}>
                    <span className="text text_type_digits-default">
                        {"#" + props.orderFeedData.number}
                    </span>
                    <span className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(props.orderFeedData.createdAt)} />
                    </span>
                </div>
                <div className={`${styles.name} text text_type_main-medium mb-6`}>
                    {props.orderFeedData.name}
                </div>
                {
                    props.large &&
                        <div className="text text_type_main-small mb-6">
                            {orderStatusRu[props.orderFeedData.status]}
                        </div>
                }
                <div className={styles.cardFooter}>
                    <div className={`${styles.itemsContainer} mr-6`}>
                        {getIngredientIcons()}
                    </div>
                    <div className={styles.cardPrice}>
                        <span className="text text_type_digits-default">
                            {getPrice()}
                        </span>
                        <img className="ml-2" src={subtractImgPath} alt="Кристаллы" />
                    </div>
                </div>
            </Link>
        </article>
    )
}