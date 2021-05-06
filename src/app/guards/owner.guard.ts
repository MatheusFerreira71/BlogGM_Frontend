import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ReturnedUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  constructor(private postSrv: PostService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const { params } = route;
    const { id } = params;
    const user: ReturnedUser = JSON.parse(localStorage.getItem('user'));
    const uniquePost = await this.postSrv.obterUm(id);
    if (uniquePost && user) {
      if (uniquePost.post.usuario._id === user._id) {
        return new Promise(resolve => resolve(true));
      }
    }
    return new Promise(resolve => resolve(this.router.createUrlTree(['/'])))
  }

}

