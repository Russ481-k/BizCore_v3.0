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
import {
  OneWayAutoSendStatusPage,
  OneWayReservationPage,
  OneWaySendAlarmTalkPage,
  OneWaySendMessageExcelPage,
  OneWaySendMessagePage,
  OneWaySendStatusPage,
  TwoWayConsultPage,
  TwoWayReservationPage,
  TwoWayResponseSummaryPage,
  TwoWayScenarioPage,
  TwoWaySendMessagePage,
  TwoWaySendStatusPage,
} from "routes/send";
import { Stats001Page, Stats002Page, Stats003Page } from "routes/stats";
import { AlarmTalkTemplatePage, MessageTemplatePage } from "routes/template";
import { AddressManagePage } from "routes/address";
import {
  AlarmTalkTemplateManagePage,
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
              <Navigate to="/one-way/send-message" />
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
            <Route element={<Outlet />} path="/one-way">
              <Route element={<OneWaySendMessagePage />} path="send-message" />
              <Route element={<OneWayReservationPage />} path="reservation" />
              <Route element={<OneWaySendStatusPage />} path="send-status" />
              <Route
                element={<OneWaySendMessageExcelPage />}
                path="send-message-excel"
              />
              <Route
                element={<OneWaySendAlarmTalkPage />}
                path="send-alarm-talk"
              />
              <Route
                element={<OneWayAutoSendStatusPage />}
                path="auto-send-status"
              />
            </Route>
            <Route element={<Outlet />} path="/two-way">
              <Route element={<TwoWaySendMessagePage />} path="send-message" />
              <Route element={<TwoWayReservationPage />} path="reservation" />
              <Route element={<TwoWaySendStatusPage />} path="send-status" />
              <Route element={<TwoWayConsultPage />} path="consult" />
              <Route
                element={<TwoWayResponseSummaryPage />}
                path="response-summary"
              />
              <Route element={<TwoWayScenarioPage />} path="scenario" />
            </Route>
            <Route element={<Outlet />} path="/template">
              <Route element={<MessageTemplatePage />} path="message" />
              <Route element={<AlarmTalkTemplatePage />} path="alarm-talk" />
            </Route>
            <Route element={<Outlet />} path="/address">
              <Route element={<AddressManagePage />} path="manage" />
            </Route>
            <Route element={<Outlet />} path="/stats">
              <Route element={<Stats001Page />} path="001" />
              <Route element={<Stats002Page />} path="002" />
              <Route element={<Stats003Page />} path="003" />
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
              <Route
                element={<AlarmTalkTemplateManagePage />}
                path="alarm-talk-template"
              />
              <Route element={<CommonCodePage />} path="common-code" />
            </Route>
            <Route element={<Outlet />} path="/system">
              <Route element={<UMSPage />} path="ums" />
              <Route element={<TwoWaySettingPage />} path="two-way-setting" />
              <Route element={<BizCoreSettingPage />} path="BizCore-setting" />
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
