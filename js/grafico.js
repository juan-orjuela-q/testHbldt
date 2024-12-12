document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('featuredImageContainer');

    function definirColorBurbuja(y) {
        if (y < 100) {
            return '#1bb2bf';
        } else if (y < 300) {
            return '#0c8c3c';
        } else if (y < 600) {
            return '#fbb906';
        } else if (y < 900) {
            return '#ea780a';
        } else if (y < 1200) {
            return '#df4b14';
        } else {
            return '#de3b18';
        }
    }

    function mostrarEspecieDestacada(especie) {
        const { nombreComun, nombreCientifico, img, y } = especie;
        modal.classList.add('visible');
        modal.querySelector('strong').innerHTML = nombreComun;
        modal.querySelector('em').innerHTML = nombreCientifico;
        modal.querySelector('i').style.backgroundColor = definirColorBurbuja(y);
        modal.querySelector('img').src = img;

    }
    fetch('./data/conjunto_datos_plantas_2.json')
        .then(response => response.json())
        .then(data => {
            
            Highcharts.chart('container', {

                

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zooming: {
                        type: 'xy'
                    }
                },
            
                legend: {
                    enabled: false
                },
            
                title: {
                    text: ''
                },
            
                           
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'NÚMERO DE PARCELAS EN DONDE SE ENCUENTRA LA ESPECIE'
                    },
                    
                    plotLines: [{
                        color: '#9d9d9c',
                        dashStyle: 'solid',
                        width: 2,
                        value: 5,
                        zIndex: 3
                    }],
                    accessibility: {
                        rangeDescription: 'Range: 60 to 100 grams.'
                    }
                },
            
                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'NÚMERO TOTAL DE INDIVIDUOS'
                    },
                    maxPadding: 0.2,
                    plotLines: [{
                        color: '#9d9d9c',
                        dashStyle: 'solid',
                        width: 2,
                        value: 100,
                        zIndex: 3
                    }],
                    accessibility: {
                        rangeDescription: 'Range: 0 to 160 grams.'
                    }
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<div class="tooltipContainer {point.featured}">',
                    pointFormat: '<div class="tooltipInfo">' +
                        '<p><strong>{point.nombreComun}</strong><br/>' +
                        '<em>{point.nombreCientifico}</em></p>'+
                        '<p><strong>Individuos: </strong>{point.y}</p>'+
                        '<p><strong>Parcelas: </strong>{point.x}</p>'+
                        '<div>',
                    footerFormat: '</div>',
                    followPointer: true
                },
                plotOptions: {
                    bubble: {
                        minSize: 16,
                        maxSize: 16,
                        point: {
                            events: {
                                mouseOver: function () {
                                    if(this.featured) {
                                        mostrarEspecieDestacada(this)
                                    } else {
                                        modal.classList.remove('visible');
                                    }
                                }
                            }
                        }
                    }
                },
                series: [{
                    data: data.map(point => ({
                        ...point,
                        marker: {
                            fillColor: definirColorBurbuja(point.y),
                            lineColor: definirColorBurbuja(point.y),
                            lineWidth: point.featured ? 5 : 1,
                            states: {
                                hover: {
                                    lineWidthPlus:0,
                                    fillOpacity: 0.9
                                    
                                }
                            }
                        }
                    }))
                }]
            
            });
            //
        })
        .catch(error => console.error('Error loading JSON data:', error));
});