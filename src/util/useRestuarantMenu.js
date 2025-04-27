import { useState, useEffect } from "react";
import { MENU_URL } from "../util/constants";

const useRestuarantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async() => {
        const data = await fetch(MENU_URL + resId);
        const json = await data.json();
        setResInfo(json?.data);
    }

    return resInfo;
}

export default useRestuarantMenu;