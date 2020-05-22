window.onload = init;
function init(){
    function createUrl(tpl, layerDesc) {
        return tpl
          .replace('{base}', layerDesc.base)
          .replace('{type}', layerDesc.type)
          .replace('{scheme}', layerDesc.scheme)
          .replace('{app_id}', layerDesc.app_id)
          .replace('{app_code}', layerDesc.app_code);
      }
    var appId='KmKcLdQpfE5LAzX9sjHI';
    var appCode = 'jVQKI1D8mb3zN928emb7SN0kNoSZUCH-XVx6nOo2I3U';
    var layerDesc = {
        
            base: 'aerial',
            type: 'maptile',
            scheme: 'terrain.day',
            app_id: appId,
            app_code: appCode
          }
          var urlTpl = 'https://{1-4}.{base}.maps.cit.api.here.com' +
          '/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
          '?app_id={app_id}&app_code={app_code}';
    var map = new ol.Map({
        target : 'carte11',
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine(),
            new ol.control.FullScreen(),
            new ol.control.OverviewMap(),
            new ol.control.ZoomSlider(),
          
        ]),
        layers : [
            new ol.layer.Group({
                title:'Basemap',
                fold:'open',
                layers:[
                    new ol.layer.Tile({
                        title:'OSM',
                        type:'Basemap',
                        crossOrigin: "Anonymous",
                        visible:true,
                        source : new ol.source.OSM()
                    }),
                    new ol.layer.Tile({
                        title:'Bing',
                        type:'Basemap',crossOrigin: "Anonymous",
                        visible: false,
                        
                        source: new ol.source.BingMaps({
                          key: 'AnKNuU6x7yhv-1C8TACTF-gYRo7B_SwCVUybdDwU2WWN8m1MHTdYZNh-s4L07g8a',
                         imagerySet: 'CanvasDark',crossOrigin: "Anonymous"
                          // use maxZoom 19 to see stretched tiles instead of the BingMaps
                          // "no photos at this zoom level" tiles
                          // maxZoom: 19
                        })
                    }),
                    new ol.layer.Tile({
                        title:'Here Maps',
                        type:'Basemap',crossOrigin: "Anonymous",
                        visible: false,
                        
                        source: new ol.source.XYZ({
                            url: 'https://{1-4}.aerial.maps.cit.api.here.com' +
                            '/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png' +
                            '?app_id='+"KmKcLdQpfE5LAzX9sjHI"+'&app_code='+"qp7AxScvL1dZrzQkgUCGgmiBLZarEN3VyNd7sW8uwgc",
                            attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' +
                            '<a href="http://developer.here.com">HERE</a>'
                        
                          // use maxZoom 19 to see stretched tiles instead of the BingMaps
                          // "no photos at this zoom level" tiles
                          // maxZoom: 19
                        })
                    })
                ],

            }),
            new ol.layer.Group({
                title:'Overlays',
                fold:'open',
                layers:[
                  
                    new ol.layer.Tile({
                        title:'Provinces',
                        type:'Overlays',
                        visible:false,
                        source : new ol.source.TileWMS({
                            url : "http://localhost:8080/geoserver/EHTP/wms",
                            params : {
                                "LAYERS" : "Provinces2014",
                                "TRANSPARENT" : "true",
                                "WIDTH" : 640,
                                "HEIGHT" : 480
                            },crossOrigin: "Anonymous",
                        }),

                    }),
                    new ol.layer.Tile({
                        title:'Regions',
                        type:'Overlays',
                        visible:true,
                        source : new ol.source.TileWMS({
                            url : "http://localhost:8080/geoserver/EHTP/wms",
                            params : {
                                "LAYERS" : "regions2014",
                                "TRANSPARENT" : "true",
                                "WIDTH" : 640,
                                "HEIGHT" : 480
                            },crossOrigin: "Anonymous",
                        }),

                    }),
                    /*
                    new ol.layer.Tile({
                      title:'Roads',
                      type:'Overlays',
                      visible:true,
                      source : new ol.source.TileWMS({
                          url : "http://ogcserver.gis.wfp.org/geoserver/ows/?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.0&LAYERS=ogcserver.gis.wfp.org:geonode:mar_trs_roads_osm&STYLES=&HEIGHT=256&WIDTH=256&BBOX=-13.3720574508,26.9192577455,-0.9999859004,35.9201308569",
                          params : {
                              
                              "TRANSPARENT" : "true",
                              "WIDTH" : 640,
                              "HEIGHT" : 480
                          },crossOrigin: "Anonymous",
                      }),

                  }),*/
                ],

            }),
       
        ],
        view : new ol.View({
            center : ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
            zoom : 6
        })
    });
    var layerSwitcher = new ol.control.LayerSwitcher({
    });
    map.addControl(layerSwitcher);

    //Map2
    var map2 = new ol.Map({
        target : 'tanirightcarte',
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine(),
            new ol.control.FullScreen(),
            new ol.control.OverviewMap(),
            new ol.control.ZoomSlider(),
            
          
        ]),
        layers : [
            new ol.layer.Tile({
                source : new ol.source.OSM()
            }),
            new ol.layer.Tile({
                source : new ol.source.TileWMS({
                    url : "http://localhost:8080/geoserver/EHTP/wms",
                    params : {
                        "LAYERS" : "Provinces2014",
                        "TRANSPARENT" : "true",
                        "WIDTH" : 640,
                        "HEIGHT" : 480
                    },crossOrigin: "Anonymous",
                })
            }),
        ],
        view : new ol.View({
            center : ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
            zoom : 6
        })
    });

    

    //Fonction qui vérifie si la couche est visible
    function checkAddress()
    {
        var chkBox = document.querySelectorAll('.layer-switcher li.layer input')[0];
        console.log(chkBox);
        var chkBox2 = document.querySelectorAll('.layer-switcher li.layer input')[1];
        console.log(chkBox2);
        if ((chkBox.checked) && (chkBox2.checked) )
        {
            return true
        }
        if ((!chkBox.checked) && (chkBox2.checked) )
        {
            return false
        }
        else{
            return true
        }
    }


    //affichage du popup
    map.on('singleclick', function(evt) {
        var a = checkAddress();
        console.log(a);
        
        if (a==true){
            var wmsSource = new ol.source.TileWMS({
                url : "http://localhost:8080/geoserver/EHTP/wms",
                                    params : {
                                        "LAYERS" : "regions2014",
                                        "TRANSPARENT" : "true",
                                        "WIDTH" : 640,
                                        "HEIGHT" : 480
                                    },serverType: 'geoserver',
                                    crossOrigin: 'anonymous',
              });
              
              var wmsLayer = new ol.layer.Tile({
                source: wmsSource
              });
            var view = new ol.View({
                center: ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
                zoom: 6
              });
              let ClickedCoordinate = evt.coordinate;
        
      
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = wmsSource.getFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'application/json',
          'propertyName': 'nom_reg,Confirmed,Dead,TauxD,PopUrbaine,PopRurale,DensitéPOP,TauxMaladie'});
             
       if (url) {
        fetch(url)
          .then(function (response) { 
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function(json) {
                        console.log(json.features[0]);
                        if(json.features[0]==undefined){
                            console.log("hipi");
                            document.getElementById('feature-name').innerHTML = "";
                            document.getElementById('feature-additional-info').innerHTML = "";
                            document.getElementById("overlay-container").style.visibility='hidden';
                        }
                        else{
                            var feature = json.features[0];
                            var pointNum = parseFloat(feature.properties.TauxD); pointNum=pointNum*100;pointNum=Math.round(pointNum);pointNum=pointNum/100;
                            var density = parseFloat(feature.properties.DensitéPOP); density=density*100;density=Math.round(density);density=density/100;
                            var tmaladie = parseFloat(feature.properties.TauxMaladie); tmaladie=tmaladie*100;tmaladie=Math.round(tmaladie);tmaladie=tmaladie/100;
                      document.getElementById('feature-name').innerHTML = "<h5 style="+"text-align:center;"+">"+ feature.properties.nom_reg +"</h5>";
                      document.getElementById('feature-additional-info').innerHTML = "<p><span style="+"font-weight: bold;font-size:6px;text-color:grey;padding-left:5px;"+">Nom de région : </span><span style="+"text-color:grey;font-size:12px;"+">"+feature.properties.nom_reg+"</span></p>" 
                      +"<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Cas confirmés : </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.Confirmed+"</span></p>" + 
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Cas  de  mort : </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.Dead+"</span></p>"+ 
                      "<p><span style="+"font-weight: bold;font-size:6px;text-color:grey"+">Taux de décés : </span><span style="+"text-color:grey;font-size:15px;"+">"+pointNum+"</span></p>"+
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Population urbaine : </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.PopUrbaine+"</span></p>"+
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Population rurale : </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.PopRurale+"</span></p>"+
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Densité de population : </span><span style="+"text-color:grey;font-size:15px;"+">"+density+"</span></p>"+
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Taux de maladie : </span><span style="+"text-color:grey;font-size:15px;"+">"+tmaladie+"</span></p>"
                      ;
                      document.getElementById('popup-closer').innerHTML = "✖";   
                      document.getElementById("overlay-container").style.visibility='visible';
                    }
                        console.log(ClickedCoordinate);
                        overlayLayer.setPosition(ClickedCoordinate);
                      
              });
          } else {
      console.log("Oops, nous n'avons pas du JSON!");
      document.getElementById('feature-name').innerHTML = "";
      document.getElementById('feature-additional-info').innerHTML = "";
      document.getElementById('popup-closer').innerHTML = "";
     // document.getElementsByClassName('overlay-container').style = "overlay-containerhiddden";
     console.log("lest change vdiz")
     

}
           
 
          });
      }
        }
        else {
            var wmsSource = new ol.source.TileWMS({
                url : "http://localhost:8080/geoserver/EHTP/wms",
                                    params : {
                                        "LAYERS" : "Provinces2014",
                                        "TRANSPARENT" : "true",
                                        "WIDTH" : 640,
                                        "HEIGHT" : 480
                                    },serverType: 'geoserver',
                                    crossOrigin: 'anonymous',
              });
              
              var wmsLayer = new ol.layer.Tile({
                source: wmsSource
              });
            var view = new ol.View({
                center: ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
                zoom: 6
              });
              let ClickedCoordinate = evt.coordinate;

        
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = wmsSource.getFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'application/json',
          'propertyName': 'libelle,Confirmed'});
             
       if (url) {
        fetch(url)
          .then(function (response) { 
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function(json) {
                        if(json.features[0]==undefined){
                            console.log("hipi");
                            document.getElementById('feature-name').innerHTML = "";
                            document.getElementById('feature-additional-info').innerHTML = "";
                            document.getElementById("overlay-container").style.visibility='hidden';
                        }
                        else{
                            console.log(json.features[0]);
                      var feature = json.features[0];
                      document.getElementById('feature-name').innerHTML = "<h5 style="+"text-align:center;"+">"+ feature.properties.libelle +"</h5>";
                      document.getElementById('feature-additional-info').innerHTML = "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Nom de la province: </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.libelle+"</span></p>"+
                      "<p><span style="+"font-weight: bold;padding-left:5px;font-size:6px;text-color:grey"+">Cas confirmés : </span><span style="+"text-color:grey;font-size:15px;"+">"+feature.properties.Confirmed+"</span></p>";
                      document.getElementById('popup-closer').innerHTML = "✖";   
                      document.getElementById("overlay-container").style.visibility='visible';
                      overlayLayer.setPosition(ClickedCoordinate);
                        }
                        
              });
          } else {
      console.log("Oops, nous n'avons pas du JSON!");
      document.getElementById('feature-name').innerHTML = "";
      document.getElementById('feature-additional-info').innerHTML = "";
}
           
 
          });
      }
        }
     

    });
  
      
      
      map.on('pointermove', function(evt) {
        
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.forEachLayerAtPixel(pixel, function() {
          return true;
        });
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      });

    const overlayContainerElement = document.querySelector('.overlay-container');
      const overlayLayer = new ol.Overlay({
          element : overlayContainerElement,
          autoPan: true,
            autoPanAnimation: {
        duration: 250
  }
      })
     /* const overlayContainerMesure = document.querySelector('.pane');
      const overlayMesure = new ol.Overlay({
          element : overlayContainerMesure,
          //autoPan: true,
          autoPanAnimation: {
      duration: 250
}
   */
     // })
      //overlayMesure.setPosition([-14858.8072818839,4148918.7766628605]);
      //map.addOverlay(overlayMesure);
      map.addOverlay(overlayLayer);
      const overlayFeatureName = document.getElementById('feature-name');
      const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');
      var closer = document.getElementById('popup-closer');
      closer.onclick = function() {
        overlayLayer.setPosition(undefined);
        closer.blur();
        return false;
      };

      var btn =document.getElementById('buttonMesure');
      btn.addEventListener("click",startmesauring);
