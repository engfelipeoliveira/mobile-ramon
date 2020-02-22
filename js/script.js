var dataSetFavorites = [];

$(document).ready(function() {
	
	// armazenamento das noticias em array para evitar calls desnecessarios
	getDate();
	getNews('sport');
	getNews('business');
	getNews('financial');
		
	// escoder e exibir o conteudo conforme botoes de acao no menu
	$("#menu-home").on("click", function(e) {
		getDate();
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
		var lineNews = $(this).attr("id");
		var table = lineNews.split('-')[0];
		var tr = lineNews.split('-')[1];
		
		var publishedAt = $("#dataTable-" + table)[0].rows[tr].cells[0].innerText;
		var description = $("#dataTable-" + table)[0].rows[tr].cells[1].innerText;

		dataSetFavorites.push([publishedAt, description, ""]);						
	});
	
	
		
});

function getDate() {
	$('#dataTable-home').html(new Date());	
}

//metodo para obter as noticias do site news api atraves de um call GET
function getNews(type) {
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
				dataSet.push([new Date(this.publishedAt).toLocaleDateString("en-IE"), this.description, "<a class='btn-fav' id='"+type+"-"+this.publishedAt+"' href='#'><i class='fas fa-star'></i></a>"]);				
			});
			setDataTable(dataSet, type);			
		})
	});
}

// metodo para transformar o json em um datatable
function setDataTable(dataSet, el) {
	$('#dataTable-' + el).DataTable( {
		"searching": true,
		"info": true,
		"lengthChange": true,
		rightColumns: 1,
		data: dataSet,
		columns: [
			{ title: "Published" },
			{ title: "Description" },
			{ title: "Favorites" }
		]
	});	
}