function CreateRequest()
{
    var Request = false;

    if (window.XMLHttpRequest)
    {
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        try
        {
             Request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (CatchException)
        {
             Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request)
    {
        alert("impossible to create XMLHttpRequest");
    }

    return Request;
}



function sendRequest(r_method, r_path, r_handler)
{
    var Request = CreateRequest();

    if (!Request)
    {
        return;
    }

    Request.onreadystatechange = function()
    {
        if (Request.readyState == 4)
        {
            if (Request.status == 200)
            {
                r_handler(Request);
            }
            else
            {
                alert("Error! Request status " + Request.status);
            }
        }
    }

    if (r_method.toUpperCase() == "GET"){
      Request.open(r_method, r_path, true);
      Request.send(null);
    }
}

function readFile(url, container)
{
    var Handler = function(Request)
    {
        document.getElementById(container).innerHTML = Request.responseText;
    }

    sendRequest("GET",url,Handler);
}

function getValueFromId(id) {
  return document.getElementById(id).value;
}
