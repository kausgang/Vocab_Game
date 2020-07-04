$(document).ready(function(){

    $("#loader").hide();

    $("#create_list").click(()=>{

        // get the name of list
        var list_name = $("#list_name").val();

        // get the list of words
        var words = $("#word_list").val();
        console.log(words)

        $("#input").hide();
        $("#loader").show();

        $.get("/create_list", {list_name:list_name , word_list:words},
            function (data, textStatus, jqXHR) {
             
                // console.log(data)

                alert(list_name + " created")
                // $("#loader").hide();

                //redirect to home page after list is created
                window.location.href = '/';

            }
            
        );

    })
  
})