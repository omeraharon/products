import { makeAutoObservable } from "mobx"
import { persistStore } from "../Services/MobxService";
import { ProductModel } from "../Models/ProductModel";

class ProductsStore {

    constructor() {
        makeAutoObservable(this)
    }

    products: ProductModel[] = []
    searchProducts: ProductModel[] = []
    persist_data = ["products"]
    
    async loadStoreData() {
        await persistStore(this, this.persist_data, "ProductsStore");
    }
    

    get getProducts() {
        return this.products
    }

    get getSearchProducts() {
        return this.searchProducts
    }

    setProducts(products: ProductModel[]) {
        this.products = products;
    }
    setSearchProducts(products: ProductModel[]) {
        this.searchProducts = products;
    }

    deleteProducct(id: number) {
        this.products = this.products.filter(set => set.id !== id)
    }

    replaceProduct(newProduct: ProductModel) {
       this.products = this.products.map((product) => (product.id === newProduct.id ? { ...newProduct } : product));
    }

    addProduct(newProduct: ProductModel) {
        this.products.push(newProduct)
    }

    sortByName() {
        this.products = this.products.sort((a, b) => {
            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
                return -1;
            }
            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
                return 1;
            }
            return 0;
         });
    }

    sortByDate() {
        this.products = this.products.sort(({creationDate: a}, {creationDate: b}) => a < b ? 1 : a > b ? -1 : 0)
    }
   
}

const productsStore = new ProductsStore();
export default productsStore;