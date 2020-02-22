var savedNews = [];

$(document).ready(function() {
	
	// add news into arrays 
	now();
	callRestApiNews('sport');
	callRestApiNews('business');
	callRestApiNews('financial');
		
	// show or hide zone of the news
	$("#menu-home").on("click", function(e) {
		now();
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

		savedNews.push([publishedAt, description, ""]);						
	});
	
	
		
});

// get date
function now() {
	$('#dt-home').html(new Date());	
}

// call rest to get news from api
function callRestApiNews(type) {
	var url = 'http://newsapi.org/v2/everything?q='+type+'&apiKey=d77b40b94e714053b0e20391cad1954b';
	$.ajax({
		url : url,
		type : "GET",
		async : false, 
		success : (function(data, status, jqXhr) {
			var dataSet = [];
			let news;
			var count = 0;
			$.each(data.articles, function() {
				news = {publishedAt : this.publishedAt, description : this.description};
				dataSet.push([this.publishedAt, this.description, "<a class='btn-fav' id='"+this.publishedAt+"' href='#'><i class='fas fa-save'></i></a>"]);				
			});
			setDataTable(dataSet, type);			
		})
	});
}

// json to datatable
function setDataTable(dataSet, el) {
	$('#dt-' + el).DataTable( {
		"searching": true,
		"info": true,
		"lengthChange": true,
		"select": true,
		rightColumns: 1,
		data: dataSet,
		columns: [
			{ title: "Published" },
			{ title: "News" },
			{ title: "Action" }
		]
	});	
}