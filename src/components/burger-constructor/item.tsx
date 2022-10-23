import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { changeIngredientPosition, removeIngredient } from "../../services/actions/cart";
import { useDrag, useDrop } from "react-dnd";
import { IIngredientsDataState } from "../../services/reducers/ingredientsData";

export enum itemType {
    top = "top",
    bottom = "bottom"
};

export const cartItemDragType = "cartItem";

interface IItemProps {
    ingredientId: string,
    index?: number,
    type?: itemType,
    isLast?: boolean
}

export function Item(props: IItemProps) {
    const ingredientsData = useSelector((state: IIngredientsDataState) => state.ingredients.data);
    const ingredient = ingredientsData?.filter( (i: any) => i._id === props.ingredientId)[0];
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: cartItemDragType,
        item: {index: props.index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropTarget] = useDrop({
        accept: cartItemDragType,
        drop(item: {index: number}) {
            dispatch(changeIngredientPosition(item.index, props.index || 0));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    let text = ingredient?.name ?? "";
    const ruType = {top: "верх", bottom: "низ"};
    let className = `ml-4 mr-4 ${styles.constructorCard}`;
    className = props.isLast ? className : className + " mb-4";
    className = isDrag ? styles.dragging + " " + className : className;
    let ingredienBoxclassName = isHover ? styles.itemHover + " " + styles.ingredientBox : styles.ingredientBox;
    text = props.type ? `${text} (${ruType[props.type]})` : text;

    if (ingredient) {
        return (
            <article className={className}  { ...ingredient.type !== "bun" && {ref: dropTarget}  }>
                <div className={ingredienBoxclassName}>
                    <ConstructorElement
                        type={props.type}
                        isLocked={!!props.type}
                        text={text}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={ () => {
                            dispatch(removeIngredient(props.index || 0));
                        }}
                        
                    />
                </div>
                {!props.type
                    && <div ref={dragRef}>
                        <DragIcon type={"primary"} />
                    </div>
                }
            </article>
        );
    } else {
        return (<></>);
    }
}
