import UTIL from './Util';
import Common from './Common';
import Home from './home';

const HABITS = {
    common: new Common(),
    home: new Home(),
};

UTIL.namespace = HABITS;
document.addEventListener("DOMContentLoaded", UTIL.loadEvents, false);