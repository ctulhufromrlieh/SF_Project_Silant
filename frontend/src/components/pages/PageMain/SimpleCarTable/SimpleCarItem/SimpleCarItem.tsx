import React from "react";

import classes from "./SimpleCarItem.module.scss";
import { SimpleCar } from "../../../../../types/api";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
// import { useTypedSelector } from "../../../../hooks/useTypedSelector";
// import { useActions } from "../../../../hooks/useActions";
// import Loader from "../../../UI/Loader/Loader";

// interface SimpleCarItemProps {
//     item: SimpleCar;
// };

const SimpleCarItem: React.FC<SimpleCar> = ({id, car_model__name, car_num, engine_model__name, engine_num, transmission_model__name, transmission_num,
    main_bridge_model__name, main_bridge_num, steerable_bridge_model__name, steerable_bridge_num}) => {
    return (
        <div className={classes.item}>
            <div className={classes.id}>
                {
                    id != -1 
                ?
                    id + 1 
                :
                    null}
                {/* {id} */}
            </div>
            <div className={classes.car_model__name}>{car_model__name}</div>
            <div className={classes.car_num}>{car_num}</div>
            <div className={classes.engine_model__name}>{engine_model__name}</div>
            <div className={classes.engine_num}>{engine_num}</div>
            <div className={classes.transmission_model__name}>{transmission_model__name}</div>
            <div className={classes.transmission_num}>{transmission_num}</div>
            <div className={classes.main_bridge_model__name}>{main_bridge_model__name}</div>
            <div className={classes.main_bridge_num}>{main_bridge_num}</div>
            <div className={classes.steerable_bridge_model__name}>{steerable_bridge_model__name}</div>
            <div className={classes.steerable_bridge_num}>{steerable_bridge_num}</div>
        </div>
    );
}

export default SimpleCarItem;