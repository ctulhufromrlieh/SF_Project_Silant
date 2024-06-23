import React, { ComponentPropsWithoutRef } from "react";

import classes from './MyButton.module.scss';

// export enum ButtonSizeType {
//     SMALL = "SMALL",
//     NORMAL = "NORMAL",
//     LARGE = "LARGE",
// }

// export enum BorderRadiusType {
//     NORMAL = "NORMAL",
//     LARGE = "LARGE",
// }

// export enum ButtonColorScheme {
//     BLUE_WHITE = "BLUE_WHITE",
//     GRAY_BLACK = "GRAY_BLACK",
//     CYAN_BLACK = "CYAN_BLACK",
//     // SEA_WHITE = "SEA_WHITE",
// }

interface MyButtonProps extends ComponentPropsWithoutRef<"button">{
    // sizeType?: ButtonSizeType;
    // borderRadiusType?: BorderRadiusType;
    // colorScheme?: ButtonColorScheme;
    addClassNames?: string[];
}

const MyButton: React.FC<MyButtonProps> = ({children, addClassNames, ...rest}: MyButtonProps) => { 
    let usedClasses = [classes.btn_common];

    let usedRest = rest;
    if (!usedRest.type) {
        usedRest.type = "button";
    }

    if (addClassNames) {
        usedClasses.push(...addClassNames);
    }

    return (
        <button className={usedClasses.join(" ")} {...usedRest}>{children}</button>
    );
}

export default MyButton;