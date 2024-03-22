import { render, RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { AppStore, RootState, setupStore } from "storage/redux/store";

interface Options extends RenderOptions {
  partialRootState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithRedux(
  ui: React.ReactElement,
  {
    partialRootState = {},
    store = setupStore(partialRootState),
    ...renderOptions
  }: Options = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
