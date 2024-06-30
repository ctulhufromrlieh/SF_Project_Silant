import React from "react";
import { RouteData } from "../types/common";

import PageMain from "../components/pages/PageMain/PageMain";
import PageCars from "../components/pages/PageMain/PageCars";
import PageMaintenances from "../components/pages/PageMain/PageMaintenances";
import PageReclamations from "../components/pages/PageMain/PageReclamations";
import PageOneCar from "../components/pages/PageMain/PageOneCar";
import PageNewCar from "../components/pages/PageMain/PageNewCar";
// import PageLogin from "../components/pages/PageLogin/PageLogin";
// import PageSearch from "../components/pages/PageSearch/PageSearch";
// import PageResults from "../components/pages/PageResults/PageResults";

export const privateRoutes: RouteData[] = [
    {path: "/", component: PageMain, caption: "Главная", isVisible: true},
    {path: "/cars", component: PageCars, caption: "Машины", isVisible: true},
    {path: "/maintenances", component: PageMaintenances, caption: "ТО", isVisible: true},
    {path: "/reclamations", component: PageReclamations, caption: "Рекламации", isVisible: true},
    {path: "/cars/new", component: PageNewCar, caption: "Новая машина", isVisible: false},
    {path: "/cars/:id", component: PageOneCar, caption: "Машина", isVisible: false},
    // {path: "/tariffs", component: PageMain, caption: "Тарифы", isVisible: true},
    // {path: "/faq", component: PageMain, caption: "FAQ", isVisible: true},
    // {path: "/search", component: PageSearch, caption: "Поиск", isVisible: false},
    // {path: "/results", component: PageResults, caption: "Результаты", isVisible: false},
]

export const publicRoutes: RouteData[] = [
    {path: "/", component: PageMain, caption: "Главная", isVisible: true},
    // {path: "/tariffs", component: PageMain, caption: "Тарифы", isVisible: true},
    // {path: "/faq", component: PageMain, caption: "FAQ", isVisible: true},
    // {path: "/login", component: PageLogin, caption: "Авторизация", isVisible: false},
]