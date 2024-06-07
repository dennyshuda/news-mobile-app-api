import { Application, Router } from "express";
import { AuthRouter } from "./auth";
import { PostRouter } from "./post";
import { UserRouter } from "./user";

const _router: Array<[string, Router]> = [
	["/auth", AuthRouter],
	["/post", PostRouter],
	["/user", UserRouter],
];

export const routes = (app: Application) => {
	_router.forEach((route) => {
		const [url, router] = route;
		app.use(url, router);
	});
};
