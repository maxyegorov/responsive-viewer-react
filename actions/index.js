export function toggleLang() {
    return (dispatch, getState) => {
        if (getState().globals.language == 'en') dispatch({ type: 'TOGGLE_LANG', language: 'fr' });
        else dispatch({ type: 'TOGGLE_LANG', language: 'en' });
    }
};

function windowModel(windowInfo) {
    this.model = { 
        src: 'http://whereicode.com', 
        changeOrientation: false, 
        windowX: 15,
        windowY: 95,
        width: 320, 
        height: 480, 
        scale: 100 
    };
    
    if (windowInfo && windowInfo.src) this.model.src = windowInfo.src;
    
    return this.model;
}

export function newWindow() {
    return (dispatch, getState) => {
        let windows = getState().windows.devices;
        
        if (windows[windows.length - 1] && windows[windows.length - 1].src) windows.push(new windowModel({ src: windows[windows.length - 1].src }));
        else windows.push(new windowModel());

        dispatch({ type: 'UPDATE_WINDOWS', windows });
    }
};

export function removeWindow(key) {
    return (dispatch, getState) => {
        let windows = getState().windows.devices;

        delete windows[key];

        dispatch({ type: 'UPDATE_WINDOWS', windows });
    }
};

export function windowStartMoving() {
    return (dispatch) => {
        dispatch({ type: 'WINDOW_MOVING' });
    }
};

export function windowStopped(windowX, windowY, index) {
    return (dispatch, getState) => {
        dispatch({ type: 'WINDOW_STOPPED' });
        
        let newWindow = getState().windows.devices[index];
        newWindow.windowX = windowX;
        newWindow.windowY = windowY;
        
        updateSingleWindow(newWindow, index);
    }
};

export function updateWindowUrl(newUrl) {
    return (dispatch, getState) => {
        let windows = getState().windows.devices;

        let windowsLoading = 0;

        windows = windows.map((item, key) => {
            windowsLoading++;
            item.src = newUrl;
            return item;
        });
        dispatch({ type: 'UPDATE_LOADING', windowsLoading });
        
        dispatch({ type: 'UPDATE_MAIN_URL', newUrl });
        dispatch({ type: 'UPDATE_WINDOWS', windows });
    }
};

export function updateSingleWindow(newWindow, index) {
    return (dispatch, getState) => {
        let windows = getState().windows.devices;
        
        windows = windows.map((item, key) => {
            if (index == key) return newWindow;
            else return item;
        });
        
        dispatch({ type: 'UPDATE_WINDOWS', windows });
    }
}

export function windowLoaded() {
    return (dispatch, getState) => {
        const windowsLoading = getState().windows.windowsLoading;
        let windowsLoaded = getState().windows.windowsLoaded;
        windowsLoaded++;

        dispatch({ type: 'UPDATE_LOADED', windowsLoaded });

        if (windowsLoaded >= windowsLoading) {
            dispatch({ type: 'UPDATE_LOADED', windowsLoaded: 0 });
            dispatch({ type: 'UPDATE_LOADING', windowsLoading: 0 });
        }
    }
};