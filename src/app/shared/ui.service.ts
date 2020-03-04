import { Subject } from 'rxjs';



export class UIService {
    // Used to show loading spinner
    loadingStateChanged = new Subject<boolean>();
}