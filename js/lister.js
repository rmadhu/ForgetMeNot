/**
 * Created with IntelliJ IDEA.
 * User: Madhu Ramalingam
 * Date: 6/1/13
 * Time: 6:53 PM
 * To change this template use File | Settings | File Templates.
 */

//namespace  using direct assignment
var mylist = {};
mylist.i=1;

//class
mylist.lister = function(){

    };

 var item,list;

//prototype
    mylist.lister.prototype.addToList = function(){
            if(l.item.value.trim()) {
                if(!localStorage.length){
                    //localStorage.setItem("lastKey",0);
                    mylist.i=1;
                }
                else{
                    mylist.i = localStorage.length+1;
                }

                var li = document.createElement("li");
                var tick = document.createElement("img");
                tick.src = "images/green_tick.jpg";
                tick.className = tick.className + "strike";
                tick.addEventListener("click", l.strikeSelected,false);
                var text = document.createElement("input");
                text.value = l.item.value;
                text.style.visibility = "hidden";
                text.className = text.className + "notEditable";
                li.addEventListener("click", l.editSelected,false);
                var cross = document.createElement("a");
                cross.innerHTML = "x";
                cross.className = cross.className + "remove";

                li.innerHTML = l.item.value;
                cross.addEventListener("click", l.removeSelected,false);
                li.appendChild(cross);
                li.appendChild(tick);
                li.appendChild(text);
                l.list.appendChild(li);
                //i = localStorage.length;
                var todo = {"text": l.item.value,"completed":false};
                localStorage.setItem("item-"+mylist.i, JSON.stringify(todo));
                //mylist.i++;
                //localStorage.setItem("lastKey",i);
                l.item.value="";
                //i = localStorage.length-1;
            }
    }

    mylist.lister.prototype.clearList = function(){
            var li = document.getElementsByTagName("li");
            len = li.length;
            while(len--){
                li[len].parentNode.removeChild(li[len]);
            }
            //li.parentNode.removeChild(li);
            localStorage.clear();
    }

    mylist.lister.prototype.getEventTarget=function(e) {
            e = e || window.event;
            return e.target || e.srcElement;
    }

    mylist.lister.prototype.editSelected = function(event) {
        var target = l.getEventTarget(event);
        var data="";
        if(target.lastElementChild){
            data = target.firstChild.textContent;
            if(target.lastElementChild.style.visibility=="visible") {
                data = target.lastElementChild.value;
            }
            else{
                target.firstChild.textContent = "";
            }

        }
        else{
            data = target.value;
            //target.value = "";
        }

        var currentItem;
        //target.lastElementChild == null?currentItem = target.parentNode: currentItem = target.lastElementChild;

        if(target.lastElementChild){
            currentItem = target.lastElementChild;
            currentItem.style.visibility=="visible"?currentItem.style.visibility="hidden":currentItem.style.visibility="visible";
            currentItem.className == "editable"? currentItem.className="notEditable":currentItem.className="editable";
            currentItem.value = data;
            if(currentItem.style.visibility=="hidden"){
                target.childNodes[0].textContent = data;
                target.childNodes[1].style.visibility="visible";
                target.childNodes[2].style.visibility="visible";
            }
            else{
                target.childNodes[1].style.visibility="hidden";
                target.childNodes[2].style.visibility="hidden";
                currentItem.focus();
                currentItem.addEventListener("keyup", l.save,false);
            }

        }

        //target.innerHTML="";
    }

    mylist.lister.prototype.save = function(event){
        if(event.keyCode == 13){
            var target = l.getEventTarget(event);
            var currentItem = target.parentNode;
            currentItem.childNodes[0].textContent = target.value;
            currentItem.childNodes[1].style.visibility="visible";
            currentItem.childNodes[2].style.visibility="visible";
            var todo =  {"text": target.value,"completed":false};
            localStorage.setItem("item-"+(l.getIndex(currentItem)+1),JSON.stringify(todo));
            target.style.visibility="hidden";
            target.className="notEditable";
        }
    }

    mylist.lister.prototype.removeSelected = function(event) {
                var target = l.getEventTarget(event);
                var currentItem = target.parentNode;
                localStorage.removeItem("item-"+(l.getIndex(currentItem)+1));
                currentItem.parentNode.removeChild(currentItem);
                for(var k=1; k<=localStorage.length; k++) {
            if( !localStorage.getItem("item-"+k)) {
                localStorage.setItem("item-"+k, localStorage.getItem('item-' + (k+1) ) );
                localStorage.removeItem('item-'+ (k+1) );
            }
        }

    }
    mylist.lister.prototype.strikeSelected = function(event) {
        var target = l.getEventTarget(event);
        var currentItem = target.parentNode;
        currentItem.className == "strikeMe"?currentItem.className="":currentItem.className="strikeMe";
        var todo = JSON.parse(localStorage.getItem ("item-"+(l.getIndex(currentItem)+1)));
        currentItem.className == "strikeMe"?todo['completed']=true:todo['completed']= false;
        localStorage.setItem("item-"+(l.getIndex(currentItem)+1),JSON.stringify(todo));

    }


    mylist.lister.prototype.getIndex = function(node){
        var childs = node.parentNode.childNodes;
        var index = 0;
        for (var j=0;j< childs.length;j++){
            index = j;
            if (node == childs[j])
                break;
        }
        return index;
    }
    mylist.lister.prototype.loadItems = function(){
        this.item = document.getElementById("todo");
        this.list = document.getElementById("show-items");

        // Initial loading of items
        if(typeof(Storage)!=="undefined")
        {
            //for(var key in localStorage){
            for( var k = 1; k <= localStorage.length; k++) {
                var li = document.createElement("li");
                var cross = document.createElement("a");
                cross.innerHTML = "x";
                cross.className = cross.className + "remove";
                cross.addEventListener("click", l.removeSelected,false);
                var tick = document.createElement("img");
                tick.src = "images/green_tick.jpg";
                tick.className = tick.className + "strike";
                tick.addEventListener("click", l.strikeSelected,false);
                var text = document.createElement("input");
                text.value = l.item.value;
                text.style.visibility = "hidden";
                text.className = text.className + "notEditable";
                li.addEventListener("click", l.editSelected,false);
                var todo = JSON.parse(localStorage.getItem("item-"+k));
                li.innerHTML =  todo['text'];
                if(todo['completed'])  {
                    li.className = li.className + "strikeMe";
                }

                li.appendChild(cross);
                li.appendChild(tick);
                li.appendChild(text);
                l.list.appendChild(li);
            }
        }
        else{
            l.list.innerHTML="Sorry, your browser does not support web storage...";
        }
    }

var l = new mylist.lister();


