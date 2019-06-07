'use strict';

let neighborhoods = [];

function Neighborhood(rawDataObj) {
    for (let key in rawDataObj) {
        this[key] = rawDataObj[key];
    }
} 

Neighborhood.prototype.toHtml = function() {
    // step 1 - get the template from the HTML doc
    let template = $('#neighborhood-template').html();
    // step 2 - compile the template
    let templateRender = Handlebars.compile(template);
    // step 3 - return the compiled tempate (actual html)
    return templateRender(this);
}

neighborhoodDataSet.forEach(neighborhoodObject => {
    neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach(ourNeigborhoodObject => {
    $('#neighborhoods').append(ourNeigborhoodObject.toHtml());
});