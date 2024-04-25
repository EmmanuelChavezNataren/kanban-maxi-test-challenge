import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainHeaderComponent } from '@components/headers/main-header/main-header.component';
import { ScreenHeaderComponent } from '@components/headers/screen-header/screen-header.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardModalComponent } from './components/modals/board-modal/board-modal.component';
import { TaskComponent } from './components/task/task.component';
import { DashboardPage } from './dashboard.page';

const components = [MainHeaderComponent, ScreenHeaderComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DashboardPageRoutingModule,
    components,
    DragDropModule,
  ],
  exports: [BoardModalComponent],
  declarations: [
    DashboardPage,
    ColumnComponent,
    TaskComponent,
    BoardModalComponent,
  ],
})
export class DashboardPageModule {}
