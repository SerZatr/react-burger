import { IIngredient, orderFeedData, orderStatusRu } from "../../utils/constants"
import { IngredientIcon } from "./ingredient-icon";
import subtractImgPath from "../../images/subtract.svg";
import styles from "./feed.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getFeedOrderByNumber } from "../../services/actions/single-feed-order";

interface ingredientsByType {
    [number: string]: {
        ingredient: IIngredient;
        count: number;
    };
}

interface IFeedOrderDetails {
    showTitle?: boolean;
}

export function FeedOrderDetails(props: IFeedOrderDetails) {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const clearLocationState = () => {
            navigate(location.pathname, { background: undefined } as any); 
        }
        window.addEventListener("beforeunload", clearLocationState);
        return ( () =>
            window.removeEventListener("beforeunload", clearLocationState)
        );
    }, [navigate]);

    const ingredientsData = useAppSelector((state) => state.ingredients.data);
    const orderFeedData = useAppSelector((state) => state.singleFeedOrder).data; 
    
    const { number } = useParams() as {number: string};
    const dispatch = useAppDispatch();

    useEffect( () => {
        if (number) {
            dispatch(getFeedOrderByNumber(number));
        }
    }, [number]);

    const [ingredientsByType, setIngredientsByType] = useState<ingredientsByType>({});

    const getIngredientsByType = () => {
        const ingredientsByType: ingredientsByType = {};
        (orderFeedData?.ingredients ?? []).forEach( id =>  {
            const ingredient = ingredientsData.find( ingredient => ingredient._id === id);
            if (!ingredient) {
                return;
            }
            if (!ingredientsByType[ingredient?._id]) {
                ingredientsByType[ingredient._id] = {ingredient, count: 1};
            }
            else {
                ingredientsByType[ingredient._id].count++;
            }
        });
        return ingredientsByType;
    };

    useEffect(() => {
        setIngredientsByType(getIngredientsByType());
    }, [orderFeedData]);

    if (!orderFeedData) {
        return null;
    }

    const getTotalPrice = () => {
        let price = 0;
        Object.values(ingredientsByType).forEach( ({ingredient, count}) => {
            price += ingredient.price * count;
        });
        return price;
    }

    const getIngredientsContainer = () => {
        const element: JSX.Element[] = [];

        Object.values(ingredientsByType).forEach( ({ingredient, count}, index) =>  {
            element.push(
                <div key={"ingredient" + index} className={`${styles.feedOrderDetailsIngredient} mb-4`} >
                    <IngredientIcon imgUrl={ingredient.image} />
                    <div className={`${styles.titleAndPrice} text text_type_main-default ml-4`}>
                        <div>
                            {ingredient.name}
                        </div>
                        <div className={styles.cardPrice}>
                            <span className="text text_type_digits-default">
                                {count + " x " + ingredient.price}
                            </span>
                            <img className="ml-2" src={subtractImgPath} alt="??????????????????" />
                        </div>
                    </div>
                </div>
            )
        });
        return element;
    }

    let statusClass = "text text_type_main-small mb-15";
    statusClass += orderFeedData.status === "done" ? " " + styles.doneStatus : "";
    return (
        <article className={styles.feedOrderDetails}>
            { props.showTitle &&
                <span className={`${styles.feedOrderDetailsTitle} text text_type_digits-default`}>
                    {number}
                </span>
            }
            <span className="text text_type_main-medium mb-3 mt-10">
                {orderFeedData.name}
            </span>
            <span className={statusClass}>
                {orderStatusRu[orderFeedData.status]}
            </span>
            <span className="text text_type_main-medium mb-6">
                ????????????:
            </span>
            <div className={`${styles.IngredientsContainer} customScrollbar mb-10`}>
                {getIngredientsContainer()}
            </div>
            <div className={`${styles.titleAndPrice}`}>
                        <div className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(orderFeedData.createdAt)} />
                        </div>
                        <div className={styles.cardPrice}>
                            <span className="text text_type_digits-default">
                                {getTotalPrice()}
                            </span>
                            <img className="ml-2" src={subtractImgPath} alt="??????????????????" />
                        </div>
            </div>
        </article>
    )
}
