import { Reflector } from "@nestjs/core";
import { UserRole } from "../../users/entities/user-role.js";

export const Roles = Reflector.createDecorator<UserRole[]>();