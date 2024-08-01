import { observer } from "mobx-react-lite";
import productsStore from "../../Store/ProductsStore";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList: React.FC = () => {
    const products = productsStore.getSearchProducts.length ? productsStore.getSearchProducts : productsStore.getProducts;
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default observer(ProductList);
