import { Button, Form } from "react-bootstrap";
import appStore from "../../Store/AppStore";
import productsStore from "../../Store/ProductsStore";
import "./ActionsArea.css";
import { SORT_TYPES } from "../../Enums";
import { observer } from "mobx-react-lite";

const ActionsArea: React.FC = () => {
    const onChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        switch (value) {
            case SORT_TYPES.NAME:
                productsStore.sortByName();
                break;
            case SORT_TYPES.DATE:
                productsStore.sortByDate();
        }
    };
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target?.value;
        const searchItems = [...productsStore.getProducts].filter(
            (product) => searchString.length && product.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
        );
        productsStore.setSearchProducts(searchItems);
    };
    return (
        <div className="actions-area">
            <Button onClick={() => appStore.showModal(null)} className="purple-button add-product">
                Add Product
            </Button>
            {productsStore.getSearchProducts.length === 0 ? (
                <div className="sort-products">
                    <Form.Select onChange={onChangeSort}>
                        <option>Sort by</option>
                        <option value={SORT_TYPES.NAME}>Name</option>
                        <option value={SORT_TYPES.DATE}>Date</option>
                    </Form.Select>
                </div>
            ) : (
                <></>
            )}
            <>
                <Form className="products-search">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control placeholder="Search" onChange={onChangeSearch} />
                    </Form.Group>
                </Form>
                {productsStore.getSearchProducts.length ? <div>{productsStore.getSearchProducts.length} products found</div> : <></>}
            </>
        </div>
    );
};

export default observer(ActionsArea);
