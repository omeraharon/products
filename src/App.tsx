import { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { apiUrl } from "./Enums";
import productsStore from "./Store/ProductsStore";
import { persistStore } from "./Services/MobxService";
import { ProductModel } from "./Models/ProductModel";
import ProductList from "./Components/ProductList/ProductList";
import ProductModal from "./Components/ProductModal/ProductModal";
import ActionsArea from "./Components/ActionsArea/ActionsArea";
import { getRandomDate } from "./Services/AppService";

const HandleHydrate = () => {
    return new Promise(async (resolve) => {
        await persistStore(productsStore, productsStore.persist_data, "ProductsStore");
        resolve(true);
    });
};

const App: React.FC = () => {
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        await HandleHydrate();
        !productsStore.getProducts.length && getProducts(); // get products only if store empty (to simulate a mock)
    };

    const getProducts = async () => {
        try {
            const res = await fetch(apiUrl);
            const products: ProductModel[] = await res.json();
            if (products?.length) {
                products.map((product) => (product.creationDate = getRandomDate(new Date(2012, 0, 1), new Date()))); // adding creation date to mock
                productsStore.setProducts(products);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Header />
            <ActionsArea />
            <ProductList />
            <ProductModal />
        </>
    );
};

export default App;
