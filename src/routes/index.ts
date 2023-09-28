import { Application } from "express";
import usersRoutes from "./users.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/users", usersRoutes);
  }
}
