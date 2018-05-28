export function toggleLang() {
  return (dispatch, getState) => {
    if (getState().globals.language === 'en') dispatch({ type: 'TOGGLE_LANG', language: 'fr' });
    else dispatch({ type: 'TOGGLE_LANG', language: 'en' });
  };
}

export function openModal(modalType) {
  return { type: 'OPEN_MODAL', modalType };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: 'BEFORE_CLOSE_MODAL' });

    setTimeout(() => {
      dispatch({ type: 'CLOSE_MODAL' });
    }, 300);
  };
}

function WindowModel(windowInfo) {
  this.model = {
    src: 'http://whereicode.com',
    changeOrientation: false,
    windowX: 15,
    windowY: 95,
    width: 320,
    height: 480,
    scale: 100,
  };

  if (windowInfo && windowInfo.src) this.model.src = windowInfo.src;

  return this.model;
}

export function newWindow() {
  return (dispatch, getState) => {
    const windows = getState().windows.devices;

    if (
      windows[windows.length - 1]
      && windows[windows.length - 1].src
    ) {
      windows.push(new WindowModel({ src: windows[windows.length - 1].src }));
    } else windows.push(new WindowModel());

    dispatch({ type: 'UPDATE_WINDOWS', windows });
  };
}

export function removeWindow(key) {
  return (dispatch, getState) => {
    const windows = getState().windows.devices;

    delete windows[key];
    dispatch({ type: 'UPDATE_WINDOWS', windows });
  };
}

export function windowStartMoving() {
  return { type: 'WINDOW_MOVING' };
}

export function updateSingleWindow(currentWindow, index) {
  return (dispatch, getState) => {
    let windows = getState().windows.devices;

    windows = windows.map((item, key) => {
      if (index === key) return currentWindow;
      return item;
    });

    dispatch({ type: 'UPDATE_WINDOWS', windows });
  };
}

export function windowStopped(windowX, windowY, index) {
  return (dispatch, getState) => {
    dispatch({ type: 'WINDOW_STOPPED' });

    const currentWindow = getState().windows.devices[index];
    currentWindow.windowX = windowX;
    currentWindow.windowY = windowY;

    updateSingleWindow(currentWindow, index);
  };
}

export function updateWindowUrl(newUrl) {
  return (dispatch, getState) => {
    let windows = getState().windows.devices;

    let windowsLoading = 0;

    windows = windows.map((item) => {
      windowsLoading++;

      const currentWindow = item;
      currentWindow.src = newUrl;
      return currentWindow;
    });
    dispatch({ type: 'UPDATE_LOADING', windowsLoading });

    dispatch({ type: 'UPDATE_MAIN_URL', newUrl });
    dispatch({ type: 'UPDATE_WINDOWS', windows });
  };
}

export function updateWindows(windows) {
  return { type: 'UPDATE_WINDOWS', windows };
}

export function updateWorkspaces(workspaces) {
  return { type: 'UPDATE_WORKSPACES', workspaces };
}

export function saveWorkspace(workspaceName) {
  return (dispatch, getState) => {
    const workspace = getState().windows.devices;
    let { workspaces } = getState().windows;
    let updated = false;

    workspaces = workspaces.map((item) => {
      if (item.name === workspaceName) {
        updated = true;
        return { name: workspaceName, workspace };
      }
      return item;
    });

    if (!updated) workspaces.push({ name: workspaceName, workspace });

    dispatch({ type: 'UPDATE_WORKSPACES', workspaces });
  };
}

export function windowLoaded() {
  return (dispatch, getState) => {
    const { windowsLoading } = getState().windows;
    let { windowsLoaded } = getState().windows;
    windowsLoaded++;

    dispatch({ type: 'UPDATE_LOADED', windowsLoaded });

    if (windowsLoaded >= windowsLoading) {
      dispatch({ type: 'UPDATE_LOADED', windowsLoaded: 0 });
      dispatch({ type: 'UPDATE_LOADING', windowsLoading: 0 });
    }
  };
}
