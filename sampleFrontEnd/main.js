$('document').ready( function(){

    render();

    function render() {
        $.ajax({
            url: 'http://localhost:5000/api/getItems',
            success: function(data) {
                $('#lostItems').html('')
                for (var i = 0; i < data.length; i++) {
                    $('#lostItems').append(`
                        <div class = "item">
                            <h1>${data[i].item}</h1>
                            <p>${data[i].description}</p>
                            <button id = "${data[i]._id}" class = "deleteButton">Delete</button>
                        </div>
                    `);
                    $(`#${data[i]._id}`).click(function(e){
                        deleteItem(e.target.id);
                    })
                } 
            }
        })
    }
    
    $('#sub').click(function(){
        $.ajax({
            url: 'http://localhost:5000/api/additem',
            method: 'POST',
            data: {
                itemName: $('#itemName').val(),
                itemDescription: $('#itemDescription').val()
            },
            success: function() {
                    render()
            }
        })
    });

    function deleteItem(id) {
        $.ajax({
            url: 'http://localhost:5000/api/deleteItem',
            method: 'DELETE',
            headers: {
                id: id
            },
            success: function() {
                render()
            }
        })
    }

});
