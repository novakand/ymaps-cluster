import { YaMapService } from '../js/modules/maps/services/ya-map.service.js';
import { MapState as state } from '../js/modules/maps/constants/map-state.constant.js'
import { MapOptions as options } from '../js/modules/maps/constants/map-options.constant.js';
import { MapConfig as config } from '../js/modules/maps/constants/map-config.constant.js';

let map;
let mapService;
let objectManager;

async function onInit() {
    onPreloader(false)
    onInitMap();
}

 function onInitMap() {
    const isMobile = getDeviceMobile();
    const mapOptions = { state, options: { ...(isMobile ? { balloonPanelMaxMapArea: Infinity, ...options } : options) }, config };
    mapService = new YaMapService('map', mapOptions);
    mapService.ready.then(async (yaMap) => {
        map = yaMap;
        document.querySelector('#map').setAttribute('data-load', true);
        onPreloader(true);
        onInitobjectManager();
        map.geoObjects.add(objectManager);
        getData().then((data)=>{
            objectManager.add(data);
            fitBounds();
            onPreloader(false);
        });
       
    });
}

function onInitobjectManager() {
    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 100,
        clusterDisableClickZoom: true
    });
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
}

function onPreloader(isShow) {
    const preloader = document.querySelector('.mdc-linear-progress');
    delay(1000).then(() => isShow ? preloader.style.width = '100%' : preloader.style.width = '0');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDeviceMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

async function getData() {
    const response = await fetch('./data-storage/data.json?cache=1');
    return await response.json();
}

function fitBounds() {
    const options = {
        checkZoomRange: false,
        useMapMargin: true,
        duration: 180,
    };

    map.setBounds(map.geoObjects.getBounds(), options);

}


document.addEventListener('DOMContentLoaded', onInit);
