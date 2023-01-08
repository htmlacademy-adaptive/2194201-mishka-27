ymaps.ready(init);
const coords = [59.938592, 30.32302];

function init() {
  const myMap = new ymaps.Map("map", {
    center: coords,
    zoom: 17,
    controls: [],
  });

  let myGeoObjects = [];

  myGeoObjects = new ymaps.Placemark(
    coords,
    {
      balloonContent: "Мы находимся здесь!",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/svg/map-marker.svg",
      iconImageSize: [67, 101],
      iconImageOffset: [-33, -101],
    }
  );

  const clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: false,
    clusterOpenBalloonOnClick: false,
  });

  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  myMap.behaviors.disable("scrollZoom");
}
