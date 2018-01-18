(()=>{
	ajax("get","footer.html","","text")
		.then(html=>{
		document.getElementById("footer")
            .innerHTML=html;
	})
})();