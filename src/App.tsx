import { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { apiUrl } from "./Enums";
import productsStore from "./Store/ProductsStore";
import { persistStore } from "./Services/MobxService";
import { ProductModel } from "./Models/ProductModel";

const HandleHydrate = () => {
    return new Promise(async (resolve) => {
        await persistStore(productsStore, productsStore.persist_data, "ProductsStore");
        resolve(true);
    });
};

function App() {
    useEffect(() => {
        HandleHydrate();
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch(apiUrl);
            const products: ProductModel[] = await res.json();
            products?.length && productsStore.setProducts(products);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Header />
        </>
    );
}

export default App;
