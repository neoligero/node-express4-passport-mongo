var articleListData = [];

$(document).ready(function(){
	//fillTable();
});

function fillTable(){
	var data = {};
	//optional { atitle: "" }

	var tableContent = '';
	$.getJSON('/articles/articleList/', data, function( response ){
		$.each(response, function(){
		tableContent += '<tr>';
		tableContent += '<td><a href="#" class="linkshowarticle" rel="' + this.title + '">' + this.title + '</a></td>';
    	tableContent += '<td>' + this.subtitle + '</td>';
    	tableContent += '<td>' + this.author + '</td>';
    	tableContent += '<td>' + this.date + '</td>';
    	tableContent += '<td>' + this.text + '</td>';
    	tableContent += '<td><a href="#" class="linkdeletearticle" rel="' + this._id + '">delete</a></td>';
    	tableContent += '</tr>';
	});

		//inject content
		$('#articleList table tbody').html( tableContent );
	}).error(function(jqXHR, textStatus, errorThrown) {
        	console.log("error " + textStatus);
        	console.log("incoming Text " + jqXHR.responseText);
    	});
}


/*$.ajax({
  url: "/articles/articleList",
  method: "GET",
  dataType: "html"
}).done(function( data ) {
  console.log(data);
}).fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus + jqXHR.responseText );
});*/
