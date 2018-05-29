import { NgModule } from '@angular/core';
import {SharedModule} from '../shared.module';
import {ShoppingListEditorComponent} from './shopping-list-editor/shopping-list-editor.component';
import {ShoppingListComponent} from './shopping-list.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    FormsModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingListEditorComponent
  ]
})
export class ShoppingModule { }
