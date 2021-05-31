import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/classes/material.service';
import { Position } from 'src/app/interfaces';
import { PositionService } from 'src/app/services/position.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.less']
})
export class OrderPositionsComponent implements OnInit {


  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
    private positionsService: PositionService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params['id'])
        }
      ),
      map(
        (positions: Position[]) => {
          return positions.map(position => {
            position.quantity = 1;
            return position
          })
        }
      )
    )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено x${position.quantity}`)
    this.orderService.add(position)
  }

}
