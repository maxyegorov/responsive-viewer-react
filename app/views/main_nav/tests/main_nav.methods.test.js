import 'babel-polyfill';

import delayLookup from '../methods/delayLookup';
import urlChange from '../methods/urlChange';
import doRefresh from '../methods/doRefresh';
import toggleMenu from '../methods/toggleMenu';
import saveCurrentWorkspace from '../methods/saveCurrentWorkspace';

jest.useFakeTimers();

const compMock = {
  mainUrl: {
    value: 'test.com',
  },
  workspaceName: {
    value: 'mock-workspace',
  },
  state: {
    menuOpen: false,
  },
  setState: (changes) => {
    Object.entries(changes).forEach((item) => {
      const [key, value] = item;
      compMock.state[key] = value;
    });
  },
  props: {
    updateWindowUrl: jest.fn(),
    saveWorkspace: jest.fn(),
    windows: {
      mainUrl: 'test.com',
    },
  },
  delayLookup: jest.fn(),
};

test('delayLookup', () => {
  const delayLookupTest = delayLookup.bind(compMock);
  delayLookupTest();

  jest.runAllTimers();

  expect(compMock.mainUrl.value).toBe('http://test.com');
});

test('urlChange', () => {
  const urlChangeTest = urlChange.bind(compMock);
  urlChangeTest();

  expect(compMock.delayLookup).toHaveBeenCalled();
});

test('doRefresh', () => {
  const doRefreshTest = doRefresh.bind(compMock);
  doRefreshTest();

  jest.runAllTimers();

  expect(compMock.props.updateWindowUrl).toHaveBeenCalledTimes(3);
});

test('toggleMenu', () => {
  const toggleMenuTest = toggleMenu.bind(compMock);

  toggleMenuTest();
  expect(compMock.state.menuOpen).toEqual(true);

  toggleMenuTest();
  expect(compMock.state.menuOpen).toEqual(false);
});

test('saveCurrentWorkspace', () => {
  const saveCurrentWorkspaceTest = saveCurrentWorkspace.bind(compMock);

  saveCurrentWorkspaceTest();
  expect(compMock.props.saveWorkspace).toHaveBeenCalled();
  expect(compMock.workspaceName.value).toEqual('');
});

