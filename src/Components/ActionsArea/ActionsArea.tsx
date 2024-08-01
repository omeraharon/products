import { Button } from "react-bootstrap";
import appStore from "../../Store/AppStore";
import "./ActionsArea.css";

const ActionsArea: React.FC = () => {
    return (
        <div className="actions-area">
            <Button onClick={() => appStore.showModal(null)} className="purple-button">
                Add Product
            </Button>
        </div>
    );
};

export default ActionsArea;
