import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "change-password",
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
    children: [
      {
        path: "change-password",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
