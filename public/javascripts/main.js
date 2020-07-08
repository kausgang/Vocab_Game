// JQuery
$(document).ready(function(){

    $("#loader").hide();

    $("#create_list").click(()=>{

        // get the name of list
        var list_name = $("#list_name").val();

        // get the list of words
        var words = $("#word_list").val();
        console.log(words)

        $("#input").hide();
        $("#home").hide()
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
  

    $("#edit_list").click(()=>{

        // get the name of list
        var list_name = $("#new_list_name").val();

        // get the list of words
        var words = $("#new_word_list").val();
        // console.log(list_name)

        $("#input").hide();
        $("#home").hide()
        $("#loader").show();

        $.get("/update_list", {list_name:list_name , word_list:words},
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


// save result game_1
function save_result(game,wrong_answer){

    
    // var now = new Date().toLocaleString().replace(",","").replace(/:/g,"_").replace(/\//g,"_").replace(/\ /g,"_")
    var now = new Date().toLocaleString().replace(",","")
    // var now = new Date().getMilliseconds();
    // var now = new Date().toLocaleString()
    
    
    // console.log(now)

    $.get("/save_result", {game:game, wrong_answer:wrong_answer, game_date:now},
            function (resp, textStatus, jqXHR) {
             
                // console.log(data)

                alert("game data saved")
                // $("#loader").hide();

                //redirect to home page after list is created
                // window.location.href = '/';

            }
            
        );


}