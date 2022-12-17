import { Router } from 'express';

export interface Route {
  readonly path?: string;
  readonly router: Router;
}
