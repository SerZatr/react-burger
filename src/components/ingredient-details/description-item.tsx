interface IIngredientProps {
    name: string;
    property: number;
}

export default function DescriptionItem(props: IIngredientProps) {
    return(
        <div>
            <p className="text text_type_main-small mb-2"> {props.name} </p>
            <p
                className="text text_type_digits-default"
                data-cy="itemProperty"
            > {props.property} </p>
        </div>
    );
}
