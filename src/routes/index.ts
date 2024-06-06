import { Application, Router } from "express";
import { AuthRouter } from "./auth";

const _router: Array<[string, Router]> = [["/auth", AuthRouter]];

export const routes = (app: Application) => {
	_router.forEach((route) => {
		const [url, router] = route;
		app.use(url, router);
	});
};
