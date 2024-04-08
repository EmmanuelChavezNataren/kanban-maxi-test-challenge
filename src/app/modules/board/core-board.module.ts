import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardFacade } from './facades/board.facade';
import { BoardProvider } from './providers/board.provider';
import { BoardRepository } from './repositories/board.repository';
import { BoardEffects } from './store/board.effects';
import * as fromReducer from './store/board.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  providers: [BoardFacade, BoardRepository, BoardProvider],
})
export class CoreBoardModule {}
