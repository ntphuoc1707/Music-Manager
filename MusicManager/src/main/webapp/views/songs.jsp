<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
        .table{
            border: 1; 
            
            border-style: solid; 
            width: 100%;
        }
        tr:hover {background-color: #D6EEEE;}
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
    <div style="float: left; display: flex; align-items: center;">
        <form action="http://localhost:7000/musicmanager/add_song">
            <button type="submit" >Add</button>
        </form>
            

        <form action="http://localhost:7000/musicmanager/delete_song">
            <button style="margin-left: 20px" type="submit">Delete</button>
        </form>
    
        <input type="text" placeholder="Search">
    </div>
    <div style="margin-top: 20px; width: 100%">
        <table class="table">
            
            <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Action</th>
        </tr>    
        <c:forEach var="song" items="${songs}">
            <tr style="font-size: 20px;">
                <td>
                    <input type="checkbox">
                </td>
                <td>${song.getId()}</td>
                <td>${song.getName()}</td>
                <td>${song.getGenre()}</td>
                <td>
                    <button>Play</button>
                    <button>Edit</button>
                </td>
            </tr>
        </c:forEach>
        </table>
    </div>
</body>
</html>