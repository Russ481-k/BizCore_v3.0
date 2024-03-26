import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { getCookie } from "storage/cookie";

import {
  AppLayout,
  AuthenticLayout,
  NonAuthenticLayout,
  ErrorPage401,
  ErrorPage403,
  ErrorPage404,
  ErrorPage500,
} from "routes";
import { DashboardPage } from "routes/dashboard";
import { NoticeListPage, NoticeWritePage } from "routes/notice";
import {
  CalendarPage,
  ScheduleListPage,
  ScheduleWritePage,
  WorkLogWritePage,
  WorkLogCheckPage,
} from "routes/schedule";

import { SalesListPage, SalesWritePage } from "routes/sales";
import {
  SoppListPage,
  SoppWritePage,
  SoppEstimateManagePage,
  SoppEstimateWritePage,
} from "routes/sopp";
import {
  OrderSalesReportListPage,
  OrderSalesReportWritePage,
} from "routes/order-sales-report";
import {
  ContListPage,
  ContWritePage,
  ContBusinessListPage,
  ContBuyAndSellListPage,
  ContBuyAndSellWritePage,
} from "routes/cont";
import {
  TechdListPage,
  TechdWritePage,
  TechdMaintenanceListPage,
  TechdMaintenanceWritePage,
  TechdInventoryListPage,
  TechdInventoryWritePage,
} from "routes/techd";
import {
  AutoSendMessagePage,
  ChangePwdPage,
  CommonCodePage,
  DefaultPage,
  LoginPage,
  PermissionPage,
  StaffContactPage,
  UserManagePage,
} from "routes/user";
import {
  MenuSettingPage,
  BizCoreSettingPage,
  TwoWaySettingPage,
  UMSPage,
  SystemCodePage,
} from "routes/system";

function Router() {
  const refreshToken = getCookie("refreshToken");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            !refreshToken ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
          path="/"
        />
        <Route element={<NonAuthenticLayout />}>
          <Route element={<LoginPage />} path="/login" />
        </Route>
        <Route element={<AuthenticLayout />}>
          <Route element={<ChangePwdPage />} path="/change-pwd" />
          <Route element={<AppLayout />}>
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<Outlet />} path="/notice">
              <Route element={<NoticeListPage />} path="list" />
              <Route element={<NoticeWritePage />} path="write" />
            </Route>
            <Route element={<Outlet />} path="/schedule">
              <Route element={<CalendarPage />} path="calendar" />
              <Route element={<ScheduleListPage />} path="schedule-list" />
              <Route element={<ScheduleWritePage />} path="schedule-write" />
              <Route element={<WorkLogWritePage />} path="work-log-write" />
              <Route element={<WorkLogCheckPage />} path="work-log-check" />
            </Route>
            <Route element={<Outlet />} path="/sales">
              <Route element={<SalesListPage />} path="list" />
              <Route element={<SalesWritePage />} path="write" />
            </Route>
            <Route element={<Outlet />} path="/sopp">
              <Route element={<SoppListPage />} path="list" />
              <Route element={<SoppWritePage />} path="write" />
              <Route
                element={<SoppEstimateManagePage />}
                path="estimate-manage"
              />
              <Route
                element={<SoppEstimateWritePage />}
                path="estimate-write"
              />
            </Route>
            <Route element={<Outlet />} path="/order-sales-report">
              <Route element={<OrderSalesReportListPage />} path="list" />
              <Route element={<OrderSalesReportWritePage />} path="write" />
            </Route>
            <Route element={<Outlet />} path="/cont">
              <Route element={<ContListPage />} path="list" />
              <Route element={<ContWritePage />} path="write" />
              <Route element={<ContBusinessListPage />} path="business-list" />
              <Route
                element={<ContBuyAndSellListPage />}
                path="buy-and-sell-list"
              />
              <Route
                element={<ContBuyAndSellWritePage />}
                path="buy-and-sell-write"
              />
            </Route>
            <Route element={<Outlet />} path="/techd">
              <Route element={<TechdListPage />} path="list" />
              <Route element={<TechdWritePage />} path="write" />
              <Route
                element={<TechdMaintenanceListPage />}
                path="maintenance-list"
              />
              <Route
                element={<TechdMaintenanceWritePage />}
                path="maintenance-write"
              />
              <Route
                element={<TechdInventoryListPage />}
                path="inventory-list"
              />
              <Route
                element={<TechdInventoryWritePage />}
                path="inventory-write"
              />
            </Route>
            <Route element={<Outlet />} path="/user">
              <Route element={<UserManagePage />} path="manage" />
              <Route element={<PermissionPage />} path="permission" />
              <Route element={<StaffContactPage />} path="staff-contact" />
              <Route element={<DefaultPage />} path="default" />
              <Route
                element={<AutoSendMessagePage />}
                path="auto-send-message"
              />
              <Route element={<CommonCodePage />} path="common-code" />
            </Route>
            <Route element={<Outlet />} path="/system">
              <Route element={<UMSPage />} path="ums" />
              <Route element={<TwoWaySettingPage />} path="two-way-setting" />
              <Route element={<BizCoreSettingPage />} path="bizcore-setting" />
              <Route element={<MenuSettingPage />} path="menu-setting" />
              <Route element={<SystemCodePage />} path="system-code" />
            </Route>
          </Route>
        </Route>
        <Route element={<ErrorPage401 />} path="/error/401" />
        <Route element={<ErrorPage403 />} path="/error/403" />
        <Route element={<ErrorPage500 />} path="/error/500" />
        <Route element={<ErrorPage404 />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
