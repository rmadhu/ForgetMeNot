/**
 * Created with IntelliJ IDEA.
 * User: Madhu Ramalingam
 * Date: 6/1/13
 * Time: 6:53 PM
 * To change this template use File | Settings | File Templates.
 */

//namespace  using direct assignment
var mylist = {};
mylist.i=0;

//class
mylist.lister = function(){

    };

 var item,list;

//prototype
mylist.lister.prototype.addToList = function(){

        var li = document.createElement("li");
        var cross = document.createElement("a");
        cross.innerHTML = "x";
        li.innerHTML = l.item.value;
        localStorage.setItem("item-"+i, l.item.value);
        //cross.addEventListener("click",removeSelected,false);
        li.appendChild(cross);
        l.list.appendChild(li);
        l.item.value="";
    }

mylist.lister.prototype.clearList = function(){
        var li = document.getElementsByTagName("li");
        len = li.length;
        while(len--){
            li[len].parentNode.removeChild(li[len]);
        }
        //li.parentNode.removeChild(li);
        localStorage.clear();
      },
    /*
    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }


    function removeSelected(event) {
            var target = getEventTarget(event);
            target.parentNode.removeChild(target);
    };

    */
    mylist.lister.prototype.loadItems = function(){
        this.item = document.getElementById("todo");
        this.list = document.getElementById("show-items");

        // Initial loading of items
        if(typeof(Storage)!=="undefined")
        {
            for( i = 0; i < localStorage.length; i++) {
                var li = document.createElement("li");
                var cross = document.createElement("a");
                cross.innerHTML = "x";
                li.innerHTML = localStorage.getItem("item-"+i);
                li.appendChild(cross);
                l.list.appendChild(li);
            }
        }
        else{
            l.list.innerHTML="Sorry, your browser does not support web storage...";
        }
    }

var l = new mylist.lister();


