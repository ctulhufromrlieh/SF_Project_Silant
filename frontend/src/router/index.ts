import React from "react";
import { RouteData } from "../types/common";

import PageMain from "../components/pages/PageMain/PageMain";
// import PageLogin from "../components/pages/PageLogin/PageLogin";
// import PageSearch from "../components/pages/PageSearch/PageSearch";
// import PageResults from "../components/pages/PageResults/PageResults";

export const privateRoutes: RouteData[] = [
    {path: "/", component: PageMain, caption: "Главная", isVisible: true},
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