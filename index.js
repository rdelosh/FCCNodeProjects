var express = require('express')
var path = require('path')
var url = require('url')
var app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.get('/*',function(req,res){
	
	myurl = url.parse(req.url,true)
	var param = myurl.path


	if(param==="/"){
		//return ejs
		res.render('index')
	}else{
		//return json
		res.setHeader('Content-Type', 'application/json');
		try{
		
			var segments = param.split('%20')
		
		var paramDay = segments[1].substring(0,segments.length-1)
		const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
			];
		var paramMonth = segments[0].substring(1,segments[0].length)
		monthNames.map(function(month,index){
			if(paramMonth.toUpperCase()===month.toUpperCase()){
				paramMonth=index
			}
		})
		var paramYear = segments[2]
		
		var newdate = new Date(paramYear,paramMonth,paramDay,0,0,0,0)
		console.log(newdate)


		if(typeof newdate!=undefined && newdate!=null){
			res.send(JSON.stringify(
				{unix:newdate.getTime(),
				naturaldate:monthNames[paramMonth]+" "+paramDay+", "+
						paramYear}))	
		}
		
		}catch(e){
			res.send(JSON.stringify({unix:null,naturaldate:null}))	
		}
		
	}
	
})
app.listen(3000)

