import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/classes/material.service';
import { Category } from 'src/app/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.less']
})
export class CategoriesFormComponent implements OnInit {


  form: FormGroup
  isNew = true
  @ViewChild('input') inputRef: ElementRef
  image: File
  imagePreview: any;
  category: Category;

  constructor(private route: ActivatedRoute, 
    private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
    .pipe(
      switchMap((params: Params) => {
        if(params['id']) {
          this.isNew = false;
          return this.categoriesService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(category => {
      if(category) {
        this.category = category
        this.form.patchValue({
          name: category.name
        })
        this.imagePreview = category.imageSrc
        MaterialService.updateTextInputs()
      }
      this.form.enable()
    }, error => {
      MaterialService.toast(error.error.message)
    })
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file;

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if(this.isNew) {
      //create
     obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      //update
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  deleteCategory() {
      const decision = window.confirm(`Вы уверены что вы хотите удалить категорию ${this.category.name}`)

      if(decision) {
        this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
      }
      
  }

}
