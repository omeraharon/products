import { observer } from "mobx-react-lite";
import { Button, Form, Modal } from "react-bootstrap";
import appStore from "../../Store/AppStore";
import * as formik from "formik";
import * as yup from "yup";
import { ProductModel } from "../../Models/ProductModel";
import productsStore from "../../Store/ProductsStore";

const ProductModal: React.FC = () => {
    const handleClose = () => appStore.closeModal();
    const product = appStore.getModalData;

    const { Formik } = formik;

    const schema = yup.object().shape({
        id: yup.number().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required(),
        image: yup.string().required(),
    });

    const handleSubmit = (newProduct: ProductModel) => {
        productsStore.replaceProduct(newProduct);
        appStore.closeModal();
    };
    return (
        <Modal show={appStore.getIsModalVisible} onHide={handleClose}>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        id: product?.id || productsStore.getProducts.length,
                        title: product?.title || "",
                        description: product?.description || "",
                        price: product?.price || 0,
                        image: product?.image || "",
                    }}
                >
                    {({ handleSubmit, setFieldValue, values, touched, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="productForm.ControlInput01">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    onChange={(e) => setFieldValue("title", e.target.value)}
                                    value={values.title}
                                    placeholder="title"
                                    autoFocus
                                    isValid={touched.title && !errors.title}
                                />
                                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productForm.ControlInput02">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    onChange={(e) => setFieldValue("description", e.target.value)}
                                    as="textarea"
                                    rows={5}
                                    value={values.description}
                                    placeholder="description"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productForm.ControlInput03">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    onChange={(e) => setFieldValue("price", e.target.value)}
                                    type="number"
                                    value={values.price}
                                    placeholder="price"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productForm.ControlInput04">
                                <Form.Label>Image (link)</Form.Label>
                                <Form.Control onChange={(e) => setFieldValue("image", e.target.value)} value={values.image} placeholder="image" />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default observer(ProductModal);
