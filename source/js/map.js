ymaps.ready(init);

function init() {
  let myMap = new ymaps.Map("map", {
    center: [59.938592, 30.32302],
    zoom: 17,
    controls: [],
  });

  let myGeoObjects = [];

  myGeoObjects = new ymaps.Placemark(
    [59.938592, 30.32302],
    {
      balloonContent: "Мы находимся здесь!",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-marker.svg",
      iconImageSize: [67, 101],
      iconImageOffset: [-33, -101],
    }
  );

  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: false,
    clusterOpenBalloonOnClick: false,
  });

  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
  myMap.behaviors.disable("scrollZoom");
}
