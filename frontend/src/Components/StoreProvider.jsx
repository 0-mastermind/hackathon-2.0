"use client"
import { Provider } from "react-redux";
import featuresStore from "../store/store.js";

const StoreProvider = ({children}) => {
    return <Provider store={featuresStore}>{children}</Provider>
}

export default StoreProvider;