import { OrderColors_e } from './enums/enum'

export class ProductionOrder {
    label: string;
    value: string;
    key: string | null;
    icon: string;
    image: string;
    description: string;
    color: keyof typeof OrderColors_e;
    productImage: string;
    quantity: number;

    constructor() {
        this.label = '';
        this.value = '';
        this.key = null;
        this.icon = '';
        this.image = '';
        this.description = '';
        this.color = '';
        this.productImage = '';
        this.quantity = 0;
    }
}

