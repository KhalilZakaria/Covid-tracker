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
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
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
                    { y: 51.08, label: "Chrome" },
                    { y: 27.34, label: "Internet Explorer" },
                    { y: 10.62, label: "Firefox" },
                    { y: 5.02, label: "Microsoft Edge" },
                    { y: 4.07, label: "Safari" },
                    { y: 1.22, label: "Opera" },
                    { y: 0.44, label: "Others" }
                ]
            }]
        });
        chart.render();


    }

    function laodSecondMap(){
        
        var map3 = new ol.Map({
            target : 'carte14',
            controls: ol.control.defaults().extend([
                new ol.control.ScaleLine(),
                new ol.control.FullScreen(),
                new ol.control.OverviewMap(),
                
              
            ]),
            layers : [
                new ol.layer.Tile({
                    source : new ol.source.OSM()
                }),
            ],
            view : new ol.View({
                center : ol.proj.transform([-7.63, 33.56],"EPSG:4326" , "EPSG:3857"),
                zoom : 4
            })
        });
        
    }
    //changement dynamique de la courbe 1
    var compt=0;
    $('.arrowbtnC1R').bind('click',function(){
       
        
        if(compt==4){
            $('#dynamicSpotCourbe1').html($('#courbe1-1').html()).show().siblings('div').hide();
            compt++;
            console.log(compt);
         }
        if(compt==3){
            $('#dynamicSpotCourbe1').html($('#courbe1-5').html()).show().siblings('div').hide();
            compt++;console.log(compt);
         } 
        if(compt==2){
            $('#dynamicSpotCourbe1').html($('#courbe1-4').html()).show().siblings('div').hide();
               compt++;console.log(compt);
         }  
        if(compt==1){
            $('#dynamicSpotCourbe1').html($('#courbe1-3').html()).show().siblings('div').hide();
            compt++;console.log(compt);
            
        }
        if(compt==0){
            $('#dynamicSpotCourbe1').html($('#courbe1-2').html()).show().siblings('div').hide();
            compt++;console.log(compt);
            
        }
        if (compt==5){
            compt=0;console.log(compt);
        }

    });
    $('.arrowbtnC1L').bind('click',function(){
        if(compt==0){
            $('#dynamicSpotCourbe1').html($('#courbe1-5').html()).show().siblings('div').hide();
            compt--;
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
         }
         if(compt==3){
            $('#dynamicSpotCourbe1').html($('#courbe1-3').html()).show().siblings('div').hide();
            compt--;
            console.log(compt);
         } 
         if(compt==4){
            $('#dynamicSpotCourbe1').html($('#courbe1-4').html()).show().siblings('div').hide();
            compt--;
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
            compt1++;console.log(compt1);
         } 
        if(compt1==2){
            $('#dynamicSpotCourbe2').html($('#courbe2-4').html()).show().siblings('div').hide();
               compt1++;console.log(compt1);
         }  
        if(compt1==1){
            $('#dynamicSpotCourbe2').html($('#courbe2-3').html()).show().siblings('div').hide();
            compt1++;console.log(compt1);
            
        }
        if(compt1==0){
            $('#dynamicSpotCourbe2').html($('#courbe2-2').html()).show().siblings('div').hide();
            compt1++;console.log(compt1);
            
        }
        if (compt1==4){
            compt1=0;console.log(compt1);
        }

    });
    $('.arrowbtnC2L').bind('click',function(){
       
        if(compt1==1){
            $('#dynamicSpotCourbe2').html($('#courbe2-1').html()).show().siblings('div').hide();
            compt1--;console.log(compt1);
            
        }
        if(compt1==2){
            $('#dynamicSpotCourbe2').html($('#courbe2-2').html()).show().siblings('div').hide();
               compt1--;console.log(compt1);
         }
         if(compt1==3){
            $('#dynamicSpotCourbe2').html($('#courbe2-3').html()).show().siblings('div').hide();
            compt1--;
            console.log(compt1);
         } 
         if(compt1==4){
            $('#dynamicSpotCourbe2').html($('#courbe2-4').html()).show().siblings('div').hide();
            compt1--;
            console.log(compt1);
         }
       if (compt1==0){
        compt1=4;
       }
    });
});