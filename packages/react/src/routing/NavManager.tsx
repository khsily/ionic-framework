
import React from 'react';

import { NavContext, NavContextState } from '../contexts/NavContext';
import { RouteAction } from '../models/IonRouteAction';
import { RouteInfo } from '../models/RouteInfo';
import { RouterDirection } from '../models/RouterDirection';

import PageManager from './PageManager';

interface NavManagerProps {
  routeInfo: RouteInfo;
  onNavigateBack: (route?: string | RouteInfo) => void;
  onNavigate: (path: string, action: RouteAction, direction?: RouterDirection, options?: any, tab?: string) => void;
  onSetCurrentTab: (tab: string, routeInfo: RouteInfo) => void;
  onChangeTab: (tab: string, path: string, routeOptions?: any) => void;
  onResetTab: (tab: string, path: string, routeOptions?: any) => void;
  stackManager: any;
}

export class NavManager extends React.Component<NavManagerProps, NavContextState> {

  constructor(props: NavManagerProps) {
    super(props);
    this.state = {
      goBack: this.goBack.bind(this),
      hasIonicRouter: () => true,
      navigate: this.navigate.bind(this),
      getStackManager: this.getStackManager.bind(this),
      getPageManager: this.getPageManager.bind(this),
      routeInfo: this.props.routeInfo,
      setCurrentTab: this.props.onSetCurrentTab,
      changeTab: this.props.onChangeTab,
      resetTab: this.props.onResetTab
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('ionBackButton', (e: any) => {
        e.detail.register(0, (processNextHandler: () => void) => {
          this.goBack();
          processNextHandler();
        });
      });
    }
  }

  goBack(route?: string | RouteInfo) {
    this.props.onNavigateBack(route);
  }

  navigate(path: string, direction: RouterDirection = 'forward', action: RouteAction = 'push', options?: any, tab?: string) {
    this.props.onNavigate(path, action, direction, options, tab);
  }

  getPageManager() {
    return PageManager;
  }

  getStackManager() {
    return this.props.stackManager;
  }

  render() {
    return (
      <NavContext.Provider value={{ ...this.state, routeInfo: this.props.routeInfo }}>
        {this.props.children}
      </NavContext.Provider>
    );
  }

}