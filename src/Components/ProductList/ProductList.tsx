import { observer } from "mobx-react-lite";
import productsStore from "../../Store/ProductsStore";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList: React.FC = () => {
    return (
        <div className="product-list">
            {productsStore.getProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default observer(ProductList);
