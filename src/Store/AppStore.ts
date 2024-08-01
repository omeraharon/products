import { makeAutoObservable } from "mobx"
import { ProductModel } from "../Models/ProductModel";

class AppStore {

    constructor() {
        makeAutoObservable(this)
    }

    isModalVisible: boolean = false;
    modalData: ProductModel | null = null;
    

    get getIsModalVisible() {
        return this.isModalVisible
    }

    get getModalData() {
        return this.modalData
    }

    showModal(modalData: any) {
        this.isModalVisible = true;
        this.modalData = modalData;
    }

    closeModal() {
        this.isModalVisible = false;
        this.modalData = null;
    }
}

const appStore = new AppStore();
export default appStore;