import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import SupplierRegister from "../pages/supplier/Register";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/supplier/register",
        element: <SupplierRegister />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/supplier/register",
//     element: <div>Test Page - If you see this, routing works</div>,
//   },
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
// ]);
