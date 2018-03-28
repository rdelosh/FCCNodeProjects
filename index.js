var express = require('express')
var path = require('path')
var url = require('url')
var app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.get('/*',function(req,res){
	
	myurl = url.parse(req.url,true)
	var param = myurl.path
	const monthNames = ["January", "February", "March", "April", "May", "June",
				  "July", "August", "September", "October", "November", "December"
					];


	if(param==="/"){
		//return ejs
		res.render('index')
	}else{
		//return json
		res.setHeader('Content-Type', 'application/json');
		try{
			if(param.includes('%20')){
				var MonthNumber = 0;
				var segments = param.split('%20')
				var paramDay = segments[1].substring(0,segments.length-1)
				var paramMonth = segments[0].substring(1,segments[0].length)
				monthNames.map(function(month,index){
					if(paramMonth.toUpperCase()===month.toUpperCase()){
						MonthNumber=index
						
					}
					
				})

				var paramYear = segments[2]
				
				var newdate = new Date(paramYear,MonthNumber,paramDay,0,0,0,0)
				


				if(typeof newdate!=undefined && newdate!=null){
					res.send(JSON.stringify(
						{unix:newdate.getTime(),
						naturaldate:monthNames[MonthNumber]+" "+paramDay+", "+
								paramYear}))	
				}
			}else{
				param = param.substring(1,param.length)
				var newdate = new Date(parseInt(param))

				
				
				console.log(newdate.toString("MM dd"))
				console.log(newdate.getYear())
				res.send(JSON.stringify(
						{unix:newdate.getTime(),
						naturaldate:monthNames[newdate.getMonth()]+" "+newdate.getDate()+", "+
								newdate.getYear()}))
			}
		
		
		}catch(e){
			res.send(JSON.stringify({unix:null,naturaldate:null}))	
		}
		
	}
	
})
app.listen(process.env.PORT || 5000)


