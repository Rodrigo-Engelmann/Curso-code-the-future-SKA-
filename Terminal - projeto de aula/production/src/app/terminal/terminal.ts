import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { ProductionControl } from '../production-control/production-control'
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogSelect } from '../dialog-select/dialog-select';

import { NgStyle } from '@angular/common'
import { ProductionOrder } from '../../../../common/productionOrder';
import { OrderColors_e, ProductionStatus_e, ProductionStatusColor_e } from '../../../../common/enums/enum'
import { ProductionStatus} from '../../../../common/ProductionStatus';

import productionOrders from '../../assets/files/production-orders.json';
import stopType from '../../assets/files/stop-types.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminal',
  imports: [ProductionControl, MatDialogModule, NgStyle],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal {
  @ViewChildren(ProductionControl) productionControl!: QueryList<ProductionControl>;

  readonly dialog: MatDialog = inject(MatDialog);

  productionOrders: ProductionOrder[] = productionOrders as ProductionOrder[];
  stopType: any = stopType;
  productionOrder: ProductionOrder = new ProductionOrder();
  productionStatus: ProductionStatus = new ProductionStatus();

  OrderColors_e: typeof OrderColors_e = OrderColors_e;
  ProductionStatus_e: typeof ProductionStatus_e = ProductionStatus_e;

  disabledStyle: any = {};
  constructor(private router: Router) {}

  async setProductionOrder(): Promise<void> {
    const dialogData: object = {
      dialogTitle: 'Selecionar ordem de produção',
      optionsList: this.productionOrders
    }

    const newProductionOrder: ProductionOrder = await this.openSelectDialog(dialogData);
    if (!newProductionOrder) return;

    this.productionControl.forEach((prodControl: any) => prodControl.resetValues())
    this.productionStatus = new ProductionStatus(ProductionStatus_e.InProduction, ProductionStatusColor_e.InProduction)
    
    if (newProductionOrder.key === this.productionOrder.key) return;
    
    this.productionOrder = newProductionOrder;
    this.disabledStyle = {'opacity': (!this.productionOrder.key || (this.productionStatus.color === ProductionStatusColor_e.Stop)) ? '0,5' : '1'}
  }

  async setStopType(): Promise<void> {
    const dialogData: object = {
      dialogTitle: 'Selecionar motivo de parada',
      optionsList: this.stopType
    }

    const stopType = await this.openSelectDialog(dialogData);
    if (!stopType) return;

    this.productionStatus = {
      color: ProductionStatusColor_e.Stop,
      status: ProductionStatus_e[stopType.value as keyof typeof ProductionStatus_e]
    }
  }

  openSelectDialog(dialogData: any): Promise<ProductionOrder> {
    const dialogRef: MatDialogRef<DialogSelect, any> = this.dialog.open(DialogSelect, {
      width: '950px',
      panelClass: 'custom-dialog',
      data: dialogData
    });
    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('--------------------result :', result)
        resolve(result);
      })
    })
  }

  openImage(imageUrl:string): void {
    this.router.navigate(['/image', imageUrl]);
  }
}
