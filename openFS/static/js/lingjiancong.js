/**
 * Created by ling on 15-4-17.
 */

var echarts;
function call_submit_command(){
	command=document.getElementById("command_info").value
	command=$.trim(command)
	if(command=="")
		return;
	 url="/command/"
	 $.get(url,{
	 	val:command
	 },
	 function(data,status){
	 	var res=document.getElementById("command_result")
	 	var chart=document.getElementById("chart");

	 	if(command!="df"){
	 		chart.style.display="none";
	 		res.style.display="block";
	 		res.value=data;
	 	}
	 	else{
	 		res.style.display="none";
	 		res.value="";
	 		all=JSON.parse(data);
	 		chart.style.display="block";
	 		setOption(all);
	 	}
	 	
	 });
}


require.config({
	paths:{
		echarts:"/static/build/dist"
	}
});

require(
    [
        "echarts",
        "echarts/chart/bar",
        "echarts/chart/pie"
    ],
    function(ec){
    	echarts=ec;
    }
 );

function setOption(data){
	var names=new Array();
	var express=new Array();
	for(var key in data){
		names.push(key);
		var t={name:key,value:(parseInt(data[key]["1K-blocks"],10)/1024/1024).toFixed(2)}
		express.push(t);

	}
	var chart=document.getElementById("chart");
	var mychart=echarts.init(chart);
	option = {
	    title : {
	        text: '磁盘空间',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c}G({d}%)"
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:names
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {
	                show: true, 
	                type: ['pie', 'funnel'],
	                option: {
	                    funnel: {
	                        x: '25%',
	                        width: '50%',
	                        funnelAlign: 'left',
	                        max: 1548
	                    }
	                }
	            },
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    series : [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius : '65%',
	            center: ['50%', '55%'],
	            data:express
	        }
	    ]
	};

	mychart.setOption(option);
}

