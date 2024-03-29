import { YaMapService } from '../js/modules/maps/services/ya-map.service.js';
import { MapState as state } from '../js/modules/maps/constants/map-state.constant.js'
import { MapOptions as options } from '../js/modules/maps/constants/map-options.constant.js';
import { MapConfig as config } from '../js/modules/maps/constants/map-config.constant.js';

let map;
let mapService;

async function onInit() {
    onPreloader(false)
    onInitMap();
}

async function onInitMap() {
    const isMobile = getDeviceMobile();
    const mapOptions = { state, options: { ...(isMobile ? { balloonPanelMaxMapArea: Infinity, ...options } : options) }, config };
    mapService = new YaMapService('map', mapOptions);
    mapService.ready.then((yaMap) => {
        map = yaMap;
        document.querySelector('#map').setAttribute('data-load', true);
        onPreloader(true);
    });
}

function onPreloader(isShow) {
    const preloader = document.querySelector('.mdc-linear-progress');
    delay(3000).then(() => isShow ? preloader.style.width = '100%' : preloader.style.width = '0');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDeviceMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}


document.addEventListener('DOMContentLoaded', onInit);
