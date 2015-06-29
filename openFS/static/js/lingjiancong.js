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

	 	if(command=="df"){
			res.style.display="none";
	 		res.value="";
	 		all=JSON.parse(data);
	 		chart.style.display="block";
	 		setOption(all);
		}
		else if(command=="free -m")
	        {
		            res.style.display="none";
	 		res.value="";
alert(data);
	 		all=JSON.parse(data);
alert(all);
	 		chart.style.display="block";
			alert("hello");
	 		setOption1(all);
        }
         else if(command=="cat /proc/stat")
        {
            res.style.display="none";
	 		res.value="";
	 		all=JSON.parse(data);
	 		chart.style.display="block";
	 		setOption2(all);
        }
         else
        {
            chart.style.display="none";
	 		res.style.display="block";
	 		res.value=data;
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

function setOption1(data){
alert("hello");
	var names=new Array();
	var express=new Array();

	for(var key in data){
		names.push("total");
		var t={name:"total",value:parseInt(data[key]["total"],10)}
		express.push(t);
        names.push("used");
		t={name:"used",value:parseInt(data[key]["used"],10)}
		express.push(t);
        names.push("free");
		t={name:"free",value:parseInt(data[key]["free"],10)}
		express.push(t);
        names.push("shared");
		t={name:"shared",value:parseInt(data[key]["shared"],10)}
		express.push(t);
        names.push("buffers");
		t={name:"buffers",value:parseInt(data[key]["buffers"],10)}
		express.push(t);
        names.push("cached");
		t={name:"cached",value:parseInt(data[key]["cached"],10)}
		express.push(t);

	}
    //alert(names);
	var chart=document.getElementById("chart");
	var mychart=echarts.init(chart);
	option = {
    title : {
        text: '内存',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
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
            radius : '55%',
            center: ['50%', '60%'],
            data:express
        }
    ]
};


	mychart.setOption(option);
}

function setOption2(data){
	var names=new Array();
	var express=new Array();

	for(var key in data){
		names.push("user");
		var t={name:"user",value:parseInt(data[key]["user"],10)}
		express.push(t);
        names.push("nice");
		t={name:"nice",value:parseInt(data[key]["nice"],10)}
		express.push(t);
        names.push("system");
		t={name:"system",value:parseInt(data[key]["system"],10)}
		express.push(t);
        names.push("idle");
		t={name:"idle",value:parseInt(data[key]["idle"],10)}
		express.push(t);
        names.push("iowait");
		t={name:"iowait",value:parseInt(data[key]["iowait"],10)}
		express.push(t);
        names.push("irq");
		t={name:"irq",value:parseInt(data[key]["irq"],10)}
		express.push(t);
        names.push("softirq");
		t={name:"softirq",value:parseInt(data[key]["softirq"],10)}
		express.push(t)

	}
    alert(names);
	var chart=document.getElementById("chart");
	var mychart=echarts.init(chart);
	option = {
    title : {
        text: 'CPU',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
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
            radius : '55%',
            center: ['50%', '60%'],
            data:express
        }
    ]
};
	mychart.setOption(option);
}
