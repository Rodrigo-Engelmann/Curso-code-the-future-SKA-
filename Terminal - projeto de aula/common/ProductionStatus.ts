import { ProductionStatus_e, ProductionStatusColor_e } from "./enums/enum";

export class ProductionStatus {
    status: ProductionStatus_e;
    color: ProductionStatusColor_e;

    constructor(status?: ProductionStatus_e, color?: ProductionStatusColor_e) {
        this.status = status ?? ProductionStatus_e.WaitingProduction;
        this.color = color ?? ProductionStatusColor_e.WaitingProduction;
    }
}