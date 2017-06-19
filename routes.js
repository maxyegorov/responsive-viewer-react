import React from 'react';
import { Route } from 'react-router';

import Main from './views/main';

export default (
    <Route path="/" component={Main}>
        <Route path="*" component={Main}/>
    </Route>
);