function startmesauring(){
      //vector source 
      var source = new ol.source.Vector();

    var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
map.addLayer(vector);
/**
 * Currently drawn feature.
 * @type {import("../src/ol/Feature.js").default}
 */
var sketch;


/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = 'Click to continue drawing the polygon';


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue drawing the line';


/**
 * Handle pointer move.
 * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
 */
var pointerMoveHandler = function(evt) {
  if (evt.dragging) {
    return;
  }
  /** @type {string} */
  var helpMsg = 'Click to start drawing';

  if (sketch) {
    var geom = sketch.getGeometry();
    if (geom instanceof ol.geom.Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof ol.geom.LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

    map.on('pointermove', pointerMoveHandler);
    map.getViewport().addEventListener('mouseout', function() {
    helpTooltipElement.classList.add('hidden');
  });



var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later


/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function(line) {
  var length = ol.sphere.getLength(line);
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};


/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function(polygon) {
  var area = ol.sphere.getArea(polygon);
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};

function addInteraction() {
var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
  console.log(type);
  draw = new ol.interaction.Draw({
    source: source,
    type: type,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });
  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  var listener;
  draw.on('drawstart',
    function(evt) {
      // set sketch
      sketch = evt.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;

      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        if (geom instanceof ol.geom.Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof ol.geom.LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });

  draw.on('drawend',
    function() {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      ol.Observable.unByKey(listener);
      var btn =document.getElementById('buttonMesure');
      document.getElementById('carte11').onmousemove = function(e) {
        e.stopPropagation();
      };
    });
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    console.log("creatig");
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}
document.addEventListener('keydown', logKey);

function logKey(e) {
    return true;
    map.on('pointermove', function(evt){
        evt.stopPropagation();
        evt.preventDefault();
    });
    draw.on('drawend',
    function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    })
    draw.on('drawstart',
    function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    })
    map.getViewport().addEventListener('mouseout', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
      });
 console.log("clicked");
 e.stopPropagation
}
function donothing(){
    console.log("stopped")
}
/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}
typeSelect.onchange = function() {
    map.removeInteraction(draw);
    addInteraction();
  };
addInteraction();
      }
      
      var show_legend = document.getElementById("show-legend");
      show_legend.addEventListener('click',showlegend);

      function showlegend(){

        //detect wich legend to show
        var clcikedcouche = checkAddress();
        if (clcikedcouche==true){
          var wmsSource2 = new ol.source.ImageWMS({
            url : "http://localhost:8080/geoserver/EHTP/wms",
            params : {
                "LAYERS" : "regions2014",
                "TRANSPARENT" : "true",
                "WIDTH" : 640,
                "HEIGHT" : 480
            },serverType: 'geoserver',crossOrigin: "Anonymous",
            ratio: 1,
            serverType: 'geoserver'
          });
          
          var updateLegend = function(resolution) {
            var graphicUrl = wmsSource2.getLegendUrl(resolution);
            var img = document.getElementById('legend');
            img.innerHTML="";
            img.src = graphicUrl;
            var imgcontainer = document.getElementById('legend_container');
            imgcontainer.style.visibility="visible";
            document.getElementById('legend-closer').innerHTML = "✖";
          };
          var resolution = map.getView().getResolution();
          updateLegend(resolution);
    
    // Update the legend when the resolution changes
    map.getView().on('change:resolution', function(event) {
      var resolution = event.target.getResolution();
      updateLegend(resolution);
    });
        }
        else {
          var wmsSource2 = new ol.source.ImageWMS({
            url : "http://localhost:8080/geoserver/EHTP/wms",
            params : {
                "LAYERS" : "Provinces2014",
                "TRANSPARENT" : "true",
                "WIDTH" : 640,
                "HEIGHT" : 480
            },serverType: 'geoserver',crossOrigin: "Anonymous",
            ratio: 1,
            serverType: 'geoserver'
          });
          
          var updateLegend = function(resolution) {
            var graphicUrl = wmsSource2.getLegendUrl(resolution);
            var img = document.getElementById('legend');
            img.innerHTML="";
            img.src = graphicUrl;
            var imgcontainer = document.getElementById('legend_container');
            imgcontainer.style.visibility="visible";
            document.getElementById('legend-closer').innerHTML = "✖";
          };
          var resolution = map.getView().getResolution();
          updateLegend(resolution);
    
    // Update the legend when the resolution changes
    map.getView().on('change:resolution', function(event) {
      var resolution = event.target.getResolution();
      updateLegend(resolution);
    });
        }

        
      }
      var legend_closer = document.getElementById("legend-closer");
      legend_closer.addEventListener('click',closelegend);
function closelegend(){
  var img = document.getElementById('legend');
  img.innerHTML="";
  var imgcontainer = document.getElementById('legend_container');
            imgcontainer.style.visibility="hidden";
            document.getElementById('legend-closer').innerHTML = "";
}
//Print 

var dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
  };
  
  
  var exportButton = document.getElementById('export-pdf');
  
  exportButton.addEventListener('click', function() {
  
    exportButton.disabled = true;
    document.body.style.cursor = 'progress';
  
    var format = "a4";
    var resolution = "300";
    var dim = dims[format];
    var width = Math.round(dim[0] * resolution / 25.4);
    var height = Math.round(dim[1] * resolution / 25.4);
    var size = map.getSize();
    var viewResolution = map.getView().getResolution();
  
    map.once('rendercomplete', function() {
      var mapCanvas = document.createElement('canvas');
            mapCanvas.crossOrigin = '*';
            mapCanvas.width = width;
      mapCanvas.height = height;
      var mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
        if (canvas.width > 0) {
            mapCanvas.crossOrigin = '*';
          var opacity = canvas.parentNode.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          var transform = canvas.style.transform;
          // Get the transform parameters from the style's transform matrix
          var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
          mapContext.drawImage(canvas, 0, 0);
        }
      });
      mapCanvas.crossOrigin = '*';
      var pdf = new jsPDF('landscape', undefined, format);
      pdf.addImage(mapCanvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, dim[0], dim[1]);
      pdf.save('map.pdf');
      // Reset original map size
      map.setSize(size);
      map.getView().setResolution(viewResolution);
      exportButton.disabled = false;
      document.body.style.cursor = 'auto';
      mapCanvas.crossOrigin = '*';
    });
  
    // Set print size
    var printSize = [width, height];
    map.setSize(printSize);
    var scaling = Math.min(width / size[0], height / size[1]);
    map.getView().setResolution(viewResolution / scaling);
  
  }, false);

  var exportButtonXML = document.getElementById('export-xml');
  
  exportButtonXML.addEventListener('click',owsshow);


  function owsshow() {

}

