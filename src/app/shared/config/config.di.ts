import { createInjectionToken } from "../utils/di";
import { AppConfig } from "./config.modal";

export const [injectAppConfig, provideAppConfig] =
    createInjectionToken<AppConfig>('Application Configuration');
