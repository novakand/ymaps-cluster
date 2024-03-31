export default function () {
    const ObjectManagerOptions = {
        clusterize: true,
        gridSize: 100,
        clusterDisableClickZoom: true,
        clusterIcons: [
            {
                href: './assets/images/cluster-icon.svg',
                size: [40, 40],
                offset: [-20, -20]
            },
            {
                href: './assets/images/cluster-icon.svg',
                size: [60, 60],
                offset: [-30, -30]
            },
            {
                href: './assets/images/cluster-icon.svg',
                size: [70, 70],
                offset: [-35, -35]
            }
        ],

        clusterNumbers: [10, 100, 1000],
        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div style="style="font: 13px Arial, sans-serif; position: absolute; text-align: center;left: 0px;top: 29px;width: 71px;height: 16px;">$[properties.geoObjects.length]</div>')
    }
    return ObjectManagerOptions;
}