/*



  var btn2 =document.getElementById('testcalss');
  btn2.addEventListener("click",loadwfs);*/

 

 
 //Courbe 1
     /* Déclaration de la source de la couche en format WFS */
  
     var sourceWFS = new ol.source.Vector({
      /* Chargement du lien WFS en format json*/
      url: 'http://localhost:8080/geoserver/wfs?service=WFS&'+'version=1.1.0&request=GetFeature&styles=EHTP:regions2014&typename=EHTP:regions2014&' +'outputFormat=application/json',
      format: new ol.format.GeoJSON(),
      serverType: 'geoserver'
    })
    var sousMassaC=14.2 ;
    /* Déclaration de la couche WFS */
    var coucheWFS = new ol.layer.Vector({ source: sourceWFS});
    coucheWFS.setStyle(new ol.style.Style({}));
    features = new Array();
    coucheWFS.getSource().addFeatures(features);
  map.addLayer(coucheWFS);
    coucheWFS.getSource().on('change', function(evt){
      var source = evt.target;
      if (source.getState() === 'ready') {
        coucheWFS.getSource().forEachFeature(function(feature) {
          //console.log('feature : ', feature);
          
          var champs = feature.getKeys();
          var nb_propriete = feature.getKeys().length;
          var flag;
          for(var j=1; j<nb_propriete; j++){
             if(feature.get(champs[j])=="SOUSS-MASSA") {
               flag="SOUSS-MASSA";
             }
             if (flag=="SOUSS-MASSA" && champs[j]=="Confirmed"){
              document.getElementById("soussmassaC").innerHTML=feature.get(champs[j]);
              
             }
             if(feature.get(champs[j])=="BENI MELLAL-KHENIFRA") {
              flag="BENI MELLAL-KHENIFRA";
            }
            if (flag=="BENI MELLAL-KHENIFRA" && champs[j]=="Confirmed"){
             document.getElementById("benimellalC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="ORIENTAL") {
              flag="ORIENTAL";
            }
            if (flag=="ORIENTAL" && champs[j]=="Confirmed"){
             document.getElementById("orinetalC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="CASABLANCA-SETTAT") {
              flag="CASABLANCA-SETTAT";
            }
            if (flag=="CASABLANCA-SETTAT" && champs[j]=="Confirmed"){
             document.getElementById("casasettatC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="FES-MEKNES") {
              flag="FES-MEKNES";
            }
            if (flag=="FES-MEKNES" && champs[j]=="Confirmed"){
             document.getElementById("FES-MEKNESC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="RABAT-SALE-KENITRA") {
              flag="RABAT-SALE-KENITRA";
            }
            if (flag=="RABAT-SALE-KENITRA" && champs[j]=="Confirmed"){
             document.getElementById("rabatC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="TANGER-TETOUAN-AL HOUCEIMA") {
              flag="TANGER-TETOUAN-AL HOUCEIMA";
            }
            if (flag=="TANGER-TETOUAN-AL HOUCEIMA" && champs[j]=="Confirmed"){
             document.getElementById("tangerC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="LAAYOUNE-SAKIA EL HAMRA") {
              flag="LAAYOUNE-SAKIA EL HAMRA";
            }
            if (flag=="LAAYOUNE-SAKIA EL HAMRA" && champs[j]=="Confirmed"){
             document.getElementById("layounC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="GUELMIM-OUED NOUN") {
              flag="GUELMIM-OUED NOUN";
            }
            if (flag=="GUELMIM-OUED NOUN" && champs[j]=="Confirmed"){
             document.getElementById("guelmimC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="DAKHLA-OUED ED-DAHAB") {
              flag="DAKHLA-OUED ED-DAHAB";
            }
            if (flag=="DAKHLA-OUED ED-DAHAB" && champs[j]=="Confirmed"){
             document.getElementById("dakhlaC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="DRAA-TAFILALT") {
              flag="DRAA-TAFILALT";
            }
            if (flag=="DRAA-TAFILALT" && champs[j]=="Confirmed"){
             document.getElementById("daraaC").innerHTML=feature.get(champs[j]);
             
            }
            if(feature.get(champs[j])=="MARRAKECH-SAFI") {
              flag="MARRAKECH-SAFI";
            }
            if (flag=="MARRAKECH-SAFI" && champs[j]=="Confirmed"){
             document.getElementById("kefch").innerHTML=feature.get(champs[j]);
             
            }
            
            //console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
          }
          });
       
      }
    });
    var features = sourceWFS.getFeatures()
    console.log(features);
    setTimeout(Setds,3000);
    

    //panelbas+total

    var sourceWFSp = new ol.source.Vector({
      /* Chargement du lien WFS en format json*/
      url: 'http://localhost:8080/geoserver/wfs?service=WFS&'+'version=1.1.0&request=GetFeature&typename=EHTP:panelbas&' +'outputFormat=application/json',
      format: new ol.format.GeoJSON(),
      serverType: 'geoserver'
    })
    
    /* Déclaration de la couche WFS */
    var coucheWFSp = new ol.layer.Vector({ source: sourceWFSp});
    coucheWFSp.setStyle(new ol.style.Style({}));
    features = new Array();
    coucheWFSp.getSource().addFeatures(features);
    map.addLayer(coucheWFSp);
    coucheWFSp.getSource().on('change', function(evt){
      var source = evt.target;
      if (source.getState() === 'ready') {
        var falg2=0;
        coucheWFSp.getSource().forEachFeature(function(feature) {
          //console.log('feature : ', feature);
          
          var champs = feature.getKeys();
          var nb_propriete = feature.getKeys().length;
          
          for(var j=1; j<nb_propriete; j++){
            //fourth chart
            console.log("baspanel enjoy !")
            if(champs[j]=="confirmed"){
              document.getElementById('totalcas').innerHTML=feature.get(champs[j])
            }
            if(champs[j]=="moyage"){
              document.getElementById('moyagea').innerHTML=feature.get(champs[j])+" ans"
            }
            if(champs[j]=="death"){
              document.getElementById('morta').innerHTML=feature.get(champs[j])
            }
            if(champs[j]=="gueris"){
              document.getElementById('gueria').innerHTML=feature.get(champs[j])
            }
            if(champs[j]=="excluded"){
              document.getElementById('exclusa').innerHTML=feature.get(champs[j])
            }
              //console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            
          }
        });
     
    }
  });
    //Courbe2
     //Courbe 1
     /* Déclaration de la source de la couche en format WFS */
  
     var sourceWFS2 = new ol.source.Vector({
      /* Chargement du lien WFS en format json*/
      url: 'http://localhost:8080/geoserver/wfs?service=WFS&'+'version=1.1.0&request=GetFeature&typename=EHTP:Nbcas&' +'outputFormat=application/json',
      format: new ol.format.GeoJSON(),
      serverType: 'geoserver'
    })
    
    /* Déclaration de la couche WFS */
    var coucheWFS2 = new ol.layer.Vector({ source: sourceWFS2});
    coucheWFS2.setStyle(new ol.style.Style({}));
    features = new Array();
    coucheWFS2.getSource().addFeatures(features);
    map.addLayer(coucheWFS2);
    coucheWFS2.getSource().on('change', function(evt){
      var source = evt.target;
      if (source.getState() === 'ready') {
        var falg2=0;
        coucheWFS2.getSource().forEachFeature(function(feature) {
          //console.log('feature : ', feature);
          
          var champs = feature.getKeys();
          var nb_propriete = feature.getKeys().length;
          
          for(var j=1; j<nb_propriete; j++){
            //fourth chart
            if(falg2==5 && champs[j]=="01/04/2020"){
              console.log("i entered")
              document.getElementById("1m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="02/04/2020"){
              document.getElementById("2m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="03/04/2020"){
              document.getElementById("3m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="04/04/2020"){
              document.getElementById("4m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="05/04/2020"){
              document.getElementById("5m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="06/04/2020"){
              document.getElementById("6m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="07/04/2020"){
              document.getElementById("7m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="08/04/2020"){
              document.getElementById("8m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="09/04/2020"){
              document.getElementById("9m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="10/04/2020"){
              document.getElementById("10m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="11/04/2020"){
              document.getElementById("11m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="12/04/2020"){
              document.getElementById("12m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="13/04/2020"){
              document.getElementById("13m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="14/04/2020"){
              document.getElementById("14m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="15/04/2020"){
              document.getElementById("15m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="16/04/2020"){
              document.getElementById("16m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="17/04/2020"){
              document.getElementById("17m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="18/04/2020"){
              document.getElementById("18m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="19/04/2020"){
              document.getElementById("19m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="20/04/2020"){
              document.getElementById("20m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="21/04/2020"){
              document.getElementById("21m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="22/04/2020"){
              document.getElementById("22m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="23/04/2020"){
              document.getElementById("23m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="24/04/2020"){
              document.getElementById("24m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="25/04/2020"){
              document.getElementById("25m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="26/04/2020"){
              document.getElementById("26m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="27/04/2020"){
              document.getElementById("27m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="28/04/2020"){
              document.getElementById("28m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="29/04/2020"){
              document.getElementById("29m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="30/04/2020"){
              document.getElementById("30m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="01/05/2020"){
              document.getElementById("31m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="02/05/2020"){
              document.getElementById("32m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="03/05/2020"){
              document.getElementById("33m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="04/05/2020"){
              document.getElementById("34m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="05/05/2020"){
              document.getElementById("35m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="06/05/2020"){
              document.getElementById("36m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="07/05/2020"){
              document.getElementById("37m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="08/05/2020"){
              document.getElementById("38m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="09/05/2020"){
              document.getElementById("39m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="10/05/2020"){
              document.getElementById("40m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="11/05/2020"){
              document.getElementById("41m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==5 && champs[j]=="12/05/2020"){
              document.getElementById("42m").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              falg2=6;
            }
            //third courbe
            if(falg2==3 && champs[j]=="01/04/2020"){
              console.log("i entered")
              document.getElementById("1g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="02/04/2020"){
              document.getElementById("2g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="03/04/2020"){
              document.getElementById("3g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="04/04/2020"){
              document.getElementById("4g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="05/04/2020"){
              document.getElementById("5g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="06/04/2020"){
              document.getElementById("6g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="07/04/2020"){
              document.getElementById("7g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="08/04/2020"){
              document.getElementById("8g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="09/04/2020"){
              document.getElementById("9g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="10/04/2020"){
              document.getElementById("10g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="11/04/2020"){
              document.getElementById("11g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="12/04/2020"){
              document.getElementById("12g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="13/04/2020"){
              document.getElementById("13g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="14/04/2020"){
              document.getElementById("14g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="15/04/2020"){
              document.getElementById("15g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="16/04/2020"){
              document.getElementById("16g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="17/04/2020"){
              document.getElementById("17g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="18/04/2020"){
              document.getElementById("18g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="19/04/2020"){
              document.getElementById("19g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="20/04/2020"){
              document.getElementById("20g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="21/04/2020"){
              document.getElementById("21g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="22/04/2020"){
              document.getElementById("22g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="23/04/2020"){
              document.getElementById("23g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="24/04/2020"){
              document.getElementById("24g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="25/04/2020"){
              document.getElementById("25g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="26/04/2020"){
              document.getElementById("26g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="27/04/2020"){
              document.getElementById("27g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="28/04/2020"){
              document.getElementById("28g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="29/04/2020"){
              document.getElementById("29g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="30/04/2020"){
              document.getElementById("30g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="01/05/2020"){
              document.getElementById("31g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="02/05/2020"){
              document.getElementById("32g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="03/05/2020"){
              document.getElementById("33g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="04/05/2020"){
              document.getElementById("34g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="05/05/2020"){
              document.getElementById("35g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="06/05/2020"){
              document.getElementById("36g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="07/05/2020"){
              document.getElementById("37g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="08/05/2020"){
              document.getElementById("38g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="09/05/2020"){
              document.getElementById("39g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="10/05/2020"){
              document.getElementById("40g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="11/05/2020"){
              document.getElementById("41g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==3 && champs[j]=="12/05/2020"){
              document.getElementById("42g").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              falg2=5;
            }
              //second courbe
              if(falg2==1 && champs[j]=="01/04/2020"){
                console.log("i entered")
                document.getElementById("1d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="02/04/2020"){
                document.getElementById("2d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="03/04/2020"){
                document.getElementById("3d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="04/04/2020"){
                document.getElementById("4d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="05/04/2020"){
                document.getElementById("5d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="06/04/2020"){
                document.getElementById("6d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="07/04/2020"){
                document.getElementById("7d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="08/04/2020"){
                document.getElementById("8d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="09/04/2020"){
                document.getElementById("9d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="10/04/2020"){
                document.getElementById("10d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="11/04/2020"){
                document.getElementById("11d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="12/04/2020"){
                document.getElementById("12d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="13/04/2020"){
                document.getElementById("13d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="14/04/2020"){
                document.getElementById("14d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="15/04/2020"){
                document.getElementById("15d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="16/04/2020"){
                document.getElementById("16d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="17/04/2020"){
                document.getElementById("17d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="18/04/2020"){
                document.getElementById("18d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="19/04/2020"){
                document.getElementById("19d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="20/04/2020"){
                document.getElementById("20d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="21/04/2020"){
                document.getElementById("21d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="22/04/2020"){
                document.getElementById("22d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="23/04/2020"){
                document.getElementById("23d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="24/04/2020"){
                document.getElementById("24d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="25/04/2020"){
                document.getElementById("25d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="26/04/2020"){
                document.getElementById("26d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="27/04/2020"){
                document.getElementById("27d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="28/04/2020"){
                document.getElementById("28d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="29/04/2020"){
                document.getElementById("29d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="30/04/2020"){
                document.getElementById("30d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="01/05/2020"){
                document.getElementById("31d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="02/05/2020"){
                document.getElementById("32d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="03/05/2020"){
                document.getElementById("33d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="04/05/2020"){
                document.getElementById("34d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="05/05/2020"){
                document.getElementById("35d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="06/05/2020"){
                document.getElementById("36d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="07/05/2020"){
                document.getElementById("37d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="08/05/2020"){
                document.getElementById("38d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="09/05/2020"){
                document.getElementById("39d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="10/05/2020"){
                document.getElementById("40d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="11/05/2020"){
                document.getElementById("41d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              }
              if(falg2==1 && champs[j]=="12/05/2020"){
                document.getElementById("42d").innerHTML=feature.get(champs[j]);
                console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
                falg2=3;
              }
            if( falg2==0 && champs[j]=="01/04/2020"){
              console.log("falg2 is : " +falg2);
              document.getElementById("1C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="02/04/2020"){
              document.getElementById("2C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="03/04/2020"){
              document.getElementById("3C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="04/04/2020"){
              document.getElementById("4C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="05/04/2020"){
              document.getElementById("5C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="06/04/2020"){
              document.getElementById("6C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="07/04/2020"){
              document.getElementById("7C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="08/04/2020"){
              document.getElementById("8C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="09/04/2020"){
              document.getElementById("9C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="10/04/2020"){
              document.getElementById("10C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="11/04/2020"){
              document.getElementById("11C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="12/04/2020"){
              document.getElementById("12C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="13/04/2020"){
              document.getElementById("13C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="14/04/2020"){
              document.getElementById("14C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="15/04/2020"){
              document.getElementById("15C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="16/04/2020"){
              document.getElementById("16C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="17/04/2020"){
              document.getElementById("17C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="18/04/2020"){
              document.getElementById("18C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="19/04/2020"){
              document.getElementById("19C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="20/04/2020"){
              document.getElementById("20C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="21/04/2020"){
              document.getElementById("21C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="22/04/2020"){
              document.getElementById("22C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="23/04/2020"){
              document.getElementById("23C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="24/04/2020"){
              document.getElementById("24C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="25/04/2020"){
              document.getElementById("25C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="26/04/2020"){
              document.getElementById("26C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="27/04/2020"){
              document.getElementById("27C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="28/04/2020"){
              document.getElementById("28C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="29/04/2020"){
              document.getElementById("29C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="30/04/2020"){
              document.getElementById("30C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="01/05/2020"){
              document.getElementById("31C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="02/05/2020"){
              document.getElementById("32C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="03/05/2020"){
              document.getElementById("33C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="04/05/2020"){
              document.getElementById("34C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="05/05/2020"){
              document.getElementById("35C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="06/05/2020"){
              document.getElementById("36C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="07/05/2020"){
              document.getElementById("37C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="08/05/2020"){
              document.getElementById("38C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="09/05/2020"){
              document.getElementById("39C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="10/05/2020"){
              document.getElementById("40C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="11/05/2020"){
              document.getElementById("41C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            if(falg2==0 && champs[j]=="12/05/2020"){
              document.getElementById("42C").innerHTML=feature.get(champs[j]);
              console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
              console.log("here changed")
              falg2=1;
             // console.log(falg);
            }
          
            
            
            
          }
          });
       
      }
    });
    var features = sourceWFS.getFeatures()
    console.log(features);
    setTimeout(Setds,3000);
  sousMassaC=document.getElementById("soussmassaC").innerHTML;
  console.log("Confirmed cases" + sousMassaC);
  setTimeout (populatecolumn,3000);
  function populatecolumn(){
    document.getElementById("sousmasa2").innerHTML=document.getElementById("soussmassaC").innerHTML
    document.getElementById("benimellal2").innerHTML=document.getElementById("benimellalC").innerHTML
    document.getElementById("oriental2").innerHTML=document.getElementById("orinetalC").innerHTML
    document.getElementById("casasettat2").innerHTML=document.getElementById("casasettatC").innerHTML
    document.getElementById("fesmek2").innerHTML=document.getElementById("FES-MEKNESC").innerHTML
    document.getElementById("rabatsalek2").innerHTML=document.getElementById("rabatC").innerHTML
    document.getElementById("tangertetoun2").innerHTML=document.getElementById("tangerC").innerHTML
    document.getElementById("laayoune2").innerHTML=document.getElementById("layounC").innerHTML
    document.getElementById("gulimo2").innerHTML=document.getElementById("guelmimC").innerHTML
    document.getElementById("dakhlao2").innerHTML=document.getElementById("dakhlaC").innerHTML
    document.getElementById("draatafilalt2").innerHTML=document.getElementById("daraaC").innerHTML
    document.getElementById("kechsafi2").innerHTML=document.getElementById("kefch").innerHTML

  }
  setTimeout (setchart2,3000);
  function setchart2(){
    var chart = new CanvasJS.Chart("chartContainer6", {
      animationEnabled: true,
      theme: "dark1",
      title:{
        text: "évolution Covid-19 au maroc"
      },
      axisY:{
        includeZero: false
      },
      data: [{        
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: [
          { y: parseFloat(document.getElementById("1d").innerHTML), label: "01/04/2020" },
          { y: parseFloat(document.getElementById("2d").innerHTML), label: "02/04/2020" },
          { y: parseFloat(document.getElementById("3d").innerHTML), label: "03/04/2020" },
          { y: parseFloat(document.getElementById("4d").innerHTML), label: "04/04/2020" },
          { y: parseFloat(document.getElementById("5d").innerHTML), label: "05/04/2020" },
          { y: parseFloat(document.getElementById("6d").innerHTML), label: "06/04/2020" },
          { y: parseFloat(document.getElementById("7d").innerHTML), label: "07/04/2020" },
          { y: parseFloat(document.getElementById("8d").innerHTML), label: "08/04/2020" },
          { y: parseFloat(document.getElementById("9d").innerHTML), label: "09/04/2020" },
          { y: parseFloat(document.getElementById("10d").innerHTML), label: "10/04/2020" },
          { y: parseFloat(document.getElementById("11d").innerHTML), label: "11/04/2020" },
          { y: parseFloat(document.getElementById("12d").innerHTML), label: "12/04/2020" },
          { y: parseFloat(document.getElementById("13d").innerHTML), label: "13/04/2020" },
          { y: parseFloat(document.getElementById("14d").innerHTML), label: "14/04/2020" },
          { y: parseFloat(document.getElementById("15d").innerHTML), label: "15/04/2020" },
          { y: parseFloat(document.getElementById("16d").innerHTML), label: "16/04/2020" },
          { y: parseFloat(document.getElementById("17d").innerHTML), label: "17/04/2020" },
          { y: parseFloat(document.getElementById("18d").innerHTML), label: "18/04/2020" },
          { y: parseFloat(document.getElementById("19d").innerHTML), label: "19/04/2020" }, { y: parseFloat(document.getElementById("soussmassaC").innerHTML), label: "SOUSS-MASSA" },
          { y: parseFloat(document.getElementById("20d").innerHTML), label: "20/04/2020" },
          { y: parseFloat(document.getElementById("21d").innerHTML), label: "21/04/2020" },
          { y: parseFloat(document.getElementById("22d").innerHTML), label: "22/04/2020" },
          { y: parseFloat(document.getElementById("23d").innerHTML), label: "23/04/2020" },
          { y: parseFloat(document.getElementById("24d").innerHTML), label: "24/04/2020"},
          { y: parseFloat(document.getElementById("25d").innerHTML), label: "25/04/2020" },
          { y: parseFloat(document.getElementById("26d").innerHTML), label: "26/04/2020" },
          { y: parseFloat(document.getElementById("27d").innerHTML), label: "28/04/2020" },
          { y: parseFloat(document.getElementById("28d").innerHTML), label:"29/04/2020" },
          { y: parseFloat(document.getElementById("29d").innerHTML), label:"30/04/2020" },
          { y: parseFloat(document.getElementById("30d").innerHTML), label: "31/04/2020" },
          { y: parseFloat(document.getElementById("31d").innerHTML), label: "01/05/2020" },
          { y: parseFloat(document.getElementById("32d").innerHTML), label: "02/05/2020" },
          { y: parseFloat(document.getElementById("33d").innerHTML), label: "03/05/2020" },
          { y: parseFloat(document.getElementById("34d").innerHTML), label: "04/05/2020"},
          { y: parseFloat(document.getElementById("35d").innerHTML), label: "05/05/2020" },
          { y: parseFloat(document.getElementById("36d").innerHTML), label: "06/05/2020" },
          { y: parseFloat(document.getElementById("37d").innerHTML), label: "07/05/2020"},
          { y: parseFloat(document.getElementById("38d").innerHTML), label: "08/05/2020" },
          { y: parseFloat(document.getElementById("39d").innerHTML), label: "09/05/2020" },
          { y: parseFloat(document.getElementById("40d").innerHTML), label: "10/05/2020" },
          { y: parseFloat(document.getElementById("41d").innerHTML), label: "11/05/2020" },
          { y: parseFloat(document.getElementById("42d").innerHTML), label: "12/05/2020" },

        ]
      }]
    });
    chart.render();
  }
    function Setds(){
  //chart1 render
  var somme=parseFloat(document.getElementById("soussmassaC").innerHTML)+parseFloat(document.getElementById("benimellalC").innerHTML)+parseFloat(document.getElementById("orinetalC").innerHTML)+parseFloat(document.getElementById("casasettatC").innerHTML)+parseFloat(document.getElementById("FES-MEKNESC").innerHTML)+parseFloat(document.getElementById("rabatC").innerHTML)+parseFloat(document.getElementById("tangerC").innerHTML)+parseFloat(document.getElementById("layounC").innerHTML)+parseFloat(document.getElementById("guelmimC").innerHTML)+parseFloat(document.getElementById("dakhlaC").innerHTML)+parseFloat(document.getElementById("daraaC").innerHTML)+parseFloat(document.getElementById("kefch").innerHTML);
console.log(somme);
document.getElementById("somme").innerHTML=somme;
//console.log(parseFloat(document.getElementById("soussmassaC").innerHTML)+parseFloat(document.getElementById("benimellalC").innerHTML));
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark1", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Répartition covid-19 sur les régions du Maroc"
    },
    data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
            { y: Math.round(document.getElementById("soussmassaC").innerHTML*100/somme*100)/100, label: "SOUSS-MASSA" },
            { y: Math.round(document.getElementById("benimellalC").innerHTML*100/somme*100)/100, label: "BENI MELLAL-KHENIFRA" },
            { y: Math.round(document.getElementById("orinetalC").innerHTML*100/somme*100)/100, label: "ORIENTAL" },
            { y: Math.round(document.getElementById("casasettatC").innerHTML*100/somme*100)/100, label: "CASABLANCA-SETTAT" },
            { y: Math.round(document.getElementById("FES-MEKNESC").innerHTML*100/somme*100)/100, label: "FES-MEKNES" },
            { y: Math.round(document.getElementById("rabatC").innerHTML*100/somme*100)/100, label: "RABAT-SALE-KENITRA" },
            { y: Math.round(document.getElementById("tangerC").innerHTML*100/somme*100)/100, label: "TANGER-TETOUAN-AL HOUCEIMA" },
            { y: Math.round(document.getElementById("layounC").innerHTML*100/somme*100)/100, label: "LAAYOUNE-SAKIA EL HAMRA" },
            { y: Math.round(document.getElementById("guelmimC").innerHTML*100/somme*100)/100, label: "GUELMIM-OUED NOUN" },
            { y: Math.round(document.getElementById("dakhlaC").innerHTML*100/somme*100)/100, label: "DAKHLA-OUED ED-DAHAB" },
            { y: Math.round(document.getElementById("daraaC").innerHTML*100/somme*100)/100, label: "DRAA-TAFILALT" },
            { y: Math.round(document.getElementById("kefch").innerHTML*100/somme*100)/100, label: "MARRAKECH-SAFI" },
        ]
    }]
});
chart.render();}
$(document).ready(function(){

    
  //changement dynamique de la carte
  $('.arrowbtnR').bind('click',function(){
      if($('#carte1').css('display')!='none'){
      $('#dynamicSpot').html($('#carte2').html()).show().siblings('div').hide();
      laodSecondMap();
      }else if($('#dynamicSpot').css('display')!='none'){    
          $('#carte1').show().siblings('div').hide();
      }
      else{ 
          console.log("ni lun ni l aautre ");
      }
  });
  $('.arrowbtnL').bind('click',function(){
      if($('#carte1').css('display')!='none'){
      $('#dynamicSpot').html($('#carte2').html()).show().siblings('div').hide();
      laodSecondMap();
      }else if($('#dynamicSpot').css('display')!='none'){    
          $('#carte1').show().siblings('div').hide();
      }
      else{ 
          console.log("ni lun ni l aautre ");
      }
  });
  function loadchart1(){
    var somme=document.getElementById("somme").innerHTML;
      var chart = new CanvasJS.Chart("chartContainer", {
          theme: "dark1", // "light1", "light2", "dark1", "dark2"
          exportEnabled: true,
          animationEnabled: true,
          title: {
              text: "Desktop Browser Market Share in 2016"
          },
          data: [{
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}%",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}%",
              dataPoints: [
                { y: Math.round(document.getElementById("soussmassaC").innerHTML*100/somme*100)/100, label: "SOUSS-MASSA" },
                { y: Math.round(document.getElementById("benimellalC").innerHTML*100/somme*100)/100, label: "BENI MELLAL-KHENIFRA" },
                { y: Math.round(document.getElementById("orinetalC").innerHTML*100/somme*100)/100, label: "ORIENTAL" },
                { y: Math.round(document.getElementById("casasettatC").innerHTML*100/somme*100)/100, label: "CASABLANCA-SETTAT" },
                { y: Math.round(document.getElementById("FES-MEKNESC").innerHTML*100/somme*100)/100, label: "FES-MEKNES" },
                { y: Math.round(document.getElementById("rabatC").innerHTML*100/somme*100)/100, label: "RABAT-SALE-KENITRA" },
                { y: Math.round(document.getElementById("tangerC").innerHTML*100/somme*100)/100, label: "TANGER-TETOUAN-AL HOUCEIMA" },
                { y: Math.round(document.getElementById("layounC").innerHTML*100/somme*100)/100, label: "LAAYOUNE-SAKIA EL HAMRA" },
                { y: Math.round(document.getElementById("guelmimC").innerHTML*100/somme*100)/100, label: "GUELMIM-OUED NOUN" },
                { y: Math.round(document.getElementById("dakhlaC").innerHTML*100/somme*100)/100, label: "DAKHLA-OUED ED-DAHAB" },
                { y: Math.round(document.getElementById("daraaC").innerHTML*100/somme*100)/100, label: "DRAA-TAFILALT" },
                { y: Math.round(document.getElementById("kefch").innerHTML*100/somme*100)/100, label: "MARRAKECH-SAFI" },
            ]
          }]
      });
      chart.render();


  }
  function loadchart2(){
    var somme=document.getElementById("somme").innerHTML;
    var chart = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      theme: "dark1",
      title:{
        text:"Number des cas par région"
      },
      axisX:{
        interval: 1
      },
      axisY2:{
        interlacedColor: "rgba(0,0,0,.2)",
        gridColor: "rgba(0,0,0,.1)",
        title: "Number des cas par région"
      },
      data: [{
        type: "bar",
        name: "Cas",
        axisYType: "secondary",
        color: "#014D65",
        dataPoints: [
          { y: parseFloat(document.getElementById("soussmassaC").innerHTML), label: "SOUSS-MASSA" },
          { y: parseFloat(document.getElementById("benimellalC").innerHTML), label: "BENI MELLAL-KHENIFRA" },
          { y: parseFloat(document.getElementById("orinetalC").innerHTML), label: "ORIENTAL" },
          { y:parseFloat(document.getElementById("casasettatC").innerHTML), label: "CASABLANCA-SETTAT" },
          { y: parseFloat(document.getElementById("FES-MEKNESC").innerHTML), label: "FES-MEKNES" },
          { y: parseFloat(document.getElementById("rabatC").innerHTML), label: "RABAT-SALE-KENITRA" },
          { y: parseFloat(document.getElementById("tangerC").innerHTML), label: "TANGER-TETOUAN" },
          { y: parseFloat(document.getElementById("layounC").innerHTML), label: "LAAYOUNE-SAKIA EL HAMRA" },
          { y:parseFloat(document.getElementById("guelmimC").innerHTML), label: "GUELMIM-OUED NOUN" },
          { y: parseFloat(document.getElementById("dakhlaC").innerHTML), label:"DAKHLA-OUED ED-DAHAB" },
          { y:parseFloat(document.getElementById("daraaC").innerHTML), label: "DRAA-TAFILALT" },
          { y:parseFloat(document.getElementById("kefch").innerHTML), label: "MARRAKECH-SAFI" },
      ]
      }]
    });
    chart.render();
    
  }

  function loadchart3(){
   
var chart = new CanvasJS.Chart("chartContainer3", {
	exportEnabled: true,theme: "dark1",
	animationEnabled: true,
	title:{
		text: "Le nombre de cas par regions"
	},
	legend:{
		cursor: "pointer",
		itemclick: explodePie
	},
	data: [{
		type: "pie",
		showInLegend: true,
		toolTipContent: "{name}: <strong>{y}</strong>",
		indexLabel: "{name} - {y}",
    dataPoints: [
      { y: parseFloat(document.getElementById("soussmassaC").innerHTML), label: "SOUSS-MASSA" ,exploded:true},
      { y: parseFloat(document.getElementById("benimellalC").innerHTML), label: "BENI MELLAL-KHENIFRA" },
      { y: parseFloat(document.getElementById("orinetalC").innerHTML), label: "ORIENTAL" },
      { y:parseFloat(document.getElementById("casasettatC").innerHTML), label: "CASABLANCA-SETTAT" },
      { y: parseFloat(document.getElementById("FES-MEKNESC").innerHTML), label: "FES-MEKNES" },
      { y: parseFloat(document.getElementById("rabatC").innerHTML), label: "RABAT-SALE-KENITRA" },
      { y: parseFloat(document.getElementById("tangerC").innerHTML), label: "TANGER-TETOUAN" },
      { y: parseFloat(document.getElementById("layounC").innerHTML), label: "LAAYOUNE-SAKIA EL HAMRA" },
      { y:parseFloat(document.getElementById("guelmimC").innerHTML), label: "GUELMIM-OUED NOUN" },
      { y: parseFloat(document.getElementById("dakhlaC").innerHTML), label:"DAKHLA-OUED ED-DAHAB" },
      { y:parseFloat(document.getElementById("daraaC").innerHTML), label: "DRAA-TAFILALT" },
      { y:parseFloat(document.getElementById("kefch").innerHTML), label: "MARRAKECH-SAFI" },
  ]
	}]
});
chart.render();
}

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

  }

  function loadchart4(){
    
var chart = new CanvasJS.Chart("chartContainer4", {
	animationEnabled: true,
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Cas par régions"
	},
	axisY: {
		title: "Reserves(MMbbl)"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "MMbbl = one million barrels",
		dataPoints: [
      { y: parseFloat(document.getElementById("soussmassaC").innerHTML), label: "SOUSS-MASSA" ,exploded:true},
      { y: parseFloat(document.getElementById("benimellalC").innerHTML), label: "BENI MELLAL-KHENIFRA" },
      { y: parseFloat(document.getElementById("orinetalC").innerHTML), label: "ORIENTAL" },
      { y:parseFloat(document.getElementById("casasettatC").innerHTML), label: "CASABLANCA-SETTAT" },
      { y: parseFloat(document.getElementById("FES-MEKNESC").innerHTML), label: "FES-MEKNES" },
      { y: parseFloat(document.getElementById("rabatC").innerHTML), label: "RABAT-SALE-KENITRA" },
      { y: parseFloat(document.getElementById("tangerC").innerHTML), label: "TANGER-TETOUAN" },
      { y: parseFloat(document.getElementById("layounC").innerHTML), label: "LAAYOUNE-SAKIA EL HAMRA" },
      { y:parseFloat(document.getElementById("guelmimC").innerHTML), label: "GUELMIM-OUED NOUN" },
      { y: parseFloat(document.getElementById("dakhlaC").innerHTML), label:"DAKHLA-OUED ED-DAHAB" },
      { y:parseFloat(document.getElementById("daraaC").innerHTML), label: "DRAA-TAFILALT" },
      { y:parseFloat(document.getElementById("kefch").innerHTML), label: "MARRAKECH-SAFI" },
  ]
	}]
});
chart.render();
  }

  function loadchart5(){
    var chart = new CanvasJS.Chart("chartContainer5", {
      animationEnabled: true,theme: "dark1",
      title:{
        text: "Cas aujourd'hui vs Cas 26/03/2020"
      },	
      axisY: {
        title: "Cas Aujourd'hui",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      axisY2: {
        title: "Cas 26/03/2020",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },	
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "column",
        name: "Cas ( aujourd'hui)",
        legendText: "Cas ( aujourd'hui)",
        showInLegend: true, 
        dataPoints: [
          { y: parseFloat(document.getElementById("soussmassaC").innerHTML), label: "SOUSS-MASSA" ,exploded:true},
          { y: parseFloat(document.getElementById("benimellalC").innerHTML), label: "BENI MELLAL-KHENIFRA" },
          { y: parseFloat(document.getElementById("orinetalC").innerHTML), label: "ORIENTAL" },
          { y:parseFloat(document.getElementById("casasettatC").innerHTML), label: "CASABLANCA-SETTAT" },
          { y: parseFloat(document.getElementById("FES-MEKNESC").innerHTML), label: "FES-MEKNES" },
          { y: parseFloat(document.getElementById("rabatC").innerHTML), label: "RABAT-SALE-KENITRA" },
          { y: parseFloat(document.getElementById("tangerC").innerHTML), label: "TANGER-TETOUAN" },
          { y: parseFloat(document.getElementById("layounC").innerHTML), label: "LAAYOUNE-SAKIA EL HAMRA" },
          { y:parseFloat(document.getElementById("guelmimC").innerHTML), label: "GUELMIM-OUED NOUN" },
          { y: parseFloat(document.getElementById("dakhlaC").innerHTML), label:"DAKHLA-OUED ED-DAHAB" },
          { y:parseFloat(document.getElementById("daraaC").innerHTML), label: "DRAA-TAFILALT" },
          { y:parseFloat(document.getElementById("kefch").innerHTML), label: "MARRAKECH-SAFI" },
      ]
      },
      {
        type: "column",	
        name: "Cas confirmés ( 26/03/2020) ",
        legendText: "Cas confirmés ( 26/03/2020)",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { y:10 , label: "SOUSS-MASSA" ,exploded:true},
          { y:7, label: "BENI MELLAL-KHENIFRA" },
          { y:7, label: "ORIENTAL" },
          { y:87, label: "CASABLANCA-SETTAT" },
          { y:51 , label: "FES-MEKNES" },
          { y:50 , label: "RABAT-SALE-KENITRA" },
          { y: 16, label: "TANGER-TETOUAN" },
          { y: 0, label: "LAAYOUNE-SAKIA EL HAMRA" },
          { y:1, label: "GUELMIM-OUED NOUN" },
          { y:0 , label:"DAKHLA-OUED ED-DAHAB" },
          { y:3, label: "DRAA-TAFILALT" },
          { y:43, label: "MARRAKECH-SAFI" },
      ]
      }]
    });
    chart.render(); }
    
    function toggleDataSeries(e) {
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
    
    function loadchart6(){
      var chart = new CanvasJS.Chart("chartContainer6", {
        animationEnabled: true,
        theme: "dark1",
        title:{
          text: "évolution Covid-19 au Maroc "
        },
        axisY:{
          includeZero: false
        },
        data: [{        
          type: "line",
              indexLabelFontSize: 16,
          dataPoints: [
            { y: parseFloat(document.getElementById("1d").innerHTML), label: "01/04/2020" },
            { y: parseFloat(document.getElementById("2d").innerHTML), label: "02/04/2020" },
            { y: parseFloat(document.getElementById("3d").innerHTML), label: "03/04/2020" },
            { y: parseFloat(document.getElementById("4d").innerHTML), label: "04/04/2020" },
            { y: parseFloat(document.getElementById("5d").innerHTML), label: "05/04/2020" },
            { y: parseFloat(document.getElementById("6d").innerHTML), label: "06/04/2020" },
            { y: parseFloat(document.getElementById("7d").innerHTML), label: "07/04/2020" },
            { y: parseFloat(document.getElementById("8d").innerHTML), label: "08/04/2020" },
            { y: parseFloat(document.getElementById("9d").innerHTML), label: "09/04/2020" },
            { y: parseFloat(document.getElementById("10d").innerHTML), label: "10/04/2020" },
            { y: parseFloat(document.getElementById("11d").innerHTML), label: "11/04/2020" },
            { y: parseFloat(document.getElementById("12d").innerHTML), label: "12/04/2020" },
            { y: parseFloat(document.getElementById("13d").innerHTML), label: "13/04/2020" },
            { y: parseFloat(document.getElementById("14d").innerHTML), label: "14/04/2020" },
            { y: parseFloat(document.getElementById("15d").innerHTML), label: "15/04/2020" },
            { y: parseFloat(document.getElementById("16d").innerHTML), label: "16/04/2020" },
            { y: parseFloat(document.getElementById("17d").innerHTML), label: "17/04/2020" },
            { y: parseFloat(document.getElementById("18d").innerHTML), label: "18/04/2020" },
            { y: parseFloat(document.getElementById("19d").innerHTML), label: "19/04/2020" },
            { y: parseFloat(document.getElementById("20d").innerHTML), label: "20/04/2020" },
            { y: parseFloat(document.getElementById("21d").innerHTML), label: "21/04/2020" },
            { y: parseFloat(document.getElementById("22d").innerHTML), label: "22/04/2020" },
            { y: parseFloat(document.getElementById("23d").innerHTML), label: "23/04/2020" },
            { y: parseFloat(document.getElementById("24d").innerHTML), label: "24/04/2020"},
            { y: parseFloat(document.getElementById("25d").innerHTML), label: "25/04/2020" },
            { y: parseFloat(document.getElementById("26d").innerHTML), label: "26/04/2020" },
            { y: parseFloat(document.getElementById("27d").innerHTML), label: "28/04/2020" },
            { y: parseFloat(document.getElementById("28d").innerHTML), label:"29/04/2020" },
            { y: parseFloat(document.getElementById("29d").innerHTML), label:"30/04/2020" },
            { y: parseFloat(document.getElementById("30d").innerHTML), label: "31/04/2020" },
            { y: parseFloat(document.getElementById("31d").innerHTML), label: "01/05/2020" },
            { y: parseFloat(document.getElementById("32d").innerHTML), label: "02/05/2020" },
            { y: parseFloat(document.getElementById("33d").innerHTML), label: "03/05/2020" },
            { y: parseFloat(document.getElementById("34d").innerHTML), label: "04/05/2020"},
            { y: parseFloat(document.getElementById("35d").innerHTML), label: "05/05/2020" },
            { y: parseFloat(document.getElementById("36d").innerHTML), label: "06/05/2020" },
            { y: parseFloat(document.getElementById("37d").innerHTML), label: "07/05/2020"},
            { y: parseFloat(document.getElementById("38d").innerHTML), label: "08/05/2020" },
            { y: parseFloat(document.getElementById("39d").innerHTML), label: "09/05/2020" },
            { y: parseFloat(document.getElementById("40d").innerHTML), label: "10/05/2020" },
            { y: parseFloat(document.getElementById("41d").innerHTML), label: "11/05/2020" },
            { y: parseFloat(document.getElementById("42d").innerHTML), label: "12/05/2020" },

          ]
        }]
      });
      chart.render();
  
    }
 
    function loadchart7(){
      var chart = new CanvasJS.Chart("chartContainer7", {
        animationEnabled: true,theme: "dark1",
        zoomEnabled: true,
        title:{
          text: "Evoltion du nombre des morts avec Covid-19 au Maroc" 
        },
        axisY :{
          includeZero:false
        },
        data:[{        
          type: "line",
              indexLabelFontSize: 16,
          dataPoints: [
            { y: parseFloat(document.getElementById("1g").innerHTML), label: "01/04/2020" },
            { y: parseFloat(document.getElementById("2g").innerHTML), label: "02/04/2020" },
            { y: parseFloat(document.getElementById("3g").innerHTML), label: "03/04/2020" },
            { y: parseFloat(document.getElementById("4g").innerHTML), label: "04/04/2020" },
            { y: parseFloat(document.getElementById("5g").innerHTML), label: "05/04/2020" },
            { y: parseFloat(document.getElementById("6g").innerHTML), label: "06/04/2020" },
            { y: parseFloat(document.getElementById("7g").innerHTML), label: "07/04/2020" },
            { y: parseFloat(document.getElementById("8g").innerHTML), label: "08/04/2020" },
            { y: parseFloat(document.getElementById("9g").innerHTML), label: "09/04/2020" },
            { y: parseFloat(document.getElementById("10g").innerHTML), label: "10/04/2020" },
            { y: parseFloat(document.getElementById("11g").innerHTML), label: "11/04/2020" },
            { y: parseFloat(document.getElementById("12g").innerHTML), label: "12/04/2020" },
            { y: parseFloat(document.getElementById("13g").innerHTML), label: "13/04/2020" },
            { y: parseFloat(document.getElementById("14g").innerHTML), label: "14/04/2020" },
            { y: parseFloat(document.getElementById("15g").innerHTML), label: "15/04/2020" },
            { y: parseFloat(document.getElementById("16g").innerHTML), label: "16/04/2020" },
            { y: parseFloat(document.getElementById("17g").innerHTML), label: "17/04/2020" },
            { y: parseFloat(document.getElementById("18g").innerHTML), label: "18/04/2020" },
            { y: parseFloat(document.getElementById("19g").innerHTML), label: "19/04/2020" }, 
            { y: parseFloat(document.getElementById("21g").innerHTML), label: "21/04/2020" },
            { y: parseFloat(document.getElementById("22g").innerHTML), label: "22/04/2020" },
            { y: parseFloat(document.getElementById("23g").innerHTML), label: "23/04/2020" },
            { y: parseFloat(document.getElementById("24g").innerHTML), label: "24/04/2020"},
            { y: parseFloat(document.getElementById("25g").innerHTML), label: "25/04/2020" },
            { y: parseFloat(document.getElementById("26g").innerHTML), label: "26/04/2020" },
            { y: parseFloat(document.getElementById("27g").innerHTML), label: "28/04/2020" },
            { y: parseFloat(document.getElementById("28g").innerHTML), label:"29/04/2020" },
            { y: parseFloat(document.getElementById("29g").innerHTML), label:"30/04/2020" },
            { y: parseFloat(document.getElementById("30g").innerHTML), label: "31/04/2020" },
            { y: parseFloat(document.getElementById("31g").innerHTML), label: "01/05/2020" },
            { y: parseFloat(document.getElementById("32g").innerHTML), label: "02/05/2020" },
            { y: parseFloat(document.getElementById("33g").innerHTML), label: "03/05/2020" },
            { y: parseFloat(document.getElementById("34g").innerHTML), label: "04/05/2020"},
            { y: parseFloat(document.getElementById("35g").innerHTML), label: "05/05/2020" },
            { y: parseFloat(document.getElementById("36g").innerHTML), label: "06/05/2020" },
            { y: parseFloat(document.getElementById("37g").innerHTML), label: "07/05/2020"},
            { y: parseFloat(document.getElementById("38g").innerHTML), label: "08/05/2020" },
            { y: parseFloat(document.getElementById("39g").innerHTML), label: "09/05/2020" },
            { y: parseFloat(document.getElementById("40g").innerHTML), label: "10/05/2020" },
            { y: parseFloat(document.getElementById("41g").innerHTML), label: "11/05/2020" },
            { y: parseFloat(document.getElementById("42g").innerHTML), label: "12/05/2020" },

          ]
        }]   // random generator below
      });
      chart.render();
      
      }
      function loadchart8(){
        var chart = new CanvasJS.Chart("chartContainer8", {
          animationEnabled: true,
          theme: "dark1",
          title:{
            text: "évolution Covid-19 au Maroc (Cummul des cas) "
          },
          axisY:{
            includeZero: false
          },
          data: [{        
            type: "line",
                indexLabelFontSize: 16,
            dataPoints: [
              { y: parseFloat(document.getElementById("1C").innerHTML), label: "01/04/2020" },
              { y: parseFloat(document.getElementById("2C").innerHTML), label: "02/04/2020" },
              { y: parseFloat(document.getElementById("3C").innerHTML), label: "03/04/2020" },
              { y: parseFloat(document.getElementById("4C").innerHTML), label: "04/04/2020" },
              { y: parseFloat(document.getElementById("5C").innerHTML), label: "05/04/2020" },
              { y: parseFloat(document.getElementById("6C").innerHTML), label: "06/04/2020" },
              { y: parseFloat(document.getElementById("7C").innerHTML), label: "07/04/2020" },
              { y: parseFloat(document.getElementById("8C").innerHTML), label: "08/04/2020" },
              { y: parseFloat(document.getElementById("9C").innerHTML), label: "09/04/2020" },
              { y: parseFloat(document.getElementById("10C").innerHTML), label: "10/04/2020" },
              { y: parseFloat(document.getElementById("11C").innerHTML), label: "11/04/2020" },
              { y: parseFloat(document.getElementById("12C").innerHTML), label: "12/04/2020" },
              { y: parseFloat(document.getElementById("13C").innerHTML), label: "13/04/2020" },
              { y: parseFloat(document.getElementById("14C").innerHTML), label: "14/04/2020" },
              { y: parseFloat(document.getElementById("15C").innerHTML), label: "15/04/2020" },
              { y: parseFloat(document.getElementById("16C").innerHTML), label: "16/04/2020" },
              { y: parseFloat(document.getElementById("17C").innerHTML), label: "17/04/2020" },
              { y: parseFloat(document.getElementById("18C").innerHTML), label: "18/04/2020" },
              { y: parseFloat(document.getElementById("19C").innerHTML), label: "19/04/2020" }, 
              { y: parseFloat(document.getElementById("20C").innerHTML), label: "20/04/2020" },
              { y: parseFloat(document.getElementById("21C").innerHTML), label: "21/04/2020" },
              { y: parseFloat(document.getElementById("22C").innerHTML), label: "22/04/2020" },
              { y: parseFloat(document.getElementById("23C").innerHTML), label: "23/04/2020" },
              { y: parseFloat(document.getElementById("24C").innerHTML), label: "24/04/2020"},
              { y: parseFloat(document.getElementById("25C").innerHTML), label: "25/04/2020" },
              { y: parseFloat(document.getElementById("26C").innerHTML), label: "26/04/2020" },
              { y: parseFloat(document.getElementById("27C").innerHTML), label: "28/04/2020" },
              { y: parseFloat(document.getElementById("28C").innerHTML), label:"29/04/2020" },
              { y: parseFloat(document.getElementById("29C").innerHTML), label:"30/04/2020" },
              { y: parseFloat(document.getElementById("30C").innerHTML), label: "31/04/2020" },
              { y: parseFloat(document.getElementById("31C").innerHTML), label: "01/05/2020" },
              { y: parseFloat(document.getElementById("32C").innerHTML), label: "02/05/2020" },
              { y: parseFloat(document.getElementById("33C").innerHTML), label: "03/05/2020" },
              { y: parseFloat(document.getElementById("34C").innerHTML), label: "04/05/2020"},
              { y: parseFloat(document.getElementById("35C").innerHTML), label: "05/05/2020" },
              { y: parseFloat(document.getElementById("36C").innerHTML), label: "06/05/2020" },
              { y: parseFloat(document.getElementById("37C").innerHTML), label: "07/05/2020"},
              { y: parseFloat(document.getElementById("38C").innerHTML), label: "08/05/2020" },
              { y: parseFloat(document.getElementById("39C").innerHTML), label: "09/05/2020" },
              { y: parseFloat(document.getElementById("40C").innerHTML), label: "10/05/2020" },
              { y: parseFloat(document.getElementById("41C").innerHTML), label: "11/05/2020" },
              { y: parseFloat(document.getElementById("42C").innerHTML), label: "12/05/2020" },
  
            ]
          }]
        });
        chart.render();
    
      }
      function loadchart9(){
        var chart = new CanvasJS.Chart("chartContainer9", {
          animationEnabled: true,theme: "dark1",
          zoomEnabled: true,
          title:{
            text: "Evolution des guéris au Maroc" 
          },
          axisY :{
            includeZero:false
          },
          data:[{        
            type: "line",
                indexLabelFontSize: 16,
                dataPoints: [
                  { y: parseFloat(document.getElementById("1m").innerHTML), label: "01/04/2020" },
                  { y: parseFloat(document.getElementById("2m").innerHTML), label: "02/04/2020" },
                  { y: parseFloat(document.getElementById("3m").innerHTML), label: "03/04/2020" },
                  { y: parseFloat(document.getElementById("4m").innerHTML), label: "04/04/2020" },
                  { y: parseFloat(document.getElementById("5m").innerHTML), label: "05/04/2020" },
                  { y: parseFloat(document.getElementById("6m").innerHTML), label: "06/04/2020" },
                  { y: parseFloat(document.getElementById("7m").innerHTML), label: "07/04/2020" },
                  { y: parseFloat(document.getElementById("8m").innerHTML), label: "08/04/2020" },
                  { y: parseFloat(document.getElementById("9m").innerHTML), label: "09/04/2020" },
                  { y: parseFloat(document.getElementById("10m").innerHTML), label: "10/04/2020" },
                  { y: parseFloat(document.getElementById("11m").innerHTML), label: "11/04/2020" },
                  { y: parseFloat(document.getElementById("12m").innerHTML), label: "12/04/2020" },
                  { y: parseFloat(document.getElementById("13m").innerHTML), label: "13/04/2020" },
                  { y: parseFloat(document.getElementById("14m").innerHTML), label: "14/04/2020" },
                  { y: parseFloat(document.getElementById("15m").innerHTML), label: "15/04/2020" },
                  { y: parseFloat(document.getElementById("16m").innerHTML), label: "16/04/2020" },
                  { y: parseFloat(document.getElementById("17m").innerHTML), label: "17/04/2020" },
                  { y: parseFloat(document.getElementById("18m").innerHTML), label: "18/04/2020" },
                  { y: parseFloat(document.getElementById("19m").innerHTML), label: "19/04/2020" },
                  { y: parseFloat(document.getElementById("20m").innerHTML), label: "20/04/2020" },
                  { y: parseFloat(document.getElementById("21m").innerHTML), label: "21/04/2020" },
                  { y: parseFloat(document.getElementById("22m").innerHTML), label: "22/04/2020" },
                  { y: parseFloat(document.getElementById("23m").innerHTML), label: "23/04/2020" },
                  { y: parseFloat(document.getElementById("24m").innerHTML), label: "24/04/2020"},
                  { y: parseFloat(document.getElementById("25m").innerHTML), label: "25/04/2020" },
                  { y: parseFloat(document.getElementById("26m").innerHTML), label: "26/04/2020" },
                  { y: parseFloat(document.getElementById("27m").innerHTML), label: "28/04/2020" },
                  { y: parseFloat(document.getElementById("28m").innerHTML), label:"29/04/2020" },
                  { y: parseFloat(document.getElementById("29m").innerHTML), label:"30/04/2020" },
                  { y: parseFloat(document.getElementById("30m").innerHTML), label: "31/04/2020" },
                  { y: parseFloat(document.getElementById("31m").innerHTML), label: "01/05/2020" },
                  { y: parseFloat(document.getElementById("32m").innerHTML), label: "02/05/2020" },
                  { y: parseFloat(document.getElementById("33m").innerHTML), label: "03/05/2020" },
                  { y: parseFloat(document.getElementById("34m").innerHTML), label: "04/05/2020"},
                  { y: parseFloat(document.getElementById("35m").innerHTML), label: "05/05/2020" },
                  { y: parseFloat(document.getElementById("36m").innerHTML), label: "06/05/2020" },
                  { y: parseFloat(document.getElementById("37m").innerHTML), label: "07/05/2020"},
                  { y: parseFloat(document.getElementById("38m").innerHTML), label: "08/05/2020" },
                  { y: parseFloat(document.getElementById("39m").innerHTML), label: "09/05/2020" },
                  { y: parseFloat(document.getElementById("40m").innerHTML), label: "10/05/2020" },
                  { y: parseFloat(document.getElementById("41m").innerHTML), label: "11/05/2020" },
                  { y: parseFloat(document.getElementById("42m").innerHTML), label: "12/05/2020" },
      
                ]
          }]   // random generator below
        });
        chart.render();
        
        }
    
  function laodSecondMap(){
    var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
  
    var map4 = new ol.Map({
      target: 'carte14',
      layers: [
        osm,
        new ol.layer.Tile({
          source : new ol.source.TileWMS({
              url : "http://localhost:8080/geoserver/EHTP/wms",
              params : {
                  "LAYERS" : "regions2014",
                  "TRANSPARENT" : "true",
                  "WIDTH" : 640,
                  "HEIGHT" : 480
              },crossOrigin: "Anonymous",
          }),
          
      }),
      new ol.layer.Tile({
        source : new ol.source.TileWMS({
            url : "http://localhost:8080/geoserver/EHTP/wms",
            params : {
                "LAYERS" : "Cas10-04",
                "TRANSPARENT" : "true",
                "WIDTH" : 640,
                "HEIGHT" : 480
            },crossOrigin: "Anonymous",
        }),
        
    }),
      ],
      view: new ol.View({
          center: ol.proj.transform([-7.63, 33.56], "EPSG:4326", "EPSG:3857"),
          zoom: 6
          })
    });
   
   /* var features = sourceWFS.getFeatures()
    console.log(features);*/
   // setTimeout(Setds,3000);

    var echartslayer = new EChartsLayer({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
   legend: {
        orient: "vertical",
        left: "right",
        data: ["cas confirmé"]
      },
      series: [
        {
          name: "Rabat-Sale-Kenitera",
          type: "pie",
          radius: 24,
          coordinates: [-6.240234, 34.315613],
          data: [
            { value: 212, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "L'Oriental",
          type: "pie",
          radius: "14",
          coordinates: [-2.150389, 33.435108],
          data: [
            { value: 94, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "BeniMellal-Khenifra",
          type: "pie",
          radius: "15",
          coordinates: [-6.284180,32.575209],
          data: [
            { value: 41, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "DRAA TAFILALT",
          type: "pie",
          radius: "15",
          coordinates: [-5.119629, 31.144499],
          data: [
            { value: 67, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Marrakech-Safi",
          type: "pie",
          radius: "24",
          coordinates: [-8.184082,31.728167],
          data: [
            { value: 297, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "SOUSS-MASSA",
          type: "pie",
          radius: "12",
          coordinates: [-8.437500,30.286899],
          data: [
            { value: 20, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Guelmim-Oued Noun",
          type: "pie",
          radius: "8",
          coordinates: [-9.909668,28.283743],
          data: [
            { value: 1, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Laayoune-Sakia",
          type: "pie",
          radius: "8",
          coordinates: [-12.326660,26.440409],
          data: [
            { value: 4, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "DAKHLA-OUED-EDDAHAB",
          type: "pie",
          radius: "8",
          coordinates: [-14.106445,23.512955],
          data: [
            { value: 2, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Casablanca",
          type: "pie",
          radius: "30",
          coordinates: [-7.69, 33.136],
          data: [
            { value: 412, name: "cas confirmé" },
          
            
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Tanger",
          type: "pie",
          radius: "28",
          coordinates: [-5.38, 35.2],
          data: [
            { value: 128, name: "cas confirmé" },
           
          ],
          itemStyle: {
            emphasis: {
              //shadowBlur: 10,
              //shadowOffsetX: 0,
              //shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Fes-Meknes",
          type: "pie",
          radius: "24",
          coordinates: [-4.79, 33.82],
          data: [
            { value: 178, name: "cas confirmé" },
          
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        
      ],
      
    });
  
   echartslayer.appendTo(map4);
  
    document.getElementById('choixdatecontainer').style.visibility="visible";
    var ourvalue=document.getElementById('datecouche');
    ourvalue.addEventListener('change',loadthenewmap);
    
    function loadthenewmap(){
      var newvalue=document.getElementById('datecouche').value+"/2020";
      //newvalue=this.value;
      //console.log("zycgbcbuqizhbdouzhn"+this.value);
      var sourceWFS3 = new ol.source.Vector({
        /* Chargement du lien WFS en format json*/
        url: 'http://localhost:8080/geoserver/wfs?service=WFS&'+'version=1.1.0&request=GetFeature&typename=EHTP:Castout&' +'outputFormat=application/json',
        format: new ol.format.GeoJSON(),
        serverType: 'geoserver'
      })
      var sousMassaC=14.2 ;
      /* Déclaration de la couche WFS */
      var coucheWFS3 = new ol.layer.Vector({ source: sourceWFS3});
      coucheWFS3.setStyle(new ol.style.Style({}));
      features = new Array();
      coucheWFS3.getSource().addFeatures(features);
      map4.addLayer(coucheWFS3);
      coucheWFS3.getSource().on('change', function(evt){
        
        var source = evt.target;
        var somme=0;
        if (source.getState() === 'ready') {
          coucheWFS3.getSource().forEachFeature(function(feature) {
            //console.log('feature : ', feature);
            
            var champs = feature.getKeys();
            var nb_propriete = feature.getKeys().length;
            var flag="";
            
            console.log(nb_propriete);
            for(var j=1; j<nb_propriete; j++){
              
              if(j+22<nb_propriete){
                console.log(feature.get(champs[j+22]) + "longuer "  + feature.get(champs[j+22]).length);
                if(feature.get(champs[j+22])=="Casa Settat              "){
                 // console.log("here we are dceznjd")
                  flag="Casa Settat";
                }
                if(feature.get(champs[j+22])=="Fès meknes               "){
                 // console.log("here we are dceznjd")
                  flag="Fès meknes";
                }
                if(feature.get(champs[j+22])=="Dakhla-Oued Ed Dahab     "){
                 // console.log("here we are dceznjd")
                  flag="Dakhla-Oued Ed Dahab";
                }
                if(feature.get(champs[j+22])=="Laâyoune-Sakia El Hamra  "){
                 // console.log("here we are dceznjd")
                  flag="Laâyoune-Sakia El Hamra";
                }
                if(feature.get(champs[j+22])=="Beni Mellal-Khénifra?    "){
                 // console.log("here we are dceznjd")
                  flag="Beni Mellal-Khénifra";
                }
                if(feature.get(champs[j+22])=="Daraa-tafilalet          "){
                 // console.log("here we are dceznjd")
                  flag="Daraa-tafilalet";
                }
                if(feature.get(champs[j+22])=="Oriental                 "){
                  //console.log("here we are dceznjd")
                  flag="Oriental";
                }
                if(feature.get(champs[j+22])=="Souss-Massa              "){
                  //console.log("here we are dceznjd")
                  flag="Souss-Massa";
                }
                if(feature.get(champs[j+22])=="Marrakech Safi           "){
                 // console.log("here we are dceznjd")
                  flag="Marrakech Safi";
                }
                if(feature.get(champs[j+22])=="Rabat Salé Kenitra       "){
                  //console.log("here we are dceznjd")
                  flag="Rabat Salé Kenitra";
                }
                if(feature.get(champs[j+22])=="Tanger Tetouan Al Hoceima"){
                  //console.log("here we are dceznjd")
                  flag="Tanger Tetouan Al Hoceima";
                }
                if(feature.get(champs[j+22])=="Guelmim Oued Noun        "){
                  //console.log("here we are dceznjd")
                  flag="Guelmim Oued Noun";
                }
                console.log(flag);
              }
              console.log(newvalue);
              if(champs[j]==newvalue && flag=="Fès meknes")  {
                document.getElementById("FES-MEKNESe").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
                console.log(somme);
              }
              if(champs[j]==newvalue && flag=="Guelmim Oued Noun")  {
                document.getElementById("guelmime").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Tanger Tetouan Al Hoceima")  {
                document.getElementById("tangere").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Rabat Salé Kenitra")  {
                document.getElementById("rabate").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Marrakech Safi")  {
                document.getElementById("kefche").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Souss-Massa")  {
                document.getElementById("soussmassae").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Oriental")  {
                document.getElementById("orinetale").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Daraa-tafilalet")  {
                document.getElementById("daraae").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Beni Mellal-Khénifra")  {
                document.getElementById("benimellale").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Laâyoune-Sakia El Hamra")  {
                document.getElementById("layoune").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Dakhla-Oued Ed Dahab")  {
                document.getElementById("dakhlae").innerHTML=feature.get(champs[j]);
                //console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
                somme=somme+parseInt(feature.get(champs[j]));
              } 
              if(champs[j]==newvalue && flag=="Casa Settat")  {
                document.getElementById("casasettate").innerHTML=feature.get(champs[j]);
               // console.log("votre valeur correspondante est : "+ feature.get(champs[j]));
               somme=somme+parseInt(feature.get(champs[j]));
              }         
              //console.log('voila le champs '  +champs[j]);
              //here we are !
           //console.log(' attribut '+champs[j]+': ', feature.get(champs[j]));
            }
            document.getElementById('sommee').innerHTML=somme;
            });
         
        }
      });
      
      setTimeout(populateechart,2000);
      //populateechart();
      function populateechart(){
        console.log("populating...");
         // console.log(echart1);
          //console.log("must be deleted now");
         //map4.removeLayer(echart1);
        // echart1.remove();
        
        echart1 = new EChartsLayer({

          tooltip: {
            trigger: "item",
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "right",
            data: ["cas confirmé"]
          },
          series: [
            {
              name: "Rabat-Sale-Kenitera",
              type: "pie",
              radius:24,
              //radius: (parseInt(document.getElementById("rabate").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-6.240234, 34.315613],
              data: [
                { value: parseInt(document.getElementById("rabate").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "L'Oriental",
              type: "pie",
              radius:"14",
              //radius: (parseInt(document.getElementById("orientale").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-2.150389, 33.435108],
              data: [
                { value: parseInt(document.getElementById("orinetale").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "BeniMellal-Khenifra",
              type: "pie",
              radius:15,
              //radius: (parseInt(document.getElementById("benimellale").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-6.284180,32.575209],
              data: [
                { value: parseInt(document.getElementById("benimellale").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "DRAA TAFILALT",
              type: "pie",
              radius:15,
              //radius: (parseInt(document.getElementById("daraae").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-5.119629, 31.144499],
              data: [
                { value: parseInt(document.getElementById("daraae").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Marrakech-Safi",
              type: "pie",
              radius:24,
              //radius: (parseInt(document.getElementById("kefche").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-8.184082,31.728167],
              data: [
                { value: parseInt(document.getElementById("kefche").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "SOUSS-MASSA",
              type: "pie",
              radius:12,
              //radius: (parseInt(document.getElementById("soussmassae").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-8.437500,30.286899],
              data: [
                { value: parseInt(document.getElementById("soussmassae").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Guelmim-Oued Noun",
              type: "pie",
              radius:8,
              //radius: (parseInt(document.getElementById("guelmime").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-9.909668,28.283743],
              data: [
                { value: parseInt(document.getElementById("guelmime").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Laayoune-Sakia",
              type: "pie",
              radius:8,
              // radius: (parseInt(document.getElementById("layoune").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-12.326660,26.440409],
              data: [
                { value: parseInt(document.getElementById("layoune").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "DAKHLA-OUED-EDDAHAB",
              type: "pie",
              radius:8,
              //radius: (parseInt(document.getElementById("dakhlae").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-14.106445,23.512955],
              data: [
                { value: parseInt(document.getElementById("dakhlae").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Casablanca",
              type: "pie",
              radius:30,
              //radius: (parseInt(document.getElementById("casasettate").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-7.69, 33.136],
              data: [
                { value: parseInt(document.getElementById("casasettate").innerHTML), name: "cas confirmé" },
              
                
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Tanger",
              type: "pie",
              radius:28,
              //radius: (parseInt(document.getElementById("tangere").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-5.38, 35.2],
              data: [
                { value: parseInt(document.getElementById("tangere").innerHTML), name: "cas confirmé" },
               
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "Fes-Meknes",
              type: "pie",
              radius:24,
              //radius: (parseInt(document.getElementById("FES-MEKNESe").innerHTML)/parseInt(document.getElementById("sommee").innerHTML)*30+5).toString(),
              coordinates: [-4.79, 33.82],
              data: [
                { value: parseInt(document.getElementById("FES-MEKNESe").innerHTML), name: "cas confirmé" },
              
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            
          ]
        });
      
      echart1.appendTo(map4);
      }
     
    }
  }
  //changement dynamique de la courbe 1
  var compt=0;
  $('.arrowbtnC1R').bind('click',function(){
     
      
      if(compt==4){
          $('#dynamicSpotCourbe1').html($('#courbe1-1').html()).show().siblings('div').hide();
          loadchart1();
          compt++;
          console.log(compt);
       }
      if(compt==3){
          $('#dynamicSpotCourbe1').html($('#courbe1-5').html()).show().siblings('div').hide();
          compt++;console.log(compt);loadchart5();
       } 
      if(compt==2){
          $('#dynamicSpotCourbe1').html($('#courbe1-4').html()).show().siblings('div').hide();
             compt++;console.log(compt);loadchart4()
       }  
      if(compt==1){
          $('#dynamicSpotCourbe1').html($('#courbe1-3').html()).show().siblings('div').hide();
          compt++;console.log(compt);loadchart3()
          
      }
      if(compt==0){
          $('#dynamicSpotCourbe1').html($('#courbe1-2').html()).show().siblings('div').hide();
          compt++;console.log(compt);
          loadchart2();
          
      }
      if (compt==5){
          compt=0;console.log(compt);
      }

  });
  $('.arrowbtnC1L').bind('click',function(){
      if(compt==0){
          $('#dynamicSpotCourbe1').html($('#courbe1-5').html()).show().siblings('div').hide();
          compt--;loadchart5();
          console.log(compt);
          
      }
      if(compt==1){
          $('#dynamicSpotCourbe1').html($('#courbe1-1').html()).show().siblings('div').hide();
          compt--;console.log(compt);
          loadchart1();
          
      }
      if(compt==2){
          $('#dynamicSpotCourbe1').html($('#courbe1-2').html()).show().siblings('div').hide();
             compt--;console.log(compt);
             loadchart2();
       }
       if(compt==3){
          $('#dynamicSpotCourbe1').html($('#courbe1-3').html()).show().siblings('div').hide();
          compt--;
          console.log(compt);loadchart3()
       } 
       if(compt==4){
          $('#dynamicSpotCourbe1').html($('#courbe1-4').html()).show().siblings('div').hide();
          compt--;loadchart4();
          console.log(compt);
       }
     if (compt==-1){
      compt=4;
     }
  });
  //changement dynamique de la courbe 2
  var compt1=0;
  $('.arrowbtnC2R').bind('click',function(){
     
      
      
      if(compt1==3){
          $('#dynamicSpotCourbe2').html($('#courbe2-1').html()).show().siblings('div').hide();
          compt1++;console.log(compt1);loadchart6()
       } 
      if(compt1==2){
          $('#dynamicSpotCourbe2').html($('#courbe2-4').html()).show().siblings('div').hide();
             compt1++;console.log(compt1);loadchart9()
       }  
      if(compt1==1){
          $('#dynamicSpotCourbe2').html($('#courbe2-3').html()).show().siblings('div').hide();
          compt1++;console.log(compt1);loadchart8()
          
      }
      if(compt1==0){
          $('#dynamicSpotCourbe2').html($('#courbe2-2').html()).show().siblings('div').hide();
          compt1++;console.log(compt1);loadchart7()
          
      }
      if (compt1==4){
          compt1=0;console.log(compt1);
      }

  });
  $('.arrowbtnC2L').bind('click',function(){
     
      if(compt1==1){
          $('#dynamicSpotCourbe2').html($('#courbe2-1').html()).show().siblings('div').hide();
          compt1--;console.log(compt1);loadchart6()
          
      }
      if(compt1==2){
          $('#dynamicSpotCourbe2').html($('#courbe2-2').html()).show().siblings('div').hide();
             compt1--;console.log(compt1);loadchart7()
       }
       if(compt1==3){
          $('#dynamicSpotCourbe2').html($('#courbe2-3').html()).show().siblings('div').hide();
          compt1--;
          console.log(compt1);loadchart8()
       } 
       if(compt1==4){
          $('#dynamicSpotCourbe2').html($('#courbe2-4').html()).show().siblings('div').hide();
          compt1--;
          console.log(compt1);loadchart9()
       }
     if (compt1==0){
      compt1=4;
     }
  });
});

function loadEvolution(){
  var map2 = new ol.Map({
    target : 'tanirightcarte',
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.FullScreen(),
        new ol.control.OverviewMap(),
        new ol.control.ZoomSlider(),
        
      
    ]),
    layers : [
        new ol.layer.Tile({
            source : new ol.source.OSM()
        }),
        new ol.layer.Tile({
            source : new ol.source.TileWMS({
                url : "http://localhost:8080/geoserver/EHTP/wms",
                params : {
                    "LAYERS" : "Provinces2014",
                    "TRANSPARENT" : "true",
                    "WIDTH" : 640,
                    "HEIGHT" : 480
                },crossOrigin: "Anonymous",
            })
        }),
    ],
    view : new ol.View({
        center : ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
        zoom : 6
    })
});
}
}