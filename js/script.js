var jsonloc = 'js/page.json';
$(document).ready(function () {
    loadJson();
});
async function loadJson() {

    $.getJSON(jsonloc, function (data) {
        // Display the data
        loadWhatsnew(data.whats_new);
        $("#devnote").html(data.dev_notes);
        loadFeatuersdata(data.featuers);
        $("#aboutp").html(data.about_template);
    });

}

async function loadWhatsnew(data) {
   $("#whtlist").empty();
   data.forEach(element => {
    var  elemrnt = `   <li class="list-group-item"><i class="fa-solid fa-check"></i> ${element}</li>`;
    $("#whtlist").append(elemrnt);  
});



  }
  function downloadzip() {
    //https://github.com/madushanjoel98/flask_template/archive/refs/heads/main.zip
    window.location.href = "https://github.com/madushanjoel98/flask_template/archive/refs/heads/main.zip";
}
//featue

async function loadFeatuersdata(data) {
    $("#featue").empty();
    data.forEach(element => {
     var  elemrnt = `   <li class="list-group-item"><i class="fa-solid fa-square-up-right"></i> ${element}</li>`;
     $("#featue").append(elemrnt);  
 });
}