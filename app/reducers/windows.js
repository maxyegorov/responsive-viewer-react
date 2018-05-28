const INITIAL_STATE = {
  mainUrl: 'http://whereicode.com',
  windowMoving: false,
  windowsLoading: 0,
  windowsLoaded: 0,
  devices: [
    {
      src: 'http://whereicode.com',
      windowX: 15,
      windowY: 95,
      changeOrientation: false,
      width: 320,
      height: 480,
      scale: 100,
    },
  ],
  presets: [
    { name: 'Apple iPhone 4', width: 320, height: 480 },
    { name: 'Apple iPhone 5', width: 320, height: 568 },
    { name: 'Apple iPhone 6/7', width: 375, height: 667 },
    { name: 'Apple iPhone 6+/7+', width: 414, height: 736 },
    { name: 'Apple iPad Mini', width: 768, height: 1024 },
    { name: 'Apple iPad', width: 1024, height: 768 },
    { name: 'Apple MacBook Air 13-inch', width: 1440, height: 900 },
    { name: 'Apple MacBook Pro 13-inch', width: 2560, height: 1600 },
    { name: 'Apple MacBook Pro 15-inch', width: 2880, height: 1800 },
    { name: 'Samsung Galaxy S6', width: 360, height: 640 },
    { name: 'Samsung Galaxy Note', width: 400, height: 640 },
    { name: 'Samsung Galaxy Note 4', width: 360, height: 640 },
    { name: 'Samsung Galaxy Tab', width: 1024, height: 600 },
    { name: 'Samsung Galaxy Tab 10.1', width: 1280, height: 800 },
    { name: 'LG G4', width: 480, height: 853 },
    { name: 'Microsoft Surface', width: 1366, height: 768 },
    { name: 'Microsoft Surface Pro', width: 1280, height: 720 },
    { name: 'Microsoft Surface Pro 3', width: 1440, height: 960 },
    { name: 'Dell XPS 13', width: 1920, height: 1080 },
    { name: 'Samsung Chromebook', width: 1366, height: 768 },
  ],
  workspaces: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_MAIN_URL':
      return { ...state, mainUrl: action.newUrl };
    case 'UPDATE_WORKSPACES':
      return { ...state, workspaces: action.workspaces };
    case 'UPDATE_WINDOWS':
      return { ...state, devices: action.windows };
    case 'UPDATE_LOADING':
      return { ...state, windowsLoading: action.windowsLoading };
    case 'UPDATE_LOADED':
      return { ...state, windowsLoaded: action.windowsLoaded };
    case 'WINDOW_MOVING':
      return { ...state, windowMoving: true };
    case 'WINDOW_STOPPED':
      return { ...state, windowMoving: false };
    default:
      return state;
  }
}
