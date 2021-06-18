
//var data = jQuery.getJSON("https://raw.githubusercontent.com/guymorlan/levantine_verbs/main/data.json");
var data = $.ajax({
  url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/5300e75bb082cb0ff1c7b0c05d9aaf2da268f13d/data_1806.json",
  async: false,
  dataType: 'json'
});



var gridMain = new gridjs.Grid({
	columns: ["Person", "Perfect", "Imperfect", "Bi-imperfect"], 
	data: data["responseJSON"][0]["main"],
	style: {table: {
      'font-size': '25px'
	  }}}).render(document.getElementById("main-table"));
	
var gridSecond = new gridjs.Grid({
	columns: ["Person", "Imperative", "Person", "Active Participle"], 
	data: data["responseJSON"][0]["secondary"],
	style: {table: {
      'font-size': '25px'
    }}}).render(document.getElementById("second-table"));

$('.js-example-basic-single').on('select2:select', function (e) {
	
	
	//$("#user-table").html("");

	//console.log(data[e.params.data.id])
	gridMain.updateConfig({columns: ["Person", "Perfect", "Imperfect", "Bi-imperfect"], data: data["responseJSON"][e.params.data.id]["main"]}).forceRender();
	gridSecond.updateConfig({columns: ["Person", "Imperative", "Person", "Active Participle"], data: data["responseJSON"][e.params.data.id]["secondary"]}).forceRender();
	
	var info = document.getElementsByName("verb-info");
	info[0].innerHTML = "<b>Verb: </b>" + data["responseJSON"][e.params.data.id]["verb"] + "<br>" +
	"<b> Root: </b>" + data["responseJSON"][e.params.data.id]["root"] + "<br>" +
	"<b> Form: </b>" + data["responseJSON"][e.params.data.id]["form"] + "<br>" +
	"<b> Meaning: </b>" + data["responseJSON"][e.params.data.id]["english"]
	
	//.render(document.getElementById("user-table"));
	
	
});


$(document).ready(function() {
	
	
	function formatVerb (verb) {

  var $verb= $(verb.text  );
  return $verb;
};

	$(".js-example-basic-single").select2({
  templateResult: formatVerb,
  templateSelection: formatVerb
      //dir: "rtl"

});
	
	//for (var i = 0; i < data["responseJSON"].length; i++) {
	for (var i = 0; i < 11; i++) {

		var newOption = new Option(data["responseJSON"][i]["id"], data["responseJSON"][i]["id"], false, false);
		$('.js-example-basic-single').append(newOption).trigger('change');
	};

	//$("select[name=verb]").change(function(){
    //alert($("select[name=verb]"));
	//};
});



