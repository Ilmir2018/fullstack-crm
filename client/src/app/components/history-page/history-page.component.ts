import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from 'src/app/classes/material.service';
import { Filter, Order } from 'src/app/interfaces';
import { OrdersService } from 'src/app/services/orders.service';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.less']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false;
  offset = 0
  limit = STEP
  orders: Order[] = []
  loading = false;
  reloading = false
  noMoreOrders = false
  filter: Filter = {}

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit
    // }

    const params = Object.assign({}, this.filter, {
        offset: this.offset,
        limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  loadMore(){
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.reloading = true
    this.filter = filter
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

}
