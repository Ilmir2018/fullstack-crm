import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/classes/material.service';
import { Order, OrderPosition } from 'src/app/interfaces';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {


  isRoot: boolean
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance
  pending = false
  oSub: Subscription

  constructor(private router: Router, public order: OrderService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  openModal() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
        this.modal.close()
        this.pending = false
      },
      error => MaterialService.toast(error.error.message)
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

}
