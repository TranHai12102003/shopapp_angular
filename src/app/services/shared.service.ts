// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedCategoryIdSource = new BehaviorSubject<number>(0);
  selectedCategoryId$ = this.selectedCategoryIdSource.asObservable();

  private keywordSource = new BehaviorSubject<string>('');
  keyword$ = this.keywordSource.asObservable();

  updateSelectedCategoryId(categoryId: number) {
    this.selectedCategoryIdSource.next(categoryId);
  }

  updateKeyword(keyword: string) {
    this.keywordSource.next(keyword);
  }
}
