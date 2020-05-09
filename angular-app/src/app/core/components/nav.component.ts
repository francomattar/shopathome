import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/home" routerLinkActive="router-link-active">
          <span>Home</span>
        </a>
        <a routerLink="/products" routerLinkActive="router-link-active">
          <span>My List</span>
        </a>
        <a routerLink="/discounts" routerLinkActive="router-link-active">
          <span>My Discounts</span>
        </a>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <a *ngIf="!userInfo" href="/login/tw">Twitter</a>
        <a *ngIf="!userInfo" href="/login/gh">GitHub</a>
        <a *ngIf="!userInfo" href="/.auth/login/facebook">FaceBook</a>
        <a *ngIf="userInfo" href="/logout">Logout</a>
        <div class="user" *ngIf="userInfo">
          <p>{{ userInfo?.userDetails }}</p>
          <p>({{ userInfo?.identityProvider }})</p>
        </div>
      </div>
    </nav>
  `,
})
export class NavComponent implements OnInit {
  userInfo: UserInfo;

  async ngOnInit() {
    this.userInfo = await this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }
}
