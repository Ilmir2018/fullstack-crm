import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/classes/material.service';
import { Position } from 'src/app/interfaces';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.less']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  positions: Position[] = []
  loading = false;
  @ViewChild('modal') modalRef: ElementRef; 
  modal: MaterialInstance;
  form: FormGroup
  positionId = null

  constructor(private service: PositionService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.patchValue({
      name: null,
      cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newPos: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.onCancel()
        this.form.enable()
        this.form.reset({name: '', cost: 1})
    }

    if(this.positionId) {
      newPos._id = this.positionId
      this.service.update(newPos).subscribe(position => {
        MaterialService.toast('Изменения сохранены')
        const idx = this.positions.findIndex(p => p._id === position._id)
        this.positions[idx] = position
        completed()
      },
      error => {
        this.form.enable()
        MaterialService.toast(error.error.message)
      })
    } else {
      this.service.create(newPos).subscribe(position => {
        MaterialService.toast('Позиция создана')
        this.positions.push(position)
        completed()
      }),
      error => {
        this.form.enable()
        MaterialService.toast(error.error.message)
      }
    }

    
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)
    if(decision) {
      this.service.delete(position).subscribe(
        responce => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(responce.message)
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }

}
