import React from "react";
import { RouteData } from "../types/common";

import PageMain from "../components/pages/PageMain/PageMain";
import PageMaintenances from "../components/pages/PageMain/PageMaintenances";
import PageReclamations from "../components/pages/PageMain/PageReclamations";
import PageCars from "../components/pages/Cars/PageCars";
import PageNewCar from "../components/pages/Cars/PageNewCar";
import PageOneCar from "../components/pages/Cars/PageOneCar";
import PageNewMaintenance from "../components/pages/Maintences/PageNewMaintenance";
import PageOneMaintenance from "../components/pages/Maintences/PageOneMaintenance";
// import PageLogin from "../components/pages/PageLogin/PageLogin";
// import PageSearch from "../components/pages/PageSearch/PageSearch";
// import PageResults from "../components/pages/PageResults/PageResults";

export const privateRoutes: RouteData[] = [
    // {path: "/", component: PageMain, caption: "Главная", isVisible: true},
    {path: "/cars", component: PageCars, caption: "Машины", isVisible: true},
    {path: "/cars/new", component: PageNewCar, caption: "Новая машина", isVisible: false},
    {path: "/cars/:id", component: PageOneCar, caption: "Машина", isVisible: false},
    {path: "/maintenances", component: PageMaintenances, caption: "ТО", isVisible: true},
    {path: "/maintenances/new", component: PageNewMaintenance, caption: "Новое ТО", isVisible: false},
    {path: "/maintenances/:id", component: PageOneMaintenance, caption: "ТО", isVisible: false},
    {path: "/reclamations", component: PageReclamations, caption: "Рекламации", isVisible: true},
    // {path: "/reclamations", component: PageOneReclamation, caption: "Новая рекламация", isVisible: false},
    // {path: "/reclamations", component: PageNewReclamation, caption: "Рекламации", isVisible: false},
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