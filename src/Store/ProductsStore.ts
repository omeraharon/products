import { makeAutoObservable } from "mobx"
import { persistStore } from "../Services/MobxService";
import { ProductModel } from "../Models/ProductModel";

class ProductsStore {

    constructor() {
        makeAutoObservable(this)
    }

    products: ProductModel[] = []
    persist_data = ["products"]
    
    async loadStoreData() {
        await persistStore(this, this.persist_data, "ProductsStore");
    }
    

    get getProducts() {
        return this.products
    }

    setProducts(products: ProductModel[]) {
        this.products = products;
    }

    deleteProducct(id: number) {
        this.products = this.products.filter(set => set.id !== id)
    }

    replaceProduct(newProduct: ProductModel) {
       this.products = this.products.map((product) => (product.id === newProduct.id ? { ...newProduct } : product));
    }
   
}

const productsStore = new ProductsStore();
export default productsStore;