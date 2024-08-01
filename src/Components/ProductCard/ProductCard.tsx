import { ProductModel } from "../../Models/ProductModel";
import Card from "react-bootstrap/Card";
import "./ProductCard.css";
import { Button, Row } from "react-bootstrap";
import productsStore from "../../Store/ProductsStore";

interface ProductCardProps {
    product: ProductModel;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Card className="product-card">
            {product.image && <img src={product.image} className="product-card-image" />}
            <Card.Body>
                <Card.Title>{product.title || ""}</Card.Title>
                <Card.Text>
                    <b>Description:</b> {product.description || ""}
                </Card.Text>
                <Card.Text>
                    <b>Price:</b> {product.price || ""}
                </Card.Text>
                <Row>
                    <Button className={`product-card-button`}>Edit Item</Button>
                    <Button variant="dark" onClick={() => productsStore.deleteProducct(product.id)}>
                        Delete Item
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
