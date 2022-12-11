import styles from "./feed.module.css";

interface IIngredientIconProps {
    imgUrl: string;
    text?: string;
    class?: string
}

export function IngredientIcon(props: IIngredientIconProps) {
    
    return (
        <div className={`${styles.ingredientIconWrapper} ${props.class}`} >
            <div className={styles.ingredientIconBackground} />
            <div className={styles.ingredientIcon} style={{backgroundImage: `url(${props.imgUrl})`}} />
            {props.text && (
                <>
                    <div className={styles.dim} />
                    <span className={` ${styles.iconText} text text_type_main-default`}>
                        { props.text }
                    </span>
                </>)
            }
        </div>
    );
}