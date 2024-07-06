import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthenticationService } from "../../auth/services/authentication.service";
import { switchMap } from "rxjs/operators";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const URLS_TO_EXCLUDE = [
    "api.ipify.org",
    "3.7.55.235:8000"
  ]

  for (const url of URLS_TO_EXCLUDE) {
    if (req.url.includes(url)) {
      return next(req);
    }
  }

  return authService.getIdToken().pipe(
    switchMap(token => {
      console.log('idToken:', token);
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    })
  );
};
