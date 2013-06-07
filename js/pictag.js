var ie = document.all ? true : false;

var ptg_array = new Array;
var ptg_mode_edit = 0;
var ptg_lx = 0;
var ptg_ly = 0;

var ptg_zoomr = 1.0;
var ptg_boxrw = 128;
var ptg_boxrh = 158;
var ptg_boxw = 128 * ptg_zoomr;
var ptg_boxh = 158 * ptg_zoomr;
var ptg_boxwd = (128 - ptg_boxw) / 2;
var ptg_boxhd = (158 - ptg_boxh) / 2;

ptg_array[0] = [10, 20, 0, "Person A"];
ptg_array[1] = [312, 60, 0, "Person B"];
ptg_array[2] = [30, 40, 0, "Person C"];

function ptg_init(z)
{
	/*ptg_zoomr = z;
	ptg_boxrw = 128;
	ptg_boxrh = 158;
	ptg_boxw = 128 * ptg_zoomr;
	ptg_boxh = 158 * ptg_zoomr;
	ptg_boxwd = (128 - ptg_boxw) / 2;
	ptg_boxhd = (158 - ptg_boxh) / 2;

	$("ptgimg").width = $("ptgimg").naturalWidth * z; */
}

function ptg_move( )
{
	var i;
	var f = 0;
	
	if(ptg_mode_edit) return;
	
	if(tempY < 30)
	{
		$("ptgptc").style.visibility = "visible";
	}else{
		$("ptgptc").style.visibility = "hidden";
	}
	
	var o = $("ptgg1");

	for(i=0; i<ptg_array.length; i++)
	{
		if( tempX < (ptg_array[i][0] * ptg_zoomr) + ptg_boxw && tempY < (ptg_array[i][1] * ptg_zoomr) + ptg_boxh &&
			tempX > (ptg_array[i][0] * ptg_zoomr) && tempY > (ptg_array[i][1] * ptg_zoomr))
		{
			o.style.left = ((ptg_array[i][0] * ptg_zoomr) - ptg_boxwd) + "px";
			o.style.top =  ((ptg_array[i][1] * ptg_zoomr) - ptg_boxhd) + "px";
			
			$("ptgg1c").innerHTML = ptg_array[i][2] ? ptg_array[i][2] : ptg_array[i][3];
			f = 1;
			break;
		}
	}
	
	if(!f)
		o.style.visibility = "hidden";
	else
		o.style.visibility = "visible";
}

function ptg_splist()
{
	$("ptgplist").innerHTML = ptg_generate_ppl_list();
}

function ptg_remtag(i)
{
	ptg_array.splice(i, 1);
	$("ptgplist").innerHTML = ptg_generate_ppl_list();
}

function ptg_showp(i)
{
	var o = $("ptgg1");
	
	o.style.left = ((ptg_array[i][0] * ptg_zoomr) - ptg_boxwd) + "px";
	o.style.top =  ((ptg_array[i][1] * ptg_zoomr) - ptg_boxhd) + "px";
	
	$("ptgg1c").innerHTML = ptg_array[i][2] ? ptg_array[i][2] : ptg_array[i][3];
	o.style.visibility = "visible";
}

function ptg_generate_ppl_list()
{
	var ptgl = "", vn;

	for(i=0; i<ptg_array.length; i++)
	{
		vn = ptg_array[i][2] ? ptg_array[i][2] : ptg_array[i][3];
		ptgl = ptgl + "<a href='#' onmousemove='javascript: ptg_showp(" + i + ");'>"+ vn + "</a><a href='javascript: ptg_remtag(" + i + ");' style='padding-right: 10px;'>(x)</a>";
	}
	return ptgl;
}

function ptginit()
{
	
}

function $(id)
{
    return document.getElementById(id);
}

function ptg_mdown(e)
{
	if (e == null) 
		e = window.event; 
		
	var de = document.documentElement;
    var b = document.body;
	var cx = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
    var cy = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
		
		
	if(cy < 30) return;
	if(cy > 500) return;
	
	if(ptg_mode_edit)
	{
		if( e.clientX < ptg_lx + ptg_boxrw && e.clientY < ptg_ly + ptg_boxrh &&
			e.clientX > ptg_lx && e.clientY > ptg_ly)
		{
			return;
		}
	}

	if(ptg_mode_edit == 0)
	{
		var o = $("ptgg1");
		
		ptg_lx = (cx - (ptg_boxw/2)) - ptg_boxwd;
		ptg_ly = (cy - (ptg_boxw/2)) - ptg_boxhd;
		
		o.style.left = ptg_lx + "px";
		o.style.top = ptg_ly + "px";
		
		o.style.visibility = "visible";
		
		$("ptgg1c").innerHTML = "<input type='text' id='ptgg1ci' onfocus='this.value = this.value;'/>";
		ptg_mode_edit = 1;
		
	}else{
	
		$("ptgg1").style.visibility = "hidden";
		
		ptg_mode_edit = 0;
	}

}

function ptg_add()
{
	if(ptg_mode_edit)
	{
		ptg_array.push([((ptg_lx + ptg_boxwd) / ptg_zoomr), ((ptg_ly + ptg_boxhd) / ptg_zoomr), 0, $("ptgg1ci").value]);

		$("ptgg1").style.visibility = "hidden";
		
		ptg_mode_edit = 0;
	}
}

function ptg_mup(e)
{
	if(ptg_mode_edit)
		$("ptgg1ci").focus();
}


var IE = document.all?true:false


if (!IE) document.captureEvents(Event.MOUSEMOVE)

document.onmousemove = getMouseXY;
document.onmousedown = ptg_mdown;
document.onmouseup = ptg_mup;


var tempX = 0
var tempY = 0

function getMouseXY(e)
{
  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  } 
}  