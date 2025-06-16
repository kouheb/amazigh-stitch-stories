
import { authenticationScreens } from "./admin/authenticationScreens";
import { analyticsScreens } from "./admin/analyticsScreens";
import { managementScreens } from "./admin/managementScreens";
import { configurationScreens } from "./admin/configurationScreens";
import { ecommerceScreens } from "./admin/ecommerceScreens";
import { supportScreens } from "./admin/supportScreens";

export const adminScreensData = [
  ...authenticationScreens,
  ...analyticsScreens,
  ...managementScreens,
  ...configurationScreens,
  ...ecommerceScreens,
  ...supportScreens
];
