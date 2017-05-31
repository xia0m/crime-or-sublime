import { Request, RequestHandler, Response, Router } from "express";
import { resolve } from "path";
import { CoSAbstractRouteHandler } from "./cos-abstract-route-handler";
import { CoSRouteConstants, RequestPathTupleIndices } from "./cos-route-constants";
import { SessionRouter } from "./session/session-router";
import { UserRegistrationRouter } from "./user/user-registration/user-registration-router";

/**
 * Initializes all middleware for CoS. Installs all routes and handlers into
 * a single express router.
 */
export class CoSRouter {
    private router: Router;
    private routeHandlers: CoSAbstractRouteHandler[] = [];

    /**
     * Instantiates the router
     */
    public constructor() {
        this.router = Router();
    }

    /**
     * Initializes all static routes.
     */
    public initializeStaticRoutes(): void {
        for (const feRoute of CoSRouteConstants.COS_CLIENT_PATHS) {
            const indexPath = resolve(__dirname + "/../public/index.html");
            // Wanted to define function as method but instance gets lost and
            // there's not access to the CLIENT_INDEX_PATH field.
            this.getRouter().get(feRoute, (req: Request, res: Response) => {
                res.sendFile(indexPath);
            });
        }
    }

    /**
     * Initializes all routehandlers for CoS and installs them to router.
     */
     public intializeRouteHandlers(): void {
         this.routeHandlers.push(new SessionRouter(this.router));
         this.routeHandlers.push(new UserRegistrationRouter(this.router));
     }

    /**
     * Simple getter method for router associated with class.
     */
    public getRouter() {
        return this.router;
    }

}
