var arraySavedNews = [];

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
		
	// show or hide zone of the news
	$(".back").on("click", function(e) {
		nowDateTime();
		$("#div-home").show();
		$("#div-sport").hide();
		$("#div-business").hide();
		$("#div-financial").hide();		
	});

	$("#menu-sport").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").show();
		$("#div-business").hide();
		$("#div-financial").hide();
	});
	
	$("#menu-business").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").hide();
		$("#div-business").show();
		$("#div-financial").hide();
	});

	$("#menu-financial").on("click", function(e) {
		$("#div-home").hide();
		$("#div-sport").hide();
		$("#div-business").hide();
		$("#div-financial").show();
	});
	
	$(".btn-fav").on("click", function(e) {
		
		var table = $('#dt-sport').DataTable().rows().data();
		
		
		var lineNews = $(this).attr("id");
		var table = lineNews.split('-')[0];
		var tr = lineNews.split('-')[1];
		
		var publishedAt = $("#dt-" + table)[0].rows[tr].cells[0].innerText;
		var description = $("#dt-" + table)[0].rows[tr].cells[1].innerText;

		SavedNew.push([publishedAt, description, ""]);						
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
	$('#nowTime').html(hour + ":" + pad.substring(0, pad.length - minutes.length) + minutes);	
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
				arrayOfNews.push([this.publishedAt, this.description, "<a class='btn-fav' id='"+this.publishedAt+"' href='#'><i class='fas fa-save'></i></a>"]);				
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
		"select": true,
		rightColumns: 1,
		data: arrayOfNews,
		columns: [
			{ title: "Published" },
			{ title: "News" },
			{ title: "Action" }
		]
	});	
}