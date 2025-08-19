var jsonloc = 'js/page.json';
$(document).ready(function () {
    loadJson();
    $("#doc").hide();
});
async function loadJson() {

    $.getJSON(jsonloc, function (data) {
        // Display the data
        loadWhatsnew(data.whats_new);
        // $("#devnote").html(data.dev_notes);
        loadFeatuersdata(data.featuers);
        $("#aboutp").html(data.about_template);
        $(".versionno").html(data.versionno);
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
    $.getJSON(jsonloc, function (data) {
        // Display the data
        window.location.href = data.relase_url;
    });
    //https://github.com/madushanjoel98/flask_template/archive/refs/heads/main.zip
   
}
//featue

async function loadFeatuersdata(data) {
    $("#featue").empty();
    data.forEach(element => {
     var  elemrnt = `   <li class="list-group-item"><i class="fa-solid fa-square-up-right"></i> ${element}</li>`;
     $("#featue").append(elemrnt);  
 });
}
async function loadDocument(){
    fetch("https://raw.githubusercontent.com/madushanjoel98/flask_template/refs/heads/main/README.md")
    .then(response => response.text())
    .then(md => {
        const renderer = new marked.Renderer();
        marked.setOptions({
            renderer: renderer,
            highlight: function (code, lang) {
                if (hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return code;
            },
            langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
            breaks: true,
        });
        // document.getElementById("content").innerHTML = marked.parse(md);
        $("#doc").empty();
        $("#doc").toggle();
        $("#doc").append(marked.parse(md));
    })
    .catch(err => {
        $("#doc").hide();
        // document.getElementById("content").innerHTML = "<p>Error loading markdown file.</p>";
        console.error(err);
    });
}