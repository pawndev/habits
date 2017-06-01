import UTIL from './Util';
import Common from './Common';
import Home from './home';
import Test from './Test';

const HABITS = {
    common: new Common(),
    home: new Home(),  
    test: new Test(),
};

UTIL.namespace = HABITS;
document.addEventListener("DOMContentLoaded", UTIL.loadEvents, false);