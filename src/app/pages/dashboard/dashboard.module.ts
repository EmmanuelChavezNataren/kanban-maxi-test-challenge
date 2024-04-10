import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainHeaderComponent } from '@components/headers/main-header/main-header.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { DashboardPage } from './dashboard.page';

const components = [MainHeaderComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    components,
    DragDropModule,
  ],
  declarations: [DashboardPage, ColumnComponent, TaskComponent],
})
export class DashboardPageModule {}