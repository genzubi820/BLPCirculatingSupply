import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

/**
 * simple can activate guard. Can also use a move sophisticated service to
 * provide auth information about the user. But for simplicity, not using any other service
 * @param route
 * @param state
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    const router = inject(Router);
    router.navigate(['/home']).then();
    return false;
  }
  return true;
};
