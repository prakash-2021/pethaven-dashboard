export interface RouteInfo {
  isNested: boolean;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

// Get the active path
export const formatRouteName = (path: string): string => {
  if (path === "/") return "Dashboard";
  const segment = path.slice(1).split("/")[0];
  return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
};

// Get the nested routes if available
export const getRouteInfo = (pathname: string, state?: any): RouteInfo => {
  const paths = pathname.split("/").filter(Boolean);

  // For root routes or first-level routes, just show the title
  if (paths.length <= 1) {
    return {
      isNested: false,
      title: formatRouteName(pathname),
    };
  }

  // Special case for navbar items that should just show title
  if (paths.length === 2) {
    // Check if it's one of the special routes like /store/products or /accessories
    if (
      (paths[0] === "store" && paths[1] === "products") ||
      paths[1] === "accessories"
    ) {
      return {
        isNested: false,
        title: paths[1].charAt(0).toUpperCase() + paths[1].slice(1),
      };
    }
    if (
      (paths[0] === "analytics" && paths[1] === "report") ||
      paths[1] === "coupon"
    ) {
      return {
        isNested: false,
        title: paths[1].charAt(0).toUpperCase() + paths[1].slice(1),
      };
    }
  }

  // Create breadcrumbs
  const breadcrumbs = [];

  // Add first segment (parent route)
  breadcrumbs.push({
    label: formatRouteName("/" + paths[0]),
    path: "/" + paths[0],
  });

  // If it's a store related path, ensure we show "Store" as the first breadcrumb
  if (paths[0] === "store") {
    // For paths like /store/products/123
    if (paths.length > 2) {
      breadcrumbs.push({
        label: paths[1].charAt(0).toUpperCase() + paths[1].slice(1), // "Products"
        path: `/${paths[0]}/${paths[1]}`, // "/store/products"
      });

      // Add the ID or orderNumber
      const displayLabel = state?.orderNumber || paths[2];
      breadcrumbs.push({
        label: displayLabel,
        path: pathname,
      });
    }
  } else if (paths[2]) {
    if (paths.length > 2) {
      breadcrumbs.push({
        label: state?.name,
        path: `/${paths[0]}/${paths[2]}`,
        state: { orderNumber: state?.name },
      });

      // Add the ID or orderNumber
      const displayLabel = state?.orderNumber || paths[2];
      breadcrumbs.push({
        label: displayLabel,
        path: pathname,
        state: { orderNumber: state?.name },
      });
    }
  } else if (paths[0] === "customers") {
    const displayLabel =
      state?.orderNumber || localStorage.getItem("customerName");
    breadcrumbs.push({
      label: displayLabel,
      path: pathname,
    });
  } else {
    const displayLabel =
      state?.orderNumber || paths[1] || localStorage.getItem("customerName");
    breadcrumbs.push({
      label: displayLabel,
      path: pathname,
    });
  }

  return {
    isNested: true,
    title: formatRouteName(pathname),
    breadcrumbs: breadcrumbs,
  };
};

// Get the Location name
export const getLocationName = (pathname: string): string => {
  if (pathname === "/") return "Dashboard";
  const parentRoute = pathname.slice(1).split("/")[0];
  return parentRoute
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
