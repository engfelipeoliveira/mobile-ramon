var arraySavedNews = [];
if(localStorage.getItem("arraySavedNews") != null){
	arraySavedNews = JSON.parse(localStorage.getItem("arraySavedNews"));
}

$(document).ready(function() {
	var urlApiSport = 'http://newsapi.org/v2/everything?q=sport&apiKey=d77b40b94e714053b0e20391cad1954b';
	var urlBusiness = 'http://newsapi.org/v2/everything?q=business&apiKey=d77b40b94e714053b0e20391cad1954b';
	var urlFinancial = 'http://newsapi.org/v2/everything?q=financial&apiKey=d77b40b94e714053b0e20391cad1954b';

	// add datetime in home page
	nowDateTime();
	
	// add news into arrays 
	callRestApiNews('sport', urlApiSport);
	callRestApiNews('business', urlBusiness);
	callRestApiNews('financial', urlFinancial);
	setDataTable(arraySavedNews, 'saved');
		
	// show or hide zone of the news
	$(".back").on("click", function(e) {
		nowDateTime();
		$("#div-home").show();
		$("#div-sport").hide();
		$("#div-business").hide();
		$("#div-financial").hide();		
		$("#div-saved").hide();		
	});

	$("#menu-sport").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").show();
		$("#div-business").hide();
		$("#div-financial").hide();
		$("#div-saved").hide();		
	});
	
	$("#menu-business").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").hide();
		$("#div-business").show();
		$("#div-financial").hide();
		$("#div-saved").hide();		
	});

	$("#menu-financial").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").hide();
		$("#div-business").hide();
		$("#div-financial").show();
		$("#div-saved").hide();		
	});


	$("#menu-saved").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").hide();
		$("#div-business").hide();
		$("#div-financial").hide();
		$("#div-saved").show();	
		refreshSavedNews();
		
	});
	
	$(".btn-saved").on("click", function(e) {
		
		var selectedNews = $(this).attr("id");
		var tableSport = $('#dt-sport').DataTable().rows().data();
		var tableBusiness = $('#dt-business').DataTable().rows().data();
		var tableFinancial = $('#dt-financial').DataTable().rows().data();
		
		$.each(tableSport, function() {
				var dtPublished = this[0];
				var news = this[1];
				
				if(selectedNews == dtPublished){
					arraySavedNews.push([dtPublished, news, ""]);
				}
		});
		
				
		$.each(tableBusiness, function() {
				var dtPublished = this[0];
				var news = this[1];
				
				if(selectedNews == dtPublished){
					arraySavedNews.push([dtPublished, news, ""]);
				}
		});
		
				
		$.each(tableFinancial, function() {
				var dtPublished = this[0];
				var news = this[1];
				
				if(selectedNews == dtPublished){
					arraySavedNews.push([dtPublished, news, ""]);
				}
		});	
		
		localStorage.setItem("arraySavedNews", JSON.stringify(arraySavedNews));
	});
});

// get date and time
function nowDateTime() {
	nowDate();
	nowTime();
}

// get date
function nowDate() {
	var monthNames = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	$('#nowDate').html(day + "/" + monthNames[monthIndex] + "/" + year);	
}

// get time
function nowTime() {
	var pad = "0";
	var date = new Date();
	var minutes = date.getMinutes();
	var hour = date.getHours();
	$('#nowTime').html(hour + ":" + pad.substring(1, pad.length - minutes.length) + minutes);	
}



// call rest to get news from api
function callRestApiNews(suject, urlApi) {
	var url = urlApi;
	$.ajax({
		url : url,
		type : "GET",
		async : false, 
		success : (function(data, status, jqXhr) {
			var arrayOfNews = [];
			let news;
			$.each(data.articles, function() {
				news = {publishedAt : this.publishedAt, description : this.description};
				arrayOfNews.push([this.publishedAt, this.description, "<a class='btn-saved' id='"+this.publishedAt+"' href='#'><i class='fas fa-save'></i></a>"]);				
			});
			setDataTable(arrayOfNews, suject);			
		})
	});
}

// json to datatable
function setDataTable(arrayOfNews, el) {
	$('#dt-' + el).DataTable( {
		"searching": true,
		"info": true,
		"lengthChange": true,
		data: arrayOfNews,
		columns: [
			{ title: "Published" },
			{ title: "Text" },
			{ title: "Save" }
		]
	});	
}

// refresh datatable saved news
function refreshSavedNews() {
	$('#dt-saved').DataTable().destroy();
	setDataTable(arraySavedNews, 'saved');
	
}

