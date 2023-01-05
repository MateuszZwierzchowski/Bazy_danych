<!DOCTYPE html>
<html>
<head>
  <title>how to fetch data from database in node js and display in html</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>  
<!--   <% if (messages.error) { %>
  <p style="color:red"><%- messages.error %></p>
<% } %> -->
  
<% if (messages.success) { %>
    <p class="alert alert-success mt-4"><%- messages.success %></p>
<% } %>  
<br>
  <table class="table">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th width="200px">Action</th>
 
  </tr>
</thead>
<tbody>
  <% if(data.length){
 
  for(var i = 0; i< data.length; i++) {%>  
  <tr>
    <th scope="row"><%= (i+1) %></th>
    <td><%= data[i].name%></td>
    <td><%= data[i].email%></td>
    <td>
    <a class="btn btn-success edit" href="../users/edit/<%=data[i].id%>">Edit</a>                                            
   </td>
  </tr>
  <% }
           
   }else{ %>
       <tr>
          <td colspan="3">No user</td>
       </tr>
    <% } %>    
  
</tbody>
</table>
</body>
</html>