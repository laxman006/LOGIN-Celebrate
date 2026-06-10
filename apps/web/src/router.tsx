import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { RegistryPage } from "@/pages/RegistryPage";
import { CalculatorPage } from "@/pages/CalculatorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RouteErrorBoundary } from "@/components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary><NotFoundPage /></RouteErrorBoundary>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "registry",
        element: <RegistryPage />,
      },
      {
        path: "registry/:category",
        element: <RegistryPage />,
      },
      {
        path: "registry/:category/:name",
        element: <RegistryPage />,
      },
      {
        path: "calculator",
        element: <CalculatorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
