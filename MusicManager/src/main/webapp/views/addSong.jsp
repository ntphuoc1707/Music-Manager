<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Manager</title>
    <style>
        .first_frame{
            float: right;
            display: flex;
            align-items: center;
        
        }
    </style>
    <script>

    </script>
</head>
<body>
    <div style="width: 100%; height: 60px;">
        <div class="first_frame">
            <img  src="https://rgl.mobi/IFScD" alt="avatar" srcset="" width="20px" height="20px">
            <h3 style="margin-left: 10px">Admin | Language: </h3>       
            <select  name="language" id="lg">
                <option value="">English</option>
                <option value="">Việt nam</option>
                <option value="">Spanish</option>    
            </select>    
        </div>
    </div>
    <div style="border-style: solid;">
        <h2 style="border-bottom-style: solid; margin: 0px; padding: 10px;">Add Song</h2>
        <div style="margin-top: 20px; margin-left: 20px"> 
            <h4 style="float: left;  margin: 0px; padding-right: 10px;">Name:</h4>
            <input type="text" name="" id="_name">
        </div>
        <div style="margin-top: 20px; margin-left: 20px">
            <h4 style="float: left;  margin: 0px; padding: 8px">Genre:</h4>
            <input type="text" name="" id="_genre">
        </div>
        <div style="margin-top: 20px; margin-left: 20px">
            <button style="float: left">Choose file</button>
            <h4 style="margin-left: 20px" id="fileName">No file choosen</h4>
        </div>
            <form action="http://localhost:7000/musicmanager/add_song/sure">
                <button type="submit">Add</button>
            </form>
            <!-- <form:form action="http://localhost:7000/musicmanager/add_song/sure" method="post" modelAttribute="song">
            <form:label path="name">Name: </form:label> <form:input type="text" path="name"/>
            <form:label path="genre">Genre: </form:label> <form:input type="text" path="genre"/>
            <input type="submit" value="submit"/>
        </form:form> -->
                    
    </div>

</body>
</html>