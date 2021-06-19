
//var data = jQuery.getJSON("https://raw.githubusercontent.com/guymorlan/levantine_verbs/main/data.json");
var data = $.ajax({
	 // url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/f7f40850b714356e8fac6694192b9f6cdfd15797/data.json",
	// url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/c2cf6e63276c7873156d4205482d06553879c1ca/data_1906.json",
	 //url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/df24fa03aec57dea22db7c393c6b95e146a807bd/data_1906_new.json",
	 url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/5ce4afbfb155eb245b305a046567cc0220c826db/data_1906_new2.json",
  async: false,
  dataType: 'json'
});


function updateInfo(id){
	var info = document.getElementsByName("verb-info");
	info[0].innerHTML = "<b>Verb: </b>" + data["responseJSON"][id]["verb"] + "<br>" +
	"<b> Root: </b>" + data["responseJSON"][id]["root"] + "<br>" +
	"<b> Form: </b>" + data["responseJSON"][id]["form"] + "<br>" +
	"<b> Meaning: </b>" + data["responseJSON"][id]["english"]
	
	
}
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
	updateInfo(e.params.data.id);
	//.render(document.getElementById("user-table"));
	
	
});



	function formatVerb (verb) {

  var $verb= $(verb.text);
  return $verb;
};

$(document).ready(function() {
	
	


	$(".js-example-basic-single").select2({
		  escapeMarkup: function(markup) {
    return markup;
  },
  templateResult: function(data) {
    return data.text;
  },
  templateSelection: function(data) {
    return data.text;
  },
//		templateResult: formatVerb,
  //templateSelection: formatVerb,
      dir: "rtl"

});
	
	for (var i = 0; i < data["responseJSON"].length; i++) {
	//for (var i = 0; i < 11; i++) {

		var newOption = new Option(data["responseJSON"][i]["text"], data["responseJSON"][i]["id"], false, false);
		$('.js-example-basic-single').append(newOption).trigger('change');
	};

	updateInfo(0);
	//$("select[name=verb]").change(function(){
    //alert($("select[name=verb]"));
	//};
